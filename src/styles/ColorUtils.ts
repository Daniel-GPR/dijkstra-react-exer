function hex2(c: number) {
  c = Math.round(c);
  if (c < 0) c = 0;
  if (c > 255) c = 255;

  var s = c.toString(16);
  if (s.length < 2) s = "0" + s;

  return s;
}

export function hexColor(r: number, g: number, b: number) {
  return "#" + hex2(r) + hex2(g) + hex2(b);
}

export function shadeColor(color: string, light: number) {
  // TODO: Assert that col is good and that -1 < light < 1

  var r = parseInt(color.substr(1, 2), 16);
  var g = parseInt(color.substr(3, 2), 16);
  var b = parseInt(color.substr(5, 2), 16);

  if (light < 0) {
    r = (1 + light) * r;
    g = (1 + light) * g;
    b = (1 + light) * b;
  } else {
    r = (1 - light) * r + light * 255;
    g = (1 - light) * g + light * 255;
    b = (1 - light) * b + light * 255;
  }

  return hexColor(r, g, b);
}
