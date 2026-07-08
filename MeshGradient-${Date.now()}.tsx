import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying float vDistortion;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uAmplitude;
  uniform float uFrequency;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    float noise = snoise(vec3(position.xy * uFrequency, uTime * uSpeed));
    vDistortion = noise;
    vec3 newPosition = position + normal * noise * uAmplitude;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vDistortion;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform float uBrightness;
  uniform float uReflection;
  uniform bool uGrain;
  uniform float uTime;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float noise = (vDistortion + 1.0) * 0.5;
    vec3 colTop = mix(uColor1, uColor2, smoothstep(0.0, 1.0, vUv.x + noise * 0.3));
    vec3 colBottom = mix(uColor3, uColor4, smoothstep(0.0, 1.0, vUv.y - noise * 0.3));
    float blend = smoothstep(0.1, 0.9, noise);
    vec3 finalColor = mix(colTop, colBottom, blend);
    finalColor += pow(noise, 6.0) * uReflection;
    finalColor *= uBrightness;
    if (uGrain) {
      float grain = (random(vUv * 1024.0 + fract(uTime)) - 0.5) * 0.04;
      finalColor += grain;
    }
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function ExportedMeshGradient() {
  const meshRef = useRef(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: 0.22 },
    uAmplitude: { value: 0.5 },
    uFrequency: { value: 0.13 },
    uBrightness: { value: 1.15 },
    uReflection: { value: 0.19 },
    uColor1: { value: new THREE.Color("#ffcd94") },
    uColor2: { value: new THREE.Color("#ccfffe") },
    uColor3: { value: new THREE.Color("#b348e5") },
    uColor4: { value: new THREE.Color("#f2ffeb") },
    uGrain: { value: true },
  }), []);

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <div style={{ width: '100%', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 5 / 0.75], fov: 40 }}>
        <mesh ref={meshRef} rotation={[-0.861592653589793, -3.14159265358979, -3.14159265358979]}>
          <planeGeometry args={[20, 20, 180, 180]} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            wireframe={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Canvas>
    </div>
  );
}