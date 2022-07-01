// @ts-check

import fs from "fs";
import path from "path";

let cwdForGitRoot: string;
let gitRoot: string;

export const findGitRoot = () => {
  let cwd = process.cwd();

  if (gitRoot && cwdForGitRoot === cwd) {
    return gitRoot;
  }

  const root = path.parse(cwd).root;
  let found = false;
  while (!found && cwd !== root) {
    if (fs.existsSync(path.join(cwd, ".git"))) {
      found = true;
      break;
    }

    cwd = path.dirname(cwd);
  }

  gitRoot = cwd;
  cwdForGitRoot = process.cwd();
  return gitRoot;
};
