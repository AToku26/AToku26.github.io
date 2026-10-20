import fs from 'node:fs';
import path from 'node:path';

/** Dirección de una página o archivo del sitio, respetando la configuración de Astro. */
export function enlace(ruta = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${ruta.replace(/^\//, '')}`;
}

/** Ordena por el campo `orden` y, si empatan, por título. */
export function ordenar<T extends { data: { orden: number; titulo: string } }>(lista: T[]): T[] {
  return [...lista].sort(
    (a, b) => a.data.orden - b.data.orden || a.data.titulo.localeCompare(b.data.titulo, 'es'),
  );
}

/**
 * Devuelve la dirección de un video guardado en public/videos/.
 * Si el archivo no existe, detiene la construcción con un mensaje claro.
 */
export function rutaVideo(nombre: string | undefined, usadoEn: string): string | undefined {
  if (!nombre) return undefined;
  const archivo = path.join(process.cwd(), 'public', 'videos', nombre);
  if (!fs.existsSync(archivo)) {
    throw new Error(
      `No encuentro el video "${nombre}" (lo pide ${usadoEn}). ` +
        `Revisa que el archivo esté en public/videos/ y que el nombre sea idéntico, incluidas mayúsculas.`,
    );
  }
  return enlace(`videos/${encodeURIComponent(nombre)}`);
}

/** "1 foto" / "6 fotos" */
export function contarFotos(n: number): string {
  return n === 1 ? '1 foto' : `${n} fotos`;
}
