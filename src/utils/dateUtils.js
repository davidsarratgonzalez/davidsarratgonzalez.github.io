// Month mappings for parsing different formats
const MONTH_MAP = {
  // Numbers
  '1': 1, '01': 1,
  '2': 2, '02': 2,
  '3': 3, '03': 3,
  '4': 4, '04': 4,
  '5': 5, '05': 5,
  '6': 6, '06': 6,
  '7': 7, '07': 7,
  '8': 8, '08': 8,
  '9': 9, '09': 9,
  '10': 10,
  '11': 11,
  '12': 12,
  // Abbreviations (3 letters)
  'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4,
  'may': 5, 'jun': 6, 'jul': 7, 'aug': 8,
  'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12,
  // Full names
  'january': 1, 'february': 2, 'march': 3, 'april': 4,
  'june': 6, 'july': 7, 'august': 8,
  'september': 9, 'october': 10, 'november': 11, 'december': 12
};

/**
 * Parse a month string into a number (1-12)
 * Accepts: numbers (1-12), abbreviations (Jan, Feb), full names (January, February)
 */
export function parseMonth(monthStr) {
  if (!monthStr) return null;
  const normalized = String(monthStr).toLowerCase().trim();
  return MONTH_MAP[normalized] || null;
}

/**
 * Parse a date from an item, supporting multiple formats:
 * - Single field "date": "Jan 2025", "January 2025", "2025"
 * - Separate fields "month" and "year"
 * - Date range fields "startDate" and "endDate"
 *
 * @param {Object} item - The data item
 * @param {string|string[]} sortFields - Field(s) to try for sorting, in priority order
 * Returns { year: number, month: number } or null
 */
export function parseDateFromItem(item, sortFields = ['date', 'startDate']) {
  // Normalize sortFields to array
  const fields = Array.isArray(sortFields) ? sortFields : [sortFields];

  // Try each field in order
  for (const field of fields) {
    // Handle "Present" value for endDate
    if (field === 'endDate' && item.endDate === 'Present') {
      return { year: 9999, month: 12 };
    }

    // Handle month + year combination
    if (field === 'month' && item.month && item.year) {
      const month = parseMonth(item.month);
      const year = parseInt(item.year, 10);
      if (year && !isNaN(year)) {
        return { year, month: month || 1 };
      }
    }

    // Handle direct field
    if (item[field]) {
      const parsed = parseDateString(item[field]);
      if (parsed) return parsed;
    }
  }

  return null;
}

/**
 * Parse a date string like "Jan 2025", "January 2025", "2025", "01/2025"
 */
export function parseDateString(dateStr) {
  if (!dateStr) return null;

  const str = String(dateStr).trim();

  // Try "Month Year" format (e.g., "Jan 2025", "January 2025")
  const monthYearMatch = str.match(/^([a-zA-Z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const month = parseMonth(monthYearMatch[1]);
    const year = parseInt(monthYearMatch[2], 10);
    if (month && year) {
      return { year, month };
    }
  }

  // Try "MM/YYYY" or "MM-YYYY" format
  const slashMatch = str.match(/^(\d{1,2})[/-](\d{4})$/);
  if (slashMatch) {
    const month = parseInt(slashMatch[1], 10);
    const year = parseInt(slashMatch[2], 10);
    if (month >= 1 && month <= 12 && year) {
      return { year, month };
    }
  }

  // Try year only
  const yearMatch = str.match(/^(\d{4})$/);
  if (yearMatch) {
    return { year: parseInt(yearMatch[1], 10), month: 1 };
  }

  return null;
}

/**
 * Compare two parsed dates for sorting
 * Returns negative if a < b, positive if a > b, 0 if equal
 */
export function compareDates(a, b) {
  if (!a && !b) return 0;
  if (!a) return 1;  // null dates go to the end
  if (!b) return -1;

  if (a.year !== b.year) {
    return a.year - b.year;
  }
  return (a.month || 1) - (b.month || 1);
}

/**
 * Sort an array of items by date
 * @param {Array} items - Array of items to sort
 * @param {string} order - 'asc' or 'desc' (default: 'desc')
 * @param {string|string[]} sortFields - Field(s) to try for sorting, in priority order
 */
export function sortByDate(items, order = 'desc', sortFields = ['date', 'startDate']) {
  if (!Array.isArray(items)) return items;

  return [...items].sort((a, b) => {
    const dateA = parseDateFromItem(a, sortFields);
    const dateB = parseDateFromItem(b, sortFields);
    const comparison = compareDates(dateA, dateB);
    return order === 'desc' ? -comparison : comparison;
  });
}
