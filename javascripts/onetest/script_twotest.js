document.addEventListener('DOMContentLoaded', function () {
	const container = document.getElementById('trainer-container')
	const blockStatus = document.getElementById('blockStatus')

	let currentStep = 'step1'
	let hasStarted = false

	let userAnswers = {
		step1: null,
		step2: null,
		step3: null,
	}

	const correctAnswers = {
		step1: 'B',
		step2: 'A',
		step3: 'B',
	}

	function updateBlockStatus() {
		if (!hasStarted) {
			blockStatus.textContent = 'Блок еще не пройден'
		} else if (currentStep === 'result') {
			const correctCount = countCorrectAnswers()
			blockStatus.textContent =
				correctCount === 3 ? 'Блок пройден верно' : 'Блок пройден с ошибками'
		} else {
			blockStatus.textContent = 'Блок в процессе прохождения'
		}
	}

	function countCorrectAnswers() {
		let correctCount = 0
		if (userAnswers.step1 === correctAnswers.step1) correctCount++
		if (userAnswers.step2 === correctAnswers.step2) correctCount++
		if (userAnswers.step3 === correctAnswers.step3) correctCount++
		return correctCount
	}

	function showResult() {
		const correctCount = countCorrectAnswers()
		const isSuccess = correctCount === 3

		let emoji = isSuccess ? '🥳' : '😔'
		let message = isSuccess
			? 'Задание пройдено успешно'
			: 'Задание пройдено неуспешно'

		container.innerHTML = `
                    <div class="result-block">
                        <div class="result-title">РЕЗУЛЬТАТ</div>
                        <div class="result-emoji">${emoji}</div>
                        <div class="result-message">${message}</div>
                        <div style="margin-top: 2rem; font-size: 1.5rem; color: #d0d0d0;">
                            Правильных ответов: ${correctCount} из 3
                        </div>
                    </div>
                `

		updateBlockStatus()
	}

	function render() {
		switch (currentStep) {
			case 'step1':
				renderStep1()
				break
			case 'step1_explanation':
				renderStep1Explanation()
				break
			case 'step2':
				renderStep2()
				break
			case 'step2_explanation':
				renderStep2Explanation()
				break
			case 'step3':
				renderStep3()
				break
			case 'step3_explanation':
				renderStep3Explanation()
				break
			case 'conclusion':
				renderConclusion()
				break
			case 'result':
				showResult()
				break
		}
		updateBlockStatus()
	}

	function renderStep1() {
		container.innerHTML = `
                    <div class="trainer-block">
                        <div class="step-title">Шаг 1. Как не допустить ситуации, чтобы на твоей странице в социальной сети кто-то начал писать оскорбительные и негативные комментарии?</div>
                        
                        <!-- МЕСТО ДЛЯ КАРТИНКИ В ШАГЕ 1 -->
                        <div class="image-placeholder" id="step1Image">
                            					<img
																				src="./img/normal.jpg"
																				alt="мальчик грустно смотрит в телефон"
																				/>
                        </div>
                        
                        <div class="options-group">
                            <a href="#" class="option-item" id="optionA1">
                                <span class="option-prefix">A</span>
                                <span class="option-text">Сделать страницу общедоступной, так как тебе нечего скрывать.</span>
                            </a>
                            <a href="#" class="option-item" id="optionB1">
                                <span class="option-prefix">B</span>
                                <span class="option-text">Закрыть свою страницу для всех, кроме друзей, чтобы иметь возможность контролировать доступ других людей к публикуемой информации.</span>
                            </a>
                        </div>
                    </div>
                `

		document.getElementById('optionA1').addEventListener('click', function (e) {
			e.preventDefault()
			hasStarted = true
			userAnswers.step1 = 'A'
			currentStep = 'step1_explanation'
			render()
		})

		document.getElementById('optionB1').addEventListener('click', function (e) {
			e.preventDefault()
			hasStarted = true
			userAnswers.step1 = 'B'
			currentStep = 'step2'
			render()
		})
	}

	function renderStep1Explanation() {
		container.innerHTML = `
                    <div class="explanation-block">
                        <div class="explanation-text">
                            В этом случае, ты не сможешь контролировать доступ других людей к публикуемой информации. Страницу лучше закрыть для всех, кроме друзей.
                        </div>
                        
                        <!-- МЕСТО ДЛЯ КАРТИНКИ В ПОЯСНЕНИИ -->
                        <div class="image-placeholder" id="explanationImage">
                            					<img
																				src="./img/cybersecurty.jpg"
																				alt="Мальчики смеются над другим мальчиком"
																			/>
                        </div>
                        
                        <a href="#" class="next-step-btn" id="nextToStep2">Далее</a>
                    </div>
                `

		document
			.getElementById('nextToStep2')
			.addEventListener('click', function (e) {
				e.preventDefault()
				currentStep = 'step2'
				render()
			})
	}

	function renderStep2() {
		container.innerHTML = `
                    <div class="trainer-block">
                        <div class="step-title">Шаг 2. Ты закрыл свой профиль от всех, кроме друзей, но кто-то из твоих виртуальных друзей, кого ты даже не знаешь лично, начал выкладывать везде фото с твоей личной страницы с оскорбительными комментариями. Как поступить?</div>
                        
                        <!-- МЕСТО ДЛЯ КАРТИНКИ В ШАГЕ 2 -->
                        <div class="image-placeholder" id="step2Image">
                                      <img
																				src="./img/i.png"
																				alt="Мальчики смеются над другим мальчиком"
																			/>
                        </div>
                        
                        <div class="options-group">
                            <a href="#" class="option-item" id="optionA2">
                                <span class="option-prefix">A</span>
                                <span class="option-text">Заблокировать этого «друга», а в другой раз быть внимательным и не добавлять в друзья тех, кого не знаешь лично.</span>
                            </a>
                            <a href="#" class="option-item" id="optionB2">
                                <span class="option-prefix">B</span>
                                <span class="option-text">Вступить с этим «другом» в переписку, постараться уговорить его не делать этого, пригрозить ему.</span>
                            </a>
                        </div>
                    </div>
                `

		document.getElementById('optionA2').addEventListener('click', function (e) {
			e.preventDefault()
			userAnswers.step2 = 'A'
			currentStep = 'step3'
			render()
		})

		document.getElementById('optionB2').addEventListener('click', function (e) {
			e.preventDefault()
			userAnswers.step2 = 'B'
			currentStep = 'step2_explanation'
			render()
		})
	}

	function renderStep2Explanation() {
		container.innerHTML = `
                    <div class="explanation-block">
                        <div class="explanation-text">
                            Если этот человек тебе не знаком, не стоит пытаться вступать с ним в переписку, это может только раззадорить его, и он придумает новый способ, как тебя позлить. Просто удали его из друзей или заблокируй.
                        </div>
                        
                        <!-- МЕСТО ДЛЯ КАРТИНКИ -->
                        <div class="image-placeholder" id="explanationImage2">
                                      <img
																				src="./img/pzdc.jpg"
																				alt="мальчик сидит грустит"
																			/>
                        </div>
                        
                        <a href="#" class="next-step-btn" id="nextToStep3">Далее</a>
                    </div>
                `

		document
			.getElementById('nextToStep3')
			.addEventListener('click', function (e) {
				e.preventDefault()
				currentStep = 'step3'
				render()
			})
	}

	function renderStep3() {
		container.innerHTML = `
                    <div class="trainer-block">
                        <div class="step-title">Шаг 3. Если после всех предпринятых действий оскорбления в твой адрес идут в какой-то общедоступной группе, и кажется, что тебя пытаются морально унизить, то …</div>
                        
                        <!-- МЕСТО ДЛЯ КАРТИНКИ В ШАГЕ 3 -->
                        <div class="image-placeholder" id="step3Image">
                                      <img
																				src="./img/lol.png"
																				alt="мальчик сидит грустит"
																			/>
                        </div>
                        
                        <div class="options-group">
                            <a href="#" class="option-item" id="optionA3">
                                <span class="option-prefix">A</span>
                                <span class="option-text">Нужно встретиться с киберхулиганами в реальной жизни и попытаться поговорить.</span>
                            </a>
                            <a href="#" class="option-item" id="optionB3">
                                <span class="option-prefix">B</span>
                                <span class="option-text">Нужно обратиться за помощью к родителям, любимому учителю, психологу или другому надёжному взрослому человеку, позвонить по телефону доверия (8-800-2000-122).</span>
                            </a>
                        </div>
                    </div>
                `

		document.getElementById('optionA3').addEventListener('click', function (e) {
			e.preventDefault()
			userAnswers.step3 = 'A'
			currentStep = 'step3_explanation'
			render()
		})

		document.getElementById('optionB3').addEventListener('click', function (e) {
			e.preventDefault()
			userAnswers.step3 = 'B'
			currentStep = 'conclusion'
			render()
		})
	}

	function renderStep3Explanation() {
		container.innerHTML = `
                    <div class="explanation-block">
                        <div class="explanation-text">
                            Этого делать не нужно! Особенно в случае, если ты не знаешь, кто эти люди. Такая встреча может привести к ещё более печальным последствиям. Лучше обратись за помощью к родителям, любимому учителю, психологу или другому надёжному взрослому человеку. Ты можешь позвонить по телефону доверия 8-800-2000-122 и тебе обязательно помогут.
                        </div>
                        
                        <!-- МЕСТО ДЛЯ КАРТИНКИ -->
                        <div class="image-placeholder" id="explanationImage3">
                                      <img
																				src="./img/chtl.jpg"
																				alt="мальчик сидит грустит"
																			/>
                        </div>
                        
                        <a href="#" class="next-step-btn" id="nextToConclusion">Далее</a>
                    </div>
                `

		document
			.getElementById('nextToConclusion')
			.addEventListener('click', function (e) {
				e.preventDefault()
				currentStep = 'conclusion'
				render()
			})
	}

	function renderConclusion() {
		container.innerHTML = `
                    <div class="conclusion-block">
                        <div class="conclusion-title">Заключение. Запомни!</div>
                        
                        <!-- МЕСТО ДЛЯ КАРТИНКИ В ЗАКЛЮЧЕНИИ -->
                        <div class="image-placeholder" id="conclusionImage">
                                      <img
																				src="./img/vajno.png"
																				alt="мальчик сидит грустит"
																			/>
                        </div>
                        
                        <ul class="conclusion-list">
                            <li>Если травля происходит в соцсетях, то можно заблокировать обидчика и отправить на него жалобу с помощью доступных инструментов платформы. Компании, которым принадлежат социальные сети, обязаны следить за безопасностью своих пользователей.</li>
                            <li>Сохраняй доказательства буллинга: переписку, скриншоты постов, чтобы показать взрослым, что происходит.</li>
                            <li>Не стесняйся говорить о своих проблемах со взрослыми и обращаться к ним за помощью. Это не проявление твоей слабости, это проявление ума и рассудительности.</li>
                        </ul>

                        <div style="text-align: center; margin-top: 2rem;">
                            <a href="#" class="next-step-btn" id="finishBtn">Далее</a>
                        </div>
                    </div>
                `

		document
			.getElementById('finishBtn')
			.addEventListener('click', function (e) {
				e.preventDefault()
				currentStep = 'result'
				render()
			})
	}

	render()
})
