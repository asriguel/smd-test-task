# Dating.com Registration Form

A modern registration form implementation for Dating.com with TypeScript, SCSS, and Vite.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

Install project dependencies:

```bash
npm install
# or
yarn install
```

## Development

To run the project in development mode with hot reload:

```bash
npm run dev
# or
yarn dev
```

The development server will start at `http://localhost:5173` by default.

## Production Build

To build the project for production:

```bash
npm run build
# or
yarn build
```

The production-ready files will be generated in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

### Production Optimizations

The production build includes the following optimizations:

- JavaScript and CSS minification using Terser
- Tree-shaking to remove unused code
- Image optimization (JPG, PNG, WebP) with quality preservation
- Asynchronous font loading with preload
- Code splitting and vendor chunk optimization
- Source maps for debugging
- HTML minification

## Advanced Features Implemented

The following advanced features have been implemented:

1. **Enhanced Form Validation**
   - Real-time validation on blur
   - Clear error messages on focus
   - Comprehensive email format validation
   - Password length validation (minimum 8 characters)

2. **Authentication Flow**
   - Basic authentication with email/password
   - Automatic token storage in localStorage
   - Automatic redirect for authenticated users
   - Proper error handling for failed authentication

3. **User Experience**
   - Modern modal implementation
   - Keyboard support (Esc to close)
   - Form state management
   - Loading states and error handling
   - Thank You screen with auto-redirect
   - Scroll lock when modal is open

4. **Security**
   - Secure token storage
   - Basic authentication headers
   - No sensitive data exposure

5. **Code Quality**
   - TypeScript implementation
   - SCSS for styling
   - Modern ES6+ features
   - Clean code structure
   - Proper error handling