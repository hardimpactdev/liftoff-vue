export const styles = () => import('./src/style.css');

// Plugins
import i18n from './src/plugins/i18n.ts';

// Re-export Nuxt UI components used in liftoff stubs
// These are externalized and must be provided by the consuming project
export { default as Button } from '@nuxt/ui/components/Button.vue';
export { default as Input } from '@nuxt/ui/components/Input.vue';
export { default as Checkbox } from '@nuxt/ui/components/Checkbox.vue';
export { default as Select } from '@nuxt/ui/components/Select.vue';
export { default as Textarea } from '@nuxt/ui/components/Textarea.vue';
export { default as FormField } from '@nuxt/ui/components/FormField.vue';

// Custom Label component (Nuxt UI doesn't have a standalone Label)
import Label from './src/components/Label.vue';

// Layouts
import AuthSimpleLayout from './src/layouts/auth/AuthSimpleLayout.vue';
import AppLayout from './src/layouts/app/AppLayout.vue';
import AppSidebarLayout from './src/layouts/app/AppSidebarLayout.vue';
import SettingsLayout from './src/layouts/settings/SettingsLayout.vue';

// Composables
import { useAppearance } from './src/composables/useAppearance.ts';
import { useInitials } from './src/composables/useInitials.ts';
import { useLanguage } from './src/composables/useLanguage.ts';

// Custom Toast composable (works without Nuxt's #imports)
export { useToast, toastMaxInjectionKey, type Toast } from './src/composables/useToast';

// Note: Nuxt UI composables like useOverlay, defineShortcuts, useFileUpload, useKbd, useScrollspy
// are NOT re-exported because they trigger bundling of files with Nuxt-specific #imports.
// Import them directly from '@nuxt/ui/composables' if needed (only works in Nuxt apps).

// Custom Toaster component (works without Nuxt's #imports)
export { default as Toaster } from './src/components/Toast/Toaster.vue';

// Utils
import { cn, __, can } from './src/lib/utils.ts';

// Custom Components
import InputError from './src/components/InputError.vue';
import TextLink from './src/components/TextLink.vue';
import DeleteUser from './src/components/DeleteUser.vue';
import HeadingSmall from './src/components/HeadingSmall.vue';
import Heading from './src/components/Heading.vue';
import AppearanceTabs from './src/components/AppearanceTabs.vue';
import PlaceholderPattern from './src/components/PlaceholderPattern.vue';
import AppLogo from './src/components/AppLogo.vue';
import AppLogoIcon from './src/components/AppLogoIcon.vue';
import AppSidebarHeader from './src/components/AppSidebarHeader.vue';
import AppContent from './src/components/AppContent.vue';
import Breadcrumbs from './src/components/Breadcrumbs.vue';
import UserInfo from './src/components/UserInfo.vue';
import NavFooter from './src/components/NavFooter.vue';
import NavMain from './src/components/NavMain.vue';
import NavUser from './src/components/NavUser.vue';
import AppShell from './src/components/AppShell.vue';
import AppSidebar from './src/components/AppSidebar.vue';
import UserMenuContent from './src/components/UserMenuContent.vue';
import Icon from './src/components/Icon.vue';

// Kanban Components
import Kanban from './src/components/Kanban/Kanban.vue';
import KanbanColumn from './src/components/Kanban/KanbanColumn.vue';
import KanbanColumnHeader from './src/components/Kanban/KanbanColumnHeader.vue';
import KanbanColumnCards from './src/components/Kanban/KanbanColumnCards.vue';
import KanbanColumnFooter from './src/components/Kanban/KanbanColumnFooter.vue';
import KanbanCard from './src/components/Kanban/KanbanCard.vue';

// Command Components
import Command from './src/components/Command/Command.vue';
import CommandModal from './src/components/Command/CommandModal.vue';

// Chart Components
import Chart from './src/components/Chart/Chart.vue';
import ChartLine from './src/components/Chart/ChartLine.vue';
import ChartBar from './src/components/Chart/ChartBar.vue';
import ChartArea from './src/components/Chart/ChartArea.vue';
import ChartPie from './src/components/Chart/ChartPie.vue';
import ChartDoughnut from './src/components/Chart/ChartDoughnut.vue';

// Tree Components
import Tree from './src/components/Tree/Tree.vue';
export type { TreeNode } from './src/components/Tree/Tree.vue';

export {
  // Plugins
  i18n,
  // Custom UI Components
  Label,
  // Layouts
  AuthSimpleLayout,
  AppLayout,
  AppSidebarLayout,
  SettingsLayout,
  // Composables
  useAppearance,
  useInitials,
  useLanguage,
  // Utils
  cn,
  __,
  can,
  // Custom Components
  InputError,
  TextLink,
  DeleteUser,
  HeadingSmall,
  Heading,
  AppearanceTabs,
  PlaceholderPattern,
  AppLogo,
  AppLogoIcon,
  AppSidebarHeader,
  AppContent,
  Breadcrumbs,
  UserInfo,
  NavFooter,
  NavMain,
  NavUser,
  AppShell,
  AppSidebar,
  UserMenuContent,
  Icon,
  // Kanban Components
  Kanban,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnCards,
  KanbanColumnFooter,
  KanbanCard,
  // Command Components
  Command,
  CommandModal,
  // Chart Components
  Chart,
  ChartLine,
  ChartBar,
  ChartArea,
  ChartPie,
  ChartDoughnut,
  // Tree Components
  Tree,
};
