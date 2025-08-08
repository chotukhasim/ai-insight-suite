export function fitLinearRegression(x: number[], y: number[]) {
  const n = x.length;
  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const mx = mean(x);
  const my = mean(y);
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - mx) * (y[i] - my);
    den += (x[i] - mx) * (x[i] - mx);
  }
  const b = den === 0 ? 0 : num / den; // slope
  const a = my - b * mx; // intercept
  const predict = (xi: number) => a + b * xi;
  return { a, b, predict };
}

export function rmse(actual: number[], predicted: number[]) {
  const n = Math.min(actual.length, predicted.length);
  const mse =
    actual.slice(0, n).reduce((acc, v, i) => acc + (v - predicted[i]) ** 2, 0) /
    n;
  return Math.sqrt(mse);
}
