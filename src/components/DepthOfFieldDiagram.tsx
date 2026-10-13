import React, { useState } from 'react';
import { CameraSettings, OpticalMetrics, SceneProp, ScenePropType } from '../types/camera';
import { SENSOR_FORMATS } from '../utils/opticalPhysics';
import { Eye, ShieldAlert, Layers, Plus, Trash2, Crosshair } from 'lucide-react';
import { cameraAudio } from '../utils/audioSynthesizer';

interface DepthOfFieldDiagramProps {
  settings: CameraSettings;
  opticalMetrics: OpticalMetrics;
  sceneProps: SceneProp[];
  onUpdateFocusDistance: (distM: number) => void;
  onUpdatePropDistance: (id: string, distM: number) => void;
  onToggleProp: (id: string) => void;
  onAddProp: (prop: SceneProp) => void;
  onDeleteProp: (id: string) => void;
  onOpenHelp: (helpId: string) => void;
}

export const DepthOfFieldDiagram: React.FC<DepthOfFieldDiagramProps> = ({
  settings,
  opticalMetrics,
  sceneProps,
  onUpdateFocusDistance,
  onUpdatePropDistance,
  onToggleProp,
  onAddProp,
  onDeleteProp,
  onOpenHelp,
}) => {
  const [selectedPropId, setSelectedPropId] = useState<string>(sceneProps[1]?.id || sceneProps[0]?.id || '');
  const [showAddMenu, setShowAddMenu] = useState<boolean>(false);

  const sensor = SENSOR_FORMATS[settings.sensorFormatId] || SENSOR_FORMATS.full_frame;

  const distanceToPercent = (distM: number): number => {
    if (distM >= 50 || distM === Infinity) return 96;
    if (distM <= 0) return 4;
    const minM = 0.2;
    const maxM = 50.0;
    const norm = Math.log(distM / minM) / Math.log(maxM / minM);
    return Math.max(4, Math.min(94, norm * 90 + 4));
  };

  const cameraPosPct = 3;
  const focusPosPct = distanceToPercent(settings.focusDistanceM);
  const nearPosPct = distanceToPercent(opticalMetrics.nearLimitM);
  const farPosPct = opticalMetrics.farLimitM === Infinity ? 96 : distanceToPercent(opticalMetrics.farLimitM);

  const inFrontM = Math.max(0, settings.focusDistanceM - opticalMetrics.nearLimitM);
  const behindM = opticalMetrics.farLimitM === Infinity ? Infinity : Math.max(0, opticalMetrics.farLimitM - settings.focusDistanceM);
  const totalDofM = opticalMetrics.dofTotalM;

  const inFrontPct = totalDofM === Infinity ? 0 : Math.round((inFrontM / Math.max(0.001, totalDofM)) * 100);
  const behindPct = totalDofM === Infinity ? 100 : Math.round((behindM / Math.max(0.001, totalDofM)) * 100);

  const getPropIcon = (type: ScenePropType) => {
    switch (type) {
      case 'model_main': return '🐺';
      case 'actor_secondary': return '👤';
      case 'vfx_calibration_kit': return '🎯';
      case 'plant_flower': return '🌸';
      case 'tree_pine': return '🌲';
      case 'street_lamp': return '🏮';
      case 'car_vehicle': return '🚗';
      case 'building_cabin': return '🏠';
      default: return '📍';
    }
  };

  const handleAddNewProp = (type: ScenePropType, defaultDist: number, name: string) => {
    cameraAudio.playDialClick();
    const newProp: SceneProp = {
      id: `prop_${Date.now()}`,
      name,
      type,
      distanceM: defaultDist,
      enabled: true,
      xOffsetPct: Math.floor((Math.random() - 0.5) * 50),
      scale: 1.0,
    };
    onAddProp(newProp);
    setSelectedPropId(newProp.id);
    setShowAddMenu(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 text-zinc-100 select-none shadow-md font-mono space-y-3">
      {/* Metrics Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] sm:text-xs">
            Simulador Óptico de Profundidad de Campo (DoF) & Planos Espaciales
          </span>
          <button
            onClick={() => onOpenHelp('focusDistance')}
            className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition"
            title="¿Qué es la Profundidad de Campo?"
          >
            ?
          </button>
          <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 hidden sm:inline">
            {sensor.name} (Crop: {sensor.cropFactor.toFixed(2)}x)
          </span>
        </div>

        {/* Readouts */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">DoF Total: </span>
            <strong className="font-bold text-emerald-400">
              {opticalMetrics.dofTotalM === Infinity ? '∞ (Infinito)' : `${(opticalMetrics.dofTotalM * 100).toFixed(1)} cm (${opticalMetrics.dofTotalM.toFixed(2)}m)`}
            </strong>
            <button
              onClick={() => onOpenHelp('dofLimits')}
              className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
              title="Aprender sobre Límites de DoF 1 a 1"
            >
              ?
            </button>
          </div>

          <div className="hidden sm:block">
            <span className="text-zinc-400">Delante: </span>
            <strong className="font-bold text-blue-400">
              {(inFrontM * 100).toFixed(1)}cm ({inFrontPct}%)
            </strong>
            <span className="text-zinc-400 ml-2">Detrás: </span>
            <strong className="font-bold text-amber-400">
              {behindM === Infinity ? '∞' : `${(behindM * 100).toFixed(1)}cm`} ({behindPct}%)
            </strong>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-zinc-400">Hiperfocal: </span>
            <strong className="font-bold text-purple-400">{opticalMetrics.hyperfocalM.toFixed(2)} m</strong>
            <button
              onClick={() => onOpenHelp('hyperfocal')}
              className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
              title="Aprender sobre Distancia Hiperfocal 1 a 1"
            >
              ?
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Ruler & Spatial Layout */}
      <div className="relative h-32 bg-gradient-to-b from-sky-950/40 via-zinc-950 to-zinc-950 rounded-lg border border-zinc-800 overflow-hidden px-4">
        {/* In-Focus Depth of Field Zone (Green Band) */}
        <div
          className="absolute top-3 bottom-6 bg-emerald-500/25 border-x-2 border-emerald-400 transition-all duration-150 rounded"
          style={{
            left: `${nearPosPct}%`,
            width: `${Math.max(2, farPosPct - nearPosPct)}%`,
          }}
        >
          <div className="absolute top-1 left-1 text-[8px] font-mono text-emerald-300 font-bold bg-emerald-950/80 px-1 rounded">
            ZONA EN ENFOQUE NÍTIDO
          </div>
        </div>

        {/* Camera at 0m */}
        <div
          className="absolute bottom-6 flex flex-col items-center pointer-events-none"
          style={{ left: `${cameraPosPct}%`, transform: 'translateX(-50%)' }}
        >
          <div className="text-xl">🎥</div>
          <span className="text-[8px] font-mono text-zinc-400">Cámara</span>
        </div>

        {/* Focus Plane Line */}
        <div
          className="absolute top-1 bottom-6 w-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] transition-all duration-150 z-20"
          style={{ left: `${focusPosPct}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-mono font-bold px-1 rounded">
            FOCO ({settings.focusDistanceM.toFixed(2)}m)
          </div>
        </div>

        {/* Dynamic Scene Props on Ruler */}
        {sceneProps.map((prop) => {
          if (!prop.enabled) return null;
          const posPct = distanceToPercent(prop.distanceM);
          const isSelected = prop.id === selectedPropId;
          const isInFocus = prop.distanceM >= opticalMetrics.nearLimitM && prop.distanceM <= opticalMetrics.farLimitM;

          return (
            <div
              key={prop.id}
              onClick={() => {
                cameraAudio.playDialClick();
                setSelectedPropId(prop.id);
              }}
              className="absolute bottom-6 flex flex-col items-center cursor-pointer group transition-all duration-150 z-10"
              style={{ left: `${posPct}%`, transform: 'translateX(-50%)' }}
              title={`Clic para seleccionar / enfocar (${prop.name} a ${prop.distanceM}m)`}
            >
              <div
                className={`text-2xl transition-transform group-hover:scale-125 ${
                  isSelected ? 'scale-110 drop-shadow-[0_0_8px_#38bdf8]' : ''
                } ${isInFocus ? 'filter drop-shadow-[0_0_6px_#22c55e]' : 'opacity-75'}`}
              >
                {getPropIcon(prop.type)}
              </div>
              <span
                className={`text-[8px] font-bold px-1 rounded whitespace-nowrap mt-0.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-black'
                    : isInFocus
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-zinc-900/90 text-zinc-400'
                }`}
              >
                {prop.name.split(' (')[0]} ({prop.distanceM}m)
              </span>
            </div>
          );
        })}

        {/* Bottom Distance Metric Tick Marks */}
        <div className="absolute bottom-0 left-0 right-0 h-6 border-t border-zinc-700/80 flex items-center justify-between px-3 text-[9px] font-mono text-zinc-500">
          <span>0m</span>
          <span>0.5m</span>
          <span>1.0m</span>
          <span>2.0m</span>
          <span>3.0m</span>
          <span>5.0m</span>
          <span>8.0m</span>
          <span>12m</span>
          <span>20m</span>
          <span>35m</span>
          <span>∞</span>
        </div>
      </div>

      {/* Main Focus Ring Dial & Props Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
        {/* Anillo de Enfoque de la Lente (Col 4) */}
        <div className="md:col-span-4 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-300 font-bold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-red-400" />
              Anillo de Enfoque Manual:
              <button onClick={() => onOpenHelp('focusDistance')} className="text-zinc-500 hover:text-amber-400">?</button>
            </span>
            <strong className="text-red-400 font-bold">{settings.focusDistanceM.toFixed(2)} m</strong>
          </div>
          <input
            type="range"
            min={0.4}
            max={25.0}
            step={0.1}
            value={settings.focusDistanceM}
            onChange={(e) => onUpdateFocusDistance(parseFloat(e.target.value))}
            className="w-full accent-red-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
          />
          <div className="flex items-center justify-between text-[10px] text-zinc-500">
            <span>Macro (0.4m)</span>
            <span>Retrato (2.2m)</span>
            <span>Infinito (∞)</span>
          </div>
        </div>

        {/* Scene Props Strip & Distance Management (Col 8) */}
        <div className="md:col-span-8 bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              Elementos y Planos de la Escena ({sceneProps.filter((p) => p.enabled).length} en set):
              <button
                onClick={() => onOpenHelp('sceneProps')}
                className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
                title="Aprender sobre Planos y Elementos de Escena 1 a 1"
              >
                ?
              </button>
            </span>

            {/* Add Prop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 px-2.5 py-1 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Elemento</span>
              </button>

              {showAddMenu && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl py-1 z-30 text-xs font-mono">
                  <button
                    onClick={() => handleAddNewProp('plant_flower', 0.8, 'Flores Primer Plano')}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 flex items-center gap-2"
                  >
                    <span>🌸</span> Flor (Primer Plano 0.8m)
                  </button>
                  <button
                    onClick={() => handleAddNewProp('actor_secondary', 4.5, 'Actor 2 (Segundo Plano)')}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 flex items-center gap-2"
                  >
                    <span>👤</span> Actor 2 (Segundo Plano 4.5m)
                  </button>
                  <button
                    onClick={() => handleAddNewProp('tree_pine', 10.0, 'Árbol / Vegetación')}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 flex items-center gap-2"
                  >
                    <span>🌲</span> Árbol (Fondo Medio 10m)
                  </button>
                  <button
                    onClick={() => handleAddNewProp('street_lamp', 18.0, 'Farola Luces Bokeh')}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 flex items-center gap-2"
                  >
                    <span>🏮</span> Farola (Luces Bokeh 18m)
                  </button>
                  <button
                    onClick={() => handleAddNewProp('building_cabin', 30.0, 'Cabaña / Fondo')}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🏠</span> Cabaña (Fondo 30m)
                  </button>
                  <button
                    onClick={() => handleAddNewProp('car_vehicle', 14.0, 'Coche Clásico')}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🚗</span> Coche (Fondo Medio 14m)
                  </button>
                  <button
                    onClick={() => handleAddNewProp('director_chair', 1.8, 'Silla de Director')}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🎬</span> Silla Director (Primer Plano 1.8m)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Horizontal Props Selector Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sceneProps.map((prop) => {
              const isSelected = prop.id === selectedPropId;
              const isInFocus = prop.distanceM >= opticalMetrics.nearLimitM && prop.distanceM <= opticalMetrics.farLimitM;

              return (
                <div
                  key={prop.id}
                  className={`p-2 rounded border text-xs shrink-0 flex items-center gap-2 transition cursor-pointer ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-950/30'
                      : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                  }`}
                  onClick={() => setSelectedPropId(prop.id)}
                >
                  <span className="text-base">{getPropIcon(prop.type)}</span>
                  <div>
                    <div className="font-bold text-zinc-200 text-[11px] leading-tight flex items-center gap-1">
                      <span>{prop.name.split(' (')[0]}</span>
                      {isInFocus && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="En foco nítido" />}
                    </div>
                    <div className="text-[10px] text-zinc-400">{prop.distanceM.toFixed(1)} m</div>
                  </div>

                  {/* Pull focus directly to this prop */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      cameraAudio.playFocusLock();
                      onUpdateFocusDistance(prop.distanceM);
                    }}
                    className="p-1 rounded bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white transition ml-1"
                    title={`Enfocar lente exactamente a ${prop.name}`}
                  >
                    <Crosshair className="w-3 h-3" />
                  </button>

                  {/* Delete button (except main model) */}
                  {prop.type !== 'model_main' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProp(prop.id);
                      }}
                      className="text-zinc-600 hover:text-red-400 p-0.5"
                      title="Eliminar este elemento"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Slider for Selected Prop */}
          {sceneProps.find((p) => p.id === selectedPropId) && (
            <div className="pt-2 border-t border-zinc-800/80 space-y-1">
              {(() => {
                const prop = sceneProps.find((p) => p.id === selectedPropId)!;
                return (
                  <>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400">
                        Distancia de <strong>{prop.name}</strong> a la cámara:
                      </span>
                      <strong className="text-cyan-400 font-bold">{prop.distanceM.toFixed(1)} m</strong>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={40.0}
                      step={0.2}
                      value={prop.distanceM}
                      onChange={(e) => onUpdatePropDistance(prop.id, parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
