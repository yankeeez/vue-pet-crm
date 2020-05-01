export default function currencyFilter (value, currency = 'UAH') {
  return new Intl.NumberFormat('en-En', {
    style: 'currency',
    currency: currency
  }).format(value)
}
