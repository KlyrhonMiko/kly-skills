#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { intro, outro, multiselect, select, text, spinner, cancel, isCancel } from '@clack/prompts';
import pc from 'picocolors';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.clear();
  intro(pc.inverse(pc.bold(' ✦ Skills Installer ')));

  const skillsDir = path.join(__dirname, 'data', 'skills');
  
  if (!fs.existsSync(skillsDir)) {
    cancel('Data directory not found. Are the skills bundled correctly?');
    process.exit(1);
  }

  // Get all skills (directories only)
  const items = await fs.readdir(skillsDir);
  const skills = [];
  
  for (const item of items) {
    const itemPath = path.join(skillsDir, item);
    const stat = await fs.stat(itemPath);
    if (stat.isDirectory()) {
      skills.push(item);
    }
  }

  if (skills.length === 0) {
    cancel('No skills found to install.');
    process.exit(1);
  }

  const installAll = await select({
    message: 'Which skills would you like to install?',
    options: [
      { value: 'all', label: pc.cyan('✦ All Skills') },
      { value: 'specific', label: 'Select specific skills' }
    ]
  });

  if (isCancel(installAll)) {
    cancel('Installation cancelled.');
    process.exit(0);
  }

  let selectedSkills = [];
  
  if (installAll === 'all') {
    selectedSkills = skills;
  } else {
    selectedSkills = await multiselect({
      message: 'Select the skills you want to install:',
      options: skills.map(skill => ({
        value: skill,
        label: skill,
      })),
      required: true,
    });

    if (isCancel(selectedSkills)) {
      cancel('Installation cancelled.');
      process.exit(0);
    }
  }

  const targetPlatforms = await multiselect({
    message: 'Which platform(s) would you like to install the skills for?',
    options: [
      { value: 'antigravity', label: 'Antigravity', hint: '~/.gemini/config/skills' },
      { value: 'codex', label: 'Codex', hint: '~/.codex/skills' },
      { value: 'custom', label: 'Custom Path', hint: 'Provide an absolute path' }
    ],
    required: true,
  });

  if (isCancel(targetPlatforms)) {
    cancel('Installation cancelled.');
    process.exit(0);
  }

  const antigravityConfigDir = path.join(os.homedir(), '.gemini', 'config', 'skills');
  const codexConfigDir = path.join(os.homedir(), '.codex', 'skills');
  
  const targetDirs = [];

  if (targetPlatforms.includes('antigravity')) {
    targetDirs.push(antigravityConfigDir);
  }
  if (targetPlatforms.includes('codex')) {
    targetDirs.push(codexConfigDir);
  }
  if (targetPlatforms.includes('custom')) {
    const customDest = await text({
      message: 'Enter custom absolute path for installation:',
      placeholder: '/path/to/custom/skills/dir',
    });

    if (isCancel(customDest) || !customDest) {
      cancel('Installation cancelled.');
      process.exit(0);
    }
    targetDirs.push(customDest);
  }

  const s = spinner();
  s.start(`Installing ${selectedSkills.length} skills...`);

  for (const targetDir of targetDirs) {
    await fs.ensureDir(targetDir);
    for (const skill of selectedSkills) {
      const srcPath = path.join(skillsDir, skill);
      const destPath = path.join(targetDir, skill);
      await fs.copy(srcPath, destPath);
    }
  }

  s.stop('Installation complete!');

  outro(pc.green(`Successfully installed ${selectedSkills.length} skills to ${targetDirs.length} location(s). You're ready to go! 🎉`));
}

main().catch(err => {
  console.error(pc.red('An error occurred during installation:'));
  console.error(err);
  process.exit(1);
});
