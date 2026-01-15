# Alert Dialog

## What is this component?

A modal dialog that interrupts the user with important content and expects a response. It renders an overlay on top of the content and prevents interaction with the background.

## When to use this component?

- For confirmation actions (e.g., "Are you sure you want to delete this?").
- When immediate user attention and a decision are required.
- To display critical alerts that block the user flow until addressed.

## Implementation Details

- **AlertDialog**: The root component.
- **AlertDialogTrigger**: The element that opens the dialog.
- **AlertDialogContent**: The container for the dialog content.
- **AlertDialogHeader**, **AlertDialogFooter**: Semantic containers for header and footer content.
- **AlertDialogTitle**, **AlertDialogDescription**: Semantic components for the dialog's text.
- **AlertDialogAction**, **AlertDialogCancel**: Buttons to confirm or cancel the action.
