/* 海浪 */
let iconTest1 = './animation/wave/images/index-test1.png'
let iconTest2 = './animation/wave/images/index-test2.png'
let iconTest3 = './animation/wave/images/index-test3.png'

let waveAni = (canvasBox) => {
  let maxX = canvasBox.width
  let maxY = canvasBox.height
  let num = 3
  let waveArr = []
  let waveMinHeight = 50 // 海浪最小高度
  let waveMaxHeight = 100 // 海浪最大高度
  let minT = 5
  let maxT = 10
  let iconWith = 50 // icon大小
  // let consolR = 100 // 控制点活动范围
  let waveGap = 20 // 海浪间距
  let mX = 0 // 鼠标坐标
  let mY = 0
  // icon
  let img1 = new Image()
  img1.src = iconTest1
  let img2 = new Image()
  img2.src = iconTest2
  let img3 = new Image()
  img3.src = iconTest3
  let iconArr = [img1, img2, img3]
  let mOnArr = [false, false, false]
  let clickFun = (index) => {
    console.log(index)
  }

  // 画笔
  let ctx = canvasBox.getContext('2d')
  ctx.strokeStyle = 'rgba(255,255,255,1)'
  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx.shadowColor = 'rgba(255,255,255,1)'
  ctx.shadowBlur = 1

  // 贝塞尔曲线控制点
  function getCtrlPoint (ps, i, a, b) {
    if (!a || !b) {
      a = 0.25
      b = 0.25
    }
    let pAx
    let pAy
    let pBx
    let pBy
    // 处理两种极端情形
    if (i < 1) {
      pAx = ps[0].x + (ps[1].x - ps[0].x) * a
      pAy = ps[0].y + (ps[1].y - ps[0].y) * a
    } else {
      pAx = ps[i].x + (ps[i + 1].x - ps[i - 1].x) * a
      pAy = ps[i].y + (ps[i + 1].y - ps[i - 1].y) * a
    }
    if (i > ps.length - 3) {
      var last = ps.length - 1
      pBx = ps[last].x - (ps[last].x - ps[last - 1].x) * b
      pBy = ps[last].y - (ps[last].y - ps[last - 1].y) * b
    } else {
      pBx = ps[i + 1].x - (ps[i + 2].x - ps[i].x) * b
      pBy = ps[i + 1].y - (ps[i + 2].y - ps[i].y) * b
    }
    return {
      pA: {x: pAx, y: pAy},
      pB: {x: pBx, y: pBy}
    }
  }

  // 初始化海浪
  let waveInit = (i) => {
    // let startY = maxY - Math.random() * (waveMaxHeight - waveMinHeight) - waveMinHeight
    return {
      // 原计算控制点曲线-二次贝塞尔曲线
      /*
      startX: 0,
      startY: maxY - Math.random() * (waveMaxHeight - waveMinHeight) - waveMinHeight,
      endX: maxX,
      endY: maxY - Math.random() * (waveMaxHeight - waveMinHeight) - waveMinHeight,
      x1: maxX / 4 - (consolR - Math.random() * consolR * 2),
      y1: maxY - (waveMinHeight - (consolR - Math.random() * consolR * 2)),
      x2: maxX * 3 / 4 - (consolR - Math.random() * consolR * 2),
      y2: maxY - (waveMaxHeight - (consolR - Math.random() * consolR * 2)),
      */
      // 计算过点
      point: [
        {x: 0, y: maxY - Math.random() * (waveMaxHeight - waveMinHeight) - waveMinHeight - i * waveGap, z: 0},
        {x: maxX / 4, y: maxY - waveMinHeight - Math.random() * (waveMaxHeight - waveMinHeight) - i * waveGap, z: 1},
        {x: maxX / 2, y: maxY - waveMinHeight - Math.random() * (waveMaxHeight - waveMinHeight) - i * waveGap, z: 0},
        {x: maxX * 3 / 4, y: maxY - waveMinHeight - Math.random() * (waveMaxHeight - waveMinHeight) - i * waveGap, z: 1},
        // {x: maxX * 4 / 5, y: maxY - waveMinHeight - Math.random() * (waveMaxHeight - waveMinHeight) - i * waveGap, z: 0},
        {x: maxX, y: maxY - Math.random() * (waveMaxHeight - waveMinHeight) - waveMinHeight - i * waveGap, z: 0}
      ],
      t: Math.random() * (maxT - minT) + minT
    }
  }

  // 海浪初始值
  for (let i = 0; i < num; i++) {
    waveArr.push(waveInit(i))
  }

  // 绘制海浪
  let waveDraw = (index, timeGap = 33) => {
    let wave = waveArr[index]
    ctx.beginPath()
    ctx.globalAlpha = 0.1
    // 原计算控制点曲线-二次贝塞尔曲线
    /*
    ctx.moveTo(wave.startX, wave.startY)
    ctx.bezierCurveTo(wave.x1, wave.y1, wave.x2, wave.y2, wave.endX, wave.endY)
    ctx.lineTo(maxX, maxY)
    ctx.lineTo(0, maxY)
    ctx.fill()
    */
    for (let i = 0; i < wave.point.length; i++) {
      if (wave.point[i].z) {
        wave.point[i].y += wave.t * timeGap / 1000
        if (wave.point[i].y > (maxY - waveMinHeight - waveGap * index)) { wave.point[i].z = 0 }
      } else {
        wave.point[i].y -= wave.t * timeGap / 1000
        if (wave.point[i].y < (maxY - waveMaxHeight - waveGap * index)) { wave.point[i].z = 1 }
      }
      if (i === 0) {
        ctx.moveTo(wave.point[i].x, wave.point[i].y)
      } else {
        let ctrlP = getCtrlPoint(wave.point, i - 1)
        ctx.bezierCurveTo(ctrlP.pA.x, ctrlP.pA.y, ctrlP.pB.x, ctrlP.pB.y, wave.point[i].x, wave.point[i].y)
      }
    }
    ctx.lineTo(maxX, maxY)
    ctx.lineTo(0, maxY)
    ctx.fill()
    ctx.stroke()
    if (index < iconArr.length) {
      ctx.globalAlpha = 0.1
      // 判断鼠标是否在其上
      if (Math.sqrt(Math.pow(((mX - iconWith / 2) - wave.point[index + 1].x), 2) + Math.pow(((mY + iconWith / 2) - wave.point[index + 1].y), 2)) < (iconWith / 2)) {
        ctx.globalAlpha = 0.4
        mOnArr[index] = true
      } else {
        mOnArr[index] = false
      }
      // 绘制ICON
      ctx.drawImage(iconArr[index], wave.point[index + 1].x, wave.point[index + 1].y - iconWith, iconWith, iconWith)
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
    for (let i = 0; i < waveArr.length; i++) {
      waveDraw(i)
    }
  }

  // 监听鼠标事件
  window.onmousemove = (e) => {
    // 计算鼠标相对canvas坐标 (虽然这里不是太有必要,但依然考虑计算了canvas缩放的情况)
    mX = e.clientX - canvasBox.getBoundingClientRect().left * (canvasBox.width / canvasBox.getBoundingClientRect().width)
    mY = e.clientY - canvasBox.getBoundingClientRect().top * (canvasBox.height / canvasBox.getBoundingClientRect().height)
  }
  window.onclick = (e) => {
    mOnArr.some((isUse, index) => {
      if (isUse) {
        clickFun(index)
      }
      return isUse
    })
  }

  // 回调事件
  let clickCb = (cb) => {
    clickFun = cb
  }

  return {
    start: start,
    stop: stop,
    draw: draw,
    clickCb: clickCb
  }
}

// export default waveAni
