---
name: release
description: Publish a new release of @hardimpactdev/craft-ui to GitHub Packages. Handles version bumping, git tagging, and triggering the publish workflow.
allowed-tools: Read, Write, Edit, Bash, Glob
---

# Release Workflow for @hardimpactdev/craft-ui

Publish new versions to GitHub Packages npm registry.

## Quick Release (Standard)

```bash
# 1. Bump version (patch/minor/major)
npm version patch --no-git-tag-version

# 2. Commit the version bump
git add package.json
git commit -m "Bump version to $(node -p "require('./package.json').version")"
git push origin main

# 3. Create GitHub release (triggers publish workflow)
VERSION=$(node -p "require('./package.json').version")
gh release create "v$VERSION" --title "v$VERSION" --notes "Release v$VERSION"
```

## Version Types

| Command | When to Use | Example |
|---------|-------------|---------|
| `npm version patch` | Bug fixes, small changes | 0.0.41 → 0.0.42 |
| `npm version minor` | New features, backwards compatible | 0.0.41 → 0.1.0 |
| `npm version major` | Breaking changes | 0.0.41 → 1.0.0 |

## How It Works

1. **Workflow Trigger**: Creating a GitHub release triggers `.github/workflows/publish.yml`
2. **Build**: Runs `bun install` and `bun run build`
3. **Publish**: Uses `GITHUB_TOKEN` to authenticate with GitHub Packages

## Critical Configuration

### package.json (Required)

```json
{
  "name": "@hardimpactdev/craft-ui",
  "publishConfig": {
    "@hardimpactdev:registry": "https://npm.pkg.github.com"
  }
}
```

### Workflow (.github/workflows/publish.yml)

The workflow **must** overwrite any committed `.npmrc` to ensure proper authentication:

```yaml
- name: Configure npm for GitHub Packages
  run: |
    echo "@hardimpactdev:registry=https://npm.pkg.github.com" > .npmrc
    echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc

- name: Publish to GitHub Packages
  run: npm publish
```

## Troubleshooting

### 401 Unauthorized Error

**Symptoms:**
```
npm error 401 Unauthorized - PUT https://npm.pkg.github.com/@hardimpactdev%2fcraft-ui
- unauthenticated: User cannot be authenticated with the token provided.
```

**Common Causes:**

1. **Committed `.npmrc` overriding workflow config**
   - The repo has a `.npmrc` with `${LIFTOFF_VUE}` or other env vars
   - Solution: Workflow must explicitly overwrite `.npmrc` (see above)

2. **Wrong publishConfig format**
   - Wrong: `"registry": "https://npm.pkg.github.com"`
   - Right: `"@hardimpactdev:registry": "https://npm.pkg.github.com"`

3. **Missing workflow permissions**
   - Ensure job has `permissions: packages: write`

4. **Org/repo Actions permissions**
   - Go to org Settings → Actions → General
   - Set "Workflow permissions" to "Read and write permissions"

### Package Not Visible

If package exists but can't be queried:
- Your PAT needs `read:packages` scope to view package versions
- `GITHUB_TOKEN` in Actions has this automatically via `packages: write`

### Fine-Grained PATs Don't Work

GitHub Packages requires **classic** Personal Access Tokens. Fine-grained PATs do not support GitHub Packages.

## Consuming the Package

### Installing in Other Projects

1. Create `.npmrc` in the consuming project:
```
@hardimpactdev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Set `GITHUB_TOKEN` environment variable with `read:packages` scope

3. Install:
```bash
npm install @hardimpactdev/craft-ui
```

## Monitoring

### Check Workflow Status
```bash
gh run list --limit 5
```

### View Failed Run Logs
```bash
gh run view <run-id> --log-failed
```

### List Published Versions (requires read:packages)
```bash
gh api /orgs/hardimpactdev/packages/npm/craft-ui/versions --jq '.[].name'
```

## Local Development Setup

### 1. Configure GITHUB_TOKEN in ~/.bashrc

Add to `~/.bashrc`:
```bash
export GITHUB_TOKEN=ghp_your_token_here
```

Then reload:
```bash
source ~/.bashrc
```

### 2. Ensure .npmrc uses GITHUB_TOKEN

The local `.npmrc` should reference the same variable:
```
@hardimpactdev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 3. Required PAT Scopes

| Operation | Required Scopes |
|-----------|-----------------|
| Publish packages | `repo`, `write:packages` |
| Install private packages | `repo`, `read:packages` |
| List/view package versions | `read:packages` |
| Delete package versions | `repo`, `read:packages`, `delete:packages` |

**Note**: `write:packages` does NOT automatically include `read:packages`. You must explicitly select both.

### 4. Verify PAT Scopes

Check what scopes your token has:
```bash
curl -sS -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user -I | grep x-oauth-scopes
```

Expected output for full access:
```
x-oauth-scopes: repo, read:packages, write:packages, delete:packages
```

### 5. Creating a Classic PAT

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (full control)
   - `write:packages` (upload packages)
   - `read:packages` (download packages) - **check this explicitly!**
   - `delete:packages` (optional, for cleanup)
4. Copy token immediately (shown only once)

## Managing Package Versions

### List All Versions
```bash
gh api /orgs/hardimpactdev/packages/npm/craft-ui/versions --jq '.[] | "\(.id): \(.name)"'
```

### Delete a Specific Version
```bash
# Get version ID from list above, then:
gh api -X DELETE /orgs/hardimpactdev/packages/npm/craft-ui/versions/<version-id>
```

### Delete Multiple Old Versions
```bash
# Delete all versions except the 5 most recent
gh api /orgs/hardimpactdev/packages/npm/craft-ui/versions --jq '.[5:] | .[].id' | \
  xargs -I {} gh api -X DELETE /orgs/hardimpactdev/packages/npm/craft-ui/versions/{}
```

## Key Learnings

1. **Committed `.npmrc` overrides CI config**: If `.npmrc` is in the repo with undefined env vars (like `${CRAFT_UI}`), it overrides what `setup-node` configures. The workflow must explicitly overwrite it.

2. **Scope-specific registry format**: For scoped packages (@org/package), use `@org:registry=` format (not `@org/package:registry=`).

3. **GITHUB_TOKEN vs PAT**: In GitHub Actions, prefer `secrets.GITHUB_TOKEN` with `packages: write` permission. It's automatic and properly scoped.

4. **Organization packages**: Ensure the package has "Actions access" configured (Package settings → Manage Actions access).

5. **PAT scopes are NOT hierarchical**: `write:packages` does NOT include `read:packages`. Select both explicitly when creating a PAT.

6. **Fine-grained PATs don't work**: GitHub Packages requires classic PATs only.

7. **Keep local and CI in sync**: Use the same env var name (`GITHUB_TOKEN`) in both `.bashrc` and `.npmrc` to avoid confusion.
