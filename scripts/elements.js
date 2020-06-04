const jsPlumbInstance = jsPlumb.getInstance({
    Endpoint: ["Dot", {radius: 5}],
});
const canvas = document.getElementById('canvas');
jsPlumbInstance.setContainer(canvas);

class Pin extends HTMLDivElement {
    constructor() {
        super();
        this.className = 'pin';
        setTimeout(() => jsPlumbInstance.addEndpoint(this,
            //TODO extract to defaults
            {anchor: this.anchor(), connector: "Flowchart"},
            {isSource: true, isTarget: true}
            ),
            0);
    }

    level() {
        return false;
        //IMPL for each pin
    }

    anchor() {
        return '';
        //IMPL for each pin
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
        this.appendChild(row);
        setTimeout(() => {
            row.append(this.components())
            if (this.parentNode === canvas) {
                jsPlumbInstance.draggable(this, {
                    grid: [15, 15],
                    containment: 'parent',
                });
            }
        }, 0);
    }

    components() {
        const nodes = document.createDocumentFragment();
        nodes.appendChild(this.createSolid());
        return nodes;
    }

    createSolid() {
        const solid = document.createElement('td')
        solid.innerText = this.label();
        solid.className = 'solid';
        return solid;
    }

    func() {
        //IMPL for each element
        return false;
    }

    label() {
        //IMPL for each element
        return '';
    }
}

const MixInsInputBlock = Element => class extends Element {
    components() {
        const components = super.components();
        components.insertBefore(this.createPinPassiveBlock(), components.firstChild);
        return components;
    }

    createPinPassiveBlock() {
        return document.createTextNode('');
    }
}

const MixInsPinFunctionalBlock = Element => class extends Element {
    components() {
        const components = super.components();
        components.insertBefore(this.createPinFunctionalBlock(), null);
        return components;
    }

    createPinFunctionalBlock() {
        return document.createTextNode('');
    }
}

class ElementLogic extends MixInsInputBlock(MixInsPinFunctionalBlock(Element)) {
    createPinPassiveBlock() {
        if (this.parentNode === canvas) {
            this.pinPassiveBlock = document.createElement('td');
            this.pinPassiveBlock.appendChild(new PinPassive());
            this.pinPassiveBlock.appendChild(new PinPassive());
            return this.pinPassiveBlock;
        }
        return super.createPinPassiveBlock();
    }

    createPinFunctionalBlock() {
        if (this.parentNode === canvas) {
            const pinFunctionalBlock = document.createElement('td');
            pinFunctionalBlock.appendChild(new PinFunctional(this.func));
            return pinFunctionalBlock;
        }
        return super.createPinFunctionalBlock();
    }

    func() {
        return [...this.pinPassiveBlock.childNodes].map(passivePin => passivePin.level());
    }
}

const MixInsNot = Element => class extends Element {
    createSolid() {
        const solid = super.createSolid();
        const not = document.createElement('div');
        not.className = 'pin-invert';
        solid.appendChild(not);
        return solid;
    }

    func() {
        return !super.func();
    }
}

class ElementLogicAnd extends ElementLogic {
    func() {
        return super.func().some(Boolean);
    }

    label() {
        return '&';
    }
}

class ElementLogicOr extends ElementLogic {
    func() {
        return super.func().every(Boolean);
    }

    label() {
        return '1';
    }
}

class ElementLogicXor extends ElementLogic {
    func() {
        return super.func().filter(Boolean).length === 1;
    }

    label() {
        return '=1';
    }
}

customElements.define('element-pin', Pin, {extends: 'div'});
customElements.define('element-pin-passive', PinPassive, {extends: 'div'});
customElements.define('element-pin-functional', PinFunctional, {extends: 'div'});

customElements.define('element-ise', Element, {extends: 'table'});
customElements.define('element-logic', ElementLogic, {extends: 'table'});

customElements.define('element-logic-and', ElementLogicAnd, {extends: 'table'});
customElements.define('element-logic-or', ElementLogicOr, {extends: 'table'});
customElements.define('element-logic-xor', ElementLogicXor, {extends: 'table'});
customElements.define('element-logic-nand', MixInsNot(ElementLogicAnd), {extends: 'table'});
customElements.define('element-logic-nor', MixInsNot(ElementLogicOr), {extends: 'table'});
customElements.define('element-logic-nxor', MixInsNot(ElementLogicXor), {extends: 'table'});