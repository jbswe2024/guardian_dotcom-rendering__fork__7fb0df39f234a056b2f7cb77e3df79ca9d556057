/**
 * Use this function to delay execution of something until an element is interacted
 * with
 *
 * @param element : The html element that we want to wait for an interaction on;
 * @param callback : This is fired when the element is clicked on
 */
export const onInteraction = (
	element: HTMLElement,
	callback: (target: Element) => void,
): void => {
	element.addEventListener(
		'click',
		(e) => {
			if (e.target instanceof Element) {
				callback(e.target);
			}
		},
		{ once: true },
	);
};
