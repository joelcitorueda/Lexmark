/**
 * Mapa de código de país → nombre del archivo PDF en /pdfs-prov/
 * Agrega más entradas aquí cuando tengas nuevos PDFs.
 */
export const PROVIDER_PDFS: Record<string, string> = {
  ar: 'proveedores-argentina.pdf',
  bo: 'proveedores-bolivia.pdf',
};

/**
 * Lista de países de América Latina con soporte de proveedores.
 * Agrega o quita países según necesites.
 */
export const LATAM_COUNTRIES = [
  { code: 'ar', name: 'Argentina' },
  { code: 'bo', name: 'Bolivia' },
  { code: 'br', name: 'Brasil' },
  { code: 'cl', name: 'Chile' },
  { code: 'co', name: 'Colombia' },
  { code: 'cr', name: 'Costa Rica' },
  { code: 'ec', name: 'Ecuador' },
  { code: 'sv', name: 'El Salvador' },
  { code: 'gt', name: 'Guatemala' },
  { code: 'hn', name: 'Honduras' },
  { code: 'mx', name: 'México' },
  { code: 'ni', name: 'Nicaragua' },
  { code: 'pa', name: 'Panamá' },
  { code: 'py', name: 'Paraguay' },
  { code: 'pe', name: 'Perú' },
  { code: 'pr', name: 'Puerto Rico' },
  { code: 'uy', name: 'Uruguay' },
  { code: 've', name: 'Venezuela' },
];
