import { schedulesDay } from "../schedules/load.js"

// Seleciona o input de data.
const selectedDate = document.getElementById("date")
const selectedDate2 = document.getElementById("date-2")

// Recarrega a lista de horários quando o input de data mudar.
selectedDate.onchange = () => schedulesDay()
selectedDate2.onchange = () => schedulesDay()
