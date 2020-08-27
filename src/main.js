const KEY = "GLOBAL_LOCAL_STORAGE_LOG";
const isValdate = function (value) {
  return value !== null && value !== undefined && value !== "";
};
const getLSLog = function () {
  const lsLog = localStorage.getItem(KEY);
  return lsLog ? JSON.parse(lsLog) : null;
};
const setLSLog = function (key, expires) {
  let lsLog = getLSLog();
  let newLsLog = lsLog || {};
  newLsLog[key] = expires;
  localStorage.setItem(KEY, JSON.stringify(newLsLog));
};
const removeLSLog = function (key) {
  let lsLog = getLSLog();
  if (lsLog && Object.prototype.hasOwnProperty.call(lsLog, key)) {
    delete lsLog[key];
    if (Object.keys(lsLog).length > 0) {
      localStorage.setItem(KEY, lsLog);
    } else {
      localStorage.removeItem(KEY);
    }
  }
};
const initLS = function () {
  let lsLog = getLSLog();
  if (lsLog) {
    const keys = Object.keys(lsLog);
    if (keys.length > 0) {
      let now = new Date().getTime();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (now >= lsLog[key]) {
          localStorage.removeItem(key);
          delete lsLog[key];
        }
      }
      if (Object.keys(lsLog).length > 0) {
        localStorage.setItem(KEY, lsLog);
      } else {
        localStorage.removeItem(KEY);
      }
    }
  }
};
export const getItem = function (key) {
  initLS();
  return localStorage.getItem(key);
};

export const setItem = function (key, value, expires) {
  if (isValdate(value) && isValdate(value)) {
    localStorage.setItem(key, value);
  }
  if (expires) {
    setLSLog(key, expires);
  }
};
export const removeItem = function (key) {
  removeLSLog(key);
  localStorage.removeItem(key);
};
export default {
  getItem,
  setItem,
  removeItem,
};
