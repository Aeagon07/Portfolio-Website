/**
 * ThreeScene.jsx
 *
 * Final Integrated Visual System:
 *  - 3D Grid: Plane with a shader that reacts to object positions (torch effect).
 *  - PointLights: Attached to Cube and Orb to illuminate the grid.
 *  - Strict Separation: Cube (Top Half), Orb (Bottom Half) to avoid merged glows.
 *  - Shader Refinement: Thin white rim on colors, full flare on white state.
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { EffectComposer }  from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass }      from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

const ORANGE = new THREE.Color(1.0, 0.45, 0.00);
const GREEN  = new THREE.Color(0.10, 1.00, 0.30);
const PINK   = new THREE.Color(1.0, 0.10, 0.50);
const BLUE   = new THREE.Color(0.00, 0.85, 1.00);
const WHITE  = new THREE.Color(2.0, 2.0, 2.0);

const SEQUENCE = [ORANGE, WHITE, GREEN, WHITE, PINK, WHITE, BLUE, WHITE];

const objectVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewVec;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewVec = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const objectFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewVec;
  uniform vec3 uColor;
  uniform vec3 uRimColor;
  uniform float uRimPower;
  void main() {
    float rim = pow(1.0 - max(dot(vNormal, vViewVec), 0.0), uRimPower);
    vec3 finalColor = mix(uColor, uRimColor, rim);
    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

const gridVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const gridFragmentShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  uniform vec3 uCubePos;
  uniform vec3 uOrbPos;
  uniform vec3 uCubeColor;
  uniform vec3 uOrbColor;

  void main() {
    // Basic Grid Lines (padded/softer feel)
    vec2 grid = abs(fract(vUv * 18.0 - 0.5) - 0.5) / (fwidth(vUv * 18.0) * 1.8);
    float line = clamp(1.0 - min(grid.x, grid.y), 0.0, 1.0);
    float baseGrid = line * 0.15; // This line is still used below internally

    // Torch Lighting Effect
    float dCube = distance(vWorldPos, uCubePos);
    float dOrb  = distance(vWorldPos, uOrbPos);
    
    float torchCube = pow(max(0.0, 1.0 - dCube / 5.5), 4.0);
    float torchOrb  = pow(max(0.0, 1.0 - dOrb / 5.5), 4.0);
    
    // The grid "appears" on that position only when object glows
    float brightness = 0.01 + torchCube * 3.0 + torchOrb * 3.0;
    vec3 finalGridCol = (uCubeColor * torchCube + uOrbColor * torchOrb) * 1.5 + vec3(0.15);

    gl_FragColor = vec4(finalGridCol * line * brightness, 1.0);
  }
`;

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.z = 7;

    /* ── 3D LIGHT-REACTIVE GRID ── */
    const gridMat = new THREE.ShaderMaterial({
      uniforms: {
        uCubePos: { value: new THREE.Vector3() },
        uOrbPos: { value: new THREE.Vector3() },
        uCubeColor: { value: ORANGE.clone() },
        uOrbColor: { value: PINK.clone() },
      },
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const gridGeo = new THREE.PlaneGeometry(30, 20);
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.position.z = -2;
    scene.add(gridMesh);

    /* ── CUBE (TOP HALF) ── */
    const cubeTarget = new THREE.Object3D();
    const cubeVis    = new THREE.Group();
    cubeTarget.position.set(-3, 2, 0);
    scene.add(cubeVis);

    const cubeMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: ORANGE.clone() },
        uRimColor: { value: new THREE.Color(2.5, 2.5, 2.5) },
        uRimPower: { value: 3.5 }, // Thin rim initially
      },
      vertexShader: objectVertexShader,
      fragmentShader: objectFragmentShader,
      transparent: true,
    });
    const cubeMesh = new THREE.Mesh(new RoundedBoxGeometry(1.2, 1.2, 1.2, 4, 0.25), cubeMat);
    cubeVis.add(cubeMesh);

    /* ── ORB (BOTTOM HALF) ── */
    const orbTarget = new THREE.Object3D();
    const orbVis    = new THREE.Group();
    orbTarget.position.set(3, -2, 0);
    scene.add(orbVis);

    const orbMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: PINK.clone() },
        uRimColor: { value: new THREE.Color(2.5, 2.5, 2.5) },
        uRimPower: { value: 3.5 },
      },
      vertexShader: objectVertexShader,
      fragmentShader: objectFragmentShader,
      transparent: true,
    });
    const orbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.85, 64, 64), orbMat);
    orbVis.add(orbMesh);

    /* ── DYNAMIC MOVEMENT & COLLISION ── */
    // Targets for GSAP to drive
    const cubeTargetPos = new THREE.Vector3(-3, 2, 0);
    const orbTargetPos  = new THREE.Vector3(3, -2, 0);

    // Initial Tweens: Synchronized opposite movement
    const duration = 8;
    const ease = 'sine.inOut';

    gsap.to(cubeTargetPos, { 
      x: 5, y: 4, duration: duration, 
      repeat: -1, yoyo: true, ease: ease 
    });
    gsap.to(cubeTargetPos, { 
      y: -4, duration: duration * 0.75, 
      repeat: -1, yoyo: true, ease: ease 
    });
    
    gsap.to(orbTargetPos, { 
      x: -5, y: -4, duration: duration, 
      repeat: -1, yoyo: true, ease: ease 
    });
    gsap.to(orbTargetPos, { 
      y: 4, duration: duration * 0.75, 
      repeat: -1, yoyo: true, ease: ease 
    });

    /* ── Sequential Color Cycling ── */
    let cIdx = 0;
    let oIdx = 4;
    const cycle = () => {
      cIdx = (cIdx + 1) % SEQUENCE.length;
      oIdx = (oIdx + 1) % SEQUENCE.length;
      const nxtC = SEQUENCE[cIdx], nxtO = SEQUENCE[oIdx];
      
      const cPower = (nxtC === WHITE) ? 0.9 : 4.0; // Sharp edge vs Full flare
      const oPower = (nxtO === WHITE) ? 0.9 : 4.0;

      const tl = gsap.timeline({ onComplete: () => setTimeout(cycle, 1500) });
      tl.to(cubeMat.uniforms.uColor.value, { r: nxtC.r, g: nxtC.g, b: nxtC.b, duration: 1.2 }, 0);
      tl.to(cubeMat.uniforms.uRimPower, { value: cPower, duration: 1.2 }, 0);
      tl.to(gridMat.uniforms.uCubeColor.value, { r: nxtC.r, g: nxtC.g, b: nxtC.b, duration: 1.2 }, 0);

      tl.to(orbMat.uniforms.uColor.value,  { r: nxtO.r, g: nxtO.g, b: nxtO.b, duration: 1.2 }, 0);
      tl.to(orbMat.uniforms.uRimPower, { value: oPower, duration: 1.2 }, 0);
      tl.to(gridMat.uniforms.uOrbColor.value, { r: nxtO.r, g: nxtO.g, b: nxtO.b, duration: 1.2 }, 0);
    };
    cycle();

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.7, 0.4, 0.1); 
    composer.addPass(bloom);

    const repulsionDist = 3.5;
    const repulsionStrength = 0.05;

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = THREE.MathUtils.clamp(gsap.ticker.time, 0, 1000);
      
      cubeMesh.rotation.x = t * 0.5;
      cubeMesh.rotation.y = t * 0.7;
      orbMesh.rotation.y  = t * 0.3;

      // Soft Collision Avoidance
      const diff = new THREE.Vector3().subVectors(cubeVis.position, orbVis.position);
      const dist = diff.length();
      
      const cubeForce = new THREE.Vector3();
      const orbForce  = new THREE.Vector3();

      if (dist < repulsionDist) {
        const force = diff.normalize().multiplyScalar((repulsionDist - dist) * repulsionStrength);
        cubeForce.add(force);
        orbForce.sub(force);
      }

      // Smoothly follow targets with force adjustment
      cubeVis.position.lerp(cubeTargetPos.clone().add(cubeForce), 0.05);
      orbVis.position.lerp(orbTargetPos.clone().add(orbForce), 0.05);

      // Update grid shader with current positions for torch effect
      gridMat.uniforms.uCubePos.value.copy(cubeVis.position);
      gridMat.uniforms.uOrbPos.value.copy(orbVis.position);

      composer.render();
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloom.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      gsap.killTweensOf(cubeTargetPos);
      gsap.killTweensOf(orbTargetPos);
      composer.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 1, pointerEvents: 'none', overflow: 'hidden',
      }}
    />
  );
}
