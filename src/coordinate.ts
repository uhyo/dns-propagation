// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// 32101234543210122101234554
const distanceMap = "32101234543210122101234554"
  .split("")
  .map((c) => parseInt(c, 10));

export const dnsDistance = (char: string) => {
  // 'char' should be A-Z
  return distanceMap[char.charCodeAt(0) - 0x41];
};

export function previousChar(char: string) {
  return "ZABCDEFGHIJKLMNOPQRSTUVWXY"[char.charCodeAt(0) - 0x41];
}

export function nextChar(char: string) {
  return "BCDEFGHIJKLMNOPQRSTUVWXYZA"[char.charCodeAt(0) - 0x41];
}

export function attraction(target: string, attractor: string) {
  const t = target.charCodeAt(0) - 0x41;
  const a = attractor.charCodeAt(0) - 0x41;

  const d = t - a;
  let left: number, right: number, direction: 1 | -1;
  if (d <= -13) {
    left = a;
    right = t + 26;
    direction = -1;
  } else if (d < 0) {
    left = t;
    right = a;
    direction = 1;
  } else if (d === 0) {
    return 0;
  } else if (d <= 13) {
    left = a;
    right = t;
    direction = -1;
  } else {
    left = t;
    right = a + 26;
    direction = 1;
  }

  const attr =
    direction === 1
      ? gravity(distanceMap[right % 26])
      : gravity(distanceMap[left % 26]);
  // if (target === "D")
  //   console.log({
  //     target,
  //     attractor,
  //     left,
  //     right,
  //     direction,
  //     attr: attr * direction,
  //   });
  return attr * direction;
}

const gravity = (distance: number) => 0.2 ** distance;
