import _ from 'lodash';

export function orderRow(row) {
    let wArr = row.filter((item) => item !== 0);
    let returnArray = [];
    let additions = 0;
    while (wArr.length > 0) {
        if (wArr.length > 1) {
            if (wArr[0] === wArr[1]) {
                additions += wArr[0] + wArr[1];
                returnArray = [...returnArray, wArr[0] + wArr[1]];
                wArr.splice(0, 2);
            }
            else {
                returnArray = [...returnArray, wArr[0]];
                wArr.splice(0, 1);
            }
        }
        else {
            returnArray = [...returnArray, wArr[0]];
            wArr = [];
        }
    };

    let zeroArray = Array.from(Array(4 - returnArray.length), () => 0);
    return [...returnArray, ...zeroArray, additions];
};

export function pushGridAndCount(grid) {
    let oldScore = JSON.parse(localStorage.getItem('score'));
    let added = 0;
    const result = grid.map((row) => {
        let newRow = orderRow(row);
        added += newRow.pop();
        return newRow;
    });
    localStorage.setItem('score', oldScore + added);
    return result;
}

export function rotateLeft(grid) {
    let wGrid = reverse(grid);
    let returnGrid = [[], [], [], []];
    for (let i = 0; i < wGrid.length; i++) {
        for (let j = 0; j < wGrid[i].length; j++) {
            returnGrid[j].push(wGrid[i][j]);
        }
    }
    return returnGrid;
};

export function rotateRight(grid) {
    let wGrid = grid.reverse();
    let returnGrid = [[], [], [], []];
    for (let i = 0; i < wGrid.length; i++) {
        for (let j = 0; j < wGrid[i].length; j++) {
            returnGrid[j].push(wGrid[i][j]);
        }
    }
    return returnGrid;
};

export function reverse(grid) {
    const newArray = grid.map((row) => {
        let refArr = [];
        row.forEach((item) => {
            refArr.unshift(item);
        });
        return refArr;
    });
    return newArray;
};

export const moveLeft = (grid) => {
    // return grid.map((row) => orderRow(row));
    return pushGridAndCount(grid);
};

export const moveRight = (grid) => {
    const reversedGrid = reverse(grid);
    // let result = reversedGrid.map((row) => orderRow(row));
    let result = pushGridAndCount(reversedGrid);
    return reverse(result);
};

export const moveUp = (grid) => {
    let toLeft = rotateLeft(grid);
    // let result = toLeft.map((row) => orderRow(row));
    let result = pushGridAndCount(toLeft);
    return rotateRight(result);
};

export const moveDown = (grid) => {
    let toRight = rotateRight(grid);
    // let result = toRight.map((row) => orderRow(row));
    let result = pushGridAndCount(toRight);
    return rotateLeft(result);
};

const checkZeros = (grid) => {
    let returnArray = [];
    grid.forEach((row, index1) => {
        row.forEach((item, index2) => {
            if (item == 0) {
                returnArray.push([index1, index2]);
            }
        })
    });
    return returnArray;
};

export const checkNextMove = (grid) => {
    let zeroArray = checkZeros(grid);
    if (zeroArray.length > 0) {
        let index = Math.floor(Math.random() * zeroArray.length);
        const newNumber = Math.floor(Math.random() * 10) < 8 ? 2 : 4;
        grid[zeroArray[index][0]][zeroArray[index][1]] = newNumber;
        return {
            grid,
            availableMove: checkGrid(grid, zeroArray.length)
        };
    }
    else {
        return {
            grid,
            availableMove: checkGrid(grid, 0)
        }
    }
};

const checkRowsOnMove = (grid) => {
    const result = grid.map((row) => {
        return row.some((item, index) => {
            return row[index + 1] && item == row[index + 1];
        });
    });
    return result.includes(true);
}

export const checkGrid = (grid, numZeros) => {
    if (numZeros > 1) {
        return true;
    }

    return checkRowsOnMove(grid) || checkRowsOnMove(rotateLeft(grid));
};
