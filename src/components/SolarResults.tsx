import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, Zap, TrendingUp } from "lucide-react";
import type { SolarData } from "@/lib/solarCalculations";

interface SolarResultsProps {
  results: SolarData | null;
  area: number;
}

const SolarResults = ({ results, area }: SolarResultsProps) => {
  if (!results || area === 0) {
    return (
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-primary" />
            Solar Analysis Results
          </CardTitle>
          <CardDescription>
            Configure parameters and draw an area to see solar potential analysis
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-primary" />
          Solar Analysis Results
        </CardTitle>
        <CardDescription>
          Real-time PIV estimation with sun position and shadow analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Sun className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Roof Area</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {area.toLocaleString()} <span className="text-sm font-normal">m²</span>
            </p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Cloud className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground">Shadow Coverage</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {results.shadowCoverage} <span className="text-sm font-normal">%</span>
            </p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground">Avg Irradiance</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {results.avgIrradiance} <span className="text-sm font-normal">W/m²</span>
            </p>
          </div>

          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">Estimated Power</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {results.estimatedPower.toLocaleString()}{" "}
              <span className="text-sm font-normal">kWh/mo</span>
            </p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border space-y-3">
          <h4 className="font-semibold text-sm">Detailed Analysis</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sunlight Hours/Day:</span>
              <span className="font-medium">{results.sunlightHours}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">PIV Value:</span>
              <span className="font-medium">{results.pivValue} kWh/m²/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sun Altitude:</span>
              <span className="font-medium">{Math.round(results.sunAltitude)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sun Azimuth:</span>
              <span className="font-medium">{Math.round(results.sunAzimuth)}°</span>
            </div>
          </div>
        </div>

        {/* Estimated Savings */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Estimated Annual Generation</p>
          <p className="text-3xl font-bold text-primary">
            {(results.estimatedPower * 12).toLocaleString()}{" "}
            <span className="text-lg font-normal">kWh/year</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on current location, orientation, and panel efficiency
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolarResults;
