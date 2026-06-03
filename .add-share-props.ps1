
# Map of activity directory => { emoji, shareKey (short name for share message) }
$activityMap = @{
  "4_6_8_breathing/complete"        = @{ emoji="🌬️"; name="4-6-8 Breathing" }
  "4-6-8-breathing"                 = @{ emoji="🌬️"; name="4-6-8 Breathing" }
  "5-4-3-2-1-grounding"            = @{ emoji="🌿"; name="5-4-3-2-1 Grounding" }
  "affirmations"                    = @{ emoji="💛"; name="Positive Affirmations" }
  "a-gentle-wish"                   = @{ emoji="🤍"; name="A Gentle Wish" }
  "a-letter-to-self"               = @{ emoji="💌"; name="A Letter to Self" }
  "anger-facts-myths"               = @{ emoji="🔥"; name="Anger Facts & Myths" }
  "a-pause-for-appreciation"        = @{ emoji="🌸"; name="A Pause for Appreciation" }
  "box-breathing"                   = @{ emoji="🟦"; name="Box Breathing" }
  "brain-dump-and-sort"            = @{ emoji="🧠"; name="Brain Dump & Sort" }
  "care-tracker"                    = @{ emoji="🌱"; name="Self-Care Log" }
  "challenging-food-rules"          = @{ emoji="🍽️"; name="Challenging Food Rules" }
  "compassion-break"                = @{ emoji="💙"; name="Self-Compassion Break" }
  "continuing-bonds"                = @{ emoji="🕊️"; name="Continuing Bonds" }
  "daily-gratitude-diary"          = @{ emoji="📖"; name="Daily Gratitude Diary" }
  "diffusion-technique"             = @{ emoji="🫧"; name="Diffusion Technique" }
  "doodle-burst"                    = @{ emoji="🎨"; name="Doodle Burst" }
  "energy-tracker"                  = @{ emoji="⚡"; name="Energy Tracker" }
  "environment-optimization"        = @{ emoji="🏠"; name="Environment Optimization" }
  "food-emotion-map"               = @{ emoji="🍃"; name="Food & Emotion Map" }
  "gratitude-tracker"               = @{ emoji="🙏"; name="Gratitude Tracker" }
  "grief-journey-map"              = @{ emoji="🗺️"; name="Grief Journey Map" }
  "joyful-activities"               = @{ emoji="🌈"; name="Reconstruct Joy" }
  "know-your-values"               = @{ emoji="⭐"; name="Know Your Values" }
  "memory-box"                      = @{ emoji="📦"; name="Memory Box" }
  "mind-reading-check"             = @{ emoji="🔮"; name="Mind Reading Check" }
  "missing-someone"                 = @{ emoji="💜"; name="Missing Someone" }
  "name-your-mind"                  = @{ emoji="🧩"; name="Name Your Mind" }
  "prediction-vs-reality"           = @{ emoji="🎯"; name="Prediction vs Reality" }
  "redraw-your-circle"             = @{ emoji="⭕"; name="Redraw Your Circle" }
  "relationship-patterns-unpacked"  = @{ emoji="🔗"; name="Relationship Patterns" }
  "repair-and-reconnect"           = @{ emoji="🤝"; name="Repair & Reconnect" }
  "safe-space"                      = @{ emoji="🏡"; name="Safe Space" }
  "self-care-bingo"                = @{ emoji="🎉"; name="Self-Care Bingo" }
  "sleep-audit"                     = @{ emoji="😴"; name="Sleep Audit" }
  "sleep-window-planner"           = @{ emoji="🌙"; name="Sleep Window Planner" }
  "the-anger-shame-cycle"          = @{ emoji="💢"; name="Anger-Shame Cycle" }
  "the-pause-practice"             = @{ emoji="🧘"; name="The Pause Practice" }
  "the-unsent-letter"              = @{ emoji="✉️"; name="The Unsent Letter" }
  "understanding-control"           = @{ emoji="🎛️"; name="Understanding Control" }
  "vibe-tracker"                    = @{ emoji="🌡️"; name="Vibe Tracker" }
  "what-are-your-habits"           = @{ emoji="🔄"; name="What Are Your Habits" }
  "what-do-i-need"                 = @{ emoji="💭"; name="What Do I Need" }
  "why-brain-gets-stuck"           = @{ emoji="🧬"; name="Why Brain Gets Stuck" }
  "window-of-tolerance"            = @{ emoji="🪟"; name="Window of Tolerance" }
  "write-your-narrative"           = @{ emoji="📝"; name="Write Your Narrative" }
}

$androidUrl = "https://play.google.com/store/apps/details?id=org.mantracare.therapy"
$iosUrl = "https://apps.apple.com/pk/app/therapymantra/id1607643888"
$updatedCount = 0

foreach ($act in $activityMap.Keys) {
  $filePath = "d:\Downloads\merged\app\$act\page.tsx"
  if (-not (Test-Path $filePath)) { continue }
  
  $content = Get-Content $filePath -Raw -Encoding UTF8
  
  # Skip if already has shareEmoji
  if ($content -match 'shareEmoji') { continue }
  
  $info = $activityMap[$act]
  $emoji = $info.emoji
  $name = $info.name
  $shareMsg = "I just completed `"$name`" on TherapyMantra — a guided mental wellness activity that truly helped me. You should try it! 🌿`n`n📱 Android: $androidUrl`n🍎 iOS: $iosUrl"
  
  # Pattern: find <PremiumComplete and insert shareEmoji + shareContent after the title prop line
  # We insert right before /> or right before the first child
  # Strategy: add props after message={...} or after title={...} if no message
  
  $newContent = $content -replace '(<PremiumComplete\b[^>]*?)(\s+/>)', {
    param($m)
    $full = $m.Value
    # Add shareEmoji before the self-close
    $full -replace '(\s+/>)$', "`n                  shareEmoji=`"$emoji`"`n                  shareContent={`"$shareMsg`"}`$1"
  }
  
  # If the replace didn't match (has children), try to add before the >
  if ($newContent -eq $content) {
    $newContent = $content -replace '(<PremiumComplete\b(?:[^>]|>(?!/))*?)(\s*>(?!\s*/))', {
      param($m)
      $full = $m.Value
      $full -replace '(\s*>(?!\s*/))$', "`n                  shareEmoji=`"$emoji`"`n                  shareContent={`"$shareMsg`"}`$1"
    }
  }
  
  if ($newContent -ne $content) {
    Set-Content $filePath $newContent -Encoding UTF8 -NoNewline
    $updatedCount++
    Write-Host "Updated: $act"
  } else {
    Write-Host "SKIPPED (no match): $act"
  }
}

Write-Host ""
Write-Host "Total updated: $updatedCount"
