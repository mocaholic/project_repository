// polyfill
if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
}
  
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

        do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

try {
	// test for scope support
	document.querySelector(':scope *');
} catch (error) {
	(function (ElementPrototype) {
		// scope regex
		var scope = /:scope(?![\w-])/gi;

		// polyfill Element#querySelector
		var querySelectorWithScope = polyfill(ElementPrototype.querySelector);

		ElementPrototype.querySelector = function querySelector(selectors) {
			return querySelectorWithScope.apply(this, arguments);
		};

		// polyfill Element#querySelectorAll
		var querySelectorAllWithScope = polyfill(ElementPrototype.querySelectorAll);

		ElementPrototype.querySelectorAll = function querySelectorAll(selectors) {
			return querySelectorAllWithScope.apply(this, arguments);
		};

		// polyfill Element#matches
		if (ElementPrototype.matches) {
			var matchesWithScope = polyfill(ElementPrototype.matches);

			ElementPrototype.matches = function matches(selectors) {
				return matchesWithScope.apply(this, arguments);
			};
		}

		// polyfill Element#closest
		if (ElementPrototype.closest) {
			var closestWithScope = polyfill(ElementPrototype.closest);

			ElementPrototype.closest = function closest(selectors) {
				return closestWithScope.apply(this, arguments);
			};
		}

		function polyfill(qsa) {
			return function (selectors) {
				// whether the selectors contain :scope
				var hasScope = selectors && scope.test(selectors);

				if (hasScope) {
					// fallback attribute
					var attr = 'q' + Math.floor(Math.random() * 9000000) + 1000000;

					// replace :scope with the fallback attribute
					arguments[0] = selectors.replace(scope, '[' + attr + ']');

					// add the fallback attribute
					this.setAttribute(attr, '');

					// results of the qsa
					var elementOrNodeList = qsa.apply(this, arguments);

					// remove the fallback attribute
					this.removeAttribute(attr);

					// return the results of the qsa
					return elementOrNodeList;
				} else {
					// return the results of the qsa
					return qsa.apply(this, arguments);
				}
			};
		}
	})(Element.prototype);
}


document.addEventListener("DOMContentLoaded",domload);
function domload(e){
    tabControl.init();
    selectControl.init();
    selectBoxControl.init();
    accordion.init();
    asideControl.init();
    
    //???????????? ??????????????? ????????? ????????? ?????????????????? ????????? ????????? ??????????????? ??????
    setTimeout(function() {
        var event;
        if(typeof(Event) === 'function') {
            event = new Event('resize');
        }else{
            event = document.createEvent('Event');
            event.initEvent('resize', true, true);
        }

        window.dispatchEvent(event);
    }, 200)

    //bottomFloating ??? ???????????? html ??? bottomFloating-on ????????? ??????
    if(document.querySelectorAll('body > .bottomFloating').length > 0){
        document.getElementsByTagName('html')[0].classList.add('bottomFloating-on');
    }
}

//??? ?????????
var tabControl = {
    init: function(){
        document.addEventListener('click',tabUi_click);
        function tabUi_click(e){
            var tab_ui = e.target.closest('.tab-ui');
            if(tab_ui){
                if(e.target.closest('.tab-ui>ul>li')){
                    var active = getChildNumber(e.target.closest('.tab-ui>ul>li'));
                    var tabButton = e.target.closest('.tab-ui>ul>li');
                    tab_ui.querySelectorAll(':scope > ul > li').forEach(function(element,i){
                        element.classList.remove('on');
                    })
                    tabButton.classList.add('on');
                    if(tab_ui.nextElementSibling.classList.contains('tab-cont')){
                        var tabCont = tab_ui.nextElementSibling;
                        tabCont.querySelectorAll(':scope > div').forEach(function(element,i){
                            element.classList.remove('on');
                        })
                        var tabContButton = tabCont.querySelectorAll(':scope > div')[active-1];
                        tabContButton.classList.add('on');    
                    }
                    
                }
            }
            return false;
        }
    }
}

//??????????????? ?????????
var selectBoxControl = {
    init: function(){
        document.addEventListener('click',selectBoxTitle_click);
        function selectBoxTitle_click(e){
            var selectBox = e.target.closest('.selectbox');
            if(selectBox){
                var selectBoxTitle = selectBox.querySelectorAll(':scope > .title')[0];
                if(selectBoxTitle == e.target){
                    if(selectBox.classList.contains('open')){
                        selectBox.classList.remove('open');
                    }else{
                        selectBox.classList.add('open');
                    }
                }
                
            }
            return false;
        }
    }
}

