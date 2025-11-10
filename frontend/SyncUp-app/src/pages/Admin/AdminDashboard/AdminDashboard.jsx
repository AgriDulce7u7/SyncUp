/**
 * ADMINDASHBOARD.JSX - Panel de administración actualizado con el nuevo Logo
 * 
 * Este es el corazón del panel de administración de SyncUp.
 * Desde aquí, los administradores pueden gestionar canciones, artistas, álbumes,
 * usuarios, hacer carga masiva de contenido, y ver métricas del sistema.
 * 
 * Cambio principal en esta actualización:
 * Reemplazamos el ícono estático RiAdminLine por nuestro componente Logo animado
 * en el sidebar. Esto mantiene la consistencia visual en toda la aplicación:
 * el mismo logo aparece en el Navbar público, en el Home, y ahora aquí en el Admin.
 * 
 * ¿Por qué es importante la consistencia visual?
 * Cuando un usuario ve el mismo logo en diferentes partes de la aplicación,
 * inconscientemente entiende que está en el mismo "lugar". Es como el logotipo
 * de McDonald's: lo ves en el menú, en las cajas, en los vasos, y siempre
 * reconoces que estás en McDonald's. La consistencia construye reconocimiento de marca.
 */

import React, { useState } from 'react';
import './AdminDashboard.css';

/**
 * Importamos todos los componentes de gestión.
 * Cada uno de estos es un módulo completo para administrar una parte específica
 * del sistema. Los archivos terminados en index.js nos permiten importar
 * directamente desde la carpeta sin especificar el nombre del archivo.
 */
import GestionCanciones from '../GestionCanciones';
import GestionArtistas from '../GestionArtistas';
import GestionAlbumes from '../GestionAlbumes';
import GestionUsuarios from '../GestionUsuario/GestionUsuarios';
import CargaMasiva from '../CargaMasiva';
import Metricas from '../Metricas';

/**
 * Importamos los íconos de react-icons.
 * React Icons es una librería que empaqueta miles de íconos de diferentes
 * colecciones (Font Awesome, Material Icons, etc.) para usarlos como componentes React.
 * 
 * Es mucho más práctico que descargar archivos SVG individuales porque:
 * 1. Los íconos son componentes React nativos, no imágenes
 * 2. Puedes cambiar su tamaño y color con props
 * 3. El bundle final solo incluye los íconos que realmente usas
 */
import { FaMusic, FaUsers, FaUpload, FaChartBar, FaSignOutAlt, FaCompactDisc, FaMicrophone } from 'react-icons/fa';

/**
 * ¡ESTE ES EL CAMBIO PRINCIPAL!
 * Importamos nuestro componente Logo personalizado en lugar de usar solo RiAdminLine.
 */
import Logo from '../../../components/common/Logo';

import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/authService';
import { ROUTES } from '../../../utils/constants';

/**
 * MENU_ITEMS es un array de configuración que define todas las opciones del menú.
 * 
 * ¿Por qué usar un array de configuración en lugar de escribir los botones directamente en JSX?
 * 
 * Ventajas:
 * 1. Fácil de mantener: Si quieres agregar una nueva sección, solo agregas un objeto al array
 * 2. Evita repetición: En lugar de copiar/pegar código de botones, los generamos en un loop
 * 3. Fácil de reordenar: Cambiar el orden del menú es solo mover objetos en el array
 * 4. Centralizado: Toda la configuración del menú está en un solo lugar
 * 
 * Es el principio DRY: "Don't Repeat Yourself" (No te repitas).
 * 
 * Cada objeto en el array tiene:
 * - id: identificador único para saber qué sección está activa
 * - label: el texto que se muestra en el botón
 * - icon: el componente de ícono a usar (de react-icons)
 * 
 * Nota cómo icon es una referencia a un componente, no una instancia.
 * Guardamos FaMusic (la clase/función) no <FaMusic /> (una instancia).
 * Esto nos permite crear la instancia después con <Icon /> en el JSX.
 */
const MENU_ITEMS = [
  { id: 'canciones', label: 'Gestión de Canciones', icon: FaMusic },
  { id: 'artistas', label: 'Gestión de Artistas', icon: FaMicrophone },
  { id: 'albumes', label: 'Gestión de Álbumes', icon: FaCompactDisc },
  { id: 'usuarios', label: 'Gestión de Usuarios', icon: FaUsers },
  { id: 'carga', label: 'Carga Masiva', icon: FaUpload },
  { id: 'metricas', label: 'Métricas del Sistema', icon: FaChartBar },
];

