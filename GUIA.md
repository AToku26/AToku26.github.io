# Guía del portafolio

Esta guía explica cómo está hecho tu portafolio, cómo verlo en tu computadora, cómo agregar proyectos y fotos, y cómo publicarlo. No necesitas saber programar: casi todo se hace editando archivos de texto.

---

## 1. La idea en una frase

**El contenido y el diseño están separados.** Tus proyectos, fotos y datos viven en archivos de texto (Markdown) dentro de `src/content/`. Astro lee esos archivos y arma todas las páginas con el mismo diseño. Para agregar un proyecto ya no copias HTML: creas una carpeta con un archivo de texto y tus fotos.

### ¿Qué es Astro?

Es una herramienta que **construye** tu sitio: toma tus textos, fotos y plantillas y genera páginas HTML normales, optimizando las imágenes de paso (las reduce y las convierte a formatos livianos). El resultado es un sitio estático, igual que el que tenías, pero generado automáticamente.

### ¿Qué es Markdown?

Un formato de texto simple. Escribes normal y usas unos pocos símbolos:

| Escribes | Se ve como |
| --- | --- |
| `*Suffocation*` | *Suffocation* (cursiva) |
| `**importante**` | **importante** (negrita) |
| `[mi Instagram](https://instagram.com/...)` | un enlace |
| Una línea en blanco | un párrafo nuevo |

Cada archivo `.md` empieza con un bloque entre dos líneas `---`. Ese bloque se llama **frontmatter** y guarda los datos (título, fotos, etc.). Debajo va el texto libre.

```md
---
titulo: Acrylic Keyboard
tipo: Hecho a mano
---

Aquí va la descripción del proyecto.
```

> En el frontmatter, respeta los espacios al inicio de las líneas (por ejemplo, en la lista de `fotos`). Usa espacios, no tabulaciones.

---

## 2. Qué hay en cada carpeta

```
portafolio/
├── src/
│   ├── content/            ← TU CONTENIDO (lo que vas a editar)
│   │   ├── proyectos/      ← una carpeta por proyecto (index.md + fotos)
│   │   ├── fotografia/     ← una carpeta por serie de fotos
│   │   └── perfil/         ← sobre-mi.md: bio, contacto, equipo y software
│   ├── pages/              ← plantillas de las páginas (diseño)
│   ├── components/         ← piezas reutilizables (tarjeta, galería...)
│   ├── layouts/            ← estructura común (cabecera y pie)
│   ├── styles/global.css   ← colores, tipografías y espacios
│   ├── scripts/sitio.js    ← filtros, visor de fotos, videos en bucle
│   └── assets/logo.png     ← tu logo
├── public/
│   ├── videos/             ← TODOS LOS VIDEOS (.mp4)
│   ├── fonts/              ← tipografía Bodoni Moda
│   ├── ProjHTML/, GalHTML/ ← redirigen las direcciones del sitio anterior a las nuevas
│   └── textura.jpg         ← fondo de papel arrugado
├── plantillas/             ← modelos para copiar al crear contenido nuevo
├── .github/workflows/      ← publicación automática en GitHub Pages
└── package.json            ← la lista de herramientas que usa el proyecto
```

**Regla práctica:** para el día a día solo tocas `src/content/` y `public/videos/`. Lo demás es el diseño; cámbialo cuando quieras experimentar.

---

## 3. Preparar tu computadora (solo una vez)

