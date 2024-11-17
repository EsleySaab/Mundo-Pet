import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("tutor-name")
const petName = document.getElementById("pet-name")
const clientPhone = document.getElementById("phone")
const serviceDesc = document.getElementById("service-desc")
const serviceTime = document.getElementById("appointment-time")

const selectedDate = document.getElementById("date")
const selectedDate2 = document.getElementById("date-2")

// Data atual para formatar o input.
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e define a data mínima como sendo a data atual.
selectedDate.value = inputToday
selectedDate.min = inputToday
selectedDate2.min = inputToday

clientPhone.addEventListener("input", (event) => {
  let input = clientPhone.value

  // Remove todos os caracteres não numéricos
  input = input.replace(/\D/g, "")

  // Aplica a máscara (00) 0 0000-0000
  if (input.length > 0) {
    input = input.replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona parênteses e o espaço após DDD
  }
  if (input.length > 6) {
    input = input.replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o hífen após o quinto número
  }

  // Limita o tamanho do número formatado
  input = input.substring(0, 15)

  // Atualiza o valor do campo com a máscara aplicada
  clientPhone.value = input
})

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de carregar a página.
  event.preventDefault()

  try {
    // Recuperando o nome do cliente.
    const name = clientName.value.trim()

    if (!name) {
      return alert("Informe o nome do tutor!")
    }

    const pet = petName.value.trim()

    if (!pet) {
      return alert("Informe o nome do pet!")
    }

    const phone = clientPhone.value.trim()

    if (!phone) {
      return alert("Informe o telefone!")
    }

    const service = serviceDesc.value.trim()

    if (!service) {
      return alert("Informe a descrição do serviço!")
    }

    const [time] = serviceTime.value.split(":")

    if (!time) {
      return alert("Selecione o horário do serviço!")
    }

    const when = dayjs(selectedDate.value, selectedDate2.value).add(
      time,
      "hour"
    )

    // Gera um ID.
    const id = new Date().getTime()

    // Faz o agendamento.
    await scheduleNew({
      name,
      pet,
      phone,
      service,
      when,
    })

    // Recarrega os agendamentos.
    await schedulesDay()

    // Limpa as informações dos inputs.
    clientName.value = ""
    petName.value = ""
    clientPhone.value = ""
    serviceDesc.value = ""
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}
