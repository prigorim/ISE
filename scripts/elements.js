const jsPlumbInstance = jsPlumb.getInstance({
    Endpoint:[ "Dot", { radius:5} ],
});
const canvas = document.getElementById('canvas');
jsPlumbInstance.setContainer(canvas);

class Pin extends HTMLDivElement {
    constructor() {
        super();
        this.className = 'pin';
        setTimeout(() => jsPlumbInstance.addEndpoint(this,
            {anchor: this.anchor(), connector: "Flowchart"},
            {isSource: true, isTarget: true}
            ),
            0);
    }

    level() {
        //IMPL for each pin
    }

    anchor() {
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
    func() {
        //IMPL
    }

    createPinPassiveBlock() {
        if (this.parentNode === canvas) {
            this.pinPassiveBlock = document.createElement('td');
            this.pinPassiveBlock.appendChild(new PinPassive());
            return this.pinPassiveBlock;
        }
        return super.createPinPassiveBlock();
    }

    createPinFunctionalBlock() {
        if (this.parentNode === canvas) {
            const pinFunctionalBlock = document.createElement('td');
            pinFunctionalBlock.appendChild(new PinFunctional(this.func));
            pinFunctionalBlock.appendChild(new PinFunctional(this.func));
            return pinFunctionalBlock;
        }
        return super.createPinFunctionalBlock();
    }
}

class ElementLogicAnd extends ElementLogic {
    func() {
        //IMPL
    }

    label() {
        return '&';
    }
}

class ElementLogicOr extends ElementLogic {
    func() {
        //IMPL
    }

    label() {
        return '1';
    }
}

class ElementLogicXor extends ElementLogic {
    func() {
        //IMPL
    }

    label() {
        return '=1';
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
customElements.define('element-pin-passive', PinPassive, {extends: 'div'});
customElements.define('element-pin-functional', PinFunctional, {extends: 'div'});

customElements.define('element-ise', Element, {extends: 'table'});
customElements.define('element-logic', ElementLogic, {extends: 'table'});

customElements.define('element-logic-and', ElementLogicAnd, {extends: 'table'});
customElements.define('element-logic-or', ElementLogicOr, {extends: 'table'});
customElements.define('element-logic-xor', ElementLogicXor, {extends: 'table'});
customElements.define('element-logic-nand', ElementLogicNand, {extends: 'table'});
customElements.define('element-logic-nor', ElementLogicNor, {extends: 'table'});
customElements.define('element-logic-nxor', ElementLogicNxor, {extends: 'table'});