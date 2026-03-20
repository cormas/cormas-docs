export default function cormasReleasesPlugin(context, options) {
  const releasesUrl = (options && options.releasesUrl) || "https://files.cormas.org/releases.json";

  return {
    name: "cormas-releases",

    async loadContent() {
      const res = await fetch(releasesUrl);
      if (!res.ok) throw new Error(`Failed to fetch releases.json: ${res.status} ${res.statusText}`);
      return await res.json();
    },

    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;

      const dataPath = await createData("releases-data.json", JSON.stringify(content, null, 2));

      addRoute({
        path: "/download-vw",
        component: "@site/src/components/download-vw/index.jsx",
        modules: { releasesData: dataPath },
        exact: true,
      });
    },
  };
};