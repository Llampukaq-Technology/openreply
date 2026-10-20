import zhTW from "./zh-TW.json";
import es from "./es.json";

export const LOCALE_COOKIE = "openreply-locale";
export type Locale = "en" | "es" | "zh-TW";
export type MessageKey = keyof typeof zhTW;

// The product ships in Spanish; English and 繁體中文 stay selectable.
export const DEFAULT_LOCALE: Locale = "es";

const catalogs: Record<Exclude<Locale, "en">, Record<MessageKey, string>> = {
  "zh-TW": zhTW,
  es,
};

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "es" || value === "zh-TW";
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

type Placeholders<S extends string> =
  S extends `${string}{${infer Name}}${infer Rest}`
    ? Name | Placeholders<Rest>
    : never;
export type StaticMessageKey = {
  [K in MessageKey]: [Placeholders<K>] extends [never] ? K : never;
}[MessageKey];
type MessageArgs<K extends MessageKey> = [Placeholders<K>] extends [never]
  ? []
  : [values: Record<Placeholders<K>, string | number>];

// English is the source language. Only application-owned copy belongs here;
// campaign messages, account names and API values are never translation keys.
const labels: Record<string, StaticMessageKey> = {
  ALL: "All",
  SENT: "Sent",
  FAILED: "Failed",
  PENDING: "Pending",
  SKIPPED_RATE_LIMIT: "Rate limited",
  SKIPPED_PLAN_LIMIT: "Plan limit",
  SKIPPED_DEDUP: "Dedup",
  OWNER: "Owner",
  ADMIN: "Admin",
  MEMBER: "Member",
  all: "All",
  active: "Active",
  paused: "Paused",
  waiting: "Waiting",
  delayed: "Delayed",
  failed: "Failed",
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
  Sun: "Sun",
};

export interface I18n {
  locale: Locale;
  t: <K extends MessageKey>(key: K, ...args: MessageArgs<K>) => string;
  label: (value: string) => string;
}

export function createI18n(locale: Locale): I18n {
  function t<K extends MessageKey>(key: K, ...args: MessageArgs<K>): string {
    const catalog = locale === "en" ? undefined : catalogs[locale];
    const message = catalog?.[key] ?? key;
    const values = args[0] as Record<string, string | number> | undefined;
    return message.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
      values?.[name] === undefined ? placeholder : String(values[name]),
    );
  }

  return {
    locale,
    t,
    label: (value: string) =>
      Object.hasOwn(labels, value) ? t(labels[value]) : value,
  };
}

