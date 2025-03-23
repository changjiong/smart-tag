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
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Layout/      # Layout components (Header, Sidebar, Footer)
│   │   ├── Forms/       # Form components
│   │   └── Tables/      # Table components
│   ├── context/         # React context for state management
│   ├── mockData/        # Mock data for development
│   ├── pages/           # Page components organized by modules
│   │   ├── Dashboard/   # Dashboard pages
│   │   ├── Tags/        # Tag center pages
│   │   ├── Portrait/    # Customer profile pages
│   │   └── ...          # Other module pages
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
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
