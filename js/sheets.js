// Google Sheets public fetch + parse
// Sheet must be "Published to the web" (File → Share → Publish to web)

const SHEET_ID = '11IMZQDkeGEfND_yWXmxcL62BV64UAqNAXDFD9X-1ulE'
const SHEET_GID = '0'

export function setSheetId(id) {
  if (id) sheetUrl = buildUrl(id)
}

function buildUrl(id) {
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`
}

let sheetUrl = SHEET_ID ? buildUrl(SHEET_ID) : ''
let cachedData = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 min

export async function fetchWorkouts() {
  if (!sheetUrl) return []
  if (cachedData && Date.now() - cacheTime < CACHE_TTL) return cachedData

  try {
    const res = await fetch(sheetUrl)
    const text = await res.text()
    // Google wraps JSON in google.visualization.Query.setResponse(...)
    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)?.[1])
    cachedData = parseSheet(json)
    cacheTime = Date.now()
    return cachedData
  } catch (err) {
    console.error('Sheet fetch error:', err)
    return cachedData || []
  }
}

function parseSheet(json) {
  const cols = json.table.cols.map(c => c.label?.toLowerCase().trim())
  const rows = json.table.rows

  return rows.map(row => {
    const obj = {}
    row.c.forEach((cell, i) => {
      if (cols[i]) obj[cols[i]] = cell?.v ?? ''
    })
    return {
      week: parseInt(obj.week) || 1,
      day: parseInt(obj.day) || 1,
      workoutTitle: obj['workout title'] || `Day ${obj.day}`,
      order: parseInt(obj.order) || 1,
      exercise: obj.exercise || '',
      equipment: obj.equipment || '',
      sets: String(obj.sets || ''),
      reps: String(obj.reps || ''),
      rest: String(obj.rest || ''),
      notes: obj.notes || ''
    }
  }).sort((a, b) => a.week - b.week || a.day - b.day || a.order - b.order)
}

// Get exercises for a specific week + day number
export function getWorkoutForDay(workouts, week, dayNum) {
  return workouts.filter(w => w.week === week && w.day === dayNum)
}

// Map a weekday name to a day number (1-4) based on user schedule
export function getDayNumber(schedule, weekdayName) {
  const idx = schedule.indexOf(weekdayName.toLowerCase())
  return idx >= 0 ? idx + 1 : 0 // 0 = rest day
}

// Calculate which program week we're in based on start date
export function getProgramWeek(startDate) {
  const start = new Date(startDate)
  const now = new Date()
  start.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  const diff = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000))
  return Math.max(1, diff + 1)
}

// Get max week number in the program
export function getMaxWeek(workouts) {
  return Math.max(1, ...workouts.map(w => w.week))
}
