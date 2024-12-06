export interface Root {
  kpiData: KPI[];
  materials: Material[];
}

export interface KPI {
  location: string;
  equipmentType: string;
  numberOfTotalEquipment: number;
  numberOfCheckedEquipment: number;
}

export interface Material {
  materialType: string;
  materialLocation: string;
  materialCategory: string;
  materialItem: string;
  materialSpecification: string;
  unit: string;
  inventory: number;
  inspectionDate: string;
  cleanStatus: boolean;
  maintenanceStatus: boolean;
}
