'use client';

/**
 * Mathematical Ribbon Cursor Trail
 * Ported to React/TypeScript for the Engineering Studio.
 */

class n {
  phase: number = 0;
  offset: number = 0;
  frequency: number = 0.001;
  amplitude: number = 1;
  val: number = 0;

  constructor(e: any) {
    this.init(e || {});
  }

  init(e: any) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  }

  update() {
    this.phase += this.frequency;
    this.val = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.val;
  }

  value() {
    return this.val;
  }
}

class Line {
  spring: number = 0;
  friction: number = 0;
  nodes: Node[] = [];

  constructor(e: any) {
    this.init(e || {});
  }

  init(e: any) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (var t, n = 0; n < E.size; n++) {
      t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  }

  update() {
    let e = this.spring;
    let t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (var n, i = 0, a = this.nodes.length; i < a; i++) {
      t = this.nodes[i];
      if (0 < i) {
        n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  }

  draw() {
    if (!ctx) return;
    let e: Node,
      t: Node,
      n = this.nodes[0].x,
      i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    let a;
    for (a = 1; a < this.nodes.length - 2; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = this.nodes[a];
    t = this.nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function onMousemove(e: any) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }
  function c(e: any) {
    if (e.touches) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
  }
  function l(e: any) {
    if (e.touches && 1 == e.touches.length) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }
  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);
  document.addEventListener("mousemove", c);
  document.addEventListener("touchmove", c);
  document.addEventListener("touchstart", l);
  c(e);
  o();
  render();
}

function render() {
  if (ctx && ctx.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    // Adjusted hue to align with the portfolio's blue/indigo palette
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ", 100%, 50%, 0.025)";
    ctx.lineWidth = 1;
    for (var e, t = 0; t < E.trails; t++) {
      (e = lines[t]).update();
      e.draw();
    }
    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  if (ctx && ctx.canvas) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }
}

interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
  running: boolean;
  frame: number;
}

var ctx: ExtendedCanvasRenderingContext2D | null,
  f: n,
  e = 0,
  pos = { x: 0, y: 0 },
  lines: Line[] = [],
  E = {
    debug: true,
    friction: 0.5,
    trails: 40,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };

class Node {
  x: number = 0;
  y: number = 0;
  vy: number = 0;
  vx: number = 0;
}

export const renderCanvas = function () {
  const canvasElement = document.getElementById("cursor-canvas") as HTMLCanvasElement;
  if (!canvasElement) return;
  
  ctx = canvasElement.getContext("2d") as ExtendedCanvasRenderingContext2D;
  if (!ctx) return;

  ctx.running = true;
  ctx.frame = 1;
  f = new n({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 210, // Offset 210 starts the hue in the blue range
  });
  
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  
  window.addEventListener("focus", () => {
    if (ctx && !ctx.running) {
      ctx.running = true;
      render();
    }
  });
  
  window.addEventListener("blur", () => {
    if (ctx) ctx.running = true;
  });
  
  resizeCanvas();
};
