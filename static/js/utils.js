export function find(selector, root = document) {
	return Array.apply(null, root.querySelectorAll(selector));
}
