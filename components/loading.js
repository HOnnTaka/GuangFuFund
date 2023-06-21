document.write(`
<section id="loading">
			<div></div>
			<p><span>0</span><span>%</span></p>
			<img src="./img/illustration/circleon.png" alt="">
			<img class="over" src="./img/logo/logo2.png" alt="">
		</section>
`)
const loadingCompelete  = new Event("loadingCompelete")

function loading(duration) {
	const loading = document.getElementById("loading")
	// const restTime = 3000 - new Date().getTime() + starTime
	// console.log(restTime);
	// loading.style = `--transition-duration:${duration}ms`
	let num = 0
	loading.children[3].classList.remove("over")
	let loadTimer = setInterval(() => {
		num++
		loading.children[1].children[0].innerHTML = num
		if (num == 100) {
			clearInterval(loadTimer)
			setTimeout(() => {
				document.dispatchEvent(loadingCompelete)
				loading.classList.add("hide")
			}, 500)
		}
	}, (duration - 500) / 100)
	loading.children[1].style.opacity = 1
}