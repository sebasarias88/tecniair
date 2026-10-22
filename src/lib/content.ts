import { images } from "@/lib/images";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** Used in the menu and cards. */
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  includes: string[];
  benefits: { title: string; text: string }[];
  faqs: Faq[];
  cta: string;
  message: string;
  image: string;
  /** Shown in the big horizontal gallery on the home page. */
  featured: boolean;
};

export type Sector = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  needs: string[];
  services: string[];
  faqs: Faq[];
  message: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "instalacion-aire-acondicionado",
    name: "Instalación de aire acondicionado",
    shortName: "Instalación",
    metaTitle: "Instalación de aire acondicionado en Armenia, Quindío",
    metaDescription:
      "Instalamos aires acondicionados mini split, piso techo y cassette en Armenia y el Quindío. Tubería de cobre, vacío del sistema y prueba de funcionamiento. Cotiza por WhatsApp.",
    headline: "Instalación limpia, sellada y sin fugas.",
    intro:
      "Montamos tu equipo nivelado, con la tubería bien protegida y el sistema al vacío antes de liberar el gas. Así enfría desde el primer día y dura más.",
    includes: [
      "Equipos mini split, piso techo y cassette",
      "Tubería de cobre, soportes y desagüe",
      "Vacío del sistema antes de liberar el refrigerante",
      "Conexión eléctrica del equipo",
      "Prueba de funcionamiento y recomendaciones de uso",
    ],
    benefits: [
      { title: "Visita previa", text: "Medimos el espacio y te decimos dónde va cada unidad antes de cotizar." },
      { title: "Precio cerrado", text: "Te damos el valor completo antes de empezar, sin cobros sorpresa." },
      { title: "Garantía", text: "La instalación queda con garantía por escrito." },
    ],
    faqs: [
      {
        q: "¿Cuánto se demora una instalación?",
        a: "Una instalación estándar de mini split toma entre 3 y 5 horas, según la distancia entre las unidades y la altura de la fachada.",
      },
      {
        q: "¿Instalan equipos que yo ya compré?",
        a: "Sí. Instalamos equipos comprados por tu cuenta y revisamos que la capacidad sea la correcta para el espacio.",
      },
    ],
    cta: "Cotizar instalación",
    message: "Hola Tecniair, quiero cotizar la instalación de un aire acondicionado.",
    image: images.rooftopCrew,
    featured: true,
  },
  {
    slug: "mantenimiento-aire-acondicionado",
    name: "Mantenimiento de aire acondicionado",
    shortName: "Mantenimiento",
    metaTitle: "Mantenimiento de aire acondicionado en Armenia, Quindío",
    metaDescription:
      "Mantenimiento preventivo y correctivo de aires acondicionados en Armenia: lavado de filtros, serpentines y turbina, revisión de gas y consumo. Agenda por WhatsApp.",
    headline: "Que enfríe como el primer día.",
    intro:
      "Un aire sucio enfría menos, gasta más energía y empieza a oler mal. Con un lavado profundo recupera su rendimiento y evitas daños mayores.",
    includes: [
      "Lavado de filtros, serpentines y turbina",
      "Limpieza de bandeja y desagüe",
      "Desincrustamiento de serpentines",
      "Revisión de presión del refrigerante",
      "Medición del consumo eléctrico",
    ],
    benefits: [
      { title: "Menos consumo", text: "Un equipo limpio trabaja menos para lograr la misma temperatura." },
      { title: "Aire más sano", text: "Quitamos el moho y la suciedad que se acumulan adentro del equipo." },
      { title: "Más vida útil", text: "Detectamos a tiempo lo que puede convertirse en una reparación costosa." },
    ],
    faqs: [
      {
        q: "¿Cada cuánto le hago mantenimiento a mi aire?",
        a: "En casa, cada 6 meses. En oficinas y locales que lo usan todo el día, cada 3 o 4 meses.",
      },
      {
        q: "¿Ensucian la pared o el piso?",
        a: "No. Instalamos un protector que recoge el agua del lavado, así no se moja la pared ni el piso.",
      },
    ],
    cta: "Programar mantenimiento",
    message: "Hola Tecniair, quiero programar un mantenimiento para mi aire acondicionado.",
    image: images.technicianHelmet,
    featured: true,
  },
  {
    slug: "reparacion-aire-acondicionado",
    name: "Reparación de aire acondicionado",
    shortName: "Reparación",
    metaTitle: "Reparación de aire acondicionado en Armenia, Quindío",
    metaDescription:
      "¿Tu aire no enfría, gotea o hace ruido? Diagnóstico y reparación de aires acondicionados en Armenia: fugas, carga de gas, capacitores, motores y tarjetas.",
    headline: "Encontramos la falla y te damos el precio antes de arreglarla.",
    intro:
      "Revisamos la parte eléctrica y la de refrigeración, te mostramos qué está fallando y te decimos cuánto cuesta. Tú decides antes de que toquemos nada.",
    includes: [
      "Diagnóstico eléctrico y de refrigeración",
      "Detección y reparación de fugas",
      "Carga de refrigerante",
      "Cambio de capacitores, motores y tarjetas",
      "Reparación de desagües y goteos",
    ],
    benefits: [
      { title: "Diagnóstico claro", text: "Te explicamos la falla con palabras simples y te mostramos la pieza." },
      { title: "Presupuesto primero", text: "Nada se cambia sin que apruebes el precio." },
      { title: "Garantía", text: "Las reparaciones quedan con garantía por escrito." },
    ],
    faqs: [
      {
        q: "¿Por qué mi aire no enfría?",
        a: "Las causas más comunes son filtros sucios, falta de refrigerante por una fuga o un capacitor dañado. En la visita encontramos cuál es.",
      },
      {
        q: "¿Por qué mi aire gotea agua?",
        a: "Casi siempre es el desagüe tapado o los filtros sucios. En la mayoría de los casos se resuelve con un mantenimiento.",
      },
    ],
    cta: "Pedir diagnóstico",
    message: "Hola Tecniair, mi aire acondicionado tiene una falla y necesito un diagnóstico.",
    image: images.technicianPanel,
    featured: true,
  },
  {
    slug: "venta-aires-acondicionados",
    name: "Venta de aires acondicionados",
    shortName: "Venta de equipos",
    metaTitle: "Venta de aires acondicionados con instalación en Armenia",
    metaDescription:
      "Compra tu aire acondicionado convencional o inverter con instalación incluida en Armenia y el Quindío. Te ayudamos a elegir la capacidad correcta.",
    headline: "El equipo correcto para tu espacio, ya instalado.",
    intro:
      "Un equipo pequeño trabaja forzado y uno grande gasta de más. Calculamos la capacidad que necesitas y te entregamos el aire funcionando.",
    includes: [
      "Equipos convencionales e inverter",
      "Cálculo de capacidad en BTU para tu espacio",
      "Suministro e instalación en un solo servicio",
      "Asesoría sobre consumo y mantenimiento",
    ],
    benefits: [
      { title: "Asesoría honesta", text: "Te recomendamos lo que tu espacio necesita, no el equipo más caro." },
      { title: "Todo en uno", text: "Un solo proveedor para el equipo, la instalación y la garantía." },
      { title: "Ahorro", text: "Te explicamos cuándo vale la pena un inverter." },
    ],
    faqs: [
      {
        q: "¿Me conviene un aire inverter?",
        a: "El inverter regula la velocidad del compresor en lugar de prenderse y apagarse, así que gasta menos energía. Si lo usas varias horas al día, suele valer la pena.",
      },
      {
        q: "¿Qué capacidad necesito?",
        a: "Depende del tamaño, el sol y las personas. Usa la calculadora de esta página y en la visita confirmamos el número exacto.",
      },
    ],
    cta: "Cotizar un equipo",
    message: "Hola Tecniair, quiero cotizar un aire acondicionado con instalación.",
    image: images.splitDisplay,
    featured: true,
  },
  {
    slug: "planes-mantenimiento-empresas",
    name: "Planes de mantenimiento para empresas",
    shortName: "Planes para empresas",
    metaTitle: "Planes de mantenimiento de aire acondicionado para empresas en el Quindío",
    metaDescription:
      "Contratos de mantenimiento mensual, bimestral o trimestral para hoteles, casinos, oficinas, clínicas y locales en Armenia y el Quindío. Visitas programadas y prioridad en emergencias.",
    headline: "Tus equipos al día, sin que tengas que acordarte.",
    intro:
      "Programamos las visitas según el uso de tus equipos y llevamos el registro de cada uno. Si algo falla, tu empresa tiene prioridad.",
    includes: [
      "Visitas programadas mensuales, bimestrales o trimestrales",
      "Inventario y hoja de vida de cada equipo",
      "Informe después de cada visita",
      "Prioridad en emergencias",
      "Un solo contacto para todos tus equipos",
    ],
    benefits: [
      { title: "Cero sorpresas", text: "Detectamos el desgaste antes de que el equipo se dañe en plena temporada." },
      { title: "Costo fijo", text: "Sabes cuánto pagas cada mes por el cuidado de todos tus equipos." },
      { title: "Clientes cómodos", text: "Huéspedes, pacientes y clientes siempre en un ambiente fresco." },
    ],
    faqs: [
      {
        q: "¿Desde cuántos equipos aplica un plan?",
        a: "Armamos planes a la medida desde pocos equipos. Escríbenos cuántos tienes y cada cuánto los usan.",
      },
      {
        q: "¿Atienden fuera del horario laboral?",
        a: "Sí. Podemos programar las visitas en horarios de baja ocupación para no interrumpir tu negocio.",
      },
    ],
    cta: "Cotizar plan empresarial",
    message: "Hola Tecniair, quiero cotizar un plan de mantenimiento para los aires de mi empresa.",
    image: images.hotelLobby,
    featured: false,
  },
  {
    slug: "emergencias-aire-acondicionado-24-horas",
    name: "Emergencias 24 horas",
    shortName: "Emergencias 24 h",
    metaTitle: "Técnico de aire acondicionado 24 horas en Armenia",
    metaDescription:
      "¿Se dañó el aire en plena noche o en un evento? Atención de emergencias 24 horas para aires acondicionados en Armenia y el Quindío. Escríbenos por WhatsApp.",
    headline: "Si se daña a cualquier hora, te atendemos.",
    intro:
      "Un aire dañado en un hotel lleno, un casino abierto o un cuarto de servidores no puede esperar al lunes. Escríbenos y coordinamos la visita.",
    includes: [
      "Atención por WhatsApp y llamada 24 horas",
      "Diagnóstico en sitio",
      "Reparaciones de emergencia",
      "Solución temporal mientras llega un repuesto",
    ],
    benefits: [
      { title: "Respuesta rápida", text: "Te confirmamos por WhatsApp a qué hora llega el técnico." },
      { title: "Prioridad", text: "Los clientes con plan de mantenimiento tienen prioridad." },
      { title: "Sin rodeos", text: "Te decimos el costo antes de empezar, también en una emergencia." },
    ],
    faqs: [
      {
        q: "¿Atienden de noche y fines de semana?",
        a: "Sí. Escríbenos por WhatsApp o llámanos y coordinamos la visita.",
      },
      {
        q: "¿La visita de emergencia tiene otro valor?",
        a: "Te confirmamos el valor por WhatsApp antes de ir, según la hora y el lugar.",
      },
    ],
    cta: "Reportar una emergencia",
    message: "Hola Tecniair, tengo una emergencia con un aire acondicionado y necesito un técnico lo antes posible.",
    image: images.condenserBrick,
    featured: false,
  },
  {
    slug: "sistemas-centrales-y-ductos",
    name: "Sistemas centrales y ductos",
    shortName: "Centrales y ductos",
    metaTitle: "Aire acondicionado central, ductos y limpieza de ductos en el Quindío",
    metaDescription:
      "Instalación y mantenimiento de sistemas de aire acondicionado central y por ductos, y limpieza de ductos para hoteles, casinos, oficinas y locales en el Quindío.",
    headline: "Clima para espacios grandes, bien distribuido.",
    intro:
      "Para salones, pisos completos y locales grandes, un sistema central con ductos reparte el aire de forma pareja y silenciosa.",
    includes: [
      "Instalación de equipos centrales y fan coils",
      "Montaje de ductos y rejillas",
      "Limpieza de ductos",
      "Mantenimiento de manejadoras y condensadoras",
      "Balanceo del flujo de aire",
    ],
    benefits: [
      { title: "Temperatura pareja", text: "Sin zonas calientes ni chorros de aire directo." },
      { title: "Aire limpio", text: "Ductos limpios evitan polvo, olores y alergias." },
      { title: "Menos ruido", text: "Los equipos quedan lejos de las personas." },
    ],
    faqs: [
      {
        q: "¿Cada cuánto se limpian los ductos?",
        a: "Depende del uso y del lugar. En hoteles, casinos y clínicas recomendamos revisarlos al menos una vez al año.",
      },
      {
        q: "¿Revisan sistemas instalados por otra empresa?",
        a: "Sí. Hacemos un diagnóstico completo del sistema y te decimos qué necesita.",
      },
    ],
    cta: "Cotizar sistema central",
    message: "Hola Tecniair, quiero información sobre sistemas centrales, ductos o limpieza de ductos.",
    image: images.flexibleDucts,
    featured: false,
  },
  {
    slug: "traslado-reinstalacion-aire-acondicionado",
    name: "Traslado y reinstalación",
    shortName: "Traslado de equipos",
    metaTitle: "Traslado y reinstalación de aire acondicionado en Armenia",
    metaDescription:
      "¿Te mudas o remodelas? Desmontamos tu aire acondicionado recuperando el gas y lo reinstalamos en su nuevo lugar en Armenia y el Quindío.",
    headline: "Te mudas y tu aire se va contigo.",
    intro:
      "Desmontamos el equipo recuperando el refrigerante para no perderlo, lo protegemos en el traslado y lo dejamos funcionando en su nuevo lugar.",
    includes: [
      "Recuperación del refrigerante antes de desmontar",
      "Desmonte cuidadoso de ambas unidades",
      "Reinstalación con tubería nueva si hace falta",
      "Vacío y prueba de funcionamiento",
    ],
    benefits: [
      { title: "Sin perder el gas", text: "Recuperamos el refrigerante en lugar de soltarlo." },
      { title: "Equipo protegido", text: "Sellamos las conexiones para que no entre humedad ni suciedad." },
      { title: "Garantía", text: "La reinstalación queda con garantía por escrito." },
    ],
    faqs: [
      {
        q: "¿Se puede reutilizar la tubería vieja?",
        a: "A veces sí. Si está en buen estado y alcanza la distancia, la reutilizamos; si no, te lo decimos en el presupuesto.",
      },
    ],
    cta: "Cotizar traslado",
    message: "Hola Tecniair, necesito trasladar y reinstalar un aire acondicionado.",
    image: images.splitWallMono,
    featured: false,
  },
  {
    slug: "preinstalacion-obra-nueva",
    name: "Preinstalación en obra nueva",
    shortName: "Obra nueva",
    metaTitle: "Preinstalación de aire acondicionado en obra nueva y remodelaciones",
    metaDescription:
      "Dejamos lista la tubería de cobre, el desagüe y el punto eléctrico antes de los acabados. Para constructoras, remodelaciones y casas nuevas en el Quindío.",
    headline: "La tubería lista antes de pintar.",
    intro:
      "Si la preinstalación se hace durante la obra, la tubería queda oculta y no hay que romper paredes después. Coordinamos con tu maestro de obra o constructora.",
    includes: [
      "Tubería de cobre empotrada",
      "Desagüe y punto eléctrico",
      "Planeación de la ubicación de los equipos",
      "Coordinación con la constructora",
    ],
    benefits: [
      { title: "Acabado limpio", text: "Sin canaletas a la vista ni paredes rotas después." },
      { title: "Ahorro", text: "Es más barato hacerlo durante la obra que después." },
      { title: "Listo para crecer", text: "Dejas los puntos preparados aunque compres los equipos más adelante." },
    ],
    faqs: [
      {
        q: "¿En qué etapa de la obra debo llamarlos?",
        a: "Antes de pañetar y pintar, cuando todavía se puede pasar tubería por muros y techos.",
      },
    ],
    cta: "Cotizar preinstalación",
    message: "Hola Tecniair, quiero cotizar la preinstalación de aire acondicionado en una obra.",
    image: images.constructionInterior,
    featured: false,
  },
  {
    slug: "repuestos-aire-acondicionado",
    name: "Repuestos",
    shortName: "Repuestos",
    metaTitle: "Repuestos para aire acondicionado en Armenia",
    metaDescription:
      "Capacitores, motores, tarjetas, sensores, controles y más repuestos para aire acondicionado en Armenia, con instalación por un técnico.",
    headline: "La pieza correcta, instalada por un técnico.",
    intro:
      "Conseguimos el repuesto para tu equipo y lo instalamos, para que no compres una pieza equivocada ni la cambies sin las herramientas adecuadas.",
    includes: [
      "Capacitores y contactores",
      "Motores de ventilador",
      "Tarjetas electrónicas y sensores",
      "Controles remotos",
      "Instalación del repuesto",
    ],
    benefits: [
      { title: "Compatible", text: "Verificamos modelo y referencia antes de pedir la pieza." },
      { title: "Instalado", text: "El técnico la cambia y prueba el equipo." },
      { title: "Garantía", text: "El repuesto instalado queda con garantía." },
    ],
    faqs: [
      {
        q: "¿Venden el repuesto sin instalación?",
        a: "Escríbenos con la marca y el modelo del equipo y te confirmamos disponibilidad.",
      },
    ],
    cta: "Consultar un repuesto",
    message: "Hola Tecniair, necesito un repuesto para mi aire acondicionado.",
    image: images.electronicsRepair,
    featured: false,
  },
];

