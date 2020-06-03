class Pin extends HTMLDivElement {
    constructor() {
        super();
        this.className = 'logic-pin';
    }

    value() {
        //IMPL вычисление значения на пине
    }
}

class InputPin extends Pin {
    constructor() {
        super();
    }
}

class OutputPin extends Pin {
    constructor() {
        super();
    }
}

class LogicElement extends HTMLTableElement {
    constructor() {
        super();
        this.className = 'logic-element';

        const row = document.createElement('tr');
        row.appendChild(this.createInputBlock());
        row.appendChild(this.createSolid());
        row.appendChild(this.createOutputBlock());
        this.appendChild(row);
    }

    createInputBlock() {
        return document.createElement('td');
    }

    createSolid() {
        const solid = document.createElement('td')
        solid.className = 'logic-solid';
        return solid;
    }

    createOutputBlock() {
        return document.createElement('td');
    }
}

class LogicElementAnd extends LogicElement {
    createSolid() {
        let solid = super.createSolid();
        solid.innerText = '&';
        return solid;
    }

    createInputBlock() {
        let input = super.createInputBlock();
        input.appendChild(new InputPin());
        input.appendChild(new InputPin());
        return input;
    }

    createOutputBlock() {
        let output = super.createOutputBlock();
        output.appendChild(new OutputPin());
        return output;
    }
}

customElements.define('logic-pin', Pin, {extends: 'div'});
customElements.define('input-pin', InputPin, {extends: 'div'});
customElements.define('output-pin', OutputPin, {extends: 'div'});

customElements.define('logic-element', LogicElement, {extends: 'table'});
customElements.define('logic-element-and', LogicElementAnd, {extends: 'table'});
