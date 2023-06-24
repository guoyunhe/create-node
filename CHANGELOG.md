# Changelog

## 1.6.0 - 2023-06-24

- Updated to nodejs 20
- Updated to typescript 5

## 1.5.0 - 2023-02-11

- Updated `@guoyunhe/node-scripts` to 2.0
- Splitted `package.json` template into `package-defaults.json` and `package-overrides.json`
- Changed to not override `src/index.ts`, `README.md`, `CHANGELOG.md`
- Simplified `.gitignore` template

## 1.4.0 - 2023-01-29

- Removed template `commander` dependency

## 1.3.2 - 2023-01-26

- Changed Prettier `printWidth` to `100`

## 1.3.1 - 2023-01-26

- Fixed VSCode `editor.rulers` settings

## 1.3.0 - 2023-01-22

- Added `description` and `keywords` to `package.json` template

## 1.2.0 - 2023-01-22

- Use `package-json-from-git` to initialize `repository`, `homepage`, `bugs` and `author` fields in `package.json` from Git data

## 1.1.0 - 2023-01-22

- Remove `jest-mock-console` dependency
- Initialize `repository`, `homepage`, `bugs` and `author` fields in `package.json` from Git data

## 1.0.0 - 2022-12-17

- Initialize a typical Node.js project
