// declaração de variaveis
let sttsAtuais = {
    ad: Number(0),
    ap: Number(0),
    gold: Number(0),
    numItens: Number(0),
}
let res = document.getElementById("res")
let det = document.getElementById("detalhes")
let selectChamp = false
let mitico = false


// iniciando a pagina
window.onload = function () {
    atualizar()
}


// buscando o iframe e pegando os dados dele
const myIframe = document.getElementById("myIframe")
myIframe.onload = function () {
    // apos achar o iframe em si, declarar algumas propriedades que estão dentro dele
    const myIframeDocument = myIframe.contentDocument;
    let campeoes = myIframeDocument.querySelectorAll("div.camp")
    let itens = myIframeDocument.querySelectorAll("div.iten")

    // apos pegar todas as divs (que representam um iten), uso um for para adicionar um evento de click em cada baseada na sua posição
    for (i = 0; i < itens.length; i++) {
        itens[i].addEventListener("click", addIten)
        itens[i].addEventListener("mouseover", detalhes)
    }

    // usando o mesmo padrão só que com os campeões
    for (i = 0; i < campeoes.length; i++) {
        campeoes[i].addEventListener("click", addCampeao)
    }
}

// quando clickar no iten ele ira ser adicionado na sua build
function addIten() {
    let itenAdicionado = JSON.parse(this.getAttribute("stts"))
    if (itenAdicionado.tipo == "mitico") {
        if (mitico == false) {
            sttsAtuais.numItens += 1

            sttsAtuais.ap += Number(itenAdicionado.ap)
            sttsAtuais.ad += Number(itenAdicionado.dano)
            sttsAtuais.gold += Number(itenAdicionado.ouro)
            mitico = true

            if (sttsAtuais.numItens <= 6) {
                atualizar()
                document.getElementById(`i${sttsAtuais.numItens}`).style.backgroundImage = `url(${itenAdicionado.src})`
            } else {
                window.alert("vc já tem 6 itens")
               
            }
        } else {
            window.alert("só pode ter um itens mitico")
        }
    }else{

        sttsAtuais.numItens += 1

        sttsAtuais.ap += Number(itenAdicionado.ap)
        sttsAtuais.ad += Number(itenAdicionado.dano)
        sttsAtuais.gold += Number(itenAdicionado.ouro)


        //fazendo uma verificação para ver se não tem mais de 6 itens
        if (sttsAtuais.numItens <= 6) {
            atualizar()
            document.getElementById(`i${sttsAtuais.numItens}`).style.backgroundImage = `url(${itenAdicionado.src})`
        } else {
            window.alert("vc já tem 6 itens")
        }
    }
}

// quando clicar num campeão ele vai ser adicionado só uma vez
function addCampeao() {
    // aqui ele verifica se já foi escolhido ou não
    if (selectChamp == false) {
        let sttsCampeao = JSON.parse(this.getAttribute("stts"))
        sttsAtuais.ap += sttsCampeao.ap
        sttsAtuais.ad += sttsCampeao.dano
        document.getElementById(`champ`).style.backgroundImage = `url(${sttsCampeao.src})`
        selectChamp = true
        atualizar()
    } else {
        window.alert("campeão já selecionado")
    }

}

// ao passar o mouse por cima ele irá mostrar algo sobre o iten
function detalhes() {
    let detalhes = JSON.parse(this.getAttribute("stts")).detalhes
    det.innerHTML = detalhes

}


function atualizar() {
    res.innerHTML = `dano: ${sttsAtuais.ad}<br>
                    ap: ${sttsAtuais.ap}<br>
                    ouro: ${sttsAtuais.gold}<br>
                    itens: ${sttsAtuais.numItens}`
}