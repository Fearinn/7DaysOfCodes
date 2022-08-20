const corpo = document.querySelector("[data-bloco='corpo']")
const mascara = document.querySelector('[data-bloco="mascara"]')
const adicionais = document.querySelectorAll("[data-bloco='adicionais']")
const flutuante = document.querySelector("[data-botao='flutuante']")

function escureceCorpo() {
    mascara.classList.add("aberto")
    adicionais.forEach((adicional) => {
        adicional.classList.add('aberto')
    })
}

function voltaAoNormal() {
    mascara.classList.remove("aberto")
    adicionais.forEach((adicional) => {
        adicional.classList.remove('aberto')
    })
}

var clicado = 0

function novoVisual(botao) {
    botao.addEventListener('click', () => {
        clicado++
        if (clicado % 2 == 0) {
            voltaAoNormal()
        }
        else {
            escureceCorpo()
        }
    })
}

novoVisual(flutuante)