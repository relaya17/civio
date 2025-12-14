import { DateTime } from "luxon";
/**
 * MVP rule (pragmatic): disable the system on Shabbat window in Israel time.
 *
 * We intentionally avoid complex sunset/holiday calculations in MVP.
 * Heuristic (seasonal, Jerusalem-ish):
 * - From Friday "candle lighting-ish" hour until Saturday "havdalah-ish" hour, by month.
 * - This is intentionally approximate (better UX than blocking all of Saturday).
 */
export function getShabbatGateNow() {
    const tz = "Asia/Jerusalem";
    const now = DateTime.now().setZone(tz);
    const isFriday = now.weekday === 5; // Monday=1 ... Friday=5
    const isSaturday = now.weekday === 6; // Saturday=6
    // Month: 1..12
    const m = now.month;
    // Fractions are supported (e.g. 17.5 == 17:30).
    // Note: these are *approximate* and should be replaced by real zmanim later.
    const startHourByMonth = {
        1: 16.5,
        2: 17,
        3: 17.5,
        4: 18.5,
        5: 19.0,
        6: 19.0,
        7: 19.0,
        8: 19.0,
        9: 18.0,
        10: 17.5,
        11: 17.0,
        12: 16.5,
    };
    const endHourByMonth = {
        1: 17.5,
        2: 17.5,
        3: 17.5,
        4: 17.5,
        5: 17.5,
        6: 17.5,
        7: 17.5,
        8: 17.5,
        9: 17.5,
        10: 17.5,
        11: 17.5,
        12: 17.5,
    };
    const shabbatStartsHour = startHourByMonth[m] ?? 18;
    const shabbatEndsHour = endHourByMonth[m] ?? 17.5;
    const nowH = now.hour + now.minute / 60;
    const isShabbat = (isFriday && nowH >= shabbatStartsHour) || (isSaturday && nowH < shabbatEndsHour);
    return { isShabbat, nowISO: now.toISO() ?? now.toString(), timezone: tz };
}
