<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { BufferAttribute } from "three";

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
       * Texture
       */

      const textureLoader = new THREE.TextureLoader();
      const particlesTexture = textureLoader.load(
        "/assets/texture/particles/2.png"
      );

      /**
       * Particle
       */
      //Geometry
      // const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 100;

      //xyz
      const positions = new Float32Array(count * 3);

      //rgb
      const colors = new Float32Array(count * 3);

      for (let index = 0; index < count * 3; index++) {
        positions[index] = (Math.random() - 0.5) * 10;
        colors[index] = Math.random();
      }

      particlesGeometry.setAttribute(
        "position",
        new BufferAttribute(positions, 3)
      );

      particlesGeometry.setAttribute(
        "color",
        new BufferAttribute(colors, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        sizeAttenuation: true,
      });

      // particlesMaterial.color = new THREE.Color("#ffcc99");
      particlesMaterial.map = particlesTexture;
      particlesMaterial.transparent = true;
      particlesMaterial.alphaMap = particlesTexture;
      // particlesMaterial.alphaTest = .001
      // particlesMaterial.depthTest = false
      particlesMaterial.depthWrite = false;
      particlesMaterial.blending = THREE.AdditiveBlending;
      particlesMaterial.vertexColors = true;

      //Cube
      // const cube = new THREE.Mesh(
      //   new THREE.BoxBufferGeometry(),
      //   new THREE.MeshBasicMaterial()
      // );

      // scene.add(cube);

      //Points
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
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
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // particles.rotation.y = - elapsedTime * .01
        for (let index = 0; index < count; index++) {
          const i3 = index*3

          const x = particlesGeometry.attributes.position.array[i3]
          //@ts-ignore
          particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
          
        }

        particlesGeometry.attributes.position.needsUpdate = true

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

