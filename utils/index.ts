export const isFlat = (arr: any[]): boolean => {
	for (var i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			return false
		}
	}
	return true
}
export const countFlat = (arr: any[]): number => {
	let res = 0
	for (var i = 0; i < arr.length; i++) {
		if (!Array.isArray(arr[i])) res++
	}
	return res
}
