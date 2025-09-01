export const noteColors = {
    default: {
        name: 'Default',
        bg: 'bg-white',
        border: 'border-gray-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    },
    yellow: {
        name: 'Yellow',
        bg: 'bg-yellow-100',
        border: 'border-yellow-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    },
    orange: {
        name: 'Orange',
        bg: 'bg-orange-100',
        border: 'border-orange-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    },
    red: {
        name: 'Red',
        bg: 'bg-red-100',
        border: 'border-red-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    },
    pink: {
        name: 'Pink',
        bg: 'bg-pink-100',
        border: 'border-pink-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    },
    purple: {
        name: 'Purple',
        bg: 'bg-purple-100',
        border: 'border-purple-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    },
    blue: {
        name: 'Blue',
        bg: 'bg-blue-100',
        border: 'border-blue-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    },
    teal: {
        name: 'Teal',
        bg: 'bg-teal-100',
        border: 'border-teal-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    },
    green: {
        name: 'Green',
        bg: 'bg-green-100',
        border: 'border-green-200',
        hover: 'hover:shadow-md',
        text: 'text-gray-900'
    }
};

export const getColorClasses = (colorName) => {
    return noteColors[colorName] || noteColors.default;
};

export const colorOptions = Object.keys(noteColors);
