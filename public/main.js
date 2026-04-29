const socket = io()

const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')
const nameInput = document.getElementById('name-input')
const fileInput = document.getElementById('file-input')

const emojiBtn = document.getElementById('emoji-btn')
const emojiPicker = document.getElementById('emoji-picker')
const imageBtn = document.getElementById('image-btn')
const recordBtn = document.getElementById('record-btn')

const clientsTotal = document.getElementById('client-total')
const typingContainer = document.getElementById('typing-container')
const feedback = document.getElementById('feedback')

let recorder
let chunks = []
let stream 

const emojis = [
  '😊','😂','😍','😎','😭','🔥','❤️','👍',
  '😁','😄','😆','😅','🤣','🙂','😉','😇',
  '🥰','😘','😋','😜','🤪','🤗','🤔','😐',
  '😶','😏','😒','🙄','😬','😔','😪','😴',
  '😷','🤒','🤕','🤢','🤮','🤧','😵','🤯',
  '🥳','🤓','🧐','😕','😟','😤','😡','😢',
  '😱','😳','🥺','😌','😈','👿','💀','☠️',
  '💖','💘','💝','💗','💓','💕','💞','💟',
  '💔','❤️‍🔥','❤️‍🩹','💯','✨','💫','⭐','🌟',
   '👋','🤚','🖐️','✋','🖖','👌','🤌','🤏',
  '✌️','🤞','🤟','🤘','🤙','👈','👉','👆',
  '🖕','👇','☝️','👍','👎','✊','👊','🤛',
  '🤜', '👏','🙌','👐','🤲','🤝','🙏','✍️'
]

messageInput.addEventListener('input', () => {
  socket.emit('typing', nameInput.value)
})

socket.on('typing', (name) => {
  if (!name) return

  typingContainer.style.display = 'block'
  feedback.textContent = `${name} is typing...`

  clearTimeout(window.typingTimeout)

  window.typingTimeout = setTimeout(() => {
    typingContainer.style.display = 'none'
  }, 1000)
})

emojiBtn.onclick = () => {
  const isHidden = !emojiPicker.style.display || emojiPicker.style.display === 'none'

  if (isHidden) {
    emojiPicker.style.display = 'grid'
    emojiPicker.innerHTML = emojis.map(e => `<span>${e}</span>`).join('')
  } else {
    emojiPicker.style.display = 'none'
  }
}

emojiPicker.onclick = (e) => {
  if (e.target.tagName === 'SPAN') {
    messageInput.value += e.target.textContent
  }
}

document.addEventListener('click', (e) => {
  if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
    emojiPicker.style.display = 'none'
  }
})

imageBtn.onclick = () => fileInput.click()

fileInput.onchange = () => {
  const file = fileInput.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    socket.emit('message', {
      name: nameInput.value,
      message: '',
      file: reader.result,
      fileType: file.type
    })
  }

  reader.readAsDataURL(file)
}

document.querySelector('.message-form').onsubmit = (e) => {
  e.preventDefault()

  if (!messageInput.value.trim()) return

  socket.emit('message', {
    name: nameInput.value,
    message: messageInput.value
  })

  messageInput.value = ''
}

socket.on('chat-message', (data) => {

  const li = document.createElement('li')
  li.classList.add(data.socketId === socket.id ? 'message-right' : 'message-left')

  let fileHTML = ''

  if (data.file) {
    if (data.fileType.startsWith('image')) {
      fileHTML = `<img src="${data.file}">`
    } else if (data.fileType.startsWith('audio')) {
      fileHTML = `<audio controls src="${data.file}"></audio>`
    }
  }

  li.innerHTML = `
    <p class="message">
      ${data.message || ''}
      ${fileHTML}
      <span>${data.name} • ${moment(data.dateTime).format('dddd, MMMM DD hh:mm A')}</span>
    </p>
  `

  messageContainer.appendChild(li)
  messageContainer.scrollTop = messageContainer.scrollHeight
  const img = li.querySelector('img')
  const audio = li.querySelector('audio')
  if (img) {
    if (img.complete) {
      messageContainer.scrollTop = messageContainer.scrollHeight
    } else {
      img.onload = () => {
        messageContainer.scrollTop = messageContainer.scrollHeight
      }
    }
  }

  if (audio) {
    audio.onloadedmetadata = () => {
      messageContainer.scrollTop = messageContainer.scrollHeight
    }
  }
})

socket.on('clients-total', (n) => {
  clientsTotal.innerText = `Total clients: ${n}`
})

recordBtn.onclick = async () => {

  if (!recorder || recorder.state === 'inactive') {

    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      recorder = new MediaRecorder(stream)
      chunks = []

      recorder.start()
      recordBtn.textContent = '⏹️'
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        const reader = new FileReader()
        reader.onload = () => {
          socket.emit('message', {
            name: nameInput.value,
            message: '',
            file: reader.result,
            fileType: 'audio/webm'
          })
        }

        reader.readAsDataURL(blob)
        stream.getTracks().forEach(track => track.stop())
        recordBtn.textContent = '🎤'
      }

    } catch (err) {
      console.log("Mic error:", err)
      alert("Microphone permission denied or not supported")
    }

  } else {
    recorder.stop()
  }
}