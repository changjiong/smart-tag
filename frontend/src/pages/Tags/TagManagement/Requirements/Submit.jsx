// src/pages/Tags/TagManagement/Requirements/Submit.jsx
import React from 'react';
import TagForm from '../../../../components/Forms/TagForm';

const RequirementSubmit = () => {
  const handleSubmit = (values) => {
    console.log('Submitted values:', values);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">提交标签需求</h2>
      <TagForm
        onSubmit={handleSubmit}
        initialValues={{
          name: '',
          type: '',
          description: '',
          businessValue: '',
          priority: 'medium',
        }}
      />
    </div>
  );
};

export default RequirementSubmit;