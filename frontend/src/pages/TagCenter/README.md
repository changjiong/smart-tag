# Tag Center Module

This module contains components for tag management, creation, approval, and quality monitoring.

## Components

- **TagMarket.jsx**: Tag marketplace component for browsing and discovering tags
- **TagDetail.jsx**: Tag detail component for viewing tag information
- **TagCreation.jsx**: Tag creation component for submitting new tag requirements
- **TagApproval.jsx**: Tag approval component for reviewing and approving tags
- **TagQuality.jsx**: Tag quality component for monitoring tag quality and health

## Features

- Browse and search available tags
- View detailed tag information and metadata
- Submit new tag requirements
- Configure tag rules and SQL
- Approve and review tags
- Monitor tag quality and health

## Routes

- `/tags` - Main tag center route
- `/tags/market` - Tag marketplace
- `/tags/detail/:id` - Tag detail page
- `/tags/management/creation/submit` - Tag creation form
- `/tags/management/approval/pending` - Tag approval list
- `/tags/quality/assessment` - Tag quality assessment

## Data Models

Tags in the system follow this data structure:

```javascript
{
  id: String,                 // Unique identifier
  name: String,               // Tag name
  description: String,        // Tag description
  category: String,           // Tag category
  dataType: String,           // Data type (String, Number, Boolean, etc.)
  createdBy: String,          // Creator username
  createdAt: Date,            // Creation date
  updatedAt: Date,            // Last update date
  status: String,             // Status (Draft, Pending, Approved, Rejected, Active)
  version: String,            // Version number
  calculationLogic: String,   // SQL or rule definition
  coverage: Number,           // Percentage of customers covered
  qualityScore: Number,       // Quality score (0-100)
  dependencies: Array         // Array of tag IDs this tag depends on
}
```

## Usage

```jsx
import TagMarket from '../pages/TagCenter/TagMarket';
import TagDetail from '../pages/TagCenter/TagDetail';
import TagCreation from '../pages/TagCenter/TagCreation';

// In your router configuration
<Route path="tags">
  <Route index element={<Navigate to="/tags/market" replace />} />
  <Route path="market" element={<TagMarket />} />
  <Route path="detail/:id" element={<TagDetail />} />
  <Route path="management/creation/submit" element={<TagCreation />} />
</Route>
``` 