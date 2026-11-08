import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const SKILL = join(dirname(fileURLToPath(import.meta.url)), '..', 'skills', 'agentry');
const ASSETS = join(SKILL, 'assets');
// Git on Windows may check files out with CRLF (core.autocrlf); the tests read them as LF.
const lf = (text) => text.replace(/\r\n/g, '\n');
const read = (...parts) => lf(readFileSync(join(ASSETS, ...parts), 'utf8'));
const skillText = lf(readFileSync(join(SKILL, 'SKILL.md'), 'utf8'));

test('SKILL.md: frontmatter names the skill after its directory', () => {
  assert.match(skillText, /^---\nname: agentry\ndescription: >-\n/);
});

test('SKILL.md: the description stays under 1024 characters', () => {
  const description = /description: >-\n([\s\S]*?)\n---/.exec(skillText)[1].replace(/\s+/g, ' ');
  assert.ok(description.length < 1024, `${description.length} characters`);
});

test('SKILL.md: stays short enough to read in one go', () => {
  assert.ok(skillText.trimEnd().split('\n').length <= 150);
});

const skillRows = [
  { name: 'asks for the language of the product apart from the user\'s', needle: 'not the same as the language the user speaks' },
  { name: 'ships no mandatory hooks', needle: 'Agentry ships no mandatory hooks' },
  { name: 'presents extras as a question', needle: 'suggest, never install by default' },
  { name: 'adapts the contracts to a project that is not software', needle: 'not software' },
];

for (const row of skillRows) {
  test(`SKILL.md: ${row.name}`, () => {
    assert.ok(skillText.includes(row.needle));
  });
}

const assetFiles = readdirSync(ASSETS, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => ({ dir: entry.parentPath.slice(ASSETS.length + 1).split('\\').join('/'), name: entry.name }));

for (const file of assetFiles) {
  test(`SKILL.md accounts for asset ${file.dir}/${file.name}`, () => {
    assert.ok(skillText.includes(file.name) || skillText.includes(`${file.dir}/*`));
  });
}

test('assets hold no script, workflow or settings file', () => {
  assert.deepEqual(assetFiles.filter((f) => /\.(mjs|js|yml|json)$/.test(f.name)), []);
});

for (const variant of ['design-ui', 'design-interface', 'design-content']) {
  test(`${variant} asks which language the text is written in`, () => {
    assert.match(read('contracts', `${variant}.md`), /language/i);
  });
}

// Claude Code subagents are optional extras: they must be read-only and pinned to a model.
const AGENTS_DIR = join(ASSETS, 'claude-code', 'agents');
const agentFiles = readdirSync(AGENTS_DIR).filter((file) => file.endsWith('.md'));
const READ_ONLY_TOOLS = ['Read', 'Grep', 'Glob', 'WebSearch', 'WebFetch'];
// Agents that run a command; their body must restrict Bash to read-only or a single configured command.
const BASH_AGENTS = ['diff-review.md', 'dead-code-check.md', 'spec-runner.md', 'spec-review.md'];
// spec-runner writes code: it must run in its own worktree.
const WRITE_AGENTS = ['spec-runner.md'];
const WRITE_TOOLS = ['Edit', 'Write'];
// spec-review may edit the spec file only (Edit, never Write); it needs no worktree.
const EDIT_ONLY_AGENTS = ['spec-review.md'];
const agentText = (file) => lf(readFileSync(join(AGENTS_DIR, file), 'utf8'));

for (const file of agentFiles) {
  test(`subagent ${file}: frontmatter names it after the file and pins a model`, () => {
    const text = agentText(file);
    assert.equal(/^name: (.+)$/m.exec(text)?.[1], file.replace(/\.md$/, ''));
    assert.match(text, /^description: \S/m);
    assert.match(text, /^model: (haiku|sonnet|opus)$/m);
  });

  test(`subagent ${file}: only receives read-only tools`, () => {
    const tools = /^tools: (.+)$/m.exec(agentText(file))[1].split(',').map((tool) => tool.trim());
    const allowed = [
      ...READ_ONLY_TOOLS,
      ...(BASH_AGENTS.includes(file) ? ['Bash'] : []),
      ...(WRITE_AGENTS.includes(file) ? WRITE_TOOLS : []),
      ...(EDIT_ONLY_AGENTS.includes(file) ? ['Edit'] : []),
    ];
    assert.deepEqual(tools.filter((tool) => !allowed.includes(tool)), []);
    if (tools.includes('Bash')) assert.match(agentText(file), /Bash is (allowed only|for)/);
  });
}

test('subagent spec-runner: isolated in a worktree, never pushes, merges or skips hooks', () => {
  const text = agentText('spec-runner.md');
  assert.match(text, /^isolation: worktree$/m);
  assert.doesNotMatch(text, /WebSearch|WebFetch/);
  assert.match(text, /Never push, merge, rebase, reset/);
  assert.match(text, /No trailers, no `--no-verify`/);
});

test('subagent spec-review: edits only the spec and never writes code', () => {
  const text = agentText('spec-review.md');
  assert.doesNotMatch(/^tools: (.+)$/m.exec(text)[1], /Write/);
  assert.match(text, /read-only git commands: `git status`, `git diff`, `git log`/);
  assert.match(text, /uncommitted changes, stop and edit nothing/);
  assert.match(text, /Edit only the spec/);
  assert.match(text, /Never touch code, contracts/);
});

test('only write-capable subagents declare isolation', () => {
  const isolated = agentFiles.filter((file) => /^isolation:/m.test(agentText(file)));
  assert.deepEqual(isolated, WRITE_AGENTS);
});

// Antigravity subagents: only use runtime-injected tools (view_file, run_command); grep_search is ignored by the runtime, so read-only git grep is used in sandbox.
const AG_DIR = join(ASSETS, 'antigravity', 'agents');
const AG_TOOLS = ['view_file', 'run_command'];
for (const file of readdirSync(AG_DIR).filter((f) => f.endsWith('.md'))) {
  test(`antigravity subagent ${file}: documented tools, pinned model, sandboxed commands`, () => {
    const text = lf(readFileSync(join(AG_DIR, file), 'utf8'));
    assert.equal(/^name: (.+)$/m.exec(text)?.[1], file.replace(/\.md$/, ''));
    assert.match(text, /^subagent: true$/m);
    assert.match(text, /^mainAgent: false$/m);
    assert.match(text, /^model: (inherit|flash|pro)$/m);
    const tools = /^tools: \[(.+)\]$/m.exec(text)[1].split(',').map((t) => t.trim());
    assert.deepEqual(tools.filter((t) => !AG_TOOLS.includes(t)), []);
    if (tools.includes('run_command')) {
      assert.match(text, /^commandExecutionPolicy: sandbox$/m);
      assert.match(text, /run_command is (allowed only|for)/);
    }
  });
}
