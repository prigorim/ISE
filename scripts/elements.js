class Pin extends HTMLDivElement {
    constructor() {
        super();
        this.className = 'pin';
    }

    value() {
        //IMPL вычисление значения на пине
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
}

class ElementLogic extends Element {
    createInputBlock() {
        const input = super.createInputBlock();
        input.createPin = () => {
            input.appendChild(new Pin());
        };
        input.createPin();
        input.createPin();
        return input;
    }

    createOutputBlock() {
        const output = super.createOutputBlock();
        output.appendChild(new Pin());
        return output;
    }
}

class ElementLogicAnd extends ElementLogic {
    createSolid() {
        let solid = super.createSolid();
        solid.innerText = '&';
        return solid;
    }
}

class ElementLogicOr extends ElementLogic {
    createSolid() {
        let solid = super.createSolid();
        solid.innerText = '1';
        return solid;
    }
}

customElements.define('element-pin', Pin, {extends: 'div'});

customElements.define('element-ise', Element, {extends: 'table'});
customElements.define('element-logic', ElementLogic, {extends: 'table'});
customElements.define('element-logic-and', ElementLogicAnd, {extends: 'table'});
customElements.define('element-logic-or', ElementLogicOr, {extends: 'table'});
