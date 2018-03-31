/* 普通泡泡 */
let hubbleAni = (canvasBox, num = 3) => {
    let maxX = canvasBox.width
    let maxY = canvasBox.height
    let minWith = 15 // 最大
    let maxWith = 35 // 最小
    let maxT = 20 // 最大速度
    let minT = 5 // 最小速度
    let minOpacity = 0.05 // 最小透明度
    let maxOpacity = 0.15 // 最大透明度
    let hubbleArr = []
    // 画笔
    let ctx = canvasBox.getContext('2d')
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.shadowColor = 'rgba(255,255,255,0.5)'
    ctx.shadowBlur = 10
  
    // 初始化泡泡
    let hubbleInit = () => {
      return {
        x: Math.random() * maxX,
        y: maxY,
        t: minT + Math.random() * (maxT - minT)
      }
    }
  
    // 泡泡初始值
    for (let i = 0; i < num; i++) {
      hubbleArr.push(hubbleInit())
    }
  
    // 绘制泡泡
    let hubbleDraw = (index, timeGap = 100) => {
      let hubbleInfo = hubbleArr[index]
      let r = ((maxY - hubbleInfo.y) * (maxWith - minWith) / maxY) + minWith // 半径
      if (hubbleInfo.y < -(r / 2)) {
        hubbleArr[index] = hubbleInit()
      } else {
        let toY = hubbleInfo.y - timeGap * hubbleInfo.t / 1000
        let hubbleOption = ((maxY - hubbleInfo.y) * (maxOpacity - minOpacity) / maxY) + minOpacity
        ctx.globalAlpha = hubbleOption
        ctx.beginPath()
        ctx.arc(hubbleInfo.x, toY, r, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        hubbleInfo.y = toY
      }
    }
  
    let inter = 0
    // 开始
    let start = () => {
      inter = setInterval(() => {
        ctx.clearRect(0, 0, maxX, maxY)
        draw()
      }, 1000 / 60)
    }
  
    // 暂停
    let stop = () => {
      clearInterval(inter)
    }
  
    // 绘制
    let draw = () => {
      for (let i = 0; i < hubbleArr.length; i++) {
        hubbleDraw(i)
      }
    }
  
    return {
      start: start,
      stop: stop,
      draw: draw
    }
  }
  
  // export default hubbleAni
  