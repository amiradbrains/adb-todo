# Fix TypeError in useNotes.js

## Steps to Complete:

- [x] Identify the root cause: missing null checks in filter function
- [x] Fix the filter function in useNotes.js to handle undefined/null title and content
- [x] Test the fix by running the application
- [x] Verify search functionality works correctly

## Root Cause:

The filter function assumes all notes have title and content properties, but when these are undefined/null, calling toLowerCase() throws a TypeError.

## Solution:

Add proper null/undefined checks before calling toLowerCase() on note.title and note.content.

## Changes Made:

- Updated filter function to check if note.title exists before calling toLowerCase()
- Updated filter function to check if note.content exists before calling toLowerCase()
- Added null check for note.labels before using it in label filtering

## Testing Results:

- ✅ Application loads without errors
- ✅ Search functionality works correctly
- ✅ No more TypeError when searching
- ✅ Notes are properly filtered based on search terms
