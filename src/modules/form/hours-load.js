import dayjs from "dayjs"

import { openingHours } from "../../utils/opening-hours.js"

export function hoursLoad({ date, dailySchedules }) {
  const selectElement = document.getElementById("appointment-time")

  // Verifica se o select existe antes de continuar
  if (!selectElement) {
    console.error("Elemento #appointment-time não encontrado.")
    return
  }

  // Obtém a lista de horários ocupados.
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  )

  const opening = openingHours.map((hour) => {
    const [scheduleHour] = hour.split(":")
    const isHourPast = dayjs(date).hour(scheduleHour, "hour").isBefore(dayjs())
    const available = !unavailableHours.includes(hour) && !isHourPast
    return {
      hour,
      available,
    }
  })

  opening.forEach(({ hour, available }) => {
    const option = Array.from(selectElement.options).find(
      (opt) => opt.value === hour
    )

    if (option) {
      option.disabled = !available
    }
  })
}
