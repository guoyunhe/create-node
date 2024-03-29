import { outputFile, outputJSON, pathExists, readJSON } from 'fs-extra';
import merge from 'merge';
import { getPackageJsonFromGit } from 'package-json-from-git';
import { basename, join } from 'path';
import sortPackageJson from 'sort-package-json';
import changelog from './template/changelog.txt';
import editorconfig from './template/editorconfig.txt';
import gitignore from './template/gitignore.txt';
import indexTestTs from './template/index.test.txt';
import indexTs from './template/index.txt';
import packageJsonDefaults from './template/package-defaults.json';
import packageJsonOverrides from './template/package-overrides.json';
import readme from './template/readme.txt';
import tsconfigJson from './template/tsconfig.json';
import vscodeExtensions from './template/vscode-extensions.json';
import vscodeSettings from './template/vscode-settings.json';

export interface CreateProjectOptions {
  // Initial version number, 1.0.0 by default
  packageVersion?: string;
}

export async function createProject(
  project: string | null,
  { packageVersion }: CreateProjectOptions
) {
  const projectFullPath = project ? join(process.cwd(), project) : process.cwd();

  // .vscode/settings.json
  const vscodeSettingsPath = join(projectFullPath, '.vscode', 'settings.json');
  outputJSON(vscodeSettingsPath, vscodeSettings, { spaces: 2 });

  // .vscode/extensions.json
  const vscodeExtensionsPath = join(projectFullPath, '.vscode', 'extensions.json');
  outputJSON(vscodeExtensionsPath, vscodeExtensions, { spaces: 2 });

  // .editorconfig
  const editorConfigPath = join(projectFullPath, '.editorconfig');
  outputFile(editorConfigPath, editorconfig);

  // .gitignore
  const gitignorePath = join(projectFullPath, '.gitignore');
  outputFile(gitignorePath, gitignore);

  // tsconfig.json
  const tsconfigJsonPath = join(projectFullPath, 'tsconfig.json');
  outputJSON(tsconfigJsonPath, tsconfigJson, { spaces: 2 });

  // package.json
  const packageJsonPath = join(projectFullPath, 'package.json');
  let oldPackageJson: any = {};
  if (await pathExists(packageJsonPath)) {
    oldPackageJson = await readJSON(packageJsonPath, { throws: false });
  }
  const newPackageJson: any = await getPackageJsonFromGit();
  merge.recursive(newPackageJson, packageJsonDefaults, oldPackageJson, packageJsonOverrides);
  newPackageJson.name ||= basename(projectFullPath);
  newPackageJson.version = packageVersion || newPackageJson.version || '1.0.0';
  outputJSON(packageJsonPath, sortPackageJson(newPackageJson), { spaces: 2 });

  // CHANGELOG.md
  const changelogPath = join(projectFullPath, 'CHANGELOG.md');
  if (!(await pathExists(changelogPath))) {
    const date = new Date().toISOString().substring(0, 10);
    const newChangelog = changelog
      .replaceAll('%date%', date)
      .replaceAll('%version%', newPackageJson.version);
    outputFile(changelogPath, newChangelog);
  }

  // README.md
  const readmePath = join(projectFullPath, 'README.md');
  if (!(await pathExists(readmePath))) {
    const newReadme = readme.replaceAll('%name%', newPackageJson.name);
    outputFile(readmePath, newReadme);
  }

  // src/index.ts
  const indexTsPath = join(projectFullPath, 'src', 'index.ts');
  if (!(await pathExists(indexTsPath))) {
    outputFile(indexTsPath, indexTs);

    // src/index.test.ts
    const indexTestTsPath = join(projectFullPath, 'src', 'index.test.ts');
    outputFile(indexTestTsPath, indexTestTs);
  }
}
