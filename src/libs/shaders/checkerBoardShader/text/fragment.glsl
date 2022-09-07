uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;

varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

uniform float uProgress1;
uniform float uProgress2;
uniform float uProgress3;
uniform float uProgress4;

float rand(float n) {
    return fract(sin(n) * 43758.5453123);
}

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(float p) {
    float fl = floor(p);
    float fc = fract(p);
    return mix(rand(fl), rand(fl + 1.0), fc);
}

float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
    vec3 pink = vec3(.834, 0.066, 0.788);

    vec4 l3 = vec4(pink, 1.);
    vec4 l4 = vec4(vec3(1.), 1.);

    float x = floor(vUv.x * 10. * 2.);
    float y = floor(vUv.y * 10. * 2.);
    float pattern = noise(vec2(x, y));

    float w = .5;

    float p3 = uProgress3;
    p3 = map(p3, 0., 1., -w, 1.);
    p3 = smoothstep(p3, p3 + w, vUv.x);
    float mix3 = 2. * p3 - pattern;
    mix3 = clamp(mix3,0., 1.); 

    float p4 = uProgress4;
    p4 = map(p4, 0., 1., -w, 1.);
    p4 = smoothstep(p4, p4 + w, vUv.x);
    float mix4 = 2. * p4 - pattern;
    mix4 = clamp(mix4,0., 1. ); 

    vec4 layer3 = mix(vec4(0.),l3,1.-mix3);
    vec4 layer4 = mix(layer3,l4,1.-mix4);
    
    // gl_FragColor = vec4(uProgress1 * 1.0, 0.0, 0.0, 1.);
    // gl_FragColor = l3;
    // gl_FragColor = vec4(vec3(pattern), 1.);
    // gl_FragColor = vec4(vec3(mix0), 1.);
    // gl_FragColor = mix(vec4(0.), l1, 1. - mix0);
    gl_FragColor = layer4;
}