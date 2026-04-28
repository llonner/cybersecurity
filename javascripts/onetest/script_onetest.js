document.addEventListener('DOMContentLoaded', function () {
	const radioItems = document.querySelectorAll('#radioGroup .option-item')
	const block1StatusText = document.getElementById('block1StatusText')

	let block1State = {
		status: 'not_started',
		hasError: false,
		correctSelected: false,
		isBlocked: false,
	}

	function updateBlock1Status() {
		if (block1State.status === 'not_started') {
			block1StatusText.textContent = 'Блок не пройден'
		} else if (block1State.status === 'in_progress') {
			block1StatusText.textContent = 'Блок в процессе прохождения'
		} else if (block1State.status === 'completed_with_errors') {
			block1StatusText.textContent = 'Блок пройден с ошибками'
		} else if (block1State.status === 'completed_success') {
			block1StatusText.textContent = 'Блок пройден верно'
		}
	}

	function block1AllOptions() {
		radioItems.forEach(item => {
			item.classList.add('disabled')
			const radio = item.querySelector('input[type="radio"]')
			radio.disabled = true
		})
		block1State.isBlocked = true
	}

	function handleBlock1Click(clickedItem) {
		if (block1State.isBlocked) return

		const isCorrect = clickedItem.dataset.correct === 'true'
		const radio = clickedItem.querySelector('input[type="radio"]')

		radio.checked = true
		const badge = clickedItem.querySelector('.option-badge')

		if (isCorrect) {
			clickedItem.classList.add('correct-selected')
			clickedItem.classList.remove('incorrect-selected')
			badge.textContent = 'Правильный ответ'

			if (block1State.hasError) {
				block1State.status = 'completed_with_errors'
			} else {
				block1State.status = 'completed_success'
			}

			block1AllOptions()
		} else {
			clickedItem.classList.add('incorrect-selected')
			clickedItem.classList.remove('correct-selected')
			badge.textContent = 'Неправильный ответ'

			block1State.hasError = true

			if (!block1State.correctSelected) {
				block1State.status = 'in_progress'
			}
		}

		updateBlock1Status()
	}

	radioItems.forEach(item => {
		const radio = item.querySelector('input[type="radio"]')

		item.addEventListener('click', function (e) {
			if (e.target.tagName !== 'INPUT') {
				radio.checked = true
				handleBlock1Click(this)
			}
		})

		radio.addEventListener('change', function () {
			handleBlock1Click(this.closest('.option-item'))
		})
	})

	const checkItems = document.querySelectorAll('#checkboxGroup .option-item')
	const block2StatusText = document.getElementById('block2StatusText')

	let block2State = {
		status: 'not_started',
		correctIndices: [0, 3, 4],
		selectedIndices: [],
		isBlocked: false,
	}

	function updateBlock2Status() {
		if (block2State.selectedIndices.length === 0) {
			block2State.status = 'not_started'
			block2StatusText.textContent = 'Блок не пройден'
			return
		}

		let allCorrectSelected = true
		block2State.correctIndices.forEach(correctIdx => {
			if (!block2State.selectedIndices.includes(correctIdx)) {
				allCorrectSelected = false
			}
		})

		let hasErrors = false
		block2State.selectedIndices.forEach(idx => {
			if (!block2State.correctIndices.includes(idx)) {
				hasErrors = true
			}
		})

		if (allCorrectSelected) {
			if (hasErrors) {
				block2State.status = 'completed_with_errors'
				block2StatusText.textContent = 'Блок пройден с ошибками'
			} else {
				block2State.status = 'completed_success'
				block2StatusText.textContent = 'Блок пройден верно'
			}

			block2AllOptions()
		} else {
			block2State.status = 'in_progress'
			block2StatusText.textContent = 'Блок в процессе прохождения'
		}
	}

	function block2AllOptions() {
		checkItems.forEach(item => {
			item.classList.add('disabled')
			const checkbox = item.querySelector('input[type="checkbox"]')
			checkbox.disabled = true
		})
		block2State.isBlocked = true
	}

	function handleBlock2Click(clickedItem) {
		if (block2State.isBlocked) return

		const clickedIndex = parseInt(clickedItem.dataset.index)
		const isCorrect = clickedItem.dataset.correct === 'true'
		const checkbox = clickedItem.querySelector('input[type="checkbox"]')
		const badge = clickedItem.querySelector('.option-badge')

		if (checkbox.checked) {
			return
		}

		checkbox.checked = true

		if (!block2State.selectedIndices.includes(clickedIndex)) {
			block2State.selectedIndices.push(clickedIndex)
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

		updateBlock2Status()
	}

	checkItems.forEach(item => {
		item.addEventListener('click', function (e) {
			handleBlock2Click(this)
		})
	})

	updateBlock1Status()
	updateBlock2Status()
})
