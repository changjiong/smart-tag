# 标签画像中台 (Tag Profile Platform)

A comprehensive platform for tag management, customer profiling, and business applications in the banking industry.

## Project Overview

This platform provides a complete solution for financial institutions to manage customer data tags, create customer profiles, build business applications, and leverage scenario templates for data-driven decision making.

## Key Features

- **标签中心 (Tag Center)**: Tag asset management, tag creation, approval, and quality monitoring
- **客群画像 (Customer Profile)**: Customer view, group management, and analysis tools
- **业务应用中心 (Business Application Center)**: Marketing and risk management applications
- **场景模板 (Scenario Templates)**: Template management and application development
- **开放能力 (Open Capabilities)**: API management and integration services
- **系统管理 (System Management)**: User permissions, system settings, and data governance

## Project Structure

```
./
├── .git/                # Git repository data
├── .github/             # GitHub specific files (e.g., workflows)
├── .cursor/             # Cursor specific files
├── docs/                # Project documentation
├── node_modules/        # Project dependencies (managed by pnpm)
├── src/
│   ├── assets/          # Static assets (images, fonts, etc.)
│   ├── components/      # Reusable UI components
│   ├── config/          # Configuration files
│   ├── features/        # Feature-specific modules
│   ├── mockData/        # Mock data for development
│   ├── routes/          # Routing configuration
│   ├── services/        # API service integrations
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .cursorignore        # Files ignored by Cursor
├── .gitattributes       # Git attributes
├── .gitignore           # Files ignored by Git
├── Dockerfile           # Docker configuration for containerization
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML entry point
├── package.json         # Project metadata and dependencies
├── pnpm-lock.yaml       # Exact versions of dependencies
├── postcss.config.js    # PostCSS configuration
├── README.md            # This file
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite build tool configuration
```

## Development Guidelines

- Modify `src/pages` directories to add new pages for each module
- Use TailwindCSS utility classes for styling components
- Add mock data to `src/mockData` folder for development
- Follow the React best practices and component structure

## Available Scripts

- `pnpm install` - Install dependencies
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Lint source files
- `pnpm run preview` - Preview production build

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Headless UI
- React Router DOM
