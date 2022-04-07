let dano = Number(0)
let ap = Number(0)
let ouro = Number(0)
let c = 0
let res = document.getElementById("res")
let det = document.getElementById("detalhes")
let iten = {nome: "",
            src: "",
            dano: 0,
            id: "",
            ap: 0,
            ouro: 0,}

const myIframe = document.getElementById("myIframe")
myIframe.onload = function() {
atualizar()
const myIframeDocument = myIframe.contentDocument;


let itens = myIframeDocument.querySelectorAll("div")
    for(i = 0; i < itens.length; i++){
        itens[i].addEventListener("click", add)
        itens[i].addEventListener("mouseover", detalhes)
    }
}


function add(){
    let stts = JSON.parse(this.getAttribute("stts"))
    iten = stts
    c += 1
    if (c<=6){
        atualizar()
    }else{
        window.alert("vc já tem 6 itens")
    }
    
}

function detalhes(){
    let detalhes = JSON.parse(this.getAttribute("stts")).detalhes
    det.innerHTML = detalhes

}


function atualizar(){
    ap += iten.ap
    dano += Number(iten.dano)
    ouro += iten.ouro
    
    res.innerHTML = `dano:${dano}<br>
                    ap:${ap}<br>
                    ouro${ouro}<br>
                    itens${c}`
    if(c>0)document.getElementById(`i${c}`).innerHTML = `<img src="${iten.src}" width="100px">`
}