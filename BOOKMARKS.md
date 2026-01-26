# Comment Conspiracy - Active Bookmarks

> **Last Updated:** 2026-01-26
> **Hackathon Deadline:** February 12, 2026, 6:00 PM PST

---

## Active TODO Items

### HIGH PRIORITY - Required for Submission

| ID | Task | Status | Notes |
|----|------|--------|-------|
| B1 | Submit to Devpost | PENDING | Use `DEVPOST_SUBMISSION.md` for form content |
| B2 | Verify scheduler at midnight UTC | PENDING | Check if new puzzle post auto-creates |

### MEDIUM PRIORITY - Recommended

| ID | Task | Status | Notes |
|----|------|--------|-------|
| B3 | Upload subreddit icon | READY | `assets/subreddit-icon.png` (25KB) |
| B4 | Upload subreddit banner | READY | `assets/subreddit-banner.png` (154KB) |
| B5 | Create video demo (1-2 min) | OPTIONAL | Script in DEVPOST_SUBMISSION.md |

### LOW PRIORITY - Optional Polish

| ID | Task | Status | Notes |
|----|------|--------|-------|
| B6 | Manual incognito test | OPTIONAL | Verify logged-out experience |
| B7 | Safari/Firefox testing | OPTIONAL | Cross-browser verification |

---

## Subreddit Branding Specifications

### Community Icon (Avatar)

| Property | Requirement |
|----------|-------------|
| **Dimensions** | 256 × 256 pixels |
| **Aspect Ratio** | 1:1 (square, displays as circle) |
| **File Types** | PNG (preferred), JPG |
| **Max File Size** | 64 KB |
| **Display Context** | Feeds, search results, community listings |

**Design Guidelines:**
- Icon displays as a **circle** - avoid content in corners
- Keep design **simple and recognizable** at small sizes (24px-48px thumbnails)
- Avoid text or fine details that won't be legible when scaled down
- Use high contrast colors for visibility

**Suggested Design for Comment Conspiracy:**
- Primary element: Magnifying glass (🔍) or detective/spy theme
- Color scheme: Reddit orange (#FF4500) accent on dark background
- Style: Bold, flat design with clean edges
- Optional: Incorporate speech bubble or comment icon motif

### Community Banner (Header)

| Property | Requirement |
|----------|-------------|
| **Recommended Size** | 1920 × 384 pixels (Big banner) |
| **Minimum Size** | 960 × 120 pixels |
| **Aspect Ratio** | 5:1 (for big banner) |
| **File Types** | PNG, JPG, APNG |
| **Max File Size** | 5 MB (recommended: under 500 KB for fast loading) |

**Size Options:**
| Size | Dimensions | Aspect Ratio |
|------|------------|--------------|
| Small | 1920 × 128 px | 15:1 |
| Medium | 1920 × 256 px | 7.5:1 |
| **Big (Recommended)** | 1920 × 384 px | 5:1 |

**Safe Zone:**
- Reddit crops banners on different devices/views
- **Keep important content centered** in the middle 1300 × 200 px area
- Avoid placing logos, text, or critical elements near edges

**Design Guidelines:**
- 70% of Reddit traffic is mobile - test on mobile view
- Use subtle patterns or gradients rather than busy imagery
- High contrast text if including tagline
- Consider dark mode compatibility

**Suggested Design for Comment Conspiracy:**
- Tagline: "One of these comments isn't human. Can you spot the imposter?"
- Visual elements:
  - Array of comment cards with one highlighted/different
  - Magnifying glass hovering over comments
  - Binary code or matrix-style background (subtle)
- Color palette:
  - Primary: Reddit orange (#FF4500)
  - Secondary: Deep blue (#1A1A2E) or dark gray (#1A1A1B)
  - Accent: White or light gray for text
- Style: Modern, clean, slightly mysterious/detective theme

---

## Asset Creation Checklist

### Icon (256×256) - COMPLETE ✅
- [x] Create at 512×512 for retina, export at 256×256
- [x] Test circular crop preview
- [x] Verify legibility at 32px thumbnail size
- [x] Export as PNG with transparency
- [x] Compress to under 64 KB (actual: 25KB)

**Generated Files:**
- `assets/subreddit-icon.png` - 256×256, 25KB (upload this)
- `assets/subreddit-icon@2x.png` - 512×512, 67KB (retina reference)
- `assets/subreddit-icon.svg` - Source vector

### Banner (1920×384) - COMPLETE ✅
- [x] Design at full resolution
- [x] Mark safe zone (center 1300×200)
- [x] Preview desktop and mobile crops
- [x] Test dark mode visibility
- [x] Export as PNG or high-quality JPG
- [x] Compress to under 500 KB (actual: 154KB)

**Generated Files:**
- `assets/subreddit-banner.png` - 1920×384, 154KB (upload this)
- `assets/subreddit-banner.svg` - Source vector

---

## Quick Upload Instructions

1. Go to https://reddit.com/r/CommentConspiracy
2. Click **Mod Tools** (right sidebar)
3. Select **Community appearance**
4. Upload:
   - **Community icon** → 256×256 PNG
   - **Banner image** → 1920×384 PNG/JPG
5. Save changes

---

## Reference Links

- [Reddit Banner Help](https://support.reddithelp.com/hc/en-us/articles/15484339588884-Banner)
- [Reddit Graphic Size Guide](https://onlineoptimism.com/resource/comprehensive-graphic-size-guide-for-reddit/)
- [Design Best Practices](https://snappa.com/blog/reddit-banner-size/)

---

## Completed Items (Archive)

| Date | Task | Result |
|------|------|--------|
| 2026-01-26 | Fix scheduler job name | ✅ Synced to `daily-puzzle-post` |
| 2026-01-26 | Update devvit.yaml version | ✅ v0.0.12 |
| 2026-01-26 | Rebuild and redeploy | ✅ Deployed |
| 2026-01-26 | Final playtest | ✅ All flows working |
| 2026-01-26 | Verify public access | ✅ Subreddit is public |
| 2026-01-26 | Create "How to Play" post | ✅ Pinned to subreddit |
| 2026-01-26 | Mobile/desktop viewport test | ✅ Responsive verified |
| 2026-01-26 | Create DEVPOST_SUBMISSION.md | ✅ Complete |
| 2026-01-26 | Create UX_REVIEW.md | ✅ Complete |
| 2026-01-26 | Generate subreddit icon | ✅ 256×256 PNG, 25KB |
| 2026-01-26 | Generate subreddit banner | ✅ 1920×384 PNG, 154KB |
