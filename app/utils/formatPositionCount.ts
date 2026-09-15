const positionPluralRules = new Intl.PluralRules("ru-RU");

export function formatPositionCount(count: number): string {
  const form = positionPluralRules.select(count);
  const word = form === "one" ? "позиция" : form === "few" ? "позиции" : "позиций";

  return `${count} ${word}`;
}
