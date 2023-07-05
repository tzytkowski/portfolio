import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//CAMERA
camera.position.set(0, 0, 20);
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 0.5;
controls.enablePan = false;


//LIGHT
var light = new THREE.PointLight(0xffffff, 2.2, 80, 2);
light.position.set(9, -5, 9);
scene.add(light);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

/*
//STAGE
const bambooTexture = new THREE.TextureLoader().load("bamboo.jpg");
scene.background = bambooTexture;
*/

//BOWL
const bowlGeometry = new THREE.LatheGeometry(5, 0, 6.28);
const bowlTexture = new THREE.TextureLoader().load("porcelain.jpg");
const thingTexture = new THREE.TextureLoader().load("roughtexture.jpg");
const bowlMaterial = new THREE.MeshStandardMaterial({ normalMap: thingTexture });
const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
bowl.position.set(0, 0, 20);
scene.add(bowl);

function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  
  animate();