import vertexShader from 'raw-loader!glslify-loader!./vertex.glsl'
import fragmentShader from 'raw-loader!glslify-loader!./fragment.glsl'

const TestShader = {
    vertexShader,
    fragmentShader
}

export default TestShader