import { CameraSettings, OpticalMetrics, ScenePreset, SensorFormat, SensorFormatId, SceneId, StudioLight, SceneProp } from '../types/camera';

export const SENSOR_FORMATS: Record<SensorFormatId, SensorFormat> = {
  full_frame: {
    id: 'full_frame',
    name: '35mm Full Frame (36x24mm)',
    widthMm: 36,
    heightMm: 24,
    cropFactor: 1.0,
    cocMm: 0.029,
    description: 'Estándar de referencia en cinematografía de gran formato y fotografía profesional.',
  },
  super35: {
    id: 'super35',
    name: 'Super 35mm / APS-C (23.6x15.7mm)',
    widthMm: 23.6,
    heightMm: 15.7,
    cropFactor: 1.5,
    cocMm: 0.019,
    description: 'El sensor estándar de la industria cinematográfica clásica (Blackmagic URSA Mini Pro, ARRI Alexa).',
  },
  mft: {
    id: 'mft',
    name: 'Micro 4/3 (17.3x13.0mm)',
    widthMm: 17.3,
    heightMm: 13.0,
    cropFactor: 2.0,
    cocMm: 0.015,
    description: 'Popular en cámaras compactas de cine como Blackmagic Pocket Cinema Camera 4K.',
  },
  one_inch: {
    id: 'one_inch',
    name: '1 pulgada (13.2x8.8mm)',
    widthMm: 13.2,
    heightMm: 8.8,
    cropFactor: 2.72,
    cocMm: 0.011,
    description: 'Usado en cámaras de acción y broadcast compactas.',
  },
  medium_format: {
    id: 'medium_format',
    name: 'Formato Medio (43.8x32.9mm)',
    widthMm: 43.8,
    heightMm: 32.9,
    cropFactor: 0.79,
    cocMm: 0.038,
    description: 'Sensores de formato gigante para fotografía publicitaria y moda con bokeh extremo.',
  },
};

export const STANDARD_APERTURES = [
  1.2, 1.4, 1.8, 2.0, 2.8, 4.0, 5.6, 8.0, 11.0, 16.0, 22.0, 32.0, 45.0, 64.0
];

export const STANDARD_SHUTTER_SPEEDS = [
  8000, 4000, 2000, 1000, 500, 250, 125, 100, 96, 60, 50, 48, 30, 25, 24, 15, 8, 4, 2, 1
];

export const STANDARD_SHUTTER_ANGLES = [
  11.25, 22.5, 45.0, 90.0, 144.0, 172.8, 180.0, 270.0, 360.0
];

export const STANDARD_ISOS = [
  50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600
];

export const WHITE_BALANCE_PRESETS = [
  { label: 'Tungsteno (Bombilla)', kelvin: 3200, icon: '💡' },
  { label: 'Fluorescente', kelvin: 4000, icon: '⚡' },
  { label: 'Luz Día (Soleado)', kelvin: 5600, icon: '☀️' },
  { label: 'Nublado', kelvin: 6500, icon: '☁️' },
  { label: 'Sombra', kelvin: 7500, icon: '⛱️' },
];

