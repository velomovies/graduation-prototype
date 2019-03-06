const element = document.querySelector('.hz')

function audio(stream) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const analyser = audioCtx.createAnalyser()
  source = audioCtx.createMediaStreamSource(stream)
  source.connect(analyser)
  analyser.connect(audioCtx.destination)
  analyser.fftSize = 2048
  const bufferLength = analyser.frequencyBinCount
  let dataArray = new Uint8Array(bufferLength)
  
  console.log(analyser, bufferLength)
  show(analyser, dataArray)
}

function show(analyser, dataArray) {
  analyser.getByteTimeDomainData(dataArray)
  dataArray.forEach(item => element.innerHTML += item + ' ')
  console.log(dataArray)

  // window.requestAnimationFrame(show(analyser, dataArray))
  
}

const constraints = {
  audio: true
}

navigator.mediaDevices.getUserMedia(constraints).
  then(stream => {
    console.log(stream)
    audio(stream)
  })