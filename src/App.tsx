import React, { useState, useEffect } from 'react';
import {
  CameraSettings,
  OpticalMetrics,
  SceneId,
  ShotSnapshot,
  SlateMetadata,
  StudioLight,
  SceneProp,
} from './types/camera';
import {
  SCENE_PRESETS,
  DEFAULT_STUDIO_LIGHTS,
  DEFAULT_SCENE_PROPS,
  calculateOpticalMetrics,
  STANDARD_APERTURES,
  STANDARD_ISOS,
  formatShutterSpeed,
  SENSOR_FORMATS,
} from './utils/opticalPhysics';
import { cameraAudio } from './utils/audioSynthesizer';
import { MonitorTopBar } from './components/MonitorTopBar';
import { CameraViewport } from './components/CameraViewport';
import { DepthOfFieldDiagram } from './components/DepthOfFieldDiagram';
import { PhysicalControls } from './components/PhysicalControls';
import { LightCageRig } from './components/LightCageRig';
import { LiveHistogram } from './components/LiveHistogram';
import { BlackmagicDashboardModal } from './components/BlackmagicDashboardModal';
import { SlateModal } from './components/SlateModal';
import { SchoolChallenges } from './components/SchoolChallenges';
import { CAREER_BRIEFS } from './data/careerBriefs';
import { GalleryAndCompareModal } from './components/GalleryAndCompareModal';
import { TheoryGuideModal } from './components/TheoryGuideModal';
import { HelpTooltipModal } from './components/HelpTooltipModal';
import { CameraRigControls } from './components/CameraRigControls';
import { DirectorFramingConsole } from './components/DirectorFramingConsole';
import {
  Camera,
  Film,
  Award,
  BookOpen,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Sliders,
  Sun,
  HelpCircle,
  Layers,
  CircleDot,
  Crosshair,
  Grid,
  Search,
  Eye,
  Tv,
  Compass,
} from 'lucide-react';

