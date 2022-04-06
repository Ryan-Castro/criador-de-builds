const itens = [
    dançaDaMorte = {
        nome: "dança da morte",
        src: "./imagens/dansadamorte.webp",
        dano: 100,
        id: "df",
        ap: 0,
    },
    rabadon = {
        nome: "rabadon",
        src: "./imagens/Rabadon.webp",
        dano: 0,
        id: "df",
        ap: 100,
    },

]

for(let i = 0; i < itens.length; i++){
    let conteiner = document.querySelector("main")
    conteiner.innerHTML += `<div id='id${i}' stts='${JSON.stringify(itens[i])}'>
                                <img src=${itens[i].src}>
                            </div>`
}
