
# Apply Premium Design System CSS classes across ALL activity page.tsx files
# Replaces verbose Tailwind className strings with field-input / field-textarea / act-btn-primary etc.

$files = Get-ChildItem "d:\Downloads\merged\app" -Recurse -Filter "page.tsx" |
         Where-Object { $_.FullName -notmatch '\[' } |  # skip dynamic route placeholders
         Select-Object -ExpandProperty FullName

$replacements = [ordered]@{}

# ─── TEXT INPUTS → field-input ────────────────────────────────────────────────

$replacements['bg-white/60 blur-lg py-3.5 text-center'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl px-5 py-3.5 text-center text-sm font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all placeholder:text-slate-350"'
  To   = 'className="field-input text-center"'
}
$replacements['bg-white/60 blur-lg py-4 font-bold'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl px-5 py-4 font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all text-sm"'
  To   = 'className="field-input"'
}
$replacements['bg-white/60 blur-lg py-4 text-center'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl px-5 py-4 text-center font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all placeholder:text-slate-350"'
  To   = 'className="field-input text-center"'
}
$replacements['border-primary/20 dark-bg py-4 text-base'] = @{
  From = 'className="w-full border border-primary/20 rounded-2xl px-5 py-4 text-base text-slate-900 dark:text-white bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm focus:outline-none focus:border-primary focus:shadow-md transition-all font-bold placeholder:text-slate-300"'
  To   = 'className="field-input"'
}
$replacements['py-4.5 white/40 dark no-resize v1'] = @{
  From = 'className="w-full py-4.5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-5 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none outline-none transition-all shadow-sm"'
  To   = 'className="field-input"'
}
$replacements['py-4.5 white/40 dark no-resize v2'] = @{
  From = 'className="w-full py-4.5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-5 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm"'
  To   = 'className="field-input"'
}
$replacements['py-4.5 slate-105 dark'] = @{
  From = 'className="w-full py-4.5 rounded-2xl border border-slate-105 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary transition-all outline-none px-5 font-bold text-slate-700 dark:text-white placeholder:text-slate-300 shadow-inner"'
  To   = 'className="field-input"'
}
$replacements['py-4.5 white/60 dark shadow-inner'] = @{
  From = 'className="w-full py-4.5 rounded-2xl border border-white/60 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary transition-all outline-none px-5 font-bold text-slate-700 dark:text-white placeholder:text-slate-300 shadow-inner"'
  To   = 'className="field-input"'
}
$replacements['py-5 px-6 2rem dark font-medium v1'] = @{
  From = 'className="w-full py-5 px-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"'
  To   = 'className="field-input"'
}
$replacements['py-5 px-6 2rem dark font-medium v2'] = @{
  From = 'className="w-full py-5 px-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 text-slate-700 dark:text-slate-350 placeholder:text-slate-300 dark:placeholder:text-slate-750 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"'
  To   = 'className="field-input"'
}
$replacements['py-5 pl-14 2rem dark'] = @{
  From = 'className="w-full py-5 pl-14 pr-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"'
  To   = 'className="field-input pl-14"'
}
$replacements['rounded-2xl slate-200 dark no-resize'] = @{
  From = 'className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary outline-none px-5 py-4 font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-300 transition-all text-sm"'
  To   = 'className="field-input"'
}

# ─── TEXTAREAS → field-textarea ───────────────────────────────────────────────

