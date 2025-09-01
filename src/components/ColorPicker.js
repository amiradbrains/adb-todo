import { Check } from 'lucide-react';
import { noteColors, colorOptions } from '../utils/noteColors';

export default function ColorPicker({ selectedColor, onColorChange, className = '' }) {
    return (
        <div className={`flex flex-wrap gap-2 p-2 ${className}`}>
            {colorOptions.map((colorName) => {
                const colorConfig = noteColors[colorName];
                const isSelected = selectedColor === colorName;

                return (
                    <button
                        key={colorName}
                        onClick={() => onColorChange(colorName)}
                        className={`
                            w-8 h-8 rounded-full border-2 flex items-center justify-center
                            transition-all duration-200 hover:scale-110
                            ${colorConfig.bg} ${colorConfig.border}
                            ${isSelected ? 'ring-2 ring-gray-400 ring-offset-1' : ''}
                        `}
                        title={colorConfig.name}
                    >
                        {isSelected && (
                            <Check className="w-4 h-4 text-gray-700" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
