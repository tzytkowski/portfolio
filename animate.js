import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  240,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//CAMERA
camera.position.set(-14, 10, 15);
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 5.5;
controls.enablePan = true;

//CAMERA HELPER
const helper = new THREE.CameraHelper( camera );
scene.add( helper );

//STAGE
const stage = new THREE.TorusKnotGeometry(5.522, 64, 20, 0, 6.28, 0, 3.42);
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
const stageMaterial = new THREE.MeshBasicMaterial({ map: spaceTexture });
const finalStage = new THREE.Mesh(stage, stageMaterial);
scene.add(finalStage);
scene.background = spaceTexture;

//LIGHT
var angle = 0;
var light = new THREE.DirectionalLight(0xFFFFFF, 2.2, 80, 1);
light.position.set(9, -5, 2);
scene.add(light);

//LIGHT HELPER
const lightHelper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( lightHelper );

var secondlight = new THREE.DirectionalLight(0xffffff, 3.2, 20, 1);
secondlight.position.set(-112, 0, -29);
scene.add(secondlight);


//TEXTURE
const planetTexture = new THREE.TextureLoader().load('roughtexture.jpg');
//SECOND TEXTURE WHICH IS TECHNICALLY A BUMP 
const planetTextureTwo = new THREE.TextureLoader().load('bumpity.jpg');
//BUMP
const planetBump = new THREE.TextureLoader().load('planetbump.jpg');

//SUN
var sunGeometry = new THREE.TetrahedronGeometry(10.659, 3);
var sunSkin = new THREE.TextureLoader().load("sun.png");
var sunTexture = new THREE.TextureLoader().load("sunny.jpg");
var sunMaterial = new THREE.MeshStandardMaterial({ 
  map: sunSkin, 
  normalMap: planetTextureTwo,
  bumpMap: planetTextureTwo,
  displacementMap: sunTexture,
  roughness: 0.7,
  metalness: 8,
  antialias: true

 });
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(145, -122, -5);
scene.add(sun);

//STAR
var starGeometry = new THREE.TetrahedronGeometry(2.2, 1);
//var starTexture = new THREE.TextureLoader().load("sun.jpg");
var starMaterial = new THREE.MeshStandardMaterial({ 
  //map: starTexture,
  bumpMap: planetTexture, 
  metalness: 0.9, 
  roughness: 0.5, 
  metalness: 0.8,
  antialias: true
  
 });


// create 1000 stars and add them to the scene
var star = new THREE.Mesh(starGeometry, starMaterial);
for (let i = 0; i < 20000; i++) {
  // create a star mesh
  const star = new THREE.Mesh(starGeometry, starMaterial);

  // set the position of the star to a random point within a cube centered at the origin
  star.position.x = THREE.MathUtils.randFloatSpread(8000);
  star.position.y = THREE.MathUtils.randFloatSpread(8000);
  star.position.z = THREE.MathUtils.randFloatSpread(8000);
  
  // add the star mesh to the scene
  star.material.color.set('0x9DEE06');
  scene.add(star);
}

//MERCURY
var mercuryGeometry = new THREE.TetrahedronGeometry(1, 5);
var mercuryTexture = new THREE.TextureLoader().load("mercury.jpg");
var mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
  normalMap: planetTexture,
  bumpMap: planetTexture,
  antialias: true,
  roughness: 0.9,
  metalness: 0.9
  
});
var mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

mercury.position.set(-5, 3, -5); // Corrected the variable name to 'mercury'
scene.add(mercury);

//VENUS
var venusGeometry = new THREE.SphereGeometry(1.022, 64, 20, 0, 6.28, 0, 3.42);
var venusTexture = new THREE.TextureLoader().load("venus.jpg");
var venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
  normalMap: planetTexture,
  roughness: 0.9,
  metalness: 0.9,
  antialias: true

});
var venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(-10, 6, -5);
scene.add(venus);

//EARTH
var planet = new THREE.SphereGeometry(1.522, 64, 20, 0, 6.28, 0, 3.42);
var earthSkin = new THREE.TextureLoader().load("earth.jpg");
var earthTexture = new THREE.TextureLoader().load('earthtexture.jpg');
var planetMaterial = new THREE.MeshStandardMaterial({
  map: earthSkin,
  normalMap: earthTexture,
  bumpMap: earthTexture,
  roughness: 0.0,
  metalness: 0.3,
  antialias: true
});
var earth = new THREE.Mesh(planet, planetMaterial);
earth.position.set(-14, 10, -5);
scene.add(earth);

