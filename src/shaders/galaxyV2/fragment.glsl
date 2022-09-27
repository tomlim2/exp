varying vec3 vColor;

void main () {
    //disc
    float strength = distance(gl_PointCoord, vec2(.5));
    strength = step(.5, strength);
    strength = 1.0 - strength;

    // //diffuse
    // float strength = distance(gl_PointCoord, vec2(.5));
    // strength *= 2.0;
    // strength = 1. - strength;

    // light point
    // float strength = distance(gl_PointCoord, vec2(.5));
    // strength = 1. - strength;
    // strength = pow(strength, 10.);

    // color 
     vec3 color = mix(vec3(0.0), vColor, strength);

    gl_FragColor=vec4(vec3(color), 1.);
}