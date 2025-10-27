// Check if current tile arrangement matches the correct order
export function checkSolution(current, correct) {
  return JSON.stringify(current) === JSON.stringify(correct);
}