export const SCENE_PRESETS: Record<SceneId, ScenePreset> = {
  portrait_golden: {
    id: 'portrait_golden',
    name: 'Retrato al Atardecer (Exterior)',
    category: 'Retrato',
    description: 'Modelo en exterior con luces de la ciudad de fondo al atardecer (Golden Hour). Ideal para practicar bokeh y tonos de piel.',
    baseAmbientEV: 6.2,
    colorTempK: 5600,
    defaultSubjectDistanceM: 2.2,
    defaultBackgroundDistanceM: 15.0,
    hasMotion: false,
    motionSpeed: 0,
  },
  fashion_commercial: {
    id: 'fashion_commercial',
    name: 'Estudio de Moda & Beauty Comercial',
    category: 'Moda',
    description: 'Ciclorama blanco puro, reflectores difusores de belleza y luz envolvente. Ideal para probar diafragmas de f/2.8 a f/8 y nitidez de catálogo.',
    baseAmbientEV: 8.5,
    colorTempK: 5600,
    defaultSubjectDistanceM: 2.0,
    defaultBackgroundDistanceM: 5.0,
    hasMotion: false,
    motionSpeed: 0,
  },
  documentary_interview: {
    id: 'documentary_interview',
    name: 'Set de Entrevista & Documental',
    category: 'Documental',
    description: 'Silla de director, lámpara práctica y fondo cálido con bokeh. Perfecto para practicar el esquema clásico de 3 puntos (Key, Fill, Rim).',
    baseAmbientEV: 5.5,
    colorTempK: 3200,
    defaultSubjectDistanceM: 2.4,
    defaultBackgroundDistanceM: 8.0,
    hasMotion: false,
    motionSpeed: 0,
  },
  action_sports: {
    id: 'action_sports',
    name: 'Atleta en Carrera / Vehículo (Acción)',
    category: 'Acción',
    description: 'Corredor y rueda giratoria a gran velocidad a plena luz de día. Ideal para experimentar con obturación rápida vs barrido de movimiento.',
    baseAmbientEV: 12.0,
    colorTempK: 5600,
    defaultSubjectDistanceM: 4.5,
    defaultBackgroundDistanceM: 25.0,
    hasMotion: true,
    motionSpeed: 420, // px/s
  },
  landscape_depth: {
    id: 'landscape_depth',
    name: 'Paisaje Natural con Profundidad',
    category: 'Paisaje',
    description: 'Primer plano con flores/rocas, camino medio con cabaña y montañas nevadas al fondo. Ideal para distancia hiperfocal.',
    baseAmbientEV: 11.5,
    colorTempK: 5800,
    defaultSubjectDistanceM: 6.0,
    defaultBackgroundDistanceM: 100.0,
    hasMotion: false,
    motionSpeed: 0,
  },
  night_studio: {
    id: 'night_studio',
    name: 'Estudio Nocturno con Poca Luz',
    category: 'Poca Luz',
    description: 'Iluminación tenue en set de rodaje. El lugar perfecto para encender focos y probar esquemas de luz desde cero.',
    baseAmbientEV: 2.5,
    colorTempK: 3200,
    defaultSubjectDistanceM: 1.8,
    defaultBackgroundDistanceM: 6.0,
    hasMotion: false,
    motionSpeed: 0,
  },
  test_chart: {
    id: 'test_chart',
    name: 'Carta de Enfoque y Calibración Óptica',
    category: 'Calibración',
    description: 'Mire de Siemens, escalas de resolución, cartas de color Macbeth y texturas de contraste fino para comprobar Peaking y Difracción.',
    baseAmbientEV: 7.5,
    colorTempK: 5000,
    defaultSubjectDistanceM: 1.5,
    defaultBackgroundDistanceM: 2.5,
    hasMotion: false,
    motionSpeed: 0,
  },
};

export const DEFAULT_SCENE_PROPS: SceneProp[] = [
  {
    id: 'prop_flower_fg',
    name: 'Flores (Primer Plano)',
    type: 'plant_flower',
    distanceM: 0.9,
    enabled: true,
    xOffsetPct: -32,
    scale: 1.0,
  },
  {
    id: 'prop_model_main',
    name: 'Sujeto Principal (Lobo Mascota)',
    type: 'model_main',
    distanceM: 2.2,
    enabled: true,
    xOffsetPct: 0,
    scale: 1.0,
  },
  {
    id: 'prop_vfx_kit',
    name: 'Kit VFX: Bola Gris 18%, Bola Cromada y ColorChart',
    type: 'vfx_calibration_kit',
    distanceM: 2.2,
    enabled: true,
    xOffsetPct: 20,
    scale: 1.0,
  },
  {
    id: 'prop_actor_sec',
    name: 'Personaje Secundario (2º Plano)',
    type: 'actor_secondary',
    distanceM: 4.8,
    enabled: true,
    xOffsetPct: 30,
    scale: 0.9,
  },
  {
    id: 'prop_tree_mid',
    name: 'Árbol / Vegetación',
    type: 'tree_pine',
    distanceM: 9.0,
    enabled: true,
    xOffsetPct: -25,
    scale: 1.1,
  },
  {
    id: 'prop_lamp_bg',
    name: 'Farola con Luces Bokeh',
    type: 'street_lamp',
    distanceM: 16.0,
    enabled: true,
    xOffsetPct: 35,
    scale: 1.0,
  },
  {
    id: 'prop_cabin_far',
    name: 'Cabaña en el Fondo (28m)',
    type: 'building_cabin',
    distanceM: 28.0,
    enabled: true,
    xOffsetPct: -8,
    scale: 0.8,
  },
];

