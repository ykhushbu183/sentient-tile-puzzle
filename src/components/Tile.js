export default function Tile({ src, index, onClick, isSelected }) {
  return (
    <img
      src={src}
      alt={`Tile ${index}`}
      style={{
        border: isSelected ? '3px solid blue' : '1px solid gray',
        cursor: 'pointer',
        width: '100%',
        height: '100%'
      }}
      onClick={() => onClick(index)}
    />
  );
}

