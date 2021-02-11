class Lembrete {
    constructor(date, description, color) {
        this._data = date
        this._description = description;
        this._color = color;
        this._section;
    }

    set section(section) {
        this._section = section;
        this._initializeSection(this._section);
    }

    set data(data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    set description(description) {
        this._description = description;
    }

    get description() {
        return this._description;
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }

    _initializeSection = (section) => {
        const accordionBtn = section.querySelector('[data-accordion-button]');
        const checkBtn = section.querySelector('[data-check-button]');
        const trashBtn = section.querySelector('[data-trash-button]');
        const arrow = section.querySelector('[data-accordion-arrow]');
        accordionBtn.addEventListener('click', (event) => this._accordion(event, section, arrow));
        checkBtn.addEventListener('click', (event) => this._setChecked(section));
        trashBtn.addEventListener('click', (event) => this._removeLembrete(section));
    }

    _accordion = (event, section, arrow) => {
        event.preventDefault();
        this._rotateArrow(arrow);
        this._showContent(section);
    }

    _showContent = (section) => {
        section.classList.toggle('show-content');
        const content = section.querySelector('[data-content]');
        content.classList.toggle('show-content');
    }

    _rotateArrow = (arrow) => {
        const hasRotateClass = arrow.classList.contains('rotate');
        hasRotateClass ? arrow.classList.remove('rotate') : arrow.classList.add('rotate');
    }

    _removeLembrete = (section) => {
        section.classList.add('remove');
        section.addEventListener('transitionend', (event) => {
            section.remove();
        })
    }

    _setChecked = (section) => {
        const description = section.querySelector('[data-content-description]');
        description.classList.toggle('checked');
    }
}

export default Lembrete;