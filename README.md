# Nuestro Cuaderno

**Agenda, planificador y control de gastos personal, instalable (PWA), en español, sin servidor propio y con sincronización entre tus dispositivos.**

Un solo archivo HTML, sin dependencias, sin build y sin frameworks: se abre en el navegador, se instala en la pantalla de inicio del celular o del computador y funciona aunque no tengas internet. Los datos se guardan en el dispositivo y, si configuras Firebase, se sincronizan solos entre todos tus equipos.

---

## Qué incluye

- **Cuadernos múltiples.** Cada persona o proyecto tiene su propio cuaderno: personal, estudio, trabajo, o los que quieras crear.
- **Secciones y tareas por día de la semana.** Cada tarea se marca para días concretos (por ejemplo: lunes, miércoles y viernes).
- **Tareas recurrentes.** Rutinas y hábitos que se repiten automáticamente.
- **Gastos.** Anota lo que gastas (concepto, monto y categoría), mira el total del día y del mes, y ponte un presupuesto mensual con lo que te queda.
- **Temas visuales.** Cada cuaderno puede usar un estilo distinto (minimal, kawaii, coquette, océano…).
- **Sincronización entre dispositivos.** Con Firebase Realtime Database: escribes en el celular y lo ves en la computadora al instante.
- **Instalable (PWA).** Manifest + service worker: se agrega a la pantalla de inicio y abre a pantalla completa, sin barra de navegador.
- **Funciona sin internet.** Todo se guarda en `localStorage`; la nube es opcional.
- **Panel de gestión.** Un código abre el gestor para crear cuadernos, ver el registro y administrarlo.

---

## Empezar en 2 minutos

1. **Descarga o clona** este repositorio.
2. **Abre `index.html`** en tu navegador. Ya funciona: crea tus secciones y tareas, y guárdalo.
   - Para evitar que el navegador restrinja el guardado, en `chrome://settings/content/siteData` permite el almacenamiento local para `file://`, o mejor: sírvelo por HTTP (siguiente paso).
3. **Instálalo:** en Chrome o Edge, el ícono de instalar aparece en la barra de direcciones; en Android, menú ⋮ → *Instalar aplicación*.

### Servirlo en local (recomendado)

```bash
# Con Python
python -m http.server 8080

# o con Node
npx serve .
```

Luego abre `http://localhost:8080`.

---

## Configurar la sincronización en la nube (opcional)

Para que tus datos viajen entre el celular y la computadora:

1. Crea un proyecto en [Firebase](https://console.firebase.google.com) (el plan Spark (gratuito) es suficiente).
2. En **Compilación → Base de datos en tiempo real**, crea la base de datos.
3. En **Configuración del proyecto → Tus apps → Web (</>)**, registra una app y copia el objeto `config`.
4. Copia **`firebase-config.ejemplo.js`** como `firebase-config.js` (ese archivo queda fuera del repo: es tu configuración personal) y pega ahí los valores de tu proyecto:

   ```js
   window.FIREBASE_CONFIG = {
     authDomain: "TU-PROYECTO.firebaseapp.com",
     databaseURL: "https://TU-PROYECTO-default-rtdb.firebaseio.com",
     projectId: "TU-PROYECTO",
     storageBucket: "TU-PROYECTO.appspot.com"
   };
   ```

   Mientras la URL contenga `PON_AQUI`, la app funciona solo en local, sin errores.

5. Elige tu `SYNC_KEY`: una contraseña cualquiera y **la misma en todos tus dispositivos**. Es lo que identifica tu cuaderno en la nube.
6. Opcional pero recomendado, reglas de seguridad en la base de datos:

   ```json
   {
     "rules": {
       ".read": "auth != null",
       ".write": "auth != null"
     }
   }
   ```

> **Nota de seguridad, sin rodeos:** la `SYNC_KEY` viaja en el código del navegador, así que **no es una contraseña real**. Cualquiera que vea el archivo puede conocerla. Para uso personal sirve; si los datos son sensibles, activa la autenticación de Firebase (correo o Anonymous) y usa las reglas de arriba.

---

## Configuración rápida

| Qué | Dónde | Para qué |
|---|---|---|
| `OWNER_CODE` | `index.html`, bloque PERFILES | Código de la organizadora: quien lo tiene puede crear y gestionar cuadernos. **Cámbialo.** |
| `GESTOR_HINT` | `index.html`, bloque PERFILES | Abre el panel de gestión. **Cámbialo.** |
| `MONEDA` | `index.html`, bloque GASTOS | Símbolo de la moneda (`S/`). Cámbialo por `$`, `€`, `MXN$`... |
| `CATEGORIAS_GASTO` | `index.html`, bloque GASTOS | Las categorías del gasto. Edita o agrega las tuyas. |
| `window.FIREBASE_CONFIG` | `firebase-config.js` (copia de `firebase-config.ejemplo.js`) | Datos de tu proyecto de Firebase. |
| `window.SYNC_KEY` | `firebase-config.js` | Clave de sincronización: la misma en todos tus dispositivos. |
| Cuadernos iniciales | `index.html`, función `defaultNotebooks()` | Los cuadernos que se crean la primera vez. |
| Colores y temas | `index.html`, objeto `THEMES` | Paletas de cada tema. |

---

## Publicarlo en internet

### Firebase Hosting (recomendado)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting      # public → "." → SPA? "No" → 404.html "No"
firebase deploy
```

### GitHub Pages

```bash
git init
git add .
git commit -m "Primer despliegue"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/nuestro-cuaderno.git
git push -u origin main
```

Luego en **Settings → Pages → Source: main / (root)**.

Si publicas en un subdirectorio (`/usuario/repo/`), ajusta las rutas relativas en `index.html`, `manifest.json` y `sw.js`.

### Cualquier hosting estático

Son archivos estáticos: sirve la carpeta con Nginx, Apache, Caddy, Netlify, Vercel, Cloudflare Pages o GitLab Pages. Sin Node, sin build.

---

## Estructura del proyecto

```
.
├── index.html            # la aplicación completa (HTML + CSS + JS en un archivo)
├── firebase-config.ejemplo.js  # plantilla de configuración (copiar a firebase-config.js)
├── manifest.json         # datos de la PWA (nombre, íconos, colores)
├── sw.js                 # service worker: cache offline de la app
├── icon-192.png          # ícono para instalación
├── icon-512.png          # ícono para instalación (pantallas grandes)
└── escritorio_preview.html  # vista previa de la versión de escritorio
```

---

## Personalización rápida

- **Colores:** edita `THEMES` en `index.html` (cada tema trae su propia paleta).
- **Íconos:** reemplaza `icon-192.png` e `icon-512.png` por los tuyos.
- **Nombre visible:** cámbialo en `manifest.json` (`name`, `short_name`) y en el `<title>` de `index.html`.
- **Cuadernos iniciales:** edita `defaultNotebooks()`.

---

## Compatibilidad

Navegadores con soporte de `localStorage`, `fetch` y service workers: Chrome/Edge 90+, Firefox 90+, Safari 15.4+, Android WebView. En iPhone y iPad requiere **Añadir a pantalla de inicio** para registrarlo como app.

---

## Licencia

Código bajo licencia **MIT**. Úsalo, modifícalo y compártelo libremente. Si lo publicas, avisa de dónde viene.

---

## Créditos

Proyecto desarrollado por **Niurka Guevara** como herramienta personal y docente.