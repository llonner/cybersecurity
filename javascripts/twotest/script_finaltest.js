document.addEventListener('DOMContentLoaded', function () {
	function createCheckboxHandler(containerId, statusId, correctIndices) {
		const checkItems = document.querySelectorAll(`#${containerId} .option-item`)
		const statusElement = document.getElementById(statusId)

		let state = {
			status: 'not_started',
			hasStarted: false,
			correctIndices: correctIndices,
			selectedIndices: [],
			isBlocked: false,
		}

		function updateStatus() {
			if (!state.hasStarted) {
				state.status = 'not_started'
				statusElement.textContent = 'Блок еще не пройден'
				return
			}

			let allCorrectSelected = true
			state.correctIndices.forEach(idx => {
				if (!state.selectedIndices.includes(idx)) {
					allCorrectSelected = false
				}
			})

			if (allCorrectSelected) {
				let hasErrors = false
				state.selectedIndices.forEach(idx => {
					if (!state.correctIndices.includes(idx)) {
						hasErrors = true
					}
				})

				if (hasErrors) {
					state.status = 'completed_with_errors'
					statusElement.textContent = 'Блок пройден с ошибками'
				} else {
					state.status = 'completed_success'
					statusElement.textContent = 'Блок пройден верно'
				}

				blockAllOptions()
			} else {
				state.status = 'in_progress'
				statusElement.textContent = 'Блок в процессе прохождения'
			}
		}

		function blockAllOptions() {
			checkItems.forEach(item => {
				item.classList.add('disabled')
			})
			state.isBlocked = true
		}

		function handleClick(clickedItem) {
			if (state.isBlocked) return

			const clickedIndex = parseInt(clickedItem.dataset.index)
			const isCorrect = clickedItem.dataset.correct === 'true'
			const checkbox = clickedItem.querySelector('input[type="checkbox"]')
			const badge = clickedItem.querySelector('.option-badge')

			if (checkbox.checked) {
				return
			}

			checkbox.checked = true
			state.hasStarted = true

			if (!state.selectedIndices.includes(clickedIndex)) {
				state.selectedIndices.push(clickedIndex)
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

			updateStatus()
		}

		checkItems.forEach(item => {
			item.addEventListener('click', function (e) {
				e.preventDefault()
				handleClick(this)
			})
		})

		return { updateStatus }
	}

	function createRadioHandler(containerId, statusId, correctIndex) {
		const radioItems = document.querySelectorAll(`#${containerId} .option-item`)
		const statusElement = document.getElementById(statusId)

		let state = {
			status: 'not_started',
			hasStarted: false,
			selectedIndices: [],
			correctIndex: correctIndex,
			isBlocked: false,
		}

		function updateStatus() {
			if (!state.hasStarted) {
				state.status = 'not_started'
				statusElement.textContent = 'Блок еще не пройден'
				return
			}

			if (state.selectedIndices.includes(state.correctIndex)) {
				if (
					state.selectedIndices.length === 1 &&
					state.selectedIndices[0] === state.correctIndex
				) {
					state.status = 'completed_success'
					statusElement.textContent = 'Блок пройден верно'
				} else {
					state.status = 'completed_with_errors'
					statusElement.textContent = 'Блок пройден с ошибками'
				}

				blockAllOptions()
			} else {
				state.status = 'in_progress'
				statusElement.textContent = 'Блок в процессе прохождения'
			}
		}

		function blockAllOptions() {
			radioItems.forEach(item => {
				item.classList.add('disabled')
			})
			state.isBlocked = true
		}

		function handleClick(clickedItem) {
			if (state.isBlocked) return

			const clickedIndex = parseInt(clickedItem.dataset.index)
			const isCorrect = clickedItem.dataset.correct === 'true'

			const radio = clickedItem.querySelector('input[type="radio"]')
			radio.checked = true

			if (!state.selectedIndices.includes(clickedIndex)) {
				state.selectedIndices.push(clickedIndex)
			}

			state.hasStarted = true

			radioItems.forEach(item => {
				const itemIndex = parseInt(item.dataset.index)
				const itemBadge = item.querySelector('.option-badge')

				if (state.selectedIndices.includes(itemIndex)) {
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

			updateStatus()
		}

		radioItems.forEach(item => {
			item.addEventListener('click', function (e) {
				e.preventDefault()
				handleClick(this)
			})
		})

		return { updateStatus }
	}

	const block1Handler = createCheckboxHandler(
		'checkboxGroup1',
		'block1Status',
		[0, 1, 3],
	)
	const block2Handler = createCheckboxHandler(
		'checkboxGroup2',
		'block2Status',
		[0, 1, 3],
	)
	const block3Handler = createRadioHandler('radioGroup', 'block3Status', 0)
	const block4Handler = createCheckboxHandler(
		'checkboxGroup3',
		'block4Status',
		[0, 1, 2],
	)

	block1Handler.updateStatus()
	block2Handler.updateStatus()
	block3Handler.updateStatus()
	block4Handler.updateStatus()
})
