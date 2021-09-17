document.addEventListener("DOMContentLoaded",domload);
function domload(e){
	lnbControl.init();
	tabControl.init();
	accordion.init();
}

// lnb 컨트롤 
var lnbControl = {
	init: function(){
		document.addEventListener('click',initLnb);
		function initLnb(e){
			var wrap = document.getElementById("wrapper");
			var lnb = document.getElementById("lnb");
		
			var lnbList = lnb.children;
		
			lnbList[0].addEventListener('click', function(event){
				this.classList.remove("on");
			});
			for(i=0;i<lnbList.length;i++) {
				lnbList[i].addEventListener('click', function(event){
					/*wrap.classList.add("open-menu");*/
					
					for(j=0;j<lnbList.length;j++) {
						lnbList[j].classList.remove("on");
					}
					
					this.classList.toggle("on");
				});
			}
		}
	}
}

//탭 컨트롤
var tabControl = {
    init: function(){
        document.addEventListener('click',tabUi_click);
        function tabUi_click(e){
            var tab_ui = e.target.closest('.tab_menu');
            if(tab_ui){
                if(e.target.closest('.tab_menu>ul>li')){
                    var active = getChildNumber(e.target.closest('.tab_menu>ul>li'));
                    var tabButton = e.target.closest('.tab_menu>ul>li');
                    tab_ui.querySelectorAll(':scope > ul > li').forEach(function(element,i){
                        element.classList.remove('on');
                    })
                    tabButton.classList.add('on');
                    if(tab_ui.nextElementSibling.classList.contains('tab_cont')){
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

function getChildNumber(node) {
    return Math.ceil(Array.prototype.indexOf.call(node.parentNode.childNodes, node)/2);
}

// 아코디언 컨트롤
var accordion = {
    init: function(){
        var acc = document.getElementsByClassName("acd_title");
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

                    if(this.closest('.accordion-wrap')){//아코디언 한개만 열리게 컨트롤하는거 (accordion-wrap 로 감싸져있고 oneActive 클래스가 있을경우)
                        if(this.closest('.acd_wrap').classList.contains('oneActive')){
                            var root = this.closest('.acd_wrap');
                            var root_acc_title = root.getElementsByClassName('acd_title');
                            var this_acc_title = this.closest('.acd_title');
                            
                            if(root.classList.contains('oneActive')){
                                for (var index = 0; index < root_acc_title.length; index++) {
                                    var elem = root_acc_title[index];
                                    var accordionPnnel = elem.nextElementSibling;
                                    
                                    if(accordionPnnel){
                                        if(this_acc_title == elem){
                                            elem.classList.toggle('open');
                                            if(acc_title.classList.contains('open')){
                                                accordionPnnel.style.height = accordionPnnel.scrollHeight + 'px'
                                                this.innerText = '닫힘'
                                            }else{
                                                accordionPnnel.style.height = '0px'
                                                this.innerText = '열림'
                                            }
                                        }else{
                                            elem.classList.remove('open');
                                            accordionPnnel.style.height = '0px'
                                            this.innerText = '열림'
                                        }

                                        var accordionPnnel_parent = accordionPnnel.parentElement.closest('.accordion-panel');
                                        
                                    }
                                }
                            }
                        }    
                    }else{
                        acc_title.classList.toggle("open");
                        if(accordionPnnel){
                            var accordionPnnel_parent = accordionPnnel.parentElement.closest('.acd_panel');
                            if(acc_title.classList.contains('open')){
                                accordionPnnel.style.height = accordionPnnel.scrollHeight+1 + 'px'
                                this.innerText = '닫힘'
                            }else{
                                accordionPnnel.style.height = accordionPnnel.scrollHeight+1 + 'px'
                                setTimeout(function(){
                                    accordionPnnel.style.height = '0px'
                                    this.innerText = '열림'
                                },30)
                            }
                        }
                    }
                    
                    return false;
                });
            }
        }
    }
}

// 팝업
function popup(obj){
	var popupObj = document.getElementsByClassName(obj);
	popupObj[0].style.opacity = "0";
	popupObj[0].style.display = 'block';
	
	setTimeout(function() {
	popupObj[0].style.opacity = "1";
	}, 100);
}

function popupClose(obj){
	var popupObj = document.getElementsByClassName(obj);
	setTimeout(function() {
		popupObj[0].removeAttribute("style");
	}, 10);
}
