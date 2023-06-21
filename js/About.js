window.addEventListener("load", () => {
	loading(2000)

	// FAQ
	const faqs = document.querySelectorAll("#main section:nth-child(2) article")
	faqs.forEach(faq => {
		faq.children[0].onclick = () => {
			faq.classList.toggle("on")
		}
	})

	// participateInActivities
	const activity = [
		'饼印文化',
		'广东剪纸',
		'飘色',
		'醒狮',
		'迎春花市',
		'粤剧',
		'广府菜'
	]
	const countries = [
		"CN",
		"USA",
		"JPN",
		"RUS"
	]
	const inputs = document.querySelectorAll("form input:not([type=submit])")
	const emailPatern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
	const telPattern = /^1[35789]\d{9}$/
	const spans = document.querySelectorAll("form span")
	const form = document.forms.form

	inputs.forEach((input, index) => {
		const span = spans[index]
		input.oninput = tools.debounce(() => {
			const value = input.value
			switch (input.name) {
				case 'name':
					return span.innerHTML = value.length <= 0 ? "不能为空" : '√'
				case 'country':
					return span.innerHTML = countries.indexOf(value) < 0 ? "只能是CN、USA、JPN、RUS" : '√'
				case 'email':
					return span.innerHTML = !emailPatern.test(value) ? "电子邮箱格式不正确" : '√'
				case 'phone':
					return span.innerHTML = !telPattern.test(value) ? "必须是11位数字的号码" : '√'
				case 'activity':
					return span.innerHTML = activity.indexOf(value) < 0 ? "项目不存在" : '√'
			}
		})
	})

	form.onsubmit = (e) => {
		e.preventDefault()
		let t = true
		spans.forEach(span => {
			if (span.innerHTML != "√") t = false
		})
		if (t) {
			form.reset()
			tools.toast("SUCCESS!", 2000)
		} else {
			tools.toast("填写有误", 2000)
		}
	}
})