export default function App() {
  // Current active scene
  const [currentSceneId, setCurrentSceneId] = useState<SceneId>('portrait_golden');
  const currentScene = SCENE_PRESETS[currentSceneId];

  // Primary App Mode: 'story' (Career Story Mode) vs 'freestyle' (Free Sandbox)
  const [appMode, setAppMode] = useState<'story' | 'freestyle'>('story');

  // Drawer / Side Panel state ("pestaña desplegable al lado")
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [drawerTab, setDrawerTab] = useState<'basics' | 'rig' | 'dof' | 'lighting' | 'monitor' | 'challenges'>('challenges');

  // Modals state
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSlateOpen, setIsSlateOpen] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [activeHelpId, setActiveHelpId] = useState<string | null>(null);

  // Shutter action animation state
  const [isTakingPhoto, setIsTakingPhoto] = useState<boolean>(false);

  // Stored snapshots
  const [snapshots, setSnapshots] = useState<ShotSnapshot[]>([]);

  // 360° Studio Lighting Rig State
  const [studioLights, setStudioLights] = useState<StudioLight[]>(DEFAULT_STUDIO_LIGHTS);

  // Dynamic Scene Props on Set (primer plano, segundo plano, fondo)
  const [sceneProps, setSceneProps] = useState<SceneProp[]>(DEFAULT_SCENE_PROPS);

  // Slate metadata
  const [slateMeta, setSlateMeta] = useState<SlateMetadata>({
    projectName: 'SIMULADOR CINESIM PRO',
    reelNumber: 1,
    sceneNumber: '1',
    shotNumber: 'A',
    takeNumber: 1,
    autoIncrementTake: true,
    shotType: 'MS',
    lensModel: 'Cine Prime 50mm T1.5',
    cameraOperator: 'Estudiante',
    director: 'Profesor',
    comments: 'Práctica manual de cámara y set de iluminación 360°',
    keywords: 'DoF, Bokeh, Aputure360, Blackmagic, Manual',
  });

  // Camera Settings State (100% Manual initial defaults)
  const [settings, setSettings] = useState<CameraSettings>({
    focalLengthMm: 50,
    aperture: 2.8,
    iso: 400,
    shutterMode: 'speed',
    shutterSpeedInv: 125,
    shutterAngleDeg: 180.0,
    projectFps: 24,
    sensorFps: 24,
    sensorFormatId: 'super35', // Blackmagic URSA Super 35 default
    subjectDistanceM: currentScene.defaultSubjectDistanceM,
    focusDistanceM: currentScene.defaultSubjectDistanceM,
    backgroundDistanceM: currentScene.defaultBackgroundDistanceM,
    apertureBlades: 9,
    whiteBalanceK: 5600,
    tint: 0,
    dynamicRange: 'Video',
    showZebra: false,
    zebraThresholdPct: 95,
    showFalseColor: false,
    showPeaking: false,
    peakingColor: 'green',
    peakingSensitivity: 80,
    frameGuide: '16:9',
    aspectRatio: '16:9',
    orientation: 'landscape',
    compositionGuide: 'thirds',
    guideOpacity: 50,
    showHistogram: true,
    showAudioMeters: true,
    isZoom1to1: false,
    codec: 'ProRes 422 HQ',
    resolution: '3840x2160 (Ultra HD)',
    dualCardMode: false,
    timecode: '00:00:00:00',
    isRecording: false,
    // Camera Rig & Spatial Placement (Translations & Rotations)
    cameraHeightM: 1.45,
    cameraTiltDeg: 0,
    cameraPanDeg: 0,
    cameraRollDeg: 0,
    cameraTruckM: 0,
    cameraDollyM: 0,
    modelPose: 'standing_frontal',
    mode: 'photo',
  });

  // Calculate live optical and exposure metrics combining camera + 360° light cage
  const opticalMetrics: OpticalMetrics = calculateOpticalMetrics(settings, currentScene, studioLights);

  // Timecode counter for video recording
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (settings.isRecording) {
      interval = setInterval(() => {
        setSettings((prev) => {
          const parts = prev.timecode.split(':').map(Number);
          let [h, m, s, f] = parts;
          f++;
          if (f >= prev.projectFps) {
            f = 0;
            s++;
            if (s >= 60) {
              s = 0;
              m++;
              if (m >= 60) {
                m = 0;
                h++;
              }
            }
          }
          const pad = (n: number) => n.toString().padStart(2, '0');
          return {
            ...prev,
            timecode: `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`,
          };
        });
      }, 1000 / settings.projectFps);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [settings.isRecording, settings.projectFps]);

  // Update scene selection
  const handleSelectScene = (sceneId: SceneId) => {
    cameraAudio.playDialClick();
    const sc = SCENE_PRESETS[sceneId];
    setCurrentSceneId(sceneId);
    setSettings((prev) => ({
      ...prev,
      subjectDistanceM: sc.defaultSubjectDistanceM,
      focusDistanceM: sc.defaultSubjectDistanceM,
      backgroundDistanceM: sc.defaultBackgroundDistanceM,
      whiteBalanceK: sc.colorTempK,
    }));
  };

  const handleUpdateSettings = (partial: Partial<CameraSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  // Dynamic Scene Props Handlers
  const handleUpdatePropDistance = (id: string, distM: number) => {
    setSceneProps((prev) =>
      prev.map((p) => (p.id === id ? { ...p, distanceM: distM } : p))
    );
    if (id === 'prop_model_main') {
      setSettings((prev) => ({ ...prev, subjectDistanceM: distM }));
    }
  };

  const handleToggleProp = (id: string) => {
    cameraAudio.playDialClick();
    setSceneProps((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleAddProp = (newProp: SceneProp) => {
    cameraAudio.playDialClick();
    setSceneProps((prev) => [...prev, newProp]);
  };

  const handleDeleteProp = (id: string) => {
    cameraAudio.playDialClick();
    setSceneProps((prev) => prev.filter((p) => p.id !== id));
  };

  // Lighting handlers
  const handleUpdateLight = (id: string, partial: Partial<StudioLight>) => {
    cameraAudio.playDialClick();
    setStudioLights((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...partial } : l))
    );
  };

  const handleApplyLightingPreset = (presetLights: StudioLight[]) => {
    setStudioLights(presetLights);
  };

  const handleToggleAllLights = (enabled: boolean) => {
    cameraAudio.playDialClick();
    setStudioLights((prev) => prev.map((l) => ({ ...l, enabled })));
  };

  const handleAddLight = (newLight: StudioLight) => {
    setStudioLights((prev) => [...prev, newLight]);
  };

  const handleDeleteLight = (id: string) => {
    setStudioLights((prev) => prev.filter((l) => l.id !== id));
  };

  // Trigger Still Shutter Release
  const handleTriggerShutter = () => {
    cameraAudio.playShutterRelease(opticalMetrics.effectiveShutterSpeedS);
    setIsTakingPhoto(true);

    setTimeout(() => {
      setIsTakingPhoto(false);

      const canvas = (document.getElementById('viewport-three-canvas') as HTMLCanvasElement) || document.querySelector('canvas');
      const thumb = canvas ? canvas.toDataURL('image/jpeg', 0.85) : '';

      const newShot: ShotSnapshot = {
        id: `shot_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        thumbnailUrl: thumb,
        sceneName: currentScene.name,
        sceneId: currentScene.id,
        mode: settings.mode,
        settings: { ...settings },
        exposureDeltaEV: opticalMetrics.exposureDeltaEV,
        dofTotalM: opticalMetrics.dofTotalM,
        hyperfocalM: opticalMetrics.hyperfocalM,
        lightsCount: studioLights.filter((l) => l.enabled).length,
        notes: `Toma ${slateMeta.takeNumber} - ${slateMeta.shotType} (${studioLights.filter((l) => l.enabled).length} luces)`,
      };

      setSnapshots((prev) => [newShot, ...prev]);

      if (slateMeta.autoIncrementTake) {
        setSlateMeta((prev) => ({ ...prev, takeNumber: prev.takeNumber + 1 }));
      }
    }, 120);
  };

  // Toggle Video Recording
  const handleToggleRecording = () => {
    if (!settings.isRecording) {
      cameraAudio.playRecStart();
      setSettings((prev) => ({ ...prev, isRecording: true }));
    } else {
      cameraAudio.playRecStop();
      setSettings((prev) => ({ ...prev, isRecording: false }));

      const canvas = (document.getElementById('viewport-three-canvas') as HTMLCanvasElement) || document.querySelector('canvas');
      const thumb = canvas ? canvas.toDataURL('image/jpeg', 0.85) : '';

      const newClip: ShotSnapshot = {
        id: `clip_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        thumbnailUrl: thumb,
        sceneName: currentScene.name,
        sceneId: currentScene.id,
        mode: 'video',
        settings: { ...settings },
        exposureDeltaEV: opticalMetrics.exposureDeltaEV,
        dofTotalM: opticalMetrics.dofTotalM,
        hyperfocalM: opticalMetrics.hyperfocalM,
        lightsCount: studioLights.filter((l) => l.enabled).length,
        notes: `Clip Video ${settings.codec} @ ${settings.sensorFps}fps`,
      };

      setSnapshots((prev) => [newClip, ...prev]);

      if (slateMeta.autoIncrementTake) {
        setSlateMeta((prev) => ({ ...prev, takeNumber: prev.takeNumber + 1 }));
      }
    }
  };

  // Reset defaults
  const handleResetDefaults = () => {
    cameraAudio.playDialClick();
    setSettings((prev) => ({
      ...prev,
      aperture: 2.8,
      shutterSpeedInv: 125,
      shutterAngleDeg: 180,
      iso: 400,
      focalLengthMm: 50,
      whiteBalanceK: currentScene.colorTempK,
      tint: 0,
      showZebra: false,
      showFalseColor: false,
      showPeaking: false,
      isZoom1to1: false,
      focusDistanceM: currentScene.defaultSubjectDistanceM,
    }));
    setStudioLights(DEFAULT_STUDIO_LIGHTS);
    setSceneProps(DEFAULT_SCENE_PROPS);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Application Navigation Bar */}
      <header className="bg-zinc-950/95 backdrop-blur border-b border-zinc-800/90 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-black shadow-lg">
            🎥
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold font-mono tracking-wider text-zinc-100 flex items-center gap-2">
              EL NI LO VAN A ABRIR PRO <span className="text-[10px] bg-red-600/90 text-white font-mono px-1.5 py-0.5 rounded">100% MANUAL</span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-mono hidden xl:block">
              Simulador de Vuelo: Cámara & Set de Luces 360° • Base Visual en Vivo
            </p>
          </div>
        </div>

        {/* PRIMARY APP MODE SELECTOR (EL PRIMER BOTÓN: MODO HISTORIA vs FREESTYLE) */}
        <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-700/80 shadow-md">
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              setAppMode('story');
              setIsDrawerOpen(true);
              setDrawerTab('challenges');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              appMode === 'story'
                ? 'bg-amber-500 text-black shadow-lg scale-100'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Modo Historia: Retos profesionales y briefs de rodaje de dirección de foto"
          >
            <Award className="w-3.5 h-3.5" />
            <span>MODO HISTORIA</span>
            <span className="text-[10px] bg-black/30 text-zinc-950 font-extrabold px-1.5 py-0.2 rounded hidden sm:inline">
              {CAREER_BRIEFS.length} NIVELES
            </span>
          </button>

          <button
            onClick={() => {
              cameraAudio.playDialClick();
              setAppMode('freestyle');
              setIsDrawerOpen(true);
              setDrawerTab('basics');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              appMode === 'freestyle'
                ? 'bg-cyan-500 text-black shadow-lg scale-100'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Modo Freestyle: Exploración libre de cámara, luces 360°, rig y ópticas"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>FREESTYLE (Estudio Libre)</span>
          </button>
        </div>

        {/* Scene Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono hidden md:inline">Escena:</span>
          <select
            value={currentSceneId}
            onChange={(e) => handleSelectScene(e.target.value as SceneId)}
            className="bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-lg px-2.5 py-1.5 text-xs font-mono text-amber-300 font-bold focus:outline-none cursor-pointer"
          >
            {Object.values(SCENE_PRESETS).map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.name} ({sc.category})
              </option>
            ))}
          </select>
        </div>

        {/* Navigation & Modal Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              setIsGalleryOpen(true);
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition flex items-center gap-1.5 cursor-pointer"
            title="Ver capturas guardadas y comparar A/B"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Galería ({snapshots.length})</span>
          </button>

          <button
            onClick={() => {
              cameraAudio.playDialClick();
              setIsTheoryOpen(true);
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition flex items-center gap-1.5 cursor-pointer"
            title="Guía teórica de óptica y exposición"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Teoría</span>
          </button>

          <button
            onClick={() => setActiveHelpId('aperture')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition flex items-center gap-1 cursor-pointer"
            title="Abrir inspector pedagógico de controles"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Ayuda (?)</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition cursor-pointer"
            title="Restablecer ajustes a valores estándar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Prominent Drawer Toggle Button */}
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              setIsDrawerOpen(!isDrawerOpen);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer shadow ${
              isDrawerOpen
                ? 'bg-amber-500 text-black hover:bg-amber-400'
                : 'bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-amber-500/50'
            }`}
            title="Ocultar o desplegar el panel de ajustes al lado"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isDrawerOpen ? '◀ Ocultar Panel' : '🎛️ Desplegar Ajustes ▶'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace (Side-by-Side: Viewport is always the base!) */}
      <main className="flex-1 p-2 sm:p-4 max-w-[1720px] w-full mx-auto flex flex-col lg:flex-row gap-4 items-start">
        {/* LEFT / CENTER COLUMN: LA BASE ES SIEMPRE LA IMAGEN */}
        <div className="flex-1 min-w-0 w-full flex flex-col space-y-3">
          {/* Active Story Mode Ribbon Banner when in story mode */}
          {appMode === 'story' && (
            <div className="bg-gradient-to-r from-amber-950/80 via-zinc-900 to-amber-950/80 border border-amber-500/40 rounded-xl px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-bold text-amber-300">MODO HISTORIA ACTIVO:</span>
                <span className="text-zinc-200">Retos de Carrera y Dirección de Fotografía ({CAREER_BRIEFS.length} Niveles)</span>
              </div>
              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  setIsDrawerOpen(true);
                  setDrawerTab('challenges');
                }}
                className="text-amber-400 hover:text-white font-bold bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded border border-amber-500/40 transition cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <span>Ver Brief Activo en Panel ▶</span>
              </button>
            </div>
          )}

          {/* Cinema Camera Housing Viewport Unit (Fold-out Monitor style) */}
          <div className="bg-zinc-900 border-2 border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative">
            {/* Blackmagic URSA Status HUD Ribbon */}
            <MonitorTopBar
              settings={settings}
              opticalMetrics={opticalMetrics}
              onOpenMenu={() => setIsMenuOpen(true)}
              onOpenHelp={(helpId) => setActiveHelpId(helpId)}
              onQuickSettingClick={(setting) => {
                cameraAudio.playDialClick();
                if (setting === 'iso') {
                  const next = STANDARD_ISOS[(STANDARD_ISOS.indexOf(settings.iso) + 1) % STANDARD_ISOS.length];
                  handleUpdateSettings({ iso: next });
                } else if (setting === 'aperture') {
                  const next = STANDARD_APERTURES[(STANDARD_APERTURES.indexOf(settings.aperture) + 1) % STANDARD_APERTURES.length];
                  handleUpdateSettings({ aperture: next });
                } else if (setting === 'shutter') {
                  handleUpdateSettings({ shutterMode: settings.shutterMode === 'speed' ? 'angle' : 'speed' });
                } else if (setting === 'wb') {
                  const kelvins = [3200, 4300, 5600, 6500, 7500];
                  const currentIdx = kelvins.indexOf(settings.whiteBalanceK);
                  const nextK = kelvins[(currentIdx + 1) % kelvins.length];
                  handleUpdateSettings({ whiteBalanceK: nextK });
                } else if (setting === 'fps') {
                  const fpsList = [24, 25, 30, 48, 60, 120];
                  const currentIdx = fpsList.indexOf(settings.sensorFps);
                  const nextFps = fpsList[(currentIdx + 1) % fpsList.length];
                  handleUpdateSettings({ sensorFps: nextFps, projectFps: nextFps > 60 ? 24 : nextFps });
                } else {
                  setIsMenuOpen(true);
                }
              }}
            />

            {/* Central Monitor Display */}
            <div className="relative aspect-video w-full bg-black">
              <CameraViewport
                settings={settings}
                opticalMetrics={opticalMetrics}
                scene={currentScene}
                lights={studioLights}
                sceneProps={sceneProps}
                onTapFocus={(distM) => handleUpdateSettings({ focusDistanceM: distM })}
                onUpdateSettings={handleUpdateSettings}
                onSelectScene={handleSelectScene}
                onOpenHelp={(helpId) => setActiveHelpId(helpId)}
                isTakingPhoto={isTakingPhoto}
              />

              {/* Overlaid Floating RGB Histogram */}
              {settings.showHistogram && (
                <div className="absolute bottom-3 right-3 w-44 hidden sm:block pointer-events-auto">
                  <LiveHistogram
                    opticalMetrics={opticalMetrics}
                    sceneCategory={currentScene.category}
                    onOpenHelp={(helpId) => setActiveHelpId(helpId)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Consola de Dirección & Encuadre Rápido (Ángulos, Trípode, Poses del Modelo y Emoción) */}
          <DirectorFramingConsole
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onOpenHelp={(helpId) => setActiveHelpId(helpId)}
            sceneProps={sceneProps}
            onToggleProp={handleToggleProp}
            onUpdatePropDistance={handleUpdatePropDistance}
          />

          {/* Cockpit Bar: Inmediatamente debajo de la imagen (Lo más usado a mano) */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg font-mono">
            {/* Primary Action Buttons */}
            <div className="flex items-center gap-2">
              {settings.mode === 'photo' ? (
                <button
                  onClick={handleTriggerShutter}
                  className="bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 hover:from-white hover:to-zinc-200 active:scale-95 text-zinc-950 font-black py-2 px-4 rounded-lg shadow-md border border-zinc-300 transition flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                  title="Disparar foto con sonido mecánico real"
                >
                  <div className="w-3.5 h-3.5 rounded-full border border-zinc-900 bg-red-600 shadow" />
                  <span>DISPARAR FOTO</span>
                </button>
              ) : (
                <button
                  onClick={handleToggleRecording}
                  className={`font-black py-2 px-4 rounded-lg shadow-md border transition flex items-center gap-2 cursor-pointer active:scale-95 text-xs sm:text-sm ${
                    settings.isRecording
                      ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 animate-pulse'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-red-500 border-zinc-700'
                  }`}
                  title="Grabar clip de vídeo"
                >
                  <CircleDot className={`w-3.5 h-3.5 ${settings.isRecording ? 'text-white' : 'text-red-500'}`} />
                  <span>{settings.isRecording ? 'DETENER REC' : 'GRABAR (REC)'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  cameraAudio.playFocusLock();
                  handleUpdateSettings({ focusDistanceM: settings.subjectDistanceM });
                }}
                className="bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs font-bold text-zinc-200 px-3 py-2 rounded border border-zinc-700 transition cursor-pointer flex items-center gap-1.5"
                title="Enfocar lente exactamente sobre el sujeto"
              >
                <Crosshair className="w-3.5 h-3.5 text-red-400" />
                <span>AF LOCK</span>
              </button>
            </div>

            {/* Quick Parameter Readout Pills with 1-to-1 [?] Help Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {/* Aperture */}
              <div className="flex items-center gap-0.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                <button
                  onClick={() => {
                    cameraAudio.playDialClick();
                    const next = STANDARD_APERTURES[(STANDARD_APERTURES.indexOf(settings.aperture) + 1) % STANDARD_APERTURES.length];
                    handleUpdateSettings({ aperture: next });
                  }}
                  className="hover:text-amber-300 text-amber-400 font-bold transition cursor-pointer"
                  title="Clic para cambiar apertura"
                >
                  f/{settings.aperture}
                </button>
                <button
                  onClick={() => setActiveHelpId('aperture')}
                  className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
                  title="¿Cómo funciona la Apertura f-stop? 1 a 1"
                >
                  ?
                </button>
              </div>

              {/* Shutter */}
              <div className="flex items-center gap-0.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                <button
                  onClick={() => {
                    cameraAudio.playDialClick();
                    handleUpdateSettings({ shutterMode: settings.shutterMode === 'speed' ? 'angle' : 'speed' });
                  }}
                  className="hover:text-emerald-300 text-emerald-400 font-bold transition cursor-pointer"
                  title="Clic para cambiar modo de obturación"
                >
                  {settings.shutterMode === 'angle' ? `${settings.shutterAngleDeg}°` : formatShutterSpeed(opticalMetrics.effectiveShutterSpeedS)}
                </button>
                <button
                  onClick={() => setActiveHelpId('shutter')}
                  className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
                  title="¿Cómo funciona la Obturación? 1 a 1"
                >
                  ?
                </button>
              </div>

              {/* ISO */}
              <div className="flex items-center gap-0.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                <button
                  onClick={() => {
                    cameraAudio.playDialClick();
                    const next = STANDARD_ISOS[(STANDARD_ISOS.indexOf(settings.iso) + 1) % STANDARD_ISOS.length];
                    handleUpdateSettings({ iso: next });
                  }}
                  className="hover:text-cyan-300 text-cyan-400 font-bold transition cursor-pointer"
                  title="Clic para cambiar ISO"
                >
                  ISO {settings.iso}
                </button>
                <button
                  onClick={() => setActiveHelpId('iso')}
                  className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
                  title="¿Cómo funciona el ISO y Ruido? 1 a 1"
                >
                  ?
                </button>
              </div>

              {/* Focus Distance */}
              <div className="flex items-center gap-0.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-red-400 font-bold hidden sm:flex">
                <span>Foco {settings.focusDistanceM.toFixed(2)}m</span>
                <button
                  onClick={() => setActiveHelpId('focusDistance')}
                  className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
                  title="¿Cómo funciona el Anillo de Foco? 1 a 1"
                >
                  ?
                </button>
              </div>

              {/* Focal Length */}
              <div className="flex items-center gap-0.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-purple-400 font-bold hidden md:flex">
                <span>{settings.focalLengthMm}mm</span>
                <button
                  onClick={() => setActiveHelpId('focalLength')}
                  className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
                  title="¿Cómo funciona la Distancia Focal? 1 a 1"
                >
                  ?
                </button>
              </div>

              {/* White Balance */}
              <div className="flex items-center gap-0.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-amber-300 font-bold hidden lg:flex">
                <span>{settings.whiteBalanceK}K</span>
                <button
                  onClick={() => setActiveHelpId('whiteBalance')}
                  className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
                  title="¿Cómo funciona el Balance de Blancos? 1 a 1"
                >
                  ?
                </button>
              </div>

              {/* DoF */}
              <div className="flex items-center gap-0.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-emerald-300 font-bold hidden sm:flex">
                <span>DoF: {opticalMetrics.dofTotalM === Infinity ? '∞' : `${(opticalMetrics.dofTotalM * 100).toFixed(0)}cm`}</span>
                <button
                  onClick={() => setActiveHelpId('dofLimits')}
                  className="text-zinc-500 hover:text-amber-400 text-[10px] font-bold px-1"
                  title="¿Qué es la Profundidad de Campo (DoF)? 1 a 1"
                >
                  ?
                </button>
              </div>

              {/* EV Delta */}
              <div className={`flex items-center gap-0.5 px-2 py-1 rounded font-bold ${opticalMetrics.exposureDeltaEV === 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : Math.abs(opticalMetrics.exposureDeltaEV) < 1.0 ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                <span>EV {opticalMetrics.exposureDeltaEV > 0 ? `+${opticalMetrics.exposureDeltaEV}` : opticalMetrics.exposureDeltaEV}</span>
                <button
                  onClick={() => setActiveHelpId('ev')}
                  className="text-zinc-400 hover:text-white text-[10px] font-bold px-1"
                  title="¿Qué significa el valor EV Delta? 1 a 1"
                >
                  ?
                </button>
              </div>
            </div>

            {/* Side Drawer Toggle button */}
            <button
              onClick={() => {
                cameraAudio.playDialClick();
                setIsDrawerOpen(!isDrawerOpen);
              }}
              className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ml-auto"
              title={isDrawerOpen ? 'Ocultar panel lateral de ajustes' : 'Desplegar panel lateral de ajustes'}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isDrawerOpen ? 'Ocultar Panel' : 'Abrir Ajustes'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PESTAÑA DESPLEGABLE DE AJUSTES AL LADO */}
        {isDrawerOpen && (
          <aside className="w-full lg:w-[480px] xl:w-[530px] shrink-0 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[calc(100vh-80px)] lg:sticky lg:top-[60px] animate-in slide-in-from-right duration-200">
            {/* Drawer Header with 6 Tabs - Modo Historia is the FIRST Tab */}
            <div className="bg-zinc-950 border-b border-zinc-800 p-2 flex items-center justify-between gap-1 overflow-x-auto">
              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  setDrawerTab('challenges');
                  setAppMode('story');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  drawerTab === 'challenges'
                    ? 'bg-amber-500 text-black shadow-lg ring-1 ring-amber-400 font-extrabold'
                    : 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
                title="Modo Historia: Retos profesionales y briefs de rodaje"
              >
                <Award className="w-3.5 h-3.5" />
                <span>🎬 Modo Historia</span>
              </button>

              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  setDrawerTab('basics');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  drawerTab === 'basics'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Básicos</span>
              </button>

              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  setDrawerTab('rig');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  drawerTab === 'rig'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Trípode & Poses</span>
              </button>

              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  setDrawerTab('dof');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  drawerTab === 'dof'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Planos & DoF</span>
              </button>

              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  setDrawerTab('lighting');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  drawerTab === 'lighting'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Luces 360°</span>
              </button>

              <button
                onClick={() => {
                  cameraAudio.playDialClick();
                  setDrawerTab('monitor');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  drawerTab === 'monitor'
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Cine & Monitor</span>
              </button>
            </div>

            {/* Drawer Body: Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
              {drawerTab === 'basics' && (
                <PhysicalControls
                  settings={settings}
                  opticalMetrics={opticalMetrics}
                  onUpdateSettings={handleUpdateSettings}
                  onTriggerShutter={handleTriggerShutter}
                  onToggleRecording={handleToggleRecording}
                  onOpenHelp={(helpId) => setActiveHelpId(helpId)}
                />
              )}

              {drawerTab === 'rig' && (
                <CameraRigControls
                  settings={settings}
                  currentSceneId={currentSceneId}
                  onUpdateSettings={handleUpdateSettings}
                  onSelectScene={handleSelectScene}
                  onOpenHelp={(helpId) => setActiveHelpId(helpId)}
                />
              )}

              {drawerTab === 'dof' && (
                <DepthOfFieldDiagram
                  settings={settings}
                  opticalMetrics={opticalMetrics}
                  sceneProps={sceneProps}
                  onUpdateFocusDistance={(distM) => handleUpdateSettings({ focusDistanceM: distM })}
                  onUpdatePropDistance={handleUpdatePropDistance}
                  onToggleProp={handleToggleProp}
                  onAddProp={handleAddProp}
                  onDeleteProp={handleDeleteProp}
                  onOpenHelp={(helpId) => setActiveHelpId(helpId)}
                />
              )}

              {drawerTab === 'lighting' && (
                <LightCageRig
                  lights={studioLights}
                  totalLux={opticalMetrics.totalLightingLux}
                  onUpdateLight={handleUpdateLight}
                  onApplyPreset={handleApplyLightingPreset}
                  onToggleAll={handleToggleAllLights}
                  onAddLight={handleAddLight}
                  onDeleteLight={handleDeleteLight}
                  onOpenHelp={(helpId) => setActiveHelpId(helpId)}
                />
              )}

              {drawerTab === 'monitor' && (
                <div className="space-y-3 font-mono text-xs">
                  {/* Blackmagic Touchscreen Menu & Slate Shortcuts */}
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-zinc-200">Menú Táctil URSA & Claqueta</h4>
                      <p className="text-[10px] text-zinc-500">Configuración avanzada de cámara y metadatos de toma</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsMenuOpen(true)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 px-2.5 py-1 rounded font-bold transition cursor-pointer"
                      >
                        Menú URSA
                      </button>
                      <button
                        onClick={() => setIsSlateOpen(true)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-cyan-400 px-2.5 py-1 rounded font-bold transition cursor-pointer"
                      >
                        Claqueta
                      </button>
                    </div>
                  </div>

                  {/* Sensor Format */}
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        Formato y Tamaño del Sensor:
                        <button onClick={() => setActiveHelpId('sensorFormat')} className="text-zinc-500 hover:text-amber-400">?</button>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.values(SENSOR_FORMATS).map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            cameraAudio.playDialClick();
                            handleUpdateSettings({ sensorFormatId: s.id });
                          }}
                          className={`p-2 rounded border text-left transition cursor-pointer ${
                            settings.sensorFormatId === s.id
                              ? 'border-amber-500 bg-amber-950/30 text-amber-300'
                              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <div className="font-bold text-[11px]">{s.name.split(' (')[0]}</div>
                          <div className="text-[9px] text-zinc-500">Crop: {s.cropFactor}x • CoC: {s.cocMm}mm</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cine Monitoring Overlays */}
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 space-y-2">
                    <span className="text-zinc-300 font-bold block">Herramientas Profesionales de Monitoreo:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleUpdateSettings({ showFalseColor: !settings.showFalseColor })}
                        className={`p-2 rounded border text-left transition cursor-pointer ${
                          settings.showFalseColor
                            ? 'bg-pink-950 text-pink-300 border-pink-500'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        <div className="font-bold">Falso Color (IRE)</div>
                        <div className="text-[10px] text-zinc-500">Exposición calibrada</div>
                      </button>

                      <button
                        onClick={() => handleUpdateSettings({ showPeaking: !settings.showPeaking })}
                        className={`p-2 rounded border text-left transition cursor-pointer ${
                          settings.showPeaking
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        <div className="font-bold">Focus Peaking</div>
                        <div className="text-[10px] text-zinc-500">Bordes en foco verde</div>
                      </button>

                      <button
                        onClick={() => handleUpdateSettings({ showZebra: !settings.showZebra })}
                        className={`p-2 rounded border text-left transition cursor-pointer ${
                          settings.showZebra
                            ? 'bg-red-950 text-red-300 border-red-500'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        <div className="font-bold">Rayas Cebras</div>
                        <div className="text-[10px] text-zinc-500">Umbral {settings.zebraThresholdPct}%</div>
                      </button>

                      <button
                        onClick={() => handleUpdateSettings({ isZoom1to1: !settings.isZoom1to1 })}
                        className={`p-2 rounded border text-left transition cursor-pointer ${
                          settings.isZoom1to1
                            ? 'bg-amber-950 text-amber-300 border-amber-500'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        <div className="font-bold">Lupa 1:1 Focus</div>
                        <div className="text-[10px] text-zinc-500">Crop punch-in</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === 'challenges' && (
                <SchoolChallenges
                  settings={settings}
                  opticalMetrics={opticalMetrics}
                  lights={studioLights}
                  onSelectScene={handleSelectScene}
                  onApplyPresetSettings={handleUpdateSettings}
                  onUpdateLights={setStudioLights}
                  onUpdatePropDistance={handleUpdatePropDistance}
                />
              )}
            </div>
          </aside>
        )}
      </main>

      {/* Modals */}
      <BlackmagicDashboardModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenSlate={() => setIsSlateOpen(true)}
      />

      <SlateModal
        isOpen={isSlateOpen}
        onClose={() => setIsSlateOpen(false)}
        metadata={slateMeta}
        onUpdateMetadata={(meta) => setSlateMeta((prev) => ({ ...prev, ...meta }))}
      />

      <GalleryAndCompareModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        snapshots={snapshots}
        onDeleteSnapshot={(id) => setSnapshots((prev) => prev.filter((s) => s.id !== id))}
        onClearAll={() => setSnapshots([])}
      />

      <TheoryGuideModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
      />

      {/* Interactive Pedagogical Tooltip Modal */}
      <HelpTooltipModal
        helpId={activeHelpId}
        onClose={() => setActiveHelpId(null)}
      />
    </div>
  );
}
