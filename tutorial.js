var myTut = (function(MT){
	var tuts = [];

	var setUpNextSequence = function(tut){
		var nextContainer = $('[data-tutNum='+tut.tutNum+'][data-sequenceNum='+(tut.currentSequence+1)+']');

		if(nextContainer.length > 0){
			tut.currentSequence += 1;
			tut.container = nextContainer;
			console.log('theres another one');
		}
	}

	MT.init = function(userConfig){
		var tutNum,
		container,
		sequenceNum;

		if(typeof userConfig === 'string'){
			container = $('#' + userConfig);
			tutNum = container.attr('data-tutNum');
			tuts.push({
				container: container,
				tutNum: Number(tutNum, 10),
				currentSequence: 0
			});
		}else{

		}
	};

	MT.start = function(tutNum, userConfig){
		var config,
		tut = MT.get(tutNum),
		left,
		top;

		left = $(tut.container.attr('data-pointTo')).offset().left;
		top = $(tut.container.attr('data-pointTo')).offset().top;

		tut.container.css({
			left: tut.container.outerWidth() * -1,
			display: 'block'
		})

		config = {
			duration: 2,
			props: {
				left: left - tut.container.outerWidth(),
				top: top,
				onComplete: completeEvent
			}
		};
		config = $.extend(true, {}, config, userConfig);

		TweenLite.to(tut.container, config.duration, config.props);
		function completeEvent(){
			setUpNextSequence(tut);
			$.event.trigger('tutFinished', tut);
		}
	};
	MT.get = function(tutNum){
		var currentTut;

		$.each(tuts, function(index, tut){
			if(tut.tutNum === tutNum){
				currentTut = tut;
			}
		});

		return currentTut;
	}


	return MT;
}(myTut || {}));