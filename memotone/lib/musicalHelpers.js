const noteStrings = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

function noteFromPitch(frequency) {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
  return Math.round(noteNum) + 69
}

function frequencyFromNoteNumber(note) {
  return 440 * Math.pow(2, (note - 69) / 12)
}

function centsOffFromPitch(frequency, note) {
  return Math.floor((1200 * Math.log(frequency / frequencyFromNoteNumber(note))) / Math.log(2))
}

function getNoteObject(frequency, transpose) {
  transpose = transpose || 0
  const noteNumber = noteFromPitch(frequency)
  const detune = centsOffFromPitch(frequency, noteNumber)
  let noteStringNumber = (noteNumber % 12) + transpose
  let absDetune

  if (detune == 0) {
    absDetune = '--'
  } else if (detune < 0) {
    absDetune = '♭'
  } else if (detune > 0) {
    absDetune = '♯'
  }

  noteStringNumber > 11 ? noteStringNumber = noteStringNumber - 12 : noteStringNumber

  return {
    noteName: noteStrings[noteStringNumber],
    cents: detune,
    absDetune,
  }
}

export default {
  noteFromPitch,
  frequencyFromNoteNumber,
  centsOffFromPitch,
  getNoteObject,
}
