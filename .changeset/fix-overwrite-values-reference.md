---
'@silver-formily/core': patch
---

修复 FormDialog 的 forOpen 传入 initialValues 后，数组值字段（如多选 TreeSelect）勾选或取消单项时同步递归爆栈的问题。根因是 setValues/setInitialValues 的 overwrite 分支按引用赋值，使 form.values 与 form.initialValues 共享同一对象，随后数组值写入被深度 observe 误判为 initialValues 变更进入 patchFormValues 回写循环。现在 overwrite 分支对入参做深拷贝，切断共享引用，外部对象的后续修改也不会再泄漏进表单值。
