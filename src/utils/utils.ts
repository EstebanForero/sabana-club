function getFutureDateAndRemainingDays(startDateStr: string): { futureDate: string; daysRemaining: number } {
  const startDate = new Date(startDateStr);
  const futureDate = new Date(startDate);
  futureDate.setDate(startDate.getDate() + 30);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = futureDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    futureDate: futureDate.toISOString().split('T')[0],
    daysRemaining: Math.max(daysRemaining, 0),
  };
}

const result = getFutureDateAndRemainingDays("2025-01-29");
console.log(result);

