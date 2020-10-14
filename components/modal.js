import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalComponent = (props) => {
	const { buttonLabel, className, toggle, modal } = props;

	return (
		<div>
			<Button block color='dark' size='lg' onClick={toggle}>
				{buttonLabel}
			</Button>
			<Modal scrollable fade={true} isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Create Movie</ModalHeader>
				<ModalBody>{props.children}</ModalBody>
				<ModalFooter>
					{props.hasSubmit && (
						<Button color='primary' onClick={toggle}>
							Sumbit
						</Button>
					)}
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default ModalComponent;
