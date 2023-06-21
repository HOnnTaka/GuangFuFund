document.write(`
		<header>
			<img id="logo" src="./img/logo/logo2.png" alt="广府">
			<nav>
				<img id="listBtn" src="./img/illustration/list.png" alt="">
				<section id="list">
					<div>
						<a href="./Home.html">主页(Home)</a>
					</div>
					<div><a href="./Project.html">活动(Projects)</a>
					</div>
					<div>
						<a href="./About.html">关于(About)</a>
					</div>
				</section>
			</nav>
			<article id="searchBox" class="">
				<input id="search" type="search">
				<div>
					<label for="">搜索</label>
				</div>
			</article>
			<article>
				<div>
					<label id="loginBtn" for="">注册</label>
				</div>
			</article>
		</header>
`)
window.addEventListener('load', () => {
	let focus = false
	const main = document.querySelector("main")
	
	// search
	const searchBox = document.getElementById("searchBox")
	searchBox.onmousemove = tools.throttle((e) => {
		e.stopPropagation()
		focus = true
		searchBox.classList.add("on")
		searchBox.children[0].focus()
	}, 33)
	searchBox.children[0].onclick = (e) => e.stopPropagation()

	// nav
	const listBtn = document.getElementById("listBtn")
	listBtn.onclick = (e)=>{
		toggleSideBar(e)
	}
	// remove
	function remover() {
		if (focus) return focus = false
		list.classList.remove("on")
		searchBox.classList.remove("on")
	}
	window.addEventListener('mousedown', tools.throttle(remover, 500))
	window.addEventListener('touchmove', tools.throttle(remover, 500))
	main.addEventListener('scroll', tools.throttle(remover, 500))
	
	const loginBtn = document.getElementById("loginBtn")
	loginBtn.onmousemove = tools.throttle(remover, 100)
	
	// scroll
	function below(){
		if (main.scrollTop > 0) {
			document.body.classList.add("below")
		} else {
			document.body.classList.remove("below")
		}
		if ( main.scrollHeight - main.scrollTop - 5  <= main.clientHeight ) {
			// console.log(main.scrollHeight - main.scrollTop,main.clientHeight);
			document.body.classList.add("bottom")
		} else {
			document.body.classList.remove("bottom")
		}
	}
	below()
	main.addEventListener("scroll", tools.throttle(below, 100))
})
