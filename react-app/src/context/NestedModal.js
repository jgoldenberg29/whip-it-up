import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const NestedModalContext = React.createContext();

export function NestedModalProvider({ children }) {
  const nestedModalRef = useRef();
  const [nestedModalContent, setNestedModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onNestedModalClose, setOnNestedModalClose] = useState(null);

  const closeNestedModal = () => {
    setNestedModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onNestedModalClose === 'function') {
      setOnNestedModalClose(null);
      onNestedModalClose();
    }
  };

  const contextValue = {
    nestedModalRef, // reference to modal div
    nestedModalContent, // React component to render inside modal
    setNestedModalContent, // function to set the React component to render inside modal
    setOnNestedModalClose, // function to set the callback function called when modal is closing
    closeNestedModal // function to close the modal
  };

  return (
    <>
      <NestedModalContext.Provider value={contextValue}>
        {children}
      </NestedModalContext.Provider>
      <div ref={nestedModalRef} />
    </>
  );
}

export function NestedModal() {
  const { nestedModalRef, nestedModalContent, closeNestedModal } = useContext(NestedModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!nestedModalRef || !nestedModalRef.current || !nestedModalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="nested-modal">
      <div id="nested-modal-background" onClick={closeNestedModal} />
      <div id="nested-modal-content">
        {nestedModalContent}
      </div>
    </div>,
    nestedModalRef.current
  );
}

export const useNestedModal = () => useContext(NestedModalContext);
