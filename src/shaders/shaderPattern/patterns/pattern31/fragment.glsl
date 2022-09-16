varying vec2 vUv;

void main() {
    vec2 lightUvX = vec2(vUv.x, (vUv.y - .5) * 5. + .5);
    float lightX = .15 / (distance(lightUvX, vec2(.5)));
    vec2 lightUvY = vec2(vUv.y, (vUv.x - .5) * 5. + .5);
    float lightY = .15 / (distance(lightUvY, vec2(.5)));
    float strength = lightX * lightY;

    vec3 blackColor = vec3(.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(vec3(mixedColor), 1.);
}