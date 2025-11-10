/**
 * HOME PAGE
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import Logo from '../../components/common/Logo/Index.js';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
      <section className={styles.home}>
        {/* Partículas musicales decorativas */}
        <div className={styles.musicParticles}>
          <span className={styles.particle}>♪</span>
          <span className={styles.particle}>♫</span>
          <span className={styles.particle}>♪</span>
          <span className={styles.particle}>♫</span>
          <span className={styles.particle}>♪</span>
          <span className={styles.particle}>♫</span>
          <span className={styles.particle}>♪</span>
          <span className={styles.particle}>♫</span>
        </div>

        <div className={styles.content}>
          {/* Logo animado */}
          <div className={styles.logoContainer}>
            <Logo size="large" />
          </div>

          <h1>DONDE CADA NOTA<br/>ENCUENTRA SU CONEXIÓN.</h1>
          <p>
            Explora, comparte y sincroniza tu mundo musical con personas que vibran como tú.
          </p>

          {/* Características destacadas */}
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎧</div>
              <h3>Descubre</h3>
              <p>Miles de canciones y artistas</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👥</div>
              <h3>Conecta</h3>
              <p>Con otros amantes de la música</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Sincroniza</h3>
              <p>Tu música en todos lados</p>
            </div>
          </div>

          {/* Botón principal */}
          <button
              className={styles.btnMain}
              onClick={() => navigate(ROUTES.REGISTER)}
          >
            ✨ Pruébalo gratis ✨
          </button>

          {/* Estadísticas */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Canciones</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Artistas</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1K+</span>
              <span className={styles.statLabel}>Usuarios</span>
            </div>
          </div>
        </div>

        {/* Ondas decorativas en el fondo */}
        <div className={styles.waveDecoration}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>
  );
};

export default Home;