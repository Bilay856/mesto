let BOT_TOKEN = '8567892374:AAHvBNEMsRuPFLl2dBii0mMWOMe8sCpdTwc'
let CHAT_ID = '7078221995'

let yesBtn = document.getElementById('yesBtn')
let noBtn = document.getElementById('noBtn')
let formModal = document.getElementById('formModal')
let doneModal = document.getElementById('doneModal')
let wrongModal = document.getElementById('wrongModal')
let dateInput = document.getElementById('dateInput')
let timeInput = document.getElementById('timeInput')
let placeInput = document.getElementById('placeInput')
let errorText = document.getElementById('errorText')
let sendBtn = document.getElementById('sendBtn')
let closeBtn = document.getElementById('closeBtn')
let wrongBtn = document.getElementById('wrongBtn')
let doneDate = document.getElementById('doneDate')
let doneTime = document.getElementById('doneTime')
let donePlace = document.getElementById('donePlace')

// кнопка "Нет" убегает
function moveNo() {
  let x = Math.floor(Math.random() * 200) - 100
  let y = Math.floor(Math.random() * 140) - 70
  noBtn.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
}

noBtn.addEventListener('mouseenter', moveNo)
noBtn.addEventListener('touchstart', function (e) {
  e.preventDefault()
  moveNo()
})

// если все-таки смог нажать "Нет"
noBtn.addEventListener('click', function () {
  wrongModal.classList.remove('hidden')
})

// закрыть окно "неверный ответ" и снова убрать кнопку
wrongBtn.addEventListener('click', function () {
  wrongModal.classList.add('hidden')
  moveNo()
})

// формат даты 2026-10-08 -> 08.10.2026
function formatDate(value) {
  let parts = value.split('-')
  return parts[2] + '.' + parts[1] + '.' + parts[0]
}

// открыть окно с формой
yesBtn.addEventListener('click', function () {
  formModal.classList.remove('hidden')
})

// отправка в телеграм
sendBtn.addEventListener('click', async function () {
  let date = dateInput.value
  let time = timeInput.value
  let place = placeInput.value.trim()

  if (date === '' || time === '' || place === '') {
    errorText.textContent = 'Заполни дату, время и место'
    return
  }

  errorText.textContent = ''
  sendBtn.disabled = true
  sendBtn.textContent = 'Отправляю...'

  let text = '🌯 Ответ: ДА!\n📅 Дата: ' + formatDate(date) + '\n🕐 Время: ' + time + '\n📍 Место: ' + place
  let url = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage'

  try {
    let res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text }),
    })

    if (res.ok) {
      doneDate.textContent = 'Встречаемся ' + formatDate(date)
      doneTime.textContent = 'Время: ' + time
      donePlace.textContent = 'Место: ' + place
      formModal.classList.add('hidden')
      doneModal.classList.remove('hidden')
    } else {
      errorText.textContent = 'Не получилось отправить, попробуй еще раз'
    }
  } catch (err) {
    errorText.textContent = 'Нет связи, попробуй еще раз'
  }

  sendBtn.disabled = false
  sendBtn.textContent = 'Отправить'
})

// закрыть последнее окно
closeBtn.addEventListener('click', function () {
  doneModal.classList.add('hidden')
})