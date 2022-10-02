<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
    <div class="loading-bar"></div>
    <div class="point point-0">
      <div class="label">1</div>
      <div class="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit</div>
    </div>
    <div class="point point-1">
        <div class="label">2</div>
        <div class="text">Ventilation with air purifier and detection of environment toxicity.</div>
    </div>
    <div class="point point-2">
        <div class="label">3</div>
        <div class="text">Cameras supporting night vision and heat vision with automatic adjustment.</div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import * as dat from "lil-gui";

export default defineComponent({
  setup() {
    const state = reactive({});

    onMounted(() => {
      const raycaster = new THREE.Raycaster();
      let sceneReady = false;
      const points = [
        {
            position: new THREE.Vector3(1.55, 0.3, - 0.6),
            element: document.querySelector('.point-0')
        },
        {
            position: new THREE.Vector3(0.5, 0.8, 1.6),
            element: document.querySelector('.point-1')
        },
        {
            position: new THREE.Vector3(1.6, - 1.3, - 0.7),
            element: document.querySelector('.point-2')
        }
      ]

      const debugObject = {
        envMapIntensity: 1
      }
      /**
       * Loaders
       */
      const loadingBarElement = document.querySelector(".loading-bar") as HTMLElement;
      const loadingManager = new THREE.LoadingManager(
        // Loaded
        () => {
          // Wait a little
          window.setTimeout(() => {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, {
              duration: 3,
              value: 0,
              delay: 1,
            });

            // Update loadingBarElement
            loadingBarElement.classList.add("ended");
            loadingBarElement.style.transform = "";
          }, 500);

          window.setTimeout(() =>
          {
              sceneReady = true
          }, 2000)
        },

        // Progress
        (itemUrl, itemsLoaded, itemsTotal) => {
          // Calculate the progress and update the loadingBarElement
          const progressRatio = itemsLoaded / itemsTotal;
          loadingBarElement.style.transform = `scaleX(${progressRatio})`;
        }
      );

      const gltfLoader = new GLTFLoader(loadingManager)
      const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
      console.log(cubeTextureLoader);
      

      const canvas = document.querySelector(
        "#render-journey-texture"
      ) as HTMLElement;
      const gui = new dat.GUI({ width: 400 });
      console.log(gui);

      // Scene
      const scene = new THREE.Scene();

      /**
       * Overlay
      */
      const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
      const overlayMaterial = new THREE.ShaderMaterial({
          // wireframe: true,
          transparent: true,
          uniforms:
          {
              uAlpha: { value: 1 }
          },
          vertexShader: `
              void main()
              {
                  gl_Position = vec4(position, 1.0);
              }
          `,
          fragmentShader: `
              uniform float uAlpha;

              void main()
              {
                  gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
              }
          `
      })
      const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
      scene.add(overlay)

      /**
       * Update all materials
       */
      const updateAllMaterials = () =>
      {
          scene.traverse((child) =>
          {
              if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
              {
                  // child.material.envMap = environmentMap
                  child.material.envMapIntensity = debugObject.envMapIntensity
                  child.material.needsUpdate = true
                  child.castShadow = true
                  child.receiveShadow = true
              }
          })
      }

      /**
       * Environment map
       */
      const environmentMap = cubeTextureLoader.load([
        "/assets/texture/environmentMaps/0/px.jpg",
        "/assets/texture/environmentMaps/0/nx.jpg",
        "/assets/texture/environmentMaps/0/py.jpg",
        "/assets/texture/environmentMaps/0/ny.jpg",
        "/assets/texture/environmentMaps/0/pz.jpg",
        "/assets/texture/environmentMaps/0/nz.jpg",
      ]);

      environmentMap.encoding = THREE.sRGBEncoding;

      scene.background = environmentMap;
      scene.environment = environmentMap;

      /**
       * Models
       */
      gltfLoader.load(
          '/assets/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
          (gltf) =>
          {
              gltf.scene.scale.set(2.5, 2.5, 2.5)
              gltf.scene.rotation.y = Math.PI * 0.5
              scene.add(gltf.scene)

              updateAllMaterials()
          }
      )

      /**
       * Lights
       */
      // const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
      // directionalLight.castShadow = true
      // directionalLight.shadow.camera.far = 15
      // directionalLight.shadow.mapSize.set(1024, 1024)
      // directionalLight.shadow.normalBias = 0.05
      // directionalLight.position.set(0.25, 3, - 2.25)
      // scene.add(directionalLight)

      /**
       * Resize
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.set(4, 1, -4);
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      canvas.appendChild(renderer.domElement);
      // renderer.physicallyCorrectLights = true
      // renderer.outputEncoding = THREE.sRGBEncoding
      // renderer.toneMapping = THREE.ReinhardToneMapping
      // renderer.toneMappingExposure = 3
      // renderer.shadowMap.enabled = true
      // renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      /**
       * Animate
       */
      // const clock = new THREE.Clock();

      const tick = () => {
        // const elapsedTime = clock.getElapsedTime();

        // Update controls
        controls.update();

        if(sceneReady){
          for(const point of points)
            {
                const screenPosition = point.position.clone();
                screenPosition.project(camera);
  
                raycaster.setFromCamera(screenPosition, camera);
                const intersects = raycaster.intersectObjects(scene.children, true);
  
                if(intersects.length === 0)
                {
                    (point.element as HTMLElement).classList.add('visible')
                }
                else
                {
                    const intersectionDistance = intersects[0].distance;
                    const pointDistance = point.position.distanceTo(camera.position);
                    (point.element as HTMLElement).classList.remove('visible');
  
                    if(intersectionDistance < pointDistance)
                    {
                        (point.element as HTMLElement).classList.remove('visible')
                    }
                    else
                    {
                        (point.element as HTMLElement).classList.add('visible')
                    }
                }
  
                const translateX = screenPosition.x * sizes.width * 0.5;
                const translateY = - screenPosition.y * sizes.height * 0.5;
                (point.element as HTMLElement).style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
            }
        }


        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();
    });

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.three-journey-texture {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $black-200;
  z-index: 20;
}

.point
{
    position: absolute;
    top: 50%;
    left: 50%;
}

.point .label
{
    position: absolute;
    top: -20px;
    left: -20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    line-height: 40px;
    font-weight: 100;
    font-size: 14px;
    cursor: help;
    transform: scale(0, 0);
    transition: transform 0.3s;
}

.point.visible .label
{
    transform: scale(1, 1);
}

.point .text
{
    position: absolute;
    top: 30px;
    left: -120px;
    width: 200px;
    padding: 20px;
    border-radius: 4px;
    background: #00000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    line-height: 1.3em;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 100;
    font-size: 14px;
    transition: opacity 0.3s;
    opacity: 0;
    pointer-events: none;
}
.point:hover .text
{
    opacity: 1;
}
</style>

