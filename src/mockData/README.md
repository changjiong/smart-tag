 # Mock Data

This directory contains mock data files for development and testing purposes. These files provide sample data that mimics the structure and content of real API responses, allowing frontend development to proceed without requiring the backend to be complete.

## Files

- **tags.js**: Mock data for tags and tag-related operations
- **groups.js**: Mock data for customer groups 
- **portraits.js**: Mock data for customer profiles and insights
- **marketing.js**: Mock data for marketing applications
- **users.js**: Mock data for users and authentication
- **templates.js**: Mock data for scenario templates
- **applications.js**: Mock data for business applications

## Usage

Import the mock data in your components to simulate API responses:

```jsx
import { tags } from '../mockData/tags';
import { customerGroups } from '../mockData/groups';
import { customerProfiles } from '../mockData/portraits';

// Use the mock data in your component
function TagList() {
  // Simulate an API call
  const [tagList, setTagList] = useState(tags);
  
  return (
    <div>
      {tagList.map(tag => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </div>
  );
}
```

## Guidelines

- Keep mock data realistic and representative of actual production data
- Maintain consistent data structures between related mock files
- Include edge cases and various states to test all UI scenarios
- Document the data structure in each mock file
- Add new mock files as needed for new features
- Update mock data when the corresponding API contracts change