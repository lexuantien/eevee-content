import { compileMdx as compileWithoutMDX } from "./mdx-bundle/index";
import { compileMdxJS } from "./mdx-js/bundle";

async function compileMdx(filePath: string) {
  const data = await compileWithoutMDX(filePath);
  // const js = await compileMdxJS(filePath);
  // data.code = js.toString();
  return data;
}

export { compileMdx };
