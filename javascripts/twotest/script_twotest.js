document.addEventListener('DOMContentLoaded', function () {
	const gameContainer = document.getElementById('game-container')

	const pairs = [
		{
			id: 1,
			type: 'Вирусы',
			description: 'Обычно распространяется в виде вложений электронной почты.',
		},
		{
			id: 2,
			type: 'Троян',
			description:
				'Притворяется безобидным приложением, а после установки создаёт бреши в системе безопасности.',
		},
		{
			id: 3,
			type: 'Ботнет',
			description:
				'Сеть заражённых устройств, на каждом из которых работает один или несколько ботов, действия которых координируются для выполнения какой-либо единой задачи.',
		},
		{
			id: 4,
			type: 'Рекламная программа',
			description:
				'Устанавливается в обмен на право бесплатного использования какой-нибудь программы или прилагается в нагрузку к другой программе, чтобы обманом побудить пользователя установить её на своём устройстве.',
		},
		{
			id: 5,
			type: 'Вымогатель',
			description:
				'Устанавливает себя на устройство жертвы, зашифровывает файлы и, угрожая их удалением, требует выкупа.',
		},
	]

	let gameState = {
		types: [],
		descriptions: [],
		selectedType: null,
		selectedDesc: null,
		matchedPairs: [],
		wrongFlash: null,
	}

	function initGame() {
		gameState.types = pairs.map(p => ({
			id: p.id,
			text: p.type,
			matched: false,
		}))
		gameState.descriptions = pairs.map(p => ({
			id: p.id,
			text: p.description,
			matched: false,
		}))
		gameState.selectedType = null
		gameState.selectedDesc = null
		gameState.matchedPairs = []
		gameState.wrongFlash = null

		gameState.types = shuffleArray(gameState.types)
		gameState.descriptions = shuffleArray(gameState.descriptions)
	}

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	function renderGame() {
		gameContainer.innerHTML = `
                    <div class="game-container">
                        <div class="game-grid">
                            <div class="column">
                                <div class="column-title">Типы программ</div>
                                <div id="types-column">
                                    ${gameState.types
																			.map(
																				t => `
                                        <div class="game-card ${t.matched ? 'matched' : ''} ${gameState.selectedType === t.id ? 'selected' : ''}" 
                                             data-type-id="${t.id}">
                                            ${t.text}
                                        </div>
                                    `,
																			)
																			.join('')}
                                </div>
                            </div>
                            <div class="column">
                                <div class="column-title">Описания</div>
                                <div id="descriptions-column">
                                    ${gameState.descriptions
																			.map(
																				d => `
                                        <div class="game-card ${d.matched ? 'matched' : ''} ${gameState.selectedDesc === d.id ? 'selected' : ''}" 
                                             data-desc-id="${d.id}">
                                            ${d.text}
                                        </div>
                                    `,
																			)
																			.join('')}
                                </div>
                            </div>
                        </div>
                        ${
													gameState.wrongFlash
														? `
                            <div class="game-card incorrect-match" style="margin-top: 1rem; text-align: center; padding: 1rem;">
                                Неправильная пара!
                            </div>
                        `
														: ''
												}
                    </div>
                `

		document.querySelectorAll('[data-type-id]').forEach(card => {
			card.addEventListener('click', () =>
				handleTypeClick(parseInt(card.dataset.typeId)),
			)
		})

		document.querySelectorAll('[data-desc-id]').forEach(card => {
			card.addEventListener('click', () =>
				handleDescClick(parseInt(card.dataset.descId)),
			)
		})

		if (gameState.matchedPairs.length === pairs.length) {
			showSuccessMessage()
		}
	}

	function handleTypeClick(typeId) {
		if (gameState.types.find(t => t.id === typeId).matched) return

		if (gameState.wrongFlash) {
			gameState.wrongFlash = null
		}

		if (gameState.selectedType === typeId) {
			gameState.selectedType = null
		} else {
			gameState.selectedType = typeId
		}

		if (gameState.selectedType && gameState.selectedDesc) {
			checkPair()
		} else {
			renderGame()
		}
	}

	function handleDescClick(descId) {
		if (gameState.descriptions.find(d => d.id === descId).matched) return

		if (gameState.wrongFlash) {
			gameState.wrongFlash = null
		}

		if (gameState.selectedDesc === descId) {
			gameState.selectedDesc = null
		} else {
			gameState.selectedDesc = descId
		}

		if (gameState.selectedType && gameState.selectedDesc) {
			checkPair()
		} else {
			renderGame()
		}
	}

	function checkPair() {
		const type = gameState.types.find(t => t.id === gameState.selectedType)
		const desc = gameState.descriptions.find(
			d => d.id === gameState.selectedDesc,
		)

		if (type.id === desc.id) {
			type.matched = true
			desc.matched = true
			gameState.matchedPairs.push(type.id)

			const typeCard = document.querySelector(`[data-type-id="${type.id}"]`)
			const descCard = document.querySelector(`[data-desc-id="${desc.id}"]`)

			if (typeCard && descCard) {
				typeCard.classList.add('correct-match')
				descCard.classList.add('correct-match')
			}

			gameState.selectedType = null
			gameState.selectedDesc = null

			setTimeout(() => {
				renderGame()
			}, 300)
		} else {
			gameState.wrongFlash = true

			const typeCard = document.querySelector(`[data-type-id="${type.id}"]`)
			const descCard = document.querySelector(`[data-desc-id="${desc.id}"]`)

			if (typeCard && descCard) {
				typeCard.classList.add('incorrect-match')
				descCard.classList.add('incorrect-match')

				setTimeout(() => {
					typeCard.classList.remove('incorrect-match')
					descCard.classList.remove('incorrect-match')
					gameState.selectedType = null
					gameState.selectedDesc = null
					gameState.wrongFlash = null
					renderGame()
				}, 800)
			} else {
				gameState.selectedType = null
				gameState.selectedDesc = null
				gameState.wrongFlash = null
				renderGame()
			}
		}
	}

	function showSuccessMessage() {
		const successOverlay = document.createElement('div')
		successOverlay.className = 'success-overlay'
		successOverlay.innerHTML = `
                    <div class="success-content">
                        <h3>🎉 Молодец!</h3>
                        <p>Все пары составлены правильно!</p>
                    </div>
                `

		document.body.appendChild(successOverlay)

		setTimeout(() => {
			successOverlay.remove()
		}, 2000)

		successOverlay.addEventListener('click', function (e) {
			if (e.target === successOverlay) {
				successOverlay.remove()
			}
		})
	}

	initGame()
	renderGame()
})
