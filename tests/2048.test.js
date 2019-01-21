const expect = require('expect');
const { orderRow, rotateLeft, rotateRight, reverse, moveLeft, moveRight, moveUp, moveDown, checkGrid } = require('../src/functions/2048');

let grids = [];

beforeEach(() => {
    grids = [
        // 0
        [
            [2, 0, 0, 0],
            [0, 2, 0, 8],
            [2, 0, 2, 0],
            [0, 0, 0, 2]
        ],
        // 1
        [
            [0, 8, 0, 2],
            [0, 0, 2, 0],
            [0, 2, 0, 0],
            [2, 0, 2, 0]
        ],
        // 2
        [
            [2, 0, 2, 0],
            [4, 4, 0, 0],
            [0, 2, 0, 8],
            [0, 2, 4, 0]
        ],
        // 3
        [
            [0, 2, 0, 2],
            [0, 0, 4, 4],
            [8, 0, 2, 0],
            [0, 4, 2, 0]
        ],
        // 4
        [
            [0, 2, 0, 2],
            [0, 2, 8, 0],
            [0, 0, 4, 0],
            [0, 2, 0, 0]
        ],
        // 5
        [
            [0, 4, 8, 2],
            [0, 2, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        // 6
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 2, 8, 0],
            [0, 4, 4, 2]
        ],
        // 7
        [
            [4, 0, 0, 0],
            [2, 8, 0, 0],
            [4, 0, 0, 0],
            [2, 0, 0, 0]
        ],
        // 8
        [
            [0, 0, 0, 4],
            [0, 0, 2, 8],
            [0, 0, 0, 4],
            [0, 0, 0, 2]
        ],
        // 9
        [
            [2, 4, 8, 2],
            [4, 8, 2, 4],
            [8, 2, 4, 2],
            [2, 4, 2, 8]
        ],
        // 10
        [
            [2, 2, 8, 2],
            [4, 8, 2, 4],
            [8, 2, 4, 2],
            [2, 8, 2, 8]
        ],
        // 11
        [
            [2, 4, 8, 2],
            [4, 8, 2, 4],
            [8, 2, 4, 2],
            [2, 8, 4, 8]
        ]
    ]
});

describe('orderRow', () => {

    it('should return correct row [0, 2, 0, 2]', (done) => {
        orderRow([0, 2, 0, 2]).then((result) => {
            expect(result).toEqual([4, 0, 0, 0]);
            done();
        });
    });

    it('should return correct row [0, 8, 0, 2]', (done) => {
        orderRow([0, 8, 0, 2]).then((result) => {
            expect(result).toEqual([8, 2, 0, 0]);
            done();
        });
    });

    it('should return correct row [4, 4, 4, 2]', (done) => {
        orderRow([4, 4, 4, 2]).then((result) => {
            expect(result).toEqual([8, 4, 2, 0]);
            done();
        });
    });

    it('should return correct row [0, 0, 0, 0]', (done) => {
        orderRow([0, 0, 0, 0]).then((result) => {
            expect(result).toEqual([0, 0, 0, 0]);
            done();
        });
    });

});

describe('rotateLeft', () => {
    it('should rotate the grid left', () => {
        const result = rotateLeft(grids[0]);
        expect(result).toEqual(grids[1]);
    });
});

describe('rotateRight', () => {
    it('should rotate a grid rigth', () => {
        const result = rotateRight(grids[1]);
        expect(result).toEqual(grids[0]);
    });
});

describe('reverse', () => {
    it('should reverse a grid', () => {
        const result = reverse(grids[2]);
        expect(result).toEqual(grids[3]);
    });
});

describe('moveUp', () => {
    it('should perform the move UP', (done) => {
        moveUp(grids[4]).then((result) => {
            expect(result).toEqual(grids[5]);
            done();
        });
    });
});

describe('moveDown', () => {
    it('should perform the move down', (done) => {
        moveDown(grids[4]).then((result) => {
            expect(result).toEqual(grids[6]);
            done();
        });
    });
});

describe('moveLeft', () => {
    it('should perform the move left', (done) => {
        moveLeft(grids[4]).then((result) => {
            expect(result).toEqual(grids[7]);
            done();
        });
    });
});

describe('moveRigth', () => {
    it('should perform the move right', (done) => {
        moveRight(grids[4]).then((result) => {
            expect(result).toEqual(grids[8]);
            done();
        });
    });
});

describe('should check if there are still options left',()=>{
    it('should return true because options left',()=>{
        const result = checkGrid(grids[4],10);
        expect(result).toBe(true);
    });

    it('should return true because options left',()=>{
        const result = checkGrid(grids[10],0);
        expect(result).toBe(true);
    });

    it('should return true because options left',()=>{
        const result = checkGrid(grids[11],0);
        expect(result).toBe(true);
    });

    it('should return false because no options left',()=>{
        const result = checkGrid(grids[9],0);
        expect(result).toBe(false);
    });
});