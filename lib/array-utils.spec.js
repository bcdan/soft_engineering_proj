const { getArrayLength, reverseArray } = require('./array-utils');

beforeAll(() => {
	// run code before all tests
});
beforeEach(() => {
	// run code before each test
});

// afterEach
// afterAll

test(' the length of array [1,2,3] should be 3', () => {
	expect(getArrayLength([1, 2, 3])).toBe(3);
});

test(' the length of array [] should be 0', () => {
	expect(getArrayLength([])).toBe(0);
});

test(' the length of null should be -1', () => {
	expect(getArrayLength(null)).toBe(-1);
});

test('returns the reverse of [1,2,3]', () => {
	expect(reverseArray([1, 2, 3])).toEqual([3, 2, 1]);
});
