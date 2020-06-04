const jsPlumbInstance = jsPlumb.getInstance();
const canvas = document.getElementById('canvas');
jsPlumbInstance.setContainer(canvas);

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
        //IMPL for each pin
    }

    level() {
        //IMPL for each pin
    }
}

class PinPassive extends Pin {
    anchor() {
        return "Left";
    }

    level() {
        //IMPL aggregation all connected
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

        setTimeout(() => {
                if (this.parentElement === canvas) {//Q not best practise?
                    this.inputBlock = this.createInputBlock();
                    row.insertBefore(this.inputBlock, row.firstChild);
                    this.outputBlock = this.createOutputBlock();
                    row.insertBefore(this.outputBlock, null);
                    jsPlumbInstance.draggable(this, {
                        containment: 'parent',
                        grid: [15, 15]
                    })
                }
            }, 0
        )

        row.appendChild(this.createSolid());

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
        solid.innerText = this.label();
        solid.className = 'solid';
        return solid;
    }

    label() {
        //IMPL for each element
        return '';
    }

    func() {
        //IMPL for each element
    }
}

class ElementLogic extends Element {
    createInputBlock() {
        return super.createInputBlock();
    }

    createOutputBlock() {
        return super.createOutputBlock();
    }

    func() {
        //IMPL
    }
}

class ElementLogicAnd extends ElementLogic {
    label() {
        return '&';
    }

    func() {
        //IMPL
    }
}

class ElementLogicOr extends ElementLogic {
    label() {
        return '1';
    }

    func() {
        //IMPL
    }
}

class ElementLogicXor extends ElementLogic {
    label() {
        return '=1';
    }

    func() {
        //IMPL
    }
}

class ElementLogicNand extends ElementLogicAnd {
    func() {
        //IMPL
    }
}

class ElementLogicNor extends ElementLogicOr {
    func() {
        //IMPL
    }
}

class ElementLogicNxor extends ElementLogicXor {
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
customElements.define('element-logic-xor', ElementLogicXor, {extends: 'table'});
customElements.define('element-logic-nand', ElementLogicNand, {extends: 'table'});
customElements.define('element-logic-nor', ElementLogicNor, {extends: 'table'});
customElements.define('element-logic-nxor', ElementLogicNxor, {extends: 'table'});