//MOON
const moonShape = new THREE.SphereGeometry(0.522, 64, 20, 0, 6.28, 0, 3.42);
const moonSkin = new THREE.TextureLoader().load("moon.jpg");
const moonTexture = new THREE.TextureLoader().load('moontexture.jpg');
const moonMaterial = new THREE.MeshStandardMaterial({ 
  map: moonSkin,
  normalMap: moonTexture,
  bumpMap: moonTexture,
  roughness: 0.9,
  metalness: 0.3,
  antialias: true
});
const moon = new THREE.Mesh(moonShape, moonMaterial);
scene.add(moon);
moon.position.set(-11, 12, -5);

//MARS
var marsGeometry = new THREE.SphereGeometry(1.022, 64, 20, 0, 6.28, 0, 3.42);
var marsSkin = new THREE.TextureLoader().load("mars.jpg");
var marsTexture = new THREE.TextureLoader().load("marstexture.jpg");

var marsMaterial = new THREE.MeshStandardMaterial({
  map: marsSkin,
  normalMap: marsTexture,
  antialias: true
});
var mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.set(-18, 12, -5);
scene.add(mars);

//JUPITER
var jupiterGeometry  = new THREE.SphereGeometry(2.022, 64, 20, 0, 6.28, 0, 3.42);
var jupiterTexture = new THREE.TextureLoader().load("jupiter.jpg");
var jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
  antialias: true
});
var jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.set(-25, 18, -5);
scene.add(jupiter);

//SATURN
var saturnGeometry  = new THREE.SphereGeometry(2.022, 64, 20, 0, 6.28, 0, 3.42);
var saturnTexture = new THREE.TextureLoader().load("saturn.jpg");
var saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
  antialias: true
});
var saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.set(-35, 25, -5);
scene.add(saturn);

//SATURN RING
var saturnRingGeometry = new THREE.TorusGeometry(4.728, 2.3364, 2, 101, 6.283);
var saturnRingTexture = new THREE.TextureLoader().load("sat.jpg");
var saturnRingMaterial = new THREE.MeshStandardMaterial({
  map: saturnRingTexture,
  normalMap: planetTexture,
  antialias: true
});
var saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRing.position.set(-35, 25, -5);
scene.add(saturnRing);

//URANUS
var uranusGeometry  = new THREE.SphereGeometry(2.022, 64, 20, 0, 6.28, 0, 3.42);
var uranusTexture = new THREE.TextureLoader().load("uranus.jpg");
var uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
  normalMap: moonTexture,
  bumpMap: moonTexture,
  antialias: true
});
var uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.set(-45, 31, -5);
scene.add(uranus);

//NEPTUNE
var neptuneGeometry  = new THREE.SphereGeometry(2.022, 64, 20, 0, 6.28, 0, 3.42);
var neptuneTexture = new THREE.TextureLoader().load("neptune.jpg");
var neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
  normalMap: planetTextureTwo,
  bumpMap: planetTextureTwo,
  antialias: true
});
var neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.set(-50, 35, -5);
scene.add(neptune);

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
scene.add(spaceship);

var position = new THREE.Vector3(0, 0, 0);
var speed = 0.1;


function animate() {
  //SUN
  sun.rotation.x += 0.003;
  sun.rotation.y += 0.001;
  sun.rotation.z += 0.002;

  //STARS
  star.rotation.x += 0.003;
  star.rotation.y += 0.001;
  star.rotation.z += 0.002;

  //MERCURY
  mercury.rotation.x = -0.005;
  mercury.rotation.y += 0.003;
  mercury.rotation.z += 0.002;

  //VENUS
  venus.rotation.y += 0.01;

  //EARTH
  earth.rotation.y += 0.005;

  //MOON
  moon.rotation.y += -0.01;

  //MARS
  mars.rotation.y += 0.01;

  //JUPITER
  jupiter.rotation.x += 0.005;
  jupiter.rotation.y += 0.01;

  //SATURN
  saturnRing.rotation.x = 0.9;
  saturnRing.rotation.z += 0.050;

  //URANUS
  uranus.rotation.x = -0.005;
  uranus.rotation.y += 0.01;

  //NEPTUNE
  neptune.rotation.x = -0.005;
  neptune.rotation.y += 0.005;

  //SPACESHIP
  position.x += speed;
  position.y += speed;
  position.z += speed;

  // set the position of the object
  spaceship.position.set(position.x, position.y, position.z);
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
  spaceship.rotation.x += 0.03;
  spaceship.rotation.y += 0.01;
  spaceship.rotation.z += 0.02;


  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//RAYCASTING
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function onPointerMove( event ) {
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = ( event.clientY / window.innerHeight ) * 2 + 1;
}
function render() {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects( scene.children );
  for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}

window.addEventListener( 'pointermove', onPointerMove );

window.requestAnimationFrame(render);


animate();

const headerDisplay = document.querySelectorAll('h1');

earth.on('mouseover', function(display) {
  headerDisplay.InnerText("Earth");

})
