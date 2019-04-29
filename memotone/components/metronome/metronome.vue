<template>
  <div>
    <button @click="toggleMetronome">{{ metronomeInputButton }}</button>
    <metronome-icon class="metronome-icon" />
  </div>
</template>

<script>
import metronomeIcon from '../../static/images/icons/metronome-icon.svg'

export default {
  components: {
    metronomeIcon,
  },
  props: {
    tempo: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      audioContext: null,
      isPulsing: false,
      metronomeBpm: 60,
      metronomeInputButton: 'Start metronome',
      metronomeInterval: null,
      oscillator: null,
      tempoDidChange: false,
    }
  },
  watch: {
    tempo: function () {
      this.tempoDidChange = true
    },
  },
  methods: {
    toggleMetronome () {
      if (this.isPulsing) {
        this.isPulsing = false
        this.metronomeInputButton = 'Start metronome'
        this.stopMetronome()
      } else {
        this.isPulsing = true
        this.metronomeInputButton = 'Stop metronome'
        this.startMetronome()
      }
    },
    processAudio () {
      this.audioContext = new AudioContext()
      this.oscillator = this.audioContext.createOscillator()
      this.oscillator.connect(this.audioContext.destination)
      this.oscillator.start()
      this.oscillator.stop(.2)

      if (this.tempoDidChange) {
        this.tempoDidChange = false
        this.stopMetronome()
        this.startMetronome()
      }
    },
    startMetronome () {
      this.processAudio()
      this.metronomeInterval = setInterval(
        this.processAudio, 60000 / this.tempo
      )
    },
    stopMetronome () {
      this.oscillator.stop(0)
      clearInterval(this.metronomeInterval)
      this.audioContext = null
    },
  },
}
</script>

<style>
#tempo {
  display: block;
}

.metronome-icon {
  width: 24px;
  height: 24px;
}
</style>
