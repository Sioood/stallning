import { getMessagesWithNamespace } from "~nuxt-essentials/i18n/utils/namespace";

export default defineI18nLocale(async () => {
  const jsonModules = import.meta.glob<{ default: Record<string, string> }>("./*.json");
  const yamlModules = import.meta.glob<string>(["./*.yaml", "./*.yml"], {
    query: "?raw",
    import: "default",
  });

  const namespacesFiles = Object.fromEntries(
    [...Object.entries(jsonModules), ...Object.entries(yamlModules)].map(([path, loadFn]) => {
      const filename = path.split("/").pop() ?? path;
      const namespace = filename.replace(/\.(json|ya?ml)$/i, "");
      return [namespace, loadFn];
    }),
  );

  return await getMessagesWithNamespace(namespacesFiles);
});
