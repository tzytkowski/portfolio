import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  87,
  window.innerWidth / window.innerHeight,
  0.1,
  15000
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(-20, 7, -45); // Set the initial position of the camera
camera.lookAt(scene.position); // Set the initial target of the camera


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
//controls.screenSpacePanning = true;
controls.enableZoom = true;
controls.rotateSpeed = 0.44;
//controls.minDistance = 100;
//controls.maxDistance = 500;
/*
controls.zoomSpeed = 5.5;
controls.enablePan = true;
*/

//CAMERA HELPER
//const helper = new THREE.CameraHelper( camera );
//scene.add( helper );

//STAGE

//LOD
/*
//LIGHT
var light = new THREE.SpotLight(0xFFFFFF, 22, 0, Math.PI / 4, 1); // Adjust the intensity (second parameter) to make it brighter
light.position.set(5, 0, -5);
scene.add(light);
*/


//LIGHT HELPER
//const lightHelper = new THREE.DirectionalLightHelper( light, 5 );
//scene.add( lightHelper );



/*
const secondLightHelper = new THREE.DirectionalLightHelper(secondlight, 3);
scene.add(secondLightHelper);
*/
/*
//BACKGROUND
var textureLoader = new THREE.TextureLoader();
var backgroundTexture = textureLoader.load('klopp.jpg');
var backgroundPlaneGeometry = new THREE.PlaneGeometry(2, 2, 0);
var backgroundPlaneMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
var backgroundPlane = new THREE.Mesh(backgroundPlaneGeometry, backgroundPlaneMaterial);

// Set the position of the background plane so that it's behind all other objects
backgroundPlane.position.z = -1;
scene.add(backgroundPlane);
*/

//TEXTURE
const planetTexture = new THREE.TextureLoader().load('planetTextures/roughtexture.jpg');
planetTexture.minFilter = THREE.LinearFilter;
//SECOND TEXTURE WHICH IS TECHNICALLY A BUMP 
const planetTextureTwo = new THREE.TextureLoader().load('planetTextures/bumpity.jpg');
planetTexture.minFilter = THREE.LinearFilter;
//BUMP
const planetBump = new THREE.TextureLoader().load('planetTextures/planetbump.jpg');

//SUN
var sunGeometry = new THREE.TorusGeometry(0.213, 10, 30, 149, 6.283185);
var sunSkin = new THREE.TextureLoader().load("planetImages/sun.png");
sunSkin.minFilter = THREE.LinearFilter;
var sunTexture = new THREE.TextureLoader().load("planetImages/sunny.jpg");
sunSkin.minFilter = THREE.LinearFilter;
var sunMaterial = new THREE.MeshStandardMaterial({ 
  map: sunSkin, 
  normalMap: planetTextureTwo,
  bumpMap: planetTextureTwo,
  emissiveMap: sunTexture, // Use the same texture for emissive to make the sun glow
  emissive: 0xffffff, // Emissive color (white)
  emissiveIntensity: 4.5, // Increase the intensity
  roughness: 1,
  metalness: 1,
  antialias: true
 });
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(145, -80, -5);
scene.add(sun);
//STAR
var starGeometry = new THREE.TetrahedronGeometry(2.2, 1);
//var starTexture = new THREE.TextureLoader().load("sun.jpg");
var starMaterial = new THREE.MeshStandardMaterial({ 
  //map: starTexture,
  bumpMap: planetTexture, 
  roughness: 1,
  metalness: 0.0,
  antialias: true,
  emissive: new THREE.Color(0, 0, 0),
  emissiveIntensity: 0.0
 });
 // Create an array to store the stars
 const stars = [];
 const stars2 = [];

 // create stars and add them to the scene
 for (let i = 0; i < 20000; i++) {
   // create a star mesh
   const star = new THREE.Mesh(starGeometry, starMaterial);
 
   // set the position of the star to a random point within a cube centered at the origin
   star.position.x = THREE.MathUtils.randFloatSpread(7000);
   star.position.y = THREE.MathUtils.randFloatSpread(7000);
   star.position.z = THREE.MathUtils.randFloatSpread(7000);
   
   // add the star mesh to the scene
   star.material.color.set('0x9DEE06');
   scene.add(star);
 
   // Add the star to the stars array
   stars.push(star);
   star.receiveShadow = true;
 }

//PARALLAX

for (let i = 0; i < 8000; i++) {
  const star2 = new THREE.Mesh(starGeometry, starMaterial);
  star2.position.x = THREE.MathUtils.randFloatSpread(5000);
  star2.position.y = THREE.MathUtils.randFloatSpread(5000);
  star2.position.z = THREE.MathUtils.randFloatSpread(5000);
  star2.material.color.set('0x9DEE06');
  scene.add(star2);
  star2.receiveShadow = true;
  stars2.push(star2);
}
//SECOND LIGHT`
const secondlight = new THREE.DirectionalLight(0xffffff, 1.7);
secondlight.position.set(115, -80, -5);
scene.add(secondlight);
secondlight.castShadow = true; // default false
secondlight.shadow.mapSize.width = 50012; // default
secondlight.shadow.mapSize.height = 5012; // default
secondlight.shadow.camera.near = 0.5; // default
secondlight.shadow.camera.far = 50000; // default

