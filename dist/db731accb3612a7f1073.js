"use strict"

// CSS
import "./styles/global.css"
import "./styles/header.css"
import "./styles/modal.css"
import "./styles/schedules.css"

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("myModal")
  const button = document.getElementById("modal-button")
  const closeButton = document.getElementsByClassName("close")[0]

  button.onclick = function () {
    modal.style.display = "flex"
  }

  closeButton.onclick = function () {
    modal.style.display = "none"
  }
})
