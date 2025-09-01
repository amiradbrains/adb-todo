import NoteCard from './NoteCard';

export default function NotesGrid({
    notes,
    viewMode = 'grid',
    onUpdateNote,
    onDeleteNote,
    onTogglePin,
    onToggleArchive,
    onDuplicateNote,
    onAddTodo,
    onUpdateTodo,
    onDeleteTodo,
    onToggleTodo
}) {
    if (notes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <div className="w-24 h-24 mb-4 opacity-50 flex items-center justify-center">
                    <div className="w-16 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
                <p className="text-lg font-medium mb-2">No notes yet</p>
                <p className="text-sm">Click &ldquo;Take a note...&rdquo; to get started</p>
            </div>
        );
    }

    // Separate pinned and unpinned notes
    const pinnedNotes = notes.filter(note => note.isPinned);
    const unpinnedNotes = notes.filter(note => !note.isPinned);

    const renderNotes = (notesList, title) => {
        if (notesList.length === 0) return null;

        return (
            <div className="mb-8">
                {title && (
                    <h2 className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wide">
                        {title}
                    </h2>
                )}
                <div className={
                    viewMode === 'grid'
                        ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4'
                        : 'space-y-4 max-w-4xl mx-auto'
                }>
                    {notesList.map((note) => (
                        <div
                            key={note.id}
                            className={viewMode === 'grid' ? 'break-inside-avoid' : ''}
                        >
                            <NoteCard
                                note={note}
                                onUpdate={onUpdateNote}
                                onDelete={onDeleteNote}
                                onTogglePin={onTogglePin}
                                onToggleArchive={onToggleArchive}
                                onDuplicate={onDuplicateNote}
                                onAddTodo={onAddTodo}
                                onUpdateTodo={onUpdateTodo}
                                onDeleteTodo={onDeleteTodo}
                                onToggleTodo={onToggleTodo}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            {/* Pinned notes */}
            {renderNotes(pinnedNotes, pinnedNotes.length > 0 ? 'Pinned' : null)}

            {/* Regular notes */}
            {renderNotes(unpinnedNotes, pinnedNotes.length > 0 && unpinnedNotes.length > 0 ? 'Others' : null)}
        </div>
    );
}
