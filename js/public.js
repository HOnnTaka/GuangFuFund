document.head.insertAdjacentHTML(
	"beforeend",
	`
<link rel="stylesheet" href="./css/loading.css">
<link rel="stylesheet" href="./css/public.css">
<link rel="shortcut icon" href="./img/logo/logo.png" type="image/x-icon">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/sidebar.css">
<link rel="stylesheet" href="css/banner.css">
<link rel="stylesheet" href="css/footer.css">
`
);
document.write(`
<script src="./components/loading.js"></script>
<script src="./components/header.js"></script>
<script src="./components/sidebar.js"></script>
<script src="./components/banner.js"></script>
<script src="./components/footer.js"></script>
		
<section id="toastBox" class="">
		<p>some message</p>
</section>

<section id="comfirm" class="">
		<div>
			<p>some message</p>
			<article>
				<input type="number" />
			</article>
			<article>
				<div>确认</div>
				<div>取消</div>
			</article>
		</div>
</section>

<section id="toTop" class="">
		&lt
</section>
`);

// let isMobile =/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let pageName = window.location.pathname.split("/")
pageName = pageName[pageName.length - 1].split(".")[0]
// window.addEventListener("resize", () => {});
let main

// toTop
window.addEventListener("load", () => {
	main = document.querySelectorAll("main")[0];
	// if(pageName != "Home")main = window
	const toTop = document.getElementById("toTop");
	main.addEventListener(
		"scroll",
		tools.throttle(() => {
			// console.log(window.innerHeight,main.scrollTop,main.clientHeight)
			// if (main.scrollTop + 50 >= main.clientHeight) {
			if (main.scrollTop  > 0) {
				toTop.classList.add("on");
			} else {
				toTop.classList.remove("on");
			}
		}, 100)
	);
	toTop.onclick = () => main.scrollTo(0, 0);
});

const tools = {
	//提示弹窗
	toast(msg, wait) {
		const toastBox = document.getElementById("toastBox");
		toastBox.children[0].innerHTML = msg;
		toastBox.classList.add("on");
		setTimeout(() => toastBox.classList.remove("on"), wait);
	},
	// 确认窗
	comfirm(msg, input) {
		const toastBox = document.getElementById("comfirm");

		return new Promise((resolve, reject) => {
			toastBox.classList.add("on")

			toastBox.children[0].children[0].innerHTML = msg
			if (input) {
				toastBox.children[0].children[1].classList.add("on")
				setTimeout(() => toastBox.children[0].children[1].children[0].focus(), 500)
			}
			toastBox.children[0].children[2].children[1].onclick = () => back('cancel')
			toastBox.children[0].children[2].children[0].onclick = () => back('comfirm')

			function back(type) {
				let req = {
					type,
					data: toastBox.children[0].children[1].children[0].value
				}
				toastBox.children[0].children[1].children[0].value = ''
				toastBox.classList.remove("on")
				if (input) toastBox.children[0].children[1].classList.remove("on")
				resolve(req)
			}
		})
	},
	// 剩余时间
	timeRemaining(endTime) {
		const num = parseInt((endTime.getTime() - new Date().getTime()) / 1000)
		const dd = parseInt(num / 60 / 60 / 24)
		const hh = parseInt(num / 60 / 60 - dd * 24)
		const mm = parseInt(num / 60 - dd * 24 * 60 - hh * 60)
		const ss = parseInt(num - dd * 24 * 60 * 60 - hh * 60 * 60 - mm * 60)
		return [
			String(dd).padStart(2, "0"),
			String(hh).padStart(2, "0"),
			String(mm).padStart(2, "0"),
			String(ss).padStart(2, "0")
		]
	},
	// entryAnimation
	entryAnimation: {
		// 收束
		bunching: new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const el = entry.target
				const info = entry.boundingClientRect
				const x = info.x + info.width / 2 <= window.innerWidth / 2
				const y = el.offsetTop + main.scrollTop <= window.innerHeight * 1.5
				if (entry.isIntersecting) {
					setTimeout(() => {
						el.style = ""
					}, 0)
				} else {
					el.style = `transform:translate(${x?-40:40}%,${y?-40:40}%);opacity:0;`
				}
			}), {
				threshold: [0],
			}
		}),
		// 滑入
		slide: new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const el = entry.target
				if (el.classList.contains("hide")) return
				if (entry.isIntersecting) {
					setTimeout(() => el.style = "", 0)
				} else {
					el.style = `transform:translate(${50}%,0);opacity:0;`
				}
			}), {
				threshold: [0],
			}
		})
	},
	stepAdd(from, add, step, el, format = this.defaultFormat) {
		return new Promise((resolve, reject) => {
			for (let i = 1; i <= step; i++) {
				setTimeout(() => {
					if (i == step) {
						el.innerHTML = format(Number(from) + Number(add))
						resolve()
					}
					el.innerHTML = format(Number(from) + i * add / step)
				}, i * 33)
			}
		})
	},
	defaultFormat(num) {
		if (num > Math.pow(10, 9)) {
			return (num / Math.pow(10, 8)).toFixed(2) + '亿'
		}
		if (num > Math.pow(10, 5)) {
			return (num / Math.pow(10, 4)).toFixed(2) + '万'
		}
		return num.toFixed(2)
	},
	//节流
	throttle(func, wait) {
		let timer;
		return function() {
			if (!timer) {
				timer = setTimeout(() => {
					func.apply(this, arguments);
					timer = null;
				}, wait);
			}
		};
	},
	//防抖
	debounce(func, wait, immediate) {
		let timeout;
		return function() {
			if (timeout) clearTimeout(timeout);
			if (immediate) {
				const callNow = !timeout;
				timeout = setTimeout(() => timeout = null, wait)
				if (callNow) func.apply(context, args)
			} else {
				timeout = setTimeout(() => {
					func.apply(this, arguments)
				}, wait);
			}
		}
	}
};