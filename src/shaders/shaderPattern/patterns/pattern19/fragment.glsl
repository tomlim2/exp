varying vec2 vUv;

void main() {
    //pattern19
    // float strength = step(.1,max(abs(vUv.x - .5),abs(vUv.y - .5)));

    //pattern20
    float sq1 = step(.2,max(abs(vUv.x - .5),abs(vUv.y - .5)));
    float sq2 = 1. - step(.25,max(abs(vUv.x - .5),abs(vUv.y - .5)));
    float strength = sq1 * sq2;

    gl_FragColor = vec4(vec3(strength), 1.);
}