---
"@silver-formily/antd-mobile": major
---

Redesign FormItem props and separate field mapping, layout resolution, labels and feedback rendering.

Remove inactive hasFeedback, noStyle, hidden and internal __layout__ props. Reserve List.Item title, prefix and description for the decorator; use label, help and extra instead. Use Formily field display/pattern for visibility and editing state. FormLayout alignment no longer accepts arrays, and widths accept strings as well as numbers.

Explicit labels, extras, feedback and asterisk settings now override field defaults; only undefined falls back. Render persistent help, forward supported List.Item props, update label overflow on resize/content changes, and support border controls. Native disabled retains List.Item interaction behavior without changing the Formily field pattern. Existing exports remain available.

Position label tooltips above the trigger by default (top-start), constrain their width to the mobile viewport, and wrap long URLs to prevent horizontal scrolling.

Apply horizontal label widths once at the column level, preserve the label/control gap under border-box resets, and right-align labels without reversing tooltip order. Add placeholders and visible width/alignment comparisons to all FormItem demos.


Remove the desktop-derived FormItem size, inset, feedbackIcon and feedbackLayout APIs and the corresponding FormLayout configuration. Validation feedback now renders inline below the control. Remove internal feedbackStatus and feedbackText settings from the public documentation. Use style/labelStyle/wrapperStyle and child component props for custom appearance. Label tooltip APIs remain available. Space retains its own size prop (default small/8px) but no longer inherits FormLayout.size. FormButtonGroup.inset is unaffected.

Expand FormItem demos with long labels, wrapping, disabled/read-only states, vertical layouts, tooltips and border/control alignment comparisons. Preserve visible ellipsis for truncated labels.
