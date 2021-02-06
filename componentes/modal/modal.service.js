import Lembrete from '../../class/Lembrete.js';

const TEMPLATE_MODAL = `
    <section class="modal">
        <header class="header__modal">
            <h2 class="title__modal">Adicionando um novo lembrete</h2>
            <span class="icon" data-close-modal-btn><i class="fa fa-times-circle"></i></span>
        </header>
        <main class="main__modal">
            <form>
                <label for="description-modal" class="label__modal block">Descreva o lembrete:</label>
                <textarea id="description-modal" class="text-area__modal" rows="3"></textarea>
                <label class="label__modal block">Data:</label>
                <input class="input__modal" type="datetime-local">
                <div class="button-container__modal">
                    <button class="button--save__modal button">Salvar</button>
                    <button class="button--save-new__modal button">Salvar e adicionar novo</button>
                </div>
            </form>
        </main>
        <footer class="footer__modal"></footer>
    </section>
`;

class ModalService {
    
    constructor(){
        this._lembrete = new Lembrete();
    }

    _createModal = () => {
        const body = document.querySelector('body');
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content', 'show-modal');
        modalContent.setAttribute('data-modal-content', '');
        modalContent.innerHTML = TEMPLATE_MODAL;
        this._addEventListenerToCloseModal(modalContent, body);
        body.appendChild(modalContent);
    }

    _closeModal = (modalContent, body) => {
        body.removeChild(modalContent);
    }


    openModal = () => {
        this._createModal();
    }

    _addEventListenerToCloseModal = (modalContent, body) => {
        const closeModalBtn = modalContent.querySelector('[data-close-modal-btn]');
        closeModalBtn.addEventListener('click', () => this._closeModal(modalContent, body));
    }
    
}
export default ModalService;