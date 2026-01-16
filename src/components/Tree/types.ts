export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  disabled?: boolean;
  defaultExpanded?: boolean;
  [key: string]: unknown;
}
