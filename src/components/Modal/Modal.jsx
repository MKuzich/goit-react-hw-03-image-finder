import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ url, name }) => {
  return (
    <Overlay>
      <ModalWindow>
        <img src={url} alt={name} />
      </ModalWindow>
    </Overlay>
  );
};
