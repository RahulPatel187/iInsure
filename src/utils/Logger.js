const EnableLog = true;
const Logger = {
  error(message) {
    if (EnableLog) console.error(message);
  },
  info(message) {
    if (EnableLog) console.info(message);
  },
  log(message) {
    if (EnableLog) console.log(message);
  },
  warn(message) {
    if (EnableLog) console.warn(message);
  },
  trace(message) {
    if (EnableLog) console.trace(message);
  },
  debug(message) {
    if (EnableLog) console.debug(message);
  },
  table(message) {
    if (EnableLog) console.table(message);
  },
};
export default Logger;
