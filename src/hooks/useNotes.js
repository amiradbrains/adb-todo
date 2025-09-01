import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import keepData from '../../data/keep.json';

export function useNotes() {
    const [notes, setNotes] = useLocalStorage('keep-notes', keepData.notes);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [showArchived, setShowArchived] = useState(false);

    // Filter notes based on search term, labels, and archive status
    const filteredNotes = notes.filter(note => {
        const matchesSearch = !searchTerm ||
            (note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesLabels = selectedLabels.length === 0 ||
            (note.labels && selectedLabels.some(label => note.labels.includes(label)));

        const matchesArchive = showArchived ? note.isArchived : !note.isArchived;

        return matchesSearch && matchesLabels && matchesArchive;
    });

    // Sort notes: pinned first, then by updated date
    const sortedNotes = filteredNotes.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const createNote = (noteData) => {
        const newNote = {
            id: uuidv4(),
            title: noteData.title || '',
            type: noteData.type || 'text',
            content: noteData.content || '',
            todos: noteData.todos || [],
            color: noteData.color || 'default',
            isPinned: false,
            isArchived: false,
            labels: noteData.labels || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setNotes(prevNotes => [newNote, ...prevNotes]);
        return newNote;
    };

    const updateNote = (id, updates) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id
                    ? { ...note, ...updates, updatedAt: new Date().toISOString() }
                    : note
            )
        );
    };

    const deleteNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    const togglePin = (id) => {
        updateNote(id, { isPinned: !notes.find(note => note.id === id)?.isPinned });
    };

    const toggleArchive = (id) => {
        updateNote(id, { isArchived: !notes.find(note => note.id === id)?.isArchived });
    };

    const duplicateNote = (id) => {
        const originalNote = notes.find(note => note.id === id);
        if (originalNote) {
            const duplicatedNote = {
                ...originalNote,
                id: uuidv4(),
                title: `${originalNote.title} (Copy)`,
                isPinned: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setNotes(prevNotes => [duplicatedNote, ...prevNotes]);
        }
    };

    const addLabel = (id, label) => {
        const note = notes.find(note => note.id === id);
        if (note && !note.labels.includes(label)) {
            updateNote(id, { labels: [...note.labels, label] });
        }
    };

    const removeLabel = (id, label) => {
        const note = notes.find(note => note.id === id);
        if (note) {
            updateNote(id, { labels: note.labels.filter(l => l !== label) });
        }
    };

    const addTodo = (noteId, todoText) => {
        const note = notes.find(note => note.id === noteId);
        if (note && note.type === 'todo') {
            const newTodo = {
                id: uuidv4(),
                text: todoText,
                completed: false
            };
            updateNote(noteId, { todos: [...note.todos, newTodo] });
        }
    };

    const updateTodo = (noteId, todoId, updates) => {
        const note = notes.find(note => note.id === noteId);
        if (note && note.type === 'todo') {
            const updatedTodos = note.todos.map(todo =>
                todo.id === todoId ? { ...todo, ...updates } : todo
            );
            updateNote(noteId, { todos: updatedTodos });
        }
    };

    const deleteTodo = (noteId, todoId) => {
        const note = notes.find(note => note.id === noteId);
        if (note && note.type === 'todo') {
            const updatedTodos = note.todos.filter(todo => todo.id !== todoId);
            updateNote(noteId, { todos: updatedTodos });
        }
    };

    const toggleTodo = (noteId, todoId) => {
        const note = notes.find(note => note.id === noteId);
        if (note && note.type === 'todo') {
            const todo = note.todos.find(t => t.id === todoId);
            if (todo) {
                updateTodo(noteId, todoId, { completed: !todo.completed });
            }
        }
    };

    return {
        notes: sortedNotes,
        allNotes: notes,
        searchTerm,
        setSearchTerm,
        selectedLabels,
        setSelectedLabels,
        showArchived,
        setShowArchived,
        createNote,
        updateNote,
        deleteNote,
        togglePin,
        toggleArchive,
        duplicateNote,
        addLabel,
        removeLabel,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo
    };
}
