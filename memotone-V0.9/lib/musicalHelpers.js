const noteStrings = ['C3','C3-sharp','D3','D3-sharp','E3','F3','F3-sharp','G3','G3-sharp','A3','A3-sharp','B3',
'C4','C4-sharp','D4','D4-sharp','E4','F4','F4-sharp','G4','G4-sharp','A4','A4-sharp','B4',
'C5','C5-sharp','D5','D5-sharp','E5','F5','F5-sharp','G5','G5-sharp','A5','A5-sharp','B5',
'C6','C6-sharp','D6','D6-sharp','E6','F6','F6-sharp','G6','G6-sharp','A6','A6-sharp','B6']

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

function getNoteObject(frequency) {
  const noteNumber = noteFromPitch(frequency)
  const detune = centsOffFromPitch(frequency, noteNumber)
  let noteStringNumber = noteNumber % 48
  let absDetune

  if (detune == 0) {
    absDetune = '--'
  } else if (detune < 0) {
    absDetune = '♭'
  } else if (detune > 0) {
    absDetune = '♯'
  }

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
