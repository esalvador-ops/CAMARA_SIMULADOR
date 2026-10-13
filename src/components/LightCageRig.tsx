import React, { useState } from 'react';
import { StudioLight, LightMode, LightModifier } from '../types/camera';
import { LIGHTING_PRESETS, LightingSetupPreset } from '../utils/opticalPhysics';
import { cameraAudio } from '../utils/audioSynthesizer';
import {
  Sun,
  Power,
  RotateCw,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Sliders,
  Plus,
  Trash2,
  HelpCircle,
  Copy,
} from 'lucide-react';

interface LightCageRigProps {
  lights: StudioLight[];
  totalLux: number;
  onUpdateLight: (id: string, partial: Partial<StudioLight>) => void;
  onApplyPreset: (presetLights: StudioLight[]) => void;
  onToggleAll: (enabled: boolean) => void;
  onAddLight: (newLight: StudioLight) => void;
  onDeleteLight: (id: string) => void;
  onOpenHelp: (helpId: string) => void;
}

export const LightCageRig: React.FC<LightCageRigProps> = ({
  lights,
  totalLux,
  onUpdateLight,
  onApplyPreset,
  onToggleAll,
  onAddLight,
  onDeleteLight,
  onOpenHelp,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('rembrandt');
  const [selectedLightId, setSelectedLightId] = useState<string>(lights[0]?.id || 'light_key');
  const [showCustomCage, setShowCustomCage] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const activePreset = LIGHTING_PRESETS.find((p) => p.id === selectedPresetId) || LIGHTING_PRESETS[0];
  const activeLight = lights.find((l) => l.id === selectedLightId) || lights[0];

  const categories = ['Todos', 'Clásicos de Retrato', 'Cine & Ficción', 'Belleza & Moda', 'Dramático'];

  const filteredPresets = activeCategory === 'Todos'
    ? LIGHTING_PRESETS
    : LIGHTING_PRESETS.filter((p) => p.category === activeCategory);

  const handleSelectPreset = (preset: LightingSetupPreset) => {
    cameraAudio.playDialClick();
    setSelectedPresetId(preset.id);
    onApplyPreset(preset.lights);
    if (preset.lights.length > 0) {
      setSelectedLightId(preset.lights[0].id);
    }
  };

  const handleCreateNewLight = () => {
    cameraAudio.playDialClick();
    const newId = `light_custom_${Date.now()}`;
    const newAngle = (lights.length * 60) % 360;
    const newLight: StudioLight = {
      id: newId,
      name: `Foco #${lights.length + 1} (${newAngle}°)`,
      enabled: true,
      angleDeg: newAngle,
      elevationDeg: 25,
      intensityPct: 75,
      powerWatts: 600,
      mode: 'cct',
      cctKelvin: 5600,
      rgbColor: '#ffffff',
      modifier: 'softbox',
      distanceM: 2.0,
    };
    onAddLight(newLight);
    setSelectedLightId(newId);
    setShowCustomCage(true);
  };

  const getRadarCoords = (angleDeg: number, radius: number = 75) => {
    const rad = ((angleDeg + 90) * Math.PI) / 180;
    const x = 100 + Math.cos(rad) * radius;
    const y = 100 + Math.sin(rad) * radius;
    return { x, y };
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-100 font-mono shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/40">
            💡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Setups de Iluminación de Cine y Retrato (1-Click)
              </h2>
              <button
                onClick={() => onOpenHelp('lightingPresets')}
                className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
                title="Aprender sobre Setups Canónicos de Iluminación 1 a 1"
              >
                ?
              </button>
            </div>
            <p className="text-[10px] text-zinc-400">
              Esquemas profesionales estándar de escuelas de cine y fotografía + Jaula 360°
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 text-[11px]">
            <span className="text-zinc-500">Luz en Set: </span>
            <strong className="text-amber-400 font-bold">{totalLux.toLocaleString()} Lux</strong>
          </div>

          <button
            onClick={() => onToggleAll(true)}
            className="bg-zinc-800 hover:bg-zinc-700 text-emerald-400 px-2 py-1 rounded text-[11px] font-bold transition cursor-pointer"
            title="Encender todas las luces"
          >
            Todas ON
          </button>
          <button
            onClick={() => onToggleAll(false)}
            className="bg-zinc-800 hover:bg-zinc-700 text-red-400 px-2 py-1 rounded text-[11px] font-bold transition cursor-pointer"
            title="Apagar todas las luces"
          >
            Todas OFF
          </button>

          <button
            onClick={handleCreateNewLight}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
            title="Añadir un nuevo foco a la jaula 360°"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Luz</span>
          </button>

          <button
            onClick={() => setShowCustomCage(!showCustomCage)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              showCustomCage
                ? 'bg-amber-500 text-black border-amber-400'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{showCustomCage ? 'Ocultar Esfera 360°' : 'Ajuste 360° Manual'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider mr-1">Filtrar:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition whitespace-nowrap cursor-pointer border ${
              activeCategory === cat
                ? 'bg-zinc-200 text-black border-white'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 1-CLICK LIGHTING SETUPS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
        {filteredPresets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between cursor-pointer group relative ${
                isSelected
                  ? 'bg-amber-950/30 border-amber-400 text-white shadow-md'
                  : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-zinc-200 group-hover:text-amber-400 transition">
                    {preset.name}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-[10px] text-amber-300/80 font-mono mb-1">
                  {preset.tag}
                </div>
                <div className="text-[10px] text-zinc-500 line-clamp-2 leading-tight">
                  {preset.description}
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-zinc-800/80 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <span>Ratio: <strong className="text-zinc-300">{preset.ratio}</strong></span>
                <span className="bg-zinc-800 px-1 py-0.5 rounded text-[8px] text-zinc-400">1-CLICK</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Setup Educational Card */}
      {activePreset && (
        <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold uppercase text-[11px]">
                Esquema Aplicado: {activePreset.name}
              </span>
              <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
                Ratio: {activePreset.ratio}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">{activePreset.setupRule}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-zinc-500">
              Focos en set: <strong className="text-zinc-200">{lights.filter((l) => l.enabled).length} de {lights.length} ON</strong>
            </span>
          </div>
        </div>
      )}

      {/* ADVANCED 360° MANUAL ORBITAL RADAR */}
      {showCustomCage && (
        <div className="pt-3 border-t border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Esfera 360° Manual: Mover Posición y Parámetros
              </span>
              <button
                onClick={() => onOpenHelp('lightAngle')}
                className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition"
              >
                ?
              </button>
            </div>
            <button
              onClick={handleCreateNewLight}
              className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-emerald-400 px-2 py-1 rounded border border-zinc-700 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Nueva Luz en 360°
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* 360° Radar Circle */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 relative">
              <div className="relative w-48 h-48 flex items-center justify-center select-none">
                <svg width="190" height="190" className="overflow-visible">
                  <circle cx="95" cy="95" r="32" fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="95" cy="95" r="55" fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="95" cy="95" r="80" fill="none" stroke="#3f3f46" strokeWidth="1.5" />

                  <line x1="95" y1="15" x2="95" y2="175" stroke="#27272a" strokeWidth="1" />
                  <line x1="15" y1="95" x2="175" y2="95" stroke="#27272a" strokeWidth="1" />

                  {/* Camera marker at bottom (0°) */}
                  <circle cx="95" cy="180" r="5" fill="#f59e0b" />
                  <text x="95" y="191" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">
                    CÁMARA (0°)
                  </text>

                  {/* Subject at center */}
                  <circle cx="95" cy="95" r="9" fill="#0284c7" />
                  <text x="95" y="98" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">
                    SUJETO
                  </text>

                  {/* Lights */}
                  {lights.map((l) => {
                    const coords = getRadarCoords(l.angleDeg, 80);
                    const isSelected = l.id === selectedLightId;
                    const lightColor = l.mode === 'rgb' ? l.rgbColor : l.cctKelvin <= 3500 ? '#f59e0b' : l.cctKelvin >= 6500 ? '#38bdf8' : '#ffffff';

                    return (
                      <g key={l.id} className="cursor-pointer" onClick={() => setSelectedLightId(l.id)}>
                        {l.enabled && (
                          <line
                            x1={coords.x}
                            y1={coords.y}
                            x2="95"
                            y2="95"
                            stroke={lightColor}
                            strokeWidth={isSelected ? 2.5 : 1.2}
                            strokeOpacity={l.intensityPct / 120}
                            strokeDasharray={l.modifier === 'softbox' ? '4 2' : undefined}
                          />
                        )}

                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r={isSelected ? 9 : 7}
                          fill={l.enabled ? lightColor : '#18181b'}
                          stroke={isSelected ? '#ffffff' : l.enabled ? '#71717a' : '#3f3f46'}
                          strokeWidth={isSelected ? 2.5 : 1.5}
                          className="transition-all hover:scale-125"
                        />
                        <text
                          x={coords.x}
                          y={coords.y - 10}
                          fill={isSelected ? '#fbbf24' : '#a1a1aa'}
                          fontSize="7"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {l.angleDeg}°
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {activeLight && (
                <div className="w-full mt-2 pt-2 border-t border-zinc-800 space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-400 flex items-center gap-1">
                      Ángulo 360° de {activeLight.name.split(' (')[0]}:
                      <button
                        onClick={() => onOpenHelp('lightAngle')}
                        className="text-zinc-500 hover:text-amber-400 font-bold px-1"
                        title="Aprender sobre Ángulo de Iluminación 1 a 1"
                      >
                        ?
                      </button>
                    </span>
                    <strong className="text-amber-400 font-bold">{activeLight.angleDeg}°</strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={5}
                    value={activeLight.angleDeg}
                    onChange={(e) => onUpdateLight(activeLight.id, { angleDeg: parseInt(e.target.value) })}
                    className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Selected Light Detail Tuning */}
            <div className="md:col-span-7 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-3">
              {/* Selector Tabs with Delete Button */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {lights.map((l) => {
                  const isSelected = l.id === selectedLightId;
                  const lightColor = l.mode === 'rgb' ? l.rgbColor : l.cctKelvin <= 3500 ? '#f59e0b' : '#38bdf8';

                  return (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLightId(l.id)}
                      className={`px-2 py-1 rounded text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                        isSelected
                          ? 'bg-zinc-800 text-white border-amber-400 shadow'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: l.enabled ? lightColor : '#52525b' }}
                      />
                      <span>{l.name.split(' (')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {activeLight && (
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between bg-zinc-900/60 p-2 rounded border border-zinc-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          cameraAudio.playDialClick();
                          onUpdateLight(activeLight.id, { enabled: !activeLight.enabled });
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          activeLight.enabled ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{activeLight.enabled ? 'ON' : 'OFF'}</span>
                      </button>
                      <input
                        type="text"
                        value={activeLight.name}
                        onChange={(e) => onUpdateLight(activeLight.id, { name: e.target.value })}
                        className="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-amber-400 font-bold text-zinc-200 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-400">{activeLight.powerWatts}W</span>
                      {lights.length > 1 && (
                        <button
                          onClick={() => {
                            cameraAudio.playDialClick();
                            onDeleteLight(activeLight.id);
                          }}
                          className="text-zinc-500 hover:text-red-400 p-1 transition"
                          title="Eliminar este foco de luz"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Dimmer Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400 flex items-center gap-1">
                        Intensidad / Potencia:
                        <button onClick={() => onOpenHelp('lightIntensity')} className="text-zinc-500 hover:text-amber-400">?</button>
                      </span>
                      <strong className="text-amber-400 font-bold">{activeLight.intensityPct}%</strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={activeLight.intensityPct}
                      onChange={(e) => onUpdateLight(activeLight.id, { intensityPct: parseInt(e.target.value) })}
                      className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Mode + Modifier */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => onUpdateLight(activeLight.id, { mode: 'cct' })}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer border ${
                          activeLight.mode === 'cct'
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        CCT Kelvin
                      </button>
                      <button
                        onClick={() => onUpdateLight(activeLight.id, { mode: 'rgb' })}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer border ${
                          activeLight.mode === 'rgb'
                            ? 'bg-pink-950 text-pink-300 border-pink-500'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        RGB Gel
                      </button>
                      <button onClick={() => onOpenHelp('lightMode')} className="text-zinc-500 hover:text-amber-400 text-xs">?</button>
                    </div>

                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="text-zinc-500">Modificador:</span>
                      <select
                        value={activeLight.modifier}
                        onChange={(e) => onUpdateLight(activeLight.id, { modifier: e.target.value as LightModifier })}
                        className="bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-zinc-200 text-xs cursor-pointer"
                      >
                        <option value="softbox">Softbox (Suave)</option>
                        <option value="direct_spot">Fresnel Spot (Dura)</option>
                        <option value="lantern">Lantern (Difusa)</option>
                      </select>
                      <button onClick={() => onOpenHelp('lightModifier')} className="text-zinc-500 hover:text-amber-400">?</button>
                    </div>
                  </div>

                  {/* Color controls */}
                  {activeLight.mode === 'cct' ? (
                    <div className="space-y-1 bg-zinc-900/40 p-2 rounded border border-zinc-800">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-zinc-400 flex items-center gap-1">
                          Temperatura (CCT):
                          <button onClick={() => onOpenHelp('whiteBalance')} className="text-zinc-500 hover:text-amber-400 font-bold px-1" title="Aprender sobre Temperatura CCT">?</button>
                        </span>
                        <strong className="text-cyan-400 font-bold">{activeLight.cctKelvin}K</strong>
                      </div>
                      <input
                        type="range"
                        min={2200}
                        max={10000}
                        step={100}
                        value={activeLight.cctKelvin}
                        onChange={(e) => onUpdateLight(activeLight.id, { cctKelvin: parseInt(e.target.value) })}
                        className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1.5 bg-zinc-900/40 p-2 rounded border border-zinc-800">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-zinc-400 flex items-center gap-1">
                          Color RGB Gel:
                          <button onClick={() => onOpenHelp('lightMode')} className="text-zinc-500 hover:text-amber-400 font-bold px-1" title="Aprender sobre Luces RGB Gel">?</button>
                        </span>
                        <span className="font-bold uppercase" style={{ color: activeLight.rgbColor }}>
                          {activeLight.rgbColor}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {['#00e5ff', '#38bdf8', '#3b82f6', '#a855f7', '#ec4899', '#f43f5e', '#ef4444', '#f59e0b', '#22c55e'].map((hex) => (
                          <button
                            key={hex}
                            onClick={() => onUpdateLight(activeLight.id, { rgbColor: hex })}
                            className={`w-5 h-5 rounded-full border transition cursor-pointer ${
                              activeLight.rgbColor === hex ? 'border-white scale-110 shadow' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                        <input
                          type="color"
                          value={activeLight.rgbColor}
                          onChange={(e) => onUpdateLight(activeLight.id, { rgbColor: e.target.value })}
                          className="w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
