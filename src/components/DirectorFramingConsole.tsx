import React from 'react';
import { CameraSettings, ModelPose, SceneProp } from '../types/camera';
import { SENSOR_FORMATS } from '../utils/opticalPhysics';
import { cameraAudio } from '../utils/audioSynthesizer';
import {
  Compass,
  UserCheck,
  RotateCcw,
  Move,
  Smartphone,
  Monitor,
  Grid,
  Crosshair,
  Sliders,
  CheckCircle,
} from 'lucide-react';

interface DirectorFramingConsoleProps {
  settings: CameraSettings;
  onUpdateSettings: (newSettings: Partial<CameraSettings>) => void;
  onOpenHelp: (helpId: string) => void;
  sceneProps?: SceneProp[];
  onToggleProp?: (propId: string) => void;
  onUpdatePropDistance?: (propId: string, distM: number) => void;
}

// Canonical Cinematographic Framing Sizes (Shot Sizes)
const CANONICAL_FRAMINGS = [
  {
    id: 'ws',
    name: 'Plano General',
    code: 'WS',
    focalLengthMm: 24,
    distanceM: 5.2,
    aperture: 4.0,
    desc: 'Cuerpo entero inmerso en la arquitectura / entorno',
    icon: '🌄',
  },
  {
    id: 'fs',
    name: 'Plano Entero',
    code: 'FS',
    focalLengthMm: 35,
    distanceM: 4.2,
    aperture: 4.0,
    desc: 'Sujeto de pies a cabeza llenando el cuadro',
    icon: '🧍',
  },
  {
    id: 'cs',
    name: 'Plano Americano (3/4)',
    code: 'CS',
    focalLengthMm: 50,
    distanceM: 3.2,
    aperture: 2.8,
    desc: 'De cartucheras / muslos a cabeza (clásico western / acción)',
    icon: '🤠',
  },
  {
    id: 'ms',
    name: 'Plano Medio',
    code: 'MS',
    focalLengthMm: 50,
    distanceM: 2.2,
    aperture: 2.8,
    desc: 'De la cintura a la cabeza; plano universal de diálogo',
    icon: '👔',
  },
  {
    id: 'mcu',
    name: 'Plano Medio Corto',
    code: 'MCU',
    focalLengthMm: 85,
    distanceM: 1.8,
    aperture: 2.4,
    desc: 'Del pecho / esternón a la cabeza; empatía facial',
    icon: '👤',
  },
  {
    id: 'cu',
    name: 'Primer Plano',
    code: 'CU',
    focalLengthMm: 85,
    distanceM: 1.15,
    aperture: 2.0,
    desc: 'Rostro completo desde clavícula a frente; intimidad emotiva',
    icon: '🎭',
  },
  {
    id: 'ecu',
    name: 'Primerísimo Primer Plano',
    code: 'ECU',
    focalLengthMm: 105,
    distanceM: 0.75,
    aperture: 1.8,
    desc: 'Ojos, labios o detalle minucioso; tensión psicológica máxima',
    icon: '👁️',
  },
];

