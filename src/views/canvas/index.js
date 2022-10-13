import { randomMax } from './util'
import { CircularFlake, SquareFlake, RectangleFlake, TriangleFlake } from './flake'

export default class CanvasFlake {
  constructor(opts) {
    // const {
    //   maxFlake = 200,
    //   flakeSize = 10,
    //   fallSpeed = 2,
    //   parentNode = document.body
    // } = opts
    // Object.assign(this, { maxFlake, flakeSize, fallSpeed, parentNode })

    let opt = opts || {}
    this.maxFlake = opt.maxFlake || 200
    this.flakeSize = opt.flakeSize || 10
    this.fallSpeed = opt.fallSpeed || 2
    this.parentNode = opt.parentNode || document.body

    // status: 0 初始状态  1 开始状态   2 停止状态   3 暂停状态  4 重新开始
    this.status = 0
    this.canvas = null
    this.ctx = null
    this.flakes = []
  }
  // 在指定的DOM中插入canvas，并设置相关属性
  initCanvas() {
    const canvas = document.createElement('canvas')
    canvas.id = 'Paperfall'
    canvas.width = this.parentNode.clientWidth
    canvas.height = this.parentNode.clientHeight
    canvas.setAttribute('style', 'position:absolute;top:0;left:0;z-index:0;pointer-events:none;')
    this.parentNode.appendChild(canvas)
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    window.onresize = function() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  }
  // 生成maxFlake个随机类型的碎片
  getFlakes() {
    const flakeTypes = [
      CircularFlake,
      SquareFlake,
      RectangleFlake,
      TriangleFlake
    ]
    for (let i = 0; i < this.maxFlake; i++) {
      this.flakes.push(new flakeTypes[randomMax(flakeTypes.length)](this.canvas, this.flakeSize, this.fallSpeed))
    }
  }
  // canvas中渲染所有碎片
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.flakes.forEach(item => {
      item.update()
      item.render(this.ctx)
    })
    this.loop = window.requestAnimationFrame(() => {
      // 用CanvasFlake去执行，否则找不到ctx、flakes等
      this.render.apply(this)
    })
  }

  start() {
    if (this.status === 1 || this.status === 4) return
    this.status = 1

    this.initCanvas()
    this.getFlakes()
    this.render()
  }

  stop() {
    if (this.status === 2 || this.status === 0 || !this.canvas) return
    this.pause()
    this.status = 2
    this.parentNode.removeChild(this.canvas)
    this.canvas = null
  }

  pause() {
    if (this.status === 3) return
    this.status = 3
    window.cancelAnimationFrame(this.loop)
  }

  resume() {
    if (this.status === 3 && this.canvas) {
      this.status = 4
      this.loop = window.requestAnimationFrame(() => {
        this.render.apply(this)
      })
    }
  }
}