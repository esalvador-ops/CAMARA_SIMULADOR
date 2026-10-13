import React from 'react';
import { CareerSimulator, CAREER_BRIEFS } from './CareerSimulator';
import { CameraSettings, OpticalMetrics, SceneId, StudioLight } from '../types/camera';

export interface SchoolChallengesProps {
  settings: CameraSettings;
  opticalMetrics: OpticalMetrics;
  lights: StudioLight[];
  onSelectScene: (sceneId: SceneId) => void;
  onApplyPresetSettings: (newSettings: Partial<CameraSettings>) => void;
  onUpdateLights?: (lights: StudioLight[]) => void;
  onUpdatePropDistance?: (propId: string, distM: number) => void;
}

export { CareerSimulator, CAREER_BRIEFS };

export const SchoolChallenges: React.FC<SchoolChallengesProps> = (props) => {
  return <CareerSimulator {...props} />;
};
