export function checkRowWin(board, point) {
  const size = board.length;
  const sizeColumn = Math.sqrt(size);
  const pointsFirstRow = Array.apply(null, { length: sizeColumn }).map(
    (item, index) => index * sizeColumn
  );
  const pointsLastRow = pointsFirstRow.map(item => item + sizeColumn - 1);
  let left = 0;
  let check_left = point;
  let right = 0;
  let check_right = point;
  const obj = board.find(item => item.id === point);
  while (
    check_left !== null &&
    !pointsFirstRow.find(item => item === check_left) &&
    left < 5 &&
    left + right < 5
  ) {
    const check = board.find(
      item => item.id === check_left - 1 && item.check === obj.check
    );
    if (check) {
      check_left = check.id;
      left = left + 1;
    } else {
      check_left = null;
    }
  }
  while (
    check_right !== null &&
    !pointsLastRow.find(item => item === check_left) &&
    right < 5 &&
    left + right < 5
  ) {
    const check = board.find(
      item => item.id === check_right + 1 && item.check === obj.check
    );
    if (check) {
      check_right = check.id;
      right = right + 1;
    } else {
      check_right = null;
    }
  }
  return left + right;
}

export function checkColumnWin(board, point) {
  const size = board.length;
  const sizeColumn = Math.sqrt(size);
  let top = 0;
  let check_top = point;
  let bottom = 0;
  let check_bottom = point;
  const obj = board.find(item => item.id === point);
  while (
    check_top !== null &&
    check_top - sizeColumn > 0 &&
    top < 5 &&
    top + bottom < 5
  ) {
    const check = board.find(
      item => item.id === check_top - sizeColumn && item.check === obj.check
    );
    if (check) {
      check_top = check.id;
      top = top + 1;
    } else {
      check_top = null;
    }
  }
  while (
    check_bottom !== null &&
    check_bottom + sizeColumn < size - 1 &&
    bottom < 5 &&
    top + bottom < 5
  ) {
    const check = board.find(
      item => item.id === check_bottom + sizeColumn && item.check === obj.check
    );
    if (check) {
      check_bottom = check.id;
      bottom = bottom + 1;
    } else {
      check_bottom = null;
    }
  }
  return top + bottom;
}

export function checkRightDiagonalWin(board, point) {
  const size = board.length;
  const sizeColumn = Math.sqrt(size);
  const pointsFirstRow = Array.apply(null, { length: sizeColumn }).map(
    (item, index) => index * sizeColumn
  );
  const pointsLastRow = pointsFirstRow.map(item => item + sizeColumn - 1);
  let top = 0;
  let check_top = point;
  let bottom = 0;
  let check_bottom = point;
  const obj = board.find(item => item.id === point);
  while (
    check_top !== null &&
    check_top - sizeColumn > 0 &&
    !pointsLastRow.find(item => item === check_top) &&
    top < 5 &&
    top + bottom < 5
  ) {
    const check = board.find(
      item => item.id === check_top - sizeColumn + 1 && item.check === obj.check
    );
    if (check) {
      check_top = check.id;
      top = top + 1;
    } else {
      check_top = null;
    }
  }
  while (
    check_bottom !== null &&
    check_bottom + sizeColumn < size - 1 &&
    !pointsFirstRow.find(item => item === check_bottom) &&
    bottom < 5 &&
    top + bottom < 5
  ) {
    const check = board.find(
      item =>
        item.id === check_bottom + sizeColumn - 1 && item.check === obj.check
    );
    if (check) {
      check_bottom = check.id;
      bottom = bottom + 1;
    } else {
      check_bottom = null;
    }
  }
  return top + bottom;
}