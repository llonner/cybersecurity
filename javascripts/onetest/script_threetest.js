document.addEventListener('DOMContentLoaded', function () {
	const copyBtn = document.getElementById('copyBtn')
	const planInput = document.getElementById('planInput')
	const toast = document.getElementById('toast')

	copyBtn.addEventListener('click', function () {
		planInput.select()
		planInput.setSelectionRange(0, 99999)

		navigator.clipboard
			.writeText(planInput.value)
			.then(function () {
				toast.classList.add('show')

				copyBtn.classList.add('copied')
				copyBtn.textContent = 'Скопировано!'

				setTimeout(function () {
					toast.classList.remove('show')
				}, 2000)

				setTimeout(function () {
					copyBtn.classList.remove('copied')
					copyBtn.textContent = 'Копировать'
				}, 2500)
			})
			.catch(function (err) {
				console.error('Ошибка копирования: ', err)
				alert('Не удалось скопировать текст')
			})
	})
})
