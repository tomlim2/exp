<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-checker" class="render-journey-checker" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";

import CheckerBoardTextShader from "@/libs/shaders/checkerBoardShader/text/index.js";
import CheckerBoardMask1Shader from "@/libs/shaders/checkerBoardShader/boardMask_1/index.js";

export default defineComponent({
  setup() {
    const state = reactive({
      progress3: 0,
      progress4: 0,
    });

    const restart = ref();

    onMounted(() => {
      const gui = new dat.GUI();
      const canvas = document.querySelector(
        "#render-journey-checker"
      ) as HTMLElement;

      // Scene
      const scene = new THREE.Scene();

      // Setting
      const settings = {
        speed: 0.01,
        progress1: 0,
        progress2: 0,
        progress3: 0,
        progress4: 0,
        color1: 0xff00cc,
        color2: 0xff007f,
        color3: 0xff0033,
        color4: 0xffffff,
        offset: -0.05,
      };

      /**
       * Object
       */
      const mask1Material = new THREE.ShaderMaterial({
        vertexShader: CheckerBoardMask1Shader.vertexShader,
        fragmentShader: CheckerBoardMask1Shader.fragmentShader,
        uniforms: {
          time: { value: 0 },
          progress: { value: 0 },
          resolution: { value: new THREE.Vector4() },
        },
      });

      console.log(gui);

      const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 30, 30);

      const MaskMesh = new THREE.Mesh(planeGeometry, mask1Material);

      console.log(MaskMesh);

      // scene.add(MaskMesh);

      const textMaterial = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        defines: {
          IS_SMALL: false,
        },
        extensions: {
          derivatives: true,
        },
        uniforms: {
          time: { value: 0 },
          uProgress1: { value: settings.offset * 0 },
          uProgress2: { value: settings.offset * 1 },
          uProgress3: { value: settings.offset * 2 },
          uProgress4: { value: settings.offset * 3 },
          uColor1: { value: settings.color1 },
          uColor2: { value: settings.color2 },
          uColor3: { value: settings.color3 },
          uColor4: { value: settings.color4 },
        },
        vertexShader: CheckerBoardTextShader.vertexShader,
        fragmentShader: CheckerBoardTextShader.fragmentShader,
      });

      const fontLoader = new FontLoader();

      fontLoader.load(
        "/assets/fonts/helvetiker_regular.typeface.json",
        (font) => {
          //messges
          const message = "Hi,\nThere.\nWhat's up?";
          const textGeometry = new TextGeometry(message, {
            font: font,
            size: 0.5,
            height: 0,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0,
          });

          // textGeometry.computeBoundingBox();

          // textGeometry.boundingBox &&
          //   textGeometry.translate(
          //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
          //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
          //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
          //   );

          textGeometry.center();

          const text = new THREE.Mesh(textGeometry, textMaterial);
          scene.add(text);
        }
      );

      // gui.add(settings, "progress1", 0, 3, 0.01).onChange(() => {
      //   textMaterial.uniforms.uProgress1.value = settings.progress1;
      // });
      // gui.add(settings, "progress2", 0, 3, 0.01).onChange(() => {
      //   textMaterial.uniforms.uProgress2.value = settings.progress2;
      // });
      // gui.add(settings, "progress3", 0, 3, 0.01).onChange(() => {
      //   textMaterial.uniforms.uProgress3.value = settings.progress3;
      // });
      // gui.add(settings, "progress4", 0, 3, 0.01).onChange(() => {
      //   textMaterial.uniforms.uProgress4.value = settings.progress4;
      // });

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
        150,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.z = 0.5;
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      canvas.appendChild(renderer.domElement);
      renderer.setSize(sizes.width, sizes.height);
      renderer.setClearColor(0x111111, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      window.addEventListener("click", () => {
        textMaterial.uniforms.uProgress1.value = settings.offset*0;
        textMaterial.uniforms.uProgress2.value = settings.offset*1;
        textMaterial.uniforms.uProgress3.value = settings.offset*2;
        textMaterial.uniforms.uProgress4.value = settings.offset*3;
      });

      /**
       * Animate
       */
      // const clock = new THREE.Clock();

      gui.add(settings, "speed", 0, 0.02, 0.001).onChange(() => {
        textMaterial.uniforms.uProgress1.value = settings.progress1;
      });

      gui.add(settings, "offset", -.1, 0, .01)

      gui.addColor(settings, "color1").onChange(() => {
        textMaterial.uniforms.uColor1.value = settings.color1;
      });
      gui.addColor(settings, "color2").onChange(() => {
        textMaterial.uniforms.uColor2.value = settings.color2;
      });
      gui.addColor(settings, "color3").onChange(() => {
        textMaterial.uniforms.uColor3.value = settings.color3;
      });
      gui.addColor(settings, "color4").onChange(() => {
        textMaterial.uniforms.uColor4.value = settings.color4;
      });

      const tick = () => {
        // const elapsedTime = clock.getElapsedTime();

        if (textMaterial.uniforms.uProgress4.value < 3) {
          textMaterial.uniforms.uProgress1.value =
            textMaterial.uniforms.uProgress1.value + settings.speed;
          textMaterial.uniforms.uProgress2.value =
            textMaterial.uniforms.uProgress2.value + settings.speed;
          textMaterial.uniforms.uProgress3.value =
            textMaterial.uniforms.uProgress3.value + settings.speed;
          textMaterial.uniforms.uProgress4.value =
            textMaterial.uniforms.uProgress4.value + settings.speed;
        }

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();
    });

    return { state, restart };
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

button.animation-restart {
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -25px;
  width: 100px;
  height: 100px;
  background-color: white;
  color: black;
  border: 0;
}
</style>

