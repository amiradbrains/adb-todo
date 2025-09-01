'use client';

import { useState } from 'react';
import Header from '../components/Header';
import NoteForm from '../components/NoteForm';
import NotesGrid from '../components/NotesGrid';
import { useNotes } from '../hooks/useNotes';

export default function Home() {
  const [viewMode, setViewMode] = useState('grid');

  const {
    notes,
    searchTerm,
    setSearchTerm,
    showArchived,
    setShowArchived,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    duplicateNote,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  } = useNotes();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showArchived={showArchived}
        setShowArchived={setShowArchived}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <main className="pt-8 pb-16">
        {!showArchived && (
          <NoteForm onCreateNote={createNote} />
        )}

        <NotesGrid
          notes={notes}
          viewMode={viewMode}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          onTogglePin={togglePin}
          onToggleArchive={toggleArchive}
          onDuplicateNote={duplicateNote}
          onAddTodo={addTodo}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
        />
      </main>
    </div>
  );
}
