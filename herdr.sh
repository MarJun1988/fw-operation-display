#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

json_field() {
  python3 -c 'import json, sys; print(json.load(sys.stdin)["result"][sys.argv[1]][sys.argv[2]])' "$1" "$2"
}

workspace_json="$(herdr workspace create --cwd "$project_dir" --label fw-operation-display --focus)"
workspace_id="$(printf '%s' "$workspace_json" | json_field workspace workspace_id)"
backend_tab="$(printf '%s' "$workspace_json" | json_field tab tab_id)"
backend_pane="$(printf '%s' "$workspace_json" | json_field root_pane pane_id)"

herdr tab rename "$backend_tab" backend >/dev/null
herdr pane rename "$backend_pane" backend-dev >/dev/null
herdr pane run "$backend_pane" 'cd backend && npm run dev' >/dev/null

frontend_json="$(herdr tab create --workspace "$workspace_id" --cwd "$project_dir/frontend" --label frontend)"
frontend_pane="$(printf '%s' "$frontend_json" | json_field root_pane pane_id)"
herdr pane rename "$frontend_pane" frontend-dev >/dev/null
herdr pane run "$frontend_pane" 'npm run dev' >/dev/null

vitepress_json="$(herdr tab create --workspace "$workspace_id" --cwd "$project_dir/vitepress" --label vitepress)"
vitepress_pane="$(printf '%s' "$vitepress_json" | json_field root_pane pane_id)"
herdr pane rename "$vitepress_pane" vitepress-dev >/dev/null
herdr pane run "$vitepress_pane" 'npm run docs:dev' >/dev/null

printf 'Herdr-Workspace %s gestartet.\n' "$workspace_id"
