import Cookies from "js-cookie";
import router from "../router";

export function hasAccess(url, policies) {
  let userInfo = Cookies.get("user-info");
  userInfo = JSON.parse(userInfo);
  let permissions = userInfo.permissions;

  let isAllowed = false;

  if (!policies) {
    return false;
  }

  permissions.forEach(perm => {
    if (isAllowed) {
      return false;
    }

    if (perm.url.includes(url)) {
      policies.forEach(policy => {
        if (perm.policies.includes(policy)) {
          isAllowed = true;
        } else {
          isAllowed = false;
          return false;
        }
      });
    }
  });

  return isAllowed;
}

export function isValid(genRoles) {
  let userInfo = Cookies.get("user-info");
  userInfo = JSON.parse(userInfo);
  let generic_role = userInfo.generic_role;

    let valid=false;

  genRoles.forEach(item => {
    if (item == generic_role) {
        valid=true;
    }
  });

  return valid;
}

export function pageAccess(url) {
  let access = hasAccess(url, ["VIEW", "CREATE"]);
  if (!access) {
    router.push({ path: "/error", query: { status: "401" } });
  }
}
