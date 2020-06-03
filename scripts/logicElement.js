class LogicElement extends HTMLElement {
    constructor(x, y) {
        super();
        //внутреннее DOM-дерево
        const shadowRoot = this.attachShadow({mode: "open"});
        //обертка содержимого - корневый элемент внутреннего DOM-дерева
        this.body = document.createElement('div');
        //TODO extract to stylesheet
        this.body.style.display = 'inline-block';
        this.body.style.left = x || 0;
        this.body.style.top = y || 0;
        //входы
        this.inputBlock = this.createInputBlock();
        this.body.appendChild(this.inputBlock);
        //тело
        this.solid = this.createSolid();
        this.body.appendChild(this.solid);
        //выходы
        this.outputBlock = this.createOutputBlock();
        this.body.appendChild(this.outputBlock);

        shadowRoot.appendChild(this.body);
    }

    createInputBlock() {
        const input = document.createElement('div')
        //TODO extract to stylesheet
        input.style.display = 'inline-block';
        return input;
    }

    createSolid() {
        const solid = document.createElement('div')
        //TODO extract to stylesheet
        solid.style.display = 'inline-block';
        solid.style.border = '2px solid black';
        solid.style.width = '30px';
        solid.style.textAlign = 'right';
        return solid;
    }

    createOutputBlock() {
        const output = document.createElement('div')
        //TODO extract to stylesheet
        output.style.display = 'inline-block';
        return output;
    }
}

class Pin extends HTMLDivElement {
    constructor() {
        super();
        //TODO extract to stylesheet
        this.style.background = 'black';
        this.style.margin = '20px 0';
        this.style.height = '2px'
        this.style.width = '10px'
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
    constructor(logicElement) {
        super();
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
        return input;
    }

    createOutputBlock() {
        let output = super.createOutputBlock();
        output.appendChild(new OutputPin(this));
        return output;
    }
}

customElements.define('logic-element', LogicElement);

customElements.define('logic-pin', Pin, {extends: 'div'});

customElements.define('input-pin', InputPin, {extends: 'div'});

customElements.define('output-pin', OutputPin, {extends: 'div'});

customElements.define('logic-element-and', LogicElementAnd);