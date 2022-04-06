let dano = Number(0)
let ap = Number(0)
let res = document.getElementById("res")
let iten = {nome: "",
            src: "",
            dano: 0,
            id: "",
            ap: 0,}

const myIframe = document.getElementById("myIframe")
myIframe.onload = function() {
atualizar()
const myIframeDocument = myIframe.contentDocument;


let itens = myIframeDocument.querySelectorAll("div")
    for(i = 0; i < itens.length; i++){
        itens[i].addEventListener("click", add)
    }
}


function add(){
    let stts = JSON.parse(this.getAttribute("stts"))
    console.log(stts)
    iten = stts
    atualizar()
}



function atualizar(){
    ap += iten.ap
    dano += Number(iten.dano)
    res.innerHTML = `dano:${dano}<br>
                    ap:${ap}`
}