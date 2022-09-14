varying vec2 vUv;

void main() {
    // vec2 lightUv = vec2(
    //     vUv.x * .2 + .4,
    //     vUv.y * .5 + .25
    // );
    // float strength = .015 / distance(lightUv, vec2(.5));
    vec2 lightUv = vec2(
        vUv.x,
        (vUv.y - .5)*5.+.5
    );
    float strength = .15 / (distance(lightUv, vec2(.5)));

    gl_FragColor = vec4(vec3(strength), 1.);
}