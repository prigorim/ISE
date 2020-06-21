const jsPlumbInstance = jsPlumb.getInstance({
    Endpoint: ["Dot", {radius: 5}],
});
const canvas = document.getElementById('canvas');
jsPlumbInstance.setContainer(canvas);
let counter = 0;

class Pin extends HTMLDivElement {
    constructor() {
        super();
        this.className = 'pin';
        setTimeout(() => jsPlumbInstance.addEndpoint(this,
            //TODO extract to defaults
            {
                anchor: this.anchor(),
                paintStyle: {
                    fill: "transparent",
                    //outlineStroke: "#FFFFFF",
                    outlineWidth: 1,
                    opacity: "0.5",
                },
                hoverPaintStyle: {
                    fill: "rgba(100,139,237,1)"
                },
                connector: "Flowchart"
            },
            {isSource: true, isTarget: true}),
            0);
        this.onclick = () => console.log(this.level());
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
        return jsPlumbInstance.getConnections({target: this.id})
            .map(connection => connection.source)
            .concat
            (jsPlumbInstance.getConnections({source: this.id})
                .map(connection => connection.target)
            )
            .filter(pin => pin instanceof PinFunctional)
            .map(pin => pin.level())
            .some(Boolean)
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

class PinBlock extends HTMLTableCellElement {
    constructor(buttons) {
        super();
        //
        // if (buttons) {
        //     this.appendChild(this.createPinIncButton());
        //     this.appendChild(this.createPinDecButton());
        //     this.appendChild(this.createPinFlipHorizontalButton());
        //     this.appendChild(this.createPinFlipVerticalButton());
        //     this.appendChild(this.createPinLeftButton());
        //     this.appendChild(this.createPinRightButton());
        // }
        this.pinCount = 0;
        //TODO extract to mix-ins
    }

    createPinDecButton() {
        const decButton = document.createElement('button');
        decButton.className = 'logButton'
        decButton.textContent = '﹣';
        decButton.style = 'left: 1px;';
        decButton.onclick = () => this.removePin();
        return decButton;
    }

    createPinIncButton() {
        const incButton = document.createElement('button');
        incButton.className = 'logButton';
        incButton.textContent = '+';
        incButton.style = 'left: 16px;';
        incButton.onclick = () => this.addPin(this.pinCount);
        incButton.enabled = this.pinCount > 1;
        return incButton;
    }

    createPinFlipHorizontalButton() {
        const FlipHorizontalButton = document.createElement('button');
        FlipHorizontalButton.className = 'logButton'
        FlipHorizontalButton.textContent = '⇋';
        FlipHorizontalButton.style = 'left: 31px;';
        return FlipHorizontalButton;
    }

    createPinFlipVerticalButton() {
        const FlipVerticalButton = document.createElement('button');
        FlipVerticalButton.className = 'logButton'
        FlipVerticalButton.textContent = '⥮';
        FlipVerticalButton.style = 'left: 46px;';
        return FlipVerticalButton;
    }

    createPinLeftButton() {
        const LeftButton = document.createElement('button');
        LeftButton.className = 'logButton'
        LeftButton.textContent = '↶';
        LeftButton.style = 'left: 61px;';
        return LeftButton;
    }

    createPinRightButton() {
        const RightButton = document.createElement('button');
        RightButton.className = 'logButton'
        RightButton.textContent = '↷';
        RightButton.style = 'left: 76px;';
        return RightButton;
    }

    addPin() {
        this.pinCount++;
    }

    removePin() {
        if (this.pinCount > 2) {
            //TODO ОБРАТИЦА К ТОЧКАМ КОТОРЫЕ НАДА УДАЛЯТ ОНИ НА КАНВЕ А Я В ГОВНЕ
            //connections
            var conns = jsPlumb.getConnections({source: this.lastChild});
            for (var i = 0; i < conns.length; i++) jsPlumb.detach(conns[i]);
            jsPlumb.removeAllEndpoints(this.lastChild);
            jsPlumb.remove(this.lastChild);
            //this.removeChild(this.lastChild);
            this.pinCount--;
        }
    }
}

class PinPassiveBlock extends PinBlock {
    addPin() {
        super.addPin();
        this.appendChild(new PinPassive());
    }
}

class PinFunctionalBlock extends PinBlock {
    constructor(func, inc) {
        super(inc);
        this.func = func;
    }

    addPin() {
        super.addPin();
        this.appendChild(new PinFunctional(this.func))
    }
}

class Element extends HTMLTableElement {
    constructor() {
        super();
        this.id = 'log-' + counter++;
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

const MixInsPinPassiveBlock = Element => class extends Element {
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

class ElementOne extends MixInsPinFunctionalBlock(Element) {
    createPinFunctionalBlock() {
        if (this.parentNode === canvas) {
            const functionalBlock = new PinFunctionalBlock(this.func);
            functionalBlock.addPin();
            return functionalBlock;
        }
        return super.createPinFunctionalBlock();
    }

    func() {
        return true;
    }

    label() {
        return '1';
    }
}

class ElementLogic extends MixInsPinPassiveBlock(MixInsPinFunctionalBlock(Element)) {
    createPinPassiveBlock() {
        if (this.parentNode === canvas) {
            this.pinPassiveBlock = new PinPassiveBlock( true);
            this.pinPassiveBlock.addPin();
            this.pinPassiveBlock.addPin();
            return this.pinPassiveBlock;
        }
        return super.createPinPassiveBlock();
    }

    createPinFunctionalBlock() {
        if (this.parentNode === canvas) {
            const pinFunctionalBlock = new PinFunctionalBlock(this.func.bind(this));
            pinFunctionalBlock.addPin();
            return pinFunctionalBlock;
        }
        return super.createPinFunctionalBlock();
    }

    func() {
        return [...this.pinPassiveBlock.querySelector('div')].map(passivePin => passivePin.level());
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
        return super.func().every(Boolean);
    }

    label() {
        return '&';
    }
}

class ElementLogicOr extends ElementLogic {
    func() {
        return super.func().some(Boolean);
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

class ElementLogicNor extends MixInsNot(ElementLogicOr) {
    createPinPassiveBlock() {
        if (this.parentNode === canvas) {
            this.pinPassiveBlock = new PinPassiveBlock(true);
            this.pinPassiveBlock.addPin();
            return this.pinPassiveBlock;
        }
        return super.createPinPassiveBlock();
    }
}

class ElementLogicCounter extends MixInsPinFunctionalBlock(Element) {
    constructor() {
        super();
        this.value = 0;
    }

    createPinFunctionalBlock() {
        if (this.parentNode === canvas) {
            return new PinFunctionalBlock(this.func.bind(this), true);
        }
        return super.createPinFunctionalBlock();
    }

    func() {
        return this.value++;
    }

    label() {
        return 'RST';
    }
}

customElements.define('element-pin', Pin, {extends: 'div'});
customElements.define('element-pin-passive', PinPassive, {extends: 'div'});
customElements.define('element-pin-functional', PinFunctional, {extends: 'div'});
customElements.define('element-pin-block', PinBlock, {extends: 'td'});
customElements.define('element-pin-passive-block', PinPassiveBlock, {extends: 'td'});
customElements.define('element-pin-functional-block', PinFunctionalBlock, {extends: 'td'});

customElements.define('element-ise', Element, {extends: 'table'});
customElements.define('element-logic', ElementLogic, {extends: 'table'});

customElements.define('element-one', ElementOne, {extends: 'table'});
customElements.define('element-logic-and', ElementLogicAnd, {extends: 'table'});
customElements.define('element-logic-or', ElementLogicOr, {extends: 'table'});
customElements.define('element-logic-xor', ElementLogicXor, {extends: 'table'});
customElements.define('element-logic-nand', MixInsNot(ElementLogicAnd), {extends: 'table'});
customElements.define('element-logic-nor', ElementLogicNor, {extends: 'table'});
customElements.define('element-logic-nxor', MixInsNot(ElementLogicXor), {extends: 'table'});

customElements.define('element-logic-counter', ElementLogicCounter, {extends: 'table'});