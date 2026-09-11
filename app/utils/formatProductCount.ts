export function formatProductCount(count: number): string {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} товаров`;
  }

  if (lastDigit === 1) {
    return `${count} товар`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} товара`;
  }

  return `${count} товаров`;
}
