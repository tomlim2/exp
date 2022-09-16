varying vec2 vUv;

void main() {
    float barX = step(.4, mod(vUv.x * 10., 1.));
    barX *= step(.8, mod(vUv.y * 10., 1.));

    float barY = step(.8, mod(vUv.x * 10., 1.));
    barY *= step(.4, mod(vUv.y * 10., 1.));

    float strength = barX + barY;
    strength = clamp(strength, 0., 1.);

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(mixedColor, 1.);
}