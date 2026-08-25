# Antigravity Skills Installer (kly-skill)

An interactive command-line tool for installing Antigravity Skills to your local environment.

> **Note:** This repository is a compilation of skills that I personally use.

This utility provides a guided CLI experience (powered by `@clack/prompts`) to help you browse and install various Antigravity AI skills into your global skills directory (by default, `~/.gemini/config/skills`). 

## Prerequisites

- **Node.js** (v14 or higher is recommended)
- **npm** or another Node package manager

## Usage

The easiest way to use the installer is via `npx` (which comes with npm). You don't need to install anything beforehand:

```bash
npx kly-skill
```

If you prefer to install it globally so you can use the command anywhere, you can do:

```bash
npm install -g kly-skill
kly-skills
```

### The Installation Process

1. **Select Skills**: You will be presented with a multi-select list of available skills (e.g., `brandkit`, `design-taste-frontend`, `impeccable`, etc.). Use your arrow keys and spacebar to select the skills you want to install.
2. **Choose Destination**: You can specify an absolute path for the installation. If you leave it blank, it defaults to your global Antigravity config directory: `~/.gemini/config/skills` (or the equivalent on your OS).
3. **Finish**: The tool will securely copy the selected skill directories into your target path.

## Bundled Skills

The tool comes bundled with a variety of specialized skills located in the `data/skills/` directory, including but not limited to:
- `brandkit`
- `design-taste-frontend`
- `gpt-tasteskill`
- `impeccable`
- `minimalist-skill`
- `ui-ux-pro-max-skill`
- ...and more.

## Development

To add more skills to the installer, simply place the skill folder (containing the `SKILL.md` and any other resources) into the `data/skills/` directory. The CLI will automatically detect and list it as an available option during the next run.
