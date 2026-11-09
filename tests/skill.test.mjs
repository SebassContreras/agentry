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

const PLAYBOOK_NAMES = ['plan', 'change', 'review', 'parallel'];

const skillRows = [
  { name: 'asks for the language of the product apart from the user\'s', needle: 'may differ from the language the user speaks' },
  { name: 'ships no mandatory hooks', needle: 'Agentry ships no mandatory hooks' },
  { name: 'presents extras as a question', needle: 'suggest, never install by default' },
  { name: 'adapts the contracts to a project that is not software', needle: 'not software' },
  { name: 'distributes an existing plan across the contracts', needle: 'distribute the plan; never paste it into one contract' },
  { name: 'sends order and dates to the planning tracker', needle: 'order, phases, dates, later ideas' },
  { name: 'reviews the spec made from an existing plan', needle: 'run `spec-review` on it; the plan is input, not the spec' },
];

for (const row of skillRows) {
  test(`SKILL.md: ${row.name}`, () => {
    assert.ok(skillText.includes(row.needle));
  });
}

const assetFiles = readdirSync(ASSETS, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => ({ dir: (entry.parentPath ?? entry.path).slice(ASSETS.length + 1).split('\\').join('/'), name: entry.name }));

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

// Subagents are optional, host-neutral extras: each declares abstract capabilities and a model tier,
// and the agent running the skill adapts the file to its own host. They must be least-privilege.
const AGENTS_DIR = join(ASSETS, 'agents');
const agentFiles = readdirSync(AGENTS_DIR).filter((file) => file.endsWith('.md'));
const CAPABILITIES = ['read', 'edit-files', 'write-files', 'shell', 'web'];
// Agents that run a command; their body must restrict the shell to read-only git or one configured command.
const SHELL_AGENTS = ['diff-review.md', 'dead-code-check.md', 'spec-runner.md', 'spec-review.md', 'contract-sync.md'];
// spec-runner writes code: it must run in its own worktree.
const WRITE_AGENTS = ['spec-runner.md'];
// spec-review may edit the spec file only (edit-files, never write-files); it needs no worktree.
const EDIT_ONLY_AGENTS = ['spec-review.md', 'contract-sync.md'];
const WEB_AGENTS = ['research.md'];
const agentText = (file) => lf(readFileSync(join(AGENTS_DIR, file), 'utf8'));
const capabilitiesOf = (file) => /^capabilities: \[(.+)\]$/m.exec(agentText(file))[1].split(',').map((c) => c.trim());

for (const file of agentFiles) {
  test(`subagent ${file}: frontmatter names it after the file and sets a tier and a turn limit`, () => {
    const text = agentText(file);
    assert.equal(/^name: (.+)$/m.exec(text)?.[1], file.replace(/\.md$/, ''));
    assert.match(text, /^description: \S/m);
    assert.match(text, /^tier: (fast|standard)$/m);
    assert.match(text, /^max-turns: \d+$/m);
  });

  test(`subagent ${file}: only declares the capabilities its job needs`, () => {
    const capabilities = capabilitiesOf(file);
    const allowed = [
      'read',
      ...(SHELL_AGENTS.includes(file) ? ['shell'] : []),
      ...(WRITE_AGENTS.includes(file) ? ['edit-files', 'write-files'] : []),
      ...(EDIT_ONLY_AGENTS.includes(file) ? ['edit-files'] : []),
      ...(WEB_AGENTS.includes(file) ? ['web'] : []),
    ];
    assert.deepEqual(capabilities.filter((c) => !CAPABILITIES.includes(c)), []);
    assert.deepEqual(capabilities.filter((c) => !allowed.includes(c)), []);
    if (capabilities.includes('shell')) assert.match(agentText(file), /Shell is (allowed only|for)/);
  });

  test(`subagent ${file}: names no host-specific tool or model`, () => {
    assert.doesNotMatch(agentText(file), /\b(Bash|WebSearch|WebFetch|view_file|run_command|haiku|sonnet|opus|flash)\b/i);
  });
}

test('subagent spec-runner: isolated in a worktree, never pushes, merges or skips hooks', () => {
  const text = agentText('spec-runner.md');
  assert.match(text, /^isolation: worktree$/m);
  assert.ok(!capabilitiesOf('spec-runner.md').includes('web'));
  assert.match(text, /Never push, merge, rebase, reset/);
  assert.match(text, /No trailers, no `--no-verify`/);
});

