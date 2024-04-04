/**
 * whenIdle executes a callback when the browser is 'idle' or after a short timeout, whichever comes first
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
 *
 * @param callback the function to execute once the browser is 'idle'
 */
export const whenIdle = (callback: () => void): void => {
	const timeout = 500;
	if ('requestIdleCallback' in window) {
		window.requestIdleCallback(callback, { timeout });
	} else {
		setTimeout(callback, timeout);
	}
};
