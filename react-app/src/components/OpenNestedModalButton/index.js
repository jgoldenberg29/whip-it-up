import React from 'react';
import { useNestedModal } from '../../context/NestedModal';

function OpenNestedModalButton({
  nestedModalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onNestedModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setNestedModalContent, setOnNestedModalClose } = useNestedModal();

  const onClick = () => {
    if (onNestedModalClose) setOnNestedModalClose(onNestedModalClose);
    setNestedModalContent(nestedModalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button onClick={onClick}>{buttonText}</button>
  );
}

export default OpenNestedModalButton;
