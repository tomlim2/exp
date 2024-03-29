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
       * Lights
       */
      // Ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);

      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 6;
      // directionalLight.shadow.radius = 10;

      directionalLight.shadow.camera.top = 2;
      directionalLight.shadow.camera.right = 2;
      directionalLight.shadow.camera.bottom = -2;
      directionalLight.shadow.camera.left = -2;

      directionalLight.position.set(2, 2, -1);

      scene.add(directionalLight);

      const directionalLightCameraHelper = new THREE.CameraHelper(
        directionalLight.shadow.camera
      );
      directionalLightCameraHelper.visible = false;

      scene.add(directionalLightCameraHelper);

      /**
       * Texture
       */

      const loadingManager = new THREE.LoadingManager();
      const textureLoader = new THREE.TextureLoader(loadingManager);
      const shadowTexture = textureLoader.load(
        "/assets/texture/shadow/simpleShadow.jpg"
      );

      /**
       *  Material
       */

      const material = new THREE.MeshStandardMaterial();
      material.roughness = 0.1;

      /**
       * Object
       */

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        material
      );
      // sphere.castShadow = true;

      const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
      plane.receiveShadow = true;
      plane.rotation.x = -Math.PI * 0.5;
      plane.position.y = -0.5;

      scene.add(sphere, plane);

      const sphereShadow = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1.5, 1.5),
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: true,
          alphaMap: shadowTexture,
        })
      );

      sphereShadow.rotation.x = -Math.PI * 0.5;
      sphereShadow.position.y = -0.5 + 0.01;

      scene.add(sphereShadow);

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
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      canvas.appendChild(renderer.domElement);

      /**
       * Animate
       */
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update controls
        controls.update();

        // Animation
        sphere.position.x = Math.cos(elapsedTime) * 1.5;
        sphere.position.z = Math.sin(elapsedTime) * 1.5;
        sphere.position.y = Math.abs(Math.sin(elapsedTime* 3) )

        sphereShadow.position.x = sphere.position.x
        sphereShadow.position.z = sphere.position.z
        sphereShadow.material.opacity = (1-sphere.position.y) * .3

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

