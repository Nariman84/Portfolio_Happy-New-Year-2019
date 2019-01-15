$(document).ready(function() {

	var $popup = $(".popup"),
		$backdrop = $(".backdrop"),
		$popupError = $(".popup_error"),
		$backdropError = $(".backdrop_error"),
		$errorDesc = $(".error_desc"),
		$tutorialChooseBall = $(".tutorial"),
		$chooseDesc = $(".choose-decsription"),
		$okey = $(".okey"),
		$okeyError = $(".okey-error"),
		$errorDesc = $(".error_desc"),
		$inputGender = $(".select-gender").children(),
		delayPopup = 100,

		$xmasTree = $(".tree"),
		$btnStop = $(".stop"),
		$btnStart = $(".start"),
		$btnStartStop = $(".wrap-btn"),
		$btnChildren = $btnStartStop.children(),
		$xmasBall = $(".ball"),
		$targetBall = $(".target"),
		$snowman = $(".my-snowman"),
		$username,
		maleName;

	//open popup
	setTimeout(function() {
		$backdrop.fadeIn(500);
		$popup.fadeIn(500);
	}, delayPopup);

	var okeyText = [
			"Ok", 
			"Да, я такой", 
			"Да, я такая"
		],

		chooseDescText = [
			"Остановите ёлочку, выберите любой шарик и узнаете, что внутри него :)",
			"Можете выбрать еще один шарик :)",
			"Вы такой непостоянный :)",
			"Вы такая непостоянная :)"
		];

	$snowman.eq(0).on("click", function(e) {

		var $target = $(e.target);
		while ($target.attr("class") != "popup") {
			if ($target.hasClass("head-snowball")) {

				$username = $(".entry-field").val();
				$usernameLength = $(".entry-field").val().length;
				if ($inputGender.filter(":checked").val() === undefined) {
					$popupError.fadeIn(500);
					$backdropError.fadeIn(500);
					$okeyError.fadeIn(500);
					$errorDesc.html("Укажите, пожалуйста, Ваш пол и, если пожелаете, Ваше имя тоже");
				};
				if (!$usernameLength && $inputGender.filter(":checked").val() === "male") {
					$popupError.fadeIn(500);
					$backdropError.fadeIn(500);
					$errorDesc.html("Вы не указали своё имя, поэтому я буду звать Вас<br><span style='color:red; font-weight: bold;'>Поликарп</span> :)");
					setTimeout(function() {
						$popupError.fadeOut(1000);
						$backdropError.fadeOut(1000);
						$errorDesc.html("");
						$username = "Поликарп";
						authoriz();
					}, 4000);
				}
				if (!$usernameLength && $inputGender.filter(":checked").val() === "female") {
					$popupError.fadeIn(500);
					$backdropError.fadeIn(500);
					$errorDesc.html("Вы не указали своё имя, поэтому я буду звать Вас<br><span style='color:red; font-weight: bold;'>Зинаида</span> :)");
					setTimeout(function() {
						$popupError.fadeOut(1000);
						$backdropError.fadeOut(1000);
						$errorDesc.html("");
						$username = "Зинаида";
						authoriz();
					}, 4000);
				};
				if ($username && $inputGender.filter(":checked").val() === "male") {
					authoriz();
				} else if($username && $inputGender.filter(":checked").val() === "female") {
					authoriz();
				}

				function authoriz() {
					$backdrop.fadeOut(500);
					$popup.fadeOut(500);
					$chooseDesc.text(chooseDescText[0]);
					$okey.text(okeyText[0]);
					setTimeout(function() {
						$tutorialChooseBall.fadeIn(500);
						$chooseDesc.fadeIn(500);
					}, 1000);
					$greeting.html(`Здравствуйте, ${$username} :)`);
					$greeting.addClass("scaling-elem pulse");
				}
			}
			$target = $target.parent();
		}
	});

	$okeyError.click(function() {
		$popupError.fadeOut(500);
		$backdropError.fadeOut(500);
		$okeyError.fadeOut(500);
	});

	$okey.click(function() {
		$tutorialChooseBall.fadeOut(500);
		if ($chooseDesc.is(":visible")) {
			$chooseDesc.fadeOut(500);
		}
		showBtnStartStop();
	});

	function hideBtnStartStop() {
		$btnChildren.each(function(idx, elem) {
			var $elem = $(this);
			if ($elem.hasClass("btnStartStop")) {
				setTimeout(function() {
					makeFadeOut($elem);
				}, idx * 500);
			}
		});
	}

	function showBtnStartStop() {
		$btnChildren.each(function(idx, elem) {
			var $elem = $(this);
			if (!$elem.hasClass("btnStartStop")) {
				setTimeout(function() {
					makeFadeIn($elem);
				}, idx * 500);
			}
		});
	}

	function makeFadeIn($elem) {
		$elem.addClass("btnStartStop");
	}

	function makeFadeOut($elem) {
		$elem.removeClass("btnStartStop");
	}

	//stop rotate xmas tree
	$btnStop.click(function() {
		$xmasTree.addClass("stop-rotate");
		$xmasBall.addClass("stop-rotate");
	});

	$btnStart.click(function() {
		$xmasTree.removeClass("stop-rotate");
		$xmasBall.removeClass("stop-rotate");
		hideBtnStartStop();
			$tutorialChooseBall.fadeIn(500);
			$chooseDesc.eq(0).fadeIn(500);
			if ($inputGender.filter(":checked").val() === "male") {
				$chooseDesc.text(chooseDescText[2]);
				$okey.text(okeyText[1]);
			} else {
				$chooseDesc.text(chooseDescText[3]);
				$okey.text(okeyText[2]);
			}
		
	});

	var $greeting = $(".greeting"),
		$congratulation = $(".congratulation"),
		$congratulationText = $(".congratulation-text"),
		$postcard = $(".postcard"),
		$btnThnx = $(".thnx");

	$xmasBall.click(function() {

		if ($xmasTree.hasClass("stop-rotate")) {
			$(this).addClass("opacity-ball click-ball");
			$classBall = $(this).attr("class").split(" ");
			$congratulation.removeClass("scaling-elem congratulation-size");
			$congratulation.addClass(`${$classBall[1]}`);
			hideBtnStartStop();
			

			setTimeout(function() {
				$xmasTree.removeClass("stop-rotate");
				$xmasBall.removeClass("stop-rotate");
				$congratulation.addClass("scaling-elem pulse-ball");
			}, 1000);

			setTimeout(function() {
				$congratulation.removeClass("pulse-ball");
				$congratulation.addClass("congratulation-size");
			}, 2500);

			setTimeout(function() {
				var i;
				if (i = Math.floor(Math.random() * 9) + 1) {
					$congratulationText.html(congrat[i]);
					$congratulationText.fadeIn(1000);
					$btnThnx.fadeIn(2000);
				}
				$congratulation.slideDown(1000);
			}, 3500);
		}		
	});

	$btnThnx.eq(0).click(function() {
		var $clickBall = $(".click-ball");
		$congratulationText.fadeOut(500);
		$btnThnx.fadeOut(500);

		setTimeout(function() {
			$congratulationText.html("");
		}, 1000);

		setTimeout(function() {
			$congratulation.removeClass("congratulation-size");
			$congratulation.addClass("pulse-ball");
		}, 500);

		setTimeout(function() {
			$classCongratulationBall = $congratulation.attr("class").split(" ");
			$congratulation.removeClass("scaling-elem pulse-ball");
		}, 3000);

		setTimeout(function() {
			$classCongratulationBall = $congratulation.attr("class").split(" ");
			$congratulation.removeClass(`${$classCongratulationBall[1]}`);
			$clickBall.removeClass("opacity-ball click-ball");
		}, 3500);

		// setTimeout(function() {
			
		// }, 3500);

		setTimeout(function() {
			$tutorialChooseBall.fadeIn(500);
			$chooseDesc.text(chooseDescText[1]);
			$chooseDesc.eq(0).fadeIn(500);
			$okey.text(okeyText[0]);
		}, 4000);
	});

	var congrat = [
		`С Новым годом! Волшебства,<br>
		Смеха, счастья и тепла,<br>
		Мира, радостей, достатка<br>
		И во всех делах порядка!<br><br>
		Пусть все серое, плохое<br>
		Старый год возьмет с собою.<br>
		Впредь лишь светлые мгновенья<br>
		Создают пусть настроенье!`,

		`С Новым годом! С Новым годом!<br>
		С новым счастьем и добром.<br>
		Пусть он принесет здоровье<br>
		И достаток в каждый дом.<br><br>
		Пусть снежинки в танце кружат,<br>
		Пусть сбываются мечты.<br>
		Всем успехов и удачи,<br>
		Мира, счастья, теплоты.`,

		`С новым счастьем, с Новым годом<br>
		Поздравления звучат.<br>
		Пусть удача входит в моду,<br>
		Смех и счастье в дверь стучат.<br><br>
		Пусть зима снежком пушистым<br>
		Все тревоги заметет,<br>
		Чтобы белым был и чистым<br>
		К нам идущий Новый год.`,

		`С Новым годом поздравляю<br>
		И от всей души желаю<br>
		Море счастья, море смеха<br>
		И во всех делах успеха.<br><br>
		Всех желаний исполненья<br>
		И во всём только везенья,<br>
		Крепкого здоровья впрок<br>
		И волшебных дней клубок.`,

		`Желаю мира и добра,<br>
		Любви, душевного тепла!<br>
		Пускай вам этот Новый год<br>
		Успех и радость принесет!<br><br>
		Пусть Новый год откроет двери<br>
		В мир волшебства, заботы, веры.<br>
		И всё хорошее начнется!<br>
		Удача пусть вам улыбнется!`,

		`В жизни чуду есть место всегда,<br>
		И у вас пусть оно приключится.<br>
		Пусть плохое уходит от вас,<br>
		А всё лучшее пусть состоится!<br><br>
		Год пусть будет счастливым для вас,<br>
		Приумножит пускай достижения.<br>
		Ярких дней и сияющих глаз<br>
		В дорогом для души окружении!`,

		`С Новым годом, с новым счастьем,<br>
		С новой радостью, любовью.<br>
		Пусть несет год вам удачу,<br>
		Смех, улыбки и здоровье.<br><br>
		Нежностью сердца согреет,<br>
		Добротой наполнит души.<br>
		Новый год пусть будет щедрым,<br>
		Самым светлым, самым лучшим.`,

		`Лёгкой, праздничной снежинкой<br>
		Счастье в жизнь пускай придёт:<br>
		Чистым, свежим, как росинка,<br>
		Станет добрый Новый год!<br><br>
		Пусть подарит он успехи,<br>
		В каждом деле, что ни взять,<br>
		Много радости и смеха,<br>
		Столько, что не описать!`,

		`Пожелаю в Новый год,<br>
		Чтобы шел год без хлопот,<br>
		Подарил Вам много счастья<br>
		И укрыл от всех ненастий.<br><br>
		Пусть случится волшебство,<br>
		Дарит радость торжество.<br>
		Пусть все сбудутся мечты.<br>
		Счастья, мира, доброты!`,

		`Желаю сказочного года<br>
		Без бед, болезней и помех!<br>
		Готовьтесь к новым поворотам<br>
		На неожиданный успех.<br><br>
		Пусть только радостные лица<br>
		Вас дома будут окружать<br>
		И давняя мечта свершится,<br>
		Не заставляя долго ждать!`
	];
});