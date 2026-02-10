function fibonacciSeries(n) {
  const res = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    res.push(a);
    [a, b] = [b, a + b];
  }
  return res;
}

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++)
    if (num % i === 0) return false;
  return true;
}

function filterPrimes(arr) {
  return arr.filter(isPrime);
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function calculateHCF(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function calculateLCM(arr) {
  return arr.reduce((a, b) => lcm(a, b));
}

module.exports = {
  fibonacciSeries,
  filterPrimes,
  calculateLCM,
  calculateHCF
};
