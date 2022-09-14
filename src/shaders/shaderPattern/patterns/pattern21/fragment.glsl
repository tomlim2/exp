varying vec2 vUv;

void main() {
    float strength = floor(vUv.x*10.)/10.;

    gl_FragColor = vec4(vec3(strength), 1.);
}