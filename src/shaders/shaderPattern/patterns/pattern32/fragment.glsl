#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main() {
    vec2 rotateUv = rotate(vUv, PI*.25,vec2(.5));
    vec2 lightUvX = vec2(rotateUv.x, (rotateUv.y - .5) * 5. + .5);
    float lightX = .15 / (distance(lightUvX, vec2(.5)));
    vec2 lightUvY = vec2(rotateUv.y, (rotateUv.x - .5) * 5. + .5);
    float lightY = .15 / (distance(lightUvY, vec2(.5)));
    float strength = lightX * lightY;

    gl_FragColor = vec4(vec3(strength), 1.);
}