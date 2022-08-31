let container;
let camera;
let render;
let scene;
let chameleon;

function init() {
  container = document.querySelector('.container');

  //Create scene
  scene = new THREE.Scene();

  let fov = responsiveFovChameleon();
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
  loader.load('3d/scene.gltf', function (gltf) {
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
const screnSize = innerHeight + innerWidth;
function handleSizeViewport() {
  camera.fov = responsiveFovChameleon();

  //responsive position chameleon
  //change orientation mobile
  let orientation =
    screen.msOrientation || screen.orientation || screen.mozOrientation || {};
  console.log(orientation.type);
  if (orientation.type === 'landscape-primary') {
    if (screnSize === innerHeight + innerWidth) {
      camera.position.set(-1.1, 0, 2);
    } else {
      if (innerWidth <= 590) {
        camera.position.set(0, 0, 2);
      } else if (innerWidth <= 1090) {
        camera.position.set(-1.1, 0, 2.5);
      } else {
        camera.position.set(-0.7, 0, 2);
      }
    }
    console.log(`landscape-primary
    ${screen.height} deitado`);
  } else {
    // "portrait-primary"

    if (screen.height > 1000) {
      camera.position.set(-1, 0, 3);
    } else {
      camera.position.set(0, 0, 2);
    }

    console.log(`portrait-primary
    ${screen.height} em pé`);
  }
}

function responsiveFovChameleon() {
  let cameraFov;
  if (innerWidth <= 590) {
    cameraFov = 90;
  } else if (innerWidth <= 700 && innerWidth > 590) {
    cameraFov = 80;
  } else if (innerWidth <= 940 && innerWidth > 700) {
    cameraFov = 70;
  } else if (innerWidth < 1297 && innerWidth > 940) {
    cameraFov = 60;
  } else {
    cameraFov = 50;
  }
  return cameraFov;
}

function onWindowResize() {
  handleSizeViewport();
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
window.onload = function () {
  Particles.init({
    selector: '.background',
    color: '#73b34d',
    maxParticles: 300,
    speed: 1,
    responsive: [
      {
        breakpoint: 768,
        options: {
          maxParticles: 125,
        },
      },
    ],
  });
  handleSizeViewport();
};
init();
