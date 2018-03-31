// import hubbleAni from './animation/hubble'
// import iconHubbleAni from './animation/iconHubble'
// import waveAni from './animation/wave'

let background = (canvasBox) => {
  let useHubble = false
  let useIconHubble = false
  let useWave = false

  let inter = null
  let maxX = canvasBox.width
  let maxY = canvasBox.height

  // 画笔
  let ctx = canvasBox.getContext('2d')
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.shadowColor = 'rgba(255,255,255,0.5)'
  ctx.shadowBlur = 10

  // 开始
  let start = () => {
    inter = setInterval(() => {
      ctx.clearRect(0, 0, maxX, maxY)
      if (useHubble) {
        useHubble.draw()
      }
      if (useIconHubble) {
        useIconHubble.draw()
      }
      if (useWave) {
        useWave.draw()
      }
    }, 1000 / 60)
  }

  // 停止
  let stop = () => {
    clearInterval(inter)
  }

  // 泡泡
  let hubble = (num) => {
    useHubble = hubbleAni(canvasBox, num)
  }

  // 特殊泡泡
  let iconHubble = () => {
    useIconHubble = iconHubbleAni(canvasBox)
  }

  // 海浪
  let wave = () => {
    useWave = waveAni(canvasBox)
    return useWave
  }

  return {
    hubble: hubble,
    iconHubble: iconHubble,
    wave: wave,
    start: start,
    stop: stop
  }
}

// export default bgAni
