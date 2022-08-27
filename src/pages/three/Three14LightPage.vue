<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import * as dat from "lil-gui";

export default defineComponent({
  setup() {
    const state = reactive({ roughness: 0.5, metalness: 0.65 });

    onMounted(() => {
      const gui = new dat.GUI();
      const canvas = document.querySelector(
        "#render-journey-texture"
      ) as HTMLElement;

      // Scene
      const scene = new THREE.Scene();

      /*
       *Light
       */

      const ambientLight = new THREE.AmbientLight(0xffffff, 0);
      const directionalLight = new THREE.DirectionalLight(0x00fffc, 0);
      const hemisphereLight = new THREE.HemisphereLight(0xff0000,0x0000ff, 0);
      const pointLight = new THREE.PointLight(0xffffff, 0);
      const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)

      gui.add(ambientLight, "intensity").min(0).max(1).step(0.01);
      gui.add(directionalLight, "intensity").min(0).max(1).step(0.01);
      gui.add(hemisphereLight, "intensity").min(0).max(1).step(0.01);
      gui.add(pointLight, "intensity").min(0).max(1).step(0.01);
      gui.add(rectAreaLight, "intensity").min(0).max(1).step(0.01);

      pointLight.distance = 3
      pointLight.position.x = 2;
      pointLight.position.y = 3;
      pointLight.position.z = 4;


      scene.add(pointLight, ambientLight, hemisphereLight, directionalLight, rectAreaLight);

      /**
       * material
       */
      const material = new THREE.MeshStandardMaterial();

      /**
       * Object
       */

      const sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.5, 16, 16),
        material
      );

      sphere.position.x = -1.5;

      const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1, 100, 100),
        material
      );

      plane.geometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
      );

      const tours = new THREE.Mesh(
        new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
        material
      );
      tours.geometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(tours.geometry.attributes.uv.array, 2)
      );

      tours.position.x = 1.5;

      scene.add(sphere, plane, tours);

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
      camera.position.x = 0;
      camera.position.y = 0;
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
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        //update objects
        sphere.rotation.y = 0.1 * elapsedTime;
        plane.rotation.y = 0.1 * elapsedTime;
        tours.rotation.y = 0.1 * elapsedTime;

        sphere.rotation.x = 0.15 * elapsedTime;
        plane.rotation.x = 0.15 * elapsedTime;
        tours.rotation.x = 0.15 * elapsedTime;

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();
    });

    onUnmounted(() => {});

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

