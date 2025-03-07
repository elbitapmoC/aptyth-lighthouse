'use client';

import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon, className, children }) => {
  return (
    <div
      className={clsx(
        'bg-white shadow-md rounded-lg p-6 text-center flex flex-col items-center',
        className
      )}
    >
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default Card;
