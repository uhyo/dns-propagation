import { attraction, dnsDistance, nextChar, previousChar } from "./coordinate";
import { range } from "./range";

export type State = string[][];

export const BOARD_SIZE = 16;

export function initialize(): State {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .filter((c) => dnsDistance(c) >= 3);

  return Array.from(range(0, BOARD_SIZE), () => {
    return Array.from(range(0, BOARD_SIZE), () => chars[randInt(chars.length)]);
  });
}

export function setDNS(state: State): void {
  for (const char of ["D", "N", "S"]) {
    const x = randInt(BOARD_SIZE),
      y = randInt(BOARD_SIZE);
    state[y][x] = char;
  }
}

const MAX_POTENTIAL = 1;
export function update(state: State): void {
  const snapshot: State = structuredClone(state);

  for (const y of range(0, BOARD_SIZE)) {
    for (const x of range(0, BOARD_SIZE)) {
      const current = state[y][x];
      const ns = neighbors(x, y);

      const attr = ns.reduce((acc, n) => acc + attraction(current, n), 0);
      const potential = Math.random() * (MAX_POTENTIAL * 2) - MAX_POTENTIAL;
      if (attr < potential && potential < 0) {
        state[y][x] = previousChar(current);
      } else if (attr > potential && potential > 0) {
        state[y][x] = nextChar(current);
      }
    }
  }

  function neighbors(x: number, y: number) {
    return [
      snapshot[y - 1]?.[x],
      snapshot[y + 1]?.[x],
      snapshot[y][x - 1],
      snapshot[y][x + 1],
    ].filter(isNotNullish);
  }
}

function randInt(N: number) {
  return Math.floor(Math.random() * N);
}

function isNotNullish<T>(value: T): value is NonNullable<T> {
  return value != null;
}
