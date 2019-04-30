export const state = () => {
  return {
    bpm: 60,
    musicName: 'Muziekje',
  }
}

export const mutations = {
  setBpm (state, value) {
    state.bpm = value
  },
}
