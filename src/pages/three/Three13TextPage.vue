<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default defineComponent({
  setup() {
    const state = reactive({});

    onMounted(() => {
      const canvas = document.querySelector(
        "#render-journey-texture"
      ) as HTMLElement;

      // Scene
      const scene = new THREE.Scene();

      // axes helper
      // const axesHelper = new THREE.AxesHelper();
      // scene.add(axesHelper);

      /**
       *  Texture
       */
      // const loadingManager = new THREE.LoadingManager();
      // loadingManager.onStart = () => {
      //   console.log("onStart");
      // };
      // loadingManager.onLoad = () => {
      //   console.log("onLoad");
      // };
      // loadingManager.onProgress = () => {
      //   console.log("onProgress");
      // };
      // loadingManager.onError = () => {
      //   console.log("onError");
      // };

      // const textureLoader = new THREE.TextureLoader(loadingManager);
      // const colorTexture = textureLoader.load("/assets/texture/minecraft.png");
      const textureLoader = new THREE.TextureLoader();

      /**
       *  Font
       */
      const fontLoader = new FontLoader();

      fontLoader.load(
        "/assets/fonts/helvetiker_regular.typeface.json",
        (font) => {
          const textGeometry = new TextGeometry("hi there", {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
          });

          // textGeometry.computeBoundingBox();

          // textGeometry.boundingBox &&
          //   textGeometry.translate(
          //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
          //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
          //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
          //   );

          textGeometry.center();

          const mtcapTexture = textureLoader.load(
            "/assets/texture/matcaps/7.png"
          );
          const textMaterial = new THREE.MeshMatcapMaterial();
          textMaterial.matcap = mtcapTexture;
          const text = new THREE.Mesh(textGeometry, textMaterial);
          scene.add(text);

          const donutMaterial = new THREE.MeshMatcapMaterial();

          for (let i = 0; i < 100; i++) {
            const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
            
            donutMaterial.matcap = mtcapTexture;
            const donut = new THREE.Mesh(donutGeometry, donutMaterial);

            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale, scale, scale);

            scene.add(donut);
          }
        }
      );

      /**
       * Resize
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

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
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );
      
      camera.position.z = 2;
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        antialias: false,
      });

      canvas.appendChild(renderer.domElement);
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * Animate
       */
      // const clock = new THREE.Clock();

      const tick = () => {
        // const elapsedTime = clock.getElapsedTime();

        // Update controls
        controls.update();

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
</style>

