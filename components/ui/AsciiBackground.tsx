"use client";

import { useEffect, useRef } from "react";

type Mode = "home" | "products" | "services" | "case-studies" | "blog" | "contact" | "legal" | "testimonials";

interface CharStream {
  x: number;
  y: number;
  char: string;
  speed: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
}

const modeConfig: Record<Mode, { chars: string; color: string; glowColor: string; density: number; baseSpeed: number; fontSize: number }> = {
  home: {
    chars: "{}()<>/\\|;:.*=+-<>[]#@!?&",
    color: "rgba(0, 212, 255, OPACITY)",
    glowColor: "rgba(0, 212, 255, 0.08)",
    density: 120,
    baseSpeed: 0.3,
    fontSize: 13,
  },
  products: {
    chars: "<>/*#@$%^&+=[]{}()",
    color: "rgba(0, 255, 136, OPACITY)",
    glowColor: "rgba(0, 255, 136, 0.06)",
    density: 100,
    baseSpeed: 0.25,
    fontSize: 14,
  },
  services: {
    chars: "+*○◇◆△▲▼▽□■☆★→←↑↓↗↘",
    color: "rgba(124, 58, 237, OPACITY)",
    glowColor: "rgba(124, 58, 237, 0.08)",
    density: 90,
    baseSpeed: 0.2,
    fontSize: 14,
  },
  "case-studies": {
    chars: "█▄▀▲▼△▽■□◆◇○●◐◑◒◓0123456789%",
    color: "rgba(0, 255, 136, OPACITY)",
    glowColor: "rgba(0, 255, 136, 0.06)",
    density: 80,
    baseSpeed: 0.15,
    fontSize: 13,
  },
  blog: {
    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,;:!?~",
    color: "rgba(0, 212, 255, OPACITY)",
    glowColor: "rgba(0, 212, 255, 0.05)",
    density: 150,
    baseSpeed: 0.4,
    fontSize: 12,
  },
  contact: {
    chars: "+-|/\\=<>*#@~^.",
    color: "rgba(0, 212, 255, OPACITY)",
    glowColor: "rgba(0, 212, 255, 0.07)",
    density: 100,
    baseSpeed: 0.35,
    fontSize: 13,
  },
  legal: {
    chars: "¶§†‡•·…‹›«»⁄±×÷≠≤≥∞∠∟",
    color: "rgba(124, 58, 237, OPACITY)",
    glowColor: "rgba(124, 58, 237, 0.04)",
    density: 70,
    baseSpeed: 0.1,
    fontSize: 13,
  },
  testimonials: {
    chars: "\"'“”‘’★☆❤♥♦♣♠•·…⁂⋆✶✷✵",
    color: "rgba(255, 179, 71, OPACITY)",
    glowColor: "rgba(255, 179, 71, 0.04)",
    density: 60,
    baseSpeed: 0.12,
    fontSize: 14,
  },
};

interface Props {
  mode?: Mode;
  className?: string;
}

export function AsciiBackground({ mode = "home", className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamsRef = useRef<CharStream[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = modeConfig[mode];
    let width = 0;
    let height = 0;
    let columns = 0;
    const charWidth = config.fontSize * 0.6;

    function resize() {
      const parent = canvas!.parentElement!;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width;
      canvas!.height = height;
      columns = Math.floor(width / charWidth);
    }

    function createStream(col?: number): CharStream {
      const x = col ?? Math.floor(Math.random() * columns);
      const idx = Math.floor(Math.random() * config.chars.length);
      return {
        x: x * charWidth + Math.random() * 4,
        y: Math.random() * height - height,
        char: config.chars[idx],
        speed: config.baseSpeed * (0.4 + Math.random() * 1.6),
        opacity: 0.04 + Math.random() * 0.14,
        size: config.fontSize * (0.8 + Math.random() * 0.6),
        life: 0,
        maxLife: 200 + Math.random() * 400,
      };
    }

    resize();
    window.addEventListener("resize", resize);

    const streams = streamsRef.current;
    streams.length = 0;
    for (let i = 0; i < config.density; i++) {
      streams.push(createStream());
    }

    function animate() {
      ctx!.fillStyle = "rgba(6, 6, 8, 0.12)";
      ctx!.fillRect(0, 0, width, height);

      ctx!.font = `${config.fontSize}px "Geist Mono", "Fira Code", monospace`;

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];
        s.y += s.speed;
        s.life++;

        if (s.life > s.maxLife || s.y > height + 40) {
          streams[i] = createStream();
          continue;
        }

        const lifeRatio = s.life / s.maxLife;
        const fadeIn = Math.min(1, lifeRatio * 4);
        const fadeOut = Math.min(1, (1 - lifeRatio) * 3);
        const alpha = Math.min(fadeIn, fadeOut) * s.opacity;

        ctx!.fillStyle = config.color.replace("OPACITY", alpha.toFixed(3));
        ctx!.fillText(s.char, s.x, s.y);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ pointerEvents: "none" }}
    />
  );
}
