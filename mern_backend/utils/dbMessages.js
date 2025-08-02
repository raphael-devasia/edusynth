const path = require('path');
const fs = require('fs');

const dbMessages = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../lang/en/db.json'), 'utf8')
);

/**
 * Get a DB message by key, replacing %s placeholders in order.
 * @param {string} key - The message key
 * @param {Array} replacements - Replacement values for %s
 * @returns {string}
 */
function getDbMessage(key, replacements = []) {
  let msg = dbMessages[key] || key;
  replacements.forEach(val => {
    msg = msg.replace(/%s/, val);
  });
  return msg;
}

module.exports = { getDbMessage };
