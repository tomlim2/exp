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
       * Object
       */

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial()
      );

      scene.add(cube);

      const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial()
      );

      cube1.position.x = 1.5;

      scene.add(cube1);

      const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial()
      );

      cube2.position.x = -1.5;

      scene.add(cube2);

      /**
       * Raycast
       */

      const raycaster = new THREE.Raycaster();

      const rayOrigin = new THREE.Vector3(-3, 0, 0);
      const rayDirection = new THREE.Vector3(10, 0, 0);
      rayDirection.normalize();

      raycaster.set(rayOrigin, rayDirection);

      const objectsToTest = [cube, cube1, cube2];

      const intersect = raycaster.intersectObjects(objectsToTest);
      console.log(intersect, "intersect?");

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
       * Mouse
       */

      const mouse = new THREE.Vector2();

      let currentIntersect: any = null;

      window.addEventListener("mousemove", (event: any) => {
        mouse.x = (event.clientX / sizes.width) * 2 - 1;
        mouse.y = -(event.clientY / sizes.height) * 2 + 1;
      });

      window.addEventListener("click", () => {
        if (currentIntersect) {
          switch (currentIntersect.object) {
            case cube:
              console.log("click on object 1");
              currentIntersect.object.material.color.set('#00ff00')
              break;

            case cube1:
              console.log("click on object 2");
              currentIntersect.object.material.color.set('#00ffff')
              break;

            case cube2:
              currentIntersect.object.material.color.set('#ff00ff')
              break;
          }
        }
      });

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

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Cube Animation
        cube.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
        cube1.position.y = Math.cos(elapsedTime * 0.8) * 1.5;
        cube2.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

        // Raycast

        raycaster.setFromCamera(mouse, camera);

        const objectsToTest = [cube, cube1, cube2];
        const intersects = raycaster.intersectObjects(objectsToTest);

        if (intersects.length) {
          if (!currentIntersect) {
            console.log("mouse enter");
          }
          currentIntersect = intersects[0];
        } else {
          if (currentIntersect) {
            console.log("mouse leave");
          }
          currentIntersect = null;
        }

        // for (const intersect of intersects) {
        //   const objectMesh = intersect.object as THREE.Mesh;
        //   const objectMaterial = objectMesh.material as THREE.MeshBasicMaterial;

        //   objectMaterial.color.set("#0000ff");
        // }

        // for (const object of objectsToTest) {
        //   if (!intersects.find((intersect) => intersect.object === object)) {
        //     object.material.color.set("#ff0000");
        //   }
        // }

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

