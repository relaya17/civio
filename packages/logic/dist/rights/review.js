function parseISODateToUtcMs(iso) {
    // Expect yyyy-mm-dd
    const ms = Date.parse(`${iso}T00:00:00Z`);
    return Number.isNaN(ms) ? null : ms;
}
export function isRightStale(item, nowMs = Date.now()) {
    const reviewedMs = parseISODateToUtcMs(item.lastReviewedISO);
    if (reviewedMs === null)
        return true;
    const intervalDays = item.reviewIntervalDays ?? 180;
    const ageMs = nowMs - reviewedMs;
    return ageMs > intervalDays * 24 * 60 * 60 * 1000;
}
