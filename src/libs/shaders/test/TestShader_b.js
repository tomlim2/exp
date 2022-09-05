import vertexShader from 'raw-loader!glslify-loader!./vertex.glsl'
import fragmentShader from 'raw-loader!glslify-loader!./fragment.glsl'

// const newTest = vertexShader.replace("#define GLSLIFY 1", "")
const TestShader = {
    vertexShader,
    fragmentShader
}

export default TestShader