//MERCURY
var mercuryGeometry = new THREE.TetrahedronGeometry(1, 5);
var mercuryTexture = new THREE.TextureLoader().load("planetImages/mercury.jpg");
mercuryTexture.minFilter = THREE.LinearFilter;
var mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
  normalMap: planetTexture,
  bumpMap: planetTexture,
  antialias: true,
  roughness: 0.5,
  metalness: 0.25
  
});
var mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(55, -33, -5); // Corrected the variable name to 'mercury'
scene.add(mercury);

//VENUS
var venusGeometry = new THREE.SphereGeometry(1.022, 64, 20, 0, 6.28, 0, 3.42);
var venusTexture = new THREE.TextureLoader().load("planetImages/venus.jpg");
venusTexture.minFilter = THREE.LinearFilter
var venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
  normalMap: planetTexture,
  roughness: 0.5,
  metalness: 0.25,
  antialias: true
});
var venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(45, -26, -5);
scene.add(venus);

//EARTH
var planet = new THREE.SphereGeometry(1.522, 64, 20, 0, 6.28, 0, 3.42);
var earthSkin = new THREE.TextureLoader().load("planetImages/earth.jpg");
earthSkin.minFilter = THREE.LinearFilter;
var earthTexture = new THREE.TextureLoader().load('planetTextures/earthtexture.jpg');
earthTexture.minFilter = THREE.LinearFilter;
var planetMaterial = new THREE.MeshStandardMaterial({
  map: earthSkin,
  normalMap: earthTexture,
  bumpMap: earthTexture,
  roughness: 0.4,
  metalness: 0.1,
  antialias: true
});
var earth = new THREE.Mesh(planet, planetMaterial);
earth.position.set(30,-14, -5);
scene.add(earth);

//MOON
const moonShape = new THREE.SphereGeometry(0.522, 64, 20, 0, 6.28, 0, 3.42);
const moonSkin = new THREE.TextureLoader().load("planetImages/moon.jpg");
const moonTexture = new THREE.TextureLoader().load('planetTextures/moontexture.jpg');
const moonMaterial = new THREE.MeshStandardMaterial({ 
  map: moonSkin,
  normalMap: moonTexture,
  bumpMap: moonTexture,
  roughness: 0.4,
  metalness: 0.1,
  antialias: true
});
const moon = new THREE.Mesh(moonShape, moonMaterial);
scene.add(moon);
moon.position.set(30, -12, 10);

//MARS
var marsGeometry = new THREE.SphereGeometry(1.022, 64, 20, 0, 6.28, 0, 3.42);
var marsSkin = new THREE.TextureLoader().load("planetImages/mars.jpg");
var marsTexture = new THREE.TextureLoader().load("planetTextures/marstexture.jpg");

var marsMaterial = new THREE.MeshStandardMaterial({
  map: marsSkin,
  normalMap: marsTexture,
  antialias: true,
  roughness: 0.4,
  metalness: 0.1,
});
var mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.set(10, 1, -5);
scene.add(mars);

//JUPITER
var jupiterGeometry  = new THREE.SphereGeometry(2.022, 64, 20, 0, 6.28, 0, 3.42);
var jupiterTexture = new THREE.TextureLoader().load("planetImages/jupiter.jpg");
jupiterTexture.minFilter = THREE.LinearFilter;
var jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
  antialias: true,
  roughness: 0.4,
  metalness: 0.1,
});
var jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.set(0, 8, -5);
scene.add(jupiter);

//SATURN
var saturnGeometry  = new THREE.SphereGeometry(2.022, 64, 20, 0, 6.28, 0, 3.42);
var saturnTexture = new THREE.TextureLoader().load("planetImages/saturn.jpg");
saturnTexture.minFilter = THREE.LinearFilter;
var saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
  antialias: true,
  roughness: 0.4,
  metalness: 0.1,
});
var saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.set(-15, 20, -5);
scene.add(saturn);

//SATURN RING
var saturnRingGeometry = new THREE.TorusGeometry(7.293, 0.8712, 2, 100, 6.283185);
var saturnRingTexture = new THREE.TextureLoader().load("planetImages/sat.jpg");
saturnRingTexture.minFilter = THREE.LinearFilter;
var saturnRingMaterial = new THREE.MeshStandardMaterial({
  map: saturnRingTexture,
  normalMap: planetTexture,
  antialias: true,
  roughness: 0.4,
  metalness: 0.1,
});
var saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRing.position.set(-15, 20, -5);
scene.add(saturnRing);

