document.addEventListener('DOMContentLoaded', function () {
	const sites = document.querySelectorAll('.site-card')
	const realBasket = document.getElementById('realBasket')
	const phishingBasket = document.getElementById('phishingBasket')
	const realBasketItems = document.getElementById('realBasketItems')
	const phishingBasketItems = document.getElementById('phishingBasketItems')
	const exerciseStatus = document.getElementById('exerciseStatus')

	let draggedItem = null

	const correctReal = [
		'https://www.sberbank.ru/',
		'https://www.vk.com/',
		'https://www.minecraft.net/',
	]
	const correctPhishing = ['http://applied.aple.com', 'http://whatsapp-com.ru']

	function isAllCorrect() {
		const realItems = []
		const phishingItems = []

		document.querySelectorAll('#realBasketItems .basket-item').forEach(item => {
			realItems.push(item.textContent)
		})

		document
			.querySelectorAll('#phishingBasketItems .basket-item')
			.forEach(item => {
				phishingItems.push(item.textContent)
			})

		if (realItems.length + phishingItems.length !== 5) return false

		let allCorrect = true
		realItems.forEach(url => {
			if (!correctReal.includes(url)) allCorrect = false
		})
		phishingItems.forEach(url => {
			if (!correctPhishing.includes(url)) allCorrect = false
		})

		return allCorrect
	}

	function lockCorrectAnswers() {
		document.querySelectorAll('#realBasketItems .basket-item').forEach(item => {
			const url = item.textContent
			if (correctReal.includes(url)) {
				item.classList.add('locked')
				item.setAttribute('draggable', 'false')
			}
		})

		document
			.querySelectorAll('#phishingBasketItems .basket-item')
			.forEach(item => {
				const url = item.textContent
				if (correctPhishing.includes(url)) {
					item.classList.add('locked')
					item.setAttribute('draggable', 'false')
				}
			})
	}

	function getCurrentSites() {
		const realItems = []
		const phishingItems = []

		document.querySelectorAll('#realBasketItems .basket-item').forEach(item => {
			realItems.push(item.textContent)
		})

		document
			.querySelectorAll('#phishingBasketItems .basket-item')
			.forEach(item => {
				phishingItems.push(item.textContent)
			})

		return { realItems, phishingItems }
	}

	function updateStatus() {
		const { realItems, phishingItems } = getCurrentSites()
		const totalReal = realItems.length
		const totalPhishing = phishingItems.length

		if (totalReal === 0 && totalPhishing === 0) {
			exerciseStatus.textContent = 'Блок еще не пройден'
			return
		}

		if (totalReal + totalPhishing === 5) {
			let allCorrect = true

			realItems.forEach(url => {
				if (!correctReal.includes(url)) allCorrect = false
			})

			phishingItems.forEach(url => {
				if (!correctPhishing.includes(url)) allCorrect = false
			})

			if (allCorrect) {
				exerciseStatus.textContent = 'Блок пройден верно'
			} else {
				exerciseStatus.textContent = 'Блок пройден с ошибками'
			}
		} else {
			exerciseStatus.textContent = 'Блок в процессе прохождения'
		}

		lockCorrectAnswers()
	}

	function createBasketItem(url, type) {
		const item = document.createElement('div')
		item.className = 'basket-item'
		if (type === 'real') {
			item.classList.add(correctReal.includes(url) ? 'correct' : 'incorrect')
		} else {
			item.classList.add(
				correctPhishing.includes(url) ? 'correct' : 'incorrect',
			)
		}
		item.textContent = url
		item.setAttribute('draggable', 'true')
		item.setAttribute('data-url', url)
		item.setAttribute('data-type', type)

		item.addEventListener('dragstart', function (e) {
			const url = this.textContent
			const type = this.dataset.type

			const isCorrectReal = type === 'real' && correctReal.includes(url)
			const isCorrectPhishing =
				type === 'phishing' && correctPhishing.includes(url)

			if (
				(type === 'real' &&
					correctReal.includes(url) &&
					this.parentElement.id === 'realBasketItems') ||
				(type === 'phishing' &&
					correctPhishing.includes(url) &&
					this.parentElement.id === 'phishingBasketItems')
			) {
				e.preventDefault()
				return
			}

			draggedItem = this
			this.classList.add('dragging')
			e.dataTransfer.setData('text/plain', url)
			e.dataTransfer.setData('type', type)
			e.dataTransfer.setData('source', 'basket')
			e.dataTransfer.effectAllowed = 'move'
		})

		item.addEventListener('dragend', function (e) {
			this.classList.remove('dragging')
			draggedItem = null
		})

		return item
	}

	sites.forEach(site => {
		site.addEventListener('dragstart', function (e) {
			draggedItem = this
			this.classList.add('dragging')
			e.dataTransfer.setData('text/plain', this.dataset.url)
			e.dataTransfer.setData('type', this.dataset.type)
			e.dataTransfer.setData('source', 'top')
			e.dataTransfer.effectAllowed = 'move'
		})

		site.addEventListener('dragend', function (e) {
			this.classList.remove('dragging')
			draggedItem = null
		})
	})
	;[realBasket, phishingBasket].forEach(basket => {
		basket.addEventListener('dragover', function (e) {
			e.preventDefault()
			this.classList.add('drag-over')
			e.dataTransfer.dropEffect = 'move'
		})

		basket.addEventListener('dragleave', function (e) {
			this.classList.remove('drag-over')
		})

		basket.addEventListener('drop', function (e) {
			e.preventDefault()
			this.classList.remove('drag-over')

			if (!draggedItem) return

			const url = e.dataTransfer.getData('text/plain')
			const type = e.dataTransfer.getData('type')
			const source = e.dataTransfer.getData('source')
			const basketType = this.dataset.basket

			if (source === 'basket') {
				const isCorrectReal =
					type === 'real' &&
					correctReal.includes(url) &&
					draggedItem.parentElement.id === 'realBasketItems'
				const isCorrectPhishing =
					type === 'phishing' &&
					correctPhishing.includes(url) &&
					draggedItem.parentElement.id === 'phishingBasketItems'

				if (isCorrectReal || isCorrectPhishing) {
					return
				}
			}

			draggedItem.remove()

			const targetBasket =
				basketType === 'real' ? realBasketItems : phishingBasketItems
			const newItem = createBasketItem(url, basketType)
			targetBasket.appendChild(newItem)

			updateStatus()
		})
	})

	updateStatus()
})
