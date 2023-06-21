document.write(`
<section id="sidebar">
			<section>
				<span>&gt;</span>
				<div data-page="Home.html">
					<h1>首页Home</h1>
					<article>
						<p data-el="main section:nth-child(2)">当前文化项目</p>
						<p data-el="main section:nth-child(3)">项目列表</p>
						<p data-el="main section:nth-child(4)">资金统计</p>
					</article>
				</div>
				<div data-page="Project.html">
					<h1 >项目列表页目Project</h1>
					<article>
						<p data-el="">项目列表</p>
					</article>
				</div>
				<div data-page="About.html">
					<h1>关于页About</h1>
					<article>
						<p data-el="main section:nth-child(1)">GuangfuFund组织介绍</p>
						<p data-el="main section:nth-child(2)">常见问题与解答列表(FAQ)</p>
						<p data-el="main section:nth-child(3)">参加活动登记表单</p>
					</article>
				</div>
			</section>
		</section>
`)
let sidebar
let divs

// open
function toggleSideBar(e) {
	e.preventDefault()
	sidebar = document.getElementById("sidebar")
	divs = sidebar.querySelectorAll("div")

	sidebar.classList.add("on")
	divs.forEach((item, index) => {
		setTimeout(() => {
			item.classList.add("on")
			item.classList.add("slide")
		}, index * 150)
	})
}

window.addEventListener("load", (e) => {
	sidebar = document.getElementById("sidebar")

	// close bg 
	sidebar.onclick = close

	sidebar.children[0].onclick = (e) => {
		e.stopPropagation()
	}

	// close btn 
	const btn = sidebar.children[0].children[0]
	btn.onclick = close

	function close() {
		divs.forEach(item => {
			item.classList.remove("on")
		})
		sidebar.classList.remove("on")
	}

	// slide open 
	divs = sidebar.querySelectorAll("div")
	divs.forEach(div => {
		div.children[0].onclick = () => div.classList.toggle("slide")
		const page = div.getAttribute("data-page")
		const ps = div.querySelectorAll("p")
		ps.forEach(p => {
			// routing
			p.onclick = (e) => {
				e.stopPropagation()
				const el = p.getAttribute("data-el")
				
				if (pageName == page.split(".")[0]) {
					main.scrollTo(0,document.querySelector(el).offsetTop - .1 * window.innerHeight)
					close()
				} else {
					window.location.href = `${page}?el=${el}`
				}
			}
		})
	})

	// scroll
	let search = window.location.search.split("=")[1]
	if (search) {
		search = decodeURI(search)
		const scrollTarget = document.querySelector(search).offsetTop
		document.addEventListener("loadingCompelete", () => {
			// console.log(0.1 * window.innerHeight);
			main.scrollTo(0, scrollTarget - .1 * window.innerHeight)
		})
	}
})