/**
 * Default initial 360° Studio Lighting Rig
 */
export const DEFAULT_STUDIO_LIGHTS: StudioLight[] = [
  {
    id: 'light_key',
    name: 'Luz Principal (Key Light • Aputure 600c)',
    enabled: true,
    angleDeg: 45, // 45° right
    elevationDeg: 35,
    intensityPct: 40,
    powerWatts: 600,
    mode: 'cct',
    cctKelvin: 5600,
    rgbColor: '#ffffff',
    modifier: 'softbox',
    distanceM: 2.0,
  },
  {
    id: 'light_fill',
    name: 'Luz de Relleno (Fill Light • Aputure 300c)',
    enabled: true,
    angleDeg: 300, // 60° left
    elevationDeg: 15,
    intensityPct: 20,
    powerWatts: 300,
    mode: 'cct',
    cctKelvin: 5600,
    rgbColor: '#ffffff',
    modifier: 'softbox',
    distanceM: 2.5,
  },
  {
    id: 'light_rim',
    name: 'Luz de Contra / Recorte (Rim Light)',
    enabled: false,
    angleDeg: 165, // Back kicker/hair light
    elevationDeg: 35,
    intensityPct: 35,
    powerWatts: 300,
    mode: 'cct',
    cctKelvin: 5600,
    rgbColor: '#ffffff',
    modifier: 'direct_spot',
    distanceM: 1.8,
  },
  {
    id: 'light_bg',
    name: 'Luz de Fondo (Background Light)',
    enabled: false,
    angleDeg: 180,
    elevationDeg: 10,
    intensityPct: 30,
    powerWatts: 200,
    mode: 'cct',
    cctKelvin: 5600,
    rgbColor: '#ffffff',
    modifier: 'lantern',
    distanceM: 3.0,
  },
];

export interface LightingSetupPreset {
  id: string;
  name: string;
  category: 'Clásicos de Retrato' | 'Cine & Ficción' | 'Belleza & Moda' | 'Dramático';
  tag: string;
  description: string;
  setupRule: string;
  ratio: string;
  lights: StudioLight[];
}

/**
 * 1-Click Real Professional Lighting Setups (Académicos y Reales de la Industria)
 */
