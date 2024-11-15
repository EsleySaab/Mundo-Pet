import dayjs from "dayjs"
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
selectedDate2.value = inputToday
selectedDate.min = inputToday
selectedDate2.min = inputToday

form.onsubmit = (event) => {
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
    console.log(time)

    if (!time) {
      return alert("Selecione o horário do serviço!")
    }

    const when = dayjs(selectedDate.value, selectedDate2.value).add(
      time,
      "hour"
    )

    // Gera um ID.
    const id = new Date().getTime()

    console.log({
      id,
      name,
      pet,
      phone,
      service,
      when,
    })
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}
