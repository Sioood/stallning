/// <reference types="node" />

import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { consola } from "consola";
import { colorize } from "consola/utils";
import esMain from "es-main";
import minimist from "minimist";
import { parse as parseYaml } from "yaml";

interface Argv extends minimist.ParsedArgs {
  f?: string;
  ns?: boolean;
}

const localeLabels: Record<string, string> = {
  "fr-FR": "Francais",
  "en-US": "English",
};

const treeCharacters = {
  CHILD: "├── ",
  LAST_CHILD: "└── ",
  DIRECTORY: "│   ",
  EMPTY: "    ",
} as const;

type Messages = Record<string, string>;
type MessagesByLocale = Record<string, Messages>;
type CoverageData = {
  data: { total: number };
  locale: Record<string, { percentage: number; count: number; missing: number }>;
};

const hasSupportedExtension = (filename: string) => /\.(json|ya?ml)$/i.test(filename);

const parseTranslationFile = (filePath: string): Messages => {
  const raw = readFileSync(filePath, "utf-8");

  if (/\.json$/i.test(filePath)) {
    return JSON.parse(raw) as Messages;
  }

  const parsed = parseYaml(raw);
  if (!parsed || typeof parsed !== "object") {
    throw new Error(`Invalid translation content in '${filePath}'.`);
  }
  return parsed as Messages;
};

export const getLocales = (localesPath: string): string[] =>
  readdirSync(localesPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

export const getLocaleNamespaces = ({
  localesPath,
  locale,
}: {
  localesPath: string;
  locale: string;
}): string[] =>
  readdirSync(join(localesPath, locale))
    .filter(hasSupportedExtension)
    .sort((a, b) => a.localeCompare(b));

type LocaleTree = Array<[string, string[]]>;

export const getTreeStructure = ({
  localesPath,
  showNamespaces,
}: {
  localesPath: string;
  showNamespaces?: boolean;
}): LocaleTree => {
  const locales = getLocales(localesPath);

  const tree: LocaleTree = [];

  for (const locale of locales) {
    tree.push([locale, []]);

    if (showNamespaces) {
      const namespaces = getLocaleNamespaces({ localesPath, locale });
      tree[tree.length - 1]![1] = namespaces;
    }
  }

  return tree;
};

export const renderTreeStructure = ({
  tree,
  data,
}: {
  tree: LocaleTree;
  data?: CoverageData;
}): string[] => {
  const lines: string[] = ["."];

  for (const [locale, namespaces] of tree) {
    const isLocaleLast = tree[tree.length - 1]![0] === locale;
    const localeConnector = isLocaleLast ? treeCharacters.LAST_CHILD : treeCharacters.CHILD;
    const localeName = localeLabels[locale] ?? locale;
    lines.push(`${localeConnector}${locale} (${localeName})`);

    const localeCoverage = data?.locale[locale];
    if (localeCoverage) {
      const coverageBgColor =
        localeCoverage.percentage >= 90
          ? "bgGreen"
          : localeCoverage.percentage >= 50
            ? "bgYellow"
            : "bgRed";

      lines[lines.length - 1] +=
        ` ${colorize(coverageBgColor, ` ${colorize("bold", `${localeCoverage.percentage}%`)} `)}` +
        ` count: ${colorize("bold", String(localeCoverage.count))},` +
        ` missing: ${colorize("bold", String(localeCoverage.missing))}`;
    }

    for (let i = 0; i < namespaces.length; i++) {
      const folderConnector = isLocaleLast ? treeCharacters.EMPTY : treeCharacters.DIRECTORY;
      const namespace = namespaces[i]!;
      const isNamespaceLast = i === namespaces.length - 1;
      const connector = isNamespaceLast ? treeCharacters.LAST_CHILD : treeCharacters.CHILD;
      lines.push(`${folderConnector}${connector}${namespace}`);
    }
  }

  return lines;
};

export const getMessagesByLocaleWithNamespace = ({
  locales,
  localesPath,
}: {
  locales: string[];
  localesPath: string;
}): MessagesByLocale => {
  const messagesByLocale: MessagesByLocale = {};

  for (const locale of locales) {
    const files = readdirSync(join(localesPath, locale)).filter(hasSupportedExtension);
    messagesByLocale[locale] = {};

    for (const file of files) {
      const namespace = file.replace(/\.(json|ya?ml)$/i, "");
      const messages = parseTranslationFile(join(localesPath, locale, file));

      for (const key of Object.keys(messages)) {
        if (namespace === "translations") {
          messagesByLocale[locale]![key] = messages[key]!;
        } else {
          messagesByLocale[locale]![`${namespace}:${key}`] = messages[key]!;
        }
      }
    }
  }

  return messagesByLocale;
};

export const getUniqueMessageKeys = (messagesByLocale: MessagesByLocale): string[] => {
  const uniqueMessageKeys = new Set<string>();

  for (const locale of Object.keys(messagesByLocale)) {
    for (const key of Object.keys(messagesByLocale[locale]!)) {
      uniqueMessageKeys.add(key);
    }
  }

  return Array.from(uniqueMessageKeys).sort((a, b) => a.localeCompare(b));
};

export const getCoverageData = ({
  messagesByLocale,
  uniqueMessageKeys,
}: {
  messagesByLocale: MessagesByLocale;
  uniqueMessageKeys: string[];
}): CoverageData => {
  const total = uniqueMessageKeys.length;

  return {
    data: {
      total,
    },
    locale: Object.fromEntries(
      Object.entries(messagesByLocale).map(([locale, keys]) => {
        const count = Object.keys(keys).length;
        const percentage = total === 0 ? 100 : Number(((count / total) * 100).toFixed(2));
        return [
          locale,
          {
            percentage,
            count,
            missing: Math.max(total - count, 0),
          },
        ];
      }),
    ),
  };
};

export const renderCoverage = ({
  localesPath,
  showNamespaces,
}: {
  localesPath: string;
  showNamespaces?: boolean;
}): void => {
  const locales = getLocales(localesPath);
  consola.start(`Running coverage of locales: ${localesPath}`);

  if (locales.length === 0) {
    consola.warn("No locale directories found.");
    return;
  }

  const messagesByLocale = getMessagesByLocaleWithNamespace({ locales, localesPath });
  const coverageData = getCoverageData({
    messagesByLocale,
    uniqueMessageKeys: getUniqueMessageKeys(messagesByLocale),
  });

  const treeRender = renderTreeStructure({
    tree: getTreeStructure({ localesPath, showNamespaces }),
    data: coverageData,
  });

  consola.log("");
  consola.success(
    `Coverage of ${colorize("bold", String(coverageData.data.total))} unique translations`,
  );
  for (const line of treeRender) {
    consola.log(line);
  }
  consola.log("");
};

if (esMain(import.meta)) {
  const argv: Argv = minimist(process.argv.slice(2));

  if (!argv.f) {
    consola.error("Please provide a locales path with -f.");
    consola.error("Usage: pnpm i18n:coverage -- -f ./i18n/locales --ns");
    process.exit(1);
  }

  const localesPath = resolve(argv.f);
  renderCoverage({ localesPath, showNamespaces: argv.ns });
}