$replacements['ta-2.5rem-p8-lg-font-bold'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-[2.5rem] p-8 text-lg font-bold resize-none outline-none focus:border-primary/50 transition-all placeholder:text-slate-200 shadow-inner"'
  To   = 'className="field-textarea text-lg p-8"'
}
$replacements['ta-md-p4-xs-font-semibold'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl p-4 font-semibold text-xs text-slate-750 resize-none focus:outline-none focus:border-primary transition-all shadow-inner"'
  To   = 'className="field-textarea"'
}
$replacements['ta-md-p5-sm-font-medium'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl p-5 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary/25 outline-none transition-all shadow-inner"'
  To   = 'className="field-textarea"'
}
$replacements['ta-md-p5-sm-font-semibold-min180'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl p-5 text-sm font-semibold text-slate-800 resize-none focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all flex-1 min-h-[180px] shadow-inner leading-relaxed"'
  To   = 'className="field-textarea flex-1 min-h-[180px]"'
}
$replacements['ta-md-p6-base-min120'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl p-6 text-base font-bold min-h-[120px] focus:border-primary/30 outline-none transition-all resize-none"'
  To   = 'className="field-textarea min-h-[120px]"'
}
$replacements['ta-md-px5-py3-sm'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl px-5 py-3 font-medium text-slate-800 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 resize-none transition-all"'
  To   = 'className="field-textarea"'
}
$replacements['ta-md-px5-py4-sm-v1'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl px-5 py-4 font-medium text-slate-800 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 resize-none transition-all"'
  To   = 'className="field-textarea"'
}
$replacements['ta-md-px5-py4-sm-v2'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-2xl px-5 py-4 text-sm text-slate-800 focus:outline-none focus:border-primary/20 transition-all resize-none shadow-sm font-medium"'
  To   = 'className="field-textarea"'
}
$replacements['ta-lg-blur-3xl-py5-center'] = @{
  From = 'className="w-full bg-white/60 backdrop-blur-lg border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl px-8 py-5 text-slate-800 text-lg font-black placeholder:text-slate-350 focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all shadow-xl shadow-slate-200/50 text-center"'
  To   = 'className="field-textarea text-lg text-center"'
}
$replacements['ta-2rem-min160-dark'] = @{
  From = 'className="w-full min-h-[160px] p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-white/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-700 font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm resize-none"'
  To   = 'className="field-textarea min-h-[160px]"'
}
$replacements['ta-3rem-min400-dark-xl'] = @{
  From = 'className="w-full min-h-[400px] bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-900 border border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-primary/30 rounded-[3rem] px-10 py-10 text-xl font-bold leading-relaxed outline-none transition-all resize-none shadow-inner placeholder:text-slate-200 dark:placeholder:text-slate-700"'
  To   = 'className="field-textarea min-h-[400px] text-xl px-10 py-10"'
}
$replacements['ta-md-p6-md-dark-v2'] = @{
  From = 'className="w-full p-6 bg-white/60 backdrop-blur-md border border-white/60 shadow-inner rounded-3xl text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 font-medium outline-none focus:border-primary/50 transition-all resize-none shadow-sm placeholder:text-slate-300"'
  To   = 'className="field-textarea"'
}
$replacements['ta-py4-white40-dark-resize'] = @{
  From = 'className="w-full py-4 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-5 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white outline-none transition-all shadow-sm resize-none"'
  To   = 'className="field-textarea"'
}
$replacements['ta-py4.5-white40-dark-gradient'] = @{
  From = 'className="w-full py-4.5 rounded-2xl bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 dark:bg-slate-950 border border-white/60 dark:border-slate-800 font-bold px-5 text-slate-700 dark:text-slate-200 focus:border-primary focus:bg-white dark:focus:bg-gradient-to-r from-primary to-sky-400 border-none outline-none transition-all shadow-sm"'
  To   = 'className="field-textarea"'
}
$replacements['ta-rounded-2xl-slate200-dark-resize-v1'] = @{
  From = 'className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary outline-none px-5 py-4 font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-300 resize-none shadow-inner transition-all text-sm"'
  To   = 'className="field-textarea"'
}
$replacements['ta-rounded-2xl-slate200-dark-resize-v2'] = @{
  From = 'className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary outline-none px-5 py-4 font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-300 resize-none transition-all text-sm shadow-inner"'
  To   = 'className="field-textarea"'
}
$replacements['ta-rounded-2xl-slate50-white40-resize'] = @{
  From = 'className="w-full rounded-2xl border border-slate-50 bg-white/40 backdrop-blur-sm shadow-sm border border-white/50 p-5 text-sm text-slate-800 placeholder:text-slate-350 focus:outline-none focus:border-primary/20 focus:bg-white transition-all resize-none font-medium"'
  To   = 'className="field-textarea"'
}
$replacements['ta-rounded-3xl-white-p6-min120'] = @{
  From = 'className="w-full rounded-3xl border border-white/60 bg-white p-6 text-slate-700 placeholder:text-slate-300 focus:border-primary/35 outline-none transition-all font-bold min-h-[120px] shadow-inner resize-none"'
  To   = 'className="field-textarea min-h-[120px]"'
}

# ─── PRIMARY BUTTONS → act-btn-primary ────────────────────────────────────────

$replacements['btn-w-full-primary-py4-shadow-hover'] = @{
  From = 'className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"'
  To   = 'className="act-btn-primary"'
}
$replacements['btn-w-full-primary-py4-shadow/20-hover'] = @{
  From = 'className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"'
  To   = 'className="act-btn-primary"'
}
$replacements['btn-w-full-py4.5-primary-xs-tracking'] = @{
  From = 'className="w-full py-4.5 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/15 hover:shadow-xl transition-all"'
  To   = 'className="act-btn-primary"'
}
$replacements['btn-w-full-py4.5-primary-white-bold'] = @{
  From = 'className="w-full py-4.5 bg-primary text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"'
  To   = 'className="act-btn-primary"'
}
$replacements['btn-mt6-w-full-primary-py4'] = @{
  From = 'className="mt-6 w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg"'
  To   = 'className="act-btn-primary mt-6"'
}
$replacements['btn-h12-bg-primary-sm-rounded-xl'] = @{
  From = 'className="h-12 bg-primary text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"'
  To   = 'className="act-btn-primary"'
}
$replacements['btn-flex1-py4-primary-10px-2xl'] = @{
  From = 'className="flex-1 py-4 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:shadow-xl transition-all"'
  To   = 'className="act-btn-primary flex-1"'
}

