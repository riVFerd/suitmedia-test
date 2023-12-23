import React from 'react';

interface PaginateButtonProps {
  label: string;
  active: boolean;
  hasUrl: boolean;
  onClick: () => void;
}

function PaginateButton({label, active, hasUrl, onClick}: PaginateButtonProps) {
  return <button
    onClick={onClick}
    className={`px-4 py-2 border border-gray-300 rounded-md mr-2 ${active && 'bg-primary'} ${!hasUrl && 'opacity-50 cursor-not-allowed'}`}
  >
    {label}
  </button>;
}

export default PaginateButton;
