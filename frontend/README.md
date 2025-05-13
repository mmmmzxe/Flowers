# E-Commerce Admin Dashboard

A modern admin dashboard for managing an e-commerce platform, built with React, TypeScript, and Material-UI.

## Features

- 📊 Dashboard with key metrics and statistics
- 🛍️ Product management (CRUD operations)
- 📦 Order management and tracking
- 👥 Customer management
- 🔐 Authentication and authorization
- 📱 Responsive design for all devices

## Tech Stack

- React 18
- TypeScript
- Vite
- Material-UI
- React Router
- Axios
- Redux Toolkit (for state management)

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── services/      # API services
├── theme/         # Material-UI theme configuration
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
