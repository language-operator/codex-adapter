/**
 * Codex CLI emitter.
 *
 * Codex reads everything from CODEX_HOME, which runtime.json points at
 * $STATE_DIR/codex on the workspace volume. So far this writes only the agent's
 * standing instructions; translating the gateway, models and MCP servers into
 * CODEX_HOME/config.toml is issue #1.
 */

export function emit(config) {
  const configDir = config.paths.stateDir ? `${config.paths.stateDir}/codex` : '/etc/codex';
  const writes = [];

  // Instructions and persona become standing context rather than a first
  // message, so the TUI opens with the agent already briefed — no timing
  // dependence on when the user first types. Codex loads CODEX_HOME/AGENTS.md
  // as its global instructions, ahead of any AGENTS.md in the project.
  const standing = [config.systemPrompt, config.instructions].filter(Boolean).join('\n\n');
  if (standing) {
    writes.push({ path: `${configDir}/AGENTS.md`, contents: `${standing}\n` });
  }

  return writes;
}

export default emit;
