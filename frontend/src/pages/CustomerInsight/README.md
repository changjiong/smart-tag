# Customer Insight Module

This module contains components for customer profiling, group management, and analysis tools.

## Components

- **CustomerProfile.jsx**: Single customer profile view
- **CustomerSearch.jsx**: Customer search and lookup
- **GroupManagement.jsx**: Customer group management
- **GroupCreation.jsx**: Customer group creation
- **GroupAnalysis.jsx**: Customer group analysis and insights
- **RFMAnalysis.jsx**: RFM (Recency, Frequency, Monetary) analysis tool
- **ComparisonTool.jsx**: Group comparison tool
- **FunnelAnalysis.jsx**: Customer funnel analysis

## Features

- View detailed customer profiles
- Search and lookup customers
- Create and manage customer groups
- Analyze customer groups and segments
- Perform RFM analysis
- Compare different customer groups
- Analyze customer funnels and journeys

## Routes

- `/portrait/customer/single` - Single customer profile view
- `/portrait/customer/search` - Customer search
- `/portrait/groups/list` - Customer group management
- `/portrait/groups/create` - Customer group creation
- `/portrait/groups/analysis` - Customer group analysis
- `/portrait/tools/rfm` - RFM analysis tool
- `/portrait/tools/comparison` - Group comparison tool
- `/portrait/tools/funnel` - Funnel analysis

## Data Models

Customer and Group data structures:

```javascript
// Customer Profile
{
  id: String,                 // Customer ID
  name: String,               // Customer name
  age: Number,                // Age
  gender: String,             // Gender
  contactInfo: {              // Contact information
    email: String,
    phone: String,
    address: String
  },
  tags: Array,                // Array of tag objects
  segments: Array,            // Array of segment names
  behavior: {                 // Behavior metrics
    loginFrequency: Number,
    transactionCount: Number,
    channelPreference: String
  },
  financials: {               // Financial information
    aum: Number,              // Assets under management
    creditScore: Number,
    monthlyIncome: Number
  },
  value: {                    // Customer value metrics
    ltv: Number,              // Lifetime value
    profitability: Number,
    riskScore: Number
  }
}

// Customer Group
{
  id: String,                 // Group ID
  name: String,               // Group name
  description: String,        // Group description
  createdBy: String,          // Creator username
  createdAt: Date,            // Creation date
  updatedAt: Date,            // Last update date
  customerCount: Number,      // Number of customers
  criteria: Array,            // Array of criteria objects
  tags: Array,                // Array of tag objects used
  metrics: {                  // Group metrics
    averageAge: Number,
    genderDistribution: Object,
    averageAUM: Number,
    channelPreferences: Object
  }
}
```

## Usage

```jsx
import CustomerProfile from '../pages/CustomerInsight/CustomerProfile';
import GroupManagement from '../pages/CustomerInsight/GroupManagement';
import GroupAnalysis from '../pages/CustomerInsight/GroupAnalysis';

// In your router configuration
<Route path="portrait">
  <Route path="customer/single/:id" element={<CustomerProfile />} />
  <Route path="groups/list" element={<GroupManagement />} />
  <Route path="groups/analysis/:id" element={<GroupAnalysis />} />
</Route>
``` 