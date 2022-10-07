import { render } from "./render";
import { initialize, setDNS, State, update } from "./state";
import "./style.css";

main();

async function main() {
  const gridn = document.querySelector("#app") as HTMLElement | null;
  if (gridn === null) {
    throw new Error("No #app found in DOM");
  }
  const grid = gridn;

  const state = initialize();

  r();

  // await sleep(3000);

  setDNS(state);
  r();

  await sleep(500);

  await mainLoop(grid, state);

  function r() {
    render(grid, state);
  }
}

async function mainLoop(grid: HTMLElement, state: State) {
  const INTERVAL = 250;
  let lastFrame = Date.now();
  while (true) {
    await waitRAF();
    const now = Date.now();
    if (now - lastFrame < INTERVAL) {
      continue;
    }
    lastFrame = now;

    update(state);
    render(grid, state);
  }
}

function sleep(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function waitRAF() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}
