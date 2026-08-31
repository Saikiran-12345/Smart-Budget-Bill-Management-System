export interface DrawdownPoint {
  dateStr: string;
  portfolioValue: number;
  peakValueSoFar: number;
  drawdownPercent: number;
}

export class MaximumDrawdownEngine {
  public static calculateMaxDrawdown(historicalValues: { dateStr: string; portfolioValue: number }[]): {
    maxDrawdownPercent: number;
    peakValueINR: number;
    troughValueINR: number;
    peakDateStr: string;
    troughDateStr: string;
    drawdownSeries: DrawdownPoint[];
  } {
    let peakValue = -Infinity;
    let peakDate = '';
    let maxDrawdown = 0;
    let troughValue = 0;
    let troughDate = '';

    const series: DrawdownPoint[] = [];

    historicalValues.forEach((item) => {
      if (item.portfolioValue > peakValue) {
        peakValue = item.portfolioValue;
        peakDate = item.dateStr;
      }

      const drawdown = peakValue > 0 ? ((peakValue - item.portfolioValue) / peakValue) * 100 : 0;

      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
        troughValue = item.portfolioValue;
        troughDate = item.dateStr;
      }

      series.push({
        dateStr: item.dateStr,
        portfolioValue: item.portfolioValue,
        peakValueSoFar: Math.round(peakValue),
        drawdownPercent: parseFloat(drawdown.toFixed(2)),
      });
    });

    return {
      maxDrawdownPercent: parseFloat(maxDrawdown.toFixed(2)),
      peakValueINR: Math.round(peakValue),
      troughValueINR: Math.round(troughValue),
      peakDateStr: peakDate,
      troughDateStr: troughDate,
      drawdownSeries: series,
    };
  }
}
