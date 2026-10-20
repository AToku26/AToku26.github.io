// Aquí se define QUÉ datos lleva cada tipo de contenido.
// Si a un archivo .md le falta un dato obligatorio o tiene un error,
// Astro te avisará al ejecutar `npm run dev` o `npm run build`.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// El nombre de la carpeta se usa como dirección de la página.
// Ej.: src/content/proyectos/acrylic-keyboard/index.md  →  /proyectos/acrylic-keyboard/
const nombreDeCarpeta = ({ entry }: { entry: string }) => entry.split('/')[0];

// Cada proyecto es una carpeta con un index.md adentro.
const proyectos = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/proyectos', generateId: nombreDeCarpeta }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      tipo: z.string(), // "Hecho a mano", "Audiovisual"... cada tipo nuevo aparece como filtro
      resumen: z.string(),
      orden: z.number().default(100), // número más bajo = aparece primero
      portada: image(), // imagen fija de la tarjeta
      vistaPrevia: z.string().optional(), // video corto en bucle, dentro de public/videos/
      video: z.string().optional(), // video principal, dentro de public/videos/
      instagram: z.string().url().optional(),
      fotos: z.array(image()).default([]),
      borrador: z.boolean().default(false), // true = no se publica
    }),
});

const fotografia = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/fotografia', generateId: nombreDeCarpeta }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      orden: z.number().default(100),
      instagram: z.string().url().optional(),
      fotos: z.array(image()).min(1),
      borrador: z.boolean().default(false),
    }),
});

const perfil = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/perfil' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      lema: z.string(),
      retrato: image(),
      ubicacion: z.string(),
      email: z.string().email(),
      telefono: z.string().optional(),
      instagram: z.object({ usuario: z.string(), url: z.string().url() }).optional(),
      equipo: z.array(z.string()).default([]),
      softwares: z
        .array(z.object({ nombre: z.string(), nivel: z.string(), icono: image().optional() }))
        .default([]),
    }),
});

export const collections = { proyectos, fotografia, perfil };