export const DirectorFramingConsole: React.FC<DirectorFramingConsoleProps> = ({
  settings,
  onUpdateSettings,
  onOpenHelp,
  sceneProps,
  onToggleProp,
  onUpdatePropDistance,
}) => {
  const applyAnglePreset = (preset: {
    height: number;
    tilt: number;
    pan: number;
    roll: number;
    truck?: number;
    dolly?: number;
  }) => {
    cameraAudio.playDialClick();
    onUpdateSettings({
      cameraHeightM: preset.height,
      cameraTiltDeg: preset.tilt,
      cameraPanDeg: preset.pan,
      cameraRollDeg: preset.roll,
      cameraTruckM: preset.truck ?? 0,
      cameraDollyM: preset.dolly ?? 0,
    });
  };

  const applyFramingPreset = (framing: typeof CANONICAL_FRAMINGS[0]) => {
    cameraAudio.playDialClick();
    onUpdateSettings({
      focalLengthMm: framing.focalLengthMm,
      subjectDistanceM: framing.distanceM,
      focusDistanceM: framing.distanceM,
      aperture: framing.aperture,
    });
    if (onUpdatePropDistance) {
      onUpdatePropDistance('prop_model_main', framing.distanceM);
    }
  };

  const resetCameraRig = () => {
    cameraAudio.playDialClick();
    onUpdateSettings({
      cameraHeightM: 1.45,
      cameraTiltDeg: 0,
      cameraPanDeg: 0,
      cameraRollDeg: 0,
      cameraTruckM: 0,
      cameraDollyM: 0,
    });
  };

  // Real-time Narrative Emotion Assessment
  const getCameraEmotion = () => {
    const h = settings.cameraHeightM;
    const tilt = settings.cameraTiltDeg;
    const roll = Math.abs(settings.cameraRollDeg);

    if (roll >= 8) {
      return {
        label: 'Plano Holandés (Dutch Angle)',
        emotion: 'Tensión psicológica, vértigo, peligro inminente y desequilibrio narrativo.',
        icon: '📐',
        border: 'border-purple-500/50 bg-purple-950/40 text-purple-300',
      };
    }
    if (h >= 2.5 && tilt <= -30) {
      return {
        label: 'Cenital Alto (Overhead)',
        emotion: 'Observación clínica y destino; desapego divino sobre la geometría del set.',
        icon: '🔭',
        border: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300',
      };
    }
    if (h >= 1.9 && tilt < -10) {
      return {
        label: 'Picado (High Angle)',
        emotion: 'Vulnerabilidad, empequeñecimiento, soledad y desprotección del personaje.',
        icon: '🕊️',
        border: 'border-blue-500/50 bg-blue-950/40 text-blue-300',
      };
    }
    if (h <= 0.35 && tilt >= 20) {
      return {
        label: 'Plano Gusano (Worm Eye)',
        emotion: 'Inmersión visceral a ras de suelo; perspectiva colosal y dramática.',
        icon: '🐛',
        border: 'border-red-500/50 bg-red-950/40 text-red-300',
      };
    }
    if (h <= 0.7 && tilt > 10) {
      return {
        label: 'Contrapicado (Low Angle)',
        emotion: 'Poder, autoridad imponente, grandeza y heroísmo del protagonista.',
        icon: '🦅',
        border: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
      };
    }
    return {
      label: 'Nivel de Ojos (Eye Level)',
      emotion: 'Conexión empática directa y neutra; igualdad de condiciones humanas.',
      icon: '👁️',
      border: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300',
    };
  };

  // Real-time Optical Framing Shot Size Calculation
  const getCurrentShotSize = () => {
    const sensor = SENSOR_FORMATS[settings.sensorFormatId] || SENSOR_FORMATS.super35;
    const vFovRad = 2 * Math.atan(sensor.heightMm / (2 * settings.focalLengthMm));
    const frameHeightAtSubject = 2 * settings.subjectDistanceM * Math.tan(vFovRad / 2);

    if (frameHeightAtSubject <= 0.16) {
      return { code: 'ECU', name: 'Primerísimo Primer Plano (Detalle)', icon: '👁️' };
    }
    if (frameHeightAtSubject <= 0.27) {
      return { code: 'CU', name: 'Primer Plano (Close-Up)', icon: '🎭' };
    }
    if (frameHeightAtSubject <= 0.50) {
      return { code: 'MCU', name: 'Plano Medio Corto (Busto)', icon: '👤' };
    }
    if (frameHeightAtSubject <= 0.85) {
      return { code: 'MS', name: 'Plano Medio (Cintura)', icon: '👔' };
    }
    if (frameHeightAtSubject <= 1.40) {
      return { code: 'CS', name: 'Plano Americano (3/4)', icon: '🤠' };
    }
    if (frameHeightAtSubject <= 2.40) {
      return { code: 'FS', name: 'Plano Entero (Figura)', icon: '🧍' };
    }
    return { code: 'WS', name: 'Plano General (Gran Escala)', icon: '🌄' };
  };

  const emotion = getCameraEmotion();
  const currentShot = getCurrentShotSize();

  const vfxProp = sceneProps?.find((p) => p.id === 'prop_vfx_kit');
  const isVfxEnabled = vfxProp ? vfxProp.enabled : false;

  return (
    <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl p-3 shadow-xl font-mono text-zinc-100 space-y-2.5">
      {/* 1. Header & Live Emotion Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
            Dirección & Encuadre Rápido
          </h3>
          <button
            onClick={() => onOpenHelp('cameraRig')}
            className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
            title="¿Cómo influyen los encuadres y ángulos en la narrativa? 1 a 1"
          >
            ?
          </button>
        </div>

        {/* Real-time Narrative Emotion & Active Shot Badge */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Active Shot Badge */}
          <div className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-bold text-amber-300 flex items-center gap-1 shadow-inner">
            <span>{currentShot.icon}</span>
            <span className="text-zinc-400">Encuadre:</span>
            <span className="text-white">{currentShot.code}</span>
            <span className="hidden lg:inline text-zinc-400">({currentShot.name})</span>
          </div>

          {/* Real-time Narrative Emotion Badge */}
          <div className={`px-2.5 py-0.5 rounded-lg border text-[10px] flex items-center gap-1.5 shadow-inner ${emotion.border}`}>
            <span>{emotion.icon}</span>
            <span className="font-bold">{emotion.label}</span>
          </div>

          {/* VFX Kit Toggle Button */}
          {onToggleProp && (
            <button
              onClick={() => onToggleProp('prop_vfx_kit')}
              className={`px-2 py-0.5 rounded border text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                isVfxEnabled
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
              title="Mostrar / Ocultar Kit VFX: Bola Gris 18%, Bola Cromada y Carta Macbeth en el set"
            >
              <span>🎯</span>
              <span>Kit VFX (18% & Croma):</span>
              <span className={isVfxEnabled ? 'text-amber-400' : 'text-zinc-500'}>
                {isVfxEnabled ? 'ON' : 'OFF'}
              </span>
            </button>
          )}

          <button
            onClick={resetCameraRig}
            className="flex items-center gap-1 text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700 transition cursor-pointer"
            title="Restablecer posición normal a nivel de ojos (1.45m)"
          >
            <RotateCcw className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Centrar</span>
          </button>
        </div>
      </div>

      {/* 2. Canonical Shot Framings (1-Click) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] text-zinc-400">
          <span className="font-bold flex items-center gap-1 text-amber-300">
            <Crosshair className="w-3.5 h-3.5 text-amber-400" />
            <span>ENCUADRES CINEMATOGRÁFICOS CANÓNICOS (1 CLIC):</span>
          </span>
          <span className="text-zinc-500 text-[10px]">
            Sujeto: {settings.subjectDistanceM.toFixed(2)}m • Focal: {settings.focalLengthMm}mm
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1 text-xs">
          {CANONICAL_FRAMINGS.map((f) => {
            const isCurrent = currentShot.code === f.code;
            return (
              <button
                key={f.id}
                onClick={() => applyFramingPreset(f)}
                className={`px-2 py-1.5 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
                title={`${f.name} (${f.code}) • ${f.focalLengthMm}mm a ${f.distanceM}m • ${f.desc}`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="truncate">{f.code}</span>
                  <span className="text-xs">{f.icon}</span>
                </div>
                <div className="text-[10px] truncate font-sans text-zinc-300">{f.name}</div>
                <div className="text-[8px] text-zinc-500">{f.focalLengthMm}mm • {f.distanceM}m</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Canonical Angle Presets (1-Click) */}
      <div className="space-y-1 pt-1 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-[10px] text-zinc-400">
          <span className="font-bold flex items-center gap-1 text-cyan-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>ÁNGULOS NARRATIVOS (1 CLIC):</span>
          </span>
          <span className="hidden sm:inline text-zinc-500">
            Trípode: Y={settings.cameraHeightM.toFixed(2)}m • Tilt={settings.cameraTiltDeg}° • Pan={settings.cameraPanDeg}° • Roll={settings.cameraRollDeg}°
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1.5 text-xs">
          {/* Eye Level */}
          <button
            onClick={() => applyAnglePreset({ height: 1.50, tilt: 0, pan: 0, roll: 0 })}
            className={`px-2 py-1.5 rounded border text-left transition flex items-center justify-between cursor-pointer ${
              Math.abs(settings.cameraHeightM - 1.50) < 0.15 && Math.abs(settings.cameraTiltDeg) < 4 && Math.abs(settings.cameraRollDeg) < 2
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            title="Nivel de Ojos (1.50m) • Empatía humana neutra e igualdad de condiciones"
          >
            <span className="font-bold truncate text-[11px]">Ojos (1.50m)</span>
            <span>👁️</span>
          </button>

          {/* Low Angle (Contrapicado) */}
          <button
            onClick={() => applyAnglePreset({ height: 0.55, tilt: 22, pan: 0, roll: 0 })}
            className={`px-2 py-1.5 rounded border text-left transition flex items-center justify-between cursor-pointer ${
              settings.cameraHeightM <= 0.7 && settings.cameraTiltDeg >= 12
                ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            title="Contrapicado (0.55m, +22°) • Poder, heroísmo, autoridad e intimidación"
          >
            <span className="font-bold truncate text-[11px]">Contrapicado</span>
            <span>🦅</span>
          </button>

          {/* High Angle (Picado) */}
          <button
            onClick={() => applyAnglePreset({ height: 2.25, tilt: -20, pan: 0, roll: 0 })}
            className={`px-2 py-1.5 rounded border text-left transition flex items-center justify-between cursor-pointer ${
              settings.cameraHeightM >= 1.95 && settings.cameraTiltDeg <= -11
                ? 'bg-blue-950/80 border-blue-500 text-blue-200 shadow'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            title="Picado (2.25m, -20°) • Vulnerabilidad, soledad, pequeñez y desprotección"
          >
            <span className="font-bold truncate text-[11px]">Picado (2.25m)</span>
            <span>🕊️</span>
          </button>

          {/* Worm's Eye Gusano */}
          <button
            onClick={() => applyAnglePreset({ height: 0.20, tilt: 30, pan: 0, roll: 0 })}
            className={`px-2 py-1.5 rounded border text-left transition flex items-center justify-between cursor-pointer ${
              settings.cameraHeightM <= 0.35 && settings.cameraTiltDeg >= 22
                ? 'bg-red-950/80 border-red-500 text-red-200 shadow'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            title="Plano Gusano (0.20m, +30°) • Ras de suelo monumental y visceral"
          >
            <span className="font-bold truncate text-[11px]">Gusano (0.20m)</span>
            <span>🐛</span>
          </button>

          {/* Overhead Cenital */}
          <button
            onClick={() => applyAnglePreset({ height: 2.85, tilt: -60, pan: 0, roll: 0, dolly: -0.8 })}
            className={`px-2 py-1.5 rounded border text-left transition flex items-center justify-between cursor-pointer ${
              settings.cameraHeightM >= 2.5 && settings.cameraTiltDeg <= -35
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            title="Cenital Alto (2.85m, -60°) • Destino, orden geométrico y mapa analítico"
          >
            <span className="font-bold truncate text-[11px]">Cenital (2.85m)</span>
            <span>🔭</span>
          </button>

          {/* Dutch Angle */}
          <button
            onClick={() => applyAnglePreset({ height: 1.45, tilt: 4, pan: -3, roll: 14 })}
            className={`px-2 py-1.5 rounded border text-left transition flex items-center justify-between cursor-pointer ${
              Math.abs(settings.cameraRollDeg) >= 8
                ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            title="Plano Holandés (+14°) • Tensión psicológica, desequilibrio y peligro"
          >
            <span className="font-bold truncate text-[11px]">Holandés (14°)</span>
            <span>📐</span>
          </button>

          {/* Over-the-Shoulder OTS */}
          <button
            onClick={() => applyAnglePreset({ height: 1.45, tilt: -2, pan: -12, roll: 0, truck: 0.50 })}
            className={`px-2 py-1.5 rounded border text-left transition flex items-center justify-between cursor-pointer ${
              Math.abs(settings.cameraTruckM || 0) >= 0.35 && (settings.cameraPanDeg || 0) <= -8
                ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            title="Sobre el Hombro (OTS) • Profundidad conversacional en plano/contraplano"
          >
            <span className="font-bold truncate text-[11px]">Hombro (OTS)</span>
            <span>🎬</span>
          </button>
        </div>
      </div>

      {/* 4. Formato de Encuadre, Ratio y Orientación */}
      <div className="space-y-1.5 pt-1.5 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-[10px] text-zinc-400">
          <span className="font-bold flex items-center gap-1.5 text-zinc-300">
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            FORMATO DE ENCUADRE, RATIO Y ORIENTACIÓN:
            <button
              onClick={() => onOpenHelp('aspectRatio')}
              className="w-3.5 h-3.5 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[9px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre Aspect Ratios y encuadre 1 a 1"
            >
              ?
            </button>
          </span>

          <button
            onClick={() => {
              cameraAudio.playDialClick();
              const nextOrient = settings.orientation === 'portrait' ? 'landscape' : 'portrait';
              const nextRatio = nextOrient === 'portrait'
                ? (settings.aspectRatio === '16:9' ? '9:16' : settings.aspectRatio === '3:2' ? '2:3' : settings.aspectRatio)
                : (settings.aspectRatio === '9:16' ? '16:9' : settings.aspectRatio === '2:3' ? '3:2' : settings.aspectRatio);
              onUpdateSettings({
                orientation: nextOrient,
                aspectRatio: nextRatio,
              });
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              settings.orientation === 'portrait'
                ? 'bg-amber-500 text-black border-amber-400'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            {settings.orientation === 'portrait' ? (
              <>
                <Smartphone className="w-3 h-3" />
                <span>VERTICAL (9:16)</span>
              </>
            ) : (
              <>
                <Monitor className="w-3 h-3" />
                <span>HORIZONTAL (16:9)</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 text-xs">
          {[
            { id: '16:9', label: '16:9', desc: 'Video/TV' },
            { id: '9:16', label: '9:16', desc: 'Reels/TikTok' },
            { id: '4:5', label: '4:5', desc: 'IG Portrait' },
            { id: '3:2', label: '3:2', desc: '35mm Foto' },
            { id: '2.39:1', label: '2.39:1', desc: 'Scope Cine' },
            { id: '1:1', label: '1:1', desc: 'Cuadrado' },
          ].map((r) => {
            const isSelected = settings.aspectRatio === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  cameraAudio.playDialClick();
                  const nextOrient = (r.id === '9:16' || r.id === '4:5') ? 'portrait' : 'landscape';
                  onUpdateSettings({
                    aspectRatio: r.id as any,
                    orientation: nextOrient,
                    frameGuide: r.id as any,
                  });
                }}
                className={`px-2 py-1 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span className="font-bold text-[10px]">{r.label}</span>
                <span className="text-[8px] text-zinc-500">{r.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Model Poses & Career Set Situations */}
      <div className="space-y-1 pt-1.5 border-t border-zinc-800/80">
        <div className="flex items-center justify-between text-[10px] text-zinc-400">
          <span className="font-bold flex items-center gap-1.5 text-zinc-300">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            POSES DEL MODELO EN SET:
            <button
              onClick={() => onOpenHelp('modelPose')}
              className="w-3.5 h-3.5 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[9px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre dirección de poses 1 a 1"
            >
              ?
            </button>
          </span>

          <div className="hidden sm:flex items-center gap-1 text-[10px] text-zinc-500">
            <Move className="w-3 h-3 text-amber-400" />
            <span>Arrastra sobre la imagen para encuadre libre</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 text-xs">
          {[
            { id: 'standing_frontal' as ModelPose, label: 'Frontal Lookbook', icon: '🧍', genre: 'Catálogo' },
            { id: 'profile_3_4' as ModelPose, label: '3/4 Rembrandt', icon: '🎭', genre: 'Cine Drama' },
            { id: 'close_beauty' as ModelPose, label: 'Primer Plano Beauty', icon: '✨', genre: 'Cosmética' },
            { id: 'sitting_chair' as ModelPose, label: 'Sentado en Set', icon: '🎬', genre: 'Entrevista' },
            { id: 'fashion_dynamic' as ModelPose, label: 'Alta Costura', icon: '💃', genre: 'Editorial' },
            { id: 'mystery_lowkey' as ModelPose, label: 'Cine Noir', icon: '🕵️', genre: 'Suspense' },
          ].map((pose) => (
            <button
              key={pose.id}
              onClick={() => {
                cameraAudio.playDialClick();
                onUpdateSettings({ modelPose: pose.id });
              }}
              className={`px-2 py-1.5 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
                settings.modelPose === pose.id
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className="font-bold flex items-center justify-between text-[11px]">
                <span className="truncate">{pose.label}</span>
                <span className="text-xs">{pose.icon}</span>
              </div>
              <span className="text-[9px] text-zinc-500 truncate">{pose.genre}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
