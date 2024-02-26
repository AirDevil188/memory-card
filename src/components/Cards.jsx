export default function Card({ data, onClick, onClick2 }) {
  return (
    <>
      {data.map((card) => {
        return (
          <div className="card" key={card.id} onClick={onClick}>
            <img
              src={card.sprites.front_default}
              alt={card.name}
              id={card.id}
            />
            <h3>{card.name}</h3>
          </div>
        );
      })}
    </>
  );
}
