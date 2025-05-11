export interface WeeklySurveyDTO {
  preguntas: string[];
  opciones: string[];
  fechaInicio: string;
  fechaFin: string;
}

export interface DailySurveyDTO {
  pregunta: string;
  opciones: string[];
  estado?: 'A' | 'I';
}

export interface WeeklySurvey extends WeeklySurveyDTO {
  id: number;
  estado?: 'A' | 'I';
}

export interface DailySurvey extends DailySurveyDTO {
  id: number;
}

export interface ApiWeeklySurvey {
  id: number;
  preguntas: string[];
  opciones: string[];
  fechaInicio: string;
  fechaFin: string;
  estado: 'A' | 'I';
}

export interface ApiDailySurvey {
  id: number;
  pregunta: string;
  opciones: string[];
  estado: 'A' | 'I';
}

export interface SurveyOption {
  id: number;
  texto: string;
}
