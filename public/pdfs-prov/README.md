# PDFs de Proveedores Autorizados

Coloca aquí los PDFs con la lista de proveedores autorizados por país.

## Archivos esperados

- `proveedores-bolivia.pdf` → se muestra al hacer clic en **Bolivia**
- `proveedores-argentina.pdf` → se muestra al hacer clic en **Argentina**

## Cómo agregar otro país

1. Copia el PDF a esta carpeta con el nombre correspondiente, por ejemplo `proveedores-mexico.pdf`.
2. Abre `src/app/data/countries.ts` y agrega una entrada en `PROVIDER_PDFS`, por ejemplo:

```ts
export const PROVIDER_PDFS: Record<string, string> = {
  ar: 'proveedores-argentina.pdf',
  bo: 'proveedores-bolivia.pdf',
  mx: 'proveedores-mexico.pdf',
};
```

El país dejará de mostrar "(próximamente)" en la lista y al hacer clic se
mostrará su PDF.
