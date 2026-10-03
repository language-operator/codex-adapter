#!/bin/sh
# What tmux runs. The base already starts tmux in the working directory — the
# cloned repo when the agent sets spec.repository, else /workspace — so Codex
# opens straight on the project. Its config and standing instructions are read
# from $CODEX_HOME, written by `coding-runtime seed`.
#
# Sleeping an agent destroys the pod and waking it starts a new tmux server, so
# this exec is the only moment a resume decision can be made. Resuming the last
# conversation (`codex resume --last`) once the workspace holds a session is
# issue #1: the test has to be for what Codex itself writes under $CODEX_HOME,
# never for the directory, which the base creates.
set -eu

exec codex "$@"
