import React from "react";

const Subheader = ({ actions = [] }) => {
  if (!actions.length) return null; 

  return (
    <div className="flex justify-end gap-3 mb-4">
      {actions.map(({ text, onClick, icon: Icon, className }, index) => (
        <button
          key={index}
          onClick={onClick}
          className={`flex items-center bg-blue-900 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors ${className || ""}`}
        >
          {Icon && <Icon className="w-5 h-5 mr-2" />}
          {text}
        </button>
      ))}
    </div>
  );
};

export default Subheader;
