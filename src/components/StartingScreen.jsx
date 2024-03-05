export default function StartingScreen({ handleClick }) {
  return (
    <section className="starting-screen-section">
      <dialog open id="modal">
        <div className="modal-content">
          <button onClick={handleClick}>Easy</button>
          <button onClick={handleClick}>Medium</button>
          <button onClick={handleClick}>Hard</button>
        </div>
      </dialog>
    </section>
  );
}
