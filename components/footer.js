window.addEventListener("load",()=>{
	document.querySelector(pageName == "Home" ? '#page4' : 'main').insertAdjacentHTML("beforeend",`
	<footer>
		<article>
			<h2>关注我们</h2>
				<img src="./img/illustration/qr.png" alt="">
		</article>
		<article>
			<h2>更多文化</h2>
				<img src="./img/illustration/qr.png" alt="">
		</article>
		<article>
			<p>增值电信业务经营许可证：合字xx-xxxxxxxx</p>
			<p>京ICP备xxxxxxxx号-x</p>
			<p>京公网安备xxxxxxxxxxxx号</p>
			<p>隐私声明和 Cookie</p>
			<p>法律声明</p>
			<p>广告</p>
			<p>&copy; 2023 216124125</p>
		</article>
	</footer>
	`)	
})