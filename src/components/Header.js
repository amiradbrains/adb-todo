import { Search, Menu, Settings, Grid3X3, List, Archive } from 'lucide-react';

export default function Header({
    searchTerm,
    setSearchTerm,
    showArchived,
    setShowArchived,
    viewMode,
    setViewMode
}) {
    return (
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left section */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Menu className="w-6 h-6 text-gray-600" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">K</span>
                        </div>
                        <h1 className="text-xl font-medium text-gray-700">Keep</h1>
                    </div>
                </div>

                {/* Center - Search */}
                <div className="flex-1 max-w-2xl mx-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search your notes"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 hover:bg-white hover:shadow-md focus:bg-white focus:shadow-md focus:outline-none rounded-lg transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-2">
                    {/* Archive toggle */}
                    <button
                        onClick={() => setShowArchived(!showArchived)}
                        className={`p-2 rounded-full transition-colors ${showArchived
                                ? 'bg-blue-100 text-blue-600'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                        title={showArchived ? 'Show active notes' : 'Show archived notes'}
                    >
                        <Archive className="w-6 h-6" />
                    </button>

                    {/* View mode toggle */}
                    <button
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                        title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
                    >
                        {viewMode === 'grid' ? (
                            <List className="w-6 h-6" />
                        ) : (
                            <Grid3X3 className="w-6 h-6" />
                        )}
                    </button>

                    {/* Settings */}
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                        <Settings className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
