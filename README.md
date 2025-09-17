# Prestige Rentals AI Assistant

This is a modern car rental management system featuring an intelligent AI assistant to help clients find and book their perfect vehicle. This project is set up to run locally using Vite.

## Local Development Setup

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, or pnpm

### Environment Variables

Before you start, you need to set up your Gemini API key.

1.  Create a file named `.env` in the root of the project.
2.  Add your API key to this file:

    ```
    API_KEY=your_gemini_api_key_here
    ```

### Installation

1.  Install the dependencies:

    ```bash
    npm install
    ```

### Running the Development Server

To start the local development server, run:

```bash
npm run dev
```

This will start the Vite development server, and you can view the application at `http://localhost:5173` (the port might vary).

### Building for Production

To create a production build of the application, run:

```bash
npm run build
```

This will create a `dist` folder with the optimized and bundled assets. You can preview the production build locally with:

```bash
npm run preview
```
