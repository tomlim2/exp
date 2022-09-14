#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main() {
  float angle = atan(vUv.x - .5, vUv.y - .5) / (PI * 2.) + .5;
  float radius = .25 + sin(angle * 100.) * .02;
  float strength = 1. - step(.01, abs(distance(vUv, vec2(.5)) - radius)
  );

  gl_FragColor = vec4(vec3(strength), 1.);
}