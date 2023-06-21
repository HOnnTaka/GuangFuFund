window.addEventListener("load", () => {
	loading(3000)
	
	const main = document.querySelectorAll("main")[0]
	const nextBtns = document.querySelectorAll(".next")
	nextBtns.forEach(btn => btn.onclick = () => main.scrollBy(0, window.innerHeight))
	page2()
	page3()
	page4()
})

function page2() {
	// img
	const imgBoxs = document.querySelectorAll("#page2 img")
	const urls = ['(1).png', '(2).png', '(3).png', '(1).jpg', '(2).jpg', '(3).JPG']

	const imgs = new Array(urls.length)
	urls.forEach((url, i) => {
		// const test = await getUrlBase64(`./img/bingying/bingying ${url}`)
		// console.log(test)
		// arr.push(test)
		imgs[i] = new Image()
		imgs[i].src = `./img/bingying/bingying ${url}`
	})
	let count = urls.length
	setInterval(() => {
		count = count + 1 >= urls.length ? 0 : count + 1
		for (let i = 0; i < 3; i++) {
			setTimeout(() => {
				const imgBox = imgBoxs[i]
				const num = count + i >= urls.length ? count + i - urls.length : count + i
				imgBox.classList.add("on")
				setTimeout(() => {
					// console.log(i * 100 + 500);
					imgBox.src = imgs[num].src
					imgBox.classList.remove("on")
				}, i * 100 + 500)
			}, i * 100)
		}
	}, 5000)
	// function getUrlBase64(url) {
	// 	return new Promise((resolve, reject) => {
	// 		let canvas = document.createElement("canvas")
	// 		const ctx = canvas.getContext("2d")
	// 		let img = new Image()
	// 		img.crossOrigin = "Anonymous"
	// 		img.src = url
	// 		img.onload = function() {
	// 			canvas.height = img.height
	// 			canvas.width = img.width
	// 			ctx.drawImage(img, 0, 0, img.width, img.height)
	// 			const dataURL = canvas.toDataURL("image/jpeg", 1)
	// 			resolve(dataURL)
	// 			canvas = null
	// 			img = null
	// 		}
	// 		img.onerror = function() {
	// 			reject(new Error(url))
	// 		}
	// 	})
	// }

	// more
	const moreBox = document.querySelector("#page2 .more")
	let moreBoxTimer = setInterval(moreScroll, 30)

	moreBox.onmouseenter = () => {
		clearInterval(moreBoxTimer)
		moreBoxTimer = null
	}
	moreBox.onmouseleave = () => {
		if (moreBoxTimer) moreBox.onmouseenter()
		moreBoxTimer = setInterval(moreScroll, 30)
	}
	moreBox.ontouchstart = () => {
		moreBox.onmouseenter()
	}
	moreBox.ontouchend = () => {
		setTimeout(moreBox.onmouseleave, 100)
	}

	function moreScroll() {
		if (moreBox.scrollTop + moreBox.clientHeight + 5 >= moreBox.scrollHeight) {
			clearInterval(moreBoxTimer)
			moreBoxTimer = null
			moreBox.style.scrollBehavior = "smooth"
			setTimeout(() => moreBox.scrollTo(0, 0), 1000)
			setTimeout(() => {
				moreBox.style.scrollBehavior = "unset"
				if (moreBoxTimer) {
					moreBox.onmouseenter()
				}
				moreBoxTimer = setInterval(moreScroll, 30)
			}, 2000)
		}
		moreBox.scrollBy(0, 1)
	}

	// progress
	const progressBox = document.querySelector("#page2 div.progress")
	let a, b, maxWidth
	progress(true)

	window.addEventListener("resize", tools.debounce(() => {
		progress(true)
	}, 500))

	function progress(reload) {
		if (reload) {
			maxWidth = progressBox.children[1].children[0].offsetWidth
			a = Number(progressBox.children[0].children[0].innerHTML)
			b = Number(progressBox.children[2].children[0].innerHTML)
		}
		progressBox.children[1].children[0].style = `clip:rect(0,${a/(a + b)*maxWidth}px,100vh,0)`
	}
	// subsidize
	const subsidizeBtn = document.querySelector("#page2 .subsidize")
	subsidizeBtn.onclick = async () => {
		if (b == 0) return tools.toast("项目筹款已完成", 1000)
		const res = await tools.comfirm("请输入资助金额：饼印文化", true)
		if (res.type == 'comfirm') {
			if (res.data <= 0 || res.data == '') return
			const step = 33
			const add = Number(res.data > b ? b : res.data)
			for (let i = 1; i <= step; i++) {
				setTimeout(() => {
					const ta = a + i * add / step
					const tb = b - i * add / step
					progressBox.children[0].children[0].innerHTML = i != step ? ta.toFixed(2) : a + add
					progressBox.children[2].children[0].innerHTML = i != step ? tb.toFixed(2) : b - add
					progress(i == step)
				}, i * 33)
			}
			setTimeout(() => tools.toast("资助成功", 1000), step * 33)
		}
	}

	// BigTimeRemaining
	const timeBox = document.querySelector("#page2 .timeBox")
	const time = document.querySelectorAll("#page2 .timeBox span")
	const endTime = new Date("2023-6-15")

	setInterval(() => {
		// const num = parseInt((endTime.getTime() - new Date().getTime()) / 1000)
		// const dd = parseInt(num / 60 / 60 / 24)
		// const hh = parseInt(num / 60 / 60 - dd * 24)
		// const mm = parseInt(num / 60 - dd * 24 * 60 - hh * 60)
		// const ss = parseInt(num - dd * 24 * 60 * 60 - hh * 60 * 60 - mm * 60)
		const res = tools.timeRemaining(endTime)
		for (let i = 0; i < 4; i++) {
			time[i].innerHTML = res[i]
		}
	}, 1000)


	// like
	const like = document.querySelector("#page2 .like")
	if (!localStorage.like) {
		localStorage.like = JSON.stringify({
			num: 10086,
			today: 0,
			date: new Date().toDateString()
		})
	}
	like.children[0].innerHTML = JSON.parse(localStorage.like).num
	like.onclick = () => {
		if (localStorage.like) {
			let data = JSON.parse(localStorage.like)
			if (data.date != new Date().toDateString()) {
				localStorage.like = JSON.stringify({
					num: data.num,
					today: 0,
					date: new Date().toDateString()
				})
			}
			if (data.today < 5) {
				data.today += 1
				data.num += 1
				like.children[0].innerHTML = data.num
				localStorage.like = JSON.stringify(data)
			} else {
				tools.toast("最多点赞5次", 1000)
			}
		}
		like.classList.add(("on"))
		setTimeout(() => like.classList.remove(("on")), 500)
	}

	// entry animation
	const els = document.querySelectorAll("#page2>*:not(:last-child)")
	els.forEach(el => tools.entryAnimation.bunching.observe(el))
}

