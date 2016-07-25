/************************************************************
|															|
|				helpinput 			 						|
|															|
|	Autor:		Rafael Pedro Pelizza 						|
|	Facebook:	https://www.facebook.com/rafaelpedro83 		|
|	Github:		https://github.com/rpelizza 				|
|	Contato: 	rafael.pelizza@gmail.com					|
|															|
|															|
************************************************************/
(function($){

	$.fn.helpinput = function(options) {

		var capsLockAtivo = false;
		var gravando = false;
		var defaults = {
			'keyboard': true,
			'speech': true,
			'password': true
		};

		var settings = $.extend({}, defaults, options);



		$('head').append('<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');



		function buildTeclado() {
			$('body').append('<div id="teclado-virtual-box"><div class="keypad"><section class="teclas-row"><div class="tecla um" data-tecla="q">q</div><div class="tecla um" data-tecla="w">w</div><div class="tecla um" data-tecla="e">e</div><div class="tecla um" data-tecla="r">r</div><div class="tecla um" data-tecla="t">t</div><div class="tecla um" data-tecla="y">y</div><div class="tecla um" data-tecla="u">u</div><div class="tecla um" data-tecla="i">i</div><div class="tecla um" data-tecla="o">o</div><div class="tecla um" data-tecla="p">p</div><div class="tecla um-meio" data-tecla="return">&#8592;</div></section><section class="teclas-row"><div class="tecla um-meio" data-tecla="capslock"><span class="capStatus"></span><span class="teclaCapsLock">Caps</span></div><div class="tecla um" data-tecla="a">a</div><div class="tecla um" data-tecla="s">s</div><div class="tecla um" data-tecla="d">d</div><div class="tecla um" data-tecla="f">f</div><div class="tecla um" data-tecla="g">g</div><div class="tecla um" data-tecla="h">h</div><div class="tecla um" data-tecla="j">j</div><div class="tecla um" data-tecla="k">k</div><div class="tecla um" data-tecla="l">l</div><div class="tecla um" data-tecla="ç">ç</div></section><section class="teclas-row"><div class="tecla um-meio" data-tecla="arroba">@</div><div class="tecla um" data-tecla="z">z</div><div class="tecla um" data-tecla="x">x</div><div class="tecla um" data-tecla="c">c</div><div class="tecla um" data-tecla="v">v</div><div class="tecla um" data-tecla="b">b</div><div class="tecla um" data-tecla="n">n</div><div class="tecla um" data-tecla="m">m</div><div class="tecla um-meio" data-tecla="enter">&#8629;</div></section><section class="teclas-row"><div class="tecla um" data-tecla="espaco">&nbsp;</div></section></div><div class="numpad"><section class="teclas-row"><div class="tecla um" data-tecla="7">7</div><div class="tecla um" data-tecla="8">8</div><div class="tecla um" data-tecla="9">9</div></section><section class="teclas-row"><div class="tecla um" data-tecla="4">4</div><div class="tecla um" data-tecla="5">5</div><div class="tecla um" data-tecla="6">6</div></section><section class="teclas-row"><div class="tecla um" data-tecla="1">1</div><div class="tecla um" data-tecla="2">2</div><div class="tecla um" data-tecla="3">3</div></section><section class="teclas-row"><div class="tecla um" data-tecla="0">0</div><div class="tecla um" data-tecla="enter">&#8629;</div></section></div></div>');			
		}


		function buildSpeech() {
			$('body').append('<div id="mic-recording"><span></span><i class="material-icons">mic</i></div>');
		}


		if (($('#teclado-virtual-box').length === 0) && (settings.keyboard == true)) {
			buildTeclado();

			$('.teclas-row').children('.tecla').each(function(index, el) {
				$(el).click(function(event) {
					var tecla = $(el).attr('data-tecla');
					$(el).css({
						'-webkit-transform': 'translate(1px)',
					    '-ms-transform': 'translate(1px)',
					    '-o-transform': 'translate(1px)',
					    'transform': 'translate(1px)',
					    'background-color': '#333333',
					    'box-shadow': '0 1px 0 #000'
					}).delay(100).queue(function() {
						$(this).css({
							'-webkit-transform': 'translate(0)',
						    '-ms-transform': 'translate(0)',
						    '-o-transform': 'translate(0)',
						    'transform': 'translate(0)',
						    'background-color': '#444444',
						    'box-shadow': '0'
						});
						$(this).dequeue();
					});

					if (tecla == 'capslock') {
						if ($('.capStatus').css('background-color') == 'rgb(156, 156, 156)') {
							$('.capStatus').css('background-color','#8BC34A');
							for(var i=0; i < $('.tecla').length; i++) {
								var t = $('.tecla').eq([i]).text().toUpperCase();
								if ($('.tecla').eq([i]).attr('data-tecla') != 'capslock') {
									$('.tecla').eq([i]).text(t);
								}
							}
						} else {
							$('.capStatus').css('background-color','#9c9c9c');
							for(var i=0; i < $('.tecla').length; i++) {
								var t = $('.tecla').eq([i]).text().toLowerCase();
								if ($('.tecla').eq([i]).attr('data-tecla') != 'capslock') {
									$('.tecla').eq([i]).text(t);
								}
							}
						}
					}
					if (tecla != 'return' && tecla != 'capslock'  && tecla != 'enter') {						
						$('.box-ativa-kb').children('input').val($('.box-ativa-kb').children('input').val() + $(this).text());
					}
					if (tecla == 'return') {
						var valorInput = $('.box-ativa-kb').children('input').val();
						$('.box-ativa-kb').children('input').val(valorInput.substr(0,valorInput.length-1));
					}
				});
			});
		}

		if (($('#mic-recording').length === 0) && (settings.speech == true)) {
			buildSpeech();			
		}

		$('.helpinput-pwd').each(function(index, el) {
				$(el).click(function(event) {
					event.preventDefault();
					console.log($(el).parent().parent().parent().prev('input').attr('type','text'));
				});
			});

		return this.each (function() {

			$(this).wrap('<div class="helpinput-box"></div>');
			$(this).parent().append('<nav class="helpinput-nav"><span class="closeHelpInput"><i class="material-icons">close</i></span><ul></ul></nav>');

			if (settings.keyboard == true) {
				$(this).parent().children('nav').children('ul').append('<li><a href="#" class="helpinput-keyboard"><i class="material-icons">keyboard</i></a></li>');
			}

			if (settings.speech == true) {
				$(this).parent().children('nav').children('ul').append('<li><a href="#" class="helpinput-speech"><i class="material-icons">mic</i></a></li>');
			}

			if ((settings.password == true) && ($(this).attr('type') == 'password')) {
				$(this).parent().children('nav').children('ul').append('<li><a href="#" class="helpinput-pwd"><i class="material-icons">remove_red_eye</i></a></li>');
			}

			$(this).next('nav').find('.helpinput-pwd').click(function(event) {
				event.preventDefault();
				var inputPWD = $(this).parents('div.helpinput-box').children('input');
				if (inputPWD.attr('type') == 'password') {
					inputPWD.attr('type','text');
					$(this).addClass('helpinput-selected');
				} else {
					inputPWD.attr('type','password');
					$(this).removeClass('helpinput-selected');
				}
			});

			$(this).next('nav').find('.helpinput-keyboard').click(function(event) {
				event.preventDefault();
				var inputKeyboard = $(this).parents('div.helpinput-box').children('input');
				if ($('#teclado-virtual-box').css('bottom') == '0px') {
					$('.helpinput-keyboard').removeClass('helpinput-selected');
					$('#teclado-virtual-box').css('bottom','-300px');
					$('div.helpinput-box').removeClass('box-ativa-kb');
				} else {
					$(this).addClass('helpinput-selected');
					$('#teclado-virtual-box').css('bottom','0px');
					$('div.helpinput-box').removeClass('box-ativa-kb');
					$(this).parents('div.helpinput-box').addClass('box-ativa-kb');
				}
			});


			if (window.SpeechRecognition || window.webkitSpeechRecognition) {
				var speech_api = window.SpeechRecognition || window.webkitSpeechRecognition;
				var recebe_audio = new speech_api();
				recebe_audio.continuous = false;
				recebe_audio.interimResults = false;
				recebe_audio.lang = 'pt-BR';

				recebe_audio.onstart = function() {
					esta_gravando = true;
					$('#mic-recording').css('display','block');
					$(this).addClass('helpinput-selected');
				}

				recebe_audio.onend = function() {
					esta_gravando = false;
					$('#mic-recording').css('display','none');
					$('.helpinput-speech').removeClass('helpinput-selected');
				}

				recebe_audio.onresult = function() {
					transcricao_audio = event.results[0][0].transcript;
					$('.input-receive-speech').val(transcricao_audio);
					$('input').removeClass('input-receive-speech');
				}

			} else {
				alert('Seu navegador não tem suporte para a comunicação por voz');
			}

			$(this).next('nav').find('.closeHelpInput').click(function(event) {
				$('.helpinput-nav').css('display','none');
				$('.helpinput-keyboard').removeClass('helpinput-selected');
				$('.helpinput-speech').removeClass('helpinput-selected');
				$('.helpinput-pwd').removeClass('helpinput-selected');
				if ($('#teclado-virtual-box').css('bottom') == '0px') {
					$('#teclado-virtual-box').css('bottom','-300px');
				}
			});


			$(this).next('nav').find('.helpinput-speech').click(function(event) {
				event.preventDefault();
				var inputSpeech = $(this).parents('div.helpinput-box').children('input');
				inputSpeech.addClass('input-receive-speech');
				if ($('#mic-recording').css('display') == 'none') {
					$('#mic-recording').css('display','block');
					$(this).addClass('helpinput-selected');
					recebe_audio.start();
				} else {
					$('#mic-recording').css('display','none');
					$('.helpinput-speech').removeClass('helpinput-selected');					
				}
			});

			$(this).focusin(function(event) {
				$('.helpinput-box .helpinput-nav').css('display','none');
				$(this).next('.helpinput-nav').css('display','block');
				if ($('#teclado-virtual-box').css('bottom') == '0px') {
					if ($(this).next('nav').find('a.helpinput-keyboard').length) {
						$('.helpinput-keyboard').removeClass('helpinput-selected');
						$(this).next('nav').find('a.helpinput-keyboard').addClass('helpinput-selected');
						$('div.helpinput-box').removeClass('box-ativa-kb');
						$(this).parent().addClass('box-ativa-kb');
					}
				}
			});

			$(this).click(function(evt) {
				evt.preventDefault();
				$('.helpinput-box .helpinput-nav').css('display','none');
				$(this).next('.helpinput-nav').css('display','block');
			});


			$(this).keyup(function(event) {
				var x = event.which || event.keyCode;

				if (x == 20) {
					if (capsLockAtivo == true) {
						capsLockAtivo = false;					
						$('.capStatus').css('background-color','#9c9c9c');
						for(var i=0; i < $('.tecla').length; i++) {
							var t = $('.tecla').eq([i]).text().toLowerCase();
							if ($('.tecla').eq([i]).attr('data-tecla') != 'capslock') {
								$('.tecla').eq([i]).text(t);
							}
						}					
					} else {
						capsLockAtivo = true;
						$('.capStatus').css('background-color','#8BC34A');
						for(var i=0; i < $('.tecla').length; i++) {
							var t = $('.tecla').eq([i]).text().toUpperCase();
							if ($('.tecla').eq([i]).attr('data-tecla') != 'capslock') {
								$('.tecla').eq([i]).text(t);
							}
						}					
					}
				}
				
				switch (x) {
					case 65:
						$('.teclas-row').find('[data-tecla="a"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 66:
						$('.teclas-row').find('[data-tecla="b"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 67:
						$('.teclas-row').find('[data-tecla="c"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 68:
						$('.teclas-row').find('[data-tecla="d"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 69:
						$('.teclas-row').find('[data-tecla="e"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 70:
						$('.teclas-row').find('[data-tecla="f"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 71:
						$('.teclas-row').find('[data-tecla="g"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 72:
						$('.teclas-row').find('[data-tecla="h"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 73:
						$('.teclas-row').find('[data-tecla="i"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 74:
						$('.teclas-row').find('[data-tecla="j"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 75:
						$('.teclas-row').find('[data-tecla="k"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 76:
						$('.teclas-row').find('[data-tecla="l"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 77:
						$('.teclas-row').find('[data-tecla="m"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 78:
						$('.teclas-row').find('[data-tecla="n"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 79:
						$('.teclas-row').find('[data-tecla="o"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 80:
						$('.teclas-row').find('[data-tecla="p"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 81:
						$('.teclas-row').find('[data-tecla="q"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 82:
						$('.teclas-row').find('[data-tecla="r"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 83:
						$('.teclas-row').find('[data-tecla="s"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 84:
						$('.teclas-row').find('[data-tecla="t"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 85:
						$('.teclas-row').find('[data-tecla="u"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 86:
						$('.teclas-row').find('[data-tecla="v"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 87:
						$('.teclas-row').find('[data-tecla="w"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 88:
						$('.teclas-row').find('[data-tecla="x"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 89:
						$('.teclas-row').find('[data-tecla="y"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 90:
						$('.teclas-row').find('[data-tecla="z"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 186:
						$('.teclas-row').find('[data-tecla="ç"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 8:
						$('.teclas-row').find('[data-tecla="return"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 20:
						$('.teclas-row').find('[data-tecla="capslock"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 32:
						$('.teclas-row').find('[data-tecla="espaco"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 96:
						$('.teclas-row').find('[data-tecla="0"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 97:
						$('.teclas-row').find('[data-tecla="1"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 98:
						$('.teclas-row').find('[data-tecla="2"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 99:
						$('.teclas-row').find('[data-tecla="3"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 100:
						$('.teclas-row').find('[data-tecla="4"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 101:
						$('.teclas-row').find('[data-tecla="5"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 102:
						$('.teclas-row').find('[data-tecla="6"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 103:
						$('.teclas-row').find('[data-tecla="7"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 104:
						$('.teclas-row').find('[data-tecla="8"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 105:
						$('.teclas-row').find('[data-tecla="9"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
					case 13:
						$('.teclas-row').find('[data-tecla="enter"]').css({
							'-webkit-transform': 'translate(1px)',
						    '-ms-transform': 'translate(1px)',
						    '-o-transform': 'translate(1px)',
						    'transform': 'translate(1px)',
						    'background-color': '#333333',
						    'box-shadow': '0 1px 0 #000'
						}).delay(100).queue(function() {
							$(this).css({
								'-webkit-transform': 'translate(0)',
							    '-ms-transform': 'translate(0)',
							    '-o-transform': 'translate(0)',
							    'transform': 'translate(0)',
							    'background-color': '#444444',
							    'box-shadow': '0'
							});
							$(this).dequeue();
						});
						break;
				}
			});			
		});
	}	

})(jQuery);

