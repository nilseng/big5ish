export const getCookie = (name: string) => {
  const cookie = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.indexOf(`${name}=`) === 0);
  return cookie?.substring(`${name}=`.length, cookie.length);
};

export const setCookie = ({ name, value }: { name: string; value: string | number }) => {
  if (getCookie(name)) deleteCookie(name);
  document.cookie = `${name}=${value}`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
