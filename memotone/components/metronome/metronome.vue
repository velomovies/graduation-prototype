<template>
  <div>
    <button @click="toggleMetronome">
      {{ metronomeInputButton }}
      <metronome-icon class="metronome-icon" />
    </button>

  </div>
</template>

<script>
import metronomeIcon from '../../static/images/icons/metronome-icon.svg'

export default {
  components: {
    metronomeIcon,
  },
  data () {
    return {
      audioContext: null,
      isPulsing: false,
      metronomeInputButton: 'Start metronome',
      metronomeInterval: null,
      oscillator: null,
      tempoDidChange: false,
    }
  },
  mounted () {
    this.$store.watch(
      state => state.bpm, () => this.tempoDidChange = true
    )
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
        this.processAudio, 60000 / this.$store.state.bpm
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
