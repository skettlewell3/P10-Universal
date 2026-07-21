// src/config/

export const APP_CONFIG = {
    maintenanceMode: true
};


// countryFlags.js

export const COUNTRY_FLAG_MAP = {
  ALG: "dz",
  ARG: "ar",
  AUS: "au",
  AUT: "at",
  BEL: "be",
  BIH: "ba",
  BRA: "br",
  CPV: "cv",
  CAN: "ca",
  COL: "co",
  COD: "cd", // Congo DR (note: FlagCDN uses CD, not CGO)
  CIV: "ci",
  CRO: "hr",
  CUW: "cw",
  CZE: "cz",
  ECU: "ec",
  EGY: "eg",
  ENG: "gb-eng", 
  FRA: "fr",
  GER: "de",
  GHA: "gh",
  HAI: "ht",
  IRN: "ir",
  IRQ: "iq",
  JPN: "jp",
  JOR: "jo",
  KOR: "kr", 
  MEX: "mx",
  MAR: "ma",
  NED: "nl",
  NZL: "nz",
  NOR: "no",
  PAN: "pa",
  PAR: "py",
  POR: "pt",
  QAT: "qa",
  KSA: "sa",
  SCO: "gb-sct",
  SEN: "sn",
  RSA: "za",
  ESP: "es",
  SWE: "se",
  SUI: "ch",
  TUN: "tn",
  TUR: "tr",
  URU: "uy",
  USA: "us",
  UZB: "uz",
};

//  Groups (temporary)

export const TEAM_GROUPS = [
    { teamId: 1, groupLetter: "J" },  // Algeria
    { teamId: 2, groupLetter: "J" },  // Argentina
    { teamId: 3, groupLetter: "D" },  // Australia
    { teamId: 4, groupLetter: "J" },  // Austria
    { teamId: 5, groupLetter: "G" },  // Belgium
    { teamId: 6, groupLetter: "B" },  // Bosnia and Herzegovina
    { teamId: 7, groupLetter: "C" },  // Brazil
    { teamId: 8, groupLetter: "H" },  // Cabo Verde
    { teamId: 9, groupLetter: "B" },  // Canada
    { teamId: 10, groupLetter: "K" }, // Colombia
    { teamId: 11, groupLetter: "K" }, // Congo DR
    { teamId: 12, groupLetter: "E" }, // Côte d'Ivoire
    { teamId: 13, groupLetter: "L" }, // Croatia
    { teamId: 14, groupLetter: "E" }, // Curaçao
    { teamId: 15, groupLetter: "A" }, // Czechia
    { teamId: 16, groupLetter: "E" }, // Ecuador
    { teamId: 17, groupLetter: "G" }, // Egypt
    { teamId: 18, groupLetter: "L" }, // England
    { teamId: 19, groupLetter: "I" }, // France
    { teamId: 20, groupLetter: "E" }, // Germany
    { teamId: 21, groupLetter: "L" }, // Ghana
    { teamId: 22, groupLetter: "C" }, // Haiti
    { teamId: 23, groupLetter: "G" }, // Iran
    { teamId: 24, groupLetter: "I" }, // Iraq
    { teamId: 25, groupLetter: "F" }, // Japan
    { teamId: 26, groupLetter: "J" }, // Jordan
    { teamId: 27, groupLetter: "A" }, // Mexico
    { teamId: 28, groupLetter: "C" }, // Morocco
    { teamId: 29, groupLetter: "F" }, // Netherlands
    { teamId: 30, groupLetter: "G" }, // New Zealand
    { teamId: 31, groupLetter: "I" }, // Norway
    { teamId: 32, groupLetter: "L" }, // Panama
    { teamId: 33, groupLetter: "D" }, // Paraguay
    { teamId: 34, groupLetter: "K" }, // Portugal
    { teamId: 35, groupLetter: "B" }, // Qatar
    { teamId: 36, groupLetter: "H" }, // Saudi Arabia
    { teamId: 37, groupLetter: "C" }, // Scotland
    { teamId: 38, groupLetter: "I" }, // Senegal
    { teamId: 39, groupLetter: "A" }, // South Africa
    { teamId: 40, groupLetter: "A" }, // South Korea
    { teamId: 41, groupLetter: "H" }, // Spain
    { teamId: 42, groupLetter: "F" }, // Sweden
    { teamId: 43, groupLetter: "B" }, // Switzerland
    { teamId: 44, groupLetter: "F" }, // Tunisia
    { teamId: 45, groupLetter: "D" }, // Türkiye
    { teamId: 46, groupLetter: "H" }, // Uruguay
    { teamId: 47, groupLetter: "D" }, // USA
    { teamId: 48, groupLetter: "K" }  // Uzbekistan
];

export const TEAM_GROUPS_MAP = Object.fromEntries(
    TEAM_GROUPS.map(t => [t.teamId, t.groupLetter])
);