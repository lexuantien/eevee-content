/*@jsxRuntime automatic @jsxImportSource react*/
const { jsx: _jsx, jsxs: _jsxs } = arguments[0];
const { useMDXComponents: _provideComponents } = arguments[0];
function _createMdxContent(props) {
  const { Ul, Li } = Object.assign({}, _provideComponents(), props.components);
  if (!Li) _missingMdxReference("Li", true);
  if (!Ul) _missingMdxReference("Ul", true);
  return _jsxs(Ul, {
    children: [
      _jsx(Li, {
        children:
          "They have their own scope, similar to how a function has scope.",
      }),
      "\n",
      _jsx(Li, {
        children: "They can hold anything (functionality, data, config)",
      }),
    ],
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = Object.assign(
    {},
    _provideComponents(),
    props.components
  );
  return MDXLayout
    ? _jsx(
        MDXLayout,
        Object.assign({}, props, {
          children: _jsx(_createMdxContent, props),
        })
      )
    : _createMdxContent(props);
}
return {
  default: MDXContent,
};
function _missingMdxReference(id, component) {
  throw new Error(
    "Expected " +
      (component ? "component" : "object") +
      " `" +
      id +
      "` to be defined: you likely forgot to import, pass, or provide it."
  );
}
