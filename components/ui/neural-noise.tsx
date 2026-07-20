'use client';

import { useEffect, useRef, useState } from 'react';

interface NeuralNoiseProps {
  color?: [number, number, number];
  opacity?: number;
  speed?: number;
}

export function NeuralNoise({
  color = [0.9, 0.2, 0.4],
  opacity = 0.95,
  speed = 0.001,
}: NeuralNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    tX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    tY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext('webgl') || (canvasEl.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    const vsSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform vec3 u_color;
      uniform float u_speed;
      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }
      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.0);
        vec2 res = vec2(0.0);
        float scale = 8.0;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.0);
          sine_acc = rotate(sine_acc, 1.0);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (0.5 + 0.5 * cos(layer)) / scale;
          scale *= 1.2;
        }
        return res.x + res.y;
      }
      void main() {
        vec2 uv = 0.5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0.0, 1.0);
        p = 0.5 * pow(1.0 - p, 2.0);
        float t = u_speed * u_time;
        vec3 col = vec3(0.0);
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.0);
        noise += pow(noise, 10.0);
        noise = max(0.0, noise - 0.5);
        noise *= (1.0 - length(vUv - 0.5));
        col = u_color * noise;
        gl_FragColor = vec4(col, noise);
      }
    `;

    function createShader(glContext: WebGLRenderingContext, source: string, type: number) {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error('Shader compile error:', glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const activeUniform = gl.getActiveUniform(program, i);
      if (activeUniform) {
        uniforms[activeUniform.name] = gl.getUniformLocation(program, activeUniform.name);
      }
    }
    uniformsRef.current = uniforms;

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      if (glRef.current && uniformsRef.current.u_ratio) {
        glRef.current.uniform1f(uniformsRef.current.u_ratio, canvasEl.width / canvasEl.height);
      }
      if (glRef.current) {
        glRef.current.viewport(0, 0, canvasEl.width, canvasEl.height);
      }
      // Re-center pointer on resize
      pointer.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        tX: window.innerWidth / 2,
        tY: window.innerHeight / 2,
      };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (uniforms.u_color) {
      gl.uniform3f(uniforms.u_color, color[0], color[1], color[2]);
    }
    if (uniforms.u_speed) {
      gl.uniform1f(uniforms.u_speed, speed);
    }

    const render = () => {
      const currentTime = performance.now();
      const p = pointer.current;
      p.x += (p.tX - p.x) * 0.2;
      p.y += (p.tY - p.y) * 0.2;

      const glCtx = glRef.current;
      const uniformsObj = uniformsRef.current;

      if (glCtx) {
        if (uniformsObj.u_time) {
          glCtx.uniform1f(uniformsObj.u_time, currentTime);
        }
        if (uniformsObj.u_pointer_position) {
          glCtx.uniform2f(
            uniformsObj.u_pointer_position,
            p.x / window.innerWidth,
            1 - p.y / window.innerHeight
          );
        }
        glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
      }
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [color, speed]);

  const [currentOpacity, setCurrentOpacity] = useState(0);

  useEffect(() => {
    // Faster fade-in to target opacity on mount
    const timer = setTimeout(() => {
      setCurrentOpacity(opacity);
    }, 50);
    return () => clearTimeout(timer);
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: currentOpacity,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
}
