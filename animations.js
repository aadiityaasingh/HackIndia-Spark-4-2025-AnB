export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  slideIn: `
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,
  pulse: `
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  `,
  shimmer: `
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }
  `,
  popUp: `
    @keyframes popUp {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  `,
  float: `
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  `,
  rotate: `
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
  glow: `
    @keyframes glow {
      0% {
        box-shadow: 0 0 5px rgba(14, 165, 233, 0.2),
                    0 0 10px rgba(14, 165, 233, 0.2),
                    0 0 15px rgba(14, 165, 233, 0.2);
      }
      50% {
        box-shadow: 0 0 10px rgba(14, 165, 233, 0.4),
                    0 0 20px rgba(14, 165, 233, 0.4),
                    0 0 30px rgba(14, 165, 233, 0.4);
      }
      100% {
        box-shadow: 0 0 5px rgba(14, 165, 233, 0.2),
                    0 0 10px rgba(14, 165, 233, 0.2),
                    0 0 15px rgba(14, 165, 233, 0.2);
      }
    }
  `
};

export const animations = {
  fadeIn: {
    animation: 'fadeIn 0.5s ease-out forwards',
  },
  slideIn: {
    animation: 'slideIn 0.5s ease-out forwards',
  },
  pulse: {
    animation: 'pulse 2s infinite',
  },
  shimmer: {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '1000px 100%',
    animation: 'shimmer 2s infinite linear',
  },
  popUp: {
    animation: 'popUp 0.3s ease-out',
  },
  float: {
    animation: 'float 3s ease-in-out infinite',
  },
  rotate: {
    animation: 'rotate 4s linear infinite',
  },
  glow: {
    animation: 'glow 2s ease-in-out infinite',
  },
  combined: {
    animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite',
  }
}; 