import Tile from './Tile';

export default function Board({ tiles, selectedIndex, onTileClick, gridSize }) {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    gap: '4px',
    width: '400px',
    height: '400px',
  };

  return (
    <div style={containerStyle}>
      {tiles.map((tileSrc, idx) => (
        <Tile
          key={idx}
          src={tileSrc}
          index={idx}
          onClick={onTileClick}
          isSelected={selectedIndex === idx}
        />
      ))}
    </div>
  );
}

