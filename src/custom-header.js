
class CustomHeader extends HTMLElement {

    constructor(){
        super();
        this.shadowDOM = this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }
  
    render() {
        this.shadowDOM.innerHTML = `
        <style>
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }

            :host {
                display: block;
                padding: 1em;
                width: 100%;
                background-color: royalblue;
            }
            h2{
                padding: 1em 2em;
            }
        </style>
        <nav>
            <h2>Kurs Mata Uang</h2>
        </nav>`
    }
}
  
customElements.define("custom-header", CustomHeader);