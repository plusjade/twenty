import { IS_PRODUCTION } from 'api/config'

const domain = undefined

// http://www.quirksmode.org/js/cookies.html
export function setCookie(name, value, ttl) { // ttl in minutes
  let expires = ""
  let cookieDomain = ""
  let security = ""
  if (ttl) {
    var date = new Date();
    date.setTime(date.getTime() + (ttl * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  var domain = cookieDomain || domain;
  if (domain) {
    cookieDomain = "; domain=" + domain;
  }

  if (IS_PRODUCTION) {
    security = "; Secure"
  }

  document.cookie = name + "=" + escape(value) + expires + cookieDomain + "; path=/" + security;
}

export function getCookie(name) {
  var i, c;
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (i = 0; i < ca.length; i++) {
    c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return unescape(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

export function destroyCookie(name) {
  setCookie(name, "", -1);
}
