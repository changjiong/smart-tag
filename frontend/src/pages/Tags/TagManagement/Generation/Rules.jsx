// src/pages/Tags/TagManagement/Generation/Rules.jsx
import React, { useState } from 'react';
import TagForm from '../../../../components/Forms/TagForm';

const Rules = () => {
  const [rules, setRules] = useState([]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">规则配置</h2>
      <div className="mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          新建规则
        </button>
      </div>
      <div className="grid gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="border p-4 rounded-lg">
            <h3 className="font-medium">{rule.name}</h3>
            <p className="text-gray-600">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;