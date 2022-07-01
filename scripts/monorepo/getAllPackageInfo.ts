import * as fs from "fs-extra";
import path from "path";
import lernaAlias from "lerna-alias";
import { findGitRoot } from "./findGitRoot";

interface PackageJson {
  name: string;
  version: string;
  main: string;
  types?: string;
  module?: string;
  private?: boolean;
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  peerDependencies?: { [key: string]: string };
  [key: string]: any;
}

interface PackageInfo {
  /** Package path relative to the project root */
  packagePath: string;
  /** package.json contents */
  packageJson: PackageJson;
}

type AllPackageInfo = { [packageName: string]: PackageInfo };

let packageInfo: AllPackageInfo;
let cwdForPackageInfo: string;

export const getAllPackageInfo = () => {
  if (packageInfo && cwdForPackageInfo === process.cwd()) {
    return packageInfo;
  }

  // Get mapping from package name to package path
  // (rollup helper happens to be good for getting basic package name/path pairs)
  const packagePaths = lernaAlias.rollup({ sourceDirectory: false });

  delete packagePaths["@eevee/noop"]; // not a real package

  packageInfo = {};
  cwdForPackageInfo = process.cwd();
  const gitRoot = findGitRoot();

  for (const [packageName, packagePath] of Object.entries(packagePaths)) {
    packageInfo[packageName] = {
      packagePath: path.relative(gitRoot, packagePath),
      packageJson: fs.readJSONSync(path.join(packagePath, "package.json")),
    };
  }

  return packageInfo;
};
