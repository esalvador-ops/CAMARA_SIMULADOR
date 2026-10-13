import React from 'react';
import { CameraSettings, OpticalMetrics } from '../types/camera';
import {
  STANDARD_APERTURES,
  STANDARD_SHUTTER_SPEEDS,
  STANDARD_SHUTTER_ANGLES,
  STANDARD_ISOS,
  WHITE_BALANCE_PRESETS,
  formatShutterSpeed,
} from '../utils/opticalPhysics';
import { cameraAudio } from '../utils/audioSynthesizer';
import {
  Aperture,
  Sliders,
  Camera,
  Video,
  CircleDot,
  RotateCw,
  Sun,
  Grid,
  Search,
  Volume2,
  Tv,
  HelpCircle,
  Eye,
  BookOpen,
  Smartphone,
  Monitor,
} from 'lucide-react';

interface PhysicalControlsProps {
  settings: CameraSettings;
  opticalMetrics: OpticalMetrics;
  onUpdateSettings: (newSettings: Partial<CameraSettings>) => void;
  onTriggerShutter: () => void;
  onToggleRecording: () => void;
  onOpenHelp: (helpId: string) => void;
  onOpenTheory?: () => void;
}

export const PhysicalControls: React.FC<PhysicalControlsProps> = ({
  settings,
  opticalMetrics,
  onUpdateSettings,
  onTriggerShutter,
  onToggleRecording,
  onOpenHelp,
  onOpenTheory,
}) => {
  const stepAperture = (direction: 1 | -1) => {
    cameraAudio.playDialClick();
    const currentIndex = STANDARD_APERTURES.indexOf(settings.aperture);
    if (currentIndex === -1) {
      onUpdateSettings({ aperture: STANDARD_APERTURES[4] });
      return;
    }
    const nextIndex = Math.max(0, Math.min(STANDARD_APERTURES.length - 1, currentIndex + direction));
    onUpdateSettings({ aperture: STANDARD_APERTURES[nextIndex] });
  };

  const stepISO = (direction: 1 | -1) => {
    cameraAudio.playDialClick();
    const currentIndex = STANDARD_ISOS.indexOf(settings.iso);
    if (currentIndex === -1) {
      onUpdateSettings({ iso: 400 });
      return;
    }
    const nextIndex = Math.max(0, Math.min(STANDARD_ISOS.length - 1, currentIndex + direction));
    onUpdateSettings({ iso: STANDARD_ISOS[nextIndex] });
  };

  const stepShutter = (direction: 1 | -1) => {
    cameraAudio.playDialClick();
    if (settings.shutterMode === 'speed') {
      const currentIndex = STANDARD_SHUTTER_SPEEDS.indexOf(settings.shutterSpeedInv);
      const nextIndex = Math.max(0, Math.min(STANDARD_SHUTTER_SPEEDS.length - 1, (currentIndex === -1 ? 7 : currentIndex) + direction));
      onUpdateSettings({ shutterSpeedInv: STANDARD_SHUTTER_SPEEDS[nextIndex] });
    } else {
      const currentIndex = STANDARD_SHUTTER_ANGLES.indexOf(settings.shutterAngleDeg);
      const nextIndex = Math.max(0, Math.min(STANDARD_SHUTTER_ANGLES.length - 1, (currentIndex === -1 ? 5 : currentIndex) + direction));
      onUpdateSettings({ shutterAngleDeg: STANDARD_SHUTTER_ANGLES[nextIndex] });
    }
  };

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 shadow-2xl space-y-4 font-mono">
      {/* Top Console Hardware Plate Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-zinc-600 border border-zinc-500 shadow-inner" />
          <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">
            Mandos Físicos de Cámara
          </h2>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">(Toca [?] en cada control para aprender cómo y por qué funciona)</span>
        </div>

        {/* Mode Selector: Foto vs Video */}
        <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              onUpdateSettings({ mode: 'photo' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold rounded transition cursor-pointer ${
              settings.mode === 'photo'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            FOTO
          </button>
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              onUpdateSettings({ mode: 'video' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold rounded transition cursor-pointer ${
              settings.mode === 'video'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            CINE / VIDEO
          </button>
        </div>
      </div>

      {/* Main Row of Knurled Metal Dials */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* DIAL 1: APERTURE / IRIS */}
        <div className="bg-zinc-950/70 border border-zinc-800/90 rounded-lg p-2.5 flex flex-col items-center text-center relative group">
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Aperture className="w-3 h-3 text-yellow-400" /> Diafragma
            </span>
            <button
              onClick={() => onOpenHelp('aperture')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre Diafragma / Apertura"
            >
              ?
            </button>
          </div>

          <div className="my-1 flex items-center gap-2">
            <button
              onClick={() => stepAperture(-1)}
              className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded text-sm font-bold text-zinc-200 border border-zinc-700 transition cursor-pointer"
              title="Abrir diafragma (- f-stop)"
            >
              -
            </button>
            <div className="w-20 py-1 bg-zinc-900 border border-zinc-700 rounded font-mono font-bold text-amber-400 text-base shadow-inner">
              f/{settings.aperture}
            </div>
            <button
              onClick={() => stepAperture(1)}
              className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded text-sm font-bold text-zinc-200 border border-zinc-700 transition cursor-pointer"
              title="Cerrar diafragma (+ f-stop)"
            >
              +
            </button>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono mt-1">
            {settings.aperture <= 2.0 ? 'Poca DoF • Mucha luz' : settings.aperture >= 16 ? 'Gran DoF • Difracción' : 'Apertura equilibrada'}
          </span>
        </div>

        {/* DIAL 2: SHUTTER SPEED / ANGLE */}
        <div className="bg-zinc-950/70 border border-zinc-800/90 rounded-lg p-2.5 flex flex-col items-center text-center relative group">
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              {settings.shutterMode === 'angle' ? 'Ángulo Obt.' : 'Velocidad'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  onUpdateSettings({ shutterMode: settings.shutterMode === 'speed' ? 'angle' : 'speed' });
                }}
                className="text-[9px] font-mono bg-zinc-800 hover:bg-zinc-700 text-emerald-400 px-1.5 py-0.5 rounded border border-zinc-700 transition cursor-pointer"
                title="Cambiar entre 1/s y grados de cine"
              >
                {settings.shutterMode === 'speed' ? '1/s' : '°'}
              </button>
              <button
                onClick={() => onOpenHelp('shutter')}
                className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
                title="Aprender sobre Obturación"
              >
                ?
              </button>
            </div>
          </div>

          <div className="my-1 flex items-center gap-2">
            <button
              onClick={() => stepShutter(-1)}
              className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded text-sm font-bold text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              -
            </button>
            <div className="w-20 py-1 bg-zinc-900 border border-zinc-700 rounded font-mono font-bold text-emerald-400 text-base shadow-inner">
              {settings.shutterMode === 'angle'
                ? `${settings.shutterAngleDeg}°`
                : formatShutterSpeed(opticalMetrics.effectiveShutterSpeedS)}
            </div>
            <button
              onClick={() => stepShutter(1)}
              className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded text-sm font-bold text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              +
            </button>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono mt-1">
            {opticalMetrics.effectiveShutterSpeedS <= 0.002
              ? 'Congela movimiento'
              : opticalMetrics.effectiveShutterSpeedS >= 0.04
              ? 'Barrido / Estela'
              : 'Regla 180° Cine'}
          </span>
        </div>

        {/* DIAL 3: ISO / GAIN */}
        <div className="bg-zinc-950/70 border border-zinc-800/90 rounded-lg p-2.5 flex flex-col items-center text-center relative group">
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Sun className="w-3 h-3 text-cyan-400" /> Sensibilidad (ISO)
            </span>
            <button
              onClick={() => onOpenHelp('iso')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre ISO y Ruido"
            >
              ?
            </button>
          </div>

          <div className="my-1 flex items-center gap-2">
            <button
              onClick={() => stepISO(-1)}
              className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded text-sm font-bold text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              -
            </button>
            <div className="w-20 py-1 bg-zinc-900 border border-zinc-700 rounded font-mono font-bold text-cyan-400 text-base shadow-inner">
              {settings.iso}
            </div>
            <button
              onClick={() => stepISO(1)}
              className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded text-sm font-bold text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              +
            </button>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono mt-1">
            {settings.iso <= 200 ? 'Imagen pura • 0 grano' : settings.iso >= 3200 ? 'Ruido de sensor visible' : 'Rango dinámico óptimo'}
          </span>
        </div>

        {/* DIAL 4: FOCAL LENGTH (LENS ZOOM) */}
        <div className="bg-zinc-950/70 border border-zinc-800/90 rounded-lg p-2.5 flex flex-col items-center text-center relative group">
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <Search className="w-3 h-3 text-purple-400" /> Distancia Focal
            </span>
            <button
              onClick={() => onOpenHelp('focalLength')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre Distancia Focal"
            >
              ?
            </button>
          </div>

          <div className="my-1 flex items-center gap-2">
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                onUpdateSettings({ focalLengthMm: Math.max(16, settings.focalLengthMm - 10) });
              }}
              className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded text-sm font-bold text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              -
            </button>
            <div className="w-20 py-1 bg-zinc-900 border border-zinc-700 rounded font-mono font-bold text-purple-400 text-base shadow-inner">
              {settings.focalLengthMm}mm
            </div>
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                onUpdateSettings({ focalLengthMm: Math.min(300, settings.focalLengthMm + 10) });
              }}
              className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded text-sm font-bold text-zinc-200 border border-zinc-700 transition cursor-pointer"
            >
              +
            </button>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono mt-1">
            {settings.focalLengthMm <= 28 ? 'Gran Angular (amplio)' : settings.focalLengthMm >= 85 ? 'Teleobjetivo (bokeh alto)' : 'Normal estándar (50mm)'}
          </span>
        </div>
      </div>

      {/* DIAL 5: MANUAL FOCUS RING */}
      <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-300 font-bold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-red-400" />
            Anillo de Enfoque Manual:
            <button
              onClick={() => onOpenHelp('focusDistance')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre Enfoque y DoF"
            >
              ?
            </button>
          </span>
          <strong className="text-red-400 font-bold font-mono text-sm">{settings.focusDistanceM.toFixed(2)} m</strong>
        </div>
        <input
          type="range"
          min={0.4}
          max={30.0}
          step={0.1}
          value={settings.focusDistanceM}
          onChange={(e) => onUpdateSettings({ focusDistanceM: parseFloat(e.target.value) })}
          className="w-full accent-red-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
        />
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
          <span>Macro (0.4m)</span>
          <span>Primer Plano (0.8m)</span>
          <span>Retrato (2.2m)</span>
          <span>Fondo (9m)</span>
          <span>Infinito (∞)</span>
        </div>
      </div>

      {/* Primary Trigger & Physical Camera Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center pt-2 border-t border-zinc-800/80">
        {/* Shutter / Record Trigger Button */}
        <div className="md:col-span-5 flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
          {settings.mode === 'photo' ? (
            <button
              onClick={onTriggerShutter}
              className="flex-1 bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400 hover:from-white hover:to-zinc-300 active:scale-95 text-zinc-950 font-black py-2.5 px-4 rounded-lg shadow-lg border border-zinc-300 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full border-2 border-zinc-900 bg-red-600 shadow" />
              <span className="tracking-widest text-sm font-mono">DISPARAR FOTO</span>
            </button>
          ) : (
            <button
              onClick={onToggleRecording}
              className={`flex-1 font-black py-2.5 px-4 rounded-lg shadow-lg border transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                settings.isRecording
                  ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 animate-pulse'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-red-500 border-zinc-700'
              }`}
            >
              <CircleDot className={`w-4 h-4 ${settings.isRecording ? 'text-white' : 'text-red-500'}`} />
              <span className="tracking-widest text-sm font-mono">
                {settings.isRecording ? 'DETENER GRABACIÓN' : 'GRABAR (REC)'}
              </span>
            </button>
          )}

          <button
            onClick={() => onOpenHelp('shutterTrigger')}
            className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-xs flex items-center justify-center font-bold transition cursor-pointer"
            title="¿Cómo funciona la captura?"
          >
            ?
          </button>

          <button
            onClick={() => {
              cameraAudio.playFocusLock();
              onUpdateSettings({ focusDistanceM: settings.subjectDistanceM });
            }}
            className="bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs font-mono font-bold text-zinc-200 px-3 py-2.5 rounded border border-zinc-700 transition cursor-pointer"
            title="Ajustar plano de enfoque exactamente sobre el sujeto"
          >
            AF LOCK
          </button>
        </div>

        {/* Monitoring Tools: PEAK, ZEBRA, FALSE COLOR, LUPA, GUIDES */}
        <div className="md:col-span-7 flex flex-wrap items-center justify-end gap-1.5">
          {/* PEAK */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                onUpdateSettings({ showPeaking: !settings.showPeaking });
              }}
              className={`px-2.5 py-1.5 rounded text-[11px] font-mono font-bold border transition cursor-pointer ${
                settings.showPeaking
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_10px_#059669]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
              title="Focus Peaking: Resalta bordes en foco nítido con color verde"
            >
              PEAK
            </button>
            <button onClick={() => onOpenHelp('peaking')} className="text-zinc-500 hover:text-amber-400 text-xs px-1">?</button>
          </div>

          {/* ZEBRA */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                onUpdateSettings({ showZebra: !settings.showZebra });
              }}
              className={`px-2.5 py-1.5 rounded text-[11px] font-mono font-bold border transition cursor-pointer ${
                settings.showZebra
                  ? 'bg-red-600 text-white border-red-400 shadow-[0_0_10px_#dc2626]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
              title="Zebra: Rayas diagonales animadas sobre altas luces"
            >
              ZEBRA ({settings.zebraThresholdPct}%)
            </button>
            <button onClick={() => onOpenHelp('zebra')} className="text-zinc-500 hover:text-amber-400 text-xs px-1">?</button>
          </div>

          {/* FALSE COLOR */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                onUpdateSettings({ showFalseColor: !settings.showFalseColor });
              }}
              className={`px-2.5 py-1.5 rounded text-[11px] font-mono font-bold border transition cursor-pointer ${
                settings.showFalseColor
                  ? 'bg-pink-600 text-white border-pink-400 shadow-[0_0_10px_#db2777]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
              title="Falso Color: Escala cromática de exposición profesional (IRE)"
            >
              FALSO COLOR
            </button>
            <button onClick={() => onOpenHelp('falseColor')} className="text-zinc-500 hover:text-amber-400 text-xs px-1">?</button>
          </div>

          {/* LUPA 1:1 */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                onUpdateSettings({ isZoom1to1: !settings.isZoom1to1 });
              }}
              className={`px-2.5 py-1.5 rounded text-[11px] font-mono font-bold border transition cursor-pointer ${
                settings.isZoom1to1
                  ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_10px_#f59e0b]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
              title="Zoom 1:1 para verificar enfoque fino"
            >
              ZOOM 1:1
            </button>
            <button onClick={() => onOpenHelp('zoom1to1')} className="text-zinc-500 hover:text-amber-400 text-xs px-1">?</button>
          </div>

          {/* ORIENTATION TOGGLE */}
          <div className="flex items-center gap-0.5">
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
              className={`px-2.5 py-1.5 rounded text-[11px] font-mono font-bold border transition flex items-center gap-1 cursor-pointer ${
                settings.orientation === 'portrait'
                  ? 'bg-amber-500 text-black border-amber-400 font-bold'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
              }`}
              title="Cambiar Orientación de Cámara (Horizontal / Vertical)"
            >
              {settings.orientation === 'portrait' ? (
                <>
                  <Smartphone className="w-3 h-3" />
                  <span>VERTICAL</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3 h-3" />
                  <span>HORIZONTAL</span>
                </>
              )}
            </button>
            <button onClick={() => onOpenHelp('aspectRatio')} className="text-zinc-500 hover:text-amber-400 text-xs px-1">?</button>
          </div>

          {/* ASPECT RATIO */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                const ratios: CameraSettings['aspectRatio'][] = ['16:9', '9:16', '4:5', '3:2', '2.39:1', '1:1', '4:3'];
                const curIdx = ratios.indexOf(settings.aspectRatio || '16:9');
                const nextRatio = ratios[(curIdx + 1) % ratios.length];
                const nextOrient = (nextRatio === '9:16' || nextRatio === '4:5' || nextRatio === '2:3') ? 'portrait' : 'landscape';
                onUpdateSettings({
                  aspectRatio: nextRatio,
                  orientation: nextOrient,
                  frameGuide: nextRatio as any,
                });
              }}
              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-800 rounded text-[11px] font-mono font-bold transition flex items-center gap-1 cursor-pointer"
              title="Cambiar Relación de Aspecto (Ratio)"
            >
              <Grid className="w-3 h-3" />
              <span>RATIO: {settings.aspectRatio || '16:9'}</span>
            </button>
            <button onClick={() => onOpenHelp('aspectRatio')} className="text-zinc-500 hover:text-amber-400 text-xs px-1">?</button>
          </div>

          {/* GUIAS */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                const guides: CameraSettings['compositionGuide'][] = ['thirds', 'golden', 'crosshair', 'safe_area', 'clean'];
                const curIdx = guides.indexOf(settings.compositionGuide || 'thirds');
                const nextGuide = guides[(curIdx + 1) % guides.length];
                onUpdateSettings({ compositionGuide: nextGuide });
              }}
              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800 rounded text-[11px] font-mono font-bold transition flex items-center gap-1 cursor-pointer"
              title="Cambiar Guías de Composición (Tercios, Áurea, Centro, Safe Area)"
            >
              <span>GUÍA: {(settings.compositionGuide || 'TERCIOS').toUpperCase()}</span>
            </button>
            <button onClick={() => onOpenHelp('frameGuide')} className="text-zinc-500 hover:text-amber-400 text-xs px-1">?</button>
          </div>
        </div>
      </div>

      {/* White Balance Preset Chips + Dynamic Range */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-[11px] font-mono flex items-center gap-1">
            Balance de Blancos:
            <button onClick={() => onOpenHelp('whiteBalance')} className="text-zinc-500 hover:text-amber-400">?</button>
          </span>
          <div className="flex flex-wrap gap-1">
            {WHITE_BALANCE_PRESETS.map((wb) => (
              <button
                key={wb.kelvin}
                onClick={() => {
                  cameraAudio.playDialClick();
                  onUpdateSettings({ whiteBalanceK: wb.kelvin });
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition cursor-pointer border ${
                  settings.whiteBalanceK === wb.kelvin
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                {wb.icon} {wb.label} ({wb.kelvin}K)
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Range Mode toggle */}
        <div className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-[10px] font-mono">
          <span className="text-zinc-400 flex items-center gap-1">
            Rango Dinámico:
            <button onClick={() => onOpenHelp('dynamicRange')} className="text-zinc-500 hover:text-amber-400">?</button>
          </span>
          <button
            onClick={() => onUpdateSettings({ dynamicRange: 'Film' })}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${settings.dynamicRange === 'Film' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400'}`}
          >
            FILM (LOG)
          </button>
          <button
            onClick={() => onUpdateSettings({ dynamicRange: 'Video' })}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${settings.dynamicRange === 'Video' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400'}`}
          >
            VIDEO (REC.709)
          </button>
        </div>
      </div>
    </div>
  );
};
