export default{
  setPassWord (state,Object) {
    state.passWord = Object
  },

  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  }
}
