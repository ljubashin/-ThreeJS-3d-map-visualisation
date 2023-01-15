import * as THREE from 'three';

export function koordinate(lon, lat) {
  var phi = (90 - lat) * (Math.PI / 180);
  var theta = (lon + 180) * (Math.PI / 180);

  var x = -((16) * Math.sin(phi) * Math.cos(theta));
  var z = ((16) * Math.sin(phi) * Math.sin(theta));
  var y = ((16) * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
}
