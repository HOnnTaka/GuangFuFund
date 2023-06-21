window.addEventListener("load", () => {
	// loading
	loading(2000)

	const articles = document.querySelectorAll("#articleBox article")
	const articleBox = document.getElementById("articleBox")

	// filterBtn
	let filterNow = ''
	const filterBtns = document.querySelectorAll("#filter article div div")
	filterBtns.forEach(btn => {
		btn.onclick = () => {
			if (filterNow == btn.innerHTML) return
			filterNow = btn.innerHTML
			// toggle
			filterBtns.forEach(item => item.classList.remove("on"))
			btn.classList.add("on")

			// filter
			let count = 0
			articles.forEach(article => {
				article.style = `transform:translateX(50%);opacity:0;`
				const type = article.getAttribute("data-type")
				if (type == btn.innerHTML || btn.innerHTML == "全部") {
					count++;
					article.classList.remove("hide")
					setTimeout(() => {
						article.style =
							`transform:translateX(0%);opacity:1;`
					}, 500)
				} else {
					setTimeout(() => {
						article.style =
							`order:9999999;transform:translateX(50%);opacity:0;`
							article.classList.add("hide")
					}, 500)
				}
			})
			// height
			// const lowerHeight = (count + 1) * (articles[0].offsetHeight )
			// const upperHeight = lowerHeight + window.innerHeight * 0.55
			// articleBox.style.height = `${upperHeight}px`
		}
	})

	// articles
	articles.forEach(article => {
		// entryAnimation
		tools.entryAnimation.slide.observe(article)

		// toggle
		article.children[4].onclick = () => {
			article.classList.toggle("on")
			// article.classList.add("fadeInOut")
			// setTimeout(() => article.classList.remove("fadeInOut"), 500)
		}

		// img
		const ltBtn = article.children[1].children[0]
		const gtBtn = article.children[1].children[1]
		const imgs = article.children[1].querySelectorAll("img")
		const imgBox = article.children[1]
		const length = imgs.length
		let count = 0

		let timer = setInterval(() => run(1), 5000)

		imgBox.onmouseenter = () => {
			clearInterval(timer)
		}
		imgBox.onmouseleave = () => {
			timer = setInterval(() => run(1), 5000)
		}
		ltBtn.onclick = () => {
			tools.debounce(()=>{
				run(-1)
			},200)
		}
		gtBtn.onclick = () => {
			run(1)
		}
		run(1)
		function run(add) {
			count = count + add >= length ? 0 : count + add < 0 ? length - 1 : count + add
			for (let i = 0; i < length; i++) {
				imgs[i].className = i == count ? "l1" :
					i == count - 1 || count == 0 && i == length - 1 ? "l2" :
					i == count + 1 || count == length - 1 && i == 0 ? "l3" :
					"other"
			}
		}

		// funding
		const fundingBtn = article.children[3].children[2]
		const fundraising = article.children[3].children[1].children[0]

		fundingBtn.onclick = async () => {
			const res = await tools.comfirm(`请输入资助金额`, true)
			if (res.type != 'comfirm' || res.data <= 0) return
			const from = Number(fundraising.getAttribute("data-num"))
			tools.stepAdd(from, Number(res.data), 33, fundraising).then(() => {
				fundraising.setAttribute("data-num", from + Number(res.data))
				tools.toast("资助成功",1000)
			})

		}
	})

	// timeRemaining
	const timeBox = document.querySelectorAll(".time")
	const endTime = new Date("2023-5-30")
	setInterval(() => {
		const res = tools.timeRemaining(endTime)
		timeBox.forEach(item => item.innerHTML = `剩余：${res[0]}天${res[1]}时${res[2]}分${res[3]}秒`)
	}, 1000)
})