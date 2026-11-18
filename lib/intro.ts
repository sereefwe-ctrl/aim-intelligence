/**
 * The loading screen's hand-off. `introDone` resolves as the screen starts to
 * lift (or straight away when it is skipped), so the page's own entrance
 * motion, such as the headline circles, plays where it can be seen.
 */
let finish: () => void = () => {};

export const introDone: Promise<void> =
  typeof window === "undefined"
    ? Promise.resolve()
    : new Promise((resolve) => {
        finish = resolve;
      });

export function finishIntro() {
  finish();
}
