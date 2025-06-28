import React, { useState } from 'react';
import { GiTrashCan } from 'react-icons/gi';

const Solution = ({ insights }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  if (!insights || insights.length === 0) {
    return <p className="text-center mt-6 text-gray-600">No insights available.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Item name buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {insights.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedItem(item)}
            className={`p-2 px-3 rounded-xl border-2 font-semibold transition-all duration-200
              ${selectedItem?.name === item.name ? 'bg-indigo-500 text-white border-indigo-500' : 'border-indigo-500 text-indigo-700 hover:bg-indigo-100'}`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Show selected item insights */}
      {selectedItem ? (
        <div className="p-4 rounded-xl shadow-md bg-white border-4 border-indigo-500 ">
          <div className='flex gap-4'>
            <div className='bg-indigo-500 font-semibold size-16 text-4xl rounded-xl text-white flex justify-center items-center'>
              <GiTrashCan />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-indigo-500 text-center">{selectedItem.name}</h2></div>
          <div className='mt-3 text-start'>
            <p className='mt-2'><strong>Type:</strong> {selectedItem.type}</p>
            <p className='mt-2'><strong>Recyclability:</strong> {selectedItem.recyclability}</p>
            {/* <p className='mt-2'><strong>Fun Fact:</strong> {selectedItem.funFact}</p> */}
          </div>
          <div className='mt-4 bg-indigo-50 p-4 rounded-xl'>
            <h2 className='text-2xl font-semibold text-indigo-800'>Did you know?</h2>
            <p className='mt-2 text-indigo-700'>{selectedItem.funFact}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Click on a material to view its insights.</p>
      )}
    </div>
  );
};

export default Solution;


