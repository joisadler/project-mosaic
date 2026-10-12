export function getSafeReadMoreUrl(value?: string) {
  if (!value || !/^https?:\/\//i.test(value)) {
    return null;
  }

  try {
    const url = new URL(value);
    const usesSafeProtocol = url.protocol === "http:" || url.protocol === "https:";
    const hasSafeAuthority = Boolean(url.hostname) && !url.username && !url.password;

    return usesSafeProtocol && hasSafeAuthority ? url.href : null;
  } catch {
    return null;
  }
}
