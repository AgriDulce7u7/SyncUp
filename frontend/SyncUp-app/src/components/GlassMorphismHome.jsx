import React, { useState, useEffect } from 'react';
import '../styles/GlassMorphism.css';

/**
 * 🔷 GLASS MORPHISM COMPONENT - SYNCUP
 * 
 * Componente principal con diseño Glass Morphism para SyncUp
 * Archivo: SyncUp-app/src/components/GlassMorphismHome.jsx
 */

const GlassMorphismHome = () => {
    // Estado del reproductor
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(35);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    // Lista de tracks demo
    const demoTracks = [
        { title: "Midnight Vibes", artist: "SyncUp Radio • Chill Hop", duration: "4:12" },
        { title: "Cosmic Dreams", artist: "Lo-Fi Collective • Ambient", duration: "3:45" },
        { title: "Digital Sunset", artist: "Synth Masters • Electronic", duration: "5:21" },
        { title: "Crystal Waves", artist: "Glass Music • Experimental", duration: "4:33" },
        { title: "Neon Lights", artist: "Future Beats • Synthwave", duration: "3:58" }
    ];

    // Datos del componente
    const [heroData] = useState({
        title: "Donde cada nota<br>encuentra su<br><span style='color: #ec4899;'>conexión</span>",
        subtitle: "Experimenta la música en una dimensión completamente nueva con nuestra interfaz de cristal líquido. Conecta, descubre y vive momentos únicos.",
        primaryBtnText: "Comenzar gratis",
        secondaryBtnText: "Ver demo"
    });

    // Efectos y funciones del reproductor
    useEffect(() => {
        let interval;
        if (isPlaying && currentProgress < 100) {
            interval = setInterval(() => {
                setCurrentProgress(prev => {
                    if (prev >= 100) {
                        nextTrack();
                        return 0;
                    }
                    return prev + 0.5;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentProgress]);

    // Función toggle play/pause
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        console.log(isPlaying ? '⏸ Música pausada' : '🎵 Reproduciendo: ' + demoTracks[currentTrackIndex].title);
    };

    // Siguiente pista
    const nextTrack = () => {
        setCurrentTrackIndex(prev => (prev + 1) % demoTracks.length);
        setCurrentProgress(0);
        console.log('⏭ Siguiente pista');
    };

    // Pista anterior
    const previousTrack = () => {
        setCurrentTrackIndex(prev => prev === 0 ? demoTracks.length - 1 : prev - 1);
        setCurrentProgress(0);
        console.log('⏮ Pista anterior');
    };

    // Seek en la pista
    const seekTrack = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const newProgress = (clickX / rect.width) * 100;
        setCurrentProgress(Math.max(0, Math.min(100, newProgress)));
        console.log(`🎯 Seeking to ${Math.floor(newProgress)}%`);
    };

    // Calcular tiempo actual
    const getCurrentTime = () => {
        const totalSeconds = 252; // Promedio de duración
        const currentSeconds = Math.floor((currentProgress / 100) * totalSeconds);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Navegación (aquí conectarías con tu router)
    const handleNavigation = (path) => {
        console.log(`🔗 Navegando a: ${path}`);
        // Aquí usarías useNavigate() de React Router
        // navigate(path);
    };

    // Handlers para botones
    const handleRegister = () => {
        console.log('📝 Registro iniciado');
        // Aquí conectarías con tu lógica de registro
        handleNavigation('/register');
    };

    const handleLogin = () => {
        console.log('🔐 Login iniciado');
        // Aquí conectarías con tu lógica de login
        handleNavigation('/login');
    };

    const handleDemo = () => {
        console.log('🎥 Demo iniciado');
        handleNavigation('/demo');
    };

    return (
        <div className="glass-morphism-container">
            {/* Navbar Glass */}
            <nav className="glass-navbar">
                <div className="glass-navbar-container">
                    {/* Brand */}
                    <div className="glass-navbar-brand">
                        <div className="glass-logo" onClick={() => handleNavigation('/')}>
                            <div className="glass-logo-text">SU</div>
                        </div>
                        <span className="glass-brand-text" onClick={() => handleNavigation('/')}>
                            SyncUp
                        </span>
                    </div>
                    
                    {/* Menu principal */}
                    <ul className="glass-nav-menu">
                        <li>
                            <a className="glass-nav-link" onClick={() => handleNavigation('/')}>
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a className="glass-nav-link" onClick={() => handleNavigation('/explore')}>
                                Explorar
                            </a>
                        </li>
                        <li>
                            <a className="glass-nav-link" onClick={() => handleNavigation('/playlists')}>
                                Playlists
                            </a>
                        </li>
                        <li>
                            <a className="glass-nav-link" onClick={() => handleNavigation('/social')}>
                                Social
                            </a>
                        </li>
                        <li>
                            <a className="glass-nav-link" onClick={() => handleNavigation('/premium')}>
                                Premium
                            </a>
                        </li>
                    </ul>
                    
                    {/* Botones de acción */}
                    <div className="glass-nav-actions">
                        <button className="glass-btn-outline" onClick={handleLogin}>
                            Iniciar sesión
                        </button>
                        <button className="glass-btn-solid" onClick={handleRegister}>
                            Registro gratis
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section Glass */}
            <section className="glass-hero">
                {/* Elementos de cristal flotantes */}
                <div className="glass-bg-elements">
                    <div className="glass-shape glass-shape-1"></div>
                    <div className="glass-shape glass-shape-2"></div>
                    <div className="glass-shape glass-shape-3"></div>
                    <div className="glass-shape glass-shape-4"></div>
                </div>
                
                {/* Contenido principal */}
                <div className="glass-content">
                    <h1 
                        className="glass-title"
                        dangerouslySetInnerHTML={{ __html: heroData.title }}
                    />
                    
                    <p className="glass-subtitle">
                        {heroData.subtitle}
                    </p>
                    
                    {/* Botones de CTA */}
                    <div className="glass-cta-buttons">
                        <button className="glass-btn-primary" onClick={handleRegister}>
                            {heroData.primaryBtnText}
                        </button>
                        <button className="glass-btn-secondary" onClick={handleDemo}>
                            {heroData.secondaryBtnText}
                        </button>
                    </div>
                    
                    {/* Características destacadas */}
                    <div className="glass-features">
                        <div className="glass-feature">
                            <div className="glass-feature-icon">🎵</div>
                            <span>Streaming de alta calidad</span>
                        </div>
                        <div className="glass-feature">
                            <div className="glass-feature-icon">👥</div>
                            <span>Conexión social real</span>
                        </div>
                        <div className="glass-feature">
                            <div className="glass-feature-icon">🚀</div>
                            <span>Experiencia premium</span>
                        </div>
                    </div>
                </div>
                
                {/* Reproductor de cristal */}
                <div className="glass-visual">
                    <div className="glass-player">
                        {/* Header del reproductor */}
                        <div className="player-header">
                            <div className="player-status">
                                <div className="status-indicator"></div>
                                EN VIVO
                            </div>
                        </div>
                        
                        {/* Display principal */}
                        <div className="player-display">
                            <div 
                                className="player-artwork" 
                                onClick={togglePlay}
                                style={{
                                    animation: isPlaying 
                                        ? 'artwork-glow 2s ease-in-out infinite' 
                                        : 'artwork-glow 3s ease-in-out infinite'
                                }}
                            >
                                🎵
                            </div>
                            
                            <div className="player-title">
                                {demoTracks[currentTrackIndex].title}
                            </div>
                            <div className="player-artist">
                                {demoTracks[currentTrackIndex].artist}
                            </div>
                            
                            {/* Barra de progreso */}
                            <div className="player-progress" onClick={seekTrack}>
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${currentProgress}%` }}
                                />
                            </div>
                            
                            <div className="player-time">
                                <span>{getCurrentTime()}</span>
                                <span>{demoTracks[currentTrackIndex].duration}</span>
                            </div>
                            
                            {/* Visualizador */}
                            <div className="player-visualizer">
                                {[...Array(8)].map((_, index) => (
                                    <div 
                                        key={index}
                                        className="viz-bar"
                                        style={{
                                            animationPlayState: isPlaying ? 'running' : 'paused'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {/* Controles */}
                        <div className="player-controls">
                            <button className="player-btn" onClick={previousTrack} title="Anterior">
                                ⏮
                            </button>
                            
                            <button 
                                className="player-btn player-btn-main" 
                                onClick={togglePlay} 
                                title={isPlaying ? "Pausar" : "Reproducir"}
                            >
                                {isPlaying ? '⏸' : '▶'}
                            </button>
                            
                            <button className="player-btn" onClick={nextTrack} title="Siguiente">
                                ⏭
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GlassMorphismHome;

/**
 * 🔧 INSTRUCCIONES DE USO:
 * 
 * 1. Coloca este archivo en: SyncUp-app/src/components/GlassMorphismHome.jsx
 * 2. Coloca el CSS en: SyncUp-app/src/styles/GlassMorphism.css
 * 3. Importa el componente en tu App.jsx:
 *    
 *    import GlassMorphismHome from './components/GlassMorphismHome';
 *    
 *    function App() {
 *      return (
 *        <div className="App">
 *          <GlassMorphismHome />
 *        </div>
 *      );
 *    }
 * 
 * 4. Para conectar con React Router:
 *    - Instala: npm install react-router-dom
 *    - Importa useNavigate en el componente
 *    - Reemplaza handleNavigation con navigate(path)
 * 
 * 5. Para conectar con tu backend:
 *    - Reemplaza console.log() con llamadas a tu API
 *    - Usa fetch() o axios para comunicarte con Spring Boot
 *    - Actualiza los tracks con datos reales de tu API
 */
