import React from 'react';

const Toolbox = ({ setTool, setColor }) => {
  return (
    <div>
      <button onClick={() => setTool('pencil')}>Pencil</button>
      <button onClick={() => setTool('rectangle')}>Rectangle</button>
      <input
        type="color"
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};

export default Toolbox;
