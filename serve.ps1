$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$hugo = Join-Path $root "tools\hugo\hugo.exe"
& $hugo server --buildDrafts --bind 127.0.0.1 --port 1313
