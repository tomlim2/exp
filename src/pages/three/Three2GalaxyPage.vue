<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

export default defineComponent({
  setup() {
    const state = reactive({});

    onMounted(() => {
      const canvas = document.querySelector(
        "#render-journey-texture"
      ) as HTMLElement;
      const gui = new dat.GUI({ width: 400 });

      // Scene
      const scene = new THREE.Scene();

      /**
       * Object
       */

      const parameters: any = {
        count: 10000,
        size: 0.02,
        radius: 5,
        branches: 3,
        spin: 1,
        randomness: 0.2,
        randomnessPower: 3,
        insideColor: "#ff6030",
        outsideColor: "#1b3984",
      };

      let geometry: any = null;
      let material: any = null;
      let points: any = null;

      const generateGalaxy = () => {
        if (points !== null) {
          geometry.dispose();
          material.dispose();
          scene.remove(points);
        }

        /**
         * Geometry
         */
        geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor)
        const colorOutside = new THREE.Color(parameters.outsideColor)
        

        colorInside.lerp(colorOutside, 0.5)

        for (let index = 0; index < parameters.count; index++) {
          const index3 = index * 3;

          //position
          const radius = Math.random() * parameters.radius;
          const spinAngle = radius * parameters.spin;
          const branchAngle =
            ((index % parameters.branches) / parameters.branches) * Math.PI * 2;

          const randomX =
            Math.pow(Math.random(), parameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1);
          const randomY =
            Math.pow(Math.random(), parameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1);
          const randomZ =
            Math.pow(Math.random(), parameters.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1);

          positions[index3] =
            Math.cos(branchAngle + spinAngle) * radius + randomX;
          positions[index3 + 1] = randomY;
          positions[index3 + 2] =
            Math.sin(branchAngle + spinAngle) * radius + randomZ;

          //colors
          const mixedColor = colorInside.clone()

          mixedColor.lerp(colorOutside, radius / parameters.radius)

          colors[index3] = mixedColor.r;
          colors[index3 + 1] = mixedColor.g;
          colors[index3 + 2] = mixedColor.b;
        }

        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );

        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        /**
         * Material
         */

        material = new THREE.PointsMaterial({
          size: parameters.size,
          sizeAttenuation: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
        });

        /**
         * Points
         */

        points = new THREE.Points(geometry, material);
        scene.add(points);
      };

      generateGalaxy();

      gui
        .add(parameters, "count")
        .min(100)
        .max(100000)
        .step(100)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "size")
        .min(0.001)
        .max(0.1)
        .step(0.001)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "radius")
        .min(0)
        .max(100)
        .step(1)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "branches")
        .min(2)
        .max(20)
        .step(1)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "spin")
        .min(-5)
        .max(5)
        .step(0.001)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "randomness")
        .min(0)
        .max(2)
        .step(0.001)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "randomnessPower")
        .min(1)
        .max(10)
        .step(0.001)
        .onFinishChange(generateGalaxy);
      gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
      gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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
      camera.position.z = 3;
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

