
import { dailySurveyService } from './dailySurveyService';
import { weeklySurveyService } from './weeklySurveyService';

export const surveyService = {
  ...dailySurveyService,
  ...weeklySurveyService,
};
