import React from 'react';
import { CameraSettings, ModelPose, SceneId } from '../types/camera';
import { SCENE_PRESETS } from '../utils/opticalPhysics';
import { cameraAudio } from '../utils/audioSynthesizer';
import {
  Compass,
  Move,
  RotateCw,
  Sliders,
  Sparkles,
  Camera,
  Layers,
  ArrowUpCircle,
  Eye,
  RotateCcw,
  UserCheck,
} from 'lucide-react';

interface CameraRigControlsProps {
  settings: CameraSettings;
  currentSceneId: SceneId;
  onUpdateSettings: (newSettings: Partial<CameraSettings>) => void;
  onSelectScene: (sceneId: SceneId) => void;
  onOpenHelp: (helpId: string) => void;
}

export const CameraRigControls: React.FC<CameraRigControlsProps> = ({
  settings,
  currentSceneId,
  onUpdateSettings,
  onSelectScene,
  onOpenHelp,
}) => {
  // Quick Angle & Emotion Presets
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

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 shadow-2xl space-y-4 font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-200 uppercase">
            Posición & Ángulos de Cámara (Trípode / Rig)
          </h2>
          <button
            onClick={() => onOpenHelp('cameraRig')}
            className="w-4 h-4 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-400 text-[10px] flex items-center justify-center font-bold transition cursor-pointer"
            title="¿Cómo influye la posición de cámara en la emoción?"
          >
            ?
          </button>
        </div>

        <button
          onClick={resetCameraRig}
          className="flex items-center gap-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded border border-zinc-700 transition cursor-pointer"
          title="Restablecer posición normal a nivel de ojos"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Centrar Trípode</span>
        </button>
      </div>

      {/* 1. EMOTION & ANGLE PRESETS (Los planos canónicos de cine) */}
      <div className="space-y-2 bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/90">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-zinc-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Planos Narrativos y Emocionales (Presets con 1 Clic):
          </span>
          <span className="text-[10px] text-zinc-500">Gramática Cinemática</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          {/* Eye Level */}
          <button
            onClick={() => applyAnglePreset({ height: 1.50, tilt: 0, pan: 0, roll: 0 })}
            className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
              Math.abs(settings.cameraHeightM - 1.50) < 0.15 && Math.abs(settings.cameraTiltDeg) < 4 && Math.abs(settings.cameraRollDeg) < 2
                ? 'bg-cyan-950/50 border-cyan-500 text-cyan-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>Nivel de Ojos (1.50m)</span>
              <span className="text-[9px]">👁️</span>
            </div>
            <span className="text-[10px] text-zinc-500 leading-tight">
              Neutro, empático, conexión humana directa.
            </span>
          </button>

          {/* Low Angle (Contrapicado) */}
          <button
            onClick={() => applyAnglePreset({ height: 0.55, tilt: 22, pan: 0, roll: 0 })}
            className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
              settings.cameraHeightM <= 0.7 && settings.cameraTiltDeg >= 12
                ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>Contrapicado (Low Angle)</span>
              <span className="text-[9px]">🦅</span>
            </div>
            <span className="text-[10px] text-zinc-500 leading-tight">
              Poder, autoridad, heroísmo y monumentalidad.
            </span>
          </button>

          {/* High Angle (Picado) */}
          <button
            onClick={() => applyAnglePreset({ height: 2.25, tilt: -20, pan: 0, roll: 0 })}
            className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
              settings.cameraHeightM >= 1.95 && settings.cameraTiltDeg <= -11
                ? 'bg-blue-950/50 border-blue-500 text-blue-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>Picado (High Angle)</span>
              <span className="text-[9px]">🕊️</span>
            </div>
            <span className="text-[10px] text-zinc-500 leading-tight">
              Vulnerabilidad, soledad, pequeñez o abatimiento.
            </span>
          </button>

          {/* Dutch Angle (Plano Holandés) */}
          <button
            onClick={() => applyAnglePreset({ height: 1.45, tilt: 4, pan: -3, roll: 14 })}
            className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
              Math.abs(settings.cameraRollDeg) >= 8
                ? 'bg-purple-950/50 border-purple-500 text-purple-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>Plano Holandés (Dutch)</span>
              <span className="text-[9px]">📐</span>
            </div>
            <span className="text-[10px] text-zinc-500 leading-tight">
              Tensión psicológica, locura, peligro o dinamismo.
            </span>
          </button>

          {/* Overhead / Cenital */}
          <button
            onClick={() => applyAnglePreset({ height: 2.85, tilt: -60, pan: 0, roll: 0, dolly: -0.8 })}
            className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
              settings.cameraHeightM >= 2.5 && settings.cameraTiltDeg <= -35
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>Cenital Alto (Overhead)</span>
              <span className="text-[9px]">🔭</span>
            </div>
            <span className="text-[10px] text-zinc-500 leading-tight">
              Observación clínica, geometría del set y destino.
            </span>
          </button>

          {/* Worm's Eye (Gusano Extremo) */}
          <button
            onClick={() => applyAnglePreset({ height: 0.20, tilt: 30, pan: 0, roll: 0 })}
            className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
              settings.cameraHeightM <= 0.35 && settings.cameraTiltDeg >= 22
                ? 'bg-red-950/50 border-red-500 text-red-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>Plano Gusano (Worm)</span>
              <span className="text-[9px]">🐛</span>
            </div>
            <span className="text-[10px] text-zinc-500 leading-tight">
              Ras de suelo. Impacto visual extremo e inmersión.
            </span>
          </button>

          {/* Over-the-Shoulder OTS */}
          <button
            onClick={() => applyAnglePreset({ height: 1.45, tilt: -2, pan: -12, roll: 0, truck: 0.50 })}
            className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer col-span-2 sm:col-span-3 ${
              Math.abs(settings.cameraTruckM || 0) >= 0.35 && (settings.cameraPanDeg || 0) <= -8
                ? 'bg-indigo-950/50 border-indigo-500 text-indigo-200'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>Sobre el Hombro (OTS / Over-the-Shoulder)</span>
              <span className="text-[9px]">🎬</span>
            </div>
            <span className="text-[10px] text-zinc-500 leading-tight">
              Profundidad conversacional en plano/contraplano cinematográfico.
            </span>
          </button>
        </div>
      </div>

      {/* 2. FINE TUNING SLIDERS (Traducción y Rotación 3D del Trípode) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* ALTURA Y ROTACIONES */}
        <div className="bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/90 space-y-2.5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-xs">
            <span className="font-bold text-zinc-300 flex items-center gap-1.5">
              <ArrowUpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Altura & Cabeza del Trípode:
            </span>
            <span className="text-[10px] text-zinc-500">Rotación 3D</span>
          </div>

          {/* Altura */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Altura del Trípode (Y):</span>
              <strong className="text-cyan-400 font-bold">{settings.cameraHeightM.toFixed(2)} m</strong>
            </div>
            <input
              type="range"
              min={0.25}
              max={3.0}
              step={0.05}
              value={settings.cameraHeightM}
              onChange={(e) => onUpdateSettings({ cameraHeightM: parseFloat(e.target.value) })}
              className="w-full accent-cyan-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500">
              <span>Suelo (0.25m)</span>
              <span>Ojos (1.45m)</span>
              <span>Alto (3.0m)</span>
            </div>
          </div>

          {/* Inclinación (Tilt) */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Inclinación Vertical (Tilt):</span>
              <strong className="text-amber-400 font-bold">{settings.cameraTiltDeg}°</strong>
            </div>
            <input
              type="range"
              min={-35}
              max={35}
              step={1}
              value={settings.cameraTiltDeg}
              onChange={(e) => onUpdateSettings({ cameraTiltDeg: parseInt(e.target.value, 10) })}
              className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500">
              <span>Picado (-35°)</span>
              <span>Horizontal (0°)</span>
              <span>Contrapicado (+35°)</span>
            </div>
          </div>

          {/* Giro (Pan) */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Giro Horizontal (Pan / Paneo):</span>
              <strong className="text-emerald-400 font-bold">{settings.cameraPanDeg}°</strong>
            </div>
            <input
              type="range"
              min={-40}
              max={40}
              step={1}
              value={settings.cameraPanDeg}
              onChange={(e) => onUpdateSettings({ cameraPanDeg: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500">
              <span>Izquierda (-40°)</span>
              <span>Centro (0°)</span>
              <span>Derecha (+40°)</span>
            </div>
          </div>

          {/* Roll (Plano Holandés) */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Plano Holandés (Roll / Nivel):</span>
              <strong className="text-purple-400 font-bold">{settings.cameraRollDeg}°</strong>
            </div>
            <input
              type="range"
              min={-25}
              max={25}
              step={1}
              value={settings.cameraRollDeg}
              onChange={(e) => onUpdateSettings({ cameraRollDeg: parseInt(e.target.value, 10) })}
              className="w-full accent-purple-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500">
              <span>Inclinado Izq (-25°)</span>
              <span>Nivelado (0°)</span>
              <span>Inclinado Der (+25°)</span>
            </div>
          </div>
        </div>

        {/* TRUCK & DOLLY + MODEL POSES */}
        <div className="space-y-3">
          {/* TRUCK & DOLLY */}
          <div className="bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/90 space-y-2.5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-xs">
              <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-yellow-400" />
                Dolly & Travelling (Translación):
              </span>
              <span className="text-[10px] text-zinc-500">Ejes X / Z</span>
            </div>

            {/* Truck lateral */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">Travelling Lateral (Truck X):</span>
                <strong className="text-yellow-400 font-bold">{settings.cameraTruckM.toFixed(2)} m</strong>
              </div>
              <input
                type="range"
                min={-1.5}
                max={1.5}
                step={0.05}
                value={settings.cameraTruckM}
                onChange={(e) => onUpdateSettings({ cameraTruckM: parseFloat(e.target.value) })}
                className="w-full accent-yellow-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-500">
                <span>Izquierda (-1.5m)</span>
                <span>Centro</span>
                <span>Derecha (+1.5m)</span>
              </div>
            </div>

            {/* Dolly adelante / atras */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">Dolly Óptico (Acercar/Alejar Z):</span>
                <strong className="text-pink-400 font-bold">{settings.cameraDollyM.toFixed(2)} m</strong>
              </div>
              <input
                type="range"
                min={-1.2}
                max={1.5}
                step={0.05}
                value={settings.cameraDollyM}
                onChange={(e) => onUpdateSettings({ cameraDollyM: parseFloat(e.target.value) })}
                className="w-full accent-pink-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-500">
                <span>Alejar (-1.2m)</span>
                <span>Base (0m)</span>
                <span>Acercar (+1.5m)</span>
              </div>
            </div>
          </div>

          {/* 3. POSES DEL MODELO / SITUACIONES PROFESIONALES */}
          <div className="bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/90 space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-xs">
              <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                Pose del Sujeto / Modelo en Set:
              </span>
              <button
                onClick={() => onOpenHelp('modelPose')}
                className="text-zinc-500 hover:text-amber-400 text-[10px]"
              >
                ?
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {[
                { id: 'standing_frontal' as ModelPose, label: 'Frontal Formal', icon: '🧍', desc: 'Lookbook / Catálogo' },
                { id: 'profile_3_4' as ModelPose, label: '3/4 Cinematográfico', icon: '🎭', desc: 'Rembrandt / Drama' },
                { id: 'close_beauty' as ModelPose, label: 'Primer Plano Beauty', icon: '✨', desc: 'Moda & Cosmética' },
                { id: 'sitting_chair' as ModelPose, label: 'Sentado en Set', icon: '🎬', desc: 'Entrevista / Podcast' },
                { id: 'fashion_dynamic' as ModelPose, label: 'Alta Costura Editorial', icon: '💃', desc: 'Dinamismo & Estilo' },
                { id: 'mystery_lowkey' as ModelPose, label: 'Cine Noir / Misterio', icon: '🕵️', desc: 'Silueta & Suspense' },
              ].map((pose) => (
                <button
                  key={pose.id}
                  onClick={() => {
                    cameraAudio.playDialClick();
                    onUpdateSettings({ modelPose: pose.id });
                  }}
                  className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
                    settings.modelPose === pose.id
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{pose.label}</span>
                    <span className="text-xs">{pose.icon}</span>
                  </div>
                  <span className="text-[9px] text-zinc-500">{pose.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. SCENARIOS / ESCENAS PROFESIONALES DE LA CARRERA */}
      <div className="bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/90 space-y-2">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-xs">
          <span className="font-bold text-zinc-300 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            Escenarios Profesionales Típicos para Practicar:
          </span>
          <span className="text-[10px] text-zinc-500">Selecciona Set</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {Object.values(SCENE_PRESETS).map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                cameraAudio.playDialClick();
                onSelectScene(sc.id);
              }}
              className={`p-2 rounded border text-left transition flex flex-col gap-0.5 cursor-pointer ${
                currentSceneId === sc.id
                  ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className="font-bold text-[11px] truncate">{sc.name}</div>
              <span className="text-[9px] text-zinc-500 truncate">{sc.category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
