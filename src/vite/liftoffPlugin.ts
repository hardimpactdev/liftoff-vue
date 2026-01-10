export function liftoff() {
  const plugins = [];

  // Core plugin
  plugins.push({
    name: 'liftoff',
    enforce: 'pre',
    config() {
      return {
        optimizeDeps: {
          exclude: [
            '@hardimpactdev/liftoff-vue',
            '@tailwindcss/vite',
            'laravel-vue-i18n/vite'
          ]
        }
      };
    },

    resolveId(id: string) {
      if (id === 'virtual:liftoff') {
        return id;
      }
    },
    load(id: string) {
      if (id === 'virtual:liftoff') {
        return `
          import { createInertiaApp } from "@inertiajs/vue3";
          import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
          import { createApp, h } from "vue";
          import { i18n } from "@hardimpactdev/liftoff-vue";
          import { TooltipProvider } from "reka-ui";

          const appName = import.meta.env.VITE_APP_NAME || "Laravel";

          export function initializeLiftoff(options) {
            const { enhanceVue, layouts } = options || {};

            return createInertiaApp({
              title: (title) => \`\${title} - \${appName}\`,
              resolve: (name) => {
                  const pages = import.meta.glob('/resources/js/pages/**/*.vue', {
                      eager: true,
                  });

                  const page = pages[\`/resources/js/pages/\${name}.vue\`];

                  let defaultLayout = undefined;

                  if (layouts) {
                    Object.entries(layouts).forEach(([key, value]) => {
                      if(name.startsWith(key)) {
                        defaultLayout = value;
                      }

                      if(!defaultLayout && layouts.default) {
                        defaultLayout = layouts.default;
                      }
                    });
                  }

                  if(!page) {
                    const errorMessage = \`Page not found: \${name}.vue\`;

                    console.error(\`[Inertia] \${errorMessage}\`);
                  }

                  page.default.layout = defaultLayout;
                  return page;
              },
              setup({ el, App, props, plugin }) {
                // Get the language files and transform the paths
                const langGlob = import.meta.glob("/lang/*.json", { eager: true });

                // Transform absolute paths to relative paths expected by i18n
                const transformedLangs = {};
                Object.entries(langGlob).forEach(([absolutePath, module]) => {
                  // Convert "/lang/en.json" to "../../lang/en.json"
                  const relativePath = absolutePath.replace('/lang/', '../../lang/');
                  transformedLangs[relativePath] = module;
                });

                let app = createApp({ render: () => h(TooltipProvider, null, () => h(App, props)) })
                  .use(plugin)
                  .use(i18n, {
                    langs: transformedLangs,
                    changeLanguageRoute: '/change-language',
                  });

                if (enhanceVue) {
                  app = enhanceVue(app);
                }

                app.mount(el);
              },
              progress: {
                includeCSS: false,
              },
            });
          }`;
      }
    },
  });

  // Add other plugins
  // plugins.push(plugin());

  return plugins;
}