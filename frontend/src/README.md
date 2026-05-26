# `src` Folder Overview

This README explains the current front-end source structure, the main app flow, and where mock data has been moved.

## Entry points

- `src/main.jsx`
  - Loads the React app and global styles.
  - Renders the top-level `App` component into the `root` element.

- `src/App.jsx`
  - Holds the main application shell.
  - Switches between the Chats and Community pages.
  - Imports app-level styles from `src/App.css`.

## Pages

- `src/pages/ChatHomePage.jsx`
  - Renders the chat page layout.
  - Includes the reusable header, search, filters, and chat list.

- `src/pages/CommunityHomePage.jsx`
  - Renders the community page layout.
  - Includes the same shared page structure with community data.

## Hooks

- `src/hooks/useWindowSize.jsx`
  - Provides responsive layout support by tracking the browser width.
  - Used by the app for future mobile/desktop enhancements.

## Styles

- `src/index.css`
  - Contains global typography, base variables, and root layout.

- `src/App.css`
  - Contains app-specific layout and component styles.

- `src/styles/theme.js`
  - Contains the app color palette and theme tokens.
  - No longer includes mock data.

## Data stubs

- `src/stubs/mockData.js`
  - Contains the chat and community mock data.
  - Keeps sample data separate from UI logic.

## Components

The `src/components` folder contains reusable UI pieces.

- `Header.jsx`
  - Page header that composes the top bar and navigation pills.

- `TopBar.jsx`
  - Displays the brand logo and a primary action button.

- `NavBar.jsx`
  - Renders secondary navigation pills for the current page.

- `Logo.jsx`
  - Renders the brand mark and title text.

- `BrandMark.jsx`
  - Renders the small brand icon used in the top bar.

- `ViewButton.jsx`
  - A simple action button for starting a new conversation.

## Search bar hooks

The `SearchBar` component uses several React hooks to provide a responsive search experience:

- `useState` stores the current input value as the user types.
- `useDebounce` delays updates to the search query until the user stops typing for a short time (default: 300ms). This reduces the number of search calls and improves performance.
- `useEffect` watches the debounced query and calls `onSearch(debouncedQuery)` whenever it changes, so the search runs only after the debounce delay.
- `useCallback` memoizes the `handleClear` function so it can be reused across renders without unnecessary re-creation.
- `useRef` keeps a reference to the input element so the component can call `focus()` after clearing the search field.

This combination means the search input updates immediately for the user, but the actual search logic only runs after the user pauses typing.

- `FilterBar.jsx`
  - Renders the filter pills used on both pages.

- `FilterComponent.jsx`
  - A reusable pill button for filter categories.

- `ChatBody.jsx`
  - Renders the chat page body: search, filters, chat list.

- `CommunityBody.jsx`
  - Renders the community page body: search, filters, community list.

- `ChatBox.jsx`
  - Renders the list of chat threads from the mock data stub.

- `CommunityBox.jsx`
  - Renders the community groups from the mock data stub.

- `Footer.jsx`
  - Renders the page footer note.

## How the pieces fit together

1. `main.jsx` loads `App.jsx`.
2. `App.jsx` switches between the chat and community pages.
3. Each page uses `Header`, `SearchBar`, `FilterBar`, and a list component.
4. `ChatBox.jsx` and `CommunityBox.jsx` render data from `src/stubs/mockData.js`.
5. `src/styles/theme.js` only defines shared theme tokens.

## Notes

- Mock data is now stored in stubs so style and data are separated.
- The page and component structure is intentionally simple and extendable.
- `src/hooks/useWindowSize.jsx` is available for responsive behavior.
