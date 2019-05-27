export default {
  bind (el, binding) {
    if (!binding.value) throw Error('v-image 指令缺少默认图片路径')

    el.onerror = (e) => {
      if (e.target.currentSrc === binding.value) return
      el.src = binding.value
    }
  },
}
