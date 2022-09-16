varying vec2 vUv;

void main() {
    float strength = step(.8, mod(vUv.x * 10., 1.));
    strength += step(.8, mod(vUv.y * 10., 1.));
    strength = clamp(strength, 0.0, 1.0);
    
    gl_FragColor = vec4(vec3(strength), 1.);
}