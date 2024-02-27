export interface LapDetails {
    fileName: string;
    dataSet: DataSet[];
}

export interface DataSet {
    Partiel: number;
    RPM: number;
    "Speed GPS": number;
    T1: number;
    T2: number;
    "Gf. X": number;
    "Gf. Y": number;
    Orientation: number;
    "Speed rear": number;
    "RPM 1 50Hz": number;
    "RPM 2 50Hz": number;
    "RPM 3 50Hz": number;
    "RPM 4 50Hz": number;
    "RPM 5 50Hz": number;
    "Lat.": number;
    "Lon.": number;
    Altitude: number;
}