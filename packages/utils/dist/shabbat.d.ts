export interface ShabbatGateResult {
    readonly isShabbat: boolean;
    readonly nowISO: string;
    readonly timezone: "Asia/Jerusalem";
}
/**
 * MVP rule (pragmatic): disable the system on Shabbat window in Israel time.
 *
 * We intentionally avoid complex sunset/holiday calculations in MVP.
 * Heuristic (seasonal, Jerusalem-ish):
 * - From Friday "candle lighting-ish" hour until Saturday "havdalah-ish" hour, by month.
 * - This is intentionally approximate (better UX than blocking all of Saturday).
 */
export declare function getShabbatGateNow(): ShabbatGateResult;
//# sourceMappingURL=shabbat.d.ts.map