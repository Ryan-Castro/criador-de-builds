const campeoes = [
    darius = {
        dano: 50,
        vida: 1000,
        src: "imagens/darius.jpg",
        ap: 0,
    }
]
for(let i = 0; i < campeoes.length; i++){
    let conteiner = document.querySelector("main")
    conteiner.innerHTML += `<div id='id${i}' stts='${JSON.stringify(campeoes[i])}' class="camp">
                                <img src=${campeoes[i].src}>
                            </div>`
}