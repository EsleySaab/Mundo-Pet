import dayjs from "dayjs"

import { openingHours } from "../../utils/opening-hours.js"

export function hoursLoad({ date }) {
  const selectElement = document.getElementById("appointment-time")

  // Verifica se o select existe antes de continuar
  if (!selectElement) {
    console.error("Elemento #appointment-time não encontrado.")
    return
  }

  const opening = openingHours.map((hour) => {
    const [scheduleHour] = hour.split(":")
    const isHourPast = dayjs(date).hour(scheduleHour).isBefore(dayjs())
    return {
      hour,
      available: !isHourPast,
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