export const sectors: Sector[] = [
  {
    slug: "hogares",
    name: "Hogares",
    metaTitle: "Aire acondicionado para casas y apartamentos en Armenia",
    metaDescription:
      "Instalación, mantenimiento y reparación de aire acondicionado para habitaciones, salas y apartamentos en Armenia y el Quindío.",
    headline: "Dormir fresco en tu propia casa.",
    intro:
      "Equipos silenciosos para habitaciones, salas y apartamentos, con una instalación limpia que cuida tus paredes y acabados.",
    needs: [
      "Equipos silenciosos para habitaciones",
      "Instalación sin daños en paredes",
      "Mantenimiento cada 6 meses",
      "Asesoría para ahorrar energía",
    ],
    services: ["instalacion-aire-acondicionado", "mantenimiento-aire-acondicionado", "reparacion-aire-acondicionado", "venta-aires-acondicionados"],
    faqs: [
      {
        q: "¿Qué tan silencioso es un mini split?",
        a: "La unidad interior es muy silenciosa porque el compresor queda afuera. Por eso es la opción más usada en habitaciones.",
      },
    ],
    message: "Hola Tecniair, necesito un servicio de aire acondicionado para mi casa.",
    image: images.homeInterior,
  },
  {
    slug: "oficinas",
    name: "Oficinas",
    metaTitle: "Aire acondicionado para oficinas en Armenia y el Quindío",
    metaDescription:
      "Climatización para oficinas y cuartos de servidores: instalación, planes de mantenimiento y atención de emergencias en Armenia y el Quindío.",
    headline: "Un equipo cómodo trabaja mejor.",
    intro:
      "Clima estable para tu equipo de trabajo y tus salas de reuniones, y cuidado especial para cuartos de servidores que no pueden calentarse.",
    needs: [
      "Climatización de puestos y salas de reuniones",
      "Cuartos de servidores y redes",
      "Mantenimiento fuera del horario laboral",
      "Planes de mantenimiento con informe",
    ],
    services: ["planes-mantenimiento-empresas", "instalacion-aire-acondicionado", "sistemas-centrales-y-ductos", "emergencias-aire-acondicionado-24-horas"],
    faqs: [
      {
        q: "¿Pueden hacer el mantenimiento un sábado?",
        a: "Sí. Programamos las visitas cuando no interrumpan a tu equipo.",
      },
    ],
    message: "Hola Tecniair, necesito un servicio de aire acondicionado para una oficina.",
    image: images.openOffice,
  },
  {
    slug: "locales-comerciales",
    name: "Locales comerciales",
    metaTitle: "Aire acondicionado para locales comerciales en Armenia",
    metaDescription:
      "Aire acondicionado para tiendas, almacenes y locales en Armenia y el Quindío. Clientes cómodos que se quedan más tiempo comprando.",
    headline: "Clientes frescos se quedan más tiempo.",
    intro:
      "En un local caliente la gente entra y sale rápido. Te ayudamos a elegir e instalar el equipo correcto y a mantenerlo funcionando todo el año.",
    needs: [
      "Equipos para jornadas largas de uso",
      "Instalación sin cerrar el negocio",
      "Mantenimiento cada 3 o 4 meses",
      "Atención rápida si falla",
    ],
    services: ["venta-aires-acondicionados", "instalacion-aire-acondicionado", "mantenimiento-aire-acondicionado", "planes-mantenimiento-empresas"],
    faqs: [
      {
        q: "¿Tienen que cerrar mi local para instalar?",
        a: "Normalmente no. Coordinamos la instalación en horarios de poco movimiento.",
      },
    ],
    message: "Hola Tecniair, necesito un servicio de aire acondicionado para mi local comercial.",
    image: images.retailStore,
  },
  {
    slug: "restaurantes",
    name: "Restaurantes",
    metaTitle: "Aire acondicionado para restaurantes en Armenia y el Quindío",
    metaDescription:
      "Climatización para restaurantes, cafés y bares en el Quindío: equipos para salones con cocina cerca, mantenimiento frecuente y atención rápida.",
    headline: "Que el calor se quede en la cocina.",
    intro:
      "Los salones cerca de la cocina necesitan más capacidad y mantenimiento más frecuente por la grasa. Diseñamos la solución para que tus clientes coman cómodos.",
    needs: [
      "Capacidad calculada para salones cerca de la cocina",
      "Limpieza frecuente por grasa y humo",
      "Visitas antes de abrir",
      "Atención en fines de semana",
    ],
    services: ["instalacion-aire-acondicionado", "mantenimiento-aire-acondicionado", "planes-mantenimiento-empresas", "emergencias-aire-acondicionado-24-horas"],
    faqs: [
      {
        q: "¿Por qué el aire de mi restaurante se ensucia tan rápido?",
        a: "La grasa y el humo de la cocina se pegan en filtros y serpentines. Por eso recomendamos mantenimiento más seguido.",
      },
    ],
    message: "Hola Tecniair, necesito un servicio de aire acondicionado para un restaurante.",
    image: images.restaurant,
  },
  {
    slug: "hoteles",
    name: "Hoteles",
    metaTitle: "Aire acondicionado para hoteles en el Quindío",
    metaDescription:
      "Mantenimiento y reparación de aire acondicionado para hoteles en Armenia y el Quindío: habitaciones, lobbies y salones. Planes empresariales y atención 24 horas.",
    headline: "Huéspedes frescos, buenas reseñas.",
    intro:
      "Una habitación caliente es una mala reseña. Mantenemos los equipos de habitaciones, lobby y salones al día, con visitas en horarios que no molestan a los huéspedes.",
    needs: [
      "Mantenimiento por habitación con registro",
      "Visitas en horarios de baja ocupación",
      "Sistemas centrales para lobby y salones",
      "Atención de emergencias 24 horas",
    ],
    services: ["planes-mantenimiento-empresas", "emergencias-aire-acondicionado-24-horas", "sistemas-centrales-y-ductos", "reparacion-aire-acondicionado"],
    faqs: [
      {
        q: "¿Pueden atender habitación por habitación?",
        a: "Sí. Coordinamos con recepción para entrar solo a las habitaciones libres y llevamos el registro de cada equipo.",
      },
    ],
    message: "Hola Tecniair, quiero información sobre el servicio de aire acondicionado para un hotel.",
    image: images.hotelRoom,
  },
  {
    slug: "casinos",
    name: "Casinos",
    metaTitle: "Aire acondicionado para casinos en Armenia y el Quindío",
    metaDescription:
      "Climatización y mantenimiento de aire acondicionado para casinos y salas de juego en el Quindío: equipos que trabajan muchas horas y atención 24 horas.",
    headline: "Abierto muchas horas, siempre fresco.",
    intro:
      "Las salas de juego tienen muchas máquinas, mucha gente y horarios largos. Sus equipos necesitan mantenimiento constante y atención inmediata cuando fallan.",
    needs: [
      "Equipos para uso continuo",
      "Control del calor que generan las máquinas",
      "Mantenimiento en horarios de cierre",
      "Atención de emergencias 24 horas",
    ],
    services: ["planes-mantenimiento-empresas", "sistemas-centrales-y-ductos", "emergencias-aire-acondicionado-24-horas", "reparacion-aire-acondicionado"],
    faqs: [
      {
        q: "¿Atienden mientras el casino está abierto?",
        a: "Preferimos programar el mantenimiento en el cierre, pero las emergencias las atendemos a cualquier hora.",
      },
    ],
    message: "Hola Tecniair, quiero información sobre el servicio de aire acondicionado para un casino.",
    image: images.casino,
  },
  {
    slug: "clinicas-y-consultorios",
    name: "Clínicas y consultorios",
    metaTitle: "Aire acondicionado para clínicas y consultorios en el Quindío",
    metaDescription:
      "Aire acondicionado para clínicas, consultorios médicos y odontológicos en Armenia: ambientes limpios y frescos para pacientes y equipos.",
    headline: "Aire limpio para tus pacientes.",
    intro:
      "En un consultorio el aire debe estar fresco y limpio. Hacemos mantenimiento frecuente y cuidamos los equipos de las áreas sensibles.",
    needs: [
      "Mantenimiento frecuente y limpieza profunda",
      "Limpieza de ductos",
      "Visitas fuera del horario de atención",
      "Registro de mantenimiento por equipo",
    ],
    services: ["planes-mantenimiento-empresas", "mantenimiento-aire-acondicionado", "sistemas-centrales-y-ductos", "instalacion-aire-acondicionado"],
    faqs: [
      {
        q: "¿Entregan constancia del mantenimiento?",
        a: "Sí. Después de cada visita entregamos un informe con lo que se hizo en cada equipo.",
      },
    ],
    message: "Hola Tecniair, necesito un servicio de aire acondicionado para una clínica o consultorio.",
    image: images.dentalClinic,
  },
  {
    slug: "obra-nueva-y-constructoras",
    name: "Obra nueva y constructoras",
    metaTitle: "Aire acondicionado para constructoras y obra nueva en el Quindío",
    metaDescription:
      "Preinstalación e instalación de aire acondicionado para constructoras, proyectos de vivienda y remodelaciones en Armenia y el Quindío.",
    headline: "Proyectos entregados con el clima listo.",
    intro:
      "Trabajamos con constructoras y maestros de obra para dejar la tubería empotrada durante la obra y los equipos instalados al entregar.",
    needs: [
      "Preinstalación durante la obra",
      "Instalación por etapas o por unidad",
      "Coordinación con la constructora",
      "Garantía por escrito",
    ],
    services: ["preinstalacion-obra-nueva", "instalacion-aire-acondicionado", "venta-aires-acondicionados", "sistemas-centrales-y-ductos"],
    faqs: [
      {
        q: "¿Trabajan con proyectos de varias unidades?",
        a: "Sí. Planeamos la preinstalación por etapas y cotizamos por unidad o por proyecto.",
      },
    ],
    message: "Hola Tecniair, quiero cotizar aire acondicionado para un proyecto de obra nueva.",
    image: images.constructionCrane,
  },
];

export const homeFaqs: Faq[] = [
  services[1].faqs[0],
  services[2].faqs[1],
  services[0].faqs[0],
  services[3].faqs[0],
  {
    q: "¿Atienden fuera de Armenia?",
    a: "Sí. Atendemos Armenia y municipios cercanos del Quindío como Calarcá, Circasia, La Tebaida, Montenegro, Quimbaya, Salento y Filandia.",
  },
  {
    q: "¿Los trabajos tienen garantía?",
    a: "Sí. Cada instalación, reparación y mantenimiento queda con garantía por escrito.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
