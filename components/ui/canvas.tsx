
'use client';

/**
 * Mathematical Ribbon Cursor Trail
 * Ported to React/TypeScript for the Engineering Studio.
 */

// @ts-ignore
function n(e) {
  // @ts-ignore
  this.init(e || {});
}
n.prototype = {
  // @ts-ignore
  init: function (e) {
    // @ts-ignore
    this.phase = e.phase || 0;
    // @ts-ignore
    this.offset = e.offset || 0;
    // @ts-ignore
    this.frequency = e.frequency || 0.001;
    // @ts-ignore
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    return (
      // @ts-ignore
      (this.phase += this.frequency),
      // @ts-ignore
      (this.val = this.offset + Math.sin(this.phase) * this.amplitude),
      this.val
    );
  },
  value: function () {
    // @ts-ignore
    return this.val;
  },
};

// @ts-ignore
function Line(e) {
  // @ts-ignore
  this.init(e || {});
}

Line.prototype = {
  // @ts-ignore
  init: function (e) {
    // @ts-ignore
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    // @ts-ignore
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    // @ts-ignore
    this.nodes = [];
    for (var t, n = 0; n < E.size; n++) {
      t = new Node();
      // @ts-ignore
      t.x = pos.x;
      // @ts-ignore
      t.y = pos.y;
      // @ts-ignore
      this.nodes.push(t);
    }
  },
  update: function () {
    // @ts-ignore
    let e = this.spring,
      // @ts-ignore
      t = this.nodes[0];
    // @ts-ignore
    t.vx += (pos.x - t.x) * e;
    // @ts-ignore
    t.vy += (pos.y - t.y) * e;
    // @ts-ignore
    for (var n, i = 0, a = this.nodes.length; i < a; i++)
      // @ts-ignore
      (t = this.nodes[i]),
        0 < i &&
          // @ts-ignore
          ((n = this.nodes[i - 1]),
          (t.vx += (n.x - t.x) * e),
          (t.vy += (n.y - t.y) * e),
          (t.vx += n.vx * E.dampening),
          (t.vy += n.vy * E.dampening)),
        // @ts-ignore
        (t.vx *= this.friction),
        // @ts-ignore
        (t.vy *= this.friction),
        (t.x += t.vx),
        (t.y += t.vy),
        (e *= E.tension);
  },
  draw: function () {
    let e,
      t,
      // @ts-ignore
      n = this.nodes[0].x,
      // @ts-ignore
      i = this.nodes[0].y;
    // @ts-ignore
    ctx.beginPath();
    // @ts-ignore
    ctx.moveTo(n, i);
    // @ts-ignore
    for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
      // @ts-ignore
      e = this.nodes[a];
      // @ts-ignore
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      // @ts-ignore
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    // @ts-ignore
    e = this.nodes[a];
    // @ts-ignore
    t = this.nodes[a + 1];
    // @ts-ignore
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    // @ts-ignore
    ctx.stroke();
    // @ts-ignore
    ctx.closePath();
  },
};

// @ts-ignore
function onMousemove(e) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }
  // @ts-ignore
  function c(e) {
    if (e.touches) {
      // @ts-ignore
      pos.x = e.touches[0].pageX;
      // @ts-ignore
      pos.y = e.touches[0].pageY;
    } else {
      // @ts-ignore
      pos.x = e.clientX;
      // @ts-ignore
      pos.y = e.clientY;
    }
  }
  // @ts-ignore
  function l(e) {
    // @ts-ignore
    if (e.touches && 1 == e.touches.length) {
      // @ts-ignore
      pos.x = e.touches[0].pageX;
      // @ts-ignore
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
  // @ts-ignore
  if (ctx && ctx.running) {
    // @ts-ignore
    ctx.globalCompositeOperation = "source-over";
    // @ts-ignore
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // @ts-ignore
    ctx.globalCompositeOperation = "lighter";
    // @ts-ignore
    // Adjusted hue to align with the portfolio's blue/indigo palette
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ", 100%, 50%, 0.025)";
    // @ts-ignore
    ctx.lineWidth = 1;
    for (var e, t = 0; t < E.trails; t++) {
      // @ts-ignore
      (e = lines[t]).update();
      e.draw();
    }
    // @ts-ignore
    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  // @ts-ignore
  if (ctx && ctx.canvas) {
    // @ts-ignore
    ctx.canvas.width = window.innerWidth;
    // @ts-ignore
    ctx.canvas.height = window.innerHeight;
  }
}

// @ts-ignore
var ctx,
  // @ts-ignore
  f,
  // @ts-ignore
  e = 0,
  // @ts-ignore
  pos = { x: 0, y: 0 },
  // @ts-ignore
  lines = [],
  E = {
    debug: true,
    friction: 0.5,
    trails: 40,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };

// @ts-ignore
function Node() {
  // @ts-ignore
  this.x = 0;
  // @ts-ignore
  this.y = 0;
  // @ts-ignore
  this.vy = 0;
  // @ts-ignore
  this.vx = 0;
}

export const renderCanvas = function () {
  const canvasElement = document.getElementById("cursor-canvas") as HTMLCanvasElement;
  if (!canvasElement) return;
  
  // @ts-ignore
  ctx = canvasElement.getContext("2d");
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
    // @ts-ignore
    if (ctx && !ctx.running) {
      // @ts-ignore
      ctx.running = true;
      render();
    }
  });
  
  window.addEventListener("blur", () => {
    // @ts-ignore
    if (ctx) ctx.running = true;
  });
  
  resizeCanvas();
};
