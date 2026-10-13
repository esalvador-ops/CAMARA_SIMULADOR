import React, { useState } from 'react';
import { X, BookOpen, Aperture, Sun, Clock, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import { cameraAudio } from '../utils/audioSynthesizer';

interface TheoryGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryGuideModal: React.FC<TheoryGuideModalProps> = ({ isOpen, onClose }) => {
  const [section, setSection] = useState<'framed_ink' | 'exposure' | 'dof' | 'cine' | 'lighting' | 'monitoring'>('framed_ink');
  const [stepControl, setStepControl] = useState<'iso' | 'whiteBalance' | 'aperture' | 'shutter' | 'focalLength' | 'ev'>('iso');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 font-mono text-zinc-100">
      <div className="bg-zinc-950 border border-zinc-700 rounded-xl w-full max-w-4xl h-[650px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase text-zinc-200">
                Manual Profesional de Dirección de Fotografía
              </h2>
              <span className="text-[10px] text-zinc-400">Guía práctica de óptica, exposición, encuadre y lenguaje cinematográfico</span>
            </div>
          </div>
          <button
            onClick={() => {
              cameraAudio.playDialClick();
              onClose();
            }}
            className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/40 px-4 gap-2 pt-2 text-xs overflow-x-auto">
          <button
            onClick={() => setSection('framed_ink')}
            className={`px-3 py-2 border-b-2 font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              section === 'framed_ink' ? 'border-amber-400 text-amber-400' : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            🎬 Narrativa Visual y Composición
          </button>

          <button
            onClick={() => setSection('exposure')}
            className={`px-3 py-2 border-b-2 font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              section === 'exposure' ? 'border-amber-400 text-amber-400' : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            Paso a Paso 1 a 1 (ISO, WB, Iris, Obt.)
          </button>

          <button
            onClick={() => setSection('lighting')}
            className={`px-3 py-2 border-b-2 font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              section === 'lighting' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            Setups de Iluminación Reales
          </button>

          <button
            onClick={() => setSection('dof')}
            className={`px-3 py-2 border-b-2 font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              section === 'dof' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Aperture className="w-3.5 h-3.5" />
            Profundidad de Campo & Óptica
          </button>

          <button
            onClick={() => setSection('cine')}
            className={`px-3 py-2 border-b-2 font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              section === 'cine' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Cinematografía & Regla 180°
          </button>

          <button
            onClick={() => setSection('monitoring')}
            className={`px-3 py-2 border-b-2 font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              section === 'monitoring' ? 'border-pink-400 text-pink-400' : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Herramientas Blackmagic (Falso Color/Zebras)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs text-zinc-300 leading-relaxed">
          {section === 'framed_ink' && (
            <div className="space-y-4">
              <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-xl space-y-2">
                <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Fundamentos de Dirección Visual: Composición, Energía y Lenguaje Cinematográfico
                </h3>
                <p className="text-zinc-300">
                  La narrativa visual no consiste en colocar objetos en una pantalla; consiste en orquestar el marco, la luz, el contraste y la geometría para despertar una respuesta psicológica inmediata en el espectador antes de que su mente consciente procese la lógica de la escena.
                </p>
              </div>

              {/* Módulo 1 */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-1 flex items-center gap-2">
                  <span className="text-amber-400">Módulo 1:</span> El Lienzo Visual, Escala de Plano y Composición
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-amber-300 text-xs block">1. El Espacio Visual y el Formato (The Frame):</strong>
                    <p className="text-zinc-400">
                      El formato (16:9 widescreen, 2.39:1 scope o 9:16 vertical) define los límites físicos de la historia. No es un recorte casual, sino la primera decisión que impone el peso de las fuerzas de la composición.
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-amber-300 text-xs block">2. La Escala del Plano y Ángulos (The Shot):</strong>
                    <p className="text-zinc-400">
                      El plano general contextualiza; el primer plano penetra en la psicología. El <strong>contrapicado bajo</strong> confiere monumentalidad y poder; el <strong>picado alto</strong> despoja al personaje de control y evoca vulnerabilidad.
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-amber-300 text-xs block">3. Valores Tonales y Siluetas (Value & Contrast):</strong>
                    <p className="text-zinc-400">
                      El negro no es vacío: es una fuerza física que oculta secretos. La prueba de oro de una composición es su <strong>silueta</strong>: si la figura es legible solo por su contorno negro contra la luz, la toma es invencible.
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-amber-300 text-xs block">4. Tercios, Líneas Guía y Capas Espaciales:</strong>
                    <p className="text-zinc-400">
                      Descentrar hacia los tercios genera diálogo con el espacio. Las líneas de fuga guían el ojo del espectador como flechas invisibles. El <em>Dirty Foreground</em> (primer término) crea profundidad ilusoria en una pantalla 2D.
                    </p>
                  </div>
                </div>
              </div>

              {/* Módulo 2 */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-1 flex items-center gap-2">
                  <span className="text-cyan-400">Módulo 2:</span> Dinámica de la Tensión: Energía, Contraste y Escala Épica
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-cyan-300 text-xs block">1. Líneas de Fuerza y Dutch Angle (Energy):</strong>
                    <p className="text-zinc-400">
                      Las horizontales descansan; las diagonales aceleran y desestabilizan. El <strong>plano holandés (Dutch Angle)</strong> rompe la estabilidad mental del espectador, advirtiéndole que el orden se ha quebrado.
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-cyan-300 text-xs block">2. Espacio Negativo y Vacío Psicológico:</strong>
                    <p className="text-zinc-400">
                      Arrinconar al personaje y dejar un abismo de vacío alrededor pesa con una gravedad aplastante. El espacio negativo transmite soledad existencial o una presencia invisible que acecha.
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-cyan-300 text-xs block">3. Contraste Gráfico Extremo & Claroscuro:</strong>
                    <p className="text-zinc-400">
                      Eliminar el relleno convierte el plano en una batalla binaria de blanco y negro puros. Sombras geométricas cortantes que dividen el rostro y la psique del personaje.
                    </p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1">
                    <strong className="text-cyan-300 text-xs block">4. Intimidad Lírica y la Gran Atmósfera Épica:</strong>
                    <p className="text-zinc-400">
                      Desde la extrema fragilidad de una mirada a f/1.4 aislada en terciopelo hasta la monumentalidad anamórfica 2.39:1 donde el ser humano confronta la escala del cosmos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === 'lighting' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-yellow-400">Guía de Setups de Iluminación Estándar en Cine y Retrato</h3>
              <p>
                La fotografía y el cine son literalmente "escribir con luz". No existe cámara sin luz. Conocer los esquemas canónicos permite moldear el volumen de los rostros, la tridimensionalidad y la atmósfera narrativa.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-amber-400 text-sm">1. Iluminación Rembrandt</h4>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Regla:</strong> Luz Principal a 45° lateral y elevada a 35°. Relleno suave opuesto (ratio 4:1 o 3:1).
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Efecto:</strong> Crea el característico <em>triángulo de luz</em> en la mejilla ensombrecida. Añade dramatismo, carácter y volumen clásico.
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-amber-400 text-sm">2. Loop Lighting (Bucle)</h4>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Regla:</strong> Key a 30°-35° a la altura de los ojos o ligeramente superior. Relleno al 50%.
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Efecto:</strong> La sombra de la nariz forma un pequeño bucle apuntando hacia la comisura labial sin cerrarse. Es el esquema más favorecedor para rostros reales.
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-amber-400 text-sm">3. Butterfly / Paramount (Mariposa)</h4>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Regla:</strong> Luz alta en el eje de cámara (0°) y elevada a 45°-50° cenital.
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Efecto:</strong> Genera una pequeña sombra en forma de mariposa bajo la nariz y resalta los pómulos. Famoso en el Hollywood clásico para estrellas de cine.
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-amber-400 text-sm">4. Esquema de 3 Puntos Clásico</h4>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Regla:</strong> Key Light (45°) + Fill Light (315° al 30-40%) + Back/Hair Light (180°).
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Efecto:</strong> La base académica universal de cine y televisión. El backlight despega la figura del fondo y el relleno suaviza las sombras.
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-amber-400 text-sm">5. Luz Suave Envolvente (Técnica Book Light)</h4>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Regla:</strong> Luz potente rebotada en foamcore blanco y luego atravesando seda de difusión.
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Efecto:</strong> La técnica preferida de los directores de fotografía modernos: produce la luz más envolvente y suave posible, con textura de piel perfecta.
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-amber-400 text-sm">6. Short Lighting vs Broad Lighting</h4>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Short Lighting:</strong> La luz ilumina el lado del rostro alejado de la cámara (el lado visible queda en sombra). Adelgaza y añade misterio cinemático.
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Broad Lighting:</strong> La luz ilumina el lado más cercano a cámara. Ensancha visualmente caras delgadas.
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-amber-400 text-sm">7. Clamshell (Belleza / Moda)</h4>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Regla:</strong> Luz superior a 40° cenital y reflector o luz de relleno inferior a -20°.
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Efecto:</strong> Elimina arrugas y sombras de cuello. Genera el codiciado doble reflejo ("catchlight") en los ojos de la modelo.
                  </p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-amber-400 text-sm">8. Split & Low Key (Cine Negro / Drama)</h4>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Split:</strong> Luz dura a 90° lateral. Divide la cara en dos mitades exactas: luz y oscuridad.
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Low Key:</strong> Alto ratio de contraste (8:1 o 12:1), sombras profundas y un único haz de luz selectivo.
                  </p>
                </div>
              </div>
            </div>
          )}
          {section === 'exposure' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-amber-400">
                    Aprende los Parámetros 1 a 1: Tomándote de la Mano Paso a Paso
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Aquí no decimos "mueve tu triángulo y ya". Analizamos cada control de forma 100% individual y aislada:
                  </p>
                </div>
              </div>

              {/* Individual 1-to-1 Subtab Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5 p-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setStepControl('iso')}
                  className={`py-2 px-2 text-center rounded font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                    stepControl === 'iso' ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider">Paso 1</span>
                  <span className="text-xs">ISO / Ruido</span>
                </button>

                <button
                  onClick={() => setStepControl('whiteBalance')}
                  className={`py-2 px-2 text-center rounded font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                    stepControl === 'whiteBalance' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider">Paso 2</span>
                  <span className="text-xs">Balance Blancos (WB)</span>
                </button>

                <button
                  onClick={() => setStepControl('aperture')}
                  className={`py-2 px-2 text-center rounded font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                    stepControl === 'aperture' ? 'bg-yellow-400 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider">Paso 3</span>
                  <span className="text-xs">Diafragma (Iris)</span>
                </button>

                <button
                  onClick={() => setStepControl('shutter')}
                  className={`py-2 px-2 text-center rounded font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                    stepControl === 'shutter' ? 'bg-emerald-500 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider">Paso 4</span>
                  <span className="text-xs">Obturador (180°)</span>
                </button>

                <button
                  onClick={() => setStepControl('focalLength')}
                  className={`py-2 px-2 text-center rounded font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                    stepControl === 'focalLength' ? 'bg-purple-400 text-black shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider">Paso 5</span>
                  <span className="text-xs">Zoom (Focal mm)</span>
                </button>

                <button
                  onClick={() => setStepControl('ev')}
                  className={`py-2 px-2 text-center rounded font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                    stepControl === 'ev' ? 'bg-red-500 text-white shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wider">Paso 6</span>
                  <span className="text-xs">Valor EV & Ley</span>
                </button>
              </div>

              {/* 1-TO-1 DETAILED BREAKDOWN PANELS */}
              {stepControl === 'iso' && (
                <div className="bg-zinc-900 border border-cyan-500/40 p-4 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-500 text-black text-xs font-black flex items-center justify-center">1</span>
                      Sensibilidad ISO: La Ganancia Electrónica del Sensor
                    </h4>
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono border border-cyan-800">
                      Amplitud de Señal vs Relación Señal-Ruido (SNR)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-cyan-300 block">¿Qué es el ISO exactamente?</strong>
                      <p className="text-zinc-400">
                        El ISO <strong>no añade fotones físicos</strong> a la escena. Es un potenciómetro de volumen electrónico que multiplica la débil señal analógica generada por los fotositos del sensor.
                      </p>
                    </div>

                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-amber-300 block">¿Qué le ocurre a la imagen en la pantalla?</strong>
                      <p className="text-zinc-400">
                        A <strong>ISO 100-400</strong> la imagen es limpia, con negros profundos y rango dinámico completo. Al subir a <strong>ISO 3200 o 12800</strong>, la imagen se aclara pero se llena de motas de grano digital (ruido de crominancia y luminancia) y el rango dinámico se reduce drásticamente.
                      </p>
                    </div>
                  </div>

                  <div className="bg-cyan-950/30 p-3.5 rounded-lg border border-cyan-600/30 space-y-1.5">
                    <strong className="text-cyan-200 block text-xs">Regla de Oro del Director de Fotografía para el ISO:</strong>
                    <p className="text-zinc-300 text-[11px]">
                      1. Mantén siempre el ISO en el <strong>valor nativo</strong> (ISO 100 en foto, ISO 400 u 800 en cámaras de cine Blackmagic/ARRI).<br />
                      2. Nunca subas el ISO como primer reflejo para iluminar. Primero enciende focos, abre el diafragma o acerca las luces.<br />
                      3. Sube el ISO únicamente cuando ya hayas abierto la lente al máximo y no puedas reducir la obturación.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block">Día Soleado</span>
                      <strong className="text-cyan-400 text-xs">ISO 100 - 200</strong>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block">Estudio / Cine Base</span>
                      <strong className="text-cyan-400 text-xs">ISO 400 - 800</strong>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block">Noche / Luz Crítica</span>
                      <strong className="text-cyan-400 text-xs">ISO 1600 - 6400</strong>
                    </div>
                  </div>
                </div>
              )}

              {stepControl === 'whiteBalance' && (
                <div className="bg-zinc-900 border border-amber-500/40 p-4 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-black flex items-center justify-center">2</span>
                      Balance de Blancos (WB): Calibración Cromática y Escala Kelvin
                    </h4>
                    <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-800">
                      Temperatura de Color (2700K - 10000K) & Tinte
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-amber-300 block">¿Qué es el Balance de Blancos?</strong>
                      <p className="text-zinc-400">
                        El cerebro humano compensa los cambios de luz automáticamente (una hoja de papel siempre nos parece blanca bajo una bombilla o bajo el sol). El sensor de la cámara no: necesita que le digamos qué temperatura de color Kelvin es el "blanco puro neutro".
                      </p>
                    </div>

                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-yellow-300 block">¿Qué le ocurre a la imagen si te equivocas?</strong>
                      <p className="text-zinc-400">
                        • Si estás al sol (5600K) y fijas la cámara en <strong>3200K</strong>: toda la toma se tiñe de <strong>azul gélido</strong>.<br />
                        • Si estás bajo bombillas de tungsteno (3200K) y fijas <strong>5600K</strong>: toda la toma se tiñe de <strong>naranja ardiente</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-950/30 p-3.5 rounded-lg border border-amber-600/30 space-y-1.5">
                    <strong className="text-amber-200 block text-xs">Paso a Paso para Calibrar en Set:</strong>
                    <p className="text-zinc-300 text-[11px]">
                      1. Identifica la luz dominante del set: ¿es luz día natural (5600K) o bombillas de tungsteno cálidas (3200K)?<br />
                      2. Coloca una <strong>carta gris del 18%</strong> en el lugar donde estará la cara del actor.<br />
                      3. Ajusta el valor Kelvin hasta que los tres canales del histograma RGB coincidan en el centro neutro.<br />
                      4. Usa el <strong>Tinte (Tint)</strong> para compensar dominantes verdes (tubos fluorescentes) o magentas (LEDs baratos).
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block">Vela / Fuego</span>
                      <strong className="text-amber-400 text-xs">2000K - 2800K</strong>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block">Tungsteno / Interior</span>
                      <strong className="text-amber-400 text-xs">3200K</strong>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block">Sol al Mediodía</span>
                      <strong className="text-amber-400 text-xs">5600K</strong>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block">Sombra / Nublado</span>
                      <strong className="text-amber-400 text-xs">6500K - 8000K</strong>
                    </div>
                  </div>
                </div>
              )}

              {stepControl === 'aperture' && (
                <div className="bg-zinc-900 border border-yellow-500/40 p-4 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-base font-bold text-yellow-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-yellow-400 text-black text-xs font-black flex items-center justify-center">3</span>
                      Apertura de Diafragma (f-stop / Iris): El Cono Óptico de Luz
                    </h4>
                    <span className="text-[10px] bg-yellow-950 text-yellow-300 px-2 py-0.5 rounded font-mono border border-yellow-800">
                      Cantidad de Fotones + Profundidad de Campo (DoF)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-yellow-300 block">La Paradoja de los Números f:</strong>
                      <p className="text-zinc-400">
                        El número f es una fracción matemática (1/f). Por tanto: <strong>un número pequeño (f/1.4) significa una apertura ENORME</strong> que inunda el sensor de luz; un número grande (f/16) significa un orificio microscópico que apenas deja pasar luz.
                      </p>
                    </div>

                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-amber-300 block">El Doble Efecto en la Imagen:</strong>
                      <p className="text-zinc-400">
                        1. <strong>Luz:</strong> Cada paso f (f/1.4 → f/2.0 → f/2.8 → f/4) reduce la luz exactamente a la mitad.<br />
                        2. <strong>Profundidad de Campo:</strong> A f/1.4 solo los ojos del sujeto quedan nítidos y el fondo se desvanece en crema (bokeh). A f/11 todo el paisaje está enfocado.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-950/30 p-3.5 rounded-lg border border-yellow-600/30 space-y-1.5">
                    <strong className="text-yellow-200 block text-xs">Cuidado con la Difracción Óptica:</strong>
                    <p className="text-zinc-300 text-[11px]">
                      Muchos principiantes piensan: <em>"Cierro a f/22 o f/32 para tener la máxima nitidez posible"</em>. <strong>¡ERROR FATAL!</strong> Al obligar a las ondas de luz a pasar por un orificio diminuto, chocan contra los bordes de las palas y se dispersan (patrón de Airy), haciendo que toda la imagen pierda nitidez y contraste. El punto dulce de máxima resolución está entre <strong>f/4 y f/8</strong>.
                    </p>
                  </div>
                </div>
              )}

              {stepControl === 'shutter' && (
                <div className="bg-zinc-900 border border-emerald-500/40 p-4 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-black text-xs font-black flex items-center justify-center">4</span>
                      Obturador (Shutter Speed & Ángulo de Obturación): Tiempo y Movimiento
                    </h4>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-800">
                      La Sagrada Regla de los 180° en Cinematografía
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-emerald-300 block">¿Qué hace el Obturador?</strong>
                      <p className="text-zinc-400">
                        Determina durante cuántas fracciones de segundo el sensor registra la luz para cada fotograma. Controla dos cosas: la cantidad de luz capturada y el desenfoque de movimiento (motion blur).
                      </p>
                    </div>

                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-teal-300 block">Congelar Acción vs Barrido Creativo:</strong>
                      <p className="text-zinc-400">
                        • <strong>1/1000s o 1/4000s:</strong> Congela cualquier gota de agua o deportista en el aire con bordes hiper-nítidos.<br />
                        • <strong>1/15s o 1/2s:</strong> Registra estelas de luz de coches o agua sedosa en cascadas.
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-950/30 p-3.5 rounded-lg border border-emerald-600/30 space-y-1.5">
                    <strong className="text-emerald-200 block text-xs">La Regla de los 180° en Cine Explicada:</strong>
                    <p className="text-zinc-300 text-[11px]">
                      En cine nunca cambiamos la obturación para arreglar la luz. Fijamos siempre el ángulo de obturador a <strong>180°</strong>, lo que equivale a una velocidad de obturación igual al doble de los fotogramas por segundo (FPS):<br />
                      <strong>Velocidad = 1 / (2 × FPS)</strong>. Ejemplo: a 24 fps = <strong>1/48s (o 1/50s)</strong>.<br />
                      Esto produce el desenfoque de movimiento fisiológicamente idéntico al ojo humano.
                    </p>
                  </div>
                </div>
              )}

              {stepControl === 'focalLength' && (
                <div className="bg-zinc-900 border border-purple-500/40 p-4 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-base font-bold text-purple-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-500 text-black text-xs font-black flex items-center justify-center">5</span>
                      Distancia Focal (Lente Zoom en mm): Perspectiva y Compresión
                    </h4>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-mono border border-purple-800">
                      Ángulo de Visión (FOV) y Bokeh Magnificado
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-purple-300 block">¿Qué cambia de 24mm a 200mm?</strong>
                      <p className="text-zinc-400">
                        • <strong>Gran angular (16-28mm):</strong> Ángulo muy abierto. Estira la perspectiva, aleja el fondo y deforma rostros cercanos (nariz grande).<br />
                        • <strong>Normal (50mm):</strong> Proporciones idénticas a la visión natural del ojo humano.<br />
                        • <strong>Teleobjetivo (85-200mm):</strong> Ángulo estrecho. Aplana y favorece rostros, comprime el fondo contra el sujeto y agranda el bokeh.
                      </p>
                    </div>

                    <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-1">
                      <strong className="text-pink-300 block">El Secreto del Desenfoque Teleobjetivo:</strong>
                      <p className="text-zinc-400">
                        Un objetivo de 135mm o 200mm produce una separación de planos monumental incluso a f/4, porque magnifica los discos de desenfoque del fondo respecto al encuadre.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {stepControl === 'ev' && (
                <div className="bg-zinc-900 border border-red-500/40 p-4 rounded-xl space-y-3.5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h4 className="text-base font-bold text-red-400 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center">6</span>
                      El Valor EV (Exposure Value) y la Ley de Reciprocidad
                    </h4>
                    <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded font-mono border border-red-800">
                      Cómo Conectar Todo Sin Romperte la Cabeza
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-300">
                    Ahora que conoces cada control de forma 1 a 1, unirlos es matemática pura y sencilla. <strong>1 Stop (1 EV)</strong> equivale exactamente a duplicar o cortar a la mitad la luz física.
                  </p>

                  <div className="bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800 space-y-2 text-[11px]">
                    <strong className="text-zinc-200 block">Ejemplo Práctico de Reciprocidad en Rodaje:</strong>
                    <p className="text-zinc-400">
                      Imagina que tu exposímetro marca <strong>0.0 EV (exposición perfecta)</strong> con: <code className="text-amber-400">f/2.8 • 1/50s • ISO 400</code>.<br />
                      Si decides cerrar a <strong>f/5.6</strong> para que el segundo actor también esté en foco (has cerrado <strong>2 stops</strong> de luz), para que la toma no se quede oscura tienes dos opciones exactas:<br />
                      • Opción A: Subir el ISO 2 stops (de 400 a 1600).<br />
                      • Opción B: Aumentar la potencia de tus focos Key Light y Fill Light al cuádruple (+2 EV de luz física).
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {section === 'dof' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-emerald-400">Profundidad de Campo, Círculo de Confusión e Hiperfocal</h3>
              <p>
                La profundidad de campo (DoF) es la zona por delante y por detrás del plano de enfoque que se percibe aceptablemente nítida en la imagen final.
              </p>

              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-2">
                <h4 className="font-bold text-zinc-200">Factores físicos que controlan la DoF:</h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px]">
                  <li><strong>Apertura del diafragma:</strong> A mayor apertura (f/1.4), menor DoF y fondo más desenfocado. A menor apertura (f/16), mayor DoF.</li>
                  <li><strong>Distancia al sujeto:</strong> Cuanto más cerca esté la cámara del sujeto, menor será la profundidad de campo disponible.</li>
                  <li><strong>Distancia focal de la lente:</strong> Lentes teleobjetivo (85mm, 135mm, 200mm) comprimen el fondo y generan una DoF aparente mucho más reducida que un gran angular (24mm).</li>
                  <li><strong>Tamaño del sensor:</strong> Sensores más grandes (Full Frame) necesitan lentes de mayor distancia focal para el mismo encuadre, produciendo menor DoF que sensores micro 4/3 o 1 pulgada.</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <strong className="text-purple-300 block mb-1">Distancia Hiperfocal:</strong>
                  <p className="text-[11px] text-zinc-400">
                    Fórmula: <code className="text-zinc-200">H = f² / (N · c) + f</code>. Es el punto de enfoque exacto que maximiza la profundidad de campo, haciendo que todo sea nítido desde H/2 hasta el infinito. Fundamental para paisaje y documental.
                  </p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <strong className="text-amber-300 block mb-1">Peligro de Difracción Óptica:</strong>
                  <p className="text-[11px] text-zinc-400">
                    Cerrar a f/22 o f/32 no siempre da más nitidez. Al pasar por orificios diminutos, las ondas de luz se curvan formando los anillos de Airy, suavizando todo el fotograma. El punto dulce de la mayoría de objetivos está entre f/4 y f/8.
                  </p>
                </div>
              </div>
            </div>
          )}

          {section === 'cine' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-cyan-400">Cinematografía: La Regla de los 180° y Cuadros por Segundo</h3>
              <p>
                En cine clásico y cámaras digitales Blackmagic URSA / Cinema Camera, el tiempo de obturación a menudo se expresa como un <strong>ángulo de obturador rotatorio</strong>.
              </p>

              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-2">
                <h4 className="font-bold text-zinc-200">La Regla de los 180° (180 Degree Shutter Rule):</h4>
                <p className="text-[11px] text-zinc-400">
                  Para que el movimiento se sienta humano y natural a 24 fotogramas por segundo, el obturador debe estar abierto durante medio fotograma (180 grados).
                </p>
                <div className="bg-zinc-950 p-2.5 rounded font-mono text-cyan-300 text-xs">
                  Tiempo de exposición = Ángulo / (360° × FPS)
                  <br />
                  Ejemplo a 24 fps: 180° / (360° × 24) = 1/48 de segundo
                  <br />
                  Ejemplo a 60 fps: 180° / (360° × 60) = 1/120 de segundo
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <strong className="text-emerald-300 block mb-1">Overcranking (Cámara Lenta):</strong>
                  <p className="text-[11px] text-zinc-400">
                    Disparar a 60 o 120 fps en el sensor pero reproducir a 24 fps en el proyecto. Crea un efecto de slow-motion suave sin interpolación de software.
                  </p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <strong className="text-red-300 block mb-1">Undercranking (Cámara Rápida):</strong>
                  <p className="text-[11px] text-zinc-400">
                    Disparar a 12 o 8 fps para que al reproducir a 24 fps todo se mueva a ritmo frenético de comedia muda o aceleración de tráfico.
                  </p>
                </div>
              </div>
            </div>
          )}

          {section === 'monitoring' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-pink-400">Herramientas Profesionales de Exposición Blackmagic</h3>
              <p>
                Las cámaras de cine no tienen pantallas con histogramas automáticos del móvil; utilizan herramientas profesionales de precisión quirúrgica:
              </p>

              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg space-y-3">
                <h4 className="font-bold text-zinc-200">1. Falso Color (False Color IRE Scale):</h4>
                <p className="text-[11px] text-zinc-400">
                  Colorea cada nivel de luminancia de acuerdo a la escala estándar de cine:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-purple-600 rounded"></span> Púrpura (0-2%): Negro empastado</div>
                  <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-blue-600 rounded"></span> Azul (15%): Detalle en sombras</div>
                  <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-green-500 rounded"></span> Verde (38%): Gris neutro 18%</div>
                  <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-pink-400 rounded"></span> Rosa (65%): Tono de piel óptimo</div>
                  <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-yellow-400 rounded"></span> Amarillo (85%): Cerca de quemar</div>
                  <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 bg-red-600 rounded"></span> Rojo (100%): Altas luces quemadas</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <strong className="text-red-400 block mb-1">2. Cebras (Zebra Stripes):</strong>
                  <p className="text-[11px] text-zinc-400">
                    Proyecta franjas diagonales en tiempo real sobre las partes que superan un umbral (por ejemplo, 100% para evitar recortar nubes o 75% para monitorizar rostros).
                  </p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  <strong className="text-emerald-400 block mb-1">3. Focus Peaking (Ayuda de Enfoque):</strong>
                  <p className="text-[11px] text-zinc-400">
                    Dibuja líneas verdes brillantes alrededor de los bordes con alto contraste de frecuencia, permitiendo al foquista saber exactamente qué plano está nítido sin mirar la escala métrica.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-zinc-900 border-t border-zinc-800 px-5 py-2.5 flex items-center justify-between text-xs text-zinc-400">
          <span>Manual de Entrenamiento para Estudiantes de Cine y Fotografía</span>
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-1 rounded font-bold transition cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
