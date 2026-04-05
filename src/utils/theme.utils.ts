import type { Theme } from "@fintrack/types";

const STORAGE_KEY = "fintrack_theme";
const DEFAULT_THEME: Theme = "system";

export class ThemeUtils {
  static getStoredTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
      }
      return DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  }

  static storeTheme(theme: Theme): void {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      console.error("Failed to persist theme to localStorage");
    }
  }

  static getSystemPreference(): "light" | "dark" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  static resolveEffectiveTheme(theme: Theme): "light" | "dark" {
    if (theme === "system") return ThemeUtils.getSystemPreference();
    return theme;
  }

  static applyTheme(theme: Theme): void {
    const effective = ThemeUtils.resolveEffectiveTheme(theme);
    const root = document.documentElement;
    if (effective === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  static getMediaQuery(): MediaQueryList {
    return window.matchMedia("(prefers-color-scheme: dark)");
  }
}