export const LIGHTING_PRESETS: LightingSetupPreset[] = [
  {
    id: 'rembrandt',
    name: 'Iluminación Rembrandt',
    category: 'Clásicos de Retrato',
    tag: 'Triángulo en mejilla',
    description: 'El esquema más icónico de la pintura clásica y el cine. Produce volumen tridimensional, carácter y profundidad.',
    setupRule: 'Key a 45° lateral elevada a 35°. Relleno suave opuesto a 300° con ratio 3:1 o 4:1. Recorte sutil de contra.',
    ratio: '4:1',
    lights: [
      { id: 'light_key', name: 'Key Light (45°)', enabled: true, angleDeg: 45, elevationDeg: 35, intensityPct: 85, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.0 },
      { id: 'light_fill', name: 'Fill Light (300°)', enabled: true, angleDeg: 300, elevationDeg: 15, intensityPct: 25, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.8 },
      { id: 'light_rim', name: 'Rim / Hair (165°)', enabled: true, angleDeg: 165, elevationDeg: 35, intensityPct: 50, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 2.0 },
      { id: 'light_bg', name: 'Luz de Fondo', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'loop',
    name: 'Loop Lighting (Bucle)',
    category: 'Clásicos de Retrato',
    tag: 'Sombra pequeña de nariz',
    description: 'El setup más común y favorecedor para casi cualquier tipo de rostro. La sombra de la nariz apunta hacia la comisura de la boca sin cerrarse.',
    setupRule: 'Key a 30°-35° ligeramente por encima de los ojos. Relleno suave en el lado opuesto. Mantiene facciones suaves.',
    ratio: '2:1 a 3:1',
    lights: [
      { id: 'light_key', name: 'Key Light (32°)', enabled: true, angleDeg: 32, elevationDeg: 25, intensityPct: 80, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.0 },
      { id: 'light_fill', name: 'Fill Light (315°)', enabled: true, angleDeg: 315, elevationDeg: 15, intensityPct: 40, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.4 },
      { id: 'light_rim', name: 'Rim Light (170°)', enabled: true, angleDeg: 170, elevationDeg: 30, intensityPct: 45, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 2.0 },
      { id: 'light_bg', name: 'Fondo', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'butterfly',
    name: 'Butterfly / Paramount Lighting',
    category: 'Belleza & Moda',
    tag: 'Sombra mariposa centrada',
    description: 'Nacido en la era dorada de los estudios Paramount para iluminar a las estrellas de cine. Crea una diminuta sombra de mariposa bajo la nariz y resalta pómulos.',
    setupRule: 'Luz principal directamente en el eje de cámara (0°) pero elevada a 45°-50° cenital. Sombra vertical simétrica.',
    ratio: '2:1',
    lights: [
      { id: 'light_key', name: 'Top Key (0° Cenital)', enabled: true, angleDeg: 0, elevationDeg: 48, intensityPct: 90, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 1.8 },
      { id: 'light_fill', name: 'Fill Frontal (0°)', enabled: true, angleDeg: 0, elevationDeg: -10, intensityPct: 35, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.2 },
      { id: 'light_rim', name: 'Hair Light (180°)', enabled: true, angleDeg: 180, elevationDeg: 45, intensityPct: 55, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.6 },
      { id: 'light_bg', name: 'Luz de Fondo', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'three_point',
    name: 'Esquema de Tres Puntos Clásico',
    category: 'Cine & Ficción',
    tag: 'Estándar Académico Universal',
    description: 'La base canónica de las escuelas de cine: Luz Principal (Key) + Luz de Relleno (Fill) + Luz de Contra o Recorte (Back/Rim).',
    setupRule: 'Key a 45° al 100%, Fill a 315° al 40%-50% para abrir sombras, Backlight a 180° para separar al sujeto del fondo.',
    ratio: '2:1 a 3:1',
    lights: [
      { id: 'light_key', name: 'Key Light (45°)', enabled: true, angleDeg: 45, elevationDeg: 30, intensityPct: 85, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.0 },
      { id: 'light_fill', name: 'Fill Light (315°)', enabled: true, angleDeg: 315, elevationDeg: 20, intensityPct: 40, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.5 },
      { id: 'light_rim', name: 'Back / Rim (180°)', enabled: true, angleDeg: 180, elevationDeg: 35, intensityPct: 70, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_bg', name: 'Fondo', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'split',
    name: 'Split Lighting (Lateral 90°)',
    category: 'Dramático',
    tag: 'División en dos mitades',
    description: 'Corta el rostro exactamente a la mitad: un lado totalmente iluminado y el otro en sombra densa. Máxima tensión y misterio.',
    setupRule: 'Luz principal a 90° exactos perpendicular al sujeto, sin luz de relleno o con relleno mínimo.',
    ratio: '8:1',
    lights: [
      { id: 'light_key', name: 'Hard Key (90°)', enabled: true, angleDeg: 90, elevationDeg: 15, intensityPct: 90, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_fill', name: 'Fill', enabled: false, angleDeg: 270, elevationDeg: 10, intensityPct: 0, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.5 },
      { id: 'light_rim', name: 'Rim', enabled: false, angleDeg: 180, elevationDeg: 30, intensityPct: 0, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_bg', name: 'Fondo', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'short_lighting',
    name: 'Short Lighting (Luz Estrecha / Corta)',
    category: 'Cine & Ficción',
    tag: 'Adelgaza y da volumen',
    description: 'Ilumina el lado de la cara que está más alejado de la cámara. El lado que mira a cámara queda en penumbra. Estiliza el rostro.',
    setupRule: 'Sujeto con rostro en ángulo de 3/4. Key en el lado lejano (60°-70°). Sombra en la mejilla visible.',
    ratio: '4:1',
    lights: [
      { id: 'light_key', name: 'Short Key (65°)', enabled: true, angleDeg: 65, elevationDeg: 30, intensityPct: 85, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.0 },
      { id: 'light_fill', name: 'Fill (310°)', enabled: true, angleDeg: 310, elevationDeg: 15, intensityPct: 20, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.8 },
      { id: 'light_rim', name: 'Kicker (160°)', enabled: true, angleDeg: 160, elevationDeg: 30, intensityPct: 60, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_bg', name: 'Fondo', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'book_light',
    name: 'Book Light (Difusión Cine Suave)',
    category: 'Cine & Ficción',
    tag: 'Doble rebote ultra-suave',
    description: 'Técnica cinematográfica: la luz rebota en un panel blanco (foamcore) y luego atraviesa un difusor grande de seda. La piel luce orgánica y suave sin brillos duros.',
    setupRule: 'Fuente de 1200W a 50° rebotada y difundida con degradado muy tenue. Relleno ambiental envolvente.',
    ratio: '2:1 (Sutil)',
    lights: [
      { id: 'light_key', name: 'Book Light (50° Ultra Soft)', enabled: true, angleDeg: 50, elevationDeg: 25, intensityPct: 95, powerWatts: 1200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 1.6 },
      { id: 'light_fill', name: 'Ambient Fill (300°)', enabled: true, angleDeg: 300, elevationDeg: 20, intensityPct: 45, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 2.4 },
      { id: 'light_rim', name: 'Subtle Rim (165°)', enabled: true, angleDeg: 165, elevationDeg: 35, intensityPct: 35, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.2 },
      { id: 'light_bg', name: 'Fondo Suave', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'clamshell',
    name: 'Clamshell / Beauty Lighting (Concha)',
    category: 'Belleza & Moda',
    tag: 'Doble luz superior e inferior',
    description: 'Luz superior suave (Beauty Dish a 0°/40°) y reflector o luz de relleno inferior rellenando sombras bajo cuello y ojos. Doble catchlight en las pupilas.',
    setupRule: 'Luz superior a 0° elevada + luz inferior a 0° baja. Prácticamente elimina arrugas y textura indeseada.',
    ratio: '1.5:1',
    lights: [
      { id: 'light_key', name: 'Top Beauty Dish (0° Alto)', enabled: true, angleDeg: 0, elevationDeg: 40, intensityPct: 85, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 1.7 },
      { id: 'light_fill', name: 'Bottom Bounce (0° Bajo)', enabled: true, angleDeg: 0, elevationDeg: -20, intensityPct: 55, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 1.5 },
      { id: 'light_rim', name: 'Hair Kicker (180°)', enabled: true, angleDeg: 180, elevationDeg: 45, intensityPct: 60, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_bg', name: 'Fondo Blanco', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'cross_backlight',
    name: 'Cross Backlighting (Doble Contraluz)',
    category: 'Cine & Ficción',
    tag: 'Doble recorte simétrico',
    description: 'Estilo cinematográfico moderno (Fincher, Deakins): dos fuentes traseras opuestas perfilan ambos lados de la silueta en la oscuridad.',
    setupRule: 'Kicker 1 a 140° y Kicker 2 a 220° potentes. El frente queda en penumbra con mínima luz ambiente.',
    ratio: 'Silueta iluminada',
    lights: [
      { id: 'light_key', name: 'Fill Frontal Tenue (0°)', enabled: true, angleDeg: 0, elevationDeg: 15, intensityPct: 20, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.8 },
      { id: 'light_fill', name: 'Kicker Izquierdo (220°)', enabled: true, angleDeg: 220, elevationDeg: 30, intensityPct: 85, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_rim', name: 'Kicker Derecho (140°)', enabled: true, angleDeg: 140, elevationDeg: 30, intensityPct: 85, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_bg', name: 'Fondo', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
  {
    id: 'high_key',
    name: 'High Key Comercial (Publicidad)',
    category: 'Belleza & Moda',
    tag: 'Luz brillante sin sombras',
    description: 'Típico de spots comerciales de TV, cosméticos y catálogo: ambiente luminoso y alegre, sombras casi inexistentes.',
    setupRule: 'Dos grandes softboxes frontales (40° y 320°) a igual potencia, más fondo iluminado.',
    ratio: '1:1',
    lights: [
      { id: 'light_key', name: 'Main Softbox (35°)', enabled: true, angleDeg: 35, elevationDeg: 20, intensityPct: 90, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.0 },
      { id: 'light_fill', name: 'Fill Softbox (325°)', enabled: true, angleDeg: 325, elevationDeg: 20, intensityPct: 80, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.0 },
      { id: 'light_rim', name: 'Hair Light (180°)', enabled: true, angleDeg: 180, elevationDeg: 40, intensityPct: 65, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 2.0 },
      { id: 'light_bg', name: 'Luz de Fondo (Blanco)', enabled: true, angleDeg: 180, elevationDeg: 10, intensityPct: 75, powerWatts: 600, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 2.5 },
    ],
  },
  {
    id: 'low_key',
    name: 'Low Key / Chiaroscuro Dramático',
    category: 'Dramático',
    tag: 'Claroscuro, sombras profundas',
    description: 'Iluminación predominantemente oscura con acentos selectivos. Máximo drama psicológico y misterio.',
    setupRule: 'Una sola luz dura a 75° con modificador fresnel o nido de abeja (grid). Sin relleno.',
    ratio: '12:1 o mayor',
    lights: [
      { id: 'light_key', name: 'Hard Spot (75°)', enabled: true, angleDeg: 75, elevationDeg: 25, intensityPct: 85, powerWatts: 600, mode: 'cct', cctKelvin: 4000, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_fill', name: 'Relleno', enabled: false, angleDeg: 270, elevationDeg: 10, intensityPct: 0, powerWatts: 300, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'softbox', distanceM: 2.5 },
      { id: 'light_rim', name: 'Recorte', enabled: false, angleDeg: 165, elevationDeg: 30, intensityPct: 0, powerWatts: 300, mode: 'cct', cctKelvin: 3200, rgbColor: '#ffffff', modifier: 'direct_spot', distanceM: 1.8 },
      { id: 'light_bg', name: 'Fondo', enabled: false, angleDeg: 180, elevationDeg: 10, intensityPct: 0, powerWatts: 200, mode: 'cct', cctKelvin: 5600, rgbColor: '#ffffff', modifier: 'lantern', distanceM: 3.0 },
    ],
  },
];

/**
 * Calculates optical metrics, Depth of Field, and combined Exposure from Camera + 360° Light Cage
 */
export function calculateOpticalMetrics(
  settings: CameraSettings,
  scene: ScenePreset,
  lights: StudioLight[] = DEFAULT_STUDIO_LIGHTS
): OpticalMetrics {
  const sensor = SENSOR_FORMATS[settings.sensorFormatId] || SENSOR_FORMATS.full_frame;
  const fMm = settings.focalLengthMm;
  const N = settings.aperture;
  const cocMm = sensor.cocMm;
  const sM = settings.focusDistanceM;
  const bgM = settings.backgroundDistanceM;

  // Hyperfocal distance: H = (f^2 / (N * c)) + f (mm to m)
  const H_mm = (fMm * fMm) / (N * cocMm) + fMm;
  const hyperfocalM = Math.max(0.1, H_mm / 1000);

  // Near limit: Dn = (H * s) / (H + (s - f_m))
  const f_m = fMm / 1000;
  const nearLimitM = (hyperfocalM * sM) / (hyperfocalM + (sM - f_m));

  // Far limit: Df = (H * s) / (H - (s - f_m))
  let farLimitM: number;
  if (sM >= hyperfocalM) {
    farLimitM = Infinity;
  } else {
    const denom = hyperfocalM - (sM - f_m);
    farLimitM = denom <= 0.001 ? Infinity : (hyperfocalM * sM) / denom;
  }

  const dofTotalM = farLimitM === Infinity ? Infinity : Math.max(0, farLimitM - nearLimitM);

  // Background blur disk diameter on sensor (in mm)
  let backgroundBlurMm = 0;
  if (sM > f_m && bgM > f_m) {
    const s_mm = sM * 1000;
    const bg_mm = bgM * 1000;
    const apertureDiameter = fMm / N;
    backgroundBlurMm = Math.abs(apertureDiameter * (fMm / (s_mm - fMm)) * (1 - s_mm / bg_mm));
  }
  const backgroundBlurPct = Math.min(100, (backgroundBlurMm / sensor.widthMm) * 100);

  // Diffraction Airy disk diameter
  const lambdaMm = 0.00055; // 550nm green light
  const diffractionAiryMm = 2.44 * lambdaMm * N;
  const isDiffractionLimiting = diffractionAiryMm > cocMm * 1.5 || N >= 16;

  // Effective Shutter Speed in seconds
  let effectiveShutterSpeedS: number;
  if (settings.shutterMode === 'angle') {
    const fps = settings.mode === 'video' ? settings.sensorFps : settings.projectFps;
    effectiveShutterSpeedS = settings.shutterAngleDeg / (360 * fps);
  } else {
    effectiveShutterSpeedS = 1 / settings.shutterSpeedInv;
  }

  // Camera Exposure Value (APEX standard):
  const cameraEV = Math.log2((N * N) / effectiveShutterSpeedS) - Math.log2(settings.iso / 100);

  // Base ambient lux from scene EV: Lux = 2.5 * 2^EV
  const baseAmbientLux = 2.5 * Math.pow(2, scene.baseAmbientEV);
  
  let studioLightsLux = 0;
  lights.forEach((l) => {
    if (l.enabled && l.intensityPct > 0) {
      // Inverse Square Law: Lux = (Lumens / 4*pi) / (d^2)
      const lumens = l.powerWatts * (l.intensityPct / 100) * 80;
      const dist = Math.max(0.5, l.distanceM);
      const fixtureLux = lumens / (4 * Math.PI * dist * dist);
      studioLightsLux += fixtureLux;
    }
  });

  const totalLightingLux = baseAmbientLux + studioLightsLux;
  const targetSceneEV = Math.log2(Math.max(1, totalLightingLux) / 2.5);

  const exposureDeltaEV = targetSceneEV - cameraEV;

  const playbackSpeedFactor = settings.mode === 'video' 
    ? settings.sensorFps / settings.projectFps 
    : 1.0;

  const motionBlurPx = scene.hasMotion 
    ? Math.min(120, scene.motionSpeed * effectiveShutterSpeedS) 
    : 0;

  const fovMultiplier = (settings.focalLengthMm / 50) * sensor.cropFactor;

  return {
    nearLimitM: Number(nearLimitM.toFixed(3)),
    farLimitM: farLimitM === Infinity ? Infinity : Number(farLimitM.toFixed(3)),
    dofTotalM: dofTotalM === Infinity ? Infinity : Number(dofTotalM.toFixed(3)),
    hyperfocalM: Number(hyperfocalM.toFixed(2)),
    cocMm: Number(cocMm.toFixed(4)),
    backgroundBlurMm: Number(backgroundBlurMm.toFixed(3)),
    backgroundBlurPct: Number(backgroundBlurPct.toFixed(1)),
    diffractionAiryMm: Number(diffractionAiryMm.toFixed(4)),
    isDiffractionLimiting,
    exposureDeltaEV: Number(exposureDeltaEV.toFixed(2)),
    effectiveShutterSpeedS,
    effectiveEV: Number(cameraEV.toFixed(2)),
    targetSceneEV: Number(targetSceneEV.toFixed(2)),
    playbackSpeedFactor,
    motionBlurPx: Number(motionBlurPx.toFixed(1)),
    fovMultiplier: Number(fovMultiplier.toFixed(2)),
    totalLightingLux: Math.round(totalLightingLux),
  };
}

export function formatShutterSpeed(speedS: number): string {
  if (speedS >= 1) {
    return `${speedS.toFixed(1).replace('.0', '')}s`;
  }
  const denominator = Math.round(1 / speedS);
  return `1/${denominator}s`;
}

export function getNoiseStrength(iso: number): number {
  if (iso <= 100) return 0.0;
  if (iso <= 200) return 0.03;
  if (iso <= 400) return 0.08;
  if (iso <= 800) return 0.18;
  if (iso <= 1600) return 0.35;
  if (iso <= 3200) return 0.55;
  if (iso <= 6400) return 0.75;
  if (iso <= 12800) return 0.90;
  return 1.0;
}
