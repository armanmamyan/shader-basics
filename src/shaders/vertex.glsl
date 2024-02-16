varying vec3 vNormal;
attribute float displacement;

void main() {

    vNormal = normal;

    vec4 newPosition = position + normal * vec3(displacement);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}