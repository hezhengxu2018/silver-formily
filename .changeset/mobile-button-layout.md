---
"@silver-formily/antd-mobile": major
---

Redesign FormButtonGroup with vertical, horizontal and compact layouts, fixing full-width Submit buttons. Replace Space props with layout/gap/inset/safeAreaInsetBottom and remove FormButtonGroup.FormItem. Add shape configuration with group-first inheritance; rounded corners are opt-in, including compact layouts. Replace react-sticky-box with Floating UI positioning and visibility-gated viewport sticky behavior, placeholder sizing and explicit or inferred form boundaries; replace bottom with position and remove obsolete padding/align/onChangeMode props.

Align Submit with Vant submission semantics: rectangular full-width primary button with default text, boolean loading merged with form.submitting, cancellation of native and programmatic submits, duplicate-submit protection and ButtonRef forwarding. Replace the native type override with submit/onSubmit configuration. Existing horizontal button groups must explicitly set layout="horizontal". See the FormButtonGroup and Submit documentation for migration examples.
