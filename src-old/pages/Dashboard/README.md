# Dashboard Module

This module contains components for the homepage and dashboard functionality of the application.

## Components

- **Dashboard.jsx**: Main dashboard container component with layout for the dashboard pages
- **DataOverview.jsx**: Data overview page showing key metrics and statistics
- **TodoList.jsx**: Todo list component for task management
- **AIAssistant.jsx**: AI assistant component for natural language interaction

## Features

- Display key metrics and indicators
- Show recent updates and notifications
- Provide task management functionality
- Offer AI-powered assistance and guidance

## Routes

- `/dashboard` - Main dashboard route
- `/dashboard/overview` - Data overview page
- `/dashboard/personal/todos` - Todo list page
- `/dashboard/assistant/qa` - AI assistant page

## Usage

```jsx
import Dashboard from '../pages/Dashboard/Dashboard';
import DataOverview from '../pages/Dashboard/DataOverview';
import TodoList from '../pages/Dashboard/TodoList';
import AIAssistant from '../pages/Dashboard/AIAssistant';

// In your router configuration
<Route path="dashboard" element={<Dashboard />}>
  <Route index element={<Navigate to="/dashboard/overview" replace />} />
  <Route path="overview" element={<DataOverview />} />
  <Route path="personal/todos" element={<TodoList />} />
  <Route path="assistant/qa" element={<AIAssistant />} />
</Route>
``` 