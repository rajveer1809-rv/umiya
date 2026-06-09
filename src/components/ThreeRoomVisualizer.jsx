import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeRoomVisualizer({
  space,
  selectedColor,
  onTargetChange
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mountRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    paintableObjects: [],
    hoveredObject: null,
    frameId: null
  });

  const [activeTarget, setActiveTarget] = useState('');
  const activeTargetRef = useRef('');

  // Keep track of target colors across scene changes
  const targetColorsRef = useRef({});

  // Helper: Get color for a target or return default
  const getTargetColor = (targetName, defaultColor) => {
    if (targetColorsRef.current[targetName]) {
      return targetColorsRef.current[targetName];
    }
    targetColorsRef.current[targetName] = defaultColor;
    return defaultColor;
  };

  // 1. Procedural Texture Generators
  const createWoodBumpTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 70; i++) {
      ctx.beginPath();
      let y = Math.random() * 512;
      ctx.moveTo(0, y);
      for (let x = 0; x <= 512; x += 20) {
        let wave = Math.sin(x * 0.02) * 8 + Math.random() * 3;
        ctx.lineTo(x, y + wave);
      }
      ctx.stroke();
    }
    // Knots
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 512, 12 + Math.random() * 15, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    return texture;
  };

  const createLinenBumpTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 128, 128);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 1;
    // vertical
    for (let i = 0; i < 128; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 128);
      ctx.stroke();
    }
    // horizontal
    for (let i = 0; i < 128; i += 4) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(128, i);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    return texture;
  };

  const createStuccoBumpTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);

    const imgData = ctx.getImageData(0, 0, 256, 256);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 45;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    // Smooth out slightly
    ctx.filter = 'blur(1px)';
    ctx.drawImage(canvas, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  };

  // 2. Setup ThreeJS Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = 440;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1E293B'); // Cozy dark background behind canvas
    mountRef.current.scene = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 9);
    mountRef.current.camera = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.renderer = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below floor
    controls.minDistance = 2;
    controls.maxDistance = 15;
    mountRef.current.controls = controls;

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      mountRef.current.frameId = requestAnimationFrame(animate);
    };
    mountRef.current.frameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current.frameId) {
        cancelAnimationFrame(mountRef.current.frameId);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // 3. Build & Rebuild Scene based on "space"
  useEffect(() => {
    const { scene, camera, controls } = mountRef.current;
    if (!scene || !camera) return;

    // Clear old children except system elements
    while (scene.children.length > 0) {
      const child = scene.children[0];
      scene.remove(child);
    }

    mountRef.current.paintableObjects = [];
    mountRef.current.hoveredObject = null;

    // Setup Textures
    const woodBump = createWoodBumpTexture();
    const linenBump = createLinenBumpTexture();
    const stuccoBump = createStuccoBumpTexture();

    // Setup Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.55);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight('#ffffff', 0.85);
    dirLight.position.set(6, 9, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    dirLight.shadow.camera.left = -6;
    dirLight.shadow.camera.right = 6;
    dirLight.shadow.camera.top = 6;
    dirLight.shadow.camera.bottom = -6;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    let defaultActiveTarget = '';

    if (space === 'Living Room') {
      defaultActiveTarget = 'Main Wall';
      camera.position.set(0, 2.2, 8.5);
      controls.target.set(0, 0.4, 0);

      // Floor (White)
      const floorGeo = new THREE.BoxGeometry(10, 0.1, 8);
      const floorMat = new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.8,
        metalness: 0.0
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.set(0, -1, 0);
      floor.receiveShadow = true;
      scene.add(floor);

      // Rug
      const rugGeo = new THREE.BoxGeometry(6.2, 0.02, 3.8);
      const rugMat = new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        roughness: 0.95
      });
      const rug = new THREE.Mesh(rugGeo, rugMat);
      rug.position.set(0, -0.94, 0.6);
      rug.receiveShadow = true;
      scene.add(rug);

      // Main Wall (Back Wall) - Paintable
      const mainWallGeo = new THREE.BoxGeometry(10, 5, 0.2);
      const mainWallMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Main Wall', selectedColor),
        roughness: 0.85,
        bumpMap: stuccoBump,
        bumpScale: 0.015
      });
      const mainWall = new THREE.Mesh(mainWallGeo, mainWallMat);
      mainWall.position.set(0, 1.5, -4);
      mainWall.receiveShadow = true;
      mainWall.castShadow = true;
      mainWall.name = 'Main Wall';
      scene.add(mainWall);
      mountRef.current.paintableObjects.push(mainWall);

      // Accent Wall (Right Wall) - Paintable
      const accentWallGeo = new THREE.BoxGeometry(0.2, 5, 8);
      const accentWallMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Accent Wall', '#4A5568'),
        roughness: 0.85,
        bumpMap: stuccoBump,
        bumpScale: 0.015
      });
      const accentWall = new THREE.Mesh(accentWallGeo, accentWallMat);
      accentWall.position.set(4.9, 1.5, 0);
      accentWall.receiveShadow = true;
      accentWall.castShadow = true;
      accentWall.name = 'Accent Wall';
      scene.add(accentWall);
      mountRef.current.paintableObjects.push(accentWall);

      // Left Wall (With Window)
      const leftWallGeo = new THREE.BoxGeometry(0.2, 5, 8);
      const leftWallMat = new THREE.MeshStandardMaterial({
        color: '#FAF8F5',
        roughness: 0.9
      });
      const leftWall = new THREE.Mesh(leftWallGeo, leftWallMat);
      leftWall.position.set(-4.9, 1.5, 0);
      leftWall.receiveShadow = true;
      scene.add(leftWall);

      // Window Frame
      const windowFrameGeo = new THREE.BoxGeometry(0.25, 2.5, 3.5);
      const windowFrameMat = new THREE.MeshStandardMaterial({
        color: '#2D3748',
        roughness: 0.5
      });
      const windowFrame = new THREE.Mesh(windowFrameGeo, windowFrameMat);
      windowFrame.position.set(-4.85, 2.0, 0);
      scene.add(windowFrame);

      // Sky backdrop behind window
      const skyGeo = new THREE.PlaneGeometry(10, 8);
      const skyMat = new THREE.MeshBasicMaterial({ color: '#BAE6FD' });
      const sky = new THREE.Mesh(skyGeo, skyMat);
      sky.position.set(-6, 2, 0);
      sky.rotation.y = Math.PI / 2;
      scene.add(sky);

      // Sofa - Paintable (Upholstery color customizable)
      const sofaGroup = new THREE.Group();
      sofaGroup.position.set(0, -2.0, 0);
      sofaGroup.scale.set(1.5, 1.5, 1.5);

      const sofaBaseGeo = new THREE.BoxGeometry(5.2, 0.4, 2.0);
      const sofaBaseMat = new THREE.MeshStandardMaterial({ color: '#1A202C', roughness: 0.8 });
      const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaBaseMat);
      sofaBase.position.y = 0.2;
      sofaBase.castShadow = true;
      sofaBase.receiveShadow = true;
      sofaGroup.add(sofaBase);

      const cushionGeo = new THREE.BoxGeometry(2.35, 0.4, 1.7);
      const cushionMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Sofa Upholstery', '#52525B'),
        roughness: 0.9,
        bumpMap: linenBump,
        bumpScale: 0.01
      });
      
      const leftCushion = new THREE.Mesh(cushionGeo, cushionMat);
      leftCushion.position.set(-1.25, 0.5, 0.05);
      leftCushion.castShadow = true;
      leftCushion.name = 'Sofa Upholstery';
      sofaGroup.add(leftCushion);
      mountRef.current.paintableObjects.push(leftCushion);

      const rightCushion = new THREE.Mesh(cushionGeo, cushionMat);
      rightCushion.position.set(1.25, 0.5, 0.05);
      rightCushion.castShadow = true;
      rightCushion.name = 'Sofa Upholstery';
      sofaGroup.add(rightCushion);
      mountRef.current.paintableObjects.push(rightCushion);

      const backGeo = new THREE.BoxGeometry(5.2, 0.9, 0.4);
      const backMesh = new THREE.Mesh(backGeo, cushionMat);
      backMesh.position.set(0, 1.0, -0.75);
      backMesh.castShadow = true;
      backMesh.name = 'Sofa Upholstery';
      sofaGroup.add(backMesh);
      mountRef.current.paintableObjects.push(backMesh);

      const armGeo = new THREE.BoxGeometry(0.4, 0.9, 2.0);
      const leftArm = new THREE.Mesh(armGeo, cushionMat);
      leftArm.position.set(-2.6, 0.7, 0.0);
      leftArm.castShadow = true;
      leftArm.name = 'Sofa Upholstery';
      sofaGroup.add(leftArm);
      mountRef.current.paintableObjects.push(leftArm);

      const rightArm = new THREE.Mesh(armGeo, cushionMat);
      rightArm.position.set(2.6, 0.7, 0.0);
      rightArm.castShadow = true;
      rightArm.name = 'Sofa Upholstery';
      sofaGroup.add(rightArm);
      mountRef.current.paintableObjects.push(rightArm);

      // Pillow Accents
      const pillowGeo = new THREE.BoxGeometry(0.8, 0.8, 0.3);
      const pillow1Mat = new THREE.MeshStandardMaterial({ color: '#A85A42', roughness: 0.9 });
      const pillow1 = new THREE.Mesh(pillowGeo, pillow1Mat);
      pillow1.position.set(-2.0, 0.8, 0.3);
      pillow1.rotation.set(0.1, 0.4, -0.2);
      pillow1.castShadow = true;
      sofaGroup.add(pillow1);

      const pillow2Mat = new THREE.MeshStandardMaterial({ color: '#BF8C4C', roughness: 0.9 });
      const pillow2 = new THREE.Mesh(pillowGeo, pillow2Mat);
      pillow2.position.set(2.0, 0.8, 0.3);
      pillow2.rotation.set(0.1, -0.4, 0.2);
      pillow2.castShadow = true;
      sofaGroup.add(pillow2);

      scene.add(sofaGroup);



      // Ambient overhead light sources (Visual Spotlights)
      const spotLight1 = new THREE.SpotLight('#FFF8E7', 3.0, 8, Math.PI / 6, 0.5, 1);
      spotLight1.position.set(0, 3.8, -1.5);
      spotLight1.target = mainWall;
      scene.add(spotLight1);

    } else if (space === 'Bedroom') {
      defaultActiveTarget = 'Headboard Wall';
      camera.position.set(0, 2.2, 8.0);
      controls.target.set(0, 0.5, 0);

      // Floor (Wood)
      const floorGeo = new THREE.BoxGeometry(10, 0.1, 8);
      const floorMat = new THREE.MeshStandardMaterial({
        color: '#C68B59',
        roughness: 0.4,
        bumpMap: woodBump,
        bumpScale: 0.02
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.set(0, -1, 0);
      floor.receiveShadow = true;
      scene.add(floor);

      // Headboard Wall (Back Wall) - Paintable
      const wallGeo = new THREE.BoxGeometry(10, 5, 0.2);
      const wallMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Headboard Wall', selectedColor),
        roughness: 0.9,
        bumpMap: stuccoBump,
        bumpScale: 0.01
      });
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(0, 1.5, -4);
      wall.receiveShadow = true;
      wall.name = 'Headboard Wall';
      scene.add(wall);
      mountRef.current.paintableObjects.push(wall);

      // Bed Group
      const bedGroup = new THREE.Group();
      bedGroup.position.set(0, -0.95, -1.0);

      // Bed Frame
      const frameGeo = new THREE.BoxGeometry(4.4, 0.6, 5.0);
      const frameMat = new THREE.MeshStandardMaterial({ color: '#2D3748', roughness: 0.8 });
      const bedFrame = new THREE.Mesh(frameGeo, frameMat);
      bedFrame.position.y = 0.3;
      bedFrame.castShadow = true;
      bedFrame.receiveShadow = true;
      bedGroup.add(bedFrame);

      // Headboard - Paintable
      const hbGeo = new THREE.BoxGeometry(4.4, 1.8, 0.25);
      const hbMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Headboard Fabric', '#2D3748'),
        roughness: 0.95,
        bumpMap: linenBump,
        bumpScale: 0.015
      });
      const headboard = new THREE.Mesh(hbGeo, hbMat);
      headboard.position.set(0, 1.2, -2.4);
      headboard.castShadow = true;
      headboard.name = 'Headboard Fabric';
      bedGroup.add(headboard);
      mountRef.current.paintableObjects.push(headboard);

      // Mattress
      const mattressGeo = new THREE.BoxGeometry(4.2, 0.5, 4.8);
      const mattressMat = new THREE.MeshStandardMaterial({ color: '#F8FAFC', roughness: 0.9 });
      const mattress = new THREE.Mesh(mattressGeo, mattressMat);
      mattress.position.set(0, 0.75, 0.05);
      mattress.castShadow = true;
      bedGroup.add(mattress);

      // Blanket / Comforter - Paintable
      const blanketGeo = new THREE.BoxGeometry(4.25, 0.35, 3.4);
      const blanketMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Blanket', '#637A9F'),
        roughness: 0.95,
        bumpMap: linenBump,
        bumpScale: 0.01
      });
      const blanket = new THREE.Mesh(blanketGeo, blanketMat);
      blanket.position.set(0, 0.9, 0.7);
      blanket.castShadow = true;
      blanket.name = 'Blanket';
      bedGroup.add(blanket);
      mountRef.current.paintableObjects.push(blanket);

      // Pillows
      const pillowGeo = new THREE.BoxGeometry(1.6, 0.35, 1.0);
      const pillowMat = new THREE.MeshStandardMaterial({ color: '#F1F5F9', roughness: 0.9 });
      
      const leftPillow = new THREE.Mesh(pillowGeo, pillowMat);
      leftPillow.position.set(-0.95, 0.9, -1.6);
      leftPillow.rotation.x = 0.15;
      leftPillow.castShadow = true;
      bedGroup.add(leftPillow);

      const rightPillow = new THREE.Mesh(pillowGeo, pillowMat);
      rightPillow.position.set(0.95, 0.9, -1.6);
      rightPillow.rotation.x = 0.15;
      rightPillow.castShadow = true;
      bedGroup.add(rightPillow);

      scene.add(bedGroup);



    } else if (space === 'Sideboard Cabinet') {
      defaultActiveTarget = 'Cabinet Body';
      camera.position.set(0, 1.4, 5.0);
      controls.target.set(0, 0.5, 0);

      // Wall background
      const bgWallGeo = new THREE.BoxGeometry(8, 5, 0.2);
      const bgWallMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Sideboard Wall', '#ECE9E2'),
        roughness: 0.9,
        bumpMap: stuccoBump,
        bumpScale: 0.01
      });
      const bgWall = new THREE.Mesh(bgWallGeo, bgWallMat);
      bgWall.position.set(0, 1.5, -2);
      bgWall.receiveShadow = true;
      bgWall.name = 'Sideboard Wall';
      scene.add(bgWall);
      mountRef.current.paintableObjects.push(bgWall);

      // Floor (Microcement)
      const floorGeo = new THREE.BoxGeometry(8, 0.1, 5);
      const floorMat = new THREE.MeshStandardMaterial({
        color: '#E5E7EB',
        roughness: 0.45
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.set(0, -0.9, 0.5);
      floor.receiveShadow = true;
      scene.add(floor);

      // Sideboard Cabinet Group
      const cabinetGroup = new THREE.Group();
      cabinetGroup.position.set(0, -0.85, 0);

      // Legs
      const legGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.5);
      const legMat = new THREE.MeshStandardMaterial({ color: '#111827', metalness: 0.8, roughness: 0.3 });
      const offsets = [
        [-1.8, -0.6], [1.8, -0.6], [-1.8, 0.6], [1.8, 0.6]
      ];
      offsets.forEach(([x, z]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, 0.25, z);
        leg.rotation.x = z < 0 ? -0.08 : 0.08;
        leg.castShadow = true;
        cabinetGroup.add(leg);
      });

      // Main Cabinet Box - Paintable
      const cabBodyGeo = new THREE.BoxGeometry(3.8, 1.4, 1.4);
      const cabBodyMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Cabinet Body', selectedColor),
        roughness: 0.7,
        metalness: 0.1
      });
      const cabBody = new THREE.Mesh(cabBodyGeo, cabBodyMat);
      cabBody.position.y = 1.2;
      cabBody.castShadow = true;
      cabBody.receiveShadow = true;
      cabBody.name = 'Cabinet Body';
      cabinetGroup.add(cabBody);
      mountRef.current.paintableObjects.push(cabBody);

      // Wood Top Panel - Paintable
      const cabTopGeo = new THREE.BoxGeometry(3.86, 0.08, 1.46);
      const cabTopMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Cabinet Top', '#78350F'),
        roughness: 0.3,
        bumpMap: woodBump,
        bumpScale: 0.01
      });
      const cabTop = new THREE.Mesh(cabTopGeo, cabTopMat);
      cabTop.position.set(0, 1.94, 0);
      cabTop.castShadow = true;
      cabTop.name = 'Cabinet Top';
      cabinetGroup.add(cabTop);
      mountRef.current.paintableObjects.push(cabTop);

      // Handles / Knobs
      const knobGeo = new THREE.SphereGeometry(0.035, 16, 16);
      const knobMat = new THREE.MeshStandardMaterial({ color: '#D97706', metalness: 0.9, roughness: 0.1 });
      
      const knobLocs = [
        [-0.95, 1.2, 0.71], [-0.35, 1.2, 0.71],
        [0.35, 1.2, 0.71], [0.95, 1.2, 0.71]
      ];
      knobLocs.forEach(([x, y, z]) => {
        const knob = new THREE.Mesh(knobGeo, knobMat);
        knob.position.set(x, y, z);
        knob.castShadow = true;
        cabinetGroup.add(knob);
      });

      scene.add(cabinetGroup);

      // Plant pot on cabinet
      const plantGroup = new THREE.Group();
      plantGroup.position.set(1.1, 1.15, 0.0);

      const potGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.3, 16);
      const potMat = new THREE.MeshStandardMaterial({ color: '#E2E8F0', roughness: 0.6 });
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.castShadow = true;
      plantGroup.add(pot);

      // Hanging foliage
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.4);
      const leafMat = new THREE.MeshStandardMaterial({ color: '#10B981', roughness: 0.8 });
      for (let i = 0; i < 4; i++) {
        const stem = new THREE.Mesh(stemGeo, leafMat);
        stem.position.set(Math.sin(i) * 0.08, 0.1, Math.cos(i) * 0.08);
        stem.rotation.set(0.6 + Math.random() * 0.5, i * 1.5, 0);
        stem.castShadow = true;
        plantGroup.add(stem);
      }
      scene.add(plantGroup);

      // Designer Lamp on Sideboard
      const deskLamp = new THREE.Group();
      deskLamp.position.set(-1.1, 1.1, 0.0);

      const lampBaseGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.04);
      const lampBaseMat = new THREE.MeshStandardMaterial({ color: '#1E293B', roughness: 0.4 });
      const base = new THREE.Mesh(lampBaseGeo, lampBaseMat);
      base.castShadow = true;
      deskLamp.add(base);

      const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6);
      const pole = new THREE.Mesh(poleGeo, lampBaseMat);
      pole.position.set(0, 0.3, 0);
      pole.rotation.z = -0.15;
      pole.castShadow = true;
      deskLamp.add(pole);

      const headGeo = new THREE.ConeGeometry(0.14, 0.25, 16);
      const head = new THREE.Mesh(headGeo, lampBaseMat);
      head.position.set(-0.15, 0.6, 0);
      head.rotation.z = 0.8;
      head.castShadow = true;
      deskLamp.add(head);

      const deskLight = new THREE.SpotLight('#FFF2D3', 1.8, 4, Math.PI / 4, 0.5, 1);
      deskLight.position.set(-0.15, 0.58, 0);
      deskLight.target.position.set(-0.6, 0.0, 0);
      deskLamp.add(deskLight);
      deskLamp.add(deskLight.target);

      scene.add(deskLamp);

    } else if (space === 'Wood Planks') {
      defaultActiveTarget = 'Plank 3';
      camera.position.set(0, 0, 4.0);
      controls.target.set(0, 0, 0);

      // Prevent user from rotating behind the planks
      controls.maxAzimuthAngle = Math.PI / 4;
      controls.minAzimuthAngle = -Math.PI / 4;
      controls.maxPolarAngle = Math.PI / 2 + 0.2;
      controls.minPolarAngle = Math.PI / 2 - 0.5;

      // 5 Horizontal Wood Planks stacked in a display rack
      const plankColors = ['#A85A42', '#BF8C4C', selectedColor, '#637A9F', '#8F9B9C'];
      
      for (let i = 0; i < 5; i++) {
        const plankName = `Plank ${i + 1}`;
        const plankGeo = new THREE.BoxGeometry(4.2, 0.52, 0.12);
        
        // Dynamic roughness/metalness based on index for finishing variations
        // Plank 3 is our primary selected color.
        const coatingColor = i === 2 ? selectedColor : getTargetColor(plankName, plankColors[i]);

        const plankMat = new THREE.MeshStandardMaterial({
          color: coatingColor,
          roughness: i === 2 ? 0.3 : 0.2 + (i * 0.15), // varies satin to gloss
          bumpMap: woodBump,
          bumpScale: 0.02,
          clearcoat: i === 2 ? 0.6 : (i === 0 ? 0.9 : 0.0), // glossy clearcoat on plank 1 and 3
          clearcoatRoughness: 0.1
        });

        const plank = new THREE.Mesh(plankGeo, plankMat);
        // stack vertically
        plank.position.set(0, 1.2 - (i * 0.6), 0);
        plank.rotation.x = -0.12; // tilt forward slightly to capture specular highlights
        plank.castShadow = true;
        plank.receiveShadow = true;
        plank.name = plankName;

        scene.add(plank);
        mountRef.current.paintableObjects.push(plank);
      }

      // Cozy angled lighting to capture wood grain bumps
      const sideSpot = new THREE.SpotLight('#ffffff', 4.0, 10, Math.PI / 8, 0.3, 1);
      sideSpot.position.set(-3, 3, 3);
      sideSpot.castShadow = true;
      scene.add(sideSpot);

    } else if (space === 'Linen Wall') {
      defaultActiveTarget = 'Linen Wall';
      camera.position.set(0, 1.0, 4.2);
      controls.target.set(0, 0.6, 0);

      // Linen Fabric Wall - Paintable
      const wallGeo = new THREE.BoxGeometry(6, 4.5, 0.15);
      const wallMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Linen Wall', selectedColor),
        roughness: 0.95,
        bumpMap: linenBump,
        bumpScale: 0.04
      });
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(0, 1.2, -1);
      wall.receiveShadow = true;
      wall.name = 'Linen Wall';
      scene.add(wall);
      mountRef.current.paintableObjects.push(wall);

      // Floor
      const floorGeo = new THREE.BoxGeometry(6, 0.1, 4);
      const floorMat = new THREE.MeshStandardMaterial({
        color: '#FAF8F5',
        roughness: 0.35,
        bumpMap: woodBump,
        bumpScale: 0.01
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.set(0, -1.05, 1);
      floor.receiveShadow = true;
      scene.add(floor);

      // Skirting Board
      const skirtingGeo = new THREE.BoxGeometry(6, 0.25, 0.1);
      const skirtingMat = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.5 });
      const skirting = new THREE.Mesh(skirtingGeo, skirtingMat);
      skirting.position.set(0, -0.92, -0.9);
      skirting.castShadow = true;
      skirting.receiveShadow = true;
      scene.add(skirting);

      // Cozy Modern Armchair in front
      const chairGroup = new THREE.Group();
      chairGroup.position.set(0.8, -0.95, 0.8);

      const seatGeo = new THREE.BoxGeometry(1.4, 0.4, 1.3);
      const chairMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Armchair Upholstery', '#2D3748'),
        roughness: 0.9,
        bumpMap: linenBump,
        bumpScale: 0.015
      });
      const seat = new THREE.Mesh(seatGeo, chairMat);
      seat.position.y = 0.45;
      seat.castShadow = true;
      seat.name = 'Armchair Upholstery';
      chairGroup.add(seat);
      mountRef.current.paintableObjects.push(seat);

      const backGeo = new THREE.BoxGeometry(1.4, 1.1, 0.3);
      const back = new THREE.Mesh(backGeo, chairMat);
      back.position.set(0, 0.95, -0.5);
      back.castShadow = true;
      back.name = 'Armchair Upholstery';
      chairGroup.add(back);
      mountRef.current.paintableObjects.push(back);

      const armLeftGeo = new THREE.BoxGeometry(0.3, 0.7, 1.1);
      const armLeft = new THREE.Mesh(armLeftGeo, chairMat);
      armLeft.position.set(-0.75, 0.6, 0.1);
      armLeft.castShadow = true;
      armLeft.name = 'Armchair Upholstery';
      chairGroup.add(armLeft);
      mountRef.current.paintableObjects.push(armLeft);

      const armRightGeo = new THREE.BoxGeometry(0.3, 0.7, 1.1);
      const armRight = new THREE.Mesh(armRightGeo, chairMat);
      armRight.position.set(0.75, 0.6, 0.1);
      armRight.castShadow = true;
      armRight.name = 'Armchair Upholstery';
      chairGroup.add(armRight);
      mountRef.current.paintableObjects.push(armRight);

      // Wooden Legs
      const legGeo = new THREE.CylinderGeometry(0.04, 0.025, 0.4);
      const legMat = new THREE.MeshStandardMaterial({ color: '#5C4033', roughness: 0.6 });
      const legPositions = [
        [-0.6, 0.2, -0.45], [0.6, 0.2, -0.45],
        [-0.6, 0.2, 0.45], [0.6, 0.2, 0.45]
      ];
      legPositions.forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, y, z);
        leg.castShadow = true;
        chairGroup.add(leg);
      });

      scene.add(chairGroup);

      // Floor Vase and branch
      const vaseGroup = new THREE.Group();
      vaseGroup.position.set(-1.4, -1.0, 0.8);

      const vaseGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.8, 16);
      const vaseMat = new THREE.MeshStandardMaterial({ color: '#EBE4D8', roughness: 0.8 });
      const vase = new THREE.Mesh(vaseGeo, vaseMat);
      vase.position.y = 0.4;
      vase.castShadow = true;
      vaseGroup.add(vase);

      const stickGeo = new THREE.CylinderGeometry(0.01, 0.015, 1.4);
      const stickMat = new THREE.MeshStandardMaterial({ color: '#4A3B32', roughness: 0.9 });
      const stick = new THREE.Mesh(stickGeo, stickMat);
      stick.position.set(0.05, 1.2, -0.05);
      stick.rotation.set(0.25, 0.2, -0.15);
      stick.castShadow = true;
      vaseGroup.add(stick);
      scene.add(vaseGroup);

    } else if (space === 'Stucco Wall') {
      defaultActiveTarget = 'Stucco Wall';
      camera.position.set(0, 1.0, 4.2);
      controls.target.set(0, 0.6, 0);

      // Stucco Plaster Textured Wall - Paintable
      const wallGeo = new THREE.BoxGeometry(6, 4.5, 0.15);
      const wallMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Stucco Wall', selectedColor),
        roughness: 0.9,
        bumpMap: stuccoBump,
        bumpScale: 0.04
      });
      const wall = new THREE.Mesh(wallGeo, wallMat);
      wall.position.set(0, 1.2, -1);
      wall.receiveShadow = true;
      wall.name = 'Stucco Wall';
      scene.add(wall);
      mountRef.current.paintableObjects.push(wall);

      // Floor
      const floorGeo = new THREE.BoxGeometry(6, 0.1, 4);
      const floorMat = new THREE.MeshStandardMaterial({
        color: '#E5E7EB',
        roughness: 0.25
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.set(0, -1.05, 1);
      floor.receiveShadow = true;
      scene.add(floor);

      // Skirting Board
      const skirtingGeo = new THREE.BoxGeometry(6, 0.25, 0.1);
      const skirtingMat = new THREE.MeshStandardMaterial({ color: '#E5E7EB', roughness: 0.5 });
      const skirting = new THREE.Mesh(skirtingGeo, skirtingMat);
      skirting.position.set(0, -0.92, -0.9);
      scene.add(skirting);

      // Sleek Minimalist Floor Lamp (Casting side lighting)
      const lampGroup = new THREE.Group();
      lampGroup.position.set(-1.8, -1.0, 0.6);

      const baseGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.05);
      const baseMat = new THREE.MeshStandardMaterial({ color: '#111827', metalness: 0.8, roughness: 0.2 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.castShadow = true;
      lampGroup.add(base);

      const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.5);
      const pole = new THREE.Mesh(poleGeo, baseMat);
      pole.position.y = 1.25;
      pole.castShadow = true;
      lampGroup.add(pole);

      const shadeGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.35, 16);
      const shadeMat = new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.5 });
      const shade = new THREE.Mesh(shadeGeo, shadeMat);
      shade.position.y = 2.4;
      shade.castShadow = true;
      lampGroup.add(shade);

      // PointLight casting warm grazing light downward on the stucco wall texture
      const lampLight = new THREE.PointLight('#FFA733', 1.8, 6, 1.5);
      lampLight.position.set(0, 2.2, 0.1);
      lampLight.castShadow = true;
      lampGroup.add(lampLight);

      scene.add(lampGroup);

      // Small shelf with book on the wall - Paintable Decor
      const shelfGeo = new THREE.BoxGeometry(1.6, 0.06, 0.5);
      const shelfMat = new THREE.MeshStandardMaterial({
        color: getTargetColor('Decorative Shelf', '#8B5A2B'),
        roughness: 0.5,
        bumpMap: woodBump,
        bumpScale: 0.015
      });
      const shelf = new THREE.Mesh(shelfGeo, shelfMat);
      shelf.position.set(1.0, 1.4, -0.75);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      shelf.name = 'Decorative Shelf';
      scene.add(shelf);
      mountRef.current.paintableObjects.push(shelf);

      // Book
      const bookGeo = new THREE.BoxGeometry(0.4, 0.18, 0.35);
      const bookMat = new THREE.MeshStandardMaterial({ color: '#C2410C', roughness: 0.8 });
      const book = new THREE.Mesh(bookGeo, bookMat);
      book.position.set(1.0, 1.52, -0.75);
      book.rotation.y = 0.2;
      book.castShadow = true;
      scene.add(book);
    }

    // Update States
    setActiveTarget(defaultActiveTarget);
    activeTargetRef.current = defaultActiveTarget;
    if (onTargetChange) {
      onTargetChange(defaultActiveTarget, getTargetColor(defaultActiveTarget, selectedColor));
    }

  }, [space]);

  // 4. Update color of active target when selectedColor changes
  useEffect(() => {
    const { scene } = mountRef.current;
    if (!scene || !activeTarget) return;

    // Save to ref color record
    targetColorsRef.current[activeTarget] = selectedColor;

    // Apply immediately to matching 3D meshes in the scene
    scene.traverse((child) => {
      if (child.isMesh && child.name === activeTarget) {
        // Handle multi-material objects or simple StandardMaterial
        if (child.material) {
          child.material.color.set(selectedColor);
          child.material.needsUpdate = true;
        }
      }
    });

  }, [selectedColor, activeTarget]);

  // 5. Raycasting (Click to select surface) & Hover highlights
  const handlePointerMove = (event) => {
    const { scene, camera, paintableObjects } = mountRef.current;
    if (!scene || !camera || paintableObjects.length === 0) return;

    // Get client position relative to canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const intersects = raycaster.intersectObjects(paintableObjects, true);

    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      
      // If we hovered a new object
      if (mountRef.current.hoveredObject !== hitObj) {
        // Reset old hover object emissive state
        if (mountRef.current.hoveredObject && mountRef.current.hoveredObject.material) {
          mountRef.current.hoveredObject.material.emissive.setHex(0x000000);
        }
        
        // Highlight new hover object
        mountRef.current.hoveredObject = hitObj;
        if (hitObj.material && hitObj.name) {
          // Highlight with a subtle warm glow
          hitObj.material.emissive.setHex(0x161616);
        }
        canvasRef.current.style.cursor = 'pointer';
      }
    } else {
      // Clear hover state
      if (mountRef.current.hoveredObject && mountRef.current.hoveredObject.material) {
        mountRef.current.hoveredObject.material.emissive.setHex(0x000000);
      }
      mountRef.current.hoveredObject = null;
      canvasRef.current.style.cursor = 'default';
    }
  };

  const handlePointerDown = (event) => {
    const { scene, camera, paintableObjects } = mountRef.current;
    if (!scene || !camera || paintableObjects.length === 0) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const intersects = raycaster.intersectObjects(paintableObjects, true);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object;
      const targetName = clickedMesh.name;

      if (targetName) {
        setActiveTarget(targetName);
        activeTargetRef.current = targetName;
        
        const currentColor = clickedMesh.material.color.getHexString();
        if (onTargetChange) {
          onTargetChange(targetName, `#${currentColor.toUpperCase()}`);
        }
      }
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />

      {/* Floating HUD controls indicators */}
      <div 
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-sm, 6px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none',
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <span style={{ fontSize: '10px', color: 'var(--color-gold, #BF8C4C)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
          3D Coating Visualizer
        </span>
        <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 600 }}>
          Target: <strong style={{ color: '#63B3ED' }}>{activeTarget || 'None'}</strong>
        </span>
        <span style={{ fontSize: '9px', color: '#CBD5E1', marginTop: '2px' }}>
          🖱️ Drag to orbit | 📜 Scroll to zoom
        </span>
        <span style={{ fontSize: '9px', color: '#94A3B8' }}>
          👉 Click on any 3D object to paint it!
        </span>
      </div>

    </div>
  );
}
