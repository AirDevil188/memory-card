export default function Card({ data, onClick }) {
  return (
    <>
      {data.map((card) => {
        return (
          <div className="card" key={card.id} onClick={onClick} id={card.id}>
            <div className="card-content" id={card.id}>
              <img
                src={card.sprites.front_default}
                alt={card.name}
                id={card.id}
              />
              <h3 id={card.id}>{card.name}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
}
