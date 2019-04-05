<template>
  <main>
    Prototype
    <button @click="toggleOscillator()">
      use oscillator
    </button>
    <button @click="toggleLiveInput()">
      use live input
    </button>
    <div id="detector" :class="detectorElemClass">
      <div class="pitch">
        <span id="pitch">{{ pitchElem }}</span>
        Hz
      </div>
      <div class="note">
        <span id="note">{{ noteElem }}</span>
      </div>
      <div id="detune" :class="detuneElemClass">
        <span id="detune_amt">{{ detuneAmount }}</span>
        <span id="flat">cents &#9837;</span>
        <span id="sharp">cents &#9839;</span>
      </div>
    </div>
    <div>
      <p id="played_note">
        Note: {{ playedNote }}
      </p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      audioContext: null,
      sourceNode: null,
      delayNode: null,
      analyser: null,
      gainNode: null,
      isPlaying: false,
      isListening: false,
      listeningStream: null,
      mediaStreamSource: null,
      noteStrings: [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
      ],
      rafID: null,
      tracks: null,
      buflen: 1024,
      buf: null,
      MIN_SAMPLES: 0,
      GOOD_ENOUGH_CORRELATION: 0.9,
      noteObj: {},
      nextArray: true,
      count: 0,
      pitch: null,

      playedNote: '',
      pitchElem: '--',
      noteElem: '--',
      detuneAmount: '--',
      detectorElemClass: 'vague',
      detuneElemClass: '',
    }
  },
  mounted() {
    window.audioContext = window.AudioContext || window.webkitAudioContext
    this.audioContext = new AudioContext()
    this.buf = new Float32Array(this.buflen)
  },
  methods: {
    toggleLiveInput() {
      if (this.isPlaying) {
        // stop playing and return
        this.stopInput()
      } else if (this.isListening) {
        console.log(this.noteObj)
        this.listeningStream.stop()
        this.isListening = false
      } else {
        this.isListening = true
        navigator.permissions.query({name: 'microphone'})
          .then(permissionStatus => {
            if(permissionStatus.state === "prompt") {
              this.getUserMedia(
                {
                  audio: {
                    mandatory: {
                      googEchoCancellation: "false",
                      googAutoGainControl: "false",
                      googNoiseSuppression: "false",
                      googHighpassFilter: "false",
                    },
                    optional: [],
                  },
                }, this.onStreamSucces)
            } else if (permissionStatus.state === 'granted') {
              console.log('hierrrr')
              this.getUserMedia(
                {
                  audio: {
                    mandatory: {
                      googEchoCancellation: "false",
                      googAutoGainControl: "false",
                      googNoiseSuppression: "false",
                      googHighpassFilter: "false",
                    },
                    optional: [],
                  },
                }, this.onStreamSucces)
            } else if (permissionStatus.state === 'denied') {
              console.log('denied')
            }
          })
        }
    },
    toggleOscillator() {
      console.log(this.noteObj)
      if (this.isPlaying) {
        const note = this.noteFromPitch(
          this.median(this.noteObj['array' + this.count])
        )
        console.log(this.median(this.noteObj['array' + this.count]))
        this.playedNote += `${this.noteStrings[note % 12]} `
        // stop playing and return
        this.stopInput()
      } else {
        this.sourceNode = this.audioContext.createOscillator()
        this.gainNode = this.audioContext.createGain()
        this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime)
        this.delayNode = this.audioContext.createDelay(5.0)
        this.delayNode.delayTime.setValueAtTime(
          1,
          this.audioContext.currentTime
        )
        this.analyser = this.audioContext.createAnalyser()
        this.analyser.fftSize = 2048
        this.sourceNode.connect(this.gainNode)
        this.gainNode.connect(this.delayNode)
        this.delayNode.connect(this.analyser)
        this.analyser.connect(this.audioContext.destination)
        this.isPlaying = true
        this.sourceNode.start()
        console.log('test', this.audioContext)
        this.updatePitch()
      }
    },
    stopInput() {
      // this.sourceNode.stop(0)
      // this.sourceNode = null
      // this.analyser = null
      // this.delayNode = null
      // this.gainNode = null
      // this.isPlaying = false
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = window.webkitCancelAnimationFrame
      }
      window.cancelAnimationFrame(this.rafID)
    },
    getUserMedia(dictionary, callback) {
      try {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia
        navigator.getUserMedia(dictionary, callback, (e) => console.error('error getting user media:', e))
      } catch (e) {
        console.error('getUserMedia threw exception :' + e)
      }
    },
    onStreamSucces(stream) {
      console.log(stream)
      // // https://stackoverflow.com/questions/15925010/stop-the-webcam-streaming-of-getusermedia-without-page-refreshing/34232071
      // if(!stream.stop && stream.getTracks) {
      //   stream.stop = function(){
      //     this.getTracks().forEach(function (track) {
      //       track.stop();
      //     });
      //   };
      // }
      this.listeningStream = stream
      // Create an AudioNode from the stream.
      this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

      // Connect it to the destination.
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.mediaStreamSource.connect(this.analyser);
      this.updatePitch();
    },
    updatePitch() {
      this.analyser.getFloatTimeDomainData(this.buf)
      const ac = this.autoCorrelate(this.buf, this.audioContext.sampleRate)

      if (ac === -1) {
        this.detectorElemClass = 'vague'
        this.pitchElem = '--'
        this.noteElem = '-'
        this.detuneElemClass = ''
        this.detuneAmount = '--'

        if (this.nextArray) {
          if (this.noteObj['array' + this.count]) {
            console.log(this.noteObj['array' + this.count])
            const valuesArray = this.noteObj['array' + this.count]
            const sum = valuesArray.reduce(function(previous, current) {
              current += previous
              return current
            })
            const avg = sum / valuesArray.length
            console.log(avg, this.median(this.noteObj['array' + this.count]))
          }
          this.count = this.count + 1
          this.noteObj['array' + this.count] = []
          this.nextArray = false
        }
      } else {
        this.detectorElemClass = 'confident'
        this.pitch = ac
        this.pitchElem = Math.round(this.pitch)
        const note = this.noteFromPitch(this.pitch)
        this.noteElem = this.noteStrings[note % 12]
        this.noteObj['array' + this.count].push(Math.round(this.pitch))
        this.nextArray = true

        const detune = this.centsOffFromPitch(this.pitch, note)
        if (detune === 0) {
          this.detuneElemClass = ''
          this.detuneAmount = '--'
        } else {
          if (detune < 0) {
            this.detuneElemClass = 'flat'
          } else {
            this.detuneElemClass = 'sharp'
          }
          this.detuneAmount = Math.abs(detune)
        }
      }

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame
      }
      this.rafID = window.requestAnimationFrame(this.updatePitch)
    },
    autoCorrelate(buf, sampleRate) {
      const SIZE = buf.length
      const MAX_SAMPLES = Math.floor(SIZE / 2)
      let bestOffset = -1
      let bestCorrelation = 0
      let rms = 0
      let foundGoodCorrelation = false
      const correlations = new Array(MAX_SAMPLES)

      for (let i = 0; i < SIZE; i++) {
        const val = buf[i]
        rms += val * val
      }
      rms = Math.sqrt(rms / SIZE)
      if (rms < 0.01)
        // not enough signal
        return -1

      let lastCorrelation = 1
      for (let offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
        let correlation = 0

        for (let i = 0; i < MAX_SAMPLES; i++) {
          correlation += Math.abs(buf[i] - buf[i + offset])
        }
        correlation = 1 - correlation / MAX_SAMPLES
        correlations[offset] = correlation // store it, for the tweaking we need to do below.
        if (
          correlation > this.GOOD_ENOUGH_CORRELATION &&
          correlation > lastCorrelation
        ) {
          foundGoodCorrelation = true
          if (correlation > bestCorrelation) {
            bestCorrelation = correlation
            bestOffset = offset
          }
        } else if (foundGoodCorrelation) {
          // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
          // Now we need to tweak the offset - by interpolating between the values to the left and right of the
          // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
          // we need to do a curve fit on correlations[] around bestOffset in order to better determine precise
          // (anti-aliased) offset.

          // we know bestOffset >=1,
          // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and
          // we can't drop into this clause until the following pass (else if).
          const shift =
            (correlations[bestOffset + 1] - correlations[bestOffset - 1]) /
            correlations[bestOffset]
          return sampleRate / (bestOffset + 8 * shift)
        }
        lastCorrelation = correlation
      }
      if (bestCorrelation > 0.01) {
        // console.log(
        //   'f = ' +
        //     sampleRate / bestOffset +
        //     'Hz (rms: ' +
        //     rms +
        //     ' confidence: ' +
        //     bestCorrelation +
        //     ')'
        // )
        return sampleRate / bestOffset
      }
      return -1
      //	var best_frequency = sampleRate/bestOffset;
    },
    noteFromPitch(frequency) {
      const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
      return Math.round(noteNum) + 69
    },
    frequencyFromNoteNumber(note) {
      return 440 * Math.pow(2, (note - 69) / 12)
    },
    centsOffFromPitch(frequency, note) {
      return Math.floor(
        (1200 * Math.log(frequency / this.frequencyFromNoteNumber(note))) /
          Math.log(2)
      )
    },
    median(values) {
      if (values.length === 0) {
        return 0
      }

      values.sort(function(a, b) {
        return a - b
      })

      const half = Math.floor(values.length / 2)

      if (values.length % 2) {
        return values[half]
      }

      return (values[half - 1] + values[half]) / 2.0
    },
  },
}
</script>

<style>
#note {
  font-size: 164px;
}

.droptarget {
  background-color: #348781;
}

div.confident {
  color: black;
}

div.vague {
  color: lightgrey;
}

#note {
  display: inline-block;
  height: 180px;
  text-align: left;
}

#detector {
  width: 300px;
  height: 300px;
  border: 4px solid gray;
  border-radius: 8px;
  text-align: center;
  padding-top: 10px;
}

#output {
  width: 300px;
  height: 42px;
}

#flat {
  display: none;
}

#sharp {
  display: none;
}

.flat #flat {
  display: inline;
}

.sharp #sharp {
  display: inline;
}
</style>
