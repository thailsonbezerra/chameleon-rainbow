let container;
let camera;
let render;
let scene;
let chameleon;

function init() {
  container = document.querySelector('.container');

  //Create scene
  scene = new THREE.Scene();

  const fov = 50;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-0.7, 0, 2);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(10, 10, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load('../../../3d/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
    chameleon = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  chameleon.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
window.onload = function () {
  Particles.init({
    selector: '.background',
    color: '#73b34d',
    // connectParticles: true,
    maxParticles: 300,
    speed: 1,
  });
};
