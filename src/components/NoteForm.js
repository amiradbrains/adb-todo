import { useState } from 'react';
import { Plus, Palette, X, List, FileText, Tag } from 'lucide-react';
import ColorPicker from './ColorPicker';
import { getColorClasses } from '../utils/noteColors';
import keepData from '../../data/keep.json';

export default function NoteForm({ onCreateNote }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [noteType, setNoteType] = useState('text');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [selectedColor, setSelectedColor] = useState('default');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [showLabelPicker, setShowLabelPicker] = useState(false);

    const colorClasses = getColorClasses(selectedColor);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() || (noteType === 'text' ? content.trim() : todos.length > 0)) {
            onCreateNote({
                title: title.trim(),
                type: noteType,
                content: noteType === 'text' ? content.trim() : '',
                todos: noteType === 'todo' ? todos : [],
                color: selectedColor,
                labels: selectedLabels
            });

            // Reset form
            setTitle('');
            setContent('');
            setTodos([]);
            setNewTodoText('');
            setSelectedColor('default');
            setSelectedLabels([]);
            setNoteType('text');
            setIsExpanded(false);
            setShowColorPicker(false);
            setShowLabelPicker(false);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setTodos([]);
        setNewTodoText('');
        setSelectedColor('default');
        setSelectedLabels([]);
        setNoteType('text');
        setIsExpanded(false);
        setShowColorPicker(false);
        setShowLabelPicker(false);
    };

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const addTodo = () => {
        if (newTodoText.trim()) {
            const newTodo = {
                id: Date.now().toString(),
                text: newTodoText.trim(),
                completed: false
            };
            setTodos([...todos, newTodo]);
            setNewTodoText('');
        }
    };

    const updateTodo = (id, updates) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, ...updates } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTodo();
        }
    };

    return (
        <div className="max-w-2xl mx-auto mb-8">
            {!isExpanded ? (
                // Collapsed state
                <div
                    onClick={handleExpand}
                    className="flex items-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md cursor-text transition-shadow duration-200"
                >
                    <span className="text-gray-500 flex-1">Take a note...</span>
                    <div className="flex items-center space-x-2">
                        <List className="w-5 h-5 text-gray-400" />
                        <Plus className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            ) : (
                // Expanded state
                <form onSubmit={handleSubmit}>
                    <div
                        className={`
                            border-2 rounded-lg shadow-lg transition-all duration-200
                            ${colorClasses.bg} ${colorClasses.border}
                        `}
                    >
                        {/* Note type selector */}
                        <div className="flex items-center space-x-2 p-4 pb-2">
                            <button
                                type="button"
                                onClick={() => setNoteType('text')}
                                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${noteType === 'text'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <FileText className="w-4 h-4" />
                                <span>Text</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setNoteType('todo')}
                                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${noteType === 'todo'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                <span>List</span>
                            </button>
                        </div>

                        {/* Title input */}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full px-4 pb-2 bg-transparent text-lg font-medium text-gray-900 placeholder-gray-500 border-none outline-none"
                            autoFocus
                        />

                        {/* Content based on note type */}
                        {noteType === 'text' ? (
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Take a note..."
                                className="w-full px-4 pb-4 bg-transparent text-gray-900 placeholder-gray-500 border-none outline-none resize-none min-h-[120px]"
                                rows={4}
                            />
                        ) : (
                            <div className="px-4 pb-4 space-y-2">
                                {/* Existing todos */}
                                {todos.map((todo) => (
                                    <div key={todo.id} className="flex items-center space-x-2 group">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={(e) => updateTodo(todo.id, { completed: e.target.checked })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <input
                                            type="text"
                                            value={todo.text}
                                            onChange={(e) => updateTodo(todo.id, { text: e.target.value })}
                                            className={`flex-1 bg-transparent text-gray-900 border-none outline-none ${todo.completed ? 'line-through text-gray-500' : ''
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => deleteTodo(todo.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-600 transition-opacity"
                                            title="Delete todo"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}

                                {/* Add new todo */}
                                <div className="flex items-center space-x-2">
                                    <Plus className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={newTodoText}
                                        onChange={(e) => setNewTodoText(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Add a todo..."
                                        className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 border-none outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Selected Labels */}
                        {selectedLabels.length > 0 && (
                            <div className="px-4 pb-2">
                                <div className="flex flex-wrap gap-1">
                                    {selectedLabels.map((label) => (
                                        <span
                                            key={label}
                                            className="inline-flex items-center px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
                                        >
                                            {label}
                                            <button
                                                type="button"
                                                onClick={() => setSelectedLabels(selectedLabels.filter(l => l !== label))}
                                                className="ml-1 hover:text-red-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between p-4 pt-0">
                            <div className="flex items-center space-x-2">
                                {/* Color picker */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowColorPicker(!showColorPicker)}
                                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                        title="Change color"
                                    >
                                        <Palette className="w-5 h-5 text-gray-600" />
                                    </button>
                                    {showColorPicker && (
                                        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border z-10">
                                            <ColorPicker
                                                selectedColor={selectedColor}
                                                onColorChange={(color) => {
                                                    setSelectedColor(color);
                                                    setShowColorPicker(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Label picker */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowLabelPicker(!showLabelPicker)}
                                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                        title="Add labels"
                                    >
                                        <Tag className="w-5 h-5 text-gray-600" />
                                    </button>
                                    {showLabelPicker && (
                                        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border z-10 p-2 min-w-[200px]">
                                            <div className="max-h-40 overflow-y-auto">
                                                {keepData.labels.map((label) => (
                                                    <button
                                                        key={label}
                                                        type="button"
                                                        onClick={() => {
                                                            if (!selectedLabels.includes(label)) {
                                                                setSelectedLabels([...selectedLabels, label]);
                                                            }
                                                        }}
                                                        className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 ${selectedLabels.includes(label) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                                                            }`}
                                                        disabled={selectedLabels.includes(label)}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm text-gray-600 hover:bg-black/5 rounded transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
                                    disabled={!title.trim() && (noteType === 'text' ? !content.trim() : todos.length === 0)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
