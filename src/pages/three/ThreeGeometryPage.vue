<template>
  <div id="three-journey-geometry" class="three-journey-geometry">
    <div id="render-three-a" class="render-three-a" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as THREE from "three";

export default defineComponent({
  setup() {
    const state = reactive({});

    
    

    onMounted(() => {
      /**
       * Resize
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      window.addEventListener("resize", () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // for perspective camera
        // camera.aspect = sizes.width / sizes.height;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      /**
       * cursor
       */
      const cursor = {
        x: 0,
        y: 0,
      };

      window.addEventListener("mousemove", (event) => {
        cursor.x = event.clientX / sizes.width - 0.5;
        cursor.y = -(event.clientY / sizes.height - 0.5);
      });

      const scene = new THREE.Scene();
      const aspectRatio = sizes.width / sizes.height;
      const camera = new THREE.OrthographicCamera(
        -1 * aspectRatio,
        1 * aspectRatio,
        1,
        -1,
        0.1,
        100
      );
      // const camera = new THREE.PerspectiveCamera(
      //   75,
      //   aspectRatio,
      //   1,
      //   1000
      // );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(sizes.width, sizes.height);
      (document.querySelector("#render-three-a") as HTMLElement).appendChild(
        renderer.domElement
      );

      // const controls = new OrbitControls(camera, renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const count = 150;
      // const positionArray = new Float32Array([
      //   0,0,0,
      //   0,1,0,
      //   1,0,0
      // ])
      const positionsArray = new Float32Array(count * 3 * 3);

      for (let i = 0; i < count * 3 * 3; i++) {
        positionsArray[i] = (Math.random() - 0.5) *2;
      }

      const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
      geometry.setAttribute("position", positionsAttribute);

      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });

      const cube = new THREE.Mesh(geometry, material);

      scene.add(cube);

      camera.position.z = 5;
      camera.lookAt(cube.position);

      // controls.update();

      function animate() {
        requestAnimationFrame(animate);

        camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
        camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
        camera.position.y = cursor.y * 3;

        camera.lookAt(cube.position);

        // controls.update();
        // controls.enableDamping = true;
        // cube.rotation.z += .001

        renderer.render(scene, camera);
      }
      animate();
    });

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.three-journey-geometry {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $black-200;
  z-index: 20;
}
</style>

