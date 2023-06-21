console.log();
document.write(`
<section id="banner">
			<div id="imgBox">
				<img src="./img/banner/banner (1).jpg" alt="广府">
				<img src="./img/banner/banner (2).jpg" alt="广府">
				<img src="./img/banner/banner (3).jpg" alt="广府">
				<img src="./img/banner/banner (4).jpg" alt="广府">
				<img src="./img/banner/banner (5).jpg" alt="广府">
			</div>
			${
        pageName == "Home"
          ? `<div id="btnBox">
      <div id="bannerLT">&lt;</div>
      <div id="bannerGT">&gt;</div>
    </div>`
          : ""
      }
</section>
`);
window.addEventListener("load", () => {
	const imgs = document.querySelectorAll("#imgBox img");
	let btnLT, btnGT;
	const main = document.querySelector("main");
	
	if (pageName == "Home") {
		btnLT = document.getElementById("bannerLT");
		btnGT = document.getElementById("bannerGT");
		//
		window.addEventListener("touchstart", (e) => {
			if (e.target.nodeName != "SECTION") return;
			if (e.target.id == "bannerLT" || e.target.id == "bannerGT") return;
			btnLT.onmouseenter();
		});
		window.addEventListener("touchend", (e) => {
			if (e.target.nodeName != "SECTION") return;
			if (e.target.id == "bannerLT" || e.target.id == "bannerGT") return;
			btnLT.onmouseleave();
		});
		// 
		btnLT.onmouseenter = (e) => {
			if (e && e.relatedTarget?.nodeName != "SECTION") return;
			if (main.scrollTop > 0) return;
			clearInterval(timer);
			timer = null;
			tools.toast("暂停轮播", 1500);
		};
		btnLT.onmouseleave = (e) => {
			if (e && e.relatedTarget?.nodeName != "SECTION") return;
			if (main.scrollTop > 0) {
				if (!timer) {
					timer = setInterval(() => run(1), 5000);
					tools.toast("恢复轮播", 1500);
				}
				return;
			}
			clearInterval(timer);
			timer = setInterval(() => run(1), 5000);
			tools.toast("恢复轮播", 1500);
		};
		btnGT.onmouseenter = btnLT.onmouseenter;
		btnGT.onmouseleave = btnLT.onmouseleave;
		btnLT.onclick = () => run(-1);
		btnGT.onclick = () => run(1);
	}
	
	// init
	let count = 0;
	run(-1);
	let timer = setInterval(() => run(1), 5000);

	// 
	function run(num) {
		if (btnGT && btnLT) {
			btnLT.onclick = null;
			btnGT.onclick = null;
			setTimeout(() => {
				btnLT.onclick = () => run(-1);
				btnGT.onclick = () => run(1);
			}, 500);
		}
		const t = count;
		count =
			count + num == imgs.length ?
			0 :
			count + num < 0 ?
			imgs.length - 1 :
			count + num;
		imgs[t].style = "z-index:1;opacity:1;";
		setTimeout(() => (imgs[t].style = "z-index:1;"), 500);
		imgs[count].style = "z-index:2;opacity:1; transition:.5s;";
	}
});