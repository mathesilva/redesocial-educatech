# Git Flow

## Branch Strategy

| Branch      | Purpose                                      |
| ----------- | -------------------------------------------- |
| `main`      | Production-ready code                        |
| `develop`   | Integration branch for ongoing development   |
| `feature/*` | New features (e.g. `feature/auth-module`)    |
| `fix/*`     | Bug fixes (e.g. `fix/health-check-timeout`)  |
| `release/*` | Release preparation                        |
| `hotfix/*`  | Urgent production fixes                      |

## Workflow

1. Create a feature branch from `develop`.
2. Implement changes with focused, atomic commits.
3. Open a Pull Request targeting `develop`.
4. After review and CI pass, merge into `develop`.
5. When ready for release, create a `release/*` branch from `develop`.
6. Merge the release into `main` and tag the version.
7. Merge `main` back into `develop`.

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user registration endpoint
fix: correct health check response format
docs: update API documentation
chore: upgrade dependencies
refactor: extract env validation to config module
test: add health route integration test
```

## Pull Request Guidelines

- Keep PRs small and focused on a single concern.
- Include a clear description of what changed and why.
- Reference related issues when applicable.
- Ensure lint and build pass before requesting review.

## Versioning

The project follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.
