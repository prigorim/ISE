//IMPL default settings
const jsPlumbInstance = jsPlumb.getInstance();

class Pin extends HTMLDivElement {
    constructor() {
        super();
        this.className = 'pin';
        setTimeout(() => jsPlumbInstance.addEndpoint(this,
            {anchor: this.anchor(), connector: "Flowchart"},
            {isSource: true, isTarget: true}),
            0);
    }

    anchor() {
        return 'Center';
    }

    level() {
        //IMPL
    }
}

class PinPassive extends Pin {
    level() {
        //IMPL aggregation all connected
    }

    anchor() {
        return "Left";
    }
}

class PinFunctional extends Pin {
    constructor(func) {
        super();
        this.level = () => func();
    }

    anchor() {
        return "Right";
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
        input.createPinPassive = () => {
            input.appendChild(new PinPassive());
        };
        input.createPinPassive();
        input.createPinPassive();
        return input;
    }

    createOutputBlock() {
        const output = super.createOutputBlock();
        output.appendChild(new PinFunctional(this.func));
        return output;
    }

    func() {
        //IMPL func for each element
    }
}

class ElementLogicAnd extends ElementLogic {
    createSolid() {
        let solid = super.createSolid();
        solid.innerText = '&';
        return solid;
    }

    func() {
        //IMPL
    }
}

class ElementLogicOr extends ElementLogic {
    createSolid() {
        let solid = super.createSolid();
        solid.innerText = '1';
        return solid;
    }

    func() {
        //IMPL
    }
}

customElements.define('element-pin', Pin, {extends: 'div'});
customElements.define('element-pin-input', PinPassive, {extends: 'div'});
customElements.define('element-pin-output', PinFunctional, {extends: 'div'});

customElements.define('element-ise', Element, {extends: 'table'});
customElements.define('element-logic', ElementLogic, {extends: 'table'});
customElements.define('element-logic-and', ElementLogicAnd, {extends: 'table'});
customElements.define('element-logic-or', ElementLogicOr, {extends: 'table'});
