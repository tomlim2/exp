varying vec2 vUv;

void main() {
    // float strength = length(vUv-.5);
    float strength = distance(vUv, vec2(.5));

    gl_FragColor = vec4(vec3(strength), 1.);
}