document.addEventListener("DOMContentLoaded",domload);
function domload(e){
	lnbControl.init();
	tabControl.init();
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