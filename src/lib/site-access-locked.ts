/** True when `SITE_ACCESS_PASSWORD` is set (non-empty): site is behind Basic Auth + noindex. */
export function isSiteAccessLocked(): boolean {
  return Boolean(process.env.SITE_ACCESS_PASSWORD?.length);
}
