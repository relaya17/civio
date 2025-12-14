import { colors, spacing } from "@civio/design-tokens";
export const civioTokens = {
    colors: {
        // Brand (Civio) — trust, calm, modern, high-contrast (WCAG-minded)
        primary: colors.primary,
        primaryDark: colors.primaryDark,
        primarySoft: colors.primarySoft,
        secondary: colors.secondary,
        secondaryDark: colors.secondaryDark,
        secondarySoft: colors.secondarySoft,
        background: colors.background,
        surface: colors.surface,
        divider: colors.divider,
        text: colors.textPrimary,
        textSecondary: colors.textSecondary,
        textDisabled: colors.textDisabled,
        // Status
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        // Focus ring / outlines
        focus: colors.focus,
        // Back-compat keys (older code expects these)
        accent: colors.secondary,
        muted: colors.textSecondary,
    },
    spacing,
    roundness: 12,
};
