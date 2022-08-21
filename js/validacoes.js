export function validacaoFormulario() {

    // constantes ou variáveis

    const inputs = document.querySelectorAll('[data-tag="input"]')

    const listaDeInputs = Array.from(inputs)

    const form = document.querySelector("[data-tag='form']")

    const tiposDeErro = [
        'valueMissing',
        'typeMismatch',
        'patternMismatch',
        'customError'
    ]

    const validadores = {
        horarioFim: input => validaHorario(input)
    }

    const mensagensDeErro = {
        nome: {
            valueMissing: 'O nome não pode estar vazio'
        },
        tipoConsulta: {
            valueMissing: 'O tipo de consulta não pode estar vazio'
        },
        data: {
            valueMissing: 'A data não pode estar vazia'
        },
        horarioInicio: {
            valueMissing: 'O horário de início não pode estar vazio'
        },
        horarioFim: {
            valueMissing: 'O horário de fim não pode estar vazio',
            customError: 'O horário de fim deve ser após o horário de início'
        }
    }

    // funções

    function checaMudanca() {
        inputs.forEach(input => {
            input.addEventListener('blur', evento => {
                validaInput(evento.target)
            })

        })
    }

    function focoLimpa() {
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.classList.remove('agendamento__input--invalido')
                input.parentElement.querySelector('.agendamento__erro').innerHTML = ''
            })

        })
    }

    function checaEnvio() {
        if (form.dataset.envia == "nao") {
            form.addEventListener('submit', evento => {
                evento.preventDefault()
                evento.stopPropagation()

                inputs.forEach(input => {
                    validaInput(input)
                })
            })
        }

        else {
            form.addEventListener('submit', evento => {
                evento.stopPropagation()
                evento.preventDefault()

                inputs.forEach(input => {
                    validaInput(input)
                })

                var checaTudo = listaDeInputs.every(input => input.validity.valid)

                if (checaTudo) {
                    form.reset()
                }
                
            })
        }
    }

    function validaInput(input) {
        const tipoDeInput = input.dataset.tipo

        if (validadores[tipoDeInput]) {
            validadores[tipoDeInput](input)
        }
        if (input.validity.valid) {
            input.classList.remove('agendamento__input--invalido')
            input.parentElement.querySelector('.agendamento__erro').innerHTML = ''

        } else {
            input.classList.add('agendamento__input--invalido')
            input.parentElement.querySelector('.agendamento__erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
        }
    }

    function validaHorario(input) {
        let mensagem = ''

        const horarioFim = input.value.split(':')


        const horarioInicio = document.querySelector('[data-tipo="horarioInicio"]').value.split(':')


        const horasInicio = parseInt(horarioInicio[0], 10)
        const minutosInicio = parseInt(horarioInicio[1], 10)

        const horasFim = parseInt(horarioFim[0], 10)
        const minutosFim = parseInt(horarioFim[1], 10)

        const dataInicio = new Date (2022, 10, 9, horasInicio, minutosInicio)

        const dataFim = new Date (2022, 10, 9, horasFim, minutosFim)

        const msInicio = dataInicio.getTime()

        const msFim = dataFim.getTime()


        if (msFim <= msInicio) {
            mensagem = 'O horário de fim deve ser após o horário de início'
            input.setCustomValidity(mensagem)
        }
        else {
            input.setCustomValidity('')
        }

    }

    function mostraMensagemDeErro(tipoDeInput, input) {
        let mensagem = ''
        tiposDeErro.forEach(erro => {
            if (input.validity[erro]) {
                mensagem = mensagensDeErro[tipoDeInput][erro]
            }
        })
        return mensagem
    }

    // chamadas

    checaMudanca()
    focoLimpa()
    checaEnvio()
}