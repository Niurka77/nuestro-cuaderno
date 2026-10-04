// ============================================
//  CONFIGURACIÓN DE FIREBASE
//
//  1) Copia este archivo como "firebase-config.js" (queda fuera del repo a
//     propósito: es tu configuración personal y nunca debe subirse).
//  2) Pega aquí los datos de TU proyecto de Firebase:
//     Console de Firebase > Configuración > Tus apps > Web (</>) > objeto config
//  3) Mientras la URL contenga "PON_AQUI" la app funciona solo en este
//     dispositivo (sin nube). Al rellenar los datos, se activa la sincronización.
// ============================================

window.FIREBASE_CONFIG = {
  authDomain: "PON_AQUI.firebaseapp.com",
  databaseURL: "https://PON_AQUI-default-rtdb.firebaseio.com",
  projectId: "PON_AQUI",
  storageBucket: "PON_AQUI.appspot.com"
};

// Clave de sincronización: todos tus dispositivos deben usar el MISMO valor
// para ver el mismo cuaderno. Elígela tú y no la publiques.
window.SYNC_KEY = "PON_AQUI";