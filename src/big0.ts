// sum using number (may lose precision for very large n)
function sum(n: number): number {
  const m = Math.trunc(n);
  return (m * (m + 1)) / 2;
}

// fastSum using BigInt for correct integer arithmetic on large n
function fastSum(n: number): bigint {
  const bn = BigInt(Math.trunc(n));
  return (bn * (bn + 1n)) / 2n;
}

// Test and measure both implementations
const N = 2_000_000_000; // 2e9

const startNumber = process.hrtime.bigint();
const resultNumber = sum(N);
const endNumber = process.hrtime.bigint();
const durationNumberNs = endNumber - startNumber;

const startBigInt = process.hrtime.bigint();
const resultBigInt = fastSum(N);
const endBigInt = process.hrtime.bigint();
const durationBigIntNs = endBigInt - startBigInt;

console.log("(number) Sum of 1 to", N, "is:", resultNumber);
console.log(
  `(number) Duration: ${
    Number(durationNumberNs) / 1e6
  } ms (${durationNumberNs} ns)`
);

console.log("(bigint) Sum of 1 to", N, "is:", resultBigInt.toString());
console.log(
  `(bigint) Duration: ${
    Number(durationBigIntNs) / 1e6
  } ms (${durationBigIntNs} ns)`
);
