varying vec2 vUv;

void main() {
    float strength = step(.4, mod(vUv.x * 10., 1.));
    strength *= step(.8, mod(vUv.y * 10., 1.));

    gl_FragColor = vec4(vec3(strength), 1.);
}