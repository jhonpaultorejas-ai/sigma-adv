const colors = ["yellow", "pink", "blue", "green"];

export default function NoteItem({ note, index, isEditing, onEdit, onDelete }) {
  const color = colors[index % colors.length];
  const tilt = index % 2 === 0 ? "tilt-left" : "tilt-right";

  return (
    <article className={`note ${color} ${tilt} ${isEditing ? "editing" : ""}`}>
      <span className="pin" />
      <h3>{note.title}</h3>
      <p className="desc">{note.description}</p>
      <div className="note-footer">
        <small>{note.date}</small>
        <div>
          <button className="link" onClick={() => onEdit(note)}>Edit</button>
          <button className="link danger" onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      </div>
    </article>
  );
}