uniform float uTime;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;

attribute vec3 aColor;
varying vec3 vColor;
varying vec2 vUv;

void main() {
    //position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //Spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1. / distanceToCenter) * uTime * .2;

    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    //Randomness
    modelPosition.x += aRandomness.x;
    modelPosition.y += aRandomness.y;
    modelPosition.z += aRandomness.z;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    //size
    gl_PointSize = uSize * aScale;
    gl_PointSize *= ( 1. / - viewPosition.z );

    //Color
     
    vColor = aColor;
    vUv = uv;
}