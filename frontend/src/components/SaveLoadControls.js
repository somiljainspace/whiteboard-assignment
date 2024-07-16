import React from 'react';

const SaveLoadControls = ({ onSave, onLoad }) => {
  return (
    <div>
      <button onClick={onSave}>Save</button>
      <button onClick={onLoad}>Load</button>
    </div>
  );
};

export default SaveLoadControls;
