export const styles = () => import('./src/style.css');

// Layouts
import AuthSimpleLayout from './src/layouts/auth/AuthSimpleLayout.vue';
// import AppLayout from './src/layouts/app/AppLayout.vue';
// import AppSidebarLayout from './src/layouts/app/AppSidebarLayout.vue';
import SettingsLayout from './src/layouts/settings/SettingsLayout.vue';

// Plugins
import i18n from './src/plugins/i18n.ts';

// Composables
import { useAppearance } from './src/composables/useAppearance.ts';
import { useInitials } from './src/composables/useInitials.ts';
import { useLanguage } from './src/composables/useLanguage.ts';

// Custom Toast composable
export { useToast, toastMaxInjectionKey, type Toast } from './src/composables/useToast';

// Custom Toaster
// export { default as Toaster } from './src/components/Toast/Toaster.vue';


// Utils
import { cn, __, can } from './src/lib/utils.ts';

// Shadcn Components
export * from "./src/components/accordion";
export * from "./src/components/alert";
export * from "./src/components/alert-dialog";
export * from "./src/components/aspect-ratio";
export * from "./src/components/avatar";
export * from "./src/components/badge";
export * from "./src/components/breadcrumb";
export * from "./src/components/button";
export * from "./src/components/button-group";
export * from "./src/components/calendar";
export * from "./src/components/card";
export * from "./src/components/carousel";
export * from "./src/components/chart";
export * from "./src/components/checkbox";
export * from "./src/components/collapsible";
export * from "./src/components/combobox";
export * from "./src/components/command";
export * from "./src/components/context-menu";
export * from "./src/components/dialog";
export * from "./src/components/drawer";
export * from "./src/components/dropdown-menu";
export * from "./src/components/empty";
export * from "./src/components/field";
export * from "./src/components/form";
export * from "./src/components/hover-card";
export * from "./src/components/input";
export * from "./src/components/input-group";
export * from "./src/components/input-otp";
export * from "./src/components/item";
export * from "./src/components/kbd";
export * from "./src/components/label";
export * from "./src/components/menubar";
export * from "./src/components/native-select";
export * from "./src/components/navigation-menu";
export * from "./src/components/number-field";
export * from "./src/components/pagination";
export * from "./src/components/pin-input";
export * from "./src/components/popover";
export * from "./src/components/progress";
export * from "./src/components/radio-group";
export * from "./src/components/range-calendar";
export * from "./src/components/resizable";
export * from "./src/components/scroll-area";
export * from "./src/components/select";
export * from "./src/components/separator";
export * from "./src/components/sheet";
export * from "./src/components/sidebar";
export * from "./src/components/skeleton";
export * from "./src/components/slider";
export * from "./src/components/sonner";
export * from "./src/components/spinner";
export * from "./src/components/stepper";
export * from "./src/components/switch";
export * from "./src/components/table";
export * from "./src/components/tabs";
export * from "./src/components/tags-input";
export * from "./src/components/textarea";
export * from "./src/components/toggle";
export * from "./src/components/toggle-group";
export * from "./src/components/tooltip";

export {
    // Plugins
    i18n,
    // Utils
    cn,
    __,
    can,
    // Layouts
    // Layouts
    AuthSimpleLayout,
    // AppLayout,
    // AppSidebarLayout,
    SettingsLayout,
    // Composables
    useAppearance,
    useInitials,
    useLanguage,
};
