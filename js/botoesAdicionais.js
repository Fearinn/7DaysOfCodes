export function botoesAdicionais() {

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


    function novoVisual(botao) {
        botao.addEventListener('click', () => {
            if (mascara.classList.contains('aberto')) {
                voltaAoNormal()
            }
            else {
                escureceCorpo()
            }
        })
    }

    novoVisual(flutuante)
}