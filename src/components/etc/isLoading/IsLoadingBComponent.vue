<template>
  <svg
    width="100px"
    height="42px"
    viewBox="0 0 100 42"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>nf-logo</title>
    <defs>
      <polygon
        id="path-1"
        points="51.892 12.863 51.89267 40 30.15385 40 21.73882 25.726872 21.73882 40 0 40 0 0 21.73882 0 30.15385 14.273128 30.15385 0 98 0 98 12.863436 83.97496 12.863436 83.97496 40 60.30769 40 60.30769 21.85022 75.55993 12.863436"
      ></polygon>
    </defs>
    <g
      id="Loading"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="Loading" transform="translate(-148.000000, -193.000000)">
        <g id="nf-logo" transform="translate(149.000000, 194.000000)">
          <g id="Rectangle">
            <mask id="mask-2" fill="white">
              <use xlink:href="#path-1"></use>
            </mask>
            <g id="Mask"></g>
            <rect
              id="Progress"
              fill="#FFFFFF"
              mask="url(#mask-2)"
              x="0"
              y="0"
              width="98"
              height="40"
            ></rect>
          </g>
          <g id="Combined-Shape-Copy" stroke="#FFFFFF">
            <polygon
              points="51.892 12.863 51.89267 40 30.15385 40 21.73882 25.726872 21.73882 40 0 40 0 0 21.73882 0 30.15385 14.273128 30.15385 0 98 0 98 12.863436 83.97496 12.863436 83.97496 40 60.30769 40 60.30769 21.85022 75.55993 12.863436"
            ></polygon>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  setup() {},
};
</script>
<style scoped>
#Progress {
  animation: loading 1s linear infinite;
}

@keyframes loading {
  0% {
    y: 100%;
    height: 0%;
  }
  50% {
    y: 0%;
    height: 100%;
  }
  100% {
    y: 0%;
    height: 0%;
  }
}
</style>