function page3() {
	// timeRemaining
	const timeBoxs = document.querySelectorAll("#page3 .time")
	const endTime = new Date("2023-5-30")
	setInterval(() => {
		const res = tools.timeRemaining(endTime)
		timeBoxs.forEach(item => {
			item.innerHTML = `剩余：${res[0]}天${res[1]}时${res[2]}分${res[3]}秒`
		})
	}, 1000)

	// img
	const imgBox = document.querySelectorAll("#page3 figure")
	imgBox.forEach((box, index) => {
		const scrollBox = box.parentElement
		setTimeout(() => {
			setInterval(() => {
				const width = box.children[0].clientWidth
				if (Math.ceil(scrollBox.scrollLeft) >= scrollBox.scrollWidth - scrollBox.clientWidth) {
					scrollBox.scrollTo(0, 0)
				} else {
					scrollBox.scrollBy(width, 0)
				}
			}, 5000)
		}, index * 100)
	})
	// funding
	const fundraisingBox = document.querySelectorAll("#page3 .fundraising")
	fundraisingBox.forEach((box) => {
		const show = box.children[0].children[0]
		box.children[1].onclick = async (e) => {
			e.preventDefault()
			const res = await tools.comfirm("请输入资助金额", true)
			if (res.data <= 0 || res.data == '') return
			if (res.type == "comfirm") {
				const origin = show.getAttribute("data-num")
				const final = Number(origin) + Number(res.data)
				tools.stepAdd(origin,res.data,33,show,numFormat)
				.then(()=>{
					tools.toast("资助成功", 1000)
					// setTimeout(() => console.log(show.getAttribute("data-num")), 2000)
					show.setAttribute("data-num", final)
				})
				// for (let i = 1; i <= step; i++) {
				// 	setTimeout(() => {
				// 		show.innerHTML = numFormat(i == step ? final : Number(origin) + i * res.data / step)
				// 	}, i * 33)
				// }

			}
		}
	})

	function numFormat(num) {
		if (num > Math.pow(10, 8)) {
			return (num / Math.pow(10, 8)).toFixed(2) + '亿'
		}
		if (num > Math.pow(10, 4)) {
			return (num / Math.pow(10, 4)).toFixed(2) + '万'
		}
		return num.toFixed(2)
	}

	const articles = document.querySelectorAll("#page3 article")
	articles.forEach(el => {
		// entryAnimation
		tools.entryAnimation.slide.observe(el)

		// toggle
		el.onclick = () => {
			articles.forEach(article => article.classList.remove("on"))
			el.classList.add("on")
		}
	})
}

function page4() {
	const numBox = document.getElementById("numBox")
	const countBox = document.getElementById("countBox")
	
	// stepAddAnimation
	const io = new IntersectionObserver(entries => {
		const entry = entries[0]
		if (entry.isIntersecting) {
			stepAdd(numBox, calcTotal(), 66, 33)
			stepAdd(countBox, countBox.getAttribute("data-num"), 33, 50)
		} else {
		}
	}, {
		threshold: [0]
	})
	io.observe(countBox)

	function stepAdd(el, target, step, speed) {
		for (let i = 1; i <= step; i++) {
			setTimeout(() => {
				el.innerHTML = numFormat(i == step ? target : i * target / step)
			}, i * speed)
		}
	}

	function numFormat(num) {
		if (num > Math.pow(10, 9)) {
			return ((num / Math.pow(10, 8)).toFixed(2) + '亿')
		}
		if (num > Math.pow(10, 5)) {
			return ((num / Math.pow(10, 4)).toFixed(2) + '万')
		}
		return parseInt(num)
	}

	function calcTotal() {
		let total = Number(document.querySelector(".progress").children[0].children[0].innerHTML)
		document.querySelectorAll(".fundraising").forEach(item => {
			total += Number(item.children[0].children[0].getAttribute("data-num"))
		})
		return total
	}
}