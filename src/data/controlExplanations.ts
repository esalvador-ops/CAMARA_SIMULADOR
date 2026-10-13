export interface ControlHelpData {
  id: string;
  name: string;
  category: 'Cámara & Óptica' | 'Triángulo de Exposición' | 'Iluminación 360°' | 'Monitorización Cine' | 'Gramática y Dirección de Fotografía' | 'Dirección de Fotografía y Arte';
  whatIsIt: string;
  visualEffect: string;
  whyItHappens: string;
  goldenRule: string;
  exampleValues: string;
}

export const CONTROL_EXPLANATIONS: Record<string, ControlHelpData> = {
  aperture: {
    id: 'aperture',
    name: 'Diafragma / Apertura (f-stop / Iris)',
    category: 'Triángulo de Exposición',
    whatIsIt: 'Es el orificio circular dentro del objetivo que se abre o cierra para regular la cantidad de luz que pasa hacia el sensor.',
    visualEffect: '1) Luz: Cada paso hacia un número f menor duplica la luz. 2) Profundidad de campo (DoF): f/1.4 desenfoca totalmente el fondo creando bokeh cremoso; f/16 enfoca todo el plano pero introduce suavidad por difracción.',
    whyItHappens: 'El número f es la relación entre la distancia focal y el diámetro pupilar de entrada (f = F/D). A mayor orificio (f/1.4), el cono de luz incidente converge en un ángulo más abierto, haciendo que solo un estrecho plano de distancia produzca círculos de confusión nítidos.',
    goldenRule: 'Para retratos cinemáticos usa f/1.4 a f/2.8 para separar al sujeto. Para paisajes usa f/5.6 a f/11. Evita f/22 o f/32 porque la difracción óptica arruina el micro-contraste.',
    exampleValues: 'f/1.4 (bokeh suave, mucha luz) • f/5.6 (punto dulce de nitidez) • f/16 (gran profundidad de campo)',
  },

  shutter: {
    id: 'shutter',
    name: 'Velocidad y Ángulo de Obturación (Shutter Speed / Angle)',
    category: 'Triángulo de Exposición',
    whatIsIt: 'Es el tiempo exacto durante el cual el sensor permanece expuesto a la luz para capturar un fotograma.',
    visualEffect: '1) Exposición: Tiempos lentos (1/25s) dejan entrar mucha luz; tiempos rápidos (1/2000s) oscurecen. 2) Movimiento: 1/1000s congela cualquier acción en el aire; 1/25s produce barridos de movimiento (motion blur).',
    whyItHappens: 'En cine se mide tradicionalmente en grados (°): 180° equivale a exponer durante la mitad del ciclo del fotograma (a 24fps = 1/48s). Tiempos más largos acumulan la trayectoria de los objetos en movimiento sobre el sensor.',
    goldenRule: 'Regla de los 180° en Cine: La velocidad de obturación debe ser el doble de los fps del proyecto (ej. a 24fps = 1/48s o 1/50s) para que el movimiento sea natural. Para congelar deportes usa 1/1000s o más.',
    exampleValues: '1/48s (180° a 24p, cine natural) • 1/1000s (congelar atletas o agua) • 1/15s (barrido creativo)',
  },

  iso: {
    id: 'iso',
    name: 'Sensibilidad ISO / Ganancia del Sensor',
    category: 'Triángulo de Exposición',
    whatIsIt: 'Es la amplificación electrónica de la señal capturada por los fotositos del sensor digital.',
    visualEffect: 'Subir el ISO aclara la imagen en entornos oscuros, pero a partir de ISO 800-1600 introduce ruido cromático (puntos de colores) y grano digital en las sombras, reduciendo el rango dinámico.',
    whyItHappens: 'El sensor no capta más fotones físicos al subir el ISO; simplemente amplifica la señal eléctrica débil junto con el ruido térmico y de lectura de fondo del circuito integrado.',
    goldenRule: 'Mantén siempre el ISO en el valor nativo de tu cámara (ej. ISO 100 en foto, ISO 400 u 800 en Blackmagic). Sube el ISO solo cuando ya hayas abierto la máxima apertura física del lente y no puedas bajar más la obturación.',
    exampleValues: 'ISO 100 (máxima pureza y rango dinámico) • ISO 800 (estándar cine) • ISO 6400+ (ruido alto)',
  },

  focalLength: {
    id: 'focalLength',
    name: 'Distancia Focal de la Lente (Zoom / mm)',
    category: 'Cámara & Óptica',
    whatIsIt: 'Es la distancia óptica (en milímetros) desde el centro óptico del objetivo hasta el plano del sensor cuando el foco está al infinito.',
    visualEffect: 'Controla el ángulo de visión (FOV) y la compresión de planos: 16mm da un gran angular amplio; 50mm es similar a la visión humana; 85mm-200mm comprime la distancia entre sujeto y fondo y magnifica el tamaño del bokeh.',
    whyItHappens: 'Las focales largas magnifican los detalles lejanos, haciendo que el fondo parezca estar mucho más cerca del sujeto de lo que realmente está.',
    goldenRule: 'Para retratos favorecedores usa entre 85mm y 135mm (no deforma la nariz ni orejas). Para paisajes y arquitectura usa 16mm a 24mm.',
    exampleValues: '24mm (Gran angular / plano general) • 50mm (Normal) • 85mm (Retrato clásico) • 200mm (Teleobjetivo)',
  },

  focusDistance: {
    id: 'focusDistance',
    name: 'Plano de Enfoque Manual (Anillo de Foco)',
    category: 'Cámara & Óptica',
    whatIsIt: 'La distancia exacta en metros medida desde el sensor donde los rayos de luz convergen en un punto matemáticamente perfecto.',
    visualEffect: 'Determina qué elemento de la escena se ve nítido y cuáles quedan desenfocados por delante y por detrás.',
    whyItHappens: 'Al girar el anillo de enfoque, los elementos de cristal del objetivo se desplazan físicamente hacia adelante o atrás para cambiar el punto focal conjugado.',
    goldenRule: 'En retratos de cine y foto, el foco crítico debe estar siempre clavado en los ojos del sujeto. Usa el botón "PEAK" (Focus Peaking) para confirmar que los bordes del ojo brillen en verde.',
    exampleValues: '0.8m (primer plano) • 2.2m (sujeto de pie) • 15m (fondo) • ∞ (infinito)',
  },

  subjectDistance: {
    id: 'subjectDistance',
    name: 'Distancia de la Cámara al Sujeto',
    category: 'Cámara & Óptica',
    whatIsIt: 'La distancia física real entre la cámara y la persona o elemento que estás fotografiando.',
    visualEffect: 'Cuanto más cerca esté la cámara del sujeto, menor será la profundidad de campo resultante, haciendo que el fondo se desenfoque mucho más agresivamente.',
    whyItHappens: 'La fórmula de profundidad de campo depende cuadráticamente de la distancia. A distancias cortas, los rayos divergen más bruscamente fuera del plano focal.',
    goldenRule: 'Si no tienes un objetivo caro de f/1.4, acércate físicamente a tu sujeto y separa a este del fondo para maximizar el desenfoque bokeh sin gastar dinero.',
    exampleValues: '1.5m (plano medio corto) • 3.0m (plano americano) • 6.0m (plano general)',
  },

  backgroundDistance: {
    id: 'backgroundDistance',
    name: 'Distancia del Sujeto al Fondo',
    category: 'Cámara & Óptica',
    whatIsIt: 'La separación física en metros entre el sujeto principal y la pared o elementos del fondo.',
    visualEffect: 'A mayor separación entre el sujeto y el fondo, más grande y difuminado será el disco de bokeh proyectado en el fondo.',
    whyItHappens: 'Los puntos de luz del fondo se proyectan en el sensor como círculos de confusión gigantescos al estar muy lejos del plano focal conjugado.',
    goldenRule: 'Nunca pegues a tu actor contra la pared. Separa al sujeto al menos 3 a 5 metros del fondo para crear sensación de profundidad tridimensional.',
    exampleValues: '2m (fondo cercano) • 15m (calle/árboles) • 100m+ (montañas/infinito)',
  },

  whiteBalance: {
    id: 'whiteBalance',
    name: 'Balance de Blancos (White Balance / Kelvin)',
    category: 'Cámara & Óptica',
    whatIsIt: 'Calibración de la temperatura de color de la luz para que los objetos blancos se registren como blanco puro y neutro.',
    visualEffect: 'Si fijas 3200K bajo luz solar de 5600K, la imagen queda intensamente azul (fría). Si fijas 7500K bajo bombillas de tungsteno, la imagen queda intensamente naranja (cálida).',
    whyItHappens: 'Diferentes fuentes de luz emiten espectros con diferentes temperaturas Kelvin (vela: 2000K, tungsteno: 3200K, sol: 5600K, sombra: 7500K). El procesador compensa aplicando una matriz de multiplicación en los canales rojo y azul.',
    goldenRule: 'Haz coincidir el Kelvin de tu cámara con la luz del set para obtener colores reales, o ajusta intencionalmente para crear atmósferas (más cálido para intimidad, más frío para melancolía o noche).',
    exampleValues: '3200K (Tungsteno/Interiores) • 5600K (Luz solar día) • 7500K (Sombra exterior)',
  },

  sensorFormat: {
    id: 'sensorFormat',
    name: 'Formato del Sensor y Factor de Recorte (Crop Factor)',
    category: 'Cámara & Óptica',
    whatIsIt: 'El tamaño físico del sensor digital comparado con el estándar histórico del negativo de 35mm (Full Frame 36x24mm).',
    visualEffect: 'Sensores más pequeños (Super 35: 1.5x, Micro 4/3: 2.0x) multiplican la distancia focal equivalente (un 50mm se comporta como un 100mm en MFT) y aumentan la profundidad de campo con respecto al encuadre.',
    whyItHappens: 'Un sensor pequeño capta solo la porción central del círculo de imagen proyectado por el objetivo.',
    goldenRule: 'En cine, el sensor Super 35mm es el formato rey histórico (Blackmagic URSA, ARRI Alexa). El Full Frame ofrece el mayor desenfoque y campo visual gran angular.',
    exampleValues: 'Full Frame (Crop 1.0x) • Super 35 (Crop 1.5x) • Micro 4/3 (Crop 2.0x)',
  },

  falseColor: {
    id: 'falseColor',
    name: 'Falso Color (Herramienta Profesional de Exposición IRE)',
    category: 'Monitorización Cine',
    whatIsIt: 'Una superposición cromática que sustituye la imagen por 6 colores estándar según los valores de luminancia del estándar cinematográfico.',
    visualEffect: 'Púrpura (0-2%): negros empastados sin detalle. Azul (15%): sombras. Verde (38%): gris neutro del 18%. Rosa (65%): TONO ÓPTIMO DE PIEL. Amarillo (85%): aviso de altas luces. Rojo (100%): píxeles quemados irrecuperables.',
    whyItHappens: 'El ojo humano se engaña fácilmente con el brillo del monitor. El Falso Color muestra valores matemáticos puros independientemente de la calibración de la pantalla.',
    goldenRule: 'Al iluminar a un actor, ajusta la luz y cámara para que sus mejillas y frente se tiñan de ROSA. Si se tiñen de amarillo o rojo, estás sobreexponiendo.',
    exampleValues: 'Piel perfecta = Rosa (60-70 IRE) • Gris 18% = Verde • Alerta = Rojo',
  },

  zebra: {
    id: 'zebra',
    name: 'Patrón de Cebra (Zebra Stripes)',
    category: 'Monitorización Cine',
    whatIsIt: 'Líneas diagonales rayadas animadas que aparecen sobre las áreas del encuadre que superan un umbral de brillo predeterminado.',
    visualEffect: 'Si configuras 95% o 100%, verás rayas de advertencia sobre nubes quemadas, faros de coches o reflejos metálicos que están perdiendo detalle.',
    whyItHappens: 'Detecta cuando los fotositos del sensor han alcanzado o están a punto de alcanzar el punto de saturación máxima.',
    goldenRule: 'Abre el diafragma hasta que aparezca la cebra en la parte más brillante de la escena, y luego ciérralo ligeramente hasta que desaparezca (ETTR seguro).',
    exampleValues: '75% (para monitorizar tonos de piel) • 95% (para preservar altas luces) • 100% (alerta de recorte total)',
  },

  peaking: {
    id: 'peaking',
    name: 'Focus Peaking (Ayuda de Enfoque Crítico)',
    category: 'Monitorización Cine',
    whatIsIt: 'Un algoritmo de detección de bordes de alta frecuencia que dibuja un contorno de color verde o rojo sobre los elementos perfectamente enfocados.',
    visualEffect: 'Te permite ver de un vistazo si las pestañas, el pelo o el texto de un objeto están 100% nítidos sin tener que adivinar.',
    whyItHappens: 'Calcula el gradiente espacial de contraste entre píxeles adyacentes; el contraste máximo solo ocurre en el plano de enfoque exacto.',
    goldenRule: 'Activa siempre el Peaking al mover el anillo de enfoque manual. En cuanto veas los contornos verdes brillar sobre los ojos del sujeto, sabes que estás en foco.',
    exampleValues: 'Verde neón (alta visibilidad) • Rojo (para fondos fríos) • Azul (para escenas cálidas)',
  },

  lightAngle: {
    id: 'lightAngle',
    name: 'Ángulo Orbital 360° de la Luz',
    category: 'Iluminación 360°',
    whatIsIt: 'La posición angular del foco alrededor del sujeto: 0° es frontal junto a la cámara, 45° es tres cuartos, 90° es lateral puro, y 180° es contraluz trasero.',
    visualEffect: 'Define la dirección de las sombras y el volumen tridimensional del personaje: una luz a 45° crea sombras suaves y modelado facial; una luz a 180° crea un halo de recorte (rim light) en el pelo.',
    whyItHappens: 'La luz viaja en línea recta; la forma tridimensional del rostro bloquea la luz produciendo sombras propias y arrojadas según el vector incidente.',
    goldenRule: 'Nunca pongas la luz principal plana a 0° salvo para estilo comercial de catálogo o glamour. Los 45° (Rembrandt/Loop) son el estándar de oro del cine.',
    exampleValues: '45° (Luz principal / Key) • 300° (Luz de relleno / Fill) • 165° (Luz de contra / Rim)',
  },

  lightIntensity: {
    id: 'lightIntensity',
    name: 'Intensidad y Dimmer del Foco (Watts / %)',
    category: 'Iluminación 360°',
    whatIsIt: 'La potencia lumínica entregada por la fuente en vatios (ej. 300W o 600W de un foco Aputure LED) regulada de 0 a 100%.',
    visualEffect: 'Aumenta los lux que bañan al sujeto, subiendo la exposición global del set y alterando el ratio de contraste entre luces y sombras.',
    whyItHappens: 'La iluminancia en el sujeto depende de la potencia y decae rápidamente con el cuadrado de la distancia (Ley inversa del cuadrado: al doble de distancia, la luz se reduce a 1/4).',
    goldenRule: 'Primero coloca tu luz principal a la potencia deseada para dar el tono a la escena; luego ajusta la luz de relleno a una potencia menor (ej. 25% a 50%) para controlar la profundidad de las sombras.',
    exampleValues: 'Key: 80% (600W) • Fill: 30% (300W) • Rim: 60% (300W)',
  },

  lightModifier: {
    id: 'lightModifier',
    name: 'Modificador de Luz (Softbox vs Fresnel Spot)',
    category: 'Iluminación 360°',
    whatIsIt: 'El accesorio óptico montado frente al foco: Softbox (ventana difusora), Fresnel (lente concentradora puntual) o Lantern.',
    visualEffect: 'El Softbox produce sombras suaves y transiciones graduales en la piel (ideal belleza y drama). El Fresnel Spot produce sombras duras y definidas con alto contraste (ideal cine negro o sol directo).',
    whyItHappens: 'Cuanto más grande sea el tamaño relativo de la fuente de luz respecto al sujeto, más suaves serán los bordes de las sombras (penumbra ancha).',
    goldenRule: 'Para rostros humanos casi siempre preferirás fuentes grandes y difusas (Softbox o Book Light). Usa luz dura solo para siluetas, dramatismo agresivo o efectos de sol.',
    exampleValues: 'Softbox (transición suave) • Fresnel Directo (sombra cortante) • Lantern (360° envolvente)',
  },

  lightMode: {
    id: 'lightMode',
    name: 'Modo CCT (Temperatura) vs Modo RGB Gel',
    category: 'Iluminación 360°',
    whatIsIt: 'La capacidad de los focos de cine modernos de variar su espectro entre luz blanca calibrada (CCT en Kelvin) o cualquier color del círculo cromático (RGB).',
    visualEffect: 'CCT emula fuentes naturales (velas de 2200K, bombillas de 3200K o sol de 5600K). RGB tiñe la piel y el set con colores vibrantes (cian, magenta, rojo).',
    whyItHappens: 'Los chips LED RGBWW mezclan diodos blanco cálido, blanco frío, rojo, verde y azul con alta fidelidad de color (CRI/TLCI > 96).',
    goldenRule: 'Para cine realista mantén Key y Fill en CCT. Usa RGB para luces de contra (kickers) o luces prácticas de fondo para dar contraste cromático a la escena.',
    exampleValues: 'CCT 5600K (Luz día neutra) • CCT 3200K (Luz tungsteno cálida) • RGB Cian #00e5ff (Estilo moderno)',
  },

  histogram: {
    id: 'histogram',
    name: 'Histograma RGB y Técnica ETTR',
    category: 'Monitorización Cine',
    whatIsIt: 'Un gráfico de barras que representa la distribución estadística de los píxeles desde el negro absoluto (0) a la izquierda hasta el blanco puro (255) a la derecha.',
    visualEffect: 'Permite saber si una escena está oscura (montaña pegada a la izquierda), sobreexpuesta (pegada a la derecha) o equilibrada en medios tonos.',
    whyItHappens: 'Mide matemáticamente los niveles de cuantificación digital del sensor tras la conversión analógica a digital.',
    goldenRule: 'Técnica ETTR (Exposing to the right): Empuja la información hacia la derecha del histograma tanto como sea posible SIN que la curva toque la pared derecha de 255. Esto maximiza la relación señal-ruido del sensor.',
    exampleValues: 'Pared izquierda = Sombras empastadas • Centro = Medios tonos • Pared derecha = Clipping blanco',
  },

  ev: {
    id: 'ev',
    name: 'Valor de Exposición (EV / APEX Delta)',
    category: 'Triángulo de Exposición',
    whatIsIt: 'El equilibrio matemático exacto entre la luz que emite el set (ambiente + focos de estudio) y los parámetros que has fijado en tu cámara (f-stop, obturación e ISO).',
    visualEffect: '0.0 EV indica exposición equilibrada. Valores negativos (-1.0 a -3.0 EV) oscurecen la imagen hasta el negro empastado. Valores positivos (+1.0 a +3.0 EV) lavan la imagen y queman las altas luces.',
    whyItHappens: 'Calculado mediante el sistema APEX: cada unidad de EV representa exactamente 1 stop (duplicación o reducción al 50% de los fotones captados).',
    goldenRule: 'Busca siempre 0.0 EV para tonos neutros. En cine dramático puedes subexponer intencionalmente -1.0 EV para crear misterio, o sobreexponer +0.7 EV si grabas en curva LOG para comprimir el ruido en sombras tras la corrección de color.',
    exampleValues: '0.0 EV (Neutro) • -1.5 EV (Low Key dramático) • +1.0 EV (High Key luminoso)',
  },

  tint: {
    id: 'tint',
    name: 'Tinte de Color (Eje Verde vs Magenta)',
    category: 'Cámara & Óptica',
    whatIsIt: 'El ajuste fino complementario a los grados Kelvin que corrige desviaciones cromáticas en el eje ortogonal: Verde (Green) vs Magenta.',
    visualEffect: 'Valores negativos añaden un tono verdoso (emulando tubos fluorescentes baratos o películas de celuloide antiguas); valores positivos añaden magenta para compensar dominantes verdes indeseadas.',
    whyItHappens: 'Los sensores Bayer poseen el doble de fotositos verdes (RGGB). Las fuentes de luz como tubos fluorescentes o LEDs de bajo CRI tienen picos o caídas en la longitud de onda de 540nm.',
    goldenRule: 'Mantén el tinte en 0 con iluminación cinematográfica de alto CRI. Si la piel de tu actor luce cadavérica o verdosa, añade +5 a +15 de tinte magenta.',
    exampleValues: '-30 (Verde / estética Matrix) • 0 (Equilibrado neutro) • +20 (Magenta / corrección cálida)',
  },

  fps: {
    id: 'fps',
    name: 'Frecuencia de Cuadros (FPS de Proyecto y Sensor)',
    category: 'Monitorización Cine',
    whatIsIt: 'La cantidad de fotogramas capturados y reproducidos por segundo. En cine digital profesional puedes desacoplar los FPS de grabación del sensor de los FPS de base del proyecto.',
    visualEffect: '24 fps produce la cadencia y desenfoque cinemático clásico. Grabar a 60 fps o 120 fps y reproducir a 24 fps genera una cámara lenta fluida y cinematográfica (slow motion).',
    whyItHappens: 'La persistencia retiniana del ojo humano percibe movimiento continuo a partir de ~16-18 fps. 24 fps se estandarizó en 1927 con la llegada del cine sonoro para sincronizar el audio.',
    goldenRule: 'Fija el proyecto en 24 fps. Para cámara lenta, sube los FPS del sensor (ej. 60 o 120 fps) y recuerda duplicar la velocidad de obturación (regla de los 180°: a 60fps debes obturar al menos a 1/120s).',
    exampleValues: '24p (Cine estándar) • 25p / 50p (Televisión PAL Europa) • 60p / 120p (Cámara lenta)',
  },

  codec: {
    id: 'codec',
    name: 'Códec de Grabación (ProRes / Blackmagic RAW)',
    category: 'Monitorización Cine',
    whatIsIt: 'El formato de codificación y compresión con el que la cámara guarda los datos de imagen en las tarjetas de memoria (CFast o SD).',
    visualEffect: 'ProRes 422 HQ ofrece calidad de emisión con compresión intraframe lista para editar. ProRes 4444 XQ o RAW preserva la máxima gradación cromática (12 bits) sin artefactos de compresión en degradados.',
    whyItHappens: 'Los datos brutos del sensor generan gigabytes por segundo. Los códecs profesionales comprimen matemáticamente usando submuestreo de croma (4:2:2 vs 4:2:0) y cuantificación de 10 o 12 bits.',
    goldenRule: 'Para rodajes con entrega rápida usa ProRes 422 HQ. Para ficción y etalonaje intensivo en DaVinci Resolve usa Blackmagic RAW o ProRes 4444.',
    exampleValues: 'ProRes 422 HQ (10-bit estándar) • ProRes 4444 (12-bit cine) • BRAW 3:1 (RAW sin pérdida)',
  },

  resolution: {
    id: 'resolution',
    name: 'Resolución de Sensor y Salida',
    category: 'Monitorización Cine',
    whatIsIt: 'El número total de píxeles horizontales y verticales que componen el cuadro capturado (ej. 3840x2160 Ultra HD o 4096x2160 DCI 4K).',
    visualEffect: 'Mayor resolución ofrece una textura más nítida, permite reencuadrar y estabilizar en postproducción sin perder calidad de entrega final.',
    whyItHappens: 'La densidad de fotositos del sensor físico determina el límite de Nyquist de resolución espacial antes de que aparezca aliasing.',
    goldenRule: 'Graba en 4K UHD o 4K DCI aunque tu entrega final sea en 1080p: esto genera una imagen sobremuestreada mucho más limpia y libre de ruido.',
    exampleValues: '1920x1080 (Full HD) • 3840x2160 (Ultra HD 16:9) • 4096x2160 (4K DCI Cine)',
  },

  shutterTrigger: {
    id: 'shutterTrigger',
    name: 'Disparador de Foto y Obturador',
    category: 'Triángulo de Exposición',
    whatIsIt: 'El botón mecánico que acciona la apertura y cierre del obturador para capturar un instante fotográfico congelado en el tiempo.',
    visualEffect: 'Guarda una instantánea con todos los parámetros ópticos, desenfoques reales calculados y esquema de iluminación en la Galería del simulador.',
    whyItHappens: 'Al presionar el disparador, el sensor digital integra los fotones incidentes durante el tiempo exacto determinado por la velocidad de obturación.',
    goldenRule: 'Asegúrate de comprobar que el exposímetro marque ~0.0 EV y que el punto de enfoque esté exactamente donde deseas antes de disparar.',
    exampleValues: 'Disparo manual fotograma a fotograma',
  },

  recording: {
    id: 'recording',
    name: 'Grabación de Vídeo Continuo (REC)',
    category: 'Monitorización Cine',
    whatIsIt: 'El conmutador que inicia y detiene la captura secuencial de fotogramas continuos a la cadencia de FPS establecida con código de tiempo (Timecode SMPTE).',
    visualEffect: 'Inicia el conteo de código de tiempo (00:00:00:00), activa la luz roja de Tally en la cámara y simula la persistencia temporal de movimiento.',
    whyItHappens: 'El sensor procesa de 24 a 120 fotogramas por segundo de forma continua, enviando el flujo comprimido al búfer de memoria.',
    goldenRule: 'Deja siempre correr 2-3 segundos de grabación antes de la claqueta y 3 segundos después de decir "corten" para facilitar el trabajo del montador.',
    exampleValues: 'Modo Standby vs Modo Grabación (Tally Red)',
  },

  afLock: {
    id: 'afLock',
    name: 'AF Lock / Enfoque al Sujeto',
    category: 'Cámara & Óptica',
    whatIsIt: 'Un botón de acceso rápido que sincroniza de inmediato la distancia del anillo de enfoque manual con la distancia física real a la que está colocado el sujeto o elemento del set.',
    visualEffect: 'Hace que el sujeto se vuelva instantáneamente 100% nítido, haciendo que aparezcan los contornos verdes de Focus Peaking.',
    whyItHappens: 'Alinea el plano focal conjugado de la lente con el plano euclidiano del sujeto.',
    goldenRule: 'Úsalo como referencia inicial rápida para centrar el foco, y luego ajusta milimétricamente con el slider de enfoque manual para comprobar el desenfoque por delante y por detrás.',
    exampleValues: 'Distancia fija calibrada al sujeto',
  },

  dofLimits: {
    id: 'dofLimits',
    name: 'Límites de Profundidad de Campo (Cercano y Lejano)',
    category: 'Cámara & Óptica',
    whatIsIt: 'Los dos puntos matemáticos en el espacio tridimensional entre los cuales los objetos se aprecian nítidos para el ojo humano.',
    visualEffect: 'Todo lo que se encuentre por delante del "Límite Cercano" o por detrás del "Límite Lejano" aparecerá desenfocado con círculos de confusión crecientes.',
    whyItHappens: 'Depende de la ley óptica de Gauss: los conos de luz que convergen en el sensor forman discos cuyo diámetro es menor que el Círculo de Confusión (CoC = ~0.025mm).',
    goldenRule: 'La regla del tercio: A distancias medias, aproximadamente un tercio (33%) de la DoF está por delante del sujeto y dos tercios (66%) por detrás.',
    exampleValues: 'Cercano: 2.05m • Plano de Foco: 2.20m • Lejano: 2.38m (DoF total = 33cm)',
  },

  hyperfocal: {
    id: 'hyperfocal',
    name: 'Distancia Hiperfocal',
    category: 'Cámara & Óptica',
    whatIsIt: 'La distancia de enfoque específica que consigue la máxima profundidad de campo posible para una distancia focal y apertura determinadas.',
    visualEffect: 'Al enfocar exactamente a la distancia hiperfocal (H), TODO lo que esté situado desde la mitad de esa distancia (H/2) hasta el infinito (∞) se mantiene nítido.',
    whyItHappens: 'Fórmula matemática: H = (focal² / (apertura · CoC)) + focal. Hace que el límite lejano de la profundidad de campo coincida exactamente con el infinito.',
    goldenRule: 'En fotografía de paisaje, arquitectura o documental de acción, calcula tu hiperfocal y coloca el foco ahí. Olvídate de enfocar al infinito, porque perderás toda la nitidez del primer término.',
    exampleValues: '24mm a f/8 en Super35: Hiperfocal a ~3.8m (nítido de 1.9m a infinito)',
  },

  sceneProps: {
    id: 'sceneProps',
    name: 'Planos y Elementos en Set (Primer Plano, Término y Fondo)',
    category: 'Cámara & Óptica',
    whatIsIt: 'La distribución espacial de atrezo, actores y props a lo largo del eje Z de profundidad de la cámara (de 0.5 metros a 40 metros).',
    visualEffect: 'Tener elementos en primer plano desenfocados (ej. flores u hojas a 0.8m), al actor enfocado a 2.2m y luces de fondo con bokeh a 15m crea la auténtica tridimensionalidad cinematográfica.',
    whyItHappens: 'El ojo humano percibe la profundidad tridimensional en un monitor plano 2D gracias a las pistas de paralaje y a los gradientes de desenfoque óptico relativo.',
    goldenRule: 'Coloca siempre algún elemento en primer plano desenfocado que "enmarque" al personaje. Esto da escala, atmósfera y riqueza visual profesional a tus planos.',
    exampleValues: 'Primer término (0.8m) • Término medio (2.2m) • Fondo lejano (15m a 30m)',
  },

  dynamicRange: {
    id: 'dynamicRange',
    name: 'Rango Dinámico: Curva Film (Log) vs Video (Rec.709)',
    category: 'Monitorización Cine',
    whatIsIt: 'El perfil de color y curva tonal gamma con la que la cámara procesa y monitoriza la señal del sensor.',
    visualEffect: 'Film (Log) desatura la imagen y reduce el contraste aparente en el visor, pero preserva hasta 13-15 stops de latitud en sombras y altas luces. Video (Rec.709) muestra una imagen contrastada y saturada lista para ver en televisión.',
    whyItHappens: 'Las curvas logarítmicas distribuyen los valores de bits de forma uniforme según la percepción no lineal del ojo humano (densitometría Cineon).',
    goldenRule: 'En rodajes de ficción graba siempre en Film (Log) para no quemar ventanas ni cielos. Si tu monitor lo soporta, activa una LUT Rec.709 solo para monitorizar sin afectar el archivo grabado.',
    exampleValues: 'Blackmagic Film Log (13+ stops) • Rec.709 Video (Contrastado de emisión)',
  },

  zoom1to1: {
    id: 'zoom1to1',
    name: 'Lupa de Enfoque 1:1 (Pixel-to-Pixel)',
    category: 'Monitorización Cine',
    whatIsIt: 'Una ampliación digital que amplía el centro del encuadre para ver la imagen a resolución de píxel nativo del sensor.',
    visualEffect: 'Permite inspeccionar con precisión microscópica si las pestañas o el iris del ojo del actor están en foco perfecto.',
    whyItHappens: 'En monitores pequeños (5 o 7 pulgadas), una imagen 4K comprimida en el visor puede engañar y parecer nítida cuando en realidad el foco tiene un desfase de unos centímetros.',
    goldenRule: 'Presiona el botón de lupa antes de cada toma para clavar el foco en los ojos, luego desactívala para encuadrar y dar la orden de acción.',
    exampleValues: 'Aumento 1x (Encuadre global) • Aumento 1:1 (Enfoque fino)',
  },

  frameGuide: {
    id: 'frameGuide',
    name: 'Guías de Encuadre y Relaciones de Aspecto (Aspect Ratios)',
    category: 'Monitorización Cine',
    whatIsIt: 'Líneas semitransparentes superpuestas en la pantalla que delimitan el área de recorte que se utilizará en la versión final de la película.',
    visualEffect: 'Permite componer para 16:9 (TV/YouTube), 2.39:1 (Scope anamórfico cinematográfico ultra-ancho), 1.85:1 (Cine estándar) o regla de tercios.',
    whyItHappens: 'El sensor de la cámara suele tener un ratio nativo 16:9 o 3:2, pero las salas de cine y plataformas requieren diferentes formatos de distribución.',
    goldenRule: 'Coloca los ojos de tus personajes cerca de la línea superior del tercio del formato final, y mantén los micrófonos de pértiga fuera de la guía activa.',
    exampleValues: '16:9 (Televisión) • 2.39:1 (Cine Anamórfico Scope) • Tercios (Composición áurea)',
  },

  lightingPresets: {
    id: 'lightingPresets',
    name: 'Esquemas Profesionales de Iluminación de Cine (1-Click)',
    category: 'Iluminación 360°',
    whatIsIt: 'Configuraciones canónicas de iluminación utilizadas históricamente en la industria del cine y la pintura (Rembrandt, Tres Puntos, Mariposa/Paramount, Book Light, Split, etc.).',
    visualEffect: 'Transforma al instante la atmósfera y el volumen del set: de un look comercial luminoso a un suspense dramático de cine negro o un retrato editorial glamuroso.',
    whyItHappens: 'Cada setup establece ratios específicos de contraste (Key:Fill) y ángulos de incidencia que modelan la geometría facial del actor y la escena.',
    goldenRule: 'Empieza siempre cargando un preset canónico con 1 clic (ej. Rembrandt para drama o Book Light para belleza) y luego afina los potenciómetros de potencia de cada foco.',
    exampleValues: 'Rembrandt (3:1) • Butterfly Paramount (Glamour) • Tres Puntos (Académico) • Split (Misterio 8:1)',
  },

  lightElevation: {
    id: 'lightElevation',
    name: 'Elevación Cenital del Foco de Luz (Grados Verticales)',
    category: 'Iluminación 360°',
    whatIsIt: 'El ángulo vertical en el que se suspende el foco respecto al plano horizontal de los ojos del sujeto: de -20° (luz baja desde el suelo) a +60° (luz cenital cenicienta).',
    visualEffect: 'Una elevación de 30°-45° crea sombras naturales hacia abajo simulando la luz del sol o lámparas de techo. Una elevación negativa desde el suelo produce el temido efecto "luz de monstruo / terror".',
    whyItHappens: 'Los seres humanos estamos evolutivamente adaptados a ver la luz procedente de arriba (el cielo o el sol). Luces desde abajo perturban nuestra percepción del rostro.',
    goldenRule: 'Coloca tu luz principal entre 30° y 45° de elevación cenital. Si la elevas más de 50°, los ojos del actor quedarán atrapados en sombras negras de las cejas ("ojos de mapache").',
    exampleValues: '0° (Frontal plano) • 35° (Cine natural estándar) • 75° (Cenital dramático)',
  },

  lightDistance: {
    id: 'lightDistance',
    name: 'Distancia de la Fuente de Luz y Ley Inversa del Cuadrado',
    category: 'Iluminación 360°',
    whatIsIt: 'La distancia física en metros desde el foco de luz hasta el sujeto fotografiado.',
    visualEffect: '1) Caída de luz (fall-off): Fuentes muy cercanas sufren una caída drástica entre la cara del actor y el hombro. Fuentes lejanas iluminan de forma mucho más homogénea. 2) Suavidad: Un softbox colocado muy cerca del actor actúa como una fuente mucho más grande y suave.',
    whyItHappens: 'Ley inversa del cuadrado: La intensidad de la luz decrece con el cuadrado de la distancia: I = P / (4·π·d²). Al duplicar la distancia de 1.5m a 3m, el sujeto recibe solo una cuarta parte (25%) de la luz.',
    goldenRule: 'Si quieres sombras ultra suaves y envolventes, acerca un softbox grande a 1 metro de la cara de tu actor y baja la potencia del dimmer.',
    exampleValues: '1.2m (Softbox cercano ultra suave) • 2.5m (Luz de estudio estándar) • 6.0m (Foco de sol lejano)',
  },

  cameraRig: {
    id: 'cameraRig',
    name: 'Posición, Ángulos de Cámara y Emociones (Trípode / Rig)',
    category: 'Gramática y Dirección de Fotografía',
    whatIsIt: 'La altura, inclinación vertical (tilt), orientación horizontal (pan), inclinación de eje (roll / holandés) y traslación física (dolly / truck) del trípode o dolly en el espacio tridimensional real.',
    visualEffect: 'Modela la relación psicológica de poder entre el espectador y el personaje: el contrapicado (cámara baja mirando hacia arriba) infunde autoridad y heroísmo; el picado (cámara alta mirando hacia abajo) empequeñece al sujeto transmitiendo soledad o vulnerabilidad; el plano holandés desequilibra el horizonte provocando desasosiego psicológico o adrenalina.',
    whyItHappens: 'La posición geométrica de la cámara en relación con el centro de masas del sujeto proyecta líneas de fuga convergentes en el sensor óptico, condicionando la percepción subconsciente de escala y dominancia.',
    goldenRule: 'Nunca coloques la cámara por inercia o comodidad a la altura de tus propios ojos. Pregúntate siempre qué emoción exige la narrativa: ¿quieres que el espectador admire y respete al personaje? Baja la cámara a 0.45m y aplica contrapicado. ¿Quieres transmitir angustia? Inclina el horizonte 14° en plano holandés.',
    exampleValues: 'Nivel de ojos (1.45m, 0° - Empatía) • Contrapicado (0.45m, +20° - Poder) • Picado (2.3m, -20° - Fragilidad) • Holandés (14° - Tensión)',
  },

  modelPose: {
    id: 'modelPose',
    name: 'Poses del Sujeto y Escenas Típicas Profesionales',
    category: 'Dirección de Fotografía y Arte',
    whatIsIt: 'La postura física, orientación corporal, rotación de cabeza y actitud escénica del modelo o actor en el set de rodaje.',
    visualEffect: 'Determina cómo inciden las luces en la piel y el vestuario: un giro facial de 3/4 genera el clásico triángulo de luz Rembrandt y sombra de pómulo; una pose de primer plano beauty realza labios y mirada; una pose sentada crea intimidad para entrevistas o documentales; una pose dinámica editorial aporta movimiento en moda.',
    whyItHappens: 'La tridimensionalidad de los planos anatómicos de la cara y el torso genera luces principales, penumbras y sombras arrojadas que varían drásticamente con leves rotaciones de los hombros y la barbilla.',
    goldenRule: 'Para un retrato con profundidad cinematográfica, pide al actor que gire su torso 30° respecto a la cámara e ilumina desde el lado opuesto (iluminación desde el lado oscuro / short lighting) para estilizar el rostro.',
    exampleValues: 'Frontal (Catálogo formal) • 3/4 Rembrandt (Ficción y drama) • Primer Plano Beauty (Cosmética) • Sentado (Entrevista documental)',
  },

  aspectRatio: {
    id: 'aspectRatio',
    name: 'Relación de Aspecto y Orientación de Cámara (Horizontal / Vertical)',
    category: 'Gramática y Dirección de Fotografía',
    whatIsIt: 'La proporción geométrica entre la anchura y la altura del fotograma final entregado al cliente (ej. 16:9, 9:16, 4:5, 3:2, 2.39:1), y la orientación física del sensor (Horizontal / Vertical).',
    visualEffect: 'Determina el marco compositivo del mundo visual: el formato vertical (9:16 o 4:5) aísla la figura humana de pie en moda y contenido móvil sin espacio muerto a los lados; el panorámico (2.39:1 scope o 16:9) expande la relación del personaje con su entorno cinematográfico.',
    whyItHappens: 'Históricamente, el celuloide 35mm cinematográfico y fotográfico evolucionó desde el 4:3 de Edison, al 3:2 de Leica, al Cinescope 2.39:1 para competir con la TV, y hoy a los formatos verticales móviles por la anatomía del smartphone.',
    goldenRule: 'Nunca dispares pensando que "después recortarás en postproducción". Encuadra directamente con las guías de matte activas para aprovechar al 100% la resolución de tu sensor y componer con intención desde el rodaje.',
    exampleValues: '16:9 (Video HD/YouTube) • 9:16 (Reels/TikTok móvil) • 4:5 (Instagram portrait) • 2.39:1 (Cinescope anamórfico) • 3:2 (Foto full frame)',
  },
};
