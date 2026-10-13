import React from 'react';
import { CameraSettings, OpticalMetrics } from '../types/camera';
import { formatShutterSpeed } from '../utils/opticalPhysics';
import { AlertTriangle } from 'lucide-react';

interface MonitorTopBarProps {
  settings: CameraSettings;
  opticalMetrics: OpticalMetrics;
  onOpenMenu: () => void;
  onQuickSettingClick?: (setting: 'iso' | 'wb' | 'shutter' | 'aperture' | 'fps') => void;
  onOpenHelp?: (helpId: string) => void;
  isVfxKitActive?: boolean;
  onToggleVfxKit?: () => void;
}

export const MonitorTopBar: React.FC<MonitorTopBarProps> = ({
  settings,
  opticalMetrics,
  onOpenMenu,
  onQuickSettingClick,
  onOpenHelp,
  isVfxKitActive,
  onToggleVfxKit,
}) => {
  // Format shutter speed or angle
  const shutterDisplay = settings.shutterMode === 'angle'
    ? `${settings.shutterAngleDeg}°`
    : formatShutterSpeed(opticalMetrics.effectiveShutterSpeedS);

  // Exposure EV color
  const evDelta = opticalMetrics.exposureDeltaEV;
  const isClipped = evDelta > 2.5;
  const isCrushed = evDelta < -2.5;

  return (
    <div className="bg-zinc-950/95 border-b border-zinc-800 text-zinc-100 px-3 py-1.5 flex flex-wrap items-center justify-between text-xs select-none font-mono">
      {/* Blackmagic URSA Top Status Strip items */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        {/* ISO */}
        <div className="flex items-center gap-1 bg-zinc-900/60 px-1.5 py-0.5 rounded border border-zinc-800/80">
          <button
            onClick={() => onQuickSettingClick?.('iso')}
            className="flex flex-col items-center hover:bg-zinc-800/80 px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Clic para cambiar Sensibilidad ISO"
          >
            <span className="text-[9px] text-zinc-400 tracking-wider">ISO</span>
            <span className="font-bold text-amber-400 text-xs sm:text-sm">{settings.iso}</span>
          </button>
          {onOpenHelp && (
            <button
              onClick={() => onOpenHelp('iso')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre ISO 1 a 1"
            >
              ?
            </button>
          )}
        </div>

        {/* WB */}
        <div className="flex items-center gap-1 bg-zinc-900/60 px-1.5 py-0.5 rounded border border-zinc-800/80">
          <button
            onClick={() => onQuickSettingClick?.('wb')}
            className="flex flex-col items-center hover:bg-zinc-800/80 px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Clic para cambiar Balance de Blancos (Kelvin)"
          >
            <span className="text-[9px] text-zinc-400 tracking-wider">WB</span>
            <span className="font-bold text-cyan-400 text-xs sm:text-sm">
              {settings.whiteBalanceK}K
              {settings.tint !== 0 && (
                <span className={`text-[10px] ml-1 ${settings.tint > 0 ? 'text-pink-400' : 'text-emerald-400'}`}>
                  {settings.tint > 0 ? `+${settings.tint}` : settings.tint}
                </span>
              )}
            </span>
          </button>
          {onOpenHelp && (
            <button
              onClick={() => onOpenHelp('whiteBalance')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre Balance de Blancos 1 a 1"
            >
              ?
            </button>
          )}
        </div>

        {/* SHUTTER */}
        <div className="flex items-center gap-1 bg-zinc-900/60 px-1.5 py-0.5 rounded border border-zinc-800/80">
          <button
            onClick={() => onQuickSettingClick?.('shutter')}
            className="flex flex-col items-center hover:bg-zinc-800/80 px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Clic para alternar velocidad o ángulo de obturación"
          >
            <span className="text-[9px] text-zinc-400 tracking-wider">
              {settings.shutterMode === 'angle' ? 'ÁNGULO' : 'VELOCIDAD'}
            </span>
            <span className="font-bold text-emerald-400 text-xs sm:text-sm">{shutterDisplay}</span>
          </button>
          {onOpenHelp && (
            <button
              onClick={() => onOpenHelp('shutter')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre Obturación 1 a 1"
            >
              ?
            </button>
          )}
        </div>

        {/* IRIS / APERTURE */}
        <div className="flex items-center gap-1 bg-zinc-900/60 px-1.5 py-0.5 rounded border border-zinc-800/80">
          <button
            onClick={() => onQuickSettingClick?.('aperture')}
            className="flex flex-col items-center hover:bg-zinc-800/80 px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Clic para cambiar Apertura de Diafragma"
          >
            <span className="text-[9px] text-zinc-400 tracking-wider">IRIS</span>
            <span className="font-bold text-yellow-400 text-xs sm:text-sm">f/{settings.aperture}</span>
          </button>
          {onOpenHelp && (
            <button
              onClick={() => onOpenHelp('aperture')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre Apertura / Iris 1 a 1"
            >
              ?
            </button>
          )}
        </div>

        {/* FRAMERATE */}
        <div className="flex items-center gap-1 bg-zinc-900/60 px-1.5 py-0.5 rounded border border-zinc-800/80">
          <button
            onClick={() => onQuickSettingClick?.('fps')}
            className="flex flex-col items-center hover:bg-zinc-800/80 px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Clic para cambiar Frecuencia de Cuadros"
          >
            <span className="text-[9px] text-zinc-400 tracking-wider">
              {settings.mode === 'video' ? 'SENSOR/PROJ' : 'FPS'}
            </span>
            <span className="font-bold text-zinc-200 text-xs sm:text-sm">
              {settings.mode === 'video' && settings.sensorFps !== settings.projectFps
                ? `${settings.sensorFps}fps / ${settings.projectFps}p`
                : `${settings.projectFps}p`}
            </span>
          </button>
          {onOpenHelp && (
            <button
              onClick={() => onOpenHelp('fps')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="Aprender sobre FPS 1 a 1"
            >
              ?
            </button>
          )}
        </div>

        {/* CODEC & RESOLUTION */}
        <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 border-l border-zinc-800">
          <div className="flex flex-col items-start">
            <span className="text-[9px] text-zinc-400">{settings.codec}</span>
            <span className="text-zinc-300 font-semibold text-[11px]">{settings.resolution.split(' ')[0]}</span>
          </div>
          {onOpenHelp && (
            <button
              onClick={() => onOpenHelp('codec')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer ml-1"
              title="Aprender sobre Códecs de Cine 1 a 1"
            >
              ?
            </button>
          )}
        </div>
      </div>

      {/* Right side: EV Meter, Timecode, Recording Status & Battery */}
      <div className="flex items-center gap-3">
        {/* EV Exposure Meter */}
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
          <span className="text-[9px] text-zinc-400">EXPOSICIÓN:</span>
          {onOpenHelp && (
            <button
              onClick={() => onOpenHelp('ev')}
              className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
              title="¿Cómo funciona el valor de exposición EV (Delta)? 1 a 1"
            >
              ?
            </button>
          )}
          <div className="flex items-center gap-1">
            <span
              className={`font-bold text-xs ${
                Math.abs(evDelta) <= 0.3
                  ? 'text-emerald-400'
                  : evDelta > 0
                  ? 'text-red-400'
                  : 'text-blue-400'
              }`}
            >
              {evDelta > 0 ? `+${evDelta.toFixed(1)}` : evDelta.toFixed(1)} EV
            </span>
            {isClipped && (
              <span className="text-[10px] bg-red-600 text-white font-bold px-1 rounded animate-pulse flex items-center gap-0.5">
                <AlertTriangle className="w-2.5 h-2.5" /> CLIP
              </span>
            )}
            {isCrushed && (
              <span className="text-[10px] bg-blue-900 text-blue-200 font-bold px-1 rounded">
                SUBEXP
              </span>
            )}
          </div>
        </div>

        {/* Recording indicator & Timecode */}
        <div className="flex items-center gap-2 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              settings.isRecording ? 'bg-red-600 animate-ping' : 'bg-zinc-600'
            }`}
          />
          <span className="font-bold tracking-widest text-zinc-100 text-xs">
            {settings.timecode}
          </span>
        </div>

        {/* Real Optics & Framing indicators (Aspect Ratio & Focal) */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-mono">
          <span className="text-zinc-500">FORMATO:</span>
          <span className="text-amber-400 font-bold">{settings.aspectRatio || '16:9'}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-500">FOCAL:</span>
          <span className="text-cyan-400 font-bold">{settings.focalLengthMm}mm</span>
        </div>

        {/* VFX Calibration Kit (18% Gray Ball, Chrome Ball & ColorChart) Quick Toggle */}
        {onToggleVfxKit && (
          <button
            onClick={onToggleVfxKit}
            className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
              isVfxKitActive
                ? 'bg-purple-950/80 text-purple-300 border-purple-500 shadow-sm'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800'
            }`}
            title="Activar/Desactivar Kit de Calibración VFX en set (Bola Gris 18%, Bola Espejo y ColorChecker)"
          >
            <span>🎯 BOLA VFX 18% & CHART</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isVfxKitActive ? 'bg-purple-400' : 'bg-zinc-600'}`} />
          </button>
        )}

        {/* Quick Menu Button */}
        <button
          onClick={onOpenMenu}
          className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-700 px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1"
        >
          MENU
        </button>
      </div>
    </div>
  );
};
