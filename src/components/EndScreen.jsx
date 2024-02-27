export default function EndScreen({ text }) {
  return (
    <section className="dialogue-section">
      <div className="section-container">
        <dialog open className="modal">
          <h3>{text}</h3>
          <button type="button">Play Again</button>
        </dialog>
      </div>
    </section>
  );
}