# ─── LABELS → field-label ─────────────────────────────────────────────────────

$replacements['lbl-10px-black-dark'] = @{
  From = 'className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest"'
  To   = 'className="field-label"'
}
$replacements['lbl-10px-black-block'] = @{
  From = 'className="text-[10px] font-black text-slate-400 uppercase tracking-widest block"'
  To   = 'className="field-label"'
}
$replacements['lbl-10px-semibold-mb1'] = @{
  From = 'className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1"'
  To   = 'className="field-label"'
}
$replacements['lbl-10px-semibold-mb2'] = @{
  From = 'className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2"'
  To   = 'className="field-label"'
}
$replacements['lbl-11px-bold-dark-block'] = @{
  From = 'className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block"'
  To   = 'className="field-label"'
}
$replacements['lbl-11px-black-block-mb1'] = @{
  From = 'className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 block"'
  To   = 'className="field-label"'
}
$replacements['lbl-10px-semibold-dark-mt2'] = @{
  From = 'className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black mb-1"'
  To   = 'className="field-label"'
}
$replacements['lbl-12px-medium'] = @{
  From = 'className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1"'
  To   = 'className="field-label"'
}
$replacements['lbl-12px-semibold-mb1'] = @{
  From = 'className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1"'
  To   = 'className="field-label"'
}

# ─── HEADINGS → act-heading ───────────────────────────────────────────────────

$replacements['heading-3xl-extrabold-dark'] = @{
  From = 'className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight"'
  To   = 'className="act-heading"'
}
$replacements['heading-3xl-bold-dark'] = @{
  From = 'className="text-3xl font-bold text-slate-900 dark:text-white leading-tight"'
  To   = 'className="act-heading"'
}
$replacements['heading-2xl-extrabold-dark'] = @{
  From = 'className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight"'
  To   = 'className="act-heading"'
}
$replacements['heading-2xl-bold-no-style'] = @{
  From = 'className="text-2xl font-bold text-slate-900 leading-tight"'
  To   = 'className="act-heading"'
}
$replacements['heading-3xl-bold-no-dark'] = @{
  From = 'className="text-3xl font-bold text-slate-900 leading-tight"'
  To   = 'className="act-heading"'
}
$replacements['heading-3xl-extrabold-no-dark'] = @{
  From = 'className="text-3xl font-extrabold text-slate-900 leading-tight"'
  To   = 'className="act-heading"'
}

# ─── EYEBROWS → act-eyebrow ───────────────────────────────────────────────────

$replacements['eyebrow-primary-10px-bold'] = @{
  From = 'className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase tracking-widest"'
  To   = 'className="act-eyebrow"'
}
$replacements['eyebrow-primary-10px-bold-gap2'] = @{
  From = 'className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest"'
  To   = 'className="act-eyebrow"'
}
$replacements['eyebrow-sky-10px-bold'] = @{
  From = 'className="flex items-center gap-2 text-sky-500 font-bold text-[10px] uppercase tracking-widest"'
  To   = 'className="act-eyebrow"'
}

# ─── BODY TEXT → act-body ─────────────────────────────────────────────────────

$replacements['body-sm-dark-medium-relaxed'] = @{
  From = 'className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed"'
  To   = 'className="act-body"'
}
$replacements['body-sm-dark-relaxed'] = @{
  From = 'className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed"'
  To   = 'className="act-body"'
}
$replacements['body-sm-relaxed-no-dark'] = @{
  From = 'className="text-slate-500 text-sm leading-relaxed"'
  To   = 'className="act-body"'
}

# ─────────────────────────────────────────────────────────────────────────────
# Run all replacements
# ─────────────────────────────────────────────────────────────────────────────

$totalFiles = 0
$totalReplacements = 0

foreach ($file in $files) {
  try {
    $lines  = Get-Content $file
    $content = $lines -join "`n"
    $changed = $false

    foreach ($key in $replacements.Keys) {
      $r   = $replacements[$key]
      $esc = [regex]::Escape($r.From)
      if ($content -match $esc) {
        $content = $content -replace $esc, $r.To
        $changed = $true
        $totalReplacements++
      }
    }

    if ($changed) {
      $content | Set-Content $file -NoNewline
      $totalFiles++
      Write-Host "  OK  $(Split-Path (Split-Path $file -Parent) -Leaf)"
    }
  } catch {
    Write-Host "  ERR $file : $_" -ForegroundColor Red
  }
}

Write-Host ""
Write-Host "Done. $totalReplacements replacements across $totalFiles files."
