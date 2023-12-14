precision highp float;

uniform float uAlpha;
uniform float uMultiplier;
uniform vec3 uDarkTint; // Tint color for the dark areas
uniform vec3 uLightTint; // Tint color for the light areas
uniform sampler2D tMap;

varying float vDisplacement;
varying vec2 vUv;

vec3 saturation(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

void main() {
  vec4 textureColor = texture2D(tMap, vUv);
  float luminance = dot(textureColor.rgb, vec3(0.299, 0.587, 0.114)); // Calculate luminance
  
  vec3 color;
  if (luminance < 0.5) { // Dark areas
    color = mix(uDarkTint, textureColor.rgb, luminance / 0.5);
  } else { // Light areas
    color = mix(textureColor.rgb, uLightTint, (luminance - 0.5) / 0.5);
  }

  // Apply the vDisplacement effect
  color += vDisplacement * mix(0.1, 0.19, uMultiplier); // Tweak this to make the effect more subtle

  color = saturation(color, 1.0); // Keep saturation unaffected by displacement for now

  gl_FragColor = vec4(color, textureColor.a * uAlpha);
}
