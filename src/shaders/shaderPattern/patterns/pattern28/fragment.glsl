varying vec2 vUv;

void main() {
    float strength = 1. - distance(vUv, vec2(.5));

    gl_FragColor = vec4(vec3(strength), 1.);
}