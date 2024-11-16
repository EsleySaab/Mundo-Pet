import dayjs from "dayjs"

// Seleciona as sessões manhã, tarde e noite.
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function schedulesShow({ dailySchedules }) {
  try {
    // Limpa as listas.
    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    // Renderiza os agendamentos por período
    dailySchedules.forEach((schedule) => {
      // Cria o elemento da lista com a classe "appointment-details d-flex"
      const item = document.createElement("li")
      item.classList.add("appointment-details", "d-flex")

      item.setAttribute("data-id", schedule.id)

      // Cria o contêiner interno
      const container = document.createElement("div")
      container.classList.add("d-flex")

      // Cria o horário exato
      const exactTime = document.createElement("strong")
      exactTime.classList.add("exact-time")
      exactTime.textContent = dayjs(schedule.when).format("HH:mm")

      // Cria o elemento do pet e tutor
      const petInfo = document.createElement("p")
      petInfo.classList.add("pet")
      petInfo.innerHTML = `${schedule.pet || "Pet não informado"} / 
    <span class="owner">${schedule.name || "Tutor não informado"}</span>`

      // Adiciona o horário e o pet no contêiner interno
      container.append(exactTime, petInfo)

      // Cria a descrição do agendamento
      const service = document.createElement("p")
      service.classList.add("description")
      service.textContent = `${schedule.service || "Sem descrição"}`

      // Cria o botão de remover
      const cancelButton = document.createElement("button")
      cancelButton.classList.add("remove-btn")
      cancelButton.innerHTML = `Remover agendamento`

      // Adiciona todos os elementos ao item principal
      item.append(container, service, cancelButton)

      // Obtém a hora para decidir o período
      const hour = dayjs(schedule.when).hour()

      // Renderiza o item no período correto
      if (hour <= 12) {
        periodMorning.appendChild(item)
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item)
      } else {
        periodNight.appendChild(item)
      }
    })
  } catch (error) {
    alert("Não foi possível exibir os agendamentos.")
    console.log(error)
  }
}
