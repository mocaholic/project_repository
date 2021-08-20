window.onload=function(){
	initLnb();
	/*sameW();
	thumbAdd();
	initAccordion();
	placeholder();
	inputFail(event);*/
}

function initLnb(e){
	var wrap = document.getElementById("wrapper");
	var lnb = document.getElementById("lnb");

	var lnbList = lnb.children;

	/*
	var btnFold = document.querySelectorAll('.btn-fold');
	btnFold[0].addEventListener('click', function(event){
		wrap.classList.remove("open-menu");
	});
	*/
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