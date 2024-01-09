export function formatPrice(price: number | string): string {
  const parsedPrice = parseFloat(String(price));

  if (isNaN(parsedPrice)) {
    return "Invalid price"; // Handle invalid input
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(parsedPrice);
}
