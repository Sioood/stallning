/**
 * README.md generation
 */

import { join } from 'node:path'

import { writeFileAsync } from '../core/fs.ts'
import { capitalize } from '../core/text.ts'

/**
 * Generate personalized README.md content
 */
function generateReadmeContent(projectName: string, description: string): string {
  const capitalizedName = capitalize(projectName)

  return `<div align="center">
  <h1><b>${capitalizedName}</b></h1>
  <p><i>${description}</i></p>
</div>

## Monorepo Structure

\`\`\`sh
.
├── apps
└── packages/
    └── config/
        ├── eslint
        ├── oxlint
        └── typescript
\`\`\`

\`\`\`mermaid
flowchart LR

. --> apps
. --> packages
packages --> config
config --> typescript
config --> oxfmt
config --> oxlint
config --> eslint
oxfmt --> eslint
typescript --> eslint
oxlint --> eslint
eslint --> .
oxlint --> .
\`\`\`

## 🚀 Get started

### Minimal prerequisites (Check package.json)

1. [**node**](https://nodejs.org/en/download) >=25.0.0
2. [**pnpm**](https://pnpm.io/installation) pnpm@10.33.0

\`\`\`sh
npm install -g pnpm
\`\`\`

3. [**git**](https://git-scm.com/download)

### Initialize the project

If you cloned this boilerplate to start a new project, run the init script once to customize it:

\`\`\`sh
pnpm init
\`\`\`

This will:
- Replace "stallning" with your project name across all files and directories
- Optionally reset git history for a fresh start
- Optionally add the upstream remote for future syncs

After initialization, install dependencies and you're ready to go.

\`\`\`sh
pnpm install
\`\`\`

### 📦 Recommended extensions

You can install the recommended extensions defined in the \`.vscode/${projectName}.code-workspace\` file.

Go to [VSCode](https://code.visualstudio.com/) and open the extension tab, search for the recommended extensions by typing \`@recommended\` and install them.

## Available Scripts

The following scripts are available at the root of the monorepo:

| Script                   | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| \`pnpm lint\`              | Run all linting checks.                                      |
| \`pnpm lint:oxlint\`       | Run oxlint checks.                                           |
| \`pnpm lint:eslint\`       | Run ESLint checks.                                           |
| \`pnpm check-types\`       | Run all TypeScript checks.                                   |
| \`pnpm format\`            | Format the codebase with oxfmt.                              |
| \`pnpm format:check\`      | Verify formatting with oxfmt.                                |
| \`pnpm sync:merge\`        | Merge one remote branch into a target branch.                |
| \`pnpm sync:pick\`         | Cherry-pick commit(s) from remote branch into target branch. |
| \`pnpm knip\`              | Detect unused files, exports, and dependencies.              |
| \`pnpm knip:fix\`          | Run Knip with autofix for fixable issues.                    |
| \`pnpm todoctor\`          | Run todoctor to check technical debt                         |
| \`pnpm changeset\`         | Create a new changeset for versioning.                       |
| \`pnpm changeset:release\` | Create a release tag from changesets.                        |
| \`pnpm build\`             | Build all packages and applications.                         |

## Documentation

- [Branch Sync Workflow](docs/branch-sync.md) - Fork setup, sync commands, and recovery flows
`
}

/**
 * Generate and write README.md
 */
export async function generateReadme(
  rootDir: string,
  projectName: string,
  description: string,
  dryRun: boolean,
): Promise<{ success: boolean; path?: string; error?: string }> {
  const readmePath = join(rootDir, 'README.md')
  const content = generateReadmeContent(projectName, description)

  if (dryRun) {
    return { success: true, path: readmePath }
  }

  try {
    await writeFileAsync(readmePath, content)
    return { success: true, path: readmePath }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
