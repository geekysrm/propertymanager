import React from 'react';
import { Modal as ReactModal, ModalBody, ModalTitle } from 'react-bootstrap';

export default function Modal({ header, show, children, onHide }) {
	return (
		<ReactModal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<ReactModal.Header closeButton>
				<ModalTitle id="contained-modal-title-vcenter">{header}</ModalTitle>
			</ReactModal.Header>
			<ModalBody>{children}</ModalBody>
		</ReactModal>
	);
}
