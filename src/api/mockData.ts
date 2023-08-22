import { ISoldItem } from "../Interfaces";

export const statusData = {
  late: {
    color: "red.500",
    title: "Estás demorado",
    message:
      "Dale el paquete al Correo Uruguayo cuanto antes para que no afecte tu reputación.",
  },
  prepareDispatch: {
    color: "orange",
    title: "Debes preparar el paquete",
    message:
      "Debes preparar el paquete para su despacho cuanto antes para que no afecte tu reputación.",
  },
  talkWithBuyer: {
    color: "orange",
    message: "Debes coordinar la entrega del paquete con el comprador.",
    title: "Coordinar con el comprador",
  },
  readyToDispatch: {
    color: "orange",
    title: "Listo para despachar",
    message: "Dale el paquete al Correo Uruguayo en las próximas 24 horas",
  },
  onTheWay: {
    color: "white",
    title: "En camino",
    message:
      "Tu paquete será entregado por el Correo Uruguayo en los próximos días",
  },
  openClaim: {
    color: "red.500",
    title: "Reclamo abierto",
    message:
      "Tu paquete ha recibido un reclamo, soluciona el mismo lo mas pronto posible para que no afecte tu reputación",
  },
  completed: {
    color: "white",
    title: "Venta concretada",
    message: "El comprador ha confirmado que recibió el paquete",
  },
  notCompleted: {
    color: "white",
    title: "Sin concretar",
    message: "El comprador aún no  ha confirmado que recibió el paquete",
  },
};

