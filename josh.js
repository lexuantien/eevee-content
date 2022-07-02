var Component = (() => {
  var u = Object.create;
  var s = Object.defineProperty;
  var p = Object.getOwnPropertyDescriptor;
  var f = Object.getOwnPropertyNames;
  var m = Object.getPrototypeOf,
    w = Object.prototype.hasOwnProperty;
  var g = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports),
    y = (n, t) => {
      for (var a in t) s(n, a, { get: t[a], enumerable: !0 });
    },
    l = (n, t, a, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let o of f(t))
          !w.call(n, o) &&
            o !== a &&
            s(n, o, {
              get: () => t[o],
              enumerable: !(r = p(t, o)) || r.enumerable,
            });
      return n;
    };
  var b = (n, t, a) => (
      (a = n != null ? u(m(n)) : {}),
      l(
        t || !n || !n.__esModule
          ? s(a, "default", { value: n, enumerable: !0 })
          : a,
        n
      )
    ),
    j = (n) => l(s({}, "__esModule", { value: !0 }), n);
  var c = g((C, h) => {
    h.exports = _jsx_runtime;
  });
  var x = {};
  y(x, { default: () => S, frontmatter: () => v });
  var e = b(c());
  var {
    Paragraph: I,
    TextLink: T,
    Blockquote: J,
    Ul: L,
    Ol: E,
    Li: M,
    I: A,
    Em: _,
    PostImage: F,
    Strike: N,
    InlineCode: i,
    CH1: P,
    CH2: W,
    CH3: B,
    H1: O,
    H2: z,
    H3: D,
    ContentHeading: X,
    Heading: q,
    CodeSnippet: U,
    SandPack: Y,
    HorizontalRule: G,
    SideNote: R,
    Expanded: V,
    CodeBlock: $,
  } = reactMdxComp;
  var v = {
    postId: 3038517924585219e3,
    title: "How to use async functions in useEffect",
    slugify: "how-to-use-async-functions-in-useeffect",
    description: "useEffect in deep",
    date: "24/06/2022",
    author: ["Le Xuan Tien", "https://facebook.com/tienlx97", 6969],
    post: "stories",
    categories: ["react"],
    meta: { keywords: ["useEffect", "async"] },
  };
  function d(n) {
    let t = Object.assign(
      {
        p: "p",
        h2: "h2",
        strong: "strong",
        h3: "h3",
        pre: "pre",
        code: "code",
      },
      n.components
    );
    return (0, e.jsxs)(e.Fragment, {
      children: [
        (0, e.jsx)(t.p, {
          children:
            "Let's talk about modules. Being able to share code across multiple JavaScript files and even across multiple projects is an easy thing to do when you start to use modules in JavaScript.",
        }),
        ``,
        (0, e.jsx)(t.h2, { children: "What are Modules?" }),
        ``,
        (0, e.jsx)(t.p, { children: "So what are they?" }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            (0, e.jsx)(t.strong, { children: "Modules" }),
            " are a way to structure and organize your JavaScript, and it gives us the ability to share functionality and data across multiple files and projects.",
          ],
        }),
        ``,
        (0, e.jsx)(t.p, {
          children: "A few things you need to know about modules:",
        }),
        ``,
        (0, e.jsxs)("ul", {
          children: [
            (0, e.jsx)("li", {
              children:
                "They have their own scope, similar to how a function has scope.",
            }),
            ``,
            (0, e.jsx)("li", {
              children: "They can hold anything (functionality, data, config)",
            }),
          ],
        }),
        ``,
        (0, e.jsx)(t.h2, { children: "Use Cases" }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "If you recall in the previous lesson where we built a currency converter, we had a variable ",
            (0, e.jsx)(i, { children: "currencies" }),
            " that was a giant object of all the currency codes and names. It would be nice if instead of having that object directly in our file, we could put it in a separate module and then import it into the file to use when we need it. That is what modules will allow us to do.",
          ],
        }),
        ``,
        (0, e.jsx)(t.p, {
          children: "Another use case for modules is utility functions.",
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "For example, in the Dad Jokes lesson, we had a method ",
            (0, e.jsx)(i, { children: "randomItemFromArray" }),
            ". That method is not specific to that project, it's just a handy array utility. We could throw that off into a separate file that is used for utilities.",
          ],
        }),
        ``,
        (0, e.jsx)(t.h3, { children: "Modules in the Browser" }),
        ``,
        (0, e.jsx)(t.p, {
          children:
            "Let's look at how modules work in the browser, and then we will look at some tooling that will help us work with them.",
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "You might hear modules referred to as ",
            (0, e.jsx)(t.strong, { children: "ESM" }),
            ", ",
            (0, e.jsx)(t.strong, { children: "EcmaScript modules" }),
            ", or ",
            (0, e.jsx)(t.strong, { children: "ES6 modules" }),
            ". They were added to JavaScript a couple of years ago, and they are the best way to organize your JavaScript when you have multiple files.",
          ],
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "Let's go into our playground and create a folder called ",
            (0, e.jsx)(i, { children: "modules" }),
            " (it might already be there for you).",
          ],
        }),
        ``,
        (0, e.jsx)(t.p, {
          children: "Inside that folder create the following files:",
        }),
        ``,
        (0, e.jsxs)("ul", {
          children: [
            (0, e.jsx)("li", { children: "index.html" }),
            ``,
            (0, e.jsx)("li", { children: "utils.js" }),
            ``,
            (0, e.jsx)("li", { children: "handlers.js" }),
            ``,
            (0, e.jsx)("li", { children: "scripts.js" }),
          ],
        }),
        ``,
        (0, e.jsx)(t.p, {
          children: "That gives us 3 separate JavaScript files.",
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "Add the following code to ",
            (0, e.jsx)(i, { children: "scripts.js" }),
            ".",
          ],
        }),
        ``,
        (0, e.jsx)(t.pre, {
          filename: "scripts.js",
          children: (0, e.jsx)(t.code, {
            className: "language-js",
            children: `function App() {  // scripts.js  const name = "wes";}`,
          }),
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "In ",
            (0, e.jsx)(i, { children: "utils.js" }),
            ", add a simple function.",
          ],
        }),
        ``,
        (0, e.jsx)(t.pre, {
          children: (0, e.jsx)(t.code, {
            className: "language-js",
            children: `// utils.jsfunction returnHi(name) {  return \`hi \${name}\`;}`,
          }),
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "Let's say we need to use the ",
            (0, e.jsx)(i, { children: "returnHi" }),
            " function in ",
            (0, e.jsx)(i, { children: "scripts.js" }),
            ". Can we do that if the function is in a separate JavaScript file than the one using it?",
          ],
        }),
        ``,
        (0, e.jsx)(t.p, { children: "Let's try. Modify the code like so." }),
        ``,
        (0, e.jsx)(t.pre, {
          children: (0, e.jsx)(t.code, {
            className: "language-js",
            children: `// scripts.jsconst name = "wes";console.log(returnHi(name));`,
          }),
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "Go into ",
            (0, e.jsx)(i, { children: "index.html" }),
            " and add the base HTML if it is not already there as well as a script src tag and link it to ",
            (0, e.jsx)(i, { children: "scripts.js" }),
            ". Open the html page in the browser.",
          ],
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "When you do that, you should see an error that ",
            (0, e.jsx)(i, { children: "returnHi" }),
            " is not defined.",
          ],
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "That makes sense - because we have not yet put our ",
            (0, e.jsx)(i, { children: "utils" }),
            " on the page.",
          ],
        }),
        ``,
        (0, e.jsx)(t.p, {
          children:
            "You might think we can just add another script source tag above the one we added and link it to utils.",
        }),
        ``,
        (0, e.jsx)(t.pre, {
          children: (0, e.jsx)(t.code, {
            className: "language-html",
            children: `<script src="./utils.js"><\/script><script src="./scripts.js"><\/script>`,
          }),
        }),
        ``,
        (0, e.jsx)(t.p, {
          children:
            "As you can see, now it works. All we had to do is put one script in front of the other one that needed it in.",
        }),
        ``,
        (0, e.jsx)(t.h3, {
          children: "In the Past - Sharing JavaScript Code between Files",
        }),
        ``,
        (0, e.jsx)(t.p, {
          children:
            "In the past, this was how code was shared across multiple files.",
        }),
        ``,
        (0, e.jsx)(t.p, {
          children:
            "That got out of hand pretty quickly because you had all these files that had dependencies and the order of the script tags affected the execution because they all have to load in a waterfall, which means one after the other. Each file is assuming that the other one has access to it.",
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "If you look at our ",
            (0, e.jsx)(i, { children: "scripts.js" }),
            " file in VS Code, ESLint is complaining that returnHi is not defined. That is because that function does not exist within the file, so where did it come from?",
          ],
        }),
        ``,
        (0, e.jsx)(t.p, {
          children:
            "The only reason it works is because we have globally scoped the function in another file and we are just assuming that it will be available to us on the page. That is a very brittle way to write JavaScript",
        }),
        ``,
        (0, e.jsx)(t.h3, {
          children: "In the Present - Sharing JavaScript Code between Files",
        }),
        ``,
        (0, e.jsx)(t.p, {
          children: "The solution to that is to use modules!",
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "When you need a function like ",
            (0, e.jsx)(i, { children: "returnHi" }),
            ", you can just import the function from the module, which is the same thing as saying from the file that actually contains that function.",
          ],
        }),
        ``,
        (0, e.jsx)(t.p, {
          children:
            "When you do that, you don't really have to worry about things loading before each other, because we will always import the values we need before hand.",
        }),
        ``,
        (0, e.jsx)(t.p, {
          children: "Let's change this example to use a very sime module.",
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "In ",
            (0, e.jsx)(i, { children: "index.html" }),
            ", there is just have one script tag and that is going to be the entry point into the JavaScript.",
          ],
        }),
        ``,
        (0, e.jsxs)(t.p, {
          children: [
            "Add the type attribute on the script tag and set it to ",
            (0, e.jsx)(i, { children: "module" }),
            " like so \u{1F447}",
          ],
        }),
      ],
    });
  }
  function k(n = {}) {
    let { wrapper: t } = n.components || {};
    return t
      ? (0, e.jsx)(t, Object.assign({}, n, { children: (0, e.jsx)(d, n) }))
      : d(n);
  }
  var S = k;
  return j(x);
})();
return Component;
