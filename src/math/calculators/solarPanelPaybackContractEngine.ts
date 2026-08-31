export interface SolarContractPaybackDetail {
  systemCapacityKW: number;
  grossContractPrice: number;
  govPMSuryaGharSubsidy: number;
  netInvestmentCost: number;
  annualUnitsGeneratedKWh: number;
  annualBillSavingsINR: number;
  paybackPeriodYears: number;
  twentyFiveYearNetProfitINR: number;
  co2OffsetTons25Years: number;
}

export class SolarPanelPaybackContractEngine {
  public static calculateSolarPayback(
    systemCapacityKW = 3,
    electricityTariffPerKWh = 8.5
  ): SolarContractPaybackDetail {
    const grossContractPrice = systemCapacityKW * 70000;

    let govPMSuryaGharSubsidy = 30000;
    if (systemCapacityKW >= 3) govPMSuryaGharSubsidy = 78000;
    else if (systemCapacityKW === 2) govPMSuryaGharSubsidy = 60000;

    const netInvestmentCost = Math.max(0, grossContractPrice - govPMSuryaGharSubsidy);

    const annualUnitsGeneratedKWh = systemCapacityKW * 1400; // ~1400 units/kW/year
    const annualBillSavingsINR = annualUnitsGeneratedKWh * electricityTariffPerKWh;

    const paybackPeriodYears = annualBillSavingsINR > 0 ? netInvestmentCost / annualBillSavingsINR : 0;
    const twentyFiveYearNetProfitINR = Math.round(annualBillSavingsINR * 25 - netInvestmentCost);
    const co2OffsetTons25Years = parseFloat((systemCapacityKW * 1.2 * 25).toFixed(1));

    return {
      systemCapacityKW,
      grossContractPrice: Math.round(grossContractPrice),
      govPMSuryaGharSubsidy,
      netInvestmentCost: Math.round(netInvestmentCost),
      annualUnitsGeneratedKWh: Math.round(annualUnitsGeneratedKWh),
      annualBillSavingsINR: Math.round(annualBillSavingsINR),
      paybackPeriodYears: parseFloat(paybackPeriodYears.toFixed(1)),
      twentyFiveYearNetProfitINR,
      co2OffsetTons25Years,
    };
  }
}