1. **Node.js**: descarga la versión **LTS** de [nodejs.org](https://nodejs.org) e instálala con las opciones por defecto. Para comprobar que funcionó, abre una terminal y escribe `node -v`: debería mostrar un número de versión (20 o mayor).
2. **Visual Studio Code** ([code.visualstudio.com](https://code.visualstudio.com)): el editor para abrir la carpeta del portafolio. Al abrirla te sugerirá la extensión de Astro; acéptala, colorea los archivos y avisa de errores.
3. **GitHub Desktop** ([desktop.github.com](https://desktop.github.com)): para descargar tu repositorio y subir cambios sin escribir comandos de Git. Inicia sesión con tu cuenta de GitHub y clona `atoku26/atoku26.github.io`.

> **¿Qué es la terminal?** Una ventana para escribir comandos. En VS Code la abres con el menú *Terminal → Nuevo terminal*; ya queda ubicada en la carpeta del proyecto.

---

## 4. Ver el sitio en tu computadora

En la terminal de VS Code, dentro de la carpeta del proyecto:

```bash
npm install     # solo la primera vez (o si cambia package.json). Descarga Astro.
npm run dev     # enciende el sitio en modo de edición
```

Abre **http://localhost:4321** en tu navegador. Mientras `npm run dev` esté encendido, cada vez que guardes un archivo la página se actualiza sola. Para apagarlo, haz clic en la terminal y presiona `Ctrl + C`.

La primera vez, `npm install` crea un archivo `package-lock.json`. **Súbelo a GitHub** junto con tus cambios: fija las versiones exactas de las herramientas para que el sitio se construya siempre igual.

Otros comandos útiles:

```bash
npm run build     # construye el sitio final en la carpeta dist/ (lo mismo que hace GitHub)
npm run preview   # muestra ese resultado final en http://localhost:4321
```

---

## 5. Agregar un proyecto nuevo

1. **Copia** la carpeta `plantillas/proyecto` dentro de `src/content/proyectos/`.
2. **Renómbrala** con el nombre que quieres en la dirección web: minúsculas, guiones, sin tildes ni espacios. Ej.: `bajo-fretless` → la página será `atoku26.github.io/proyectos/bajo-fretless/`.
3. **Pon tus imágenes** dentro de esa carpeta:
   - `portada.jpg`: la imagen de la tarjeta (obligatoria). Se recorta en formato 4:3.
   - `1.jpg`, `2.jpg`... las fotos de la galería. Pueden pesar lo que sea: Astro las optimiza.
4. **Pon tus videos** en `public/videos/`, con nombres sin espacios:
   - `bajo-fretless.mp4`: el video principal.
   - `bajo-fretless-vista.mp4`: un clip corto en bucle para la tarjeta (ver sección 9). Es opcional; sin él, la tarjeta muestra la portada fija.
5. **Abre `index.md`** y completa los datos. Asegúrate de que los nombres de los videos coincidan exactamente con los archivos.
6. Mientras trabajas, deja `borrador: true`. Cuando esté listo, cámbialo a `borrador: false` (o borra la línea).
7. Revisa en `http://localhost:4321` y publica (sección 8).

**Ordenar proyectos:** cambia el número `orden`. El más bajo aparece primero.
**Filtros:** el campo `tipo` crea los filtros de la página de inicio. Si escribes un tipo nuevo (por ejemplo, `Ilustración`), aparece un filtro nuevo automáticamente. Escríbelo siempre igual (mayúsculas y tildes incluidas).

---

## 6. Agregar una serie de fotos

1. Copia `plantillas/serie-de-fotos` dentro de `src/content/fotografia/` y renómbrala (ej.: `concierto-mayo-2026`).
2. Pon las fotos en esa carpeta (tamaño original, sin preocuparte del peso).
3. Completa `index.md`: título, orden e Instagram (opcional), y la lista de fotos en el orden que prefieras. Las primeras son las que se ven en la página de inicio.
4. Cambia `borrador` a `false` y publica.

---

## 7. Editar tus datos personales

Todo está en `src/content/perfil/sobre-mi.md`:

- `lema`: la frase debajo de tu nombre en la portada.
- `email`, `telefono`, `instagram`, `ubicacion`: aparecen en Contacto.
- `equipo`: tu cámara y lentes.
- `softwares`: cada programa con su nivel e ícono (los íconos están en `src/content/perfil/iconos/`).
- Debajo del frontmatter va tu biografía.
- Tu foto es `retrato.jpg` en esa misma carpeta: reemplázala por otra con el mismo nombre.

---

## 8. Publicar cambios

La publicación es automática: **cada vez que subes cambios a la rama `main`, GitHub construye el sitio y lo publica** en 1 o 2 minutos.

**Con GitHub Desktop:**
1. Verás la lista de archivos que cambiaste.
2. Abajo a la izquierda escribe un resumen (ej.: *Agrego proyecto Bajo Fretless*) y presiona **Commit to main**.
3. Presiona **Push origin**.
4. En github.com, entra a tu repositorio → pestaña **Actions** para ver el progreso. Un círculo verde significa publicado; una X roja significa que hubo un error (sección 10).

**Cambios rápidos desde el navegador (sin instalar nada):** en github.com, abre cualquier archivo `.md`, presiona el ícono del lápiz, edita y presiona **Commit changes**. Sirve para corregir textos. Para subir fotos, usa **Add file → Upload files** dentro de la carpeta correspondiente.

### Configuración inicial de GitHub Pages (una sola vez)

Para que la publicación automática funcione, en tu repositorio ve a **Settings → Pages → Build and deployment → Source** y elige **GitHub Actions**. Hazlo **antes** de pasar el sitio nuevo a la rama `main`.

---

## 9. Preparar videos e imágenes

**Fotos:** cualquier JPG o PNG sirve. Astro genera versiones livianas (WebP) en varios tamaños. Evita espacios y tildes en los nombres de archivo.

**Video principal:** exporta en MP4 (H.264), 1080p está bien. Intenta que pese menos de 50 MB (GitHub no acepta archivos de más de 100 MB).

**Clip en bucle para la tarjeta (`-vista.mp4`):** reemplaza a los GIF que usabas antes. Un GIF de 10 segundos pesaba unos 15 MB; el mismo clip en MP4 pesa alrededor de 1 MB y se ve mejor.
- En Premiere: secuencia de 6 a 12 segundos → *Exportar* → formato **H.264**, **sin audio**, ancho de 800 a 1080 px, bitrate objetivo de 1 a 2 Mbps.
- Si sabes usar `ffmpeg`, este comando convierte un GIF o recorta un video:

  ```bash
  ffmpeg -i entrada.gif -an -c:v libx264 -crf 25 -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" salida-vista.mp4
  ```

El sitio solo reproduce estos clips cuando la tarjeta está en pantalla, y no los reproduce si el visitante tiene activado *reducir movimiento* o el ahorro de datos.

---

## 10. Cuando algo sale mal

Astro revisa tus archivos y, si algo no cuadra, muestra un error en la terminal (o en la pestaña Actions de GitHub). Los más comunes:

| Mensaje (en inglés) | Qué significa | Solución |
| --- | --- | --- |
| `Could not find requested image ./3.jpg` | El `index.md` pide una foto que no está en la carpeta | Revisa el nombre exacto (`3.jpg` y `3.JPG` son distintos) |
| `No encuentro el video "..."` | El video no está en `public/videos/` o el nombre no coincide | Revisa el nombre exacto del archivo |
| `titulo: Required` | Falta un dato obligatorio | Agrega la línea que falta en el frontmatter |
| `YAMLException` / `bad indentation` | Problema de formato en el frontmatter | Revisa espacios al inicio de las líneas y que los `:` lleven un espacio después |
| `Expected number, received string` | `orden` tiene comillas o letras | Escribe solo el número, sin comillas |

Si el sitio publicado no cambió: revisa la pestaña **Actions**; si está en verde, recarga la página con `Ctrl + Shift + R`.

---

## 11. Cambiar el diseño

- **Colores, tipografías y espacios:** al inicio de `src/styles/global.css`, en el bloque `:root`.
- **Textos fijos** (como el mensaje de Contacto o los nombres del menú): en `src/pages/index.astro` y `src/components/Encabezado.astro`.
- **Logo:** reemplaza `src/assets/logo.png` (fondo transparente). Para el ícono de la pestaña, `public/favicon.png`.

Para aprender más de Astro: [docs.astro.build/es](https://docs.astro.build/es/getting-started/).
