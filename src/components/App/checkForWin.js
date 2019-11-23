// Rows
const row_1 = [0, 1, 2];
const row_2 = [3, 4, 5];
const row_3 = [6, 7, 8];

// Columns
const col_1 = [0, 3, 6];
const col_2 = [1, 4, 7];
const col_3 = [2, 5, 8];

// Diagonals
const diagonal_1 = [0, 4, 8];
const diagonal_2 = [2, 4, 6];

export default function checkForWin(squares, i) {
  const allSame = vals => vals[0] === vals[1] && vals[0] === vals[2];

  const testAll = combinations => {
    let victory = false;
    combinations.forEach(combo => {
      let rowToTest = [];
      for (let i of combo) {
        rowToTest.push(squares[i]);
      }
      if (allSame(rowToTest)) {
        victory = true;
      }
    });
    return victory;
  };

  switch (i) {
    case 0: {
      return testAll([row_1, col_1, diagonal_1]);
    }
    case 1: {
      return testAll([row_1, col_2]);
    }
    case 2: {
      return testAll([row_1, col_3, diagonal_2]);
    }
    case 3: {
      return testAll([col_1, row_2]);
    }
    case 4: {
      return testAll([row_2, col_2, diagonal_1, diagonal_2]);
    }
    case 5: {
      return testAll([col_3, row_2]);
    }
    case 6: {
      return testAll([col_1, diagonal_2, row_3]);
    }
    case 7: {
      return testAll([col_2, row_3]);
    }
    case 8: {
      return testAll([row_3, col_3, diagonal_1]);
    }
    default:
      break;
  }
}
