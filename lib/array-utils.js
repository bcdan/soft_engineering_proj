function getArrayLength(array) {
	if (!array) {
		return -1;
	}
	return array.length;
}
function reverseArray(array) {
	return array.reverse();
}
module.exports = {
	getArrayLength,
	reverseArray,
};
