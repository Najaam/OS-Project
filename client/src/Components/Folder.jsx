import React from 'react';

function Folder({ folderName, folderContent, onBack, onClose }) {
  return (
    <div
      style={{
        width: '90%',
        height: '90%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        position: 'relative',
      }}
    >
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '5px 10px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>

      {/* Folder Content */}
      <h2>{folderName}</h2>
      <div>
        {Object.keys(folderContent || {}).length > 0 ? (
          Object.entries(folderContent).map(([name, content]) => (
            <div key={name} style={{ marginBottom: '10px' }}>
              {typeof content === 'object' ? (
                <div
                  onClick={() => onBack(name)} // go deeper into this folder
                  style={{
                    cursor: 'pointer',
                    color: 'blue',
                  }}
                >
                  📁 {name}
                </div>
              ) : (
                <div style={{ cursor: 'pointer', color: 'black' }}>
                  📄 {name}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>This folder is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Folder;
