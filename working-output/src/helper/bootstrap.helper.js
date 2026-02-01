class hBootstrap {
	card(title, footerElement) {
		const self = this;

		const card = document.createElement('div');
		card.classList.add(
				'card',
				'shadow',
				'mb-4',
			);

		const header = document.createElement('div');
		header.classList.add(
				'card-header',
			);

		if (title instanceof Element || title instanceof HTMLDocument) {
			header.append(title);
		} else {
			const h4 = document.createElement('h4');
			h4.innerText = String(title);
			header.append(h4);
		}

		const body = document.createElement('div');
		body.classList.add(
				'card-body',
				'align-items-center'
			);

		const ret = { card, header, body };

		card.append(header, body);

		if (footerElement === undefined) return ret;

		const footer = document.createElement('div');
		footer.classList.add('card-footer');
		footer.append(footerElement);

		card.append(footer);

		ret.footer = footer;

		return ret;
	}

	row(components = [], classNames = [ 'mb-4' ]) {
		const self = this;

		const row = document.createElement('div');
		row.classList.add(
			'row'
		);

		for (const item of components) {
			const col = document.createElement('div');
			col.classList.add('col');
			col.append(item);

			row.append(col);
		}

		for (const cl of classNames) {
			row.classList.add(cl);
		}

		return row;
	}

	button(){
		const self = this;

		const button = document.createElement('button');	
		button.classList.add('btn');
		button.setAttribute('type', 'button');

		return button;
	}

	buttonModal(modalId = "default-modal"){
		const self = this;

		const button = document.createElement('button');	
		button.classList.add('btn');
		button.setAttribute('type', 'button');
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', `#${modalId}`);

		return button;
	}

	modal(modalId = "default-modal"){
		const self = this;

		const modal = document.createElement('div');
		modal.classList.add('modal', 'fade');
		modal.setAttribute('id', modalId);
		modal.setAttribute('tab-index', '-1');
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('aria-hidden', 'true');
		modal.setAttribute('aria-labelledby', `${modalId}-title`);

		const modalDialog = document.createElement('div');
		modalDialog.classList.add('modal-dialog');
		modalDialog.setAttribute('role', 'document');
		modal.append(modalDialog);

		const modalContent = document.createElement('div');
		modalContent.classList.add('modal-content');
		modalDialog.append(modalContent);

		const modalHeader = document.createElement('div');
		modalHeader.classList.add('modal-header');
		modalContent.append(modalHeader);

		const modalTitle = document.createElement('h5');
		modalTitle.classList.add('modal-title');
		modalTitle.setAttribute('id', `${modalId}-title`);
		modalHeader.append(modalTitle);

		const xCloseButton = document.createElement('button');
		xCloseButton.setAttribute('type', 'button');
		xCloseButton.classList.add('close')
		xCloseButton.setAttribute('data-dismiss', 'modal');
		xCloseButton.setAttribute('aria-label', 'Close');
		modalTitle.append(xCloseButton);

		const iconCloseButton = document.createElement('span');
		iconCloseButton.innerHTML = '&times;';
		iconCloseButton.setAttribute('aria-hidden', 'true')
		xCloseButton.append(iconCloseButton);

		const body = document.createElement('div');
		body.classList.add('modal-body');
		modalContent.append(body);

		const footer = document.createElement('div');
		footer.classList.add('modal-footer');
		modalContent.append(footer);

		const closeButton = document.createElement('button');
		closeButton.setAttribute('type', 'button');
		closeButton.classList.add('btn', 'mb-2', 'btn-secondary')
		closeButton.setAttribute('data-dismiss', 'modal');
		closeButton.innerText = 'Batal';
		footer.append(closeButton);

		return {
			modal,
			header: modalHeader,
			title: modalTitle,
			body,
			footer
		}

	}

	iconFe(){
		const self = this;

		const icon = document.createElement('span');
		icon.classList.add('fe');

		return icon;
	}
}

export default new hBootstrap();
