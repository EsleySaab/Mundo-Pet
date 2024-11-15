import dayjs from "dayjs"
const form = document.querySelector("form")

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
}
