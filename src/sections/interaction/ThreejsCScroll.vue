<template>
  <div id="outline-three-js-c" class="outline-three-js-c">
    <div id="render-three-c" class="render-three-c" />
    <section class="section">
      <h1>TEXT1</h1>
    </section>
    <section class="section">
      <h2>TEXT2</h2>
    </section>
    <section class="section">
      <h2>TEXT3</h2>
    </section>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";

import * as THREE from "three";
// import * as dat from "lil-gui";
import gsap from "gsap";

export default defineComponent({
  setup() {
    const state = reactive({});
    onMounted(() => {
      /**
       * Debug
       */
      // const gui = new dat.GUI();

      const parameters = {
        materialColor: "#ffeded",
      };

      // gui.addColor(parameters, "materialColor");

      /**
       * Base
       */
      // Canvas
      const canvas = document.querySelector("#render-three-c") as HTMLElement;

      // Scene
      const scene = new THREE.Scene();

      /**
       * Objects
       */

      const textureLoader = new THREE.TextureLoader();
      const gradientTexture = textureLoader.load(
        "/assets/texture/gradients/3.jpg"
      );
      gradientTexture.magFilter = THREE.NearestFilter;

      const toonMaterial = new THREE.MeshToonMaterial({
        color: parameters.materialColor,
        gradientMap: gradientTexture,
      });

      const mesh1 = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.4, 16, 60),
        toonMaterial
      );

      const mesh2 = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 32),
        toonMaterial
      );

      const mesh3 = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
        toonMaterial
      );

      const objectsDistance = 4;

      mesh1.position.y = -objectsDistance * 0;
      mesh2.position.y = -objectsDistance * 1;
      mesh3.position.y = -objectsDistance * 2;

      mesh1.position.x = 2;
      mesh2.position.x = -2;
      mesh3.position.x = 2;

      const sectionMeshes = [mesh1, mesh2, mesh3];

      scene.add(mesh1, mesh2, mesh3);

      /**
       * Particles
       */
      //Geometry

      const particlesCount = 200;
      const positions = new Float32Array(particlesCount * 3);

      for (let index = 0; index < particlesCount; index++) {
        positions[index * 3 + 0] = (Math.random() - 0.5) * 10;
        positions[index * 3 + 1] =
          objectsDistance * 0.5 -
          Math.random() * objectsDistance * sectionMeshes.length;
        positions[index * 3 + 2] = (Math.random() - 0.5) * 10;
      }

      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      //Material
      const particlesMaterial = new THREE.PointsMaterial({
        color: parameters.materialColor,
        sizeAttenuation: true,
        size: 0.03,
      });

      //Points
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      /**
       * Lights
       */
      const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
      directionalLight.position.set(1, 1, 0);
      scene.add(directionalLight);

      /**
       * Sizes
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

      //Group
      const cameraGroup = new THREE.Group();
      scene.add(cameraGroup);

      // Base camera
      const camera = new THREE.PerspectiveCamera(
        35,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.z = 6;
      cameraGroup.add(camera);

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(sizes.width, sizes.height);
      canvas.appendChild(renderer.domElement);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * scroll
       */
      let scrollY: number;
      let currentSection = 0;

      window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
        const newSection = Math.round(scrollY / sizes.height);

        if (newSection !== currentSection) {
          currentSection = newSection;
          gsap.to(sectionMeshes[currentSection-1].rotation, {
            duration: 1.5,
            ease: "power2.inOut",
            x: "+=6",
            y: "+=3",
            z:"+=1.5"
          });
          console.log("changed", currentSection);
        }
      });

      /**
       * Cursor
       */
      interface Cursor {
        x: number;
        y: number;
      }

      let cursor: Cursor = { x: 0, y: 0 };

      window.addEventListener("mousemove", (event: any) => {
        cursor.x = event.clientX / sizes.width - 0.5;
        cursor.y = event.clientY / sizes.height - 0.5;
      });

      /**
       * Animate
       */
      const clock = new THREE.Clock();
      let previousTime = 0;

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;

        //animate camera
        camera.position.y = (-scrollY / sizes.height) * objectsDistance + 4;

        const parallaxX = cursor.x * 0.5;
        const parallaxY = -cursor.y * 0.5;

        cameraGroup.position.x +=
          (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
        cameraGroup.position.y +=
          (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

        for (const mesh of sectionMeshes) {
          mesh.rotation.x += deltaTime * 0.1;
          mesh.rotation.y += deltaTime * 0.12;
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

.outline-three-js-c {
  background-color: $black-0;

  .render-three-c {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
  }

  .section {
    display: flex;
    align-items: center;
    height: 100vh;
    position: relative;
    font-family: "Cabin", sans-serif;
    color: $white-300;
    text-transform: uppercase;
    font-size: 7vmin;
    padding-left: 10%;
    padding-right: 10%;
  }

  section:nth-child(odd) {
    justify-content: flex-end;
  }
}
</style>

