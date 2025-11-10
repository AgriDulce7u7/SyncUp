/**
 * NAVBAR.JSX - Navegación principal actualizada con el nuevo Logo
 * 
 * Este archivo es una versión mejorada de tu Navbar original.
 * El cambio principal es que ahora usa el componente Logo que acabamos de crear
 * en lugar de una imagen estática.
 * 
 * ¿Por qué es mejor usar un componente Logo que una imagen?
 * 
 * 1. Escalabilidad: El componente se ve nítido en cualquier tamaño porque usa SVG/CSS
 *    en lugar de píxeles, a diferencia de un .png que puede verse pixelado.
 * 
 * 2. Animación: Las ondas animadas del Logo añaden vida a tu navbar sin necesitar
 *    archivos GIF o videos pesados.
 * 
 * 3. Consistencia: Si actualizas el componente Logo, automáticamente se actualiza
 *    en todos lados (Navbar, Home, Login, etc.)
 * 
 * 4. Personalización: Puedes cambiar fácilmente el tamaño y estilo sin editar imágenes
 *    en Photoshop.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants';
import Logo from '../../common/Logo';  // ← CAMBIO PRINCIPAL: Importamos el nuevo Logo
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  /**
   * Estado para controlar la visibilidad de los botones de autenticación.
   * 
   * Por ejemplo, no queremos mostrar "Iniciar sesión" cuando el usuario
   * ya está EN la página de login. Sería redundante y confuso.
   */
  const [showAuthButtons, setShowAuthButtons] = useState(true);

  /**
   * Este useEffect se ejecuta cada vez que cambia la ubicación (location)
   * en la aplicación, es decir, cada vez que el usuario navega a una página diferente.
   * 
   * Hook de React: useEffect es como un "observador" que está pendiente de cambios.
   * Cuando detecta que location.pathname cambió, ejecuta la función que le pasamos.
   * 
   * La lógica aquí es simple:
   * - Si estás en /login o /registro, oculta los botones de autenticación
   * - Si estás en cualquier otra página, muéstralos
   * 
   * ¿Por qué?
   * Imagina estar en la página de Login y ver un botón que dice "Iniciar sesión".
   * Sería como estar dentro de un restaurante y ver un cartel que dice
   * "Entre al restaurante". No tiene sentido.
   */
  useEffect(() => {
    const authPages = [ROUTES.LOGIN, ROUTES.REGISTER];
    setShowAuthButtons(!authPages.includes(location.pathname));
  }, [location]);  // ← Dependencia: se ejecuta cuando location cambia

  return (
    <nav className={styles.navbar}>
      
      {/* 
        Logo clickeable que lleva al Home.
        
        ANTES: Usábamos una imagen <img src="/img/logo.png" />
        AHORA: Usamos el componente Logo con:
        - size="small": El navbar necesita un logo compacto
        - showText={false}: Solo mostramos el ícono circular, sin el texto "SyncUp"
                           porque el navbar debe ser lo más delgado posible
        - variant="gradient": Usamos el estilo con degradado para que se vea más vibrante
        
        onClick={() => navigate(ROUTES.HOME)} convierte el logo en un botón:
        cuando haces clic, te lleva a la página principal.
        
        style={{ cursor: 'pointer' }} cambia el cursor a una manita cuando
        pasas el mouse por encima, indicando visualmente que es clickeable.
      */}
      <div 
        className={styles.logo} 
        onClick={() => navigate(ROUTES.HOME)}
        style={{ cursor: 'pointer' }}
      >
        <Logo size="small" showText={false} variant="gradient" />
      </div>

      {/* 
        Contenedor de los enlaces de navegación.
        
        Esta estructura agrupa todos los botones en una fila horizontal.
        display: flex en el CSS (definido en Navbar.module.css) es lo que
        hace que los botones se alineen uno al lado del otro en lugar de apilarse.
      */}
      <div className={styles.navLinks}>
        
        {/* 
          Botón "Características".
          
          Al hacer clic, navigate() cambia la URL a /caracteristicas.
          React Router detecta este cambio y renderiza el componente correspondiente.
          
          Es como cambiar de canal en la TV: el contenido cambia pero sigues
          en la misma "pantalla" (navegador) sin recargar toda la página.
        */}
        <button 
          className={styles.navButton}
          onClick={() => navigate(ROUTES.CARACTERISTICAS)}
        >
          Características
        </button>
        
        {/* Botón "Sobre Nosotros" - Funciona igual que el anterior */}
        <button 
          className={styles.navButton}
          onClick={() => navigate(ROUTES.SOBRE_NOSOTROS)}
        >
          Sobre Nosotros
        </button>

        {/* 
          Renderizado condicional de botones de autenticación.
          
          El operador && (AND) en JSX es una forma elegante de decir:
          "Si showAuthButtons es true, entonces renderiza lo que viene después"
          
          Si showAuthButtons es false, React simplemente ignora todo este bloque
          y no lo renderiza en el DOM.
          
          Es como un interruptor de luz: si está apagado (false), la luz no se enciende.
          
          El fragmento <> </> es un "contenedor invisible" que nos permite
          agrupar múltiples elementos (los dos botones) sin agregar un div extra
          al DOM. Es importante porque el operador && solo puede devolver UN elemento,
          no dos sueltos.
        */}
        {showAuthButtons && (
          <>
            {/* 
              Botón "Iniciar sesión".
              
              Tiene clases CSS adicionales:
              - styles.navButton: estilo base compartido con todos los botones
              - styles.login: estilo específico para el botón de login (fondo morado)
              
              La sintaxis ${styles.navButton} ${styles.login} combina ambas clases.
              Es como vestirse: primero te pones la ropa base (navButton) y luego
              agregas accesorios específicos (login).
            */}
            <button 
              className={`${styles.navButton} ${styles.login}`}
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Iniciar sesión
            </button>
            
            {/* Botón "Registrarse" - Similar al de login pero con estilos register */}
            <button 
              className={`${styles.navButton} ${styles.register}`}
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

/**
 * Exportamos el componente Navbar para que pueda ser importado y usado
 * en otros archivos, específicamente en App.jsx donde se incluye en el layout.
 * 
 * El export default significa que este es el export "principal" del archivo.
 * Otros archivos pueden importarlo con: import Navbar from './Navbar'
 */
export default Navbar;
