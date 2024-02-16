uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

/*You should see a very slight variation in the color. 
The problem is that our vElevation currently only goes from - 0.2 to + 0.2 according to our code.
 We need to find a way to control this vElevation, but only in the fragment shader.
Let's add some uniforms! We will create a uColorOffset and uColorMultiplier */

void main() {
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor,uSurfaceColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
}