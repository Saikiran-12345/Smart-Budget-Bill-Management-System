import { SolarPanelROIContractEngine, SolarContractROI } from '../math/calculators/solarPanelROIContractEngine';

export class SolarROIService {
  public static getSolarROI(systemCapacityKW = 3): SolarContractROI {
    return SolarPanelROIContractEngine.calculateSolarROI(systemCapacityKW);
  }
}
