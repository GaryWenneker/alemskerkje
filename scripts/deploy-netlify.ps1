# Netlify production deploy script voor alemskerkje (Windows PowerShell 5.1 compatible)
#
# Stappen:
#   0. Git commit (als er wijzigingen zijn)
#   1. Clean .next en .netlify
#   2. npm install + next build (direct, via cmd om PS NativeCommandError te vermijden)
#   3. netlify deploy --build --prod (via cmd)
#   4. Lock deploy
#   5. Git push
#   6. HTTP health check
#
# Usage:
#   .\scripts\deploy-netlify.ps1
#   .\scripts\deploy-netlify.ps1 -SkipCommit
#   .\scripts\deploy-netlify.ps1 -SkipCommit -SkipPush
#
# Params:
#   -SkipCommit  Geen git add/commit (deploy alleen)
#   -SkipPush    Geen git push na deploy

param(
    [switch]$SkipCommit,
    [switch]$SkipPush
)

$ErrorActionPreference = "Stop"
$scriptRoot  = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptRoot
Set-Location $projectRoot

# Configuratie
$siteName = "alemskerkje"
$siteUrl  = "https://alemskerkje.netlify.app"   # Vervang door custom domein zodra gekoppeld

trap {
    Set-Location $scriptRoot
    break
}

Write-Host "Netlify production deploy -- $siteName" -ForegroundColor Cyan
Write-Host "Project root: $projectRoot" -ForegroundColor Gray
Write-Host ""

# --- Prechecks ---
if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Netlify CLI niet gevonden. Installeer met: npm install -g netlify-cli" -ForegroundColor Red
    exit 1
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: npm niet gevonden." -ForegroundColor Red
    exit 1
}

# --- Stap 0: Git commit ---
$gitStatus  = git status --porcelain 2>&1
$hasChanges = $LASTEXITCODE -eq 0 -and $gitStatus -ne ""
$didCommit  = $false

if ($hasChanges -and -not $SkipCommit) {
    Write-Host "Stap 0: Git commit (wijzigingen gevonden)" -ForegroundColor Yellow
    git add -A
    git diff --staged --quiet 2>$null
    if ($LASTEXITCODE -ne 0) {
        $msg = Read-Host "Commit message (Enter = 'Deploy update')"
        if ([string]::IsNullOrWhiteSpace($msg)) {
            git commit -m "Deploy update" -m "[skip ci]"
        } else {
            git commit -m $msg -m "[skip ci]"
        }
        if ($LASTEXITCODE -ne 0) {
            Write-Host "ERROR: Git commit mislukt" -ForegroundColor Red
            exit 1
        }
        $didCommit = $true
        Write-Host "OK: Gecommit" -ForegroundColor Green
    } else {
        Write-Host "  Geen staged wijzigingen (alleen untracked/ignored)" -ForegroundColor Gray
    }
} elseif ($hasChanges -and $SkipCommit) {
    Write-Host "Stap 0: Overgeslagen (SkipCommit); er zijn ongecommitte wijzigingen" -ForegroundColor Yellow
} else {
    Write-Host "Stap 0: Geen wijzigingen om te committen" -ForegroundColor Gray
}
Write-Host ""

# --- Stap 1: Clean .next, .netlify en stale build cache ---
Write-Host "Stap 1: Clean .next, .netlify en build cache" -ForegroundColor Yellow
Remove-Item -Recurse -Force ".next"               -ErrorAction SilentlyContinue
Remove-Item -Force          "tsconfig.tsbuildinfo" -ErrorAction SilentlyContinue

# Verwijder .netlify volledig. Op Windows kunnen file-locks (EPERM/ENOTEMPTY) dit blokkeren.
# Gebruik robocopy /MIR als fallback voor de plugins-map (lange paden + locks).
Remove-Item -Recurse -Force ".netlify" -ErrorAction SilentlyContinue
if (Test-Path ".netlify") {
    Write-Host "  [CLEAN] .netlify niet volledig verwijderd — robocopy fallback..." -ForegroundColor DarkYellow
    $emptyDir = Join-Path $env:TEMP ("empty_" + [Guid]::NewGuid().ToString("n"))
    New-Item -ItemType Directory -Path $emptyDir -Force | Out-Null
    $null = robocopy $emptyDir ".netlify" /MIR /R:2 /W:1 /NFL /NDL /NJH /NJS 2>&1
    Remove-Item -Recurse -Force $emptyDir  -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force ".netlify" -ErrorAction SilentlyContinue
    if (Test-Path ".netlify") {
        Write-Host "  [WAARSCHUWING] .netlify kon niet volledig worden verwijderd (EPERM)" -ForegroundColor Yellow
    } else {
        Write-Host "  [CLEAN] .netlify verwijderd via robocopy" -ForegroundColor Green
    }
}

# Koppel aan Netlify site (maakt .netlify/state.json aan)
$linkOutput = cmd /c ('cd /d "' + $projectRoot + '" && netlify link --name ' + $siteName + ' 2>&1')
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: netlify link mislukt" -ForegroundColor Red
    Write-Host $linkOutput
    exit 1
}
Write-Host "OK: Clean + link klaar" -ForegroundColor Green
Write-Host ""

# --- Stap 2: Build + Deploy via netlify CLI ---
# Gebruik cmd /c zodat de Netlify CLI wrapper geen PowerShell NativeCommandError gooit.
# 'netlify deploy --build --prod' doet:
#   1. npm install + next build (build.command uit netlify.toml)
#   2. @netlify/plugin-nextjs verwerkt .next (onBuild/onPostBuild)
#   3. Deployt het resultaat naar Netlify productie
Write-Host "Stap 2: netlify deploy --build --prod (build + deploy in een stap)" -ForegroundColor Yellow

