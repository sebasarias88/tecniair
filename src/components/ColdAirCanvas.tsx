"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
  width: number;
};

type ColdAirCanvasProps = {
  /** 0 = barely blowing, 1 = full power. Read every frame, so it can change live. */
  intensityRef: React.RefObject<number>;
  className?: string;
};

/**
 * Streaks of cold air drifting from the top right, like the flow from a split unit.
 * The pointer pushes the air around. Pauses itself when off screen.
 */
export function ColdAirCanvas({ intensityRef, className = "" }: ColdAirCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    const spawn = (p: Partial<Particle> = {}): Particle => {
      const maxLife = 180 + Math.random() * 220;
      return {
        x: width * (0.35 + Math.random() * 0.8),
        y: -20 + Math.random() * height * 0.5,
        vx: -(0.6 + Math.random() * 1.2),
        vy: 0.5 + Math.random() * 1.1,
        len: 14 + Math.random() * 46,
        life: 0,
        maxLife,
        width: 0.6 + Math.random() * 1.6,
        ...p,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(220, (width * height) / 7000));
      particles = Array.from({ length: count }, () =>
        spawn({ life: Math.random() * 300, x: Math.random() * width, y: Math.random() * height }),
      );
    };

    const draw = () => {
      raf = 0;
      if (!visible) return;
      const intensity = Math.max(0.15, Math.min(1, intensityRef.current ?? 0.6));
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const speed = 0.4 + intensity * 1.6;

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 22000) {
          const force = (1 - dist2 / 22000) * 2.4;
          const d = Math.sqrt(dist2) || 1;
          p.x += (dx / d) * force;
          p.y += (dy / d) * force;
        }

        p.x += p.vx * speed;
        p.y += p.vy * speed + Math.sin((p.life + i) * 0.03) * 0.25;
        p.life += 1;

        const t = p.life / p.maxLife;
        const alpha = Math.sin(Math.PI * Math.min(1, t)) * (0.18 + intensity * 0.5);
        const tail = p.len * (0.5 + intensity);
        const angle = Math.atan2(p.vy, p.vx);

        const grad = ctx.createLinearGradient(
          p.x,
          p.y,
          p.x - Math.cos(angle) * tail,
          p.y - Math.sin(angle) * tail,
        );
        grad.addColorStop(0, `rgba(200, 245, 255, ${alpha})`);
        grad.addColorStop(1, "rgba(127, 227, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - Math.cos(angle) * tail, p.y - Math.sin(angle) * tail);
        ctx.stroke();

        if (t >= 1 || p.x < -80 || p.y > height + 80) particles[i] = spawn();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [intensityRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
