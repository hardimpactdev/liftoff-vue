import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',

  // Typography - use Inter to match components
  fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',

  // Brand
  brandTitle: 'Craft UI',

  // UI colors - Craft-inspired zinc palette
  colorPrimary: '#27272a', // zinc-800
  colorSecondary: '#27272a', // zinc-800

  // UI
  appBg: '#fafafa', // zinc-50
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e4e4e7', // zinc-200
  appBorderRadius: 8,

  // Text colors
  textColor: '#18181b', // zinc-900
  textInverseColor: '#ffffff',
  textMutedColor: '#71717a', // zinc-500

  // Toolbar
  barTextColor: '#52525b', // zinc-600
  barSelectedColor: '#18181b', // zinc-900
  barHoverColor: '#27272a', // zinc-800
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e4e4e7', // zinc-200
  inputTextColor: '#18181b', // zinc-900
  inputBorderRadius: 6,

  // Button
  buttonBg: '#f4f4f5', // zinc-100
  buttonBorder: '#e4e4e7', // zinc-200

  // Boolean (toggle)
  booleanBg: '#e4e4e7', // zinc-200
  booleanSelectedBg: '#27272a', // zinc-800
});

addons.setConfig({
  theme,
});
