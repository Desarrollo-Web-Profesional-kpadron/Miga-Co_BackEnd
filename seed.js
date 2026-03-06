const mongoose = require("mongoose");
const Producto = require("./src/models/Producto");
require("dotenv").config();

const productosIniciales = [
  {
    nombre: "Pastel Gourmet de Chocolate Belga",
    categoria: "Pasteles",
    subcategoria: "Gourmet",
    tipo_producto: "preparado",
    descripcion:
      "Pastel de tres capas con ganache de chocolate 70% cacao. Una delicia para los amantes del chocolate.",
    precio: 450,
    stock: { sucursal_centro: 5, sucursal_norte: 2 },
    multimedia: {
      fotos_exterior: [
        "https://i.imgur.com/abcdef1.jpg",
        "https://i.imgur.com/abcdef2.jpg",
      ],
    },
    ingredientes: ["Harina", "Huevos", "Azúcar", "Chocolate 70%"],
    porcion: "12 porciones",
    conservacion: "Mantener en refrigeración a 4°C",
    ficha_sensorial: {
      dulzor: 3,
      textura: 4,
      intensidad: 5,
      alergenos: ["Gluten", "Lácteos", "Nueces"],
    },
    personalizable: {
      permite_mensaje: true,
      rellenos_disponibles: ["Fresa", "Cajeta", "Crema de Avellana"],
      coberturas_disponibles: ["Chocolate Negro", "Vainilla"],
    },
    tags: ["chocolate", "cumpleaños", "gourmet"],
  },
  {
    nombre: "Torta Red Velvet",
    categoria: "Pasteles",
    subcategoria: "Especiales",
    tipo_producto: "preparado",
    descripcion: "Clásica torta red velvet con frosting de queso crema.",
    precio: 380,
    stock: { sucursal_centro: 3, sucursal_norte: 4 },
    multimedia: {
      fotos_exterior: [
        "https://i.pinimg.com/1200x/33/c9/f7/33c9f7ecb35642043318a7c80c58c489.jpg",
        "https://i.pinimg.com/736x/f0/c1/91/f0c1917eefe09ad2f523cc5f370b9deb.jpg",
      ],
    },
    ingredientes: ["Harina", "Cacao", "Colorante rojo", "Queso crema"],
    porcion: "10 porciones",
    conservacion: "Conservar tapado en refrigeración",
    ficha_sensorial: {
      dulzor: 1,
      textura: 2,
      intensidad: 4,
      alergenos: ["Gluten", "Lácteos"],
    },
    personalizable: {
      permite_mensaje: true,
      rellenos_disponibles: ["Cheesecake", "Vainilla"],
      coberturas_disponibles: ["Queso Crema"],
    },
    tags: ["frutal", "romántico", "clásico"],
  },
  {
    nombre: "Galletas de Chocolate Chip",
    categoria: "Repostería y Galletas",
    subcategoria: "Galletas",
    tipo_producto: "preparado",
    descripcion:
      "Galletas caseras con chips de chocolate derretido. Pack de 12 unidades.",
    precio: 120,
    stock: { sucursal_centro: 15, sucursal_norte: 10 },
    multimedia: {
      fotos_exterior: [
        "https://i.pinimg.com/1200x/33/c9/f7/33c9f7ecb35642043318a7c80c58c489.jpg",
        "https://i.pinimg.com/736x/f0/c1/91/f0c1917eefe09ad2f523cc5f370b9deb.jpg",
        "https://mx.pinterest.com/pin/85286986688548389/",
      ],
    },
    ingredientes: ["Harina", "Azúcar", "Mantequilla", "Chips de chocolate"],
    porcion: "Pack de 12",
    conservacion: "Mantener en lugar fresco y seco",
    ficha_sensorial: {
      dulzor: 4,
      textura: 3,
      intensidad: 2,
      alergenos: ["Gluten", "Lácteos"],
    },
    personalizable: {
      permite_mensaje: false,
      rellenos_disponibles: [],
      coberturas_disponibles: [],
    },
    tags: ["chocolate", "galletas", "casero"],
  },
  {
    nombre: "Pan de Masa Madre",
    categoria: "Panadería",
    subcategoria: "Pan",
    tipo_producto: "preparado",
    descripcion:
      "Pan artesanal elaborado con masa madre de 48 horas. Corteza crujiente.",
    precio: 85,
    stock: { sucursal_centro: 8, sucursal_norte: 6 },
    multimedia: {
      fotos_exterior: ["https://i.imgur.com/stuvwx1.jpg"],
    },
    ingredientes: ["Harina", "Agua", "Masa madre", "Sal"],
    porcion: "1 pieza de 500g",
    conservacion: "Conservar en bolsa de papel a temperatura ambiente",
    ficha_sensorial: {
      dulzor: 1,
      textura: 2,
      intensidad: 1,
      alergenos: ["Gluten"],
    },
    personalizable: {
      permite_mensaje: false,
      rellenos_disponibles: [],
      coberturas_disponibles: [],
    },
    tags: ["artesanal", "pan", "saludable"],
  },
  {
    nombre: "Gelatina de Fresa 500g",
    categoria: "Gelatinas",
    subcategoria: "Gelatinas",
    tipo_producto: "preparado",
    descripcion:
      "Gelatina casera de fresa pura con frutas. Perfecta para eventos.",
    precio: 60,
    stock: { sucursal_centro: 12, sucursal_norte: 8 },
    multimedia: {
      fotos_exterior: ["https://i.imgur.com/yzabcd1.jpg"],
    },
    ingredientes: ["Agua", "Gelatina", "Azúcar", "Fresa"],
    porcion: "500g",
    conservacion: "Refrigerar y consumir en 3 días",
    ficha_sensorial: { dulzor: 3, textura: 2, intensidad: 2, alergenos: [] },
    personalizable: {
      permite_mensaje: false,
      rellenos_disponibles: [],
      coberturas_disponibles: [],
    },
    tags: ["frutal", "refrescante", "ligero"],
  },
  {
    nombre: "Chocolate Premium 70% Cacao",
    categoria: "Materias Primas",
    subcategoria: "Ingredientes",
    tipo_producto: "materia_prima",
    descripcion:
      "Chocolate premium importado de Ecuador. 500g. Ideal para repostería profesional.",
    precio: 280,
    stock: { sucursal_centro: 20, sucursal_norte: 15 },
    multimedia: {
      fotos_exterior: ["https://i.imgur.com/efghij1.jpg"],
    },
    ingredientes: ["Cacao 70%", "Azúcar", "Manteca de cacao"],
    porcion: "500g",
    conservacion: "Mantener en lugar fresco y seco",
    ficha_sensorial: {
      dulzor: 2,
      textura: 1,
      intensidad: 5,
      alergenos: ["Lácteos"],
    },
    personalizable: {
      permite_mensaje: false,
      rellenos_disponibles: [],
      coberturas_disponibles: [],
    },
    tags: ["chocolate", "ingrediente", "premium"],
  },
  {
    nombre: "Harina de Trigo Integral",
    categoria: "Materias Primas",
    subcategoria: "Ingredientes",
    tipo_producto: "materia_prima",
    descripcion:
      "Harina de trigo integral molida finamente. 1kg. Excelente para pan integral.",
    precio: 45,
    stock: { sucursal_centro: 30, sucursal_norte: 25 },
    multimedia: {
      fotos_exterior: ["https://i.imgur.com/klmnop1.jpg"],
    },
    ingredientes: ["Trigo integral"],
    porcion: "1kg",
    conservacion: "Almacenar en lugar seco",
    ficha_sensorial: {
      dulzor: 0,
      textura: 1,
      intensidad: 0,
      alergenos: ["Gluten"],
    },
    personalizable: {
      permite_mensaje: false,
      rellenos_disponibles: [],
      coberturas_disponibles: [],
    },
    tags: ["saludable", "integral", "ingrediente"],
  },
  {
    nombre: "Cupcakes Vainilla con Frosting",
    categoria: "Pasteles",
    subcategoria: "Especiales",
    tipo_producto: "preparado",
    descripcion:
      "Pack de 6 cupcakes de vainilla con frosting decorado. Personalizables.",
    precio: 190,
    stock: { sucursal_centro: 7, sucursal_norte: 3 },
    multimedia: {
      fotos_exterior: [
        "https://i.imgur.com/qrstuv1.jpg",
        "https://i.imgur.com/qrstuv2.jpg",
      ],
    },
    ingredientes: ["Harina", "Azúcar", "Huevos", "Leche", "Vainilla"],
    porcion: "Pack de 6",
    conservacion: "Refrigerar y consumir en 2 días",
    ficha_sensorial: {
      dulzor: 3,
      textura: 3,
      intensidad: 3,
      alergenos: ["Gluten", "Lácteos"],
    },
    personalizable: {
      permite_mensaje: true,
      rellenos_disponibles: ["Chocolate", "Frutas"],
      coberturas_disponibles: ["Fondant", "Buttercream"],
    },
    tags: ["vainilla", "festivo", "personalizado"],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // Limpiar colección
    await Producto.deleteMany({});
    console.log("🗑️  Productos anteriores eliminados");

    // Insertar nuevos productos
    const resultado = await Producto.insertMany(productosIniciales);
    console.log(`✅ ${resultado.length} productos insertados correctamente`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedDB();
