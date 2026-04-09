import { parse as parseYaml } from "yaml";

type Messages = Record<string, string>;
type LoadedMessages = { default: Messages } | Messages | string;
type NamespaceFiles = Record<string, () => Promise<LoadedMessages>>;

export const prefixKeys = (prefix: string, obj: Messages) =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [`${prefix}:${key}`, value]));

const normalizeMessages = (name: string, moduleOrData: LoadedMessages): Messages => {
  if (typeof moduleOrData === "string") {
    const parsed = parseYaml(moduleOrData);
    if (!parsed || typeof parsed !== "object") {
      throw new Error(`Namespace "${name}" has invalid YAML content`);
    }
    return parsed as Messages;
  }

  if (
    typeof moduleOrData === "object" &&
    moduleOrData !== null &&
    "default" in moduleOrData &&
    typeof moduleOrData.default === "object" &&
    moduleOrData.default !== null
  ) {
    return moduleOrData.default as Messages;
  }

  return moduleOrData as Messages;
};

export const getMessagesWithNamespace = async (files: NamespaceFiles) => {
  const namespaces = Object.keys(files);

  const messagesArray = await Promise.all(
    namespaces.map(async (name) => {
      const loadFn = files[name];
      if (!loadFn) {
        throw new Error(`Namespace "${name}" not found`);
      }
      const loaded = await loadFn();
      const messages = normalizeMessages(name, loaded);
      return name === "translations" ? messages : prefixKeys(name, messages);
    }),
  );

  return Object.assign({}, ...messagesArray);
};
