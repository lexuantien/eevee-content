var Component = (() => {
  var f = Object.create;
  var r = Object.defineProperty;
  var p = Object.getOwnPropertyDescriptor;
  var g = Object.getOwnPropertyNames;
  var m = Object.getPrototypeOf,
    y = Object.prototype.hasOwnProperty;
  var x = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports),
    w = (n, e) => {
      for (var o in e) r(n, o, { get: e[o], enumerable: !0 });
    },
    c = (n, e, o, a) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let i of g(e))
          !y.call(n, i) &&
            i !== o &&
            r(n, i, {
              get: () => e[i],
              enumerable: !(a = p(e, i)) || a.enumerable,
            });
      return n;
    };
  var k = (n, e, o) => (
      (o = n != null ? f(m(n)) : {}),
      c(
        e || !n || !n.__esModule
          ? r(o, "default", { value: n, enumerable: !0 })
          : o,
        n
      )
    ),
    C = (n) => c(r({}, "__esModule", { value: !0 }), n);
  var l = x((I, d) => {
    d.exports = _jsx_runtime;
  });
  var _ = {};
  w(_, { default: () => j, frontmatter: () => E });
  var t = k(l());
  var {
    Paragraph: L,
    TextLink: M,
    Blockquote: S,
    Ul: R,
    Ol: D,
    Li: N,
    I: O,
    Em: P,
    PostImage: X,
    Strike: B,
    InlineCode: s,
    CH1: F,
    CH2: q,
    CH3: v,
    H1: z,
    H2: A,
    H3: U,
    ContentHeading: Y,
    Heading: G,
    CodeSnippet: J,
    SandPack: K,
    HorizontalRule: Q,
    SideNote: h,
    Expanded: V,
    CodeBlock: W,
  } = reactMdxComp;
  var E = {
    id: 3038517924585219e3,
    title: "How to use async functions in useEffect",
    slugify: "how-to-use-async-functions-in-useeffect",
    description: "useEffect in deep",
    date: "24/06/2022",
    author: ["Le Xuan Tien", "https://facebook.com/tienlx97", 6969],
    post: "stories",
    categories: ["react"],
    meta: { keywords: ["useEffect", "async"] },
  };
  function u(n) {
    let e = Object.assign(
        { p: "p", h2: "h2", pre: "pre", code: "code" },
        n.components
      ),
      { TextLink: o } = e;
    return (
      o || b("TextLink", !0),
      (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsxs)(e.p, {
            children: [
              (0, t.jsx)(s, { children: "useEffect" }),
              ` is usually the place where data fetching happensin React. Data fetching means using asynchronous functions, and using them in `,
              (0, t.jsx)(s, { children: `useEffect` }),
              ` might not be as straightforward as you'd think. Read on to learn moreabout it!`,
            ],
          }),
          ``,
          (0, t.jsx)(e.h2, { children: "The wrong way" }),
          ``,
          (0, t.jsxs)(e.p, {
            children: [
              "There's one wrong way to do data fetching in ",
              (0, t.jsx)(s, { children: "useEffect" }),
              " . If you write the following code, your linter will scream at you!",
            ],
          }),
          ``,
          (0, t.jsxs)(h, {
            type: "Tip",
            children: [
              (0, t.jsxs)(e.p, {
                children: ["You are using a linter right? If not,", " "],
              }),
              (0, t.jsx)(o, {
                href: "https://reactjs.org/docs/hooks-rules.html",
                children: (0, t.jsx)(e.p, { children: "you really should!" }),
              }),
            ],
          }),
          ``,
          (0, t.jsx)(e.pre, {
            filename: "App.css",
            highlight: "[3,5]",
            children: (0, t.jsx)(e.code, {
              className: "language-css",
              children: `button {  margin: 5px;}li {  list-style-type: none;}ul,li {  margin: 0;  padding: 0;}`,
            }),
          }),
        ],
      })
    );
  }
  function H(n = {}) {
    let { wrapper: e } = n.components || {};
    return e
      ? (0, t.jsx)(e, Object.assign({}, n, { children: (0, t.jsx)(u, n) }))
      : u(n);
  }
  var j = H;
  function b(n, e) {
    throw new Error(
      "Expected " +
        (e ? "component" : "object") +
        " `" +
        n +
        "` to be defined: you likely forgot to import, pass, or provide it."
    );
  }
  return C(_);
})();
return Component;
