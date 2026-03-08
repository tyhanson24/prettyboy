# PrettyBoy — Setup Guide

## Google Sheets Setup (Workout Programming)

### Step 1: Create the Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **"PrettyBoy Programming"** (or whatever you prefer)
3. Set up the **header row** (Row 1) with these exact column names:

| Week | Day | Workout Title | Order | Exercise | Equipment | Sets | Reps | Rest | Notes |
|------|-----|---------------|-------|----------|-----------|------|------|------|-------|

### Step 2: Add Your Workouts

Fill in your programming. Here's how each column works:

- **Week** — Program week number (1, 2, 3, etc.)
- **Day** — Day number within the week (1-4 for a 4-day program)
  - Day 1 maps to the user's first training day (default: Monday)
  - Day 2 maps to the user's second training day (default: Tuesday)
  - Day 3 maps to their third (default: Thursday)
  - Day 4 maps to their fourth (default: Friday)
- **Workout Title** — The session name shown to the user (e.g., "Day 1 — Strength")
- **Order** — Exercise order within the workout (1, 2, 3...)
- **Exercise** — Exercise name
- **Equipment** — Equipment needed (shows as a tag). Leave blank if bodyweight
- **Sets** — Number of sets
- **Reps** — Rep count or scheme (e.g., "8-10", "12 ea.", "30s")
- **Rest** — Rest period between sets
- **Notes** — Coaching cues or instructions (shown in italics below the exercise)

**Example rows:**

| Week | Day | Workout Title | Order | Exercise | Equipment | Sets | Reps | Rest | Notes |
|------|-----|---------------|-------|----------|-----------|------|------|------|-------|
| 1 | 1 | Day 1 — Strength | 1 | Back Squat | Barbell | 4 | 6 | 3min | Below parallel |
| 1 | 1 | Day 1 — Strength | 2 | DB Bench Press | Dumbbells | 3 | 10-12 | 90s | Full ROM |
| 1 | 1 | Day 1 — Strength | 3 | Bent Over Row | Barbell | 3 | 8-10 | 90s | Drive elbows back |
| 1 | 2 | Day 2 — Conditioning | 1 | KB Swings | Kettlebell | 5 | 15 | 60s | Hip hinge |
| 1 | 2 | Day 2 — Conditioning | 2 | Box Jumps | Plyo Box | 4 | 8 | 90s | Step down |

### Step 3: Publish the Sheet

1. In Google Sheets, go to **File → Share → Publish to web**
2. Under "Link", select **Entire Document** and **Web page**
3. Click **Publish**
4. Copy the **Sheet ID** from the URL. It's the long string between `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
   ```

### Step 4: Connect to PrettyBoy

1. Open `js/sheets.js`
2. Set your Sheet ID on line 4:
   ```js
   const SHEET_ID = 'your_sheet_id_here'
   ```
3. Deploy the change

That's it! The app will automatically fetch workouts from your sheet. Changes to the sheet appear within 5 minutes (cached).

---

## How Day Mapping Works

Users pick their training days during onboarding (default: Mon/Tue/Thu/Fri).

The **Day** column in your sheet (1-4) maps to their schedule order:
- Day 1 → Their 1st training day (Monday)
- Day 2 → Their 2nd training day (Tuesday)
- Day 3 → Their 3rd training day (Thursday)
- Day 4 → Their 4th training day (Friday)

If a user customizes their schedule to Mon/Wed/Fri/Sat:
- Day 1 → Monday
- Day 2 → Wednesday
- Day 3 → Friday
- Day 4 → Saturday

Non-training days automatically show "REST DAY".

---

## Week Tracking

The app calculates which **program week** to show based on each user's **Program Start Date** (set during onboarding, editable in Settings).

- Week 1 starts on their start date
- Each 7 days advances to the next week
- If the program has 4 weeks of content and they're in Week 5, it will show "No Program"

---

## Tips

- You can update the sheet anytime — users see changes within 5 minutes
- Add new weeks by simply adding more rows with higher Week numbers
- Keep exercise names consistent for a clean look
- Equipment tags are optional — leave blank for bodyweight movements
- The Notes field is great for coaching cues and form reminders
