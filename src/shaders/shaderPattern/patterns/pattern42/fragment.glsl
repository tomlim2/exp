#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main() {
  // float angle = atan(vUv.x - .5, vUv.y - .5);
  // angle /= PI * 2.;
  // angle += .5;
  float angle = atan(vUv.x - .5, vUv.y - .5) / (PI * 2.) + .5;
  float strength = angle;

  gl_FragColor = vec4(vec3(strength), 1.);
}