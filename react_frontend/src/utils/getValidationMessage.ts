import validationMessages from '../lang/en/form_validation.json';

/**
 * Get a validation message by key, replacing {field}, {param}, etc.
 * @param key - The message key
 * @param replacements - Replacement values for {field}, {param}, etc.
 * @returns string
 */
export function getValidationMessage(
  key: string,
  replacements: Record<string, string | number> = {}
): string {
  let msg = (validationMessages as Record<string, string>)[key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    msg = msg.replace(new RegExp(`{${k}}`, 'g'), String(v));
  }
  return msg;
}
