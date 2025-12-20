# DogFinder 🐕

An intuitive, Tinder-like web application for finding your perfect dog breed! Swipe through different breeds, learn about their characteristics, and save your favorites.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technical Decisions](#technical-decisions)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [API Documentation](#api-documentation)

## ✨ Features

### Mandatory Features

- **Main Page with Swipe Functionality**
  - Swipe left to dislike a breed (❌)
  - Swipe right to like a breed (✅)
  - Swipe up to super like a breed (⭐)
  - Click action buttons as an alternative to swiping
  - Touch and mouse support for all devices
  - Visual feedback during swipes with indicators

- **Details Page**
  - View comprehensive information about each breed:
    - Name
    - Breed group
    - Bred for purpose
    - Weight (metric)
    - Height (metric)
    - Life span
    - Temperament
  - Beautiful card layout with breed images
  - Easy navigation back to main page

- **Persistent State**
  - Progress automatically saved in localStorage
  - Resume from where you left off after page reload
  - Vote history preserved across sessions

- **Responsive Design**
  - Fully responsive on mobile, tablet, and desktop
  - Touch-optimized for mobile devices
  - Adaptive layout for different screen sizes

- **Code Quality**
  - Comprehensive unit tests (24 tests, 100% passing)
  - ESLint for code linting
  - Prettier for code formatting
  - Pre-commit hooks with Husky and lint-staged
  - TypeScript for type safety

## 🛠 Tech Stack

### Core Technologies (Mandatory)

- **React 19.2.0** - Latest stable version
- **TypeScript 5.9.3** - For type safety
- **Vite 7.2.4** - Fast build tool and dev server

### Key Libraries

- **React Router DOM 7.11.0** - For client-side routing
- **@tanstack/react-query 5.90.12** - For efficient data fetching and caching
- **Zod 4.2.1** - For runtime type validation

### Development Tools

- **Vitest 4.0.16** - Fast unit testing framework
- **@testing-library/react 16.3.1** - React component testing utilities
- **ESLint 9.39.2** - Code linting
- **Prettier 3.7.4** - Code formatting
- **Husky 9.1.7** - Git hooks
- **lint-staged 16.2.7** - Run linters on staged files

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd dogfinder
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Get your API key from [The Dog API](https://thedogapi.com/) and add it to `.env`:

```env
VITE_DOG_API_KEY=your_api_key_here
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📁 Project Structure

```
dogfinder/
├── src/
│   ├── config/
│   │   └── api.ts                 # API configuration
│   ├── hooks/
│   │   ├── useBreedNavigation.ts  # Breed navigation logic
│   │   ├── useDogApi.ts           # React Query hooks
│   │   └── useSwipe.ts            # Swipe gesture handling
│   ├── pages/
│   │   ├── MainPage.tsx           # Main swipe interface
│   │   ├── MainPage.css           # Main page styles
│   │   ├── DetailsPage.tsx        # Breed details page
│   │   └── DetailsPage.css        # Details page styles
│   ├── services/
│   │   └── dogApi.ts              # API service layer
│   ├── types/
│   │   └── dog.ts                 # TypeScript type definitions
│   ├── utils/
│   │   └── storage.ts             # LocalStorage utilities
│   ├── test/
│   │   └── setup.ts               # Test configuration
│   ├── App.tsx                    # Root component with routing
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── .husky/                        # Git hooks
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

## 🔧 Technical Decisions

### Why React Query (@tanstack/react-query)?

React Query was chosen for several key reasons:

1. **Automatic Caching** - Reduces unnecessary API calls by caching breed data
2. **Request Deduplication** - Prevents multiple identical API requests
3. **Background Refetching** - Keeps data fresh without user intervention
4. **Error Handling** - Built-in error states and retry logic
5. **Developer Experience** - Minimal boilerplate compared to Redux or Context API

### Why React Router DOM?

React Router DOM provides:

1. **Client-Side Routing** - Fast navigation without page reloads
2. **URL Parameters** - Clean URLs for breed details (e.g., `/breed/123`)
3. **Programmatic Navigation** - Easy navigation from click handlers
4. **Browser History** - Native browser back/forward button support

### Why LocalStorage for State Persistence?

LocalStorage was selected because:

1. **Simplicity** - No backend required for MVP
2. **Instant Persistence** - Data saved immediately
3. **Offline Support** - Works without internet connection
4. **User Privacy** - Data stays on user's device
5. **No Authentication Required** - As per requirements

### Why Vitest over Jest?

Vitest offers several advantages:

1. **Vite Integration** - Same config as build tool
2. **Faster Execution** - Uses Vite's transformation pipeline
3. **ESM Support** - Native ES modules support
4. **Modern Defaults** - TypeScript and JSX work out of the box
5. **Compatible API** - Jest-compatible API for easy migration

### Why Separate Service Layer?

The API service layer (`dogApi.ts`) provides:

1. **Separation of Concerns** - Business logic separate from UI
2. **Reusability** - API functions can be used across components
3. **Testability** - Easy to mock for unit tests
4. **Error Handling** - Centralized error handling logic
5. **Type Safety** - Strong typing for API responses

### CSS Approach

Plain CSS was chosen because:

1. **No Additional Dependencies** - Keeps bundle size small
2. **Performance** - No runtime CSS-in-JS overhead
3. **Simplicity** - Easy to understand and maintain
4. **CSS Variables** - Modern CSS features available
5. **Scoped Styles** - Component-specific CSS files

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage

The project includes comprehensive tests for:

- ✅ Storage utilities (14 tests)
- ✅ Swipe hook (6 tests)
- ✅ Main page component (4 tests)

All tests pass successfully with 100% coverage of critical paths.

### Test Files

- `src/utils/storage.test.ts` - LocalStorage operations
- `src/hooks/useSwipe.test.ts` - Swipe gesture handling
- `src/pages/MainPage.test.tsx` - Main page rendering and interactions

## ✅ Code Quality

### Linting

Run ESLint:

```bash
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Formatting

Format code with Prettier:

```bash
npm run format

# Check formatting
npm run format:check
```

### Pre-commit Hooks

The project uses Husky and lint-staged to automatically:

- Lint TypeScript/TSX files
- Format all files
- Run on every commit

This ensures consistent code quality across the project.

## 📚 API Documentation

The application uses [The Dog API](https://thedogapi.com/):

- **Base URL**: `https://api.thedogapi.com/v1`
- **Authentication**: API key via `x-api-key` header
- **OpenAPI Spec**: [Available here](https://docs.thedogapi.com/)

### Key Endpoints Used

- `GET /breeds` - Fetch all dog breeds
- `GET /breeds/:id` - Fetch specific breed
- `POST /votes` - Submit a vote (like/dislike/super like)
- `GET /votes` - Fetch user's votes

## 🎯 Features Implementation Status

### ✅ Mandatory Features (Complete)

- [x] Main page with breed cards
- [x] Swipe left to dislike
- [x] Swipe right to like
- [x] Swipe up to super like
- [x] Action buttons (❌ ✅ ⭐)
- [x] Details page with breed information
- [x] Persistent state (localStorage)
- [x] Responsive design
- [x] Unit tests
- [x] Linting and formatting
- [x] Pre-commit hooks
- [x] Comprehensive README

### 🎁 Bonus Features (Optional)

The bonus features (votes page, filters) were not implemented to focus on delivering high-quality mandatory features with excellent test coverage and documentation.

## 🔐 Environment Variables

Required environment variables:

- `VITE_DOG_API_KEY` - Your API key from [The Dog API](https://thedogapi.com/)

## 🤝 Contributing

1. Ensure all tests pass: `npm test`
2. Ensure linting passes: `npm run lint`
3. Ensure formatting is correct: `npm run format:check`
4. Pre-commit hooks will run automatically

## 📝 License

This project was created as part of a ReactJS assessment.

## 🙏 Acknowledgments

- [The Dog API](https://thedogapi.com/) for providing the dog breed data
- [Vite](https://vitejs.dev/) for the amazing build tool
- [React Query](https://tanstack.com/query/latest) for data fetching
- [Vitest](https://vitest.dev/) for testing infrastructure
