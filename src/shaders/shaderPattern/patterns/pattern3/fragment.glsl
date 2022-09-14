varying vec2 vUv;

void main() {
    //pattern3
    // float strength = vUv.x;

    //pattern4
    // float strength = vUv.y;

    //pattern5
    // float strength = 1.-vUv.y;

    //pattern6
    float strength = vUv.y * 10.;

    gl_FragColor = vec4(vec3(strength), 1.);
}