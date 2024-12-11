export interface Root {
  kpiData: KPI;
  permites: Permite[];
}

export interface KPI {
  license: LicenseKPI[];
  responsibleStaff: ResponsibleStaffKPI[];
}

export interface LicenseKPI {
  pollutionType: string;
  numberOfLicense: number;
  latestExpirationDate: string;
}

export interface ResponsibleStaffKPI {
  location: string;
  numberOfStaff: number;
}

export interface Permite {
  permitId: string;
  permitType: string;
  validity: string;
  staffRequired: number;
  staffAssigned: number;
  responsibleStaff: {
    staffId: string;
    department: string;
    licenseGrade: string;
    expirationDate: string;
  }[];
}
