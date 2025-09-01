import { useState } from 'react';
import { Pin, Archive, Trash2, Copy, Palette, Plus, X, Tag } from 'lucide-react';
import { getColorClasses } from '../utils/noteColors';
import ColorPicker from './ColorPicker';
import keepData from '../../data/keep.json';

export default function NoteCard({
    note,
    onUpdate,
    onDelete,
    onTogglePin,
    onToggleArchive,
    onDuplicate,
    onAddTodo,
    onUpdateTodo,
    onDeleteTodo,
    onToggleTodo
}) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const [newTodoText, setNewTodoText] = useState('');
    const [editLabels, setEditLabels] = useState(note.labels || []);
    const [showLabelPicker, setShowLabelPicker] = useState(false);

    const colorClasses = getColorClasses(note.color);

    const handleSave = () => {
        const updates = {
            title: editTitle,
            labels: editLabels
        };

        if (note.type === 'text') {
            updates.content = editContent;
        }

        onUpdate(note.id, updates);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(note.title);
        setEditContent(note.content);
        setEditLabels(note.labels || []);
        setNewTodoText('');
        setShowLabelPicker(false);
        setIsEditing(false);
    };

    const handleAddTodo = () => {
        if (newTodoText.trim()) {
            onAddTodo(note.id, newTodoText.trim());
            setNewTodoText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    const handleColorChange = (color) => {
        onUpdate(note.id, { color });
        setShowColorPicker(false);
    };

    const formatDate = (dateString) => {
        // Always return a simple date format to avoid hydration mismatch
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div
            className={`
                relative group rounded-lg border-2 p-4 cursor-pointer transition-all duration-200
                ${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover}
                ${isEditing ? 'ring-2 ring-blue-400' : ''}
            `}
            onClick={() => !isEditing && setIsEditing(true)}
        >
            {/* Pin indicator */}
            {note.isPinned && (
                <Pin className="absolute top-2 right-2 w-4 h-4 text-gray-600 fill-current" />
            )}

            {/* Note content */}
            {isEditing ? (
                <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full bg-transparent text-lg font-medium text-gray-900 placeholder-gray-500 border-none outline-none resize-none"
                        autoFocus
                    />
                    {note.type === 'text' ? (
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            placeholder="Take a note..."
                            className="w-full bg-transparent text-gray-900 placeholder-gray-500 border-none outline-none resize-none min-h-[100px]"
                            rows={4}
                        />
                    ) : (
                        <div className="space-y-2">
                            {/* Existing todos */}
                            {note.todos && note.todos.map((todo) => (
                                <div key={todo.id} className="flex items-center space-x-2 group/todo">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => onToggleTodo(note.id, todo.id)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        value={todo.text}
                                        onChange={(e) => onUpdateTodo(note.id, todo.id, { text: e.target.value })}
                                        className={`flex-1 bg-transparent text-gray-900 border-none outline-none ${todo.completed ? 'line-through text-gray-500' : ''
                                            }`}
                                    />
                                    <button
                                        onClick={() => onDeleteTodo(note.id, todo.id)}
                                        className="opacity-0 group-hover/todo:opacity-100 p-1 hover:bg-red-100 rounded text-red-600 flex-shrink-0"
                                        title="Delete todo"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}

                            {/* Add new todo */}
                            <div className="flex items-center space-x-2">
                                <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <input
                                    type="text"
                                    value={newTodoText}
                                    onChange={(e) => setNewTodoText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    onBlur={handleAddTodo}
                                    placeholder="Add a todo..."
                                    className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 border-none outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Edit Labels */}
                    <div className="space-y-2">
                        {editLabels.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {editLabels.map((label) => (
                                    <span
                                        key={label}
                                        className="inline-flex items-center px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
                                    >
                                        {label}
                                        <button
                                            onClick={() => setEditLabels(editLabels.filter(l => l !== label))}
                                            className="ml-1 hover:text-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Edit mode actions */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <button
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                    className="p-2 hover:bg-black/5 rounded-full"
                                    title="Change color"
                                >
                                    <Palette className="w-4 h-4 text-gray-600" />
                                </button>
                                {showColorPicker && (
                                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border z-10">
                                        <ColorPicker
                                            selectedColor={note.color}
                                            onColorChange={handleColorChange}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowLabelPicker(!showLabelPicker)}
                                    className="p-2 hover:bg-black/5 rounded-full"
                                    title="Edit labels"
                                >
                                    <Tag className="w-4 h-4 text-gray-600" />
                                </button>
                                {showLabelPicker && (
                                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border z-10 p-2 min-w-[200px]">
                                        <div className="max-h-40 overflow-y-auto">
                                            {keepData.labels.map((label) => (
                                                <button
                                                    key={label}
                                                    onClick={() => {
                                                        if (!editLabels.includes(label)) {
                                                            setEditLabels([...editLabels, label]);
                                                        }
                                                    }}
                                                    className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 ${editLabels.includes(label) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                                                        }`}
                                                    disabled={editLabels.includes(label)}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleCancel}
                                className="px-3 py-1 text-sm text-gray-600 hover:bg-black/5 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {note.title && (
                        <h3 className="text-lg font-medium mb-2 text-gray-900 line-clamp-2">
                            {note.title}
                        </h3>
                    )}
                    {/* Content for text notes */}
                    {note.type === 'text' && note.content && (
                        <p className="text-gray-700 whitespace-pre-wrap line-clamp-6 mb-3">
                            {note.content}
                        </p>
                    )}

                    {/* Todos for todo notes */}
                    {note.type === 'todo' && note.todos && note.todos.length > 0 && (
                        <div className="space-y-2 mb-3">
                            {note.todos.map((todo) => (
                                <div key={todo.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => onToggleTodo(note.id, todo.id)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span className={`text-gray-700 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                        {todo.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Labels */}
                    {note.labels && note.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {note.labels.map((label) => (
                                <span
                                    key={label}
                                    className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Date */}
                    <div className="text-xs text-gray-500 mb-2">
                        {formatDate(note.updatedAt)}
                    </div>

                    {/* Hover actions */}
                    <div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => onTogglePin(note.id)}
                                className={`p-2 rounded-full hover:bg-black/10 ${note.isPinned ? 'text-blue-600' : 'text-gray-600'
                                    }`}
                                title={note.isPinned ? 'Unpin note' : 'Pin note'}
                            >
                                <Pin className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => onToggleArchive(note.id)}
                                className="p-2 rounded-full hover:bg-black/10 text-gray-600"
                                title={note.isArchived ? 'Unarchive' : 'Archive'}
                            >
                                <Archive className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => onDuplicate(note.id)}
                                className="p-2 rounded-full hover:bg-black/10 text-gray-600"
                                title="Make a copy"
                            >
                                <Copy className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => onDelete(note.id)}
                                className="p-2 rounded-full hover:bg-black/10 text-gray-600"
                                title="Delete note"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
