import React, { useCallback, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useTheme } from '../context/ThemeContext';

const ParticleBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    background: { color: 'transparent' },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: 'push' },
        onHover: { enable: true, mode: 'grab' },
        resize: true,
      },
      modes: {
        push: { quantity: 3 },
        grab: {
          distance: 160,
          links: { opacity: isDark ? 0.5 : 0.3 },
        },
      },
    },
    particles: {
      color: {
        value: isDark ? ['#6366f1', '#8b5cf6', '#06b6d4'] : ['#6366f1', '#8b5cf6', '#4f46e5'],
      },
      links: {
        color: isDark ? '#8b5cf6' : '#6366f1',
        distance: 160,
        enable: true,
        opacity: isDark ? 0.22 : 0.12,
        width: isDark ? 1.2 : 0.8,
        triangles: {
          enable: false,
        },
      },
      move: {
        direction: 'none' as const,
        enable: true,
        outModes: { default: 'bounce' as const },
        random: true,
        speed: isDark ? 0.8 : 0.6,
        straight: false,
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
      number: {
        density: { enable: true, area: 900 },
        value: isDark ? 90 : 55,
      },
      opacity: {
        value: isDark ? { min: 0.3, max: 0.7 } : { min: 0.2, max: 0.45 },
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: isDark ? 0.2 : 0.1,
          sync: false,
        },
      },
      shape: { type: 'circle' },
      size: {
        value: isDark ? { min: 1, max: 3 } : { min: 1, max: 2 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.5,
          sync: false,
        },
      },
    },
    detectRetina: true,
  }), [isDark]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isDark ? 1 : 0.85 }}
    >
      <Particles
        key={theme}
        id="tsparticles-global"
        init={particlesInit}
        options={options}
        className="h-full w-full"
      />
    </div>
  );
};

export default ParticleBackground;
