export interface CourseDocument {
  id: number;
  name: "Сертификат об окончании";
  downloadUrl: string;
}

export interface ProgramWithDocuments {
  id: number;
  title: string;
  documents: CourseDocument[];
}
