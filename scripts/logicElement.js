class Pin extends HTMLDivElement {
    constructor() {
        super();
        //TODO extract to stylesheet
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
        //TODO extract to stylesheet
        this.className = 'logic-element';

        const row = document.createElement('tr');
        row.appendChild(this.createInputBlock());
        row.appendChild(this.createSolid());
        row.appendChild(this.createOutputBlock());
        this.appendChild(row);
    }

    createInputBlock() {
        const input = document.createElement('td')
        //TODO extract to stylesheet
        input.className = 'logic-input';
        return input;
    }

    createSolid() {
        const solid = document.createElement('td')
        //TODO extract to stylesheet
        solid.className = 'logic-solid';
        return solid;
    }

    createOutputBlock() {
        const output = document.createElement('td')
        //TODO extract to stylesheet
        output.className = 'logic-output';
        return output;
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
