class Lembrete {
    constructor() {
        this._data;
        this._description;
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
}

export default Lembrete;