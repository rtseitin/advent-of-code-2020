import { test, readInput } from "../utils/index"

const prepareInput = (input: string) => input.split('\n');

const input = prepareInput(readInput());

function findTrees(input: string[], slope:{ x: number, y: number }): number {
    const row: Array<Array<string>> = new Array;

    for (let i = 0; i < input.length; i++) {
        const column: Array<string> = new Array;
        input[i].split('').forEach((x) => {
            column.push(x);
        });
        row.push(column);
    }

    let currentSlotXAxis: number = 0;
    let trees: number = 0;
    for (let i = 1; i < row.length; i++) {
        if(i % slope.y === 0) {
            if (!row[i]) return trees;
            if (!row[i][currentSlotXAxis + slope.x]) currentSlotXAxis = currentSlotXAxis - row[i].length;
            if (row[i][currentSlotXAxis + slope.x] === '#') trees++;
            currentSlotXAxis = currentSlotXAxis + slope.x;
        }
    }
    return trees;
}

const runA = (input: string[]): number => {
    return findTrees(input, {x: 3, y: 1});
}

const runB = (input: string[]): number => {
    const slopes = [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2}
    ];

    const trees: Array<number> = new Array();
    for (let i = 0; i < slopes.length; i++) {
        trees.push(findTrees(input, {x: slopes[i].x, y: slopes[i].y}));
    }

    return trees.reduce((x, y) => x * y);
}

/* Tests */
const example: string =
`..##.........##.........##.........##.........##.........##.......
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#`;

test(runA(prepareInput(example)), 7);
test(runB(prepareInput(example)), 336);

/* Results */
console.time("Time");
const resultA = runA(input);
const resultB = runB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
