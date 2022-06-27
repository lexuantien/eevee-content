export = findConfig;
/**
 * Find a config file path, starting in the current directory and looking up to the Git root directory
 * (which contain .git) or the drive root.
 * @param {string} configName - Config file name. If an absolute path, will be returned unmodified.
 * @param {string} [cwd] optional different cwd
 * @returns The config file's path, or undefined if not found
 */
declare function findConfig(configName: string, cwd?: string): string;
