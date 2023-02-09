
function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const avatar = document.querySelector('#player')
const coin = document.querySelector('#coin')
const score = document.querySelector('.score')
const closeInstruction = document.querySelector('.instruction__close')
let currScore = 0

window.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowDown' || e.key === 'Down') {
        moveVertical(avatar, 5)
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        moveVertical(avatar, -5)
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        moveHorizontal(avatar, 5)
        avatar.style.transform = 'scale(1,1)'
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        moveHorizontal(avatar, -5)
        avatar.style.transform = 'scale(-1,1)'
    }
    if (isTouching(avatar, coin)) {
        moveCoin()
        addScore()
    } 
})

window.addEventListener('keyup', function(e) {
    if (e.key === ' ') {
        jump(avatar, -15)
    }
})

const moveVertical = (element, amount) => {
    const currTop = extractPos(element.style.top)
    element.style.top = `${currTop + amount}vh`
}

const jump = (element, amount) => {
    const currTop = extractPos(element.style.top)
    const jumpAnimation = [
        {top : `${currTop }vh`},
        {top : `${currTop + amount}vh`},
        {top : `${currTop }vh`}
    ]

    const timeAnimation = {
        duration: 500,
        interations: 1,
    }
    element.animate(jumpAnimation, timeAnimation) 
}

const moveHorizontal = (element, amount) => {
    const currLeft = extractPos(element.style.left)
    element.style.left = `${currLeft + amount}vw`
}

const extractPos = pos => {
    if(!pos) return 5;
    if(parseInt(pos) > 85) {
        return -20
    } 
    if (parseInt(pos) < -20) {
        return 90
    }
    return parseInt(pos.slice(0, -2))
}

const moveCoin = () => {
    const x = Math.floor(Math.random() * 95)
    const y = Math.floor(Math.random() * 95)

    coin.style.top = `${y}vh`
    coin.style.left = `${x}vw`
}
moveCoin()

const addScore = () => {
    score.innerText = currScore
    currScore += 1
    return currScore
}
addScore()

closeInstruction.addEventListener('click', () => {
    closeInstruction.parentElement.style.display = "none"
})

const changePageTitle = () => {
    if(document.visibilityState === 'visible') {
        document.title = 'Catch The Coin!'
    } else {
        document.title = 'Come back :('
    }
}

document.addEventListener('visibilitychange', changePageTitle)