const AdminDashboard = () => {
  /**
   * useNavigate nos permite cambiar de página programáticamente.
   * Lo necesitamos para el logout: después de cerrar sesión,
   * redirigimos al usuario a la página de login.
   */
  const navigate = useNavigate();
  
  /**
   * Estado para trackear qué sección del dashboard está activa.
   * 
   * useState es un Hook de React que nos permite guardar y actualizar valores
   * que afectan lo que se muestra en pantalla.
   * 
   * Analogía: useState es como una pizarra mágica:
   * - Escribes algo en ella (setSeccionActiva('canciones'))
   * - React ve el cambio y automáticamente re-dibuja la parte de la pantalla que depende de ese valor
   * - No necesitas decir "actualiza el DOM aquí y allá", React lo hace por ti
   * 
   * 'canciones' es el valor inicial - mostramos la gestión de canciones al abrir el dashboard.
   */
  const [seccionActiva, setSeccionActiva] = useState('canciones');

  /**
   * Función para manejar el cierre de sesión.
   * 
   * async/await es JavaScript moderno para manejar operaciones asíncronas
   * (operaciones que toman tiempo, como llamadas a APIs).
   * 
   * Proceso:
   * 1. logout() borra los datos de sesión del localStorage
   * 2. navigate(ROUTES.LOGIN) redirige al usuario a la página de login
   * 
   * Es como salir de un edificio: primero devuelves tu gafete de acceso (logout)
   * y luego sales por la puerta (navigate).
   */
  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  /**
   * Función para renderizar el componente correcto según la sección activa.
   * 
   * Este es un patrón común en React llamado "conditional rendering"
   * (renderizado condicional). Basado en una condición (seccionActiva),
   * mostramos un componente u otro.
   * 
   * switch es mejor que múltiples if/else cuando tienes muchas opciones.
   * Es más legible y performance-wise más eficiente.
   * 
   * default: <GestionCanciones /> es un "fallback": si por alguna razón
   * seccionActiva tiene un valor que no esperamos, mostramos Canciones
   * en lugar de una pantalla en blanco o un error.
   * 
   * Principio de programación defensiva: siempre ten un plan B.
   */
  const renderSeccion = () => {
    switch(seccionActiva) {
      case 'canciones':
        return <GestionCanciones />;
      case 'artistas':
        return <GestionArtistas />;
      case 'albumes':
        return <GestionAlbumes />;
      case 'usuarios':
        return <GestionUsuarios />;
      case 'carga':
        return <CargaMasiva />;
      case 'metricas':
        return <Metricas />;
      default:
        return <GestionCanciones />;
    }
  };

  return (
    /**
     * Estructura del dashboard: sidebar + contenido principal.
     * 
     * Esta es una estructura de dos columnas muy común en dashboards:
     * - Sidebar fijo a la izquierda con navegación
     * - Área de contenido que cambia según la sección activa
     * 
     * CSS Grid o Flexbox hacen que esta estructura sea fácil de crear
     * y mantener responsive (adaptable a diferentes tamaños de pantalla).
     */
    <div className="admin-dashboard">
      
      {/* ========== SIDEBAR ========== */}
      <aside className="admin-sidebar">
        
        {/* 
          Header del sidebar con logo y título.
          
          ¡AQUÍ ESTÁ EL CAMBIO PRINCIPAL!
          
          ANTES:
          <RiAdminLine size={32} />
          Un simple ícono estático de admin.
          
          AHORA:
          <Logo size="small" showText={false} variant="solid" />
          Nuestro logo animado con ondas de sonido.
          
          Props que usamos:
          - size="small": El sidebar es estrecho, necesitamos un logo compacto
          - showText={false}: Solo mostramos el círculo con el ícono, sin texto
                              porque "SyncUp Admin" ya está en el h2
          - variant="solid": Usamos el fondo morado sólido en lugar del degradado
                             porque el sidebar ya tiene un degradado de fondo
                             y no queremos sobrecargar visualmente
          
          ¿Por qué cambiar el ícono por el Logo?
          Consistencia de marca. Ahora cuando el admin ve el sidebar, reconoce
          inmediatamente el mismo logo que vio en la landing page, el navbar, etc.
          Es branding subliminal.
        */}
        <div className="admin-logo">
          <Logo size="small" showText={false} variant="solid" />
          <h2>SyncUp Admin</h2>
        </div>

        {/* 
          Navegación del sidebar.
          
          Aquí es donde usamos el array MENU_ITEMS que definimos arriba.
          
          .map() es un método de arrays que transforma cada elemento del array
          en algo nuevo (en este caso, en un botón JSX).
          
          Es como una fábrica: le das materias primas (los objetos en MENU_ITEMS)
          y te devuelve productos terminados (botones JSX).
          
          Flujo:
          1. map() recorre cada item en MENU_ITEMS
          2. Para cada item, ejecuta la arrow function (item) => { ... }
          3. La función devuelve JSX (el botón)
          4. React toma todos esos botones y los renderiza en orden
          
          Esta técnica evita escribir 6 botones casi idénticos manualmente.
          Si mañana quieres agregar una séptima opción al menú, solo agregas
          un objeto a MENU_ITEMS - no necesitas tocar el JSX.
        */}
        <nav className="admin-nav">
          {MENU_ITEMS.map(item => {
            /**
             * Extraemos el ícono del item.
             * 
             * const Icon = item.icon convierte FaMusic (una referencia a la función)
             * en Icon (un nombre que podemos usar como componente en JSX).
             * 
             * Luego usamos <Icon /> que es equivalente a <FaMusic />.
             * 
             * ¿Por qué no escribir directamente item.icon en el JSX?
             * Porque JSX espera que los componentes empiecen con mayúscula.
             * item.icon empieza con minúscula (porque es una propiedad de objeto),
             * pero Icon empieza con mayúscula, así que JSX lo reconoce como componente.
             */
            const Icon = item.icon;
            
            return (
              /**
               * Renderizamos cada botón del menú.
               * 
               * key={item.id} es obligatorio cuando usas .map() en React.
               * React usa las keys para identificar qué elementos cambiaron,
               * se agregaron o se eliminaron. Esto optimiza el re-renderizado.
               * 
               * Sin key, React mostraría una advertencia en la consola.
               * 
               * className usa template strings para combinar clases:
               * - 'nav-item' es la clase base (estilos compartidos por todos los botones)
               * - Si seccionActiva === item.id, agrega la clase 'active'
               * 
               * El operador ternario (? :) es como un if/else compacto:
               * condición ? valor_si_true : valor_si_false
               * 
               * Si el botón corresponde a la sección activa, tiene visual diferente
               * (background más claro, borde a la izquierda, etc. - definido en CSS).
               * Esto le indica al usuario "estás aquí".
               * 
               * onClick={() => setSeccionActiva(item.id)} cambia qué sección está activa.
               * Cuando haces clic en "Artistas", setSeccionActiva('artistas') actualiza
               * el estado, React re-renderiza, y renderSeccion() muestra <GestionArtistas />.
               */
              <button 
                key={item.id}
                className={`nav-item ${seccionActiva === item.id ? 'active' : ''}`}
                onClick={() => setSeccionActiva(item.id)}
              >
                <Icon /> {item.label}
              </button>
            );
          })}
        </nav>

        {/* 
          Botón de cerrar sesión.
          
          Este botón está separado de la navegación porque tiene un propósito
          diferente: no navega entre secciones del dashboard, sino que saca
          al usuario completamente del dashboard.
          
          Está al final del sidebar (margin-top: auto en CSS lo empuja al fondo)
          porque visualmente, "salir" debería estar al final, no en el medio del menú.
          
          Es como el botón de salida de emergencia en un edificio: siempre está
          en un lugar visible y separado de las puertas normales.
        */}
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* 
        ========== CONTENIDO PRINCIPAL ==========
        
        Este es el área grande a la derecha donde se muestra el contenido.
        
        renderSeccion() es una función que decidimos definir arriba en lugar de
        escribir el switch directamente aquí. ¿Por qué?
        
        1. Legibilidad: El JSX del return no se llena de lógica compleja
        2. Mantenibilidad: Si necesitas cambiar cómo se determina qué renderizar,
           solo modificas renderSeccion(), no el JSX principal
        3. Testabilidad: Puedes testear renderSeccion() independientemente
        
        Es el principio de "Separation of Concerns" (Separación de responsabilidades):
        - El JSX se encarga de la estructura y layout
        - renderSeccion() se encarga de la lógica de qué mostrar
      */}
      <main className="admin-content">
        {renderSeccion()}
      </main>
    </div>
  );
};

/**
 * Exportamos el componente para que pueda ser usado en App.jsx.
 * 
 * En App.jsx tienes algo como:
 * <Route path="/admin/dashboard" element={<AdminDashboard />} />
 * 
 * Cuando el usuario navega a /admin/dashboard, React Router renderiza este componente.
 */
export default AdminDashboard;
