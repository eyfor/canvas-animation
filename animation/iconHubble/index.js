/* 图标泡泡 */
// import icon1 from '@/assets/images/icon/index-comp.png'
// import icon2 from '@/assets/images/icon/index-elec.png'
// import icon3 from '@/assets/images/icon/index-global.png'
// import icon4 from '@/assets/images/icon/index-msg.png'

let icon1 = './animation/iconHubble/images/index-comp.png'
let icon2 = './animation/iconHubble/images/index-elec.png'
let icon3 = './animation/iconHubble/images/index-global.png'
let icon4 = './animation/iconHubble/images/index-msg.png'

let iconHubbleAni = (canvasBox) => {
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

  let img1 = new Image()
  img1.src = icon1
  let img2 = new Image()
  img2.src = icon2
  let img3 = new Image()
  img3.src = icon3
  let img4 = new Image()
  img4.src = icon4
  let iconArr = [img1, img2, img3, img4]

  // 初始化泡泡
  let hubbleInit = (index) => {
    return {
      img: iconArr[index],
      x: Math.random() * maxX,
      y: maxY,
      t: minT + Math.random() * (maxT - minT)
    }
  }

  // 泡泡初始值
  for (let i = 0; i < iconArr.length; i++) {
    hubbleArr.push(hubbleInit(i))
  }

  // 绘制泡泡
  let hubbleDraw = (index, timeGap = 100) => {
    let hubbleInfo = hubbleArr[index]
    let r = ((maxY - hubbleInfo.y) * (maxWith - minWith) / maxY) + minWith // 半径
    if (hubbleInfo.y < -(r / 2)) {
      hubbleArr[index] = hubbleInit(index)
    } else {
      let toY = hubbleInfo.y - timeGap * hubbleInfo.t / 1000
      let hubbleOption = ((maxY - hubbleInfo.y) * (maxOpacity - minOpacity) / maxY) + minOpacity
      ctx.globalAlpha = hubbleOption
      ctx.drawImage(hubbleInfo.img, hubbleInfo.x, toY, r * 2, r * 2)
      hubbleInfo.y = toY
    }
  }

  let inter = 0
  // 开始
  let start = () => {
    inter = setInterval(() => {
      ctx.clearRect(0, 0, maxX, maxY)
      for (let i = 0; i < hubbleArr.length; i++) {
        hubbleDraw(i)
      }
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

// export default iconHubbleAni
