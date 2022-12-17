# @guoyunhe/create-node

Initialize a Node.js library project

## Get Started

### Create a new project

```bash
npm create @guoyunhe/node my-lib
```

### Initialize an existing project

```bash
cd my-lib
npm init @guoyunhe/node
```

### Project structure

```bash
├── dist                     # Build output
│   ├── cjs                 # CJS format
│   │   └── index.js
│   ├── esm                 # ESM module format
│   │   └── index.js
│   └── dts                 # TypeScript types
│       └── index.d.ts
├── src                      # Source code
│   ├── index.test.ts       # API unit test
│   └── index.ts            # API entry (add all exports here)
├── .editorconfig
├── .gitignore
├── CHANGELOG.md
├── package.json
├── README.md
└── tsconfig.json
```

### Package scripts

```bash
# Build output
npm run build
# Build output in watch mode
npm run watch
# Format source code
npm run format
# Check lint issues
npm run lint
# Run unit tests (support all jest command options)
npm test
# Run unit tests in watch mode
npm test -- --watch
# Update unit test snapshots
npm test -- -u
```

## Advanced Options

### Initial package version

1.0.0 by default.

```bash
npm create @guoyunhe/node my-lib --package-version 0.1.0
```

### Minimum supported Node.js version

Options: 12, 14, 16(default), 18.

```bash
npm create @guoyunhe/node my-lib --node-version 14
```

### Use strict TypeScript configuration

```bash
npm create @guoyunhe/node my-lib --strict
```

### Pure ESM package

If you want your package to be pure ESM, you should modify the following attributes in `package.json`:

```json
{
  "type": "module",
  "main": "dist/esm/index.js"
}
```