// ???????????? ?????????
var accordion = {
    init: function(){
        var acc = document.getElementsByClassName("accordion-title");
        var i;
        
        for (i = 0; i < acc.length; i++) {
            var btn = acc[i].querySelectorAll(':scope > button')[0]
            var accordionPnnel = acc[i].nextElementSibling;
            if(btn){
                if(accordionPnnel){
                    if(acc[i].classList.contains('open')){
                        accordionPnnel.style.height = 'auto'
                    }else{
                        accordionPnnel.style.height = '0px'
                    }
                }
                
                btn.addEventListener("click", function() {
                    var acc_title = this.parentNode;
                    var accordionPnnel = acc_title.nextElementSibling;

                    if(this.closest('.accordion-wrap')){//???????????? ????????? ????????? ?????????????????? (accordion-wrap ??? ??????????????? oneActive ???????????? ????????????)
                        if(this.closest('.accordion-wrap').classList.contains('oneActive')){
                            var root = this.closest('.accordion-wrap');
                            var root_acc_title = root.getElementsByClassName('accordion-title');
                            var this_acc_title = this.closest('.accordion-title');
                            
                            if(root.classList.contains('oneActive')){
                                for (var index = 0; index < root_acc_title.length; index++) {
                                    var elem = root_acc_title[index];
                                    var accordionPnnel = elem.nextElementSibling;
                                    
                                    if(accordionPnnel){
                                        if(this_acc_title == elem){
                                            elem.classList.toggle('open');
                                            if(acc_title.classList.contains('open')){
                                                accordionPnnel.style.height = accordionPnnel.scrollHeight + 'px'
                                                this.innerText = '??????'
                                            }else{
                                                accordionPnnel.style.height = '0px'
                                                this.innerText = '??????'
                                            }
                                        }else{
                                            elem.classList.remove('open');
                                            accordionPnnel.style.height = '0px'
                                            this.innerText = '??????'
                                        }

                                        var accordionPnnel_parent = accordionPnnel.parentElement.closest('.accordion-panel');
                                        

                                        //???????????? ?????? ???????????? ????????????????????? ?????? ???????????? ????????? ????????? ????????? ?????????
                                        if(accordionPnnel_parent){
                                            accordionPnnel_parent.style.height = 'auto'
                                            setTimeout(function(){
                                                accordionPnnel_parent.style.height = accordionPnnel_parent.scrollHeight + 'px';
                                            },300)
                                        }
                                    }
                                }
                            }
                        }    
                    }else{
                        acc_title.classList.toggle("open");
                        if(accordionPnnel){
                            var accordionPnnel_parent = accordionPnnel.parentElement.closest('.accordion-panel');
                            if(acc_title.classList.contains('open')){
                                accordionPnnel.style.height = accordionPnnel.scrollHeight+1 + 'px'
                                this.innerText = '??????'
                            }else{
                                accordionPnnel.style.height = accordionPnnel.scrollHeight+1 + 'px'
                                setTimeout(function(){
                                    accordionPnnel.style.height = '0px'
                                    this.innerText = '??????'
                                },30)
                            }

                            //???????????? ?????? ???????????? ????????????????????? ?????? ???????????? ????????? ????????? ????????? ?????????
                            if(accordionPnnel_parent){
                                accordionPnnel_parent.style.height = 'auto'
                                setTimeout(function(){
                                    accordionPnnel_parent.style.height = accordionPnnel_parent.scrollHeight+1 + 'px';
                                },300)
                            }
                        }
                    }
                    
                    return false;
                });
            }
        }
    }
}

var asideControl = {
    init: function(){
        if($('.aside-wrap').length > 0){
            var relativeTop = $('.aside-wrap').offset().top - 100;
            var asideContents = document.getElementsByClassName('aside-contents')[0];
            var aside_wrap = document.getElementsByClassName('aside-wrap')[0];


            document.addEventListener('scroll',function(e){
                aside_action();
            })

            function aside_action(){
                var asideContents_height = asideContents.clientHeight;
                var aside_height = aside_wrap.clientHeight;
                var gap = asideContents_height - aside_height;
                var scrollPosition = window.scrollY || document.documentElement.scrollTop;
                if(relativeTop < scrollPosition){
                    if(scrollPosition - relativeTop < gap){
                        aside_wrap.classList.add('fixed');
                        aside_wrap.classList.remove('fixed-bottom');
                    }else{
                        aside_wrap.classList.remove('fixed');
                        aside_wrap.classList.add('fixed-bottom');
                    }
                }else{
                    aside_wrap.classList.remove('fixed');
                    aside_wrap.classList.remove('fixed-bottom');
                }
            }
            aside_action();
        }
    }
}

var selectControl = {
    init: function(){
        document.addEventListener('change',function(e){
            if(e.target.localName == 'select'){
                e.target.classList.add('selected');
            }
        })
    }
}

function getChildNumber(node) {
    return Math.ceil(Array.prototype.indexOf.call(node.parentNode.childNodes, node)/2);
}

//????????????
function popOpen(id){
    var list = document.getElementsByClassName('layerPop');
    for (var index = 0; index < list.length; index++) {
        list[index].classList.remove('open')
    }
    
    document.getElementById(id).classList.add('open')
}

//????????????
function popClose(id){
    document.getElementById(id).classList.remove('open')
}


$.datepicker.setDefaults({
    dateFormat: 'yymmdd',
    prevText: '?????? ???',
    nextText: '?????? ???',
    monthNames: ['1???', '2???', '3???', '4???', '5???', '6???', '7???', '8???', '9???', '10???', '11???', '12???'],
    monthNamesShort: ['1???', '2???', '3???', '4???', '5???', '6???', '7???', '8???', '9???', '10???', '11???', '12???'],
    dayNames: ['???', '???', '???', '???', '???', '???', '???'],
    dayNamesShort: ['???', '???', '???', '???', '???', '???', '???'],
    dayNamesMin: ['???', '???', '???', '???', '???', '???', '???'],
    showMonthAfterYear: true,
    yearSuffix: '???'
});

$(document).ready(function(){
    var prdImg = $('.ratio').find('img');
    prdImg.each(function(){
        var ratio = $(this).outerHeight() / $(this).outerWidth();
        if( ratio < 1) {$(this).addClass('horizontal')} else {$(this).addClass('vertical')}
    }); // img Ratio Class add (IE)
    
    $(".scroll-wrap").mCustomScrollbar({
        mouseWheelPixels: 300,
    });//Design Scroll


    $('.form-box input, .form-box select').each(function() {
        $(this).data('holder', $(this).attr('placeholder'));
        $(this).focusin(function(){
            $(this).closest('.form-box').removeClass('reset').addClass('focus-line');
        });
        $(this).focusout(function(){
            $(this).closest('.form-box').removeClass('focus-line');
        });
    }); // input, select active-line toggleClass
});