#!/usr/bin/env node

/**
 * Generates command/skill files for all supported AI coding platforms
 * for every skill found under .claude/skills/<name>/SKILL.md.
 *
 * Usage: node scripts/sync-skills.mjs
 *
 * To add a new skill: drop a SKILL.md into .claude/skills/<name>/ and rerun.
 * After editing any existing SKILL.md, rerun this script to regenerate.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = join(ROOT, '.claude', 'skills');

// --- Discover skills ---

function discoverSkills() {
  let entries;
  try {
    entries = readdirSync(SKILLS_DIR);
  } catch {
    console.error(`Error: skills directory not found at ${SKILLS_DIR}`);
    process.exit(1);
  }
  const skills = [];
  for (const entry of entries) {
    const skillDir = join(SKILLS_DIR, entry);
    if (!statSync(skillDir).isDirectory()) continue;
    const skillFile = join(skillDir, 'SKILL.md');
    try {
      const raw = readFileSync(skillFile, 'utf8').replace(/\r\n/g, '\n');
      skills.push({ name: entry, raw, sourcePath: skillFile });
    } catch {
      console.warn(`  ! Skipping ${entry}: no SKILL.md found`);
    }
  }
  if (skills.length === 0) {
    console.error('Error: no skills found under .claude/skills/*/SKILL.md');
    process.exit(1);
  }
  return skills;
}

// --- Parse frontmatter ---

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Could not parse SKILL.md frontmatter (missing --- delimiters)');
  }
  const [, frontmatter, body] = match;

  const get = (key) => {
    const m = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'));
    if (!m) return null;
    return m[1].replace(/^['"]|['"]$/g, '').trim();
  };

  const description = get('description');
  if (!description) {
    throw new Error('SKILL.md frontmatter missing required "description" field');
  }

  // Optional: short-desc overrides the auto-derived first-line of description
  // for platform listings that need a punchier tagline.
  const shortDesc = get('short-desc') || description.split('\n')[0].trim();

  return { description, shortDesc, body };
}

// --- Helpers ---

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  \u2713 ${relPath}`);
}

const headerFor = (sourceName) =>
  `<!-- AUTO-GENERATED from .claude/skills/${sourceName}/SKILL.md \u2014 do not edit directly.\n` +
  `     Run \`node scripts/sync-skills.mjs\` to regenerate. -->\n\n`;

const noArgs = (text) => text.replace(/\$ARGUMENTS/g, 'the target URL provided by the user');

// --- Per-skill generator ---

function syncSkill({ name, raw }) {
  const { body, shortDesc } = parseFrontmatter(raw);

  console.log(`\nSyncing ${name}...`);
  console.log(`  Source: .claude/skills/${name}/SKILL.md`);

  const HEADER = headerFor(name);

  // 1. Codex CLI — same SKILL.md format, same $ARGUMENTS syntax
  write(`.codex/skills/${name}/SKILL.md`, raw);

  // 2. GitHub Copilot — same SKILL.md format
  write(`.github/skills/${name}/SKILL.md`, raw);

  // 3. Cursor — plain markdown, no argument substitution support
  write(`.cursor/commands/${name}.md`, HEADER + noArgs(body));

  // 4. Windsurf — markdown workflow
  write(`.windsurf/workflows/${name}.md`, HEADER + noArgs(body));

  // 5. Gemini CLI — TOML format, {{args}} for arguments
  const geminiBody = body.replace(/\$ARGUMENTS/g, '{{args}}');
  write(
    `.gemini/commands/${name}.toml`,
    `# AUTO-GENERATED from .claude/skills/${name}/SKILL.md\n` +
      `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
      `description = "${shortDesc.replace(/"/g, '\\"')}"\n` +
      `name = "${name}"\n\n` +
      `prompt = '''\n${geminiBody}\n'''\n`
  );

  // 6. OpenCode — markdown + YAML frontmatter, $ARGUMENTS works natively
  write(
    `.opencode/commands/${name}.md`,
    `---\ndescription: "${shortDesc.replace(/"/g, '\\"')}"\n---\n${HEADER}${body}`
  );

  // 7. Augment Code — markdown + YAML frontmatter
  write(
    `.augment/commands/${name}.md`,
    `---\ndescription: "${shortDesc.replace(/"/g, '\\"')}"\nargument-hint: "<args>"\n---\n${HEADER}${body}`
  );

  // 8. Continue — prompt file with invokable: true
  write(
    `.continue/commands/${name}.md`,
    `---\nname: ${name}\ndescription: "${shortDesc.replace(/"/g, '\\"')}"\ninvokable: true\n---\n${HEADER}${body}`
  );

  // 9. Amazon Q — JSON agent definition
  write(
    `.amazonq/cli-agents/${name}.json`,
    JSON.stringify(
      {
        name,
        description: shortDesc,
        prompt: noArgs(body),
        fileContext: ['AGENTS.md'],
      },
      null,
      2
    ) + '\n'
  );

  console.log(`  Done: 9 platform files for ${name}.`);
}

// --- Main ---

const skills = discoverSkills();
console.log(`Found ${skills.length} skill${skills.length === 1 ? '' : 's'}: ${skills.map((s) => s.name).join(', ')}`);

for (const skill of skills) {
  try {
    syncSkill(skill);
  } catch (err) {
    console.error(`\nError syncing ${skill.name}: ${err.message}`);
    process.exit(1);
  }
}

console.log(
  `\nDone! ${skills.length} skill${skills.length === 1 ? '' : 's'} synced \u2192 ${skills.length * 9} platform command files generated.`
);
