#version 410

out vec4 color;

uniform mat4 MVP;
uniform vec3 cameraPosition;
uniform float heightFactor;
uniform vec3 lightPos;
uniform sampler2D rgbTexture;
uniform sampler2D rgbHeight;

in vec2 textureCoordinate;
in vec3 vertexNormal;
in vec3 ToLightVector;
in vec3 ToCameraVector;

void main() {
  vec4 textureColor = texture(rgbTexture, textureCoordinate);
  vec4 ka = vec4(0.25, 0.25, 0.25, 1.0);
  vec4 Ia = vec4(0.3, 0.3, 0.3, 1.0);
  vec4 Id = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 kd = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 Is = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 ks = vec4(1.0, 1.0, 1.0, 1.0);
  int specExp = 100;
  vec4 ambient = Ia*ka;
  vec4 diffuse = Id*kd*max(0.0f, dot(vertexNormal, ToLightVector));
  vec4 specular = Is*ks*pow(max(0.0f, dot(vertexNormal, normalize(ToCameraVector + ToLightVector))), specExp);
  color = vec4(clamp(textureColor.xyz*vec3(ambient + diffuse + specular), 0.0, 1.0), 1.0);
}
