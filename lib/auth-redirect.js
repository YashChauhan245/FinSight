export const dashboardPath = "/dashboard";

const workspacePaths = [dashboardPath, "/account", "/transaction"];
const localOrigin = "https://finsight.invalid";

export function isWorkspacePath(pathname) {
  return workspacePaths.some((path) => pathname === path || pathname.startsWith(path + "/"));
}

export function getWorkspaceRedirect(callbackUrl) {
  if (typeof callbackUrl !== "string" || !callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
    return dashboardPath;
  }

  try {
    const url = new URL(callbackUrl, localOrigin);
    if (url.origin === localOrigin && isWorkspacePath(url.pathname)) {
      return url.pathname + url.search + url.hash;
    }
  } catch {
    return dashboardPath;
  }

  return dashboardPath;
}
