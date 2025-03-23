// src/pages/PortraitAnalysis/PortraitAnalysis.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerPortrait from './CustomerPortrait';
import TagDistribution from './TagDistribution';
import GroupCharacteristics from './GroupCharacteristics';
import PortraitComparison from './PortraitComparison';

export default function PortraitAnalysis() {
  return (
    <Routes>
      <Route index element={<Navigate to="customer" />} />
      <Route path="customer" element={<CustomerPortrait />} />
      <Route path="tag-distribution" element={<TagDistribution />} />
      <Route path="group-characteristics" element={<GroupCharacteristics />} />
      <Route path="comparison" element={<PortraitComparison />} />
    </Routes>
  );
}