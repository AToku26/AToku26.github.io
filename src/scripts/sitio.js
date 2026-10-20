// Comportamiento del sitio: vistas previas en video, filtros de proyectos y visor de fotos.
// No necesitas tocar este archivo para agregar contenido.

/* ------------------------------------------------------------------ */
/* Vistas previas: los videos en bucle solo se cargan y reproducen     */
/* cuando la tarjeta está en pantalla.                                 */
/* ------------------------------------------------------------------ */
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ahorroDeDatos = Boolean(navigator.connection && navigator.connection.saveData);
const vistas = document.querySelectorAll('video[data-vista]');

if (vistas.length && !sinMovimiento && !ahorroDeDatos && 'IntersectionObserver' in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        const video = entrada.target;
        if (entrada.isIntersecting) {
          if (!video.getAttribute('src')) video.src = video.dataset.vista;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    },
    { threshold: 0.35 },
  );

  vistas.forEach((video) => {
    video.addEventListener('playing', () => video.classList.add('reproduciendo'), { once: true });
    observador.observe(video);
  });
}

/* ------------------------------------------------------------------ */
/* Filtros de proyectos                                                */
/* ------------------------------------------------------------------ */
const filtros = document.querySelector('[data-filtros]');

if (filtros) {
  const botones = [...filtros.querySelectorAll('button')];
  const tarjetas = [...document.querySelectorAll('[data-tipo]')];
  const esAncho = (i) => i % 4 === 0 || i % 4 === 3; // patrón ancho-angosto / angosto-ancho

  const aplicar = (tipo) => {
    let visibles = 0;
    tarjetas.forEach((tarjeta) => {
      const mostrar = tipo === 'todos' || tarjeta.dataset.tipo === tipo;
      tarjeta.hidden = !mostrar;
      if (mostrar) {
        tarjeta.classList.toggle('ancho', esAncho(visibles));
        tarjeta.classList.toggle('angosto', !esAncho(visibles));
        visibles += 1;
      }
    });
    botones.forEach((boton) => boton.setAttribute('aria-pressed', String(boton.dataset.filtro === tipo)));
  };

  botones.forEach((boton) => boton.addEventListener('click', () => aplicar(boton.dataset.filtro)));
  filtros.hidden = false;
}

/* ------------------------------------------------------------------ */
/* Visor de fotos: abre la foto grande sin salir de la página          */
/* ------------------------------------------------------------------ */
let visor;
let enlaces = [];
let actual = 0;

function crearVisor() {
  visor = document.createElement('dialog');
  visor.className = 'visor';
  visor.setAttribute('aria-label', 'Visor de fotos');
  visor.innerHTML = `
    <div class="visor__barra">
      <span class="visor__contador" aria-live="polite"></span>
      <button type="button" data-accion="cerrar">Cerrar</button>
    </div>
    <div class="visor__marco"><img alt="" /></div>
    <div class="visor__barra">
      <button type="button" data-accion="anterior">Anterior</button>
      <button type="button" data-accion="siguiente">Siguiente</button>
    </div>`;
  document.body.append(visor);

  visor.addEventListener('click', (evento) => {
    const accion = evento.target.closest('[data-accion]')?.dataset.accion;
    if (accion === 'cerrar') visor.close();
    else if (accion === 'anterior') mostrar(actual - 1);
    else if (accion === 'siguiente') mostrar(actual + 1);
    else if (evento.target.classList.contains('visor__marco')) visor.close();
  });

  visor.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') mostrar(actual - 1);
    if (evento.key === 'ArrowRight') mostrar(actual + 1);
  });

  // Deslizar con el dedo en el celular
  let inicioX = null;
  visor.addEventListener('pointerdown', (evento) => (inicioX = evento.clientX));
  visor.addEventListener('pointerup', (evento) => {
    if (inicioX === null) return;
    const recorrido = evento.clientX - inicioX;
    if (Math.abs(recorrido) > 50) mostrar(actual + (recorrido < 0 ? 1 : -1));
    inicioX = null;
  });

  visor.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
  });
}

function mostrar(indice) {
  actual = (indice + enlaces.length) % enlaces.length;
  const enlace = enlaces[actual];
  const imagen = visor.querySelector('img');
  imagen.src = enlace.href;
  imagen.alt = enlace.querySelector('img')?.alt ?? '';
  visor.querySelector('.visor__contador').textContent = `${actual + 1} de ${enlaces.length}`;
  // Precarga la siguiente para que el cambio sea inmediato
  const siguiente = enlaces[(actual + 1) % enlaces.length];
  if (siguiente) new Image().src = siguiente.href;
}

document.addEventListener('click', (evento) => {
  const enlace = evento.target.closest('[data-galeria] a');
  if (!enlace || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.button !== 0) return;
  if (typeof HTMLDialogElement !== 'function') return; // navegadores muy antiguos: abre la imagen
  evento.preventDefault();
  if (!visor) crearVisor();
  enlaces = [...enlace.closest('[data-galeria]').querySelectorAll('a')];
  mostrar(enlaces.indexOf(enlace));
  document.documentElement.style.overflow = 'hidden';
  visor.showModal();
});
