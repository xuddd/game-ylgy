export const random = () => Math.random()

// 不包含max
export const randomMax = max => Math.floor(Math.random() * max)

// 包含max
export const randomMaxCeil = max => Math.ceil(Math.random() * max)

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      return setTimeout(callback, Math.floor(1000 / 60))
    }
  )
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    clearTimeout
  )
}