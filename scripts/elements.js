class Pin extends HTMLDivElement {
    constructor() {
        super();
        this.className = 'pin';
    }

    level() {
        //IMPL
    }
}

class PinInput extends Pin {
    level() {
    }
}

class PinOutput extends Pin {
    constructor(func) {
        super();
        this.level = () => func();
    }
}

class Element extends HTMLTableElement {
    constructor() {
        super();
        this.className = 'element';
        const row = document.createElement('tr');

        this.inputBlock = this.createInputBlock();
        row.appendChild(this.inputBlock);

        row.appendChild(this.createSolid());

        this.outputBlock = this.createOutputBlock();
        row.appendChild(this.outputBlock);

        this.appendChild(row);
    }

    createInputBlock() {
        return document.createElement('td');
    }

    createOutputBlock() {
        return document.createElement('td');
    }

    createSolid() {
        const solid = document.createElement('td')
        solid.className = 'solid';
        return solid;
    }

    func() {
        //IMPL func for each element
    }
}

class ElementLogic extends Element {
    createInputBlock() {
        const input = super.createInputBlock();
        input.createPinOutput = () => {
            input.appendChild(new PinInput());
        };
        input.createPinOutput();
        input.createPinOutput();
        return input;
    }

    createOutputBlock() {
        const output = super.createOutputBlock();
        output.appendChild(new PinOutput(this.func));
        return output;
    }
}

class ElementLogicAnd extends ElementLogic {
    createSolid() {
        let solid = super.createSolid();
        solid.innerText = '&';
        return solid;
    }

    func() {
    }
}

class ElementLogicOr extends ElementLogic {
    createSolid() {
        let solid = super.createSolid();
        solid.innerText = '1';
        return solid;
    }

    func() {
    }
}

customElements.define('element-pin', Pin, {extends: 'div'});
customElements.define('element-pin-input', PinInput, {extends: 'div'});
customElements.define('element-pin-output', PinOutput, {extends: 'div'});

customElements.define('element-ise', Element, {extends: 'table'});
customElements.define('element-logic', ElementLogic, {extends: 'table'});
customElements.define('element-logic-and', ElementLogicAnd, {extends: 'table'});
customElements.define('element-logic-or', ElementLogicOr, {extends: 'table'});
