document.addEventListener('DOMContentLoaded', function () {
	const radioItems = document.querySelectorAll('#radioGroup .option-item')
	const block1Status = document.getElementById('block1Status')

	let block1State = {
		status: 'not_started',
		hasStarted: false,
		selectedIndices: [],
		correctIndex: 1,
		isBlocked: false,
	}

	function updateBlock1Status() {
		if (!block1State.hasStarted) {
			block1State.status = 'not_started'
			block1Status.textContent = 'Блок еще не пройден'
		} else if (block1State.status === 'in_progress') {
			block1Status.textContent = 'Блок в процессе прохождения'
		} else if (block1State.status === 'completed_with_errors') {
			block1Status.textContent = 'Блок пройден с ошибками'
		} else if (block1State.status === 'completed_success') {
			block1Status.textContent = 'Блок пройден верно'
		}
	}

	function block1AllOptions() {
		radioItems.forEach(item => {
			item.classList.add('disabled')
		})
		block1State.isBlocked = true
	}

	function handleBlock1Click(clickedItem) {
		if (block1State.isBlocked) return

		const clickedIndex = parseInt(clickedItem.dataset.index)

		const radio = clickedItem.querySelector('input[type="radio"]')
		radio.checked = true

		if (!block1State.selectedIndices.includes(clickedIndex)) {
			block1State.selectedIndices.push(clickedIndex)
		}

		block1State.hasStarted = true

		radioItems.forEach(item => {
			const itemIndex = parseInt(item.dataset.index)
			const itemBadge = item.querySelector('.option-badge')

			if (block1State.selectedIndices.includes(itemIndex)) {
				if (item.dataset.correct === 'true') {
					item.classList.add('correct-selected')
					item.classList.remove('incorrect-selected')
					itemBadge.textContent = 'Правильный ответ'
				} else {
					item.classList.add('incorrect-selected')
					item.classList.remove('correct-selected')
					itemBadge.textContent = 'Неправильный ответ'
				}
			}
		})

		if (block1State.selectedIndices.includes(block1State.correctIndex)) {
			if (
				block1State.selectedIndices.length === 1 &&
				block1State.selectedIndices[0] === block1State.correctIndex
			) {
				block1State.status = 'completed_success'
			} else {
				block1State.status = 'completed_with_errors'
			}

			block1AllOptions()
		} else {
			block1State.status = 'in_progress'
		}

		updateBlock1Status()
	}

	radioItems.forEach(item => {
		item.addEventListener('click', function (e) {
			e.preventDefault()
			handleBlock1Click(this)
		})
	})

	const checkItems1 = document.querySelectorAll('#checkboxGroup1 .option-item')
	const block2Status = document.getElementById('block2Status')

	let block2State = {
		status: 'not_started',
		hasStarted: false,
		correctIndices: [0, 1, 3],
		selectedIndices: [],
		isBlocked: false,
	}

	function updateBlock2Status() {
		if (!block2State.hasStarted) {
			block2State.status = 'not_started'
			block2Status.textContent = 'Блок еще не пройден'
			return
		}

		let allCorrectSelected = true
		block2State.correctIndices.forEach(idx => {
			if (!block2State.selectedIndices.includes(idx)) {
				allCorrectSelected = false
			}
		})

		if (allCorrectSelected) {
			let hasErrors = false
			block2State.selectedIndices.forEach(idx => {
				if (!block2State.correctIndices.includes(idx)) {
					hasErrors = true
				}
			})

			if (hasErrors) {
				block2State.status = 'completed_with_errors'
				block2Status.textContent = 'Блок пройден с ошибками'
			} else {
				block2State.status = 'completed_success'
				block2Status.textContent = 'Блок пройден верно'
			}

			block2AllOptions()
		} else {
			block2State.status = 'in_progress'
			block2Status.textContent = 'Блок в процессе прохождения'
		}
	}

	function block2AllOptions() {
		checkItems1.forEach(item => {
			item.classList.add('disabled')
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
		block2State.hasStarted = true

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

	checkItems1.forEach(item => {
		item.addEventListener('click', function (e) {
			e.preventDefault()
			handleBlock2Click(this)
		})
	})

	const checkItems2 = document.querySelectorAll('#checkboxGroup2 .option-item')
	const block3Status = document.getElementById('block3Status')

	let block3State = {
		status: 'not_started',
		hasStarted: false,
		correctIndices: [1, 2],
		selectedIndices: [],
		isBlocked: false,
	}

	function updateBlock3Status() {
		if (!block3State.hasStarted) {
			block3State.status = 'not_started'
			block3Status.textContent = 'Блок еще не пройден'
			return
		}

		let allCorrectSelected = true
		block3State.correctIndices.forEach(idx => {
			if (!block3State.selectedIndices.includes(idx)) {
				allCorrectSelected = false
			}
		})

		if (allCorrectSelected) {
			let hasErrors = false
			block3State.selectedIndices.forEach(idx => {
				if (!block3State.correctIndices.includes(idx)) {
					hasErrors = true
				}
			})

			if (hasErrors) {
				block3State.status = 'completed_with_errors'
				block3Status.textContent = 'Блок пройден с ошибками'
			} else {
				block3State.status = 'completed_success'
				block3Status.textContent = 'Блок пройден верно'
			}

			block3AllOptions()
		} else {
			block3State.status = 'in_progress'
			block3Status.textContent = 'Блок в процессе прохождения'
		}
	}

	function block3AllOptions() {
		checkItems2.forEach(item => {
			item.classList.add('disabled')
		})
		block3State.isBlocked = true
	}

	function handleBlock3Click(clickedItem) {
		if (block3State.isBlocked) return

		const clickedIndex = parseInt(clickedItem.dataset.index)
		const isCorrect = clickedItem.dataset.correct === 'true'
		const checkbox = clickedItem.querySelector('input[type="checkbox"]')
		const badge = clickedItem.querySelector('.option-badge')

		if (checkbox.checked) {
			return
		}

		checkbox.checked = true
		block3State.hasStarted = true

		if (!block3State.selectedIndices.includes(clickedIndex)) {
			block3State.selectedIndices.push(clickedIndex)
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

		updateBlock3Status()
	}

	checkItems2.forEach(item => {
		item.addEventListener('click', function (e) {
			e.preventDefault()
			handleBlock3Click(this)
		})
	})

	updateBlock1Status()
	updateBlock2Status()
	updateBlock3Status()
})
