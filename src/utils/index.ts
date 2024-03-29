export const isFlat = (arr: any[]): boolean => {
	for (var i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			return false
		}
	}
	return true
}

export const isDef = (v: any): boolean => {
	return v !== undefined && v !== null
}

export const isUndef = (v: any): v is null | undefined => {
	return v === null || v === undefined
}
