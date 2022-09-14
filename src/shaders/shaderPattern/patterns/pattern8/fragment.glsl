varying vec2 vUv;

void main() {
    // // pattern8
    // float strength = mod(vUv.y * 10., 1.);
    // strength = step(.5, strength);

    // // pattern9
    // float strength = mod(vUv.y * 10., 1.);
    // strength = step(.8, strength);

    // pattern10
    float strength = mod(vUv.x * 10., 1.);
    strength = step(.8, strength);

    gl_FragColor = vec4(vec3(strength), 1.);
}