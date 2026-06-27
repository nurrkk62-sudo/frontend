import React from 'react';
import * as FiIcons from 'react-icons/fi';
import * as TbIcons from 'react-icons/tb';

export const CategoryIcon = ({ iconName, className = "w-6 h-6" }) => {
  let IconComponent = FiIcons.FiTool; // Default fallback

  if (iconName && FiIcons[iconName]) {
    IconComponent = FiIcons[iconName];
  } else if (iconName && TbIcons[iconName]) {
    IconComponent = TbIcons[iconName];
  }

  return <IconComponent className={className} />;
};
