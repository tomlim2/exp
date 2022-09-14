varying vec2 vUv;

void main() {
    float barX = step(.4, mod(vUv.x * 10., 1.));
    barX *= step(.8, mod(vUv.y * 10., 1.));

    float barY = step(.8, mod(vUv.x * 10., 1.));
    barY *= step(.4, mod(vUv.y * 10., 1.));

    float strength = barX + barY;

    gl_FragColor = vec4(vec3(strength), 1.);
}