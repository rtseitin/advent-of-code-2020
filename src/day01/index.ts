import { test, readInput } from "../utils/index";


const prepareInput = (input: string) => input.split('\n').map(Number);

const input: Array<number> = prepareInput(readInput());

const runA = (input: Array<number>): number | null => {
	for (let i = 0; i < input.length; i++) {
		const ni = input[i];
		for (let j = i + 1; j < input.length; j++) {
			const nj = input[j];
			if (ni + nj === 2020) {
				return ni * nj;
			}
		}
	}
	return null;
}

const runB = (input: Array<number>): number | null  => {
	for (let i = 0; i < input.length; i++) {
		const ni = input[i];
		for (let j = i + 1; j < input.length; j++) {
			const nj = input[j];
			for (let k = j + 1; k < input.length; k++) {
				const nk = input[k];
				if (ni + nj + nk === 2020) {
					return ni * nj * nk;
				}
			}
		}
	}
	return null;
}

/* Tests */
test(runA([1721, 979, 366, 299, 675, 1456]), 514579);
test(runB([1721, 979, 366, 299, 675, 1456]), 241861950);

/* Results */
console.time("Time");
const resultA = runA(input);
const resultB = runB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);