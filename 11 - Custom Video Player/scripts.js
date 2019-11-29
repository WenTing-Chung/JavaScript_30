/// Get Our Elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

/// Build out functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}
function updateButton() {
  const icon = this.paused ? '►' : '❚❚'
  toggle.textContent = icon
  // console.log('Update the button')
}
function skip() {
  // console.log(this.dataset.skip)
  video.currentTime += parseFloat(this.dataset.skip)
}
function handleRangeUpdate() {
  video[this.name] = this.value
  // console.log(this.name) // 觸發的屬性
  // console.log(this.value) // 改變的值
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100 // (影片當前時間 / 影片長度) * 100
  progressBar.style.flexBasis = `${percent}%`
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

/// Hook up the event listens
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', () => {
  if (mousedown) {
    scrub()
  }
})
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)) // if 功能 => && 前為條件, true 時執行後面
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)