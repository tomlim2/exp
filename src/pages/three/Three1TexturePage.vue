<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default defineComponent({
  setup() {
    const state = reactive({});

    onMounted(() => {
      const canvas = document.querySelector(
        "#render-journey-texture"
      ) as HTMLElement;

      // Scene
      const scene = new THREE.Scene();

      /**
       *  Texture
       */
      const loadingManager = new THREE.LoadingManager();
      loadingManager.onStart = () => {
        console.log("onStart");
      };
      loadingManager.onLoad = () => {
        console.log("onLoad");
      };
      loadingManager.onProgress = () => {
        console.log("onProgress");
      };
      loadingManager.onError = () => {
        console.log("onError");
      };

      const textureLoader = new THREE.TextureLoader(loadingManager);
      const colorTexture = textureLoader.load("/assets/texture/minecraft.png");
      // const colorTexture = textureLoader.load(
      //   "/assets/texture/door_texture/000.jpg"
      // );
      // const alphaTexture = textureLoader.load(
      //   "/assets/texture/door_texture/001.jpg"
      // );
      // const heightTexture = textureLoader.load(
      //   "/assets/texture/door_texture/002.jpg"
      // );
      // const normalTexture = textureLoader.load(
      //   "/assets/texture/door_texture/003.jpg"
      // );
      // const ambientOcclusionTexture = textureLoader.load(
      //   "/assets/texture/door_texture/004.jpg"
      // );
      // const metalnessTexture = textureLoader.load(
      //   "/assets/texture/door_texture/005.jpg"
      // );
      // const roughnessTexture = textureLoader.load(
      //   "/assets/texture/door_texture/006.jpg"
      // );
      // colorTexture.repeat.x = 2;
      // colorTexture.repeat.y = 3;
      // colorTexture.wrapS = THREE.RepeatWrapping;
      // colorTexture.wrapT = THREE.MirroredRepeatWrapping;

      // colorTexture.rotation = Math.PI / 4;
      // colorTexture.center.x = 0.5;
      // colorTexture.center.y = 0.5;


      colorTexture.generateMipmaps = false;
      colorTexture.minFilter = THREE.NearestFilter
      colorTexture.magFilter = THREE.NearestFilter

      /**
       * Object
       */
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: colorTexture });
      const mesh = new THREE.Mesh(geometry, material);

      scene.add(mesh);

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
      camera.position.x = 1;
      camera.position.y = 1;
      camera.position.z = 1;
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

