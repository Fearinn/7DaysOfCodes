const corpo = document.querySelector("[data-bloco='corpo']")
const conteudo = document.querySelector('[data-bloco="cabecalho-e-principal"]')
const adicionais = document.querySelectorAll("[data-bloco='adicionais']")
const flutuante = document.querySelector("[data-botao='flutuante']")

function escureceCorpo() {
    conteudo.style.opacity = '0.5'
    corpo.style.background = 'rgba(0, 0, 0, 0.6)'
    for (let i = 0; i < adicionais.length; i++)
        adicionais[i].style.display = 'flex'
}

function voltaAoNormal() {
    conteudo.style.opacity = 'initial'
    corpo.style.background = 'var(--fundo-geral)'
    for (let i = 0; i < adicionais.length; i++)
        adicionais[i].style.display = 'none'
}

var clicado = 0

function novoVisual(botao) {
    botao.addEventListener('click', function () {
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


