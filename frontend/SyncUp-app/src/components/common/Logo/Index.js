/**
 * INDEX.JS - Archivo de barril (Barrel Export)
 * 
 * Este pequeño archivo tiene un propósito muy importante: simplificar las importaciones.
 * 
 * Sin este archivo, cuando quieres usar el Logo en otro componente, tendrías que escribir:
 * import Logo from './components/common/Logo/Logo'
 * 
 * Con este archivo, puedes escribir simplemente:
 * import Logo from './components/common/Logo'
 * 
 * Es más limpio y elegante. React busca automáticamente un archivo llamado "index.js"
 * cuando importas desde una carpeta, por eso esto funciona.
 * 
 * Este patrón se llama "barrel export" (exportación en barril) porque es como si
 * todos los exports de la carpeta se "empaquetaran" en un solo punto de salida.
 * 
 * Piensa en esto como la puerta principal de una casa: en lugar de tener que especificar
 * "la ventana del segundo piso a la derecha", simplemente entras por la puerta principal.
 */

export { default } from './Logo';

/**
 * Nota técnica sobre esta sintaxis:
 * 
 * Esta línea hace dos cosas a la vez:
 * 1. Importa el export default de './Logo' (que es el componente Logo)
 * 2. Inmediatamente lo exporta como el default export de este archivo
 * 
 * Es equivalente a escribir:
 * import Logo from './Logo';
 * export default Logo;
 * 
 * Pero la sintaxis que usamos aquí es más concisa y es el estándar
 * en proyectos React modernos.
 */
