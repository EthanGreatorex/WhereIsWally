import { useEffect, useRef } from "react";

type Snowflake = {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  drift: number;
};

export default function Snowfall({ count = 120 }:{count?:number}){
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const flakesRef = useRef<Snowflake[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const rand = (min:number, max:number) => Math.random() * (max - min) + min;

    const resetFlakes = () => {
      flakesRef.current = [];
      for(let i=0;i<count;i++){
        flakesRef.current.push({
          x: rand(0, window.innerWidth),
          y: rand(0, window.innerHeight),
          radius: rand(0.8, 3.2),
          speedY: rand(0.3, 1.2),
          speedX: rand(-0.3, 0.3),
          drift: rand(0.002, 0.01),
        });
      }
    }

    const onResize = () => {
    
      resize();
      resetFlakes();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      flakesRef.current.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, true);
      })
      ctx.fill();
    }

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      flakesRef.current.forEach(f => {
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.y * f.drift) * 0.5;
        if(f.y - f.radius > h){
          f.y = -10;
          f.x = Math.random() * w;
        }
        if(f.x > w + 50) f.x = -50;
        if(f.x < -50) f.x = w + 50;
      });
      draw();
      animationRef.current = requestAnimationFrame(step);
    }

    resize();
    resetFlakes();
    window.addEventListener("resize", onResize);
    animationRef.current = requestAnimationFrame(step);

    // pause when page hidden
    const onVisibility = () => {
      if (document.hidden) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else {
        if (!animationRef.current) animationRef.current = requestAnimationFrame(step);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="snow-canvas"
      style={{position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0}}
    />
  );
}
