import { dnsDistance } from "./coordinate";
import { range } from "./range";
import { BOARD_SIZE, State } from "./state";

export function render(grid: HTMLElement, state: State): void {
  while (grid.childNodes.length < BOARD_SIZE ** 2) {
    grid.append(document.createElement("span"));
  }
  for (const y of range(0, BOARD_SIZE)) {
    for (const x of range(0, BOARD_SIZE)) {
      const i = y * BOARD_SIZE + x;
      const span = grid.children[i];
      span.className = `cell-${dnsDistance(state[y][x])}`;
      span.textContent = state[y][x];
    }
  }
}
