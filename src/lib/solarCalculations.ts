import SunCalc from 'suncalc';

export interface SolarData {
  sunAzimuth: number;
  sunAltitude: number;
  sunlightHours: number;
  shadowCoverage: number;
  avgIrradiance: number;
  pivValue: number;
  estimatedPower: number;
}

/**
 * Calculate sun position for a given location, date, and time
 */
export function calculateSunPosition(
  latitude: number,
  longitude: number,
  date: Date = new Date()
): { azimuth: number; altitude: number } {
  const sunPos = SunCalc.getPosition(date, latitude, longitude);
  return {
    azimuth: sunPos.azimuth * (180 / Math.PI) + 180, // Convert to degrees, 0-360
    altitude: sunPos.altitude * (180 / Math.PI), // Convert to degrees
  };
}

/**
 * Calculate daily sunlight hours for a location
 */
export function calculateSunlightHours(
  latitude: number,
  longitude: number,
  date: Date = new Date()
): number {
  const times = SunCalc.getTimes(date, latitude, longitude);
  const sunrise = times.sunrise.getTime();
  const sunset = times.sunset.getTime();
  const hours = (sunset - sunrise) / (1000 * 60 * 60);
  return Math.max(0, hours);
}

/**
 * Calculate solar irradiance based on sun altitude and shadow coverage
 * @param sunAltitude - Sun altitude in degrees
 * @param shadowCoverage - Percentage of area in shadow (0-100)
 * @param tiltAngle - Panel tilt angle in degrees
 * @param orientation - Panel orientation (north, south, east, west)
 * @returns Irradiance in W/m²
 */
export function calculateIrradiance(
  sunAltitude: number,
  shadowCoverage: number,
  tiltAngle: number = 30,
  orientation: string = 'south'
): number {
  // Base irradiance at solar noon (W/m²)
  const maxIrradiance = 1000;
  
  // Adjust for sun altitude (0° = 0 W/m², 90° = max)
  const altitudeFactor = Math.max(0, Math.sin(sunAltitude * Math.PI / 180));
  
  // Adjust for shadow coverage
  const shadowFactor = 1 - (shadowCoverage / 100);
  
  // Adjust for tilt and orientation
  let orientationFactor = 1;
  if (orientation === 'south') orientationFactor = 1.0;
  else if (orientation === 'north') orientationFactor = 0.6;
  else if (orientation === 'east' || orientation === 'west') orientationFactor = 0.8;
  
  const tiltFactor = Math.cos((tiltAngle - sunAltitude) * Math.PI / 180);
  
  return maxIrradiance * altitudeFactor * shadowFactor * orientationFactor * Math.abs(tiltFactor);
}

/**
 * Calculate PIV (Photovoltaic Irradiance Value) in kWh/m²/day
 */
export function calculatePIV(
  avgIrradiance: number,
  sunlightHours: number
): number {
  // Convert W/m² to kWh/m²/day
  return (avgIrradiance * sunlightHours) / 1000;
}

/**
 * Calculate estimated monthly power generation
 * @param area - Installation area in m²
 * @param pivValue - PIV value in kWh/m²/day
 * @param panelEfficiency - Panel efficiency percentage
 * @returns Estimated power in kWh/month
 */
export function calculateEstimatedPower(
  area: number,
  pivValue: number,
  panelEfficiency: number = 20
): number {
  const daysInMonth = 30;
  const efficiencyFactor = panelEfficiency / 100;
  return area * pivValue * efficiencyFactor * daysInMonth;
}

/**
 * Simulate shadow coverage based on surrounding obstacles
 * This is a simplified simulation - in real implementation would use 3D ray tracing
 */
export function simulateShadowCoverage(
  sunAltitude: number,
  sunAzimuth: number,
  hasObstructions: boolean = false
): number {
  // Low sun angle = more shadows
  if (sunAltitude < 15) return 60;
  if (sunAltitude < 30) return 30;
  if (sunAltitude < 45) return hasObstructions ? 20 : 10;
  return hasObstructions ? 10 : 5;
}

/**
 * Get comprehensive solar analysis for a location
 */
export function getSolarAnalysis(
  latitude: number,
  longitude: number,
  area: number,
  tiltAngle: number,
  orientation: string,
  panelEfficiency: number,
  date: Date = new Date(),
  hasObstructions: boolean = false
): SolarData {
  const sunPos = calculateSunPosition(latitude, longitude, date);
  const sunlightHours = calculateSunlightHours(latitude, longitude, date);
  const shadowCoverage = simulateShadowCoverage(sunPos.altitude, sunPos.azimuth, hasObstructions);
  const avgIrradiance = calculateIrradiance(sunPos.altitude, shadowCoverage, tiltAngle, orientation);
  const pivValue = calculatePIV(avgIrradiance, sunlightHours);
  const estimatedPower = calculateEstimatedPower(area, pivValue, panelEfficiency);

  return {
    sunAzimuth: sunPos.azimuth,
    sunAltitude: sunPos.altitude,
    sunlightHours: Math.round(sunlightHours * 10) / 10,
    shadowCoverage: Math.round(shadowCoverage),
    avgIrradiance: Math.round(avgIrradiance),
    pivValue: Math.round(pivValue * 100) / 100,
    estimatedPower: Math.round(estimatedPower),
  };
}
