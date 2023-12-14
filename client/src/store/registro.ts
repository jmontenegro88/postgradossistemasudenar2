const countWords = (text: any) => {
  if (!text) return 0;
  text = text.replace(/\r?\n/g, " ");
  text = text.replace(/[ ]+/g, " ");
  text = text.replace(/^ /, "");
  text = text.replace(/ $/, "");
  return text.split(" ").length;
};

export default {
  namespaced: true,
  state: {
    evento_poster: [
      { text: "ExpoPóster", value: String(new Date().getFullYear()) },
    ],
    tipo_poster: [
      {
        text: "Proyecto de investigación",
        value: "PI",
      },
      { text: "Trabajo de grado", value: "TG" },
      {
        text: "Semillero de investigación",
        value: "SI",
      },
      { text: "Otro", value: "O", label: "Ingrese el otro" },
    ],
    detalle_tipo_labels: {
      PI: { label: "Nombre del grupo de investigación (opcional)" },
      TG: { label: null },
      SI: { label: "Nombre del Semillero (opcional)" },
      O: { label: "Ingrese otro" },
    },
    headers: [
      { text: "Dni", value: "dni", sortable: false },
      { text: "Nombres", value: "nombres", sortable: false },
      { text: "Apellidos", value: "apellidos", sortable: false },
      { text: "Acciones", value: "action", sortable: false },
    ],
    defaultAutor: {
      // id_participante_poster: null,
      dni: null,
      nombres: null,
      apellidos: null,
      email: null,
      telefono: null,
      institucion: null,
      programa: null,
      asesor: null,
    },
    rules: {
      noEmpty: (t: any) => !!t || "Campo requerido",
      email: (v: any) =>
        /^\S+?@(?:[^\s.]+\.)+[^\s.]{2,}$/.test(v) ||
        "dirección de correo no valida",
      onlyNum: (v: any) => /^([0-9])*$/.test(v) || "Ingrese solo números",

      // eslint-disable-next-line
      maxWords: (n: number) => {
        // eslint-disable-next-line
        return (t: any) =>
          countWords(t) <= n || `Solo puedes usar ${n} palabras`;
      },
      maxLength: (n: number) => {
        // eslint-disable-next-line
        return (t: any) =>
          !t || t.length <= n || `Solo puedes usar máximo ${n} caracteres`;
      },
    },
    instituciones: [
      { text: "Corporacion Universitaria del Meta" },
      { text: "Universidad de La Salle" },
      { text: "Instituto de Educacion Tecnica Profesional de Roldanillo" },
      { text: "Corporacion Universitaria Antonio Jose de Sucre - CORPOSUCRE" },
      { text: "Universidad de Antioquia" },
      { text: "Universidad de Medellin" },
      { text: "Universidad Popular del Cesar" },
      {
        text:
          "Corporacion Universitaria de Ciencias Empresariales, Educacion y Salud - CORSALUD",
      },
      { text: "Universidad Manuela Beltran - UMB" },
      { text: "Universidad Autonoma de Manizales" },
      { text: "Universidad del Valle" },
      { text: "Universidad Libre" },
      { text: "Universidad Autonoma del Caribe" },
      { text: "Fundacion Universitaria Juan de Castellanos" },
      { text: "Corporacion Universitaria Minuto de Dios - UNIMINUTO" },
      { text: "Universidad de Manizales" },
      { text: "Fundacion de Educacion Superior San Jose - FESSANJOSE" },
      { text: "Fundacion Universitaria Bellas Artes" },
      { text: "UNIPANAMERICANA - Fundacion Universitaria Panamericana" },
      { text: 'Universidad Tecnologica del Choco "Diego Luis Cordoba"' },
      {
        text:
          "Fundacion Universitaria Cervantina San Agustin - UNICERVANTINA San Agustin",
      },
      {
        text:
          "Corporacion Universitaria para el Desarrollo Empresarial y Social - CUDES",
      },
      { text: "Universidad Nacional de Colombia" },
      { text: "Corporacion Universitaria Minuto de Dios - UNIMINUTO" },
      { text: "Institucion Universitaria Salazar y Herrera" },
      { text: "Universidad Pedagogica y Tecnologica de Colombia" },
      { text: "Universidad Libre" },
      { text: 'Fundacion Universidad de Bogota "Jorge Tadeo Lozano"' },
      { text: "Universidad Francisco de Paula Santander" },
      { text: "Corporacion Colegiatura Colombiana" },
      { text: "Corporacion Universitaria Latinoamericana - CUL" },
      { text: "Universidad de Caldas" },
      { text: "Corporacion Universitaria UNITEC" },
      {
        text:
          'Fundacion para la Educacion Superior San Mateo "Fundacion San Mateo"',
      },
      { text: "Conservatorio del Tolima" },
      { text: "Universidad Nacional Autónoma de México" },
      { text: "Universidad INCCA de Colombia" },
      { text: "Universidad Cooperativa de Colombia" },
      { text: "Colegio de Estudios Superiores de Administracion - CESA" },
      { text: 'Fundacion Universidad de Bogota "Jorge Tadeo Lozano"' },
      { text: "Universidad El Bosque" },
      { text: "Colegio Mayor del Cauca" },
      { text: "Universidad de San Buenaventura" },
      { text: "Universidad - Colegio Mayor de Cundinamarca" },
      { text: "Universidad Sergio Arboleda" },
      { text: "Universidad Antonio Nariño" },
      { text: "Universidad Sergio Arboleda" },
      { text: "Universidad del Quindio" },
      { text: "Universidad Nacional Abierta y a Distancia UNAD" },
      { text: "Fundacion Universitaria CAFAM" },
      { text: "Fundacion Universitaria Comfenalco Santander" },
      { text: "Corporacion Universidad Piloto de Colombia" },
      { text: "Fundacion Universitaria de Popayan" },
      { text: 'Escuela Militar de Aviacion "Marco Fidel Suarez"' },
      { text: "Unidades Tecnologicas de Santander" },
      { text: "Universidad Popular del Cesar" },
      { text: "Pontificia Universidad Javeriana" },
      { text: "Fundacion Universitaria Autonoma de las Americas" },
      { text: "Fundacion Universitaria Tecnologico COMFENALCO - Cartagena" },
      { text: "Universidad Libre" },
      { text: "Colegio Mayor de Nuestra Señora del Rosario" },
      { text: "Universidad Libre" },
      { text: "Universidad de Antioquia" },
      { text: "Universidad Surcolombiana" },
      { text: "Universidad Autonoma de Bucaramanga - UNAB" },
      { text: "Universidad Catolica de Manizales" },
      { text: "Universidad EAN" },
      { text: "Universidad de la Amazonia" },
      { text: "Fundacion Universitaria de Ciencias de la Salud" },
      { text: "Fundacion Universitaria Navarra - UNINAVARRA" },
      { text: "Universidad Catolica de Pereira" },
      { text: "Universidad Santo Tomas" },
      { text: "Institucion Universitaria Colegios de Colombia - UNICOC" },
      {
        text:
          "Fundacion de Estudios Superiores Universitarios de Uraba Antonio Roldan Betancur",
      },
      { text: "Universidad Industrial de Santander" },
      { text: "Universidad de La Sabana" },
      { text: "Universidad de San Buenaventura" },
      { text: "Pontificia Universidad Javeriana" },
      { text: "Corporacion Universitaria del Huila - CORHUILA" },
      { text: "Corporacion Universitaria U de Colombia" },
      { text: "Universidad de San Buenaventura" },
      {
        text: 'Corporacion Universitaria de Investigacion y Desarrollo - "UDI"',
      },
      { text: "Politecnico Grancolombiano" },
      { text: 'Fundacion Universitaria "Maria Cano"' },
      { text: "Universidad Nacional de Colombia" },
      { text: "Institucion  Universitaria Pascual Bravo" },
      { text: "Corporacion Universitaria Taller Cinco Centro de Diseño" },
      { text: "Institucion Universitaria Escolme" },
      { text: "Unidad Central del Valle del Cauca" },
      { text: "Universidad de Cundinamarca - UDEC" },
      { text: "Corporacion Universitaria Americana" },
      { text: "Corporacion Universitaria CENDA" },
      { text: "Institucion Universitaria ITSA" },
      {
        text: "Corporacion Universitaria de Ciencia y Desarrollo - UNICIENCIA",
      },
      { text: "Universidad Catolica de Colombia" },
      { text: "Universidad de Cundinamarca - UDEC" },
      { text: "Universidad la Gran Colombia" },
      { text: "Fundacion Universitaria Colombo Internacional - UNICOLOMBO" },
      { text: "Fundacion Universidad de America" },
      { text: "Institucion Universitaria Colombo Americana - UNICA" },
      { text: "Escuela Nacional del Deporte" },
      { text: "Universidad de San Buenaventura" },
      { text: 'Escuela Naval de Cadetes "Almirante Padilla"' },
      { text: "Corporacion Universitaria Centro Superior - UNICUCES" },
      { text: "Universidad de Santander - UDES" },
      { text: "Universidad Libre" },
      { text: "Universidad de Sucre" },
      { text: "Corporacion Universitaria Autonoma de Nariño - AUNAR" },
      { text: "Universidad Nacional de Colombia" },
      { text: "Universidad Pontificia Bolivariana" },
      { text: "Universidad Santo Tomas" },
      { text: "Universidad de Ciencias Aplicadas y Ambientales UDCA" },
      { text: "Universidad Central" },
      { text: "Fundacion Universitaria - CEIPA" },
      { text: 'Universidad Distrital "Francisco Jose de Caldas"' },
      {
        text:
          'Fundacion de Estudios Superiores "Monseñor Abraham Escudero Montoya" - FUNDES',
      },
      { text: "Universidad Pontificia Bolivariana" },
      { text: "Corporacion Escuela Tecnologica del Oriente" },
      {
        text:
          "Fundacion Universitaria Empresarial de la Camara de Comercio de Bogotá",
      },
      {
        text:
          "Escuela de Inteligencia y Contrainteligencia Brigadier General Ricardo Charry Solano",
      },
      { text: "Corporacion Universitaria de Asturias" },
      { text: "Fundacion Universitaria Catolica Lumen Gentium" },
      { text: "Universidad CES" },
      { text: "Universidad Autonoma de Occidente" },
      { text: "Corporacion Escuela de Artes y Letras" },
      {
        text:
          "Instituto Superior de Ciencias Sociales y Economico Familiares - ICSEF",
      },
      {
        text:
          "Corporacion Universitaria Empresarial Alexander Von Humboldt - C.U.E.",
      },
      { text: "Universidad Metropolitana" },
      { text: "Corporacion Universitaria de Santa Rosa de Cabal - UNISARC" },
      { text: "Fundacion Universitaria Claretiana - UNICLARETIANA" },
      { text: 'Escuela Colombiana de Ingenieria "Julio Garavito"' },
      { text: "Universidad Santo Tomas" },
      { text: "Universidad Santiago de Cali" },
      { text: "Corporacion Universitaria Lasallista" },
      { text: "Corporacion Universitaria del Caribe - CECAR" },
      { text: "Corporacion Universitaria Republicana" },
      { text: "Colegio Mayor de Bolivar" },
      { text: "Corporacion Universitaria Autonoma del Cauca" },
      { text: "Corporacion de Estudios Tecnologicos del Norte del Valle" },
      { text: "Universidad La Gran Colombia" },
      { text: "Universidad de La Guajira" },
      { text: "Universidad Tecnologica de Bolivar" },
      { text: "Universidad de Ibague" },
      { text: "Universidad de Antioquia" },
      { text: "Fundacion de Estudios Superiores Comfanorte - F.E.S.C." },
      { text: "Universidad Manuela Beltran - UMB" },
      { text: "Fundacion Universitaria Seminario Biblico de Colombia - FUSBC" },
      { text: "Universidad de Nariño" },
      { text: "Universidad ECCI" },
      { text: 'Universidad Militar "Nueva Granada"' },
      { text: "Fundacion Universitaria del Area Andina" },
      { text: "Corporacion Universitaria Empresarial de Salamanca" },
      { text: "Fundacion Universitaria para el Desarrollo Humano - UNINPAHU" },
      { text: "Fundacion Escuela Colombiana de Rehabilitacion" },
      { text: "Fundacion Universitaria Monserrate - UNIMONSERRATE" },
      { text: "Escuela de Comunicaciones" },
      { text: "Universidad Cooperativa de Colombia" },
      { text: "Instituto Tecnologico Metropolitano" },
      { text: "Instituto Universitario de la Paz" },
      { text: "Instituto Tecnologico del Putumayo" },
      {
        text:
          "Institucion Universitaria de Colombia - Universitaria de Colombia",
      },
      { text: "Institucion Universitaria Bellas Artes y Ciencias de Bolivar" },
      { text: "Universidad Cooperativa de Colombia" },
      { text: "Fundacion Universitaria del Area Andina" },
      { text: "Universidad de los Llanos" },
      { text: "Fundacion Universitaria Konrad Lorenz" },
      { text: "Universidad Pedagogica y Tecnologica de Colombia" },
      { text: 'Politecnico Colombiano "Jaime ISAZA Cadavid"' },
      { text: "Universidad Cooperativa de Colombia" },
      { text: "Universidad Nacional de Colombia" },
      { text: "Escuela Superior de Administracion Publica - ESAP" },
      { text: "Fundacion Escuela Tecnologica de Neiva - Jesus Oviedo Perez" },
      { text: "Universidad EIA" },
      { text: 'Universidad del Sinú "Elías Bechara Zainúm" - UNISINÚ' },
      { text: "Universidad Pedagogica Nacional" },
      { text: "Fundacion Universitaria Juan N. Corpas" },
      { text: "Instituto Tolimense de Formacion Tecnica Profesional" },
      { text: "Direccion Nacional de Escuelas" },
      { text: "Instituto Departamental de Bellas Artes" },
      { text: "Universidad del Tolima" },
      { text: "Universidad del Cauca" },
      { text: "Universitaria Agustiniana - UNIAGUSTINIANA" },
      { text: "Universidad Pontificia Bolivariana" },
      { text: "Fundacion Universidad Autonoma de Colombia - FUAC" },
      { text: "Corporacion Universitaria Iberoamericana" },
      { text: "Universidad Cooperativa de Colombia" },
      { text: "Universidad de los Andes" },
      { text: "Fundacion Universitaria Horizonte" },
      { text: "Universidad de Boyaca - Uniboyaca" },
      { text: "Institucion Universitaria Marco Fidel Suarez" },
      { text: "Corporacion Universitaria de Sabaneta - UNISABANETA" },
      { text: "Escuela Tecnologica Instituto Tecnico Central" },
      {
        text:
          "ELITE - Escuela Latinoamericana de Ingenieros, Tecnologos y Empresarios",
      },
      { text: "Universidad de Cordoba" },
      { text: "Fundacion Universitaria Internacional del Tropico Americano" },
      { text: "Corporacion Universidad Piloto de Colombia" },
      { text: "Corporacion Unificada Nacional de Educacion Superior - CUN" },
      { text: "Universidad de Antioquia" },
      { text: "Fundacion Universitaria Agraria de Colombia - UNIAGRARIA" },
      { text: "Fundacion Universitaria los Libertadores" },
      { text: "Universidad Santiago de Cali" },
      { text: "Escuela de Ingenieros Militares" },
      { text: "Institucion Universitaria Antonio Jose Camacho - UNIAJC" },
      { text: "Corporacion Universitaria Comfacauca - UNICOMFACAUCA" },
      { text: "Universidad de Cundinamarca - UDEC" },
      { text: "Universidad de Pamplona" },
      { text: "Universidad del Norte" },
      { text: "Universidad Pontificia Bolivariana" },
      { text: "Universidad de Antioquia" },
      { text: "Universidad Francisco de Paula Santander" },
      { text: "Fundacion Universitaria Luis Amigo FUNLAM" },
      { text: "Universidad Mariana" },
      { text: 'Universidad del Sinú "Elías Bechara Zainúm" - UNISINÚ' },
      { text: "Universidad ICESI" },
      { text: "Universidad del Atlantico" },
      { text: "Universidad Autonoma Latinoamericana - UNAULA" },
      { text: "Universidad Libre" },
      { text: "Escuela de Administracion y Mercadotecnia del Quindio" },
      { text: "Universidad Pedagogica y Tecnologica de Colombia" },
      { text: "Universitaria Virtual Internacional" },
      {
        text:
          "Fundacion Universitaria Seminario Teologico Bautista Internacional - Unibautista",
      },
      { text: "Fundacion Universitaria Catolica del Norte" },
      { text: "Corporacion Universitaria Rafael Nuñez" },
      { text: "Corporacion Universitaria Regional del Caribe - IAFIC" },
      { text: "Corporacion Universitaria Reformada - CUR" },
      { text: "Universidad del Magdalena - UNIMAGDALENA" },
      { text: "Universidad EAFIT" },
      { text: "Escuela de Logistica" },
      { text: "Fundacion Universitaria Sanitas" },
      { text: "Corporacion Politecnico de la Costa Atlantica" },
      { text: "Universidad Simon Bolivar" },
      { text: "Corporacion Universitaria Adventista" },
      { text: "Corporacion Universitaria de Colombia IDEAS" },
      { text: "Corporacion Tecnologica Industrial Colombiana - TEINCO" },
      { text: 'Escuela Militar de Cadetes "General Jose Maria Cordova"' },
      { text: "Universidad de Cartagena" },
      { text: "Corporacion Universidad de la Costa, CUC" },
      { text: "Corporacion Universitaria Remington" },
      { text: "Tecnologico de Antioquia" },
      { text: "Institucion Universitaria de Envigado" },
      { text: "Colegio Mayor de Antioquia" },
      { text: "Universidad Pedagogica y Tecnologica de Colombia" },
      { text: "Fundación Universitaria San Alfonso - FUSA" },
      { text: "Fundacion Universitaria de San Gil - UNISANGIL" },
      { text: "Universidad Externado de Colombia" },
      { text: "Universidad Tecnologica de Pereira - ITP" },
      {
        text:
          "Institucion Universitaria Centro de Estudios Superiores Maria Goretti",
      },
      { text: "Universidad Catolica de Oriente" },
      { text: "Institucion Universitaria Latina - UNILATINA" },
      { text: "Fundacion Universitaria ESUMER" },
      { text: "Universidad del Pacifico" },
      { text: "Fundacion Universitaria San Martin" },
      { text: "Corporacion Internacional para el Desarrollo Educativo - CIDE" },
      { text: "Servicio Nacional de Aprendizaje - SENA" },
    ],
    atributosPoster: [
      // {
      //   clave: 'resumen',
      //   max: 100,
      // },
      {
        clave: "introduccion",
        max: 500,
      },
      // {
      //   clave: 'problema_inv',
      //   max: 250,
      // },
      // {
      //   clave: 'ref_teorico',
      //   max: 250,
      // },
      {
        clave: "objetivo_general",
        max: 150,
      },
      // {
      //   clave: 'objetivo_especifico',
      //   max: 150,
      // },
      {
        clave: "metodologia",
        max: 250,
      },
      {
        clave: "resultados",
        max: 500,
      },
      {
        clave: "conclusiones",
        max: 250,
      },
      // {
      //   clave: 'referencias',
      //   max: 250,
      // },
    ],
    countWords,
  },
  mutations: {},
  actions: {},
  modules: {},
};