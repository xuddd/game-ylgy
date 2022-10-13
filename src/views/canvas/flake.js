import { random, randomMax, randomMaxCeil } from './util'

class Flake {
  constructor(canvas, size, fallSpeed) {
    this.canvas = canvas
    this.maxSize = size
    this.fallSpeed = fallSpeed

    // Y方向速度
    this.speed = 1 * random() + fallSpeed
    // 用来计算X方向偏移
    this.stepSize = random() / 30
    this.step = 0

    // 背景色
    const r = ~~(256 * random())
    const g = ~~(256 * random())
    const b = ~~(256 * random())
    this.rgba = `rgba(${r}, ${g}, ${b}, 1)`

    // 旋转角度
    this.rot = 0

    this.reset()
    // 初始化时候，让碎屑随机分布在屏幕上
    this.y = randomMax(canvas.height)
  }
  // 更新礼花碎屑位置
  update() {
    this.velX *= 0.98
    this.velY <= this.speed && (this.velY = this.speed)
    this.velX += Math.cos(this.step += 0.05) * this.stepSize
    this.y += this.velY
    this.x += this.velX

    if (
      this.x >= this.canvas.width ||
      this.x <= 0 ||
      this.y >= this.canvas.height ||
      this.y <= 0
    ) {
      this.reset()
    }
  }
  // 礼花碎屑重置到最上面，大小和X方向位置重新随机
  reset() {
    const { canvas, maxSize, speed } = this

    this.x = randomMax(canvas.width)
    this.y = 0
    this.size = random() * maxSize + 2
    this.velY = speed
    this.velX = 0
  }
}

// 圆形
export class CircularFlake extends Flake {
  constructor(canvas, size, fallSpeed) {
    super(canvas, size, fallSpeed)
    this.radius = randomMaxCeil(size / 2)
  }

  render(ctx) {
    const { x, y, rgba, radius } = this
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = rgba
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
    ctx.fill()
    ctx.restore()
  }
}

// 方形
export class SquareFlake extends Flake {
  constructor(canvas, size, fallSpeed) {
    super(canvas, size, fallSpeed)
    this.width = this.height = randomMaxCeil(size)
  }

  render(ctx) {
    const { x, y, rgba, rot, width, height } = this
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = rgba
    ctx.translate(x, y)
    ctx.rotate(rot * Math.PI / 180)
    ctx.translate(-x, -y)
    ctx.fillRect(x - width / 2, y - height / 2, width, height)
    ctx.restore()
  }
}

// 矩形
export class RectangleFlake extends Flake {
  constructor(canvas, size, fallSpeed) {
    super(canvas, size, fallSpeed)
    this.width = randomMaxCeil(size)
    this.height = randomMaxCeil(size)
  }

  render(ctx) {
    const { x, y, rgba, rot, width, height } = this
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = rgba
    ctx.translate(x, y)
    ctx.rotate(rot * Math.PI / 180)
    ctx.translate(-x, -y)
    ctx.fillRect(x - width / 2, y - height / 2, width, height)
    ctx.restore()
  }
}

// 三角形
export class TriangleFlake extends Flake {
  constructor(canvas, size, fallSpeed) {
    super(canvas, size, fallSpeed)
    this.width = this.height = randomMaxCeil(size)
  }

  render(ctx) {
    const { x, y, rgba, rot, width, height } = this
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = rgba
    ctx.translate(x, y)
    ctx.rotate(rot * Math.PI / 180)
    ctx.translate(-x, -y)
    ctx.moveTo(x - width / 2, y + 0.333 * height)
    ctx.lineTo(x + width / 2, y + 0.333 * height)
    ctx.lineTo(x, y - 0.666 * height)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}