export interface SolarContractROI {
  systemCapacityKW: number;
  grossContractPrice: number;
  govPMSuryaGharSubsidy: number;
  netCapitalInvestment: number;
  annualGenerationKWh: number;
  annualElectricityBillSavings: number;
  paybackPeriodYears: number;
  twentyFiveYearNetSavings: number;
  co2EmissionsOffsetTons: number;
}

export class SolarPanelROIContractEngine {
  public static calculateSolarROI(
    systemCapacityKW = 3,
    tariffRatePerKWh = 8.5
  ): SolarContractROI {
    const grossContractPrice = systemCapacityKW * 70000;

    // PM Surya Ghar Muft Bijli Yojana Subsidy
    let govPMSuryaGharSubsidy = 30000;
    if (systemCapacityKW >= 3) govPMSuryaGharSubsidy = 78000;
    else if (systemCapacityKW === 2) govPMSuryaGharSubsidy = 60000;

    const netCapitalInvestment = Math.max(0, grossContractPrice - govPMSuryaGharSubsidy);

    const annualGenerationKWh = systemCapacityKW * 1400; // ~1400 units/kW/year in India
    const annualElectricityBillSavings = annualGenerationKWh * tariffRatePerKWh;

    const paybackPeriodYears = annualElectricityBillSavings > 0 ? netCapitalInvestment / annualElectricityBillSavings : 0;
    const twentyFiveYearNetSavings = Math.round(annualElectricityBillSavings * 25 - netCapitalInvestment);
    const co2EmissionsOffsetTons = parseFloat((systemCapacityKW * 1.2 * 25).toFixed(1));

    return {
      systemCapacityKW,
      grossContractPrice: Math.round(grossContractPrice),
      govPMSuryaGharSubsidy,
      netCapitalInvestment: Math.round(netCapitalInvestment),
      annualGenerationKWh: Math.round(annualGenerationKWh),
      annualElectricityBillSavings: Math.round(annualElectricityBillSavings),
      paybackPeriodYears: parseFloat(paybackPeriodYears.toFixed(1)),
      twentyFiveYearNetSavings,
      co2EmissionsOffsetTons,
    };
  }
}
