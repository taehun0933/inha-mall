export function getLocalStorageUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function setLocalStorageUser(userData) {
  return localStorage.setItem("user", JSON.stringify(userData));
}
