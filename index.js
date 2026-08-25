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
  intro(pc.inverse(pc.bold(' ✦ Antigravity Skills Installer ')));

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

  // Define default install paths
  const globalConfigDir = path.join(os.homedir(), '.gemini', 'config', 'skills');

  const destChoice = await text({
    message: 'Where should we install these skills? (Provide absolute path, or leave empty for global default)',
    placeholder: globalConfigDir,
    defaultValue: globalConfigDir,
  });

  if (isCancel(destChoice)) {
    cancel('Installation cancelled.');
    process.exit(0);
  }

  const targetDir = destChoice || globalConfigDir;
  
  const s = spinner();
  s.start(`Installing ${selectedSkills.length} skills to ${targetDir}`);

  // Create target dir if it doesn't exist
  await fs.ensureDir(targetDir);

  for (const skill of selectedSkills) {
    const srcPath = path.join(skillsDir, skill);
    const destPath = path.join(targetDir, skill);
    await fs.copy(srcPath, destPath);
  }

  s.stop('Installation complete!');

  outro(pc.green(`Successfully installed ${selectedSkills.length} skills. You're ready to go! 🎉`));
}

main().catch(err => {
  console.error(pc.red('An error occurred during installation:'));
  console.error(err);
  process.exit(1);
});
