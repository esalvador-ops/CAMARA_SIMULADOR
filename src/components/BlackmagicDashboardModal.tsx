import React, { useState } from 'react';
import { CameraSettings, SensorFormatId } from '../types/camera';
import { SENSOR_FORMATS } from '../utils/opticalPhysics';
import { cameraAudio } from '../utils/audioSynthesizer';
import {
  X,
  Camera,
  Film,
  Tv,
  Volume2,
  HardDrive,
  Sliders,
  Check,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface BlackmagicDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CameraSettings;
  onUpdateSettings: (newSettings: Partial<CameraSettings>) => void;
  onOpenSlate: () => void;
}

type TabType = 'dashboard' | 'camera' | 'audio' | 'recording' | 'display' | 'sensor';

export const BlackmagicDashboardModal: React.FC<BlackmagicDashboardModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenSlate,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-zinc-950 border border-zinc-700/80 rounded-xl w-full max-w-4xl h-[560px] flex flex-col shadow-2xl overflow-hidden font-mono">
        {/* Top Header matching URSA Touchscreen */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between text-zinc-100">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            <h2 className="text-sm font-bold tracking-wider uppercase text-zinc-200">
              Blackmagic OS • Dashboard & Menú de Configuración
            </h2>
          </div>
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              onClose();
            }}
            className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body with Side Navigation Tabs */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Navigation Icons sidebar */}
          <div className="w-16 sm:w-44 bg-zinc-900/90 border-r border-zinc-800 flex flex-col py-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-3 py-3 text-xs text-left transition ${
                activeTab === 'dashboard' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('camera')}
              className={`flex items-center gap-3 px-3 py-3 text-xs text-left transition ${
                activeTab === 'camera' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Camera className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Cámara</span>
            </button>

            <button
              onClick={() => setActiveTab('recording')}
              className={`flex items-center gap-3 px-3 py-3 text-xs text-left transition ${
                activeTab === 'recording' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Film className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Grabación</span>
            </button>

            <button
              onClick={() => setActiveTab('display')}
              className={`flex items-center gap-3 px-3 py-3 text-xs text-left transition ${
                activeTab === 'display' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Tv className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Pantalla & Guías</span>
            </button>

            <button
              onClick={() => setActiveTab('sensor')}
              className={`flex items-center gap-3 px-3 py-3 text-xs text-left transition ${
                activeTab === 'sensor' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Sensor Óptico</span>
            </button>

            <button
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-3 px-3 py-3 text-xs text-left transition ${
                activeTab === 'audio' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <Volume2 className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Audio</span>
            </button>

            <div className="mt-auto px-2 pt-2 border-t border-zinc-800/80">
              <button
                onClick={() => {
                  onClose();
                  onOpenSlate();
                }}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] py-2 px-2 rounded font-bold transition flex items-center justify-center gap-1.5"
              >
                🎬 <span className="hidden sm:inline">SLATE (Clap)</span>
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-5 overflow-y-auto text-sm text-zinc-300">
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-wider">
                  Acciones Rápidas del Dashboard
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Peaking Switch (Real image effect) */}
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex flex-col items-center text-center justify-between">
                    <span className="text-2xl mb-1">🎯</span>
                    <span className="font-bold text-zinc-100 text-xs">Focus Peaking Verde</span>
                    <span className="text-[10px] text-zinc-500 mb-3">Realce de bordes en foco</span>
                    <button
                      onClick={() => onUpdateSettings({ showPeaking: !settings.showPeaking })}
                      className={`w-full py-1.5 rounded text-xs font-bold transition cursor-pointer ${
                        settings.showPeaking ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {settings.showPeaking ? 'Activado' : 'Desactivado'}
                    </button>
                  </div>

                  {/* Zebra Switch */}
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex flex-col items-center text-center justify-between">
                    <span className="text-2xl mb-1">🏁</span>
                    <span className="font-bold text-zinc-100 text-xs">Patrón Cebra (Zebra)</span>
                    <span className="text-[10px] text-zinc-500 mb-3">Umbral actual: {settings.zebraThresholdPct}%</span>
                    <button
                      onClick={() => onUpdateSettings({ showZebra: !settings.showZebra })}
                      className={`w-full py-1.5 rounded text-xs font-bold transition cursor-pointer ${
                        settings.showZebra ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {settings.showZebra ? 'Activada' : 'Desactivada'}
                    </button>
                  </div>

                  {/* False Color */}
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex flex-col items-center text-center justify-between">
                    <span className="text-2xl mb-1">🎨</span>
                    <span className="font-bold text-zinc-100 text-xs">Falso Color (IRE)</span>
                    <span className="text-[10px] text-zinc-500 mb-3">6 colores de exposición</span>
                    <button
                      onClick={() => onUpdateSettings({ showFalseColor: !settings.showFalseColor })}
                      className={`w-full py-1.5 rounded text-xs font-bold transition cursor-pointer ${
                        settings.showFalseColor ? 'bg-pink-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {settings.showFalseColor ? 'Activado' : 'Desactivado'}
                    </button>
                  </div>
                </div>

                {/* Status summary */}
                <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-lg space-y-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Estado General de Producción:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>Códec: <strong className="text-zinc-100">{settings.codec}</strong></div>
                    <div>Resolución: <strong className="text-zinc-100">{settings.resolution.split(' ')[0]}</strong></div>
                    <div>Rango Dinámico: <strong className="text-amber-400">{settings.dynamicRange}</strong></div>
                    <div>FPS Proyecto: <strong className="text-zinc-100">{settings.projectFps} fps</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CAMERA */}
            {activeTab === 'camera' && (
              <div className="space-y-4">
                <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Ajustes de Cámara</h3>

                <div className="space-y-3 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs">Balance de Blancos (Kelvin):</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={2500}
                        max={10000}
                        step={100}
                        value={settings.whiteBalanceK}
                        onChange={(e) => onUpdateSettings({ whiteBalanceK: parseInt(e.target.value) })}
                        className="w-36 accent-cyan-500 cursor-pointer"
                      />
                      <span className="font-bold text-cyan-400 w-16 text-right">{settings.whiteBalanceK}K</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs">Tinte Verde / Magenta:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        step={1}
                        value={settings.tint}
                        onChange={(e) => onUpdateSettings({ tint: parseInt(e.target.value) })}
                        className="w-36 accent-pink-500 cursor-pointer"
                      />
                      <span className="font-bold text-pink-400 w-16 text-right">
                        {settings.tint > 0 ? `+${settings.tint}` : settings.tint}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs">Modo de Obturación:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdateSettings({ shutterMode: 'speed' })}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          settings.shutterMode === 'speed' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        Velocidad (1/s)
                      </button>
                      <button
                        onClick={() => onUpdateSettings({ shutterMode: 'angle' })}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          settings.shutterMode === 'angle' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        Ángulo de Obturación (°)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: RECORDING */}
            {activeTab === 'recording' && (
              <div className="space-y-4">
                <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Ajustes de Grabación</h3>

                <div className="space-y-3 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs">Códec de Grabación:</label>
                    <select
                      value={settings.codec}
                      onChange={(e) => onUpdateSettings({ codec: e.target.value as CameraSettings['codec'] })}
                      className="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded text-xs text-zinc-100"
                    >
                      <option value="CinemaDNG RAW">CinemaDNG RAW (Sin pérdida)</option>
                      <option value="CinemaDNG RAW 3:1">CinemaDNG RAW 3:1</option>
                      <option value="ProRes 444 XQ">Apple ProRes 444 XQ</option>
                      <option value="ProRes 422 HQ">Apple ProRes 422 HQ</option>
                      <option value="ProRes 422">Apple ProRes 422</option>
                      <option value="ProRes Proxy">Apple ProRes Proxy</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs">Resolución del Sensor:</label>
                    <select
                      value={settings.resolution}
                      onChange={(e) => onUpdateSettings({ resolution: e.target.value as CameraSettings['resolution'] })}
                      className="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded text-xs text-zinc-100"
                    >
                      <option value="4000x2160 (4K DCI)">4000 x 2160 (4K DCI)</option>
                      <option value="3840x2160 (Ultra HD)">3840 x 2160 (Ultra HD 16:9)</option>
                      <option value="1920x1080 (1080 HD)">1920 x 1080 (1080 HD)</option>
                    </select>
                  </div>

                  {/* Overcranking / Sensor FPS */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <label className="text-xs">
                      Frecuencia del Sensor (Overcranking):
                      <span className="block text-[10px] text-zinc-500">Para cámara lenta (Slow Motion)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={12}
                        max={120}
                        step={2}
                        value={settings.sensorFps}
                        onChange={(e) => onUpdateSettings({ sensorFps: parseInt(e.target.value) })}
                        className="w-28 accent-amber-500 cursor-pointer"
                      />
                      <span className="font-bold text-amber-400 w-14 text-right">{settings.sensorFps} fps</span>
                      <button
                        onClick={() => onUpdateSettings({ sensorFps: settings.projectFps })}
                        className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400 hover:text-white"
                        title="Hacer coincidir con FPS del proyecto (velocidad normal)"
                      >
                        Match
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs">Grabación en Doble Ranura (Dual Card Mode):</label>
                    <button
                      onClick={() => onUpdateSettings({ dualCardMode: !settings.dualCardMode })}
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        settings.dualCardMode ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {settings.dualCardMode ? 'ON (Alta tasa de datos)' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DISPLAY */}
            {activeTab === 'display' && (
              <div className="space-y-4">
                <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Ajustes de Pantalla & Herramientas</h3>

                <div className="space-y-3 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs">Umbral de Cebra (Zebra Level):</label>
                    <div className="flex gap-1.5">
                      {[75, 80, 90, 95, 100].map((val) => (
                        <button
                          key={val}
                          onClick={() => onUpdateSettings({ zebraThresholdPct: val })}
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            settings.zebraThresholdPct === val ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {val}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs">Color de Peaking (Enfoque):</label>
                    <div className="flex gap-1.5">
                      {(['green', 'red', 'blue', 'white'] as const).map((col) => (
                        <button
                          key={col}
                          onClick={() => onUpdateSettings({ peakingColor: col })}
                          className={`px-2.5 py-1 rounded text-xs capitalize ${
                            settings.peakingColor === col ? 'bg-zinc-200 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {col === 'green' ? 'Verde' : col === 'red' ? 'Rojo' : col === 'blue' ? 'Azul' : 'Blanco'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs">Opacidad de Guías de Encuadre:</label>
                    <div className="flex gap-1.5">
                      {[25, 50, 75, 100].map((op) => (
                        <button
                          key={op}
                          onClick={() => onUpdateSettings({ guideOpacity: op })}
                          className={`px-2 py-1 rounded text-xs ${
                            settings.guideOpacity === op ? 'bg-cyan-600 text-white font-bold' : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {op}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SENSOR OPTICS */}
            {activeTab === 'sensor' && (
              <div className="space-y-4">
                <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Tamaño de Sensor & Óptica</h3>

                <div className="space-y-2">
                  {Object.values(SENSOR_FORMATS).map((fmt) => (
                    <div
                      key={fmt.id}
                      onClick={() => onUpdateSettings({ sensorFormatId: fmt.id })}
                      className={`p-3 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                        settings.sensorFormatId === fmt.id
                          ? 'bg-amber-950/40 border-amber-500 text-zinc-100'
                          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm text-zinc-200">{fmt.name}</div>
                        <div className="text-xs text-zinc-500">{fmt.description}</div>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <span className="text-amber-400 font-bold">Crop: {fmt.cropFactor.toFixed(2)}x</span>
                        <div className="text-zinc-500">CoC: {fmt.cocMm}mm</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: AUDIO */}
            {activeTab === 'audio' && (
              <div className="space-y-4">
                <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Ajustes de Audio (URSA Station)</h3>

                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Entrada de Audio:</span>
                    <span className="text-xs font-bold text-emerald-400">XLR 1 & 2 (Balanceado)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Nivel de Entrada:</span>
                    <span className="text-xs font-bold text-zinc-200">Mic Low (+48V Phantom ON)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Medidores de Audio en Pantalla:</span>
                    <button
                      onClick={() => onUpdateSettings({ showAudioMeters: !settings.showAudioMeters })}
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        settings.showAudioMeters ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {settings.showAudioMeters ? 'VU & PPM VISIBLE' : 'OCULTO'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between text-xs text-zinc-400">
          <span>Firmware: CineSim v2.4 • Blackmagic Color Science Gen 5</span>
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-1.5 rounded font-bold transition"
          >
            Aceptar y Volver
          </button>
        </div>
      </div>
    </div>
  );
};
