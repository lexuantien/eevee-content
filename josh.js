/*@jsxRuntime automatic @jsxImportSource react*/
export const postId = 3038517924585219000,
  title = "How to use async functions in useEffect",
  slugify = "how-to-use-async-functions-in-useeffect",
  description = "useEffect in deep",
  date = "24/06/2022",
  author = [
    "Le Xuan Tien",
    "tienlx97",
    "https://facebook.com/tienlx97",
    "I'm fullstack developer and still FA. Plz contact me if you are girl",
    6969,
  ],
  post = "stories",
  tags = ["react", "useEffect", "typescript", "async"];
import { InlineCode, SideNote, Ul, Li } from "@eevee/react-mdx-comp";
function _createMdxContent(props) {
  const _components = Object.assign(
    {
      p: "p",
      h1: "h1",
      strong: "strong",
      h2: "h2",
      pre: "pre",
      code: "code",
    },
    props.components
  );
  return (
    <>
      <_components.p>
        {
          "Let's talk about modules. Being able to share code across multiple JavaScript files and even across multiple projects is an easy thing to do when you start to use modules in JavaScript."
        }
      </_components.p>
      {"\n"}
      <_components.h1>{"What are Modules?"}</_components.h1>
      {"\n"}
      <_components.p>
        <_components.strong>{"Modules"}</_components.strong>
        {
          " are a way to structure and organize your JavaScript, and it gives us the ability to share functionality and data across multiple files and projects."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"A few things you need to know about modules:"}
      </_components.p>
      {"\n"}
      <Ul>
        <Li>
          {"They have their own scope, similar to how a function has scope."}
        </Li>
        {"\n"}
        <Li>{"They can hold anything (functionality, data, config)"}</Li>
      </Ul>
      {"\n"}
      <_components.h1>{"Use Cases"}</_components.h1>
      {"\n"}
      <_components.p>
        {
          "If you recall in the previous lesson where we built a currency converter, we had a variable "
        }
        <InlineCode>{"currencies"}</InlineCode>
        {
          " that was a giant object of all the currency codes and names. It would be nice if instead of having that object directly in our file, we could put it in a separate module and then import it into the file to use when we need it. That is what modules will allow us to do."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"Another use case for modules is utility functions."}
      </_components.p>
      {"\n"}
      <_components.p>
        {"For example, in the Dad Jokes lesson, we had a method "}
        <InlineCode>{"randomItemFromArray"}</InlineCode>
        {
          ". That method is not specific to that project, it's just a handy array utility. We could throw that off into a separate file that is used for utilities."
        }
      </_components.p>
      {"\n"}
      <_components.h2>{"Modules in the Browser"}</_components.h2>
      {"\n"}
      <_components.p>
        {
          "Let's look at how modules work in the browser, and then we will look at some tooling that will help us work with them."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"You might hear modules referred to as "}
        <_components.strong>{"ESM"}</_components.strong>
        {", "}
        <_components.strong>{"EcmaScript modules"}</_components.strong>
        {", or "}
        <_components.strong>{"ES6 modules"}</_components.strong>
        {
          ". They were added to JavaScript a couple of years ago, and they are the best way to organize your JavaScript when you have multiple files."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"Let's go into our playground and create a folder called "}
        <InlineCode>{"modules"}</InlineCode>
        {" (it might already be there for you)."}
      </_components.p>
      {"\n"}
      <_components.p>
        {"Inside that folder create the following files:"}
      </_components.p>
      {"\n"}
      <Ul>
        <Li>{"index.html"}</Li>
        {"\n"}
        <Li>{"utils.js"}</Li>
        {"\n"}
        <Li>{"handlers.js"}</Li>
        {"\n"}
        <Li>{"scripts.js"}</Li>
      </Ul>
      {"\n"}
      <_components.p>
        {"That gives us 3 separate JavaScript files."}
      </_components.p>
      {"\n"}
      <_components.p>
        {"Add the following code to "}
        <InlineCode>{"scripts.js"}</InlineCode>
        {"."}
      </_components.p>
      {"\n"}
      <_components.p>
        {"In "}
        <InlineCode>{"utils.js"}</InlineCode>
        {", add a simple function."}
      </_components.p>
      {"\n"}
      <_components.p>
        {"Let's say we need to use the "}
        <InlineCode>{"returnHi"}</InlineCode>
        {" function in "}
        <InlineCode>{"scripts.js"}</InlineCode>
        {
          ". Can we do that if the function is in a separate JavaScript file than the one using it?"
        }
      </_components.p>
      {"\n"}
      <_components.p>{"Let's try. Modify the code like so."}</_components.p>
      {"\n"}
      <_components.p>
        {"Go into "}
        <InlineCode>{"index.html"}</InlineCode>
        {
          " and add the base HTML if it is not already there as well as a script src tag and link it to "
        }
        <InlineCode>{"scripts.js"}</InlineCode>
        {". Open the html page in the browser."}
      </_components.p>
      {"\n"}
      <_components.p>
        {"When you do that, you should see an error that "}
        <InlineCode>{"returnHi"}</InlineCode>
        {" is not defined."}
      </_components.p>
      {"\n"}
      <_components.p>
        {"That makes sense - because we have not yet put our "}
        <InlineCode>{"utils"}</InlineCode>
        {" on the page."}
      </_components.p>
      {"\n"}
      <_components.p>
        {
          "You might think we can just add another script source tag above the one we added and link it to utils."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {
          "As you can see, now it works. All we had to do is put one script in front of the other one that needed it in."
        }
      </_components.p>
      {"\n"}
      <_components.h2>{"In the Past"}</_components.h2>
      {"\n"}
      <_components.p>
        {"In the past, this was how code was shared across multiple files."}
      </_components.p>
      {"\n"}
      <_components.p>
        {
          "That got out of hand pretty quickly because you had all these files that had dependencies and the order of the script tags affected the execution because they all have to load in a waterfall, which means one after the other. Each file is assuming that the other one has access to it."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"If you look at our "}
        <InlineCode>{"scripts.js"}</InlineCode>
        {
          " file in VS Code, ESLint is complaining that returnHi is not defined. That is because that function does not exist within the file, so where did it come from?"
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {
          "The only reason it works is because we have globally scoped the function in another file and we are just assuming that it will be available to us on the page. That is a very brittle way to write JavaScript"
        }
      </_components.p>
      {"\n"}
      <_components.h2>{"In the Present"}</_components.h2>
      {"\n"}
      <_components.p>{"The solution to that is to use modules!"}</_components.p>
      {"\n"}
      <_components.p>
        {"When you need a function like "}
        <InlineCode>{"returnHi"}</InlineCode>
        {
          ", you can just import the function from the module, which is the same thing as saying from the file that actually contains that function."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {
          "When you do that, you don't really have to worry about things loading before each other, because we will always import the values we need before hand."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"Let's change this example to use a very sime module."}
      </_components.p>
      {"\n"}
      <_components.p>
        {"In "}
        <InlineCode>{"index.html"}</InlineCode>
        {
          ", there is just have one script tag and that is going to be the entry point into the JavaScript."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"Add the type attribute on the script tag and set it to "}
        <InlineCode>{"module"}</InlineCode>
        {" like so 👇"}
      </_components.p>
      {"\n"}
      <_components.pre>
        <_components.code className="language-js">
          {'function App() {\n  // scripts.js\n  const name = "wes";\n}\n'}
        </_components.code>
      </_components.pre>
      {"\n"}
      <Ul>
        <Li>{"index.html"}</Li>
        {"\n"}
        <Li>{"utils.js"}</Li>
        {"\n"}
        <Li>{"handlers.js"}</Li>
        {"\n"}
        <Li>{"scripts.js"}</Li>
      </Ul>
      {"\n"}
      <_components.h1>{"Another"}</_components.h1>
      {"\n"}
      <_components.p>
        {"In the past, this was how code was shared across multiple files."}
      </_components.p>
      {"\n"}
      <_components.p>
        {
          "That got out of hand pretty quickly because you had all these files that had dependencies and the order of the script tags affected the execution because they all have to load in a waterfall, which means one after the other. Each file is assuming that the other one has access to it."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"If you look at our "}
        <InlineCode>{"scripts.js"}</InlineCode>
        {
          " file in VS Code, ESLint is complaining that returnHi is not defined. That is because that function does not exist within the file, so where did it come from?"
        }
      </_components.p>
      {"\n"}
      <_components.pre>
        <_components.code className="language-js">
          {'function App() {\n  // scripts.js\n  const name = "wes";\n}\n'}
        </_components.code>
      </_components.pre>
      {"\n"}
      <_components.p>
        {
          "The only reason it works is because we have globally scoped the function in another file and we are just assuming that it will be available to us on the page. That is a very brittle way to write JavaScript"
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"In the past, this was how code was shared across multiple files."}
      </_components.p>
      {"\n"}
      <_components.p>
        {
          "That got out of hand pretty quickly because you had all these files that had dependencies and the order of the script tags affected the execution because they all have to load in a waterfall, which means one after the other. Each file is assuming that the other one has access to it."
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {"If you look at our "}
        <InlineCode>{"scripts.js"}</InlineCode>
        {
          " file in VS Code, ESLint is complaining that returnHi is not defined. That is because that function does not exist within the file, so where did it come from?"
        }
      </_components.p>
      {"\n"}
      <_components.p>
        {
          "The only reason it works is because we have globally scoped the function in another file and we are just assuming that it will be available to us on the page. That is a very brittle way to write JavaScript"
        }
      </_components.p>
    </>
  );
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  );
}
export default MDXContent;
