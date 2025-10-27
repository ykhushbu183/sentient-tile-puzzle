import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import Score from './components/Score';
import { images, levels } from './data/images';
import { shuffleArray } from './utils/shuffle';
import { checkSolution } from './utils/checkSolution';

export default function App() {
  const [gridSize, setGridSize] = useState(levels.simple);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    startGame(gridSize);
  }, [gridSize, currentImage]);

  const startGame = (size) => {
    setGameWon(false);
    setMoveCount(0);
    setTime(0);
    setTimerRunning(true);
    
    // Split image into tiles logic here (for demo using same image for each tile)
    let newTiles = Array(size * size).fill(currentImage);
    newTiles = shuffleArray(newTiles);
    setTiles(newTiles);
    setSelectedTile(null);
  };

  const handleTileClick = (index) => {
    if (gameWon) return;
    if (selectedTile === null) {
      setSelectedTile(index);
      return;
    }
    if (selectedTile === index) {
      setSelectedTile(null);
      return;
    }

    // Swap tiles
    const newTiles = [...tiles];
    [newTiles[selectedTile], newTiles[index]] = [newTiles[index], newTiles[selectedTile]];
    setTiles(newTiles);
    setSelectedTile(null);
    setMoveCount(moveCount + 1);

    // Check if solved (mock logic for demo)
    if (checkSolution(newTiles, Array(gridSize * gridSize).fill(currentImage))) {
      setGameWon(true);
      setTimerRunning(false);
      alert(`You completed in ${moveCount + 1} moves and ${time} seconds!`);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Sentient Tile Puzzle</h1>
      <div>
        <button onClick={() => setGridSize(levels.simple)}>Simple (2x2)</button>
        <button onClick={() => setGridSize(levels.intermediate)}>Intermediate (3x3)</button>
        <button onClick={() => setGridSize(levels.hard)}>Hard (4x4)</button>
      </div>
      <Timer isRunning={timerRunning} onTimeUpdate={setTime} />
      <Score moveCount={moveCount} />
      <Board tiles={tiles} selectedIndex={selectedTile} onTileClick={handleTileClick} gridSize={gridSize} />
      {gameWon && <div>Congratulations! You solved the puzzle.</div>}
    </div>
  );
}

