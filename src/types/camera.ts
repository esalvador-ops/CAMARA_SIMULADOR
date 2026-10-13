export type SensorFormatId = 'full_frame' | 'super35' | 'mft' | 'one_inch' | 'medium_format';

export interface SensorFormat {
  id: SensorFormatId;
  name: string;
  widthMm: number;
  heightMm: number;
  cropFactor: number;
  cocMm: number; // Circle of confusion in mm (standard d/1500)
  description: string;
}

export type SceneId =
  | 'portrait_golden'
  | 'fashion_commercial'
  | 'documentary_interview'
  | 'night_studio'
  | 'landscape_depth'
  | 'action_sports'
  | 'test_chart';

export interface ScenePreset {
  id: SceneId;
  name: string;
  category: 'Retrato' | 'Acción' | 'Paisaje' | 'Poca Luz' | 'Calibración' | 'Moda' | 'Documental';
  description: string;
  baseAmbientEV: number; // Natural ambient base illumination EV without studio lights
  colorTempK: number; // Ambient light color temperature (Kelvin)
  defaultSubjectDistanceM: number;
  defaultBackgroundDistanceM: number;
  hasMotion: boolean;
  motionSpeed: number; // pixels/second
}

export type LightMode = 'cct' | 'rgb';
export type LightModifier = 'softbox' | 'direct_spot' | 'lantern';

export type ModelPose =
  | 'standing_frontal'
  | 'profile_3_4'
  | 'close_beauty'
  | 'sitting_chair'
  | 'fashion_dynamic'
  | 'mystery_lowkey';

export type ScenePropType =
  | 'model_main'
  | 'actor_secondary'
  | 'vfx_calibration_kit'
  | 'plant_flower'
  | 'tree_pine'
  | 'street_lamp'
  | 'car_vehicle'
  | 'building_cabin'
  | 'bokeh_lights'
  | 'director_chair';

export interface SceneProp {
  id: string;
  name: string;
  type: ScenePropType;
  distanceM: number;
  enabled: boolean;
  xOffsetPct: number; // -40 to +40 (% from center)
  scale: number;
}

export interface StudioLight {
  id: string;
  name: string;
  enabled: boolean;
  angleDeg: number; // 0° to 360° (0° = front-on, 45° = front-right key, 90° = right side, 180° = rim/backlight, 270° = left side, 315° = front-left)
  elevationDeg: number; // -20° to 60° (height relative to subject)
  intensityPct: number; // 0 to 100%
  powerWatts: number; // 100W to 1200W (e.g. Aputure 600c / 300d)
  mode: LightMode;
  cctKelvin: number; // 2200K to 10000K
  rgbColor: string; // Hex color for RGB gel mode
  modifier: LightModifier;
  distanceM: number; // 1m to 6m
}

export type CodecType = 'CinemaDNG RAW' | 'CinemaDNG RAW 3:1' | 'ProRes 444 XQ' | 'ProRes 422 HQ' | 'ProRes 422' | 'ProRes Proxy';
export type ResolutionType = '4000x2160 (4K DCI)' | '3840x2160 (Ultra HD)' | '1920x1080 (1080 HD)';
export type DynamicRangeMode = 'Film' | 'Video'; // Film = Flat Log (12 stops), Video = Rec.709

export type AspectRatioGuide = 'clean' | '16:9' | '9:16' | '4:5' | '3:2' | '2:3' | '2.39:1' | '1.85:1' | '4:3' | '1:1' | 'thirds';

export type AspectRatioType = '16:9' | '9:16' | '4:5' | '3:2' | '2:3' | '1:1' | '2.39:1' | '4:3';
export type CameraOrientation = 'landscape' | 'portrait';
export type CompositionGuide = 'clean' | 'thirds' | 'golden' | 'crosshair' | 'safe_area';

export type FalseColorTier = 'purple' | 'blue' | 'grey' | 'pink' | 'yellow' | 'red';

export interface CameraSettings {
  // Exposure Triangle
  focalLengthMm: number; // Lens focal length (e.g. 16 - 300mm)
  aperture: number; // f-number (e.g. 1.2, 1.4, 2.0, 2.8, 4.0, ...)
  iso: number; // 50 to 25600
  
  // Shutter control (Photography vs Cine)
  shutterMode: 'speed' | 'angle'; // 'speed' in fractions of sec, 'angle' in degrees
  shutterSpeedInv: number; // e.g. 24, 48, 50, 125, 250, 500, 1000, 2000, 4000, 8000 (denominator: 1/x)
  shutterAngleDeg: number; // 11.25, 45, 90, 172.8, 180, 270, 360
  
  // Cine frame rates
  projectFps: number; // 24, 25, 30, 50, 60
  sensorFps: number; // 4 to 120 (for slow/fast motion overcranking/undercranking)

  // Sensor & Optics
  sensorFormatId: SensorFormatId;
  subjectDistanceM: number; // meters from lens front to model (focus plane)
  focusDistanceM: number; // meters where the lens is actually focused
  backgroundDistanceM: number; // meters to background layer
  apertureBlades: number; // 7, 9, 11 (affects bokeh shape)