$deployLog = Join-Path $env:TEMP ("netlify-deploy-log-" + [Guid]::NewGuid().ToString("n") + ".txt")
$deployCmd = 'cd /d "' + $projectRoot + '" && netlify deploy --build --prod > "' + $deployLog + '" 2>&1'
cmd /c $deployCmd
$deployExitCode  = $LASTEXITCODE
$deployOutputStr = Get-Content -Path $deployLog -Raw -ErrorAction SilentlyContinue
Remove-Item -Path $deployLog -Force -ErrorAction SilentlyContinue

Write-Host ""
if (-not [string]::IsNullOrWhiteSpace($deployOutputStr)) {
    Write-Host $deployOutputStr
}
Write-Host ""

if ($deployExitCode -ne 0) {
    Write-Host "ERROR: Deploy mislukt (exit $deployExitCode)" -ForegroundColor Red

    # Sla buildlog op als de deploy gefaald heeft
    if (-not [string]::IsNullOrWhiteSpace($deployOutputStr)) {
        $errorLogPath = Join-Path $projectRoot "build-error.log"
        $deployOutputStr | Out-File -FilePath $errorLogPath -Encoding UTF8 -Force
        Write-Host "  [Volledige log opgeslagen: build-error.log]" -ForegroundColor Yellow
    }
    exit 1
}

if ($deployOutputStr -notmatch "Deploy (complete|is live)" -and $deployOutputStr -notmatch "Production deploy is live") {
    Write-Host "ERROR: Deploy-output bevat geen bevestiging van succes." -ForegroundColor Red
    exit 1
}
Write-Host "OK: Deploy geslaagd" -ForegroundColor Green
Write-Host ""

# --- Stap 3: Lees deploy_id en lock de deploy ---
$deployId   = $null
$hexPattern = "https://([0-9a-f]+)--$siteName\.netlify\.app"
if ($deployOutputStr -match $hexPattern) {
    $deployId = $Matches[1]
}
if (-not $deployId) {
    if ($deployOutputStr -match 'deploys/([0-9a-f]{20,})') {
        $deployId = $Matches[1]
    }
}

if (-not $deployId) {
    Write-Host "WAARSCHUWING: deploy_id niet gevonden in output; lock wordt overgeslagen" -ForegroundColor Yellow
    ($deployOutputStr -split "`n") | Select-Object -Last 20
} else {
    Write-Host "Stap 3: Lock deploy ($deployId)" -ForegroundColor Yellow
    $lockCmd    = 'netlify api lockDeploy --data "{\"deploy_id\":\"' + $deployId + '\"}"'
    $lockResult = cmd /c $lockCmd 2>&1
    $lockStr    = if ($lockResult -is [Array]) { $lockResult -join "`n" } else { $lockResult.ToString() }
    if ($lockStr -match '"locked"\s*:\s*true') {
        Write-Host "OK: Deploy vergrendeld (locked: true)" -ForegroundColor Green
    } else {
        Write-Host "WAARSCHUWING: Lock mogelijk mislukt. Output:" -ForegroundColor Yellow
        Write-Host $lockStr
    }
}
Write-Host ""

# --- Stap 4: Git push ---
if (-not $SkipPush -and $didCommit) {
    Write-Host "Stap 4: Git push origin main" -ForegroundColor Yellow
    git push origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Git push mislukt" -ForegroundColor Red
        exit 1
    }
    Write-Host "OK: Gepusht" -ForegroundColor Green
} elseif ($SkipPush) {
    Write-Host "Stap 4: Overgeslagen (SkipPush)" -ForegroundColor Gray
} else {
    Write-Host "Stap 4: Geen push nodig (geen commit gedaan)" -ForegroundColor Gray
}
Write-Host ""

# --- Stap 5: HTTP health check ---
Write-Host "Stap 5: HTTP health check ($siteUrl)" -ForegroundColor Yellow
Start-Sleep -Seconds 8
$healthOk = $false
for ($i = 1; $i -le 3; $i++) {
    try {
        $ping = Invoke-WebRequest $siteUrl -Method HEAD -TimeoutSec 15 -UseBasicParsing -ErrorAction Stop
        if ($ping.StatusCode -lt 400) {
            Write-Host ("OK: Site online -- HTTP {0} (poging {1})" -f $ping.StatusCode, $i) -ForegroundColor Green
            $healthOk = $true
            break
        }
        Write-Host ("  Poging {0}: HTTP {1}" -f $i, $ping.StatusCode) -ForegroundColor Yellow
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host ("  Poging {0}: HTTP {1} ({2})" -f $i, $statusCode, $_.Exception.Message) -ForegroundColor Yellow
    }
    if ($i -lt 3) { Start-Sleep -Seconds 10 }
}
if (-not $healthOk) {
    Write-Host "WAARSCHUWING: Site reageert niet correct na deploy." -ForegroundColor Red
    Write-Host "  Controleer $siteUrl en Netlify deploy logs." -ForegroundColor Yellow
}
Write-Host ""

Write-Host "Deploy afgerond. Site: $siteUrl" -ForegroundColor Cyan
if ($deployId) {
    Write-Host ("Deploy ID: " + $deployId) -ForegroundColor Gray
}

Set-Location $scriptRoot
