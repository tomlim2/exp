<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import galaxyV2 from "@/shaders/galaxyV2/index";
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
        count:200000,
        size:0.005,
        radius:5,
        branches:3,
        spin:1,
        randomness:0.5,
        randomnessPower:3,
        insideColor:'#ff6030',
        outsideColor:'#1b3984',
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
        const scales = new Float32Array(parameters.count * 1);
        const randomness = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor)
        const colorOutside = new THREE.Color(parameters.outsideColor)
        

        colorInside.lerp(colorOutside, 0.5)

        for (let i = 0; i < parameters.count; i++) {
          const i3 = i * 3;

          //position
          const radius = Math.random() * parameters.radius

          const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

          positions[i3    ] = Math.cos(branchAngle) * radius 
          positions[i3 + 1] = Math.cos(branchAngle*2) * radius 
          positions[i3 + 2] = Math.sin(branchAngle) * radius 

          // Randomness
          const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
          const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
          const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
          
          randomness[i3 + 0] = randomX;
          randomness[i3 + 1] = randomY;
          randomness[i3 + 2] = randomZ;

          //colors 
          const mixedColor = colorInside.clone()

          mixedColor.lerp(colorOutside, radius / parameters.radius)

          colors[i3    ] = mixedColor.r
          colors[i3 + 1] = mixedColor.g
          colors[i3 + 2] = mixedColor.b

          //scale

          scales[i] = Math.random()
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute("aRandomness", new THREE.BufferAttribute(randomness, 3));

        /**
         * Material
         */

        material = new THREE.ShaderMaterial({
          uniforms:{
            uSize:{ value: 1 * renderer.getPixelRatio() },
            uTime:{ value: 0 }
          },
          vertexShader:galaxyV2.vertexShader,
          fragmentShader:galaxyV2.fragmentShader,
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

      gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
      gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
      gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
      gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
      gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
      gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
      gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

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

      camera.position.x = 3;
      camera.position.y = 3;
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

      generateGalaxy();

      /**
       * Animate
       */
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update material
        material.uniforms.uTime.value = elapsedTime

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

