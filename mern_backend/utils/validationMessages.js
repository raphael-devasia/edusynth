const path = require('path');
const fs = require('fs');

const validationMessages = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../lang/en/form_validation.json'), 'utf8')
);

/**
 * Get a validation message by key, replacing {field}, {param}, etc.
 * @param {string} key - The message key
 * @param {Object} replacements - Replacement values for {field}, {param}, etc.
 * @returns {string}
 */
function getValidationMessage(key, replacements = {}) {
  let msg = validationMessages[key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    msg = msg.replace(new RegExp(`{${k}}`, 'g'), v);
  }
  return msg;
}

module.exports = { getValidationMessage };
