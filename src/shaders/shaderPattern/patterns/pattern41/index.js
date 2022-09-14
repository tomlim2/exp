import vertexShader from 'raw-loader!glslify-loader!./vertex.glsl'
import fragmentShader from 'raw-loader!glslify-loader!./fragment.glsl'

const pattern = {
    vertexShader,
    fragmentShader
}

export default pattern