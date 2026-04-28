document.addEventListener('DOMContentLoaded', function () {
	const sliderTrack = document.getElementById('sliderTrack')
	const slides = document.querySelectorAll('.slider-slide')
	const dots = document.querySelectorAll('.slider-dot')

	let currentIndex = 0
	const totalSlides = slides.length

	function updateSlider() {
		sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`

		dots.forEach((dot, index) => {
			if (index === currentIndex) {
				dot.classList.add('active')
			} else {
				dot.classList.remove('active')
			}
		})
	}

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			currentIndex = index
			updateSlider()
		})
	})

	const checkItems = document.querySelectorAll('#checkboxGroup .option-item')
	const testStatus = document.getElementById('testStatus')

	let testState = {
		status: 'not_started',
		hasStarted: false,
		correctIndices: [1, 2, 3],
		selectedIndices: [],
		isBlocked: false,
	}

	function updateTestStatus() {
		if (!testState.hasStarted) {
			testState.status = 'not_started'
			testStatus.textContent = 'Блок еще не пройден'
			return
		}

		let allCorrectSelected = true
		testState.correctIndices.forEach(idx => {
			if (!testState.selectedIndices.includes(idx)) {
				allCorrectSelected = false
			}
		})

		if (allCorrectSelected) {
			let hasErrors = false
			testState.selectedIndices.forEach(idx => {
				if (!testState.correctIndices.includes(idx)) {
					hasErrors = true
				}
			})

			if (hasErrors) {
				testState.status = 'completed_with_errors'
				testStatus.textContent = 'Блок пройден с ошибками'
			} else {
				testState.status = 'completed_success'
				testStatus.textContent = 'Блок пройден верно'
			}

			blockAllOptions()
		} else {
			testState.status = 'in_progress'
			testStatus.textContent = 'Блок в процессе прохождения'
		}
	}

	function blockAllOptions() {
		checkItems.forEach(item => {
			item.classList.add('disabled')
		})
		testState.isBlocked = true
	}

	function handleTestClick(clickedItem) {
		if (testState.isBlocked) return

		const clickedIndex = parseInt(clickedItem.dataset.index)
		const isCorrect = clickedItem.dataset.correct === 'true'
		const checkbox = clickedItem.querySelector('input[type="checkbox"]')
		const badge = clickedItem.querySelector('.option-badge')

		if (checkbox.checked) {
			return
		}

		checkbox.checked = true
		testState.hasStarted = true

		if (!testState.selectedIndices.includes(clickedIndex)) {
			testState.selectedIndices.push(clickedIndex)
		}

		if (isCorrect) {
			clickedItem.classList.add('correct-selected')
			clickedItem.classList.remove('incorrect-selected')
			badge.textContent = 'Правильный ответ'
		} else {
			clickedItem.classList.add('incorrect-selected')
			clickedItem.classList.remove('correct-selected')
			badge.textContent = 'Неправильный ответ'
		}

		updateTestStatus()
	}

	checkItems.forEach(item => {
		item.addEventListener('click', function (e) {
			e.preventDefault()
			handleTestClick(this)
		})
	})

	updateTestStatus()
})
