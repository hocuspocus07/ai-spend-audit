export const getSpendBenchmarkMultiplier = (
  spendPerEmployee: number
): number => {
  const benchmark = 45;

  return Number((spendPerEmployee / benchmark).toFixed(2));
};