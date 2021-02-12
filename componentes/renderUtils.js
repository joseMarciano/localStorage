import Lembrete from "../class/Lembrete.js";

const TEMPLATE_CONTENT = (data, description) => {
    return `  
    <button type="button" class="button-content__main" data-accordion-button>
      <label>${data}</label>
      <i class="fas fa-chevron-right icon" data-accordion-arrow></i>
    </button>
    <div class="content__main" data-content>
      <p  data-content-description>${description}</p>
      <div class="content--button-options__main">
        <button type="button" class="button-check__main" data-check-button>
          <i class="fas fa-check"></i>
        </button>
        <button type="button" class="button-trash__main" data-trash-button>
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>     
`};


const renderItemLocalStorage = () => {
    const main = document.querySelector('[data-main-content]');
    const lembretes = JSON.parse(localStorage.getItem('lembretes')) || [];
    if (!main.children.length && lembretes.length) {
        lembretes.forEach(lembrete => {
            renderContent(new Lembrete(lembrete.data, lembrete.description, lembrete.color));
        });
    }
}

const setColorContent = (lembrete, section) => {
    const btn = section.querySelector('[data-accordion-button]');
    btn.style.backgroundColor = lembrete.color;
}

const renderContent = (lembrete) => {
    const main = document.querySelector('[data-main-content]');
    const section = document.createElement('section');
    section.classList.add('container-content__main');
    section.setAttribute('data-content-main', '');
    section.innerHTML = TEMPLATE_CONTENT(lembrete.data, lembrete.description);
    setColorContent(lembrete, section);
    main.appendChild(section);
    lembrete.section = section;
}

export default { renderContent, renderItemLocalStorage };