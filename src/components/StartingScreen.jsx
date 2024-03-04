export default function StartingScreen({ handleClick }) {
  return (
    <>
      <section className="starting-screen-section">
        <dialog open className="dialog">
          <div className="dialog-container">
            <button onClick={handleClick}>Easy</button>
            <button onClick={handleClick}>Medium</button>
            <button onClick={handleClick}>Hard</button>
          </div>
        </dialog>
      </section>
    </>
  );
}
