import { useState } from 'react';

export const useRoutineEditor = () => {
  const [activeBlocks, setActiveBlocks] = useState([]);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      title: '',
      exercises: [{ id: Date.now() + 1, name: '', detail: '' }]
    };
    setActiveBlocks(prev => [...prev, newBlock]);
  };

  const removeBlock = (id) => {
    setActiveBlocks(prev => prev.filter(block => block.id !== id));
  };

  const clearBlocks = () => setActiveBlocks([]);

  return { activeBlocks, addBlock, removeBlock, clearBlocks };
};