//URANUS
var uranusGeometry  = new THREE.SphereGeometry(2.022, 64, 20, 0, 6.28, 0, 3.42);
var uranusTexture = new THREE.TextureLoader().load("planetImages/uranus.jpg");
uranusTexture.minFilter = THREE.LinearFilter;
var uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
  normalMap: moonTexture,
  bumpMap: moonTexture,
  antialias: true,
  roughness: 0.4,
  metalness: 0.1,
});
var uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.set(-45, 40, -5);
scene.add(uranus);

//NEPTUNE
var neptuneGeometry  = new THREE.SphereGeometry(2.022, 64, 20, 0, 6.28, 0, 3.42);
var neptuneTexture = new THREE.TextureLoader().load("planetImages/neptune.jpg");
neptuneTexture.minFilter = THREE.LinearFilter;
var neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
  normalMap: planetTextureTwo,
  bumpMap: planetTextureTwo,
  antialias: true,
  roughness: 0.5,
  metalness: 0.25,
});
var neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.set(-70, 55, -5);
scene.add(neptune);

/*
//SPACESHIP
const spaceshipGeometry = new THREE.TetrahedronGeometry(5.659, 1);
const spaceshipSkin = new THREE.TextureLoader().load("steel.jpg");
const spaceshipNormalTexture = new THREE.TextureLoader().load('steelnormaltexture.png');
const spaceshipDisplacement = new THREE.TextureLoader().load('steeldisplacement.png');
const spaceshipMaterial = new THREE.MeshStandardMaterial({ 
  map: spaceshipSkin,
  normalMap: spaceshipNormalTexture,
  displacementMap: spaceshipDisplacement,
  metalness: 0.3, 
  roughness: 0.2,
  antialias: true
});
const spaceship = new THREE.Mesh(spaceshipGeometry, spaceshipMaterial);
spaceship.position.set(0, 0, 0);
var spaceshipSpeed = 0.1;
scene.add(spaceship);

*/

var position = 0;


// Function to update the positions of stars and loop them
function updateStarsPosition() {
  // Set the movement speed of the stars in the x-axis
  const speed = 0.1;

  // Loop through the stars array and update their positions
  stars.forEach(star => {
    // Move the stars in the x-axis based on the speed
    star.position.x += speed;

    // Check if the star has reached the end of its travel distance
    if (star.position.x >= 4000) {
      // Reset the position of the star to the starting point
      star.position.x = -4000;
    }
  });
}
function updateStars2Position() {
  // Set the movement speed of the stars in the x-axis
  const speed2 = 0.22;

  // Loop through the stars array and update their positions
  stars2.forEach(star2 => {
    // Move the stars in the x-axis based on the speed
    star2.position.x += speed2;

    // Check if the star has reached the end of its travel distance
    if (star2.position.x >= 8000) {
      // Reset the position of the star to the starting point
      star2.position.x = -8000;
    }
  });
}


function animate() {
  //SUN
  
  sun.rotation.x += 118.0001;
  sun.rotation.y = 118.0001;
  sun.rotation.z = 118.0001;
 
  /*
  //STARS
  star.rotation.x += 0.003;
  star.rotation.y += 0.001;
  star.rotation.z += 0.002;
  */

  //MERCURY

  mercury.rotation.x = 0.00;
  mercury.rotation.y += 0.010;
  mercury.rotation.z += 0.00;

  //VENUS
  venus.rotation.y += 0.01;

  //EARTH
  earth.rotation.y += 0.002;
  mercury.rotation.z += 0.03;

  //MOON
  moon.rotation.y += -0.01;

  //MARS
  mars.rotation.y += 0.01;

  //JUPITER
  jupiter.rotation.x += 0.00;
  jupiter.rotation.y += 0.01;

  //SATURN
  saturnRing.rotation.x = 1.1;
  saturnRing.rotation.z += 0.0080;

  //URANUS
  uranus.rotation.x = 0.00;
  uranus.rotation.y += 0.01;

  //NEPTUNE
  neptune.rotation.x = 0.00;
  neptune.rotation.y += 0.005;

  /*
  //SPACESHIP
  position.x += speed;
  position.y += speed;
  position.z += speed;
*/
updateStarsPosition();
updateStars2Position();




  // check if the object has reached the edge of the screen
  if (
    position.x > window.innerWidth / 2 ||
    position.x < -window.innerWidth / 2
  ) {
    speed = -speed; // reverse direction
  }
  if (
    position.y > window.innerHeight / 2 ||
    position.y < -window.innerHeight / 2
  ) {
    speed = -speed; // reverse direction
  }
  /*
  spaceship.rotation.x += 0.03;
  spaceship.rotation.y += 0.01;
  spaceship.rotation.z += 0.02;
  */
  controls.update();

  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  
}



animate();