export const mockItems: ISoldItem[] = [
  {
    name: "Samsung Galaxy S21",
    status: "completed",
    price: 980.42,
    amount: 3,
    currency: "$",
    code: 4539,
    date: "08/09/2023",
    thumbnail:
      "https://f.fcdn.app/imgs/651fe9/stienda.uy/sam/33c6/original/catalogo/s21fe88060928363722/1500-1500/samsung-galaxy-s21-fe-128gb-5g-graphite-buds2-de-regalo.jpg",
    buyer: {
      name: "Carlos García",
      thumbnail: "https://loremflickr.com/320/240/face,full,man/all",
      messages: {
        newMessageAmount: 5,
        hasPreviousMessages: true,
      },
    },
  },
  {
    name: "Apple iPhone 13",
    status: "onTheWay",
    price: 1050.25,
    amount: 1,
    currency: "U$S",
    code: 8671,
    date: "02/04/2022",
    thumbnail:
      "https://www.iplace.com.uy/ccstore/v1/images/?source=/file/v720176437334267563/products/100001651.00-apple-iphone-13-128-gb-azul-medianoche-mlpf-3-lza.jpg",
    buyer: {
      name: "Lucía Rodríguez",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 1,
        hasPreviousMessages: false,
      },
    },
  },

  {
    name: "Samsung Galaxy S21 Ultra",
    status: "late",
    price: 1199.99,
    amount: 1,
    currency: "U$S",
    code: 22356,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_976294-MLA44846378818_022021-O.webp",
    buyer: {
      name: "Esteban Ruiz",
      thumbnail: "https://loremflickr.com/320/240/face,full,man/all",
      messages: {
        newMessageAmount: 2,
        hasPreviousMessages: true,
      },
    },
    date: "15/05/2022",
    details: {
      name: "Storage",
      value: "256GB",
    },
  },
  {
    name: "Huawei P50 Pro",
    status: "talkWithBuyer",
    price: 1099.99,
    amount: 1,
    currency: "$",
    code: 22357,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_888882-MLA49739271414_042022-O.webp",
    buyer: {
      name: "Rosa Fernandez",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 5,
        hasPreviousMessages: false,
      },
    },
    date: "20/08/2022",
    details: {
      name: "Camera",
      value: "50MP Ultra Vision",
    },
  },
  {
    name: "OnePlus 9 Pro",
    status: "prepareDispatch",
    price: 899.99,
    amount: 1,
    currency: "U$S",
    code: 22358,
    thumbnail:
      "https://http2.mlstatic.com/D_Q_NP_616276-MLA48484010519_122021-O.webp",
    buyer: {
      name: "Julio Gutierrez",
      thumbnail: "https://loremflickr.com/320/240/face,full,man/all",
      messages: {
        newMessageAmount: 0,
        hasPreviousMessages: false,
      },
    },
    date: "07/03/2023",
    details: {
      name: "Battery",
      value: "4500mAh",
    },
  },
  {
    name: "Sony Xperia 1 III",
    status: "completed",
    price: 999.99,
    amount: 1,
    currency: "$",
    code: 22359,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_838852-MLU49358300530_032022-O.webp",
    buyer: {
      name: "Carmen Ortiz",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 3,
        hasPreviousMessages: true,
      },
    },
    date: "22/10/2022",
    details: {
      name: "Display",
      value: "4K HDR OLED",
    },
  },
  {
    name: "iPhone 13 Pro Max",
    status: "onTheWay",
    price: 1299.99,
    amount: 1,
    currency: "U$S",
    code: 22360,
    thumbnail:
      "https://ofertas.movistar.com.uy/off/img/20220909122128-Apple-iPhone-13-Pro-Max.webp",
    buyer: {
      name: "Diego Vargas",
      thumbnail: "https://loremflickr.com/320/240/face,full,man/all",
      messages: {
        newMessageAmount: 1,
        hasPreviousMessages: false,
      },
    },
    date: "18/02/2023",
    details: {
      name: "Color",
      value: "Graphite",
    },
  },
  {
    name: "Google Pixel 6",
    status: "openClaim",
    price: 799.99,
    amount: 1,
    currency: "U$S",
    code: 22361,
    thumbnail: "https://chequealo.uy/cpanelBW/imagesBW/640172.webp",
    buyer: {
      name: "Mariana Torres",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 4,
        hasPreviousMessages: true,
      },
    },
    date: "04/11/2022",
    details: {
      name: "Processor",
      value: "Google Tensor",
    },
  },
  {
    name: "Motorola Edge 20 Pro",
    status: "readyToDispatch",
    price: 699.99,
    amount: 1,
    currency: "$",
    code: 22362,
    thumbnail:
      "https://http2.mlstatic.com/D_Q_NP_737604-MLA48162226549_112021-O.webp",
    buyer: {
      name: "Carlos López",
      thumbnail: "https://loremflickr.com/320/240/face,full,man/all",
      messages: {
        newMessageAmount: 0,
        hasPreviousMessages: false,
      },
    },
    date: "12/01/2023",
    details: {
      name: "Camera",
      value: "108MP Main Sensor",
    },
  },
  {
    name: "Xiaomi Mi 11 Ultra",
    status: "notCompleted",
    price: 999.99,
    amount: 1,
    currency: "U$S",
    code: 22363,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_611229-MLA46773570513_072021-O.webp",
    buyer: {
      name: "Isabel Rodriguez",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 2,
        hasPreviousMessages: true,
      },
    },
    date: "30/06/2022",
    details: {
      name: "Battery",
      value: "5000mAh",
    },
  },
  {
    name: "Realme GT",
    status: "completed",
    price: 649.99,
    amount: 1,
    currency: "$",
    code: 22364,
    thumbnail: "https://tiendazero.com.uy/wp-content/uploads/01-realme-gt.jpg",
    buyer: {
      name: "Miguel Ramírez",
      thumbnail: "https://loremflickr.com/320/240/face,full,man/all",
      messages: {
        newMessageAmount: 1,
        hasPreviousMessages: true,
      },
    },
    date: "27/07/2023",
    details: {
      name: "Display",
      value: "120Hz Super AMOLED",
    },
  },
  {
    name: "Asus ROG Phone 5",
    status: "talkWithBuyer",
    price: 1199.99,
    amount: 1,
    currency: "U$S",
    code: 22365,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_941889-MLA46273160947_062021-O.webp",
    buyer: {
      name: "Teresa Sánchez",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 3,
        hasPreviousMessages: false,
      },
    },
    date: "16/09/2022",
    details: {
      name: "Audio",
      value: "Dual Front-facing speakers",
    },
  },
  {
    name: "Sony Xperia 1 III",
    status: "onTheWay",
    price: 1099.99,
    amount: 1,
    currency: "$",
    code: 22366,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_838852-MLU49358300530_032022-O.webp",
    buyer: {
      name: "Gabriela Herrera",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 4,
        hasPreviousMessages: false,
      },
    },
    date: "10/10/2023",
    details: {
      name: "Display",
      value: "4K OLED",
    },
  },
  {
    name: "OnePlus 9 Pro",
    status: "late",
    price: 929.99,
    amount: 1,
    currency: "U$S",
    code: 22367,
    thumbnail:
      "https://oasis.opstatics.com/content/dam/oasis/page/2021/9-series/spec-image/9-pro/Morning%20mist-gallery.png",
    buyer: {
      name: "Alejandro Peña",
      thumbnail: "https://loremflickr.com/320/240/face,full,man/all",
      messages: {
        newMessageAmount: 1,
        hasPreviousMessages: true,
      },
    },
    date: "05/03/2022",
    details: {
      name: "Camera",
      value: "Hasselblad Partnership",
    },
  },
  {
    name: "Oppo Find X3 Pro",
    status: "prepareDispatch",
    price: 1049.99,
    amount: 1,
    currency: "U$S",
    code: 22368,
    thumbnail: "https://m.media-amazon.com/images/I/71LVlOtMdSL.jpg",
    buyer: {
      name: "Luisa Fernández",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 3,
        hasPreviousMessages: false,
      },
    },
    date: "22/11/2022",
    details: {
      name: "Battery",
      value: "4500mAh with 65W Fast Charge",
    },
  },
  {
    name: "Vivo X60 Pro+",
    status: "completed",
    price: 899.99,
    amount: 1,
    currency: "$",
    code: 22369,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_784483-MLA52132205268_102022-O.webp",
    buyer: {
      name: "Javier Castillo",
      thumbnail: "https://loremflickr.com/320/240/face,full,man/all",
      messages: {
        newMessageAmount: 0,
        hasPreviousMessages: true,
      },
    },
    date: "15/04/2023",
    details: {
      name: "Processor",
      value: "Snapdragon 888",
    },
  },
  {
    name: "ZTE Axon 30 Ultra",
    status: "talkWithBuyer",
    price: 749.99,
    amount: 1,
    currency: "U$S",
    code: 22370,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_749503-MLA49125950518_022022-O.webp",
    buyer: {
      name: "Rosa Mendoza",
      thumbnail: "https://loremflickr.com/320/240/face,full,woman/all",
      messages: {
        newMessageAmount: 2,
        hasPreviousMessages: true,
      },
    },
    date: "29/08/2022",
    details: {
      name: "Camera",
      value: "Triple 64MP Rear Cameras",
    },
  },
];