  // Framing, Aspect Ratio & Orientation (Cine & Photo World)
  aspectRatio: AspectRatioType;
  orientation: CameraOrientation;
  compositionGuide: CompositionGuide;

  // Color & Processing
  whiteBalanceK: number; // 2500K to 10000K
  tint: number; // -50 (green) to +50 (magenta)
  dynamicRange: DynamicRangeMode; // Film log or Video rec709
  
  // Professional Blackmagic Monitoring Tools
  showZebra: boolean;
  zebraThresholdPct: number; // 75%, 80%, 90%, 95%, 100%
  showFalseColor: boolean;
  showPeaking: boolean;
  peakingColor: 'green' | 'red' | 'blue' | 'white';
  peakingSensitivity: number; // 1 to 100%
  frameGuide: AspectRatioGuide;
  guideOpacity: number; // 25, 50, 75, 100%
  showHistogram: boolean;
  showAudioMeters: boolean;
  isZoom1to1: boolean; // 1:1 pixel crop punch-in for checking focus
  
  // Video Recording & Media
  codec: CodecType;
  resolution: ResolutionType;
  dualCardMode: boolean;
  timecode: string;
  isRecording: boolean;
  
  // Camera Rig & Spatial Placement (Translations & Rotations)
  cameraHeightM: number; // Tripod elevation (0.3m to 3.0m, default 1.45m)
  cameraTiltDeg: number; // Pitch up/down (-35° to +35°, default 0°)
  cameraPanDeg: number; // Yaw left/right (-45° to +45°, default 0°)
  cameraRollDeg: number; // Dutch Angle / Roll (-25° to +25°, default 0°)
  cameraTruckM: number; // Lateral track left/right (-2m to +2m, default 0)
  cameraDollyM: number; // Forward/backward dolly track (-1.5m to +2m, default 0)

  // Model Pose Selection
  modelPose: ModelPose;

  // Shooting Mode
  mode: 'photo' | 'video';
}

export interface ShotSnapshot {
  id: string;
  timestamp: string;
  thumbnailUrl: string;
  sceneName: string;
  sceneId: SceneId;
  mode: 'photo' | 'video';
  settings: CameraSettings;
  exposureDeltaEV: number;
  dofTotalM: number;
  hyperfocalM: number;
  lightsCount: number;
  notes?: string;
}

export interface SlateMetadata {
  projectName: string;
  reelNumber: number;
  sceneNumber: string;
  shotNumber: string;
  takeNumber: number;
  autoIncrementTake: boolean;
  shotType: 'WS' | 'MS' | 'MCU' | 'CU' | 'ECU';
  lensModel: string;
  cameraOperator: string;
  director: string;
  comments: string;
  keywords: string;
}

export type CareerRank = 'junior' | 'semi_senior' | 'senior' | 'master';

export interface CareerBrief {
  id: string;
  level: number;
  rank: CareerRank;
  rankTitle: string; // e.g. "🥉 Asistente Jr."
  title: string;
  client: string; // e.g. "Vogue México"
  projectType: string; // e.g. "Editorial de Moda", "Cine Noir"
  payoutUsd: number; // e.g. 450
  targetScene: SceneId;
  objective: string; // Professional assignment
  artisticContext: string; // Narrative artistic brief from the client (no numerical spoilers)
  classLesson?: string; // Reference to foundational classroom / cinematography concept
  bookReference?: string; // Internal curriculum alignment
  deliverySpecs: string[]; // High-level requirements
  didacticHints: string[]; // Pedagogical progressive hints
  solutionGuide: {
    explanation: string; // Theoretical why from the books
    recommendedSettings: Partial<CameraSettings>;
    recommendedLights?: Partial<StudioLight>[];
    summaryText: string;
  };
  validate: (settings: CameraSettings, opticalData: OpticalMetrics, lights: StudioLight[]) => {
    success: boolean;
    clientFeedback: string;
    details: { label: string; pass: boolean; currentVal: string; targetVal: string; hint?: string }[];
  };
}

export interface SchoolMission {
  id: string;
  number: number;
  title: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Cinematografía' | 'Iluminación';
  objective: string;
  explanation: string;
  targetScene: SceneId;
  hints: string[];
  validate: (settings: CameraSettings, opticalData: OpticalMetrics, lights: StudioLight[]) => {
    success: boolean;
    feedback: string;
    details: { label: string; pass: boolean; currentVal: string; targetVal: string }[];
  };
}

export interface OpticalMetrics {
  nearLimitM: number;
  farLimitM: number;
  dofTotalM: number;
  hyperfocalM: number;
  cocMm: number;
  backgroundBlurMm: number;
  backgroundBlurPct: number;
  diffractionAiryMm: number;
  isDiffractionLimiting: boolean;
  exposureDeltaEV: number; // 0 = balanced, negative = underexposed, positive = overexposed
  effectiveShutterSpeedS: number; // e.g. 1/48, 1/1000
  effectiveEV: number;
  targetSceneEV: number;
  playbackSpeedFactor: number; // sensorFps / projectFps (1.0 = realtime, 0.4 = slowmo)
  motionBlurPx: number;
  fovMultiplier: number; // framing magnification based on focal length and crop factor
  totalLightingLux: number; // Lux reaching subject from environment + 360° light cage
}
