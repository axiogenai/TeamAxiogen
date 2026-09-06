export interface CountryMetric {
  id: string;
  name: string;
  code: string;
  activeUsers: number;
  dataProcessedTB: number;
  securityScore: number;
  serverLatencyMs: number;
  region: string;
  tier?: "Global Node" | "Primary Edge" | "Regional Hub";
}

export const COUNTRY_DATA: Record<string, CountryMetric> = {
  "840": { id: "840", code: "USA", name: "United States", activeUsers: 4820000, dataProcessedTB: 8940, securityScore: 94, serverLatencyMs: 24, region: "Americas", tier: "Global Node" },
  "124": { id: "124", code: "CAN", name: "Canada", activeUsers: 840000, dataProcessedTB: 1420, securityScore: 92, serverLatencyMs: 38, region: "Americas", tier: "Regional Hub" },
  "484": { id: "484", code: "MEX", name: "Mexico", activeUsers: 620000, dataProcessedTB: 890, securityScore: 81, serverLatencyMs: 65, region: "Americas", tier: "Regional Hub" },
  "076": { id: "076", code: "BRA", name: "Brazil", activeUsers: 1450000, dataProcessedTB: 2310, securityScore: 78, serverLatencyMs: 110, region: "Americas", tier: "Global Node" },
  "032": { id: "032", code: "ARG", name: "Argentina", activeUsers: 390000, dataProcessedTB: 540, securityScore: 76, serverLatencyMs: 135, region: "Americas", tier: "Regional Hub" },
  "152": { id: "152", code: "CHL", name: "Chile", activeUsers: 210000, dataProcessedTB: 320, securityScore: 84, serverLatencyMs: 120, region: "Americas", tier: "Regional Hub" },
  "170": { id: "170", code: "COL", name: "Colombia", activeUsers: 310000, dataProcessedTB: 410, securityScore: 75, serverLatencyMs: 95, region: "Americas", tier: "Regional Hub" },
  
  "643": { id: "643", code: "RUS", name: "Russia", activeUsers: 3450000, dataProcessedTB: 6720, securityScore: 89, serverLatencyMs: 28, region: "Europe / Asia", tier: "Global Node" },
  "826": { id: "826", code: "GBR", name: "United Kingdom", activeUsers: 2150000, dataProcessedTB: 4120, securityScore: 96, serverLatencyMs: 18, region: "Europe", tier: "Global Node" },
  "276": { id: "276", code: "DEU", name: "Germany", activeUsers: 2890000, dataProcessedTB: 5640, securityScore: 98, serverLatencyMs: 15, region: "Europe", tier: "Global Node" },
  "250": { id: "250", code: "FRA", name: "France", activeUsers: 1940000, dataProcessedTB: 3820, securityScore: 93, serverLatencyMs: 22, region: "Europe", tier: "Primary Edge" },
  "380": { id: "380", code: "ITA", name: "Italy", activeUsers: 1120000, dataProcessedTB: 1980, securityScore: 88, serverLatencyMs: 35, region: "Europe", tier: "Regional Hub" },
  "724": { id: "724", code: "ESP", name: "Spain", activeUsers: 1340000, dataProcessedTB: 2210, securityScore: 89, serverLatencyMs: 29, region: "Europe", tier: "Regional Hub" },
  "528": { id: "528", code: "NLD", name: "Netherlands", activeUsers: 1100000, dataProcessedTB: 3100, securityScore: 97, serverLatencyMs: 12, region: "Europe", tier: "Global Node" },
  "752": { id: "752", code: "SWE", name: "Sweden", activeUsers: 480000, dataProcessedTB: 990, securityScore: 95, serverLatencyMs: 28, region: "Europe", tier: "Primary Edge" },
  "578": { id: "578", code: "NOR", name: "Norway", activeUsers: 340000, dataProcessedTB: 760, securityScore: 96, serverLatencyMs: 31, region: "Europe", tier: "Primary Edge" },
  "616": { id: "616", code: "POL", name: "Poland", activeUsers: 890000, dataProcessedTB: 1340, securityScore: 86, serverLatencyMs: 42, region: "Europe", tier: "Regional Hub" },
  "756": { id: "756", code: "CHE", name: "Switzerland", activeUsers: 620000, dataProcessedTB: 1580, securityScore: 99, serverLatencyMs: 16, region: "Europe", tier: "Primary Edge" },
  
  "356": { id: "356", code: "IND", name: "India", activeUsers: 5920000, dataProcessedTB: 9240, securityScore: 87, serverLatencyMs: 45, region: "Asia-Pacific", tier: "Global Node" },
  "156": { id: "156", code: "CHN", name: "China", activeUsers: 7420000, dataProcessedTB: 14200, securityScore: 82, serverLatencyMs: 82, region: "Asia-Pacific", tier: "Global Node" },
  "392": { id: "392", code: "JPN", name: "Japan", activeUsers: 3180000, dataProcessedTB: 6100, securityScore: 97, serverLatencyMs: 19, region: "Asia-Pacific", tier: "Global Node" },
  "410": { id: "410", code: "KOR", name: "South Korea", activeUsers: 1840000, dataProcessedTB: 4320, securityScore: 95, serverLatencyMs: 14, region: "Asia-Pacific", tier: "Primary Edge" },
  "702": { id: "702", code: "SGP", name: "Singapore", activeUsers: 950000, dataProcessedTB: 3400, securityScore: 98, serverLatencyMs: 8, region: "Asia-Pacific", tier: "Global Node" },
  "036": { id: "036", code: "AUS", name: "Australia", activeUsers: 1240000, dataProcessedTB: 2450, securityScore: 94, serverLatencyMs: 52, region: "Asia-Pacific", tier: "Global Node" },
  "554": { id: "554", code: "NZL", name: "New Zealand", activeUsers: 280000, dataProcessedTB: 490, securityScore: 93, serverLatencyMs: 68, region: "Asia-Pacific", tier: "Regional Hub" },
  "360": { id: "360", code: "IDN", name: "Indonesia", activeUsers: 1980000, dataProcessedTB: 2150, securityScore: 74, serverLatencyMs: 76, region: "Asia-Pacific", tier: "Regional Hub" },
  "704": { id: "704", code: "VNM", name: "Vietnam", activeUsers: 1150000, dataProcessedTB: 1280, securityScore: 77, serverLatencyMs: 68, region: "Asia-Pacific", tier: "Regional Hub" },
  
  "710": { id: "710", code: "ZAF", name: "South Africa", activeUsers: 670000, dataProcessedTB: 940, securityScore: 79, serverLatencyMs: 140, region: "Africa", tier: "Global Node" },
  "566": { id: "566", code: "NGA", name: "Nigeria", activeUsers: 920000, dataProcessedTB: 810, securityScore: 71, serverLatencyMs: 165, region: "Africa", tier: "Regional Hub" },
  "404": { id: "404", code: "KEN", name: "Kenya", activeUsers: 430000, dataProcessedTB: 490, securityScore: 73, serverLatencyMs: 155, region: "Africa", tier: "Regional Hub" },
  "818": { id: "818", code: "EGY", name: "Egypt", activeUsers: 590000, dataProcessedTB: 730, securityScore: 75, serverLatencyMs: 88, region: "Africa", tier: "Regional Hub" },
  
  "784": { id: "784", code: "ARE", name: "United Arab Emirates", activeUsers: 880000, dataProcessedTB: 2100, securityScore: 91, serverLatencyMs: 32, region: "Middle East", tier: "Primary Edge" },
  "682": { id: "682", code: "SAU", name: "Saudi Arabia", activeUsers: 940000, dataProcessedTB: 1850, securityScore: 85, serverLatencyMs: 48, region: "Middle East", tier: "Regional Hub" },
  "376": { id: "376", code: "ISR", name: "Israel", activeUsers: 610000, dataProcessedTB: 1400, securityScore: 95, serverLatencyMs: 34, region: "Middle East", tier: "Primary Edge" },
  "792": { id: "792", code: "TUR", name: "Turkey", activeUsers: 1180000, dataProcessedTB: 1720, securityScore: 80, serverLatencyMs: 58, region: "Middle East", tier: "Regional Hub" }
};
