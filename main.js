import ModalService from './componentes/modal/modal.service.js';
import RenderUtils from './componentes/renderUtils.js';
const ModalServiceInstance = new ModalService();

const openModalBtn = document.querySelector('[data-open-modal]');
openModalBtn.addEventListener('click', ModalServiceInstance.openModal);

RenderUtils.renderItemLocalStorage();