test('subagent spec-review: edits only the spec, never writes code, and has a fallback without an edit tool', () => {
  const text = agentText('spec-review.md');
  assert.ok(!capabilitiesOf('spec-review.md').includes('write-files'));
  assert.match(text, /read-only git commands: `git status`, `git diff`, `git log`/);
  assert.match(text, /uncommitted changes, stop and edit nothing/);
  assert.match(text, /Edit only the spec/);
  assert.match(text, /Never touch code, contracts/);
  assert.match(text, /## Fixes to apply/);
});

test('subagent contract-sync: edits only contracts and playbooks, reads what they reference, and needs a clean git state', () => {
  const text = agentText('contract-sync.md');
  assert.ok(!capabilitiesOf('contract-sync.md').includes('write-files'));
  assert.match(text, /read-only git commands: `git status`, `git diff`, `git log`/);
  assert.match(text, /uncommitted changes, stop and edit nothing/);
  assert.match(text, /Edit only the contracts and playbooks/);
  assert.match(text, /read them, never edit them/);
  assert.match(text, /## Needs a decision/);
  assert.match(text, /## Fixes to apply/);
});

test('only write-capable subagents declare isolation', () => {
  const isolated = agentFiles.filter((file) => /^isolation:/m.test(agentText(file)));
  assert.deepEqual(isolated, WRITE_AGENTS);
});

test('SKILL.md: has the running agent adapt the subagents to its host', () => {
  assert.ok(skillText.includes('agents/*.md'));
  assert.ok(skillText.includes('you adapt them to the host you are running in'));
  assert.doesNotMatch(skillText, /claude-code|antigravity/i);
});

test('SKILL.md: is host-neutral and has the agent wire AGENTS.md through its own instruction file', () => {
  assert.ok(skillText.includes('does not load `AGENTS.md` by itself'));
  assert.doesNotMatch(skillText, /CLAUDE_SKILL_DIR|settings\.json|@AGENTS\.md/);
});

test('playbooks: name no host-specific setting or folder', () => {
  for (const name of PLAYBOOK_NAMES) {
    assert.doesNotMatch(read('playbooks', `${name}.md`), /worktree\.baseRef|\.worktreeinclude|\.claude\//);
  }
});

test('SKILL.md: asks for approval before switching planning lanes and handles a foreign AGENTS.md', () => {
  assert.ok(skillText.includes("get the user's approval before deleting"));
  assert.ok(skillText.includes('**adopt**'));
});

test('subagent spec-runner: every git command its report asks for is allowed by its Limits', () => {
  const text = agentText('spec-runner.md');
  const limits = /## Limits\n([\s\S]*?)\n## Report/.exec(text)[1];
  const report = /## Report[\s\S]*$/.exec(text)[0];
  const commands = [...report.matchAll(/`(git [^`]+)`/g)].map((m) => m[1]);
  assert.ok(commands.length > 0);
  assert.deepEqual(commands.filter((cmd) => !limits.includes(cmd)), []);
});

test('package.json: engines match the Node needed by the test glob', () => {
  const pkg = JSON.parse(readFileSync(join(SKILL, '..', '..', 'package.json'), 'utf8'));
  assert.equal(pkg.engines.node, '>=22');
});

test('README: the manual install copies skills/agentry, where SKILL.md lives', () => {
  const readme = lf(readFileSync(join(SKILL, '..', '..', 'README.md'), 'utf8'));
  assert.match(readme, /cp -r agentry-src\/skills\/agentry ~\/\.claude\/skills\/agentry/);
  assert.doesNotMatch(readme, /git clone \S+ ~\//);
});

test('subagents that follow a playbook find it through the AGENTS.md router, not a fixed path', () => {
  for (const file of ['spec-review.md', 'diff-review.md', 'contract-sync.md']) {
    assert.match(agentText(file), /router/, file);
  }
  assert.match(agentText('contract-sync.md'), /never report the absence of `\.agents\/playbooks\/`/);
  assert.ok(skillText.includes('never recreate it'));
});

test('SKILL.md and the subagents name no planning tool, only the tracker lane', () => {
  assert.doesNotMatch(skillText, /github|\bgh\b/i);
  assert.ok(skillText.includes('*tracker*'));
  for (const file of agentFiles) assert.doesNotMatch(agentText(file), /github|\bgh\b/i, file);
});
