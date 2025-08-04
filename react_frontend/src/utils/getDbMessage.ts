import dbMessages from '../lang/en/db.json';

/**
 * Get a DB message by key, replacing %s placeholders in order.
 * @param key - The message key
 * @param replacements - Replacement values for %s
 * @returns string
 */
export function getDbMessage(
  key: string,
  replacements: (string | number)[] = []
): string {
  let msg = (dbMessages as Record<string, string>)[key] || key;
  replacements.forEach(val => {
    msg = msg.replace(/%s/, String(val));
  });
  return msg;
}
