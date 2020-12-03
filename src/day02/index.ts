import { test, readInput } from "../utils/index"

const lineMatcher = /^(\d+)-(\d+) (\w): (\w+)$/;

interface IPasswordInformation {
	low: number;
	high: number;
	letter: string;
	password: string;
}

const parseLine = (line: string): IPasswordInformation => {
	const [, lows, highs, letter, password] = line.match(lineMatcher) ?? [];
	const low = parseInt(lows, 10);
	const high = parseInt(highs, 10);
	return { low, high, letter, password };
};

const prepareInput = (input: string) => input.split('\n').map(parseLine);
const input = prepareInput(readInput());

const runA = (input: IPasswordInformation[]) => {
    return input.filter(({ low, high, letter, password }) => {
        const charCount = password.split(letter).length - 1;
        return charCount >= low && charCount <= high;
    }).length;
}

const runB = (input: IPasswordInformation[]) => {
    return input.filter(
        ({ low, high, letter, password }) =>
            (password[low - 1] === letter) !== (password[high - 1] === letter)
    ).length;
}

/* Tests */
const example = 
`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

test(runA(prepareInput(example)), 2);
test(runB(prepareInput(example)), 1);


/* Results */
console.time("Time");
const resultA = runA(input);
const resultB = runB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
