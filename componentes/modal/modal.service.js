import Lembrete from '../../class/Lembrete.js';
import RenderUtils from '../renderUtils.js';

const ATRIBUTE_COLOR_SELECTED = 'data-color-selected';
const ICON_SELECTED = 'fa-tint';
const ICON_NOT_SELECTED = 'fa-tint-slash';

const TEMPLATE_MODAL = `
    <section class="modal">
        <header class="header__modal">
            <h2 class="title__modal">Adicionando um novo lembrete</h2>
            <span class="icon" data-close-modal-btn><i class="fa fa-times-circle"></i></span>
        </header>
        <main class="main__modal">
            <form>
                <label for="description-modal" class="label__modal block">Descreva o lembrete:</label>
                <textarea required id="description-modal" class="text-area__modal" data-description rows="3"></textarea>
                <div class="container-data-color__row">
                    <div class="date--container__modal">
                        <label class="label__modal block">Data:</label>
                        <input required class="input__modal" data-date type="datetime-local">
                    </div>
                    <div class="color--container__modal">
                        <label class="label__modal block">Cor:</label>
                        <span class="color--options__modal" data-options-color>
                            <i class="fa fa-tint select--color-icon icon" ${ATRIBUTE_COLOR_SELECTED}></i>
                            <i class="fa fa-tint-slash select--color-icon icon"></i>
                            <i class="fa fa-tint-slash select--color-icon icon"></i>
                            <i class="fa fa-tint-slash select--color-icon icon"></i>
                        </span>
                    </div>
                </div>
                <div class="button-container__modal">
                    <button class="button--save__modal button" data-save-button>Salvar</button>
                    <button class="button--save-new__modal button" data-save-button="true">Salvar e adicionar novo</button>
                </div>
            </form>
        </main>
        <footer class="footer__modal"></footer>
    </section>
`;

// const TEMPLATE_CONTENT = (data, description) => {
//     return `  
//     <button type="button" class="button-content__main" data-accordion-button>
//       <label>${data}</label>
//       <i class="fas fa-chevron-right icon" data-accordion-arrow></i>
//     </button>
//     <div class="content__main" data-content>
//       <p  data-content-description>${description}</p>
//       <div class="content--button-options__main">
//         <button type="button" class="button-check__main" data-check-button>
//           <i class="fas fa-check"></i>
//         </button>
//         <button type="button" class="button-trash__main" data-trash-button>
//           <i class="fas fa-trash-alt"></i>
//         </button>
//       </div>
//     </div>     
// `};

class ModalService {

    constructor() {
    }

    _createModal = () => {
        const body = document.querySelector('body');
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content', 'show-modal');
        modalContent.setAttribute('data-modal-content', '');
        modalContent.innerHTML = TEMPLATE_MODAL;
        body.appendChild(modalContent);
        this._addEventListenerToCloseModal(modalContent, body);
        this._addEventListenerToAllBtnColors();
        this._addEventListenerToAllButtonSave(modalContent);
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

    _addEventListenerToAllBtnColors() {
        const optionsColor = this._getOptionsColor();
        optionsColor.forEach(color => {
            color.addEventListener('click', this._selectColor);
        });
    }

    _addEventListenerToAllButtonSave(modalContent) {
        document.querySelectorAll('[data-save-button]')
            .forEach(button => button.addEventListener('click', this._save));
    }

    _save = (event) => {
        event.preventDefault();
        let description = document.querySelector('[data-description]');
        let date = document.querySelector('[data-date]');
        let colorElement = document.querySelector(`[${ATRIBUTE_COLOR_SELECTED}]`);
        let color = getComputedStyle(colorElement).color;
        const storageLembretes = JSON.parse(localStorage.getItem('lembretes')) || [];

        storageLembretes.push({ date:date.value, description:description.value,color })
        localStorage.setItem('lembretes', JSON.stringify(storageLembretes));
        RenderUtils.renderContent(new Lembrete(date.value, description.value, color));

        if (event.currentTarget.getAttribute('data-save-button') === 'true') {
            description.value = '';
            date.value = '';

        } else {
            const body = document.querySelector('body');
            const modalContent = document.querySelector('[data-modal-content]');
            body.removeChild(modalContent);
        }
    }

    // _renderContent = (lembrete) => {
    //     const main = document.querySelector('[data-main-content]');
    //     const section = document.createElement('section');
    //     section.classList.add('container-content__main');
    //     section.setAttribute('data-content-main', '');
    //     section.innerHTML = TEMPLATE_CONTENT(lembrete.data, lembrete.description);
    //     this._setColorContent(lembrete, section);
    //     main.appendChild(section);
    //     lembrete.section = section;
    // }

    // _setColorContent = (lembrete, section) => {
    //     const btn = section.querySelector('[data-accordion-button]');
    //     btn.style.backgroundColor = lembrete.color;
    // }

    _getOptionsColor = () => {
        const modalContent = document.querySelector('[data-modal-content]');
        const optionsParent = modalContent.querySelector('[data-options-color]');
        const optionsColor = [];
        for (let i = 0; i < optionsParent.children.length; i++) {
            optionsColor.push(optionsParent.children[i]);
        }
        return optionsColor;
    }

    _selectColor = (event) => {
        this._removeIconSelected();
        this._removeAttrSelected();
        this._changeCurrentIconClicked(event.currentTarget);
        this._addAttrSelectedInCurrent(event.currentTarget);
    }

    _removeIconSelected() {
        const optionsColor = this._getOptionsColor();
        optionsColor.forEach((color) => {
            color.classList.remove(ICON_SELECTED);
            color.classList.add(ICON_NOT_SELECTED);
        });

    }

    _removeAttrSelected(event) {
        const optionsColor = this._getOptionsColor();
        optionsColor.forEach((color) => {
            color.removeAttribute(ATRIBUTE_COLOR_SELECTED);
        });
    }
    _addAttrSelectedInCurrent(currentTarget) {
        currentTarget.setAttribute(ATRIBUTE_COLOR_SELECTED, '');
    }

    _changeCurrentIconClicked(currentTarget) {
        currentTarget.classList.remove(ICON_NOT_SELECTED);
        currentTarget.classList.add(ICON_SELECTED);
    }

}
export default ModalService;