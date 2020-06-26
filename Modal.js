import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const ScoreModal = (props) => {
  const { buttonLabel, className, score } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Trivia Score</ModalHeader>
        <ModalBody>
          {score < 60
            ? `Awww shucks, you got a ${score || 0}%. Better luck next time!`
            : `You've got some mad trivia skills! You got a ${score}%`}
          .{' '}
        </ModalBody>
        <ModalFooter>
          <NavLink to="/">
            <Button color="primary" onClick={toggle}>
              Back to Categories
            </Button>
          </NavLink>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ScoreModal;
