varying vec2 vUv;

void main() {
    float strength = abs(vUv.x - .5);

    gl_FragColor = vec4(vec3(strength), 1.);
}