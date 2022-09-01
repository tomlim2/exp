<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <DatNumber
      v-model="state.roughness"
      :min="0"
      :max="100"
      :step="5"
      label="My Number"
      :show-slider="false"
    />
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

      const pointLight = new THREE.PointLight(0xffffff, 0.5);

      pointLight.position.x = 2;
      pointLight.position.y = 3;
      pointLight.position.z = 4;

      scene.add(ambientLight, pointLight);

      /**
       * texture
       */
      const textureLoader = new THREE.TextureLoader();
      const doorColorTexture = textureLoader.load(
        "/assets/texture/door/color.jpg"
      );
      const doorAlphaTexture = textureLoader.load(
        "/assets/texture/door/alpha.jpg"
      );
      const doorAmbientOcclusionTexture = textureLoader.load(
        "/assets/texture/door/ambientOcclusion.jpg"
      );
      const doorHeightTexture = textureLoader.load(
        "/assets/texture/door/height.jpg"
      );
      const doorNormalTexture = textureLoader.load(
        "/assets/texture/door/normal.jpg"
      );
      const doorMatelnessTexture = textureLoader.load(
        "/assets/texture/door/matelness.jpg"
      );
      const doorRoughnessTexture = textureLoader.load(
        "/assets/texture/door/roughness.jpg"
      );
      const mtcapTexture = textureLoader.load("/assets/texture/matcaps/8.png");
      // const gradientsTexture = textureLoader.load(
      //   "/assets/texture/gradients/3.jpg"
      // );
      // gradientsTexture.minFilter = THREE.NearestFilter
      // gradientsTexture.magFilter = THREE.NearestFilter
      // gradientsTexture.generateMipmaps = false

      const cubeTextureLoader = new THREE.CubeTextureLoader();

      const environmentMapTexture = cubeTextureLoader.load(
        [
          "/assets/texture/environmentMaps/1/px.jpg",
          "/assets/texture/environmentMaps/1/nx.jpg",
          "/assets/texture/environmentMaps/1/py.jpg",
          "/assets/texture/environmentMaps/1/ny.jpg",
          "/assets/texture/environmentMaps/1/pz.jpg",
          "/assets/texture/environmentMaps/1/nz.jpg",
        ],
        (file:any) => {
          console.log(file, "???");
        }
      );

      /**
       * Object
       */
      // const material = new THREE.MeshBasicMaterial();
      // material.map = doorColorTexture;
      // material.color = new THREE.Color("#ff00ff");
      // material.color.set('0xff0000');
      // material.wireframe = true;
      // material.opacity = 0.5;
      // material.transparent = true;
      // material.alphaMap = doorAlphaTexture;
      // material.side = THREE.DoubleSide

      // const material = new THREE.MeshNormalMaterial()
      // material.flatShading = true

      const matcapMaterial = new THREE.MeshMatcapMaterial();
      matcapMaterial.matcap = mtcapTexture;

      // const material = new THREE.MeshDepthMaterial()
      // const material = new THREE.MeshLambertMaterial();
      // const material = new THREE.MeshPhongMaterial();
      // material.shininess = 1000
      // material.specular = new THREE.Color(0xff0000)
      // const material = new THREE.MeshToonMaterial();
      // material.gradientMap = gradientsTexture;

      const material = new THREE.MeshStandardMaterial();
      material.metalness = 0;
      material.roughness = 1;
      material.map = doorColorTexture;
      material.aoMap = doorAmbientOcclusionTexture;
      material.aoMapIntensity = 1;
      material.displacementMap = doorHeightTexture;
      material.displacementScale = 0.05;
      material.metalnessMap = doorMatelnessTexture;
      material.roughnessMap = doorRoughnessTexture;
      material.normalMap = doorNormalTexture;
      material.normalScale.set(0.1, 0.1);
      material.transparent = true;
      material.alphaMap = doorAlphaTexture;

      const envMaterial = new THREE.MeshStandardMaterial();
      envMaterial.metalness = 1;
      envMaterial.roughness = 0.2;
      envMaterial.envMap = environmentMapTexture;

      gui.add(material, "metalness").min(0).max(1).step(0.0001);
      gui.add(material, "roughness").min(0).max(1).step(0.0001);
      gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);

      const sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.5, 16, 16),
        envMaterial
      );

      sphere.geometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
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
        matcapMaterial
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

