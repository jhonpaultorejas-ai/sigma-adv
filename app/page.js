"use client";

import { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const typed = title.trim().toLowerCase();
    if (typed === "") {
      setIsDuplicate(false);
      return;
    }
    const exists = notes.some(
      (n) => n.title.toLowerCase() === typed && n.id !== editingId
    );
    setIsDuplicate(exists);
  }, [title, notes, editingId]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setError("");
  };

  const handleSubmit = () => {
    if (title.trim() === "" || description.trim() === "") {
      setError("Fill in both the title and the description.");
      return;
    }
    if (isDuplicate) {
      setError("A note with this title already exists. Use a different title.");
      return;
    }

    if (editingId) {
      setNotes(
        notes.map((n) =>
          n.id === editingId
            ? { ...n, title: title.trim(), description: description.trim() }
            : n
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        date: new Date().toLocaleDateString(),
      };
      setNotes([newNote, ...notes]);
    }
    clearForm();
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
    setError("");
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this note?")) return;
    setNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) clearForm();
  };

  return (
    <main className="board">
      <header className="header">
        <h1>My Notes</h1>
        <p>{notes.length} {notes.length === 1 ? "note" : "notes"} pinned</p>
      </header>

      <section className="form-card">
        <h2>{editingId ? "Edit note" : "New note"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={isDuplicate ? "input warn" : "input"}
        />
        {isDuplicate && (
          <p className="hint">This title is already used by another note.</p>
        )}

        <textarea
          placeholder="Write something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          rows={4}
        />

        {error && <p className="error">{error}</p>}

        <div className="form-buttons">
          <button className="btn primary" onClick={handleSubmit}>
            {editingId ? "Save changes" : "Add note"}
          </button>
          {editingId && (
            <button className="btn ghost" onClick={clearForm}>
              Cancel
            </button>
          )}
        </div>
      </section>

      {notes.length === 0 ? (
        <p className="empty">No notes yet. Add your first one above.</p>
      ) : (
        <section className="notes-grid">
          {notes.map((note, index) => (
            <NoteItem
              key={note.id}
              note={note}
              index={index}
              isEditing={editingId === note.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </main>
  );
}