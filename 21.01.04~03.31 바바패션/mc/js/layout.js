document.addEventListener("DOMContentLoaded",domload);
function domload(e){
    tabControl.init();
    selectBoxControl.init();
    tooltipControl.init();
    selectControl.init();
    filterControl.init();
    goodsDetailTabControl.init();
    videoWrapControl.init();

    //폰트가 로딩이 된 다음에 실행이되어야 오류가 없음
    setTimeout(function(){
        accordion.init();
        boardReplyBoxControl.init();
        boardReplyBoxControl_a.init();
    },100)

    //스와이프 가로사이즈 계산이 윈도우 리사이즈후에 제대로 잡히는 문제때문에 추가
    setTimeout(() => {
        window.dispatchEvent(new Event("resize"))
    }, 200)

    //bottomFloating 이 존재하면 html 에 bottomFloating-on 클래스 추가
    if(document.querySelectorAll('[class *= bottomFloating]').length > 0){
        document.getElementsByTagName('html')[0].classList.add('bottomFloating-on');
    }
    
}


//탭 컨트롤
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

//상품상세 탭 누르면 탭 상단으로 스크롤이동 하게 하는거
var goodsDetailTabControl = {
    init: function(){
        if(document.querySelectorAll('.tab-a.goodsDetail + .tab-cont')[0]){
            var tab = document.querySelectorAll('.tab-a.goodsDetail>ul>li>a');
            var posY = document.querySelectorAll('.tab-a.goodsDetail + .tab-cont')[0].offsetTop;
            Array.from(tab).forEach((elem, index) => {
                elem.addEventListener('click',function(e){
                    window.scrollTo(0,posY);
                    return false;
                })
            });
        }
    }
}

//셀렉트박스 컨트롤
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

// 아코디언 컨트롤
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

                    if(this.closest('.accordion-wrap')){//아코디언 한개만 열리게 컨트롤하는거 (accordion-wrap 로 감싸져있고 oneActive 클래스가 있을경우)
                        if(this.closest('.accordion-wrap').classList.contains('oneActive')){
                            var root = this.closest('.accordion-wrap');
                            var root_acc_title = root.getElementsByClassName('accordion-title');
                            var this_acc_title = this.closest('.accordion-title');
                            
                            if(root.classList.contains('oneActive')){
                                Array.from(root_acc_title).forEach((elem, index) => {
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
                                        

                                        //아코디언 안에 아코디언 들어가있는경우 상위 아코디언 패널에 사이즈 재조정 하는거
                                        if(accordionPnnel_parent){
                                            accordionPnnel_parent.style.height = 'auto'
                                            setTimeout(function(){
                                                accordionPnnel_parent.style.height = accordionPnnel_parent.scrollHeight + 'px';
                                            },300)
                                        }
                                    }
                                });
                            }
                        }    
                    }else{
                        acc_title.classList.toggle("open");
                        if(accordionPnnel){
                            var accordionPnnel_parent = accordionPnnel.parentElement.closest('.accordion-panel');
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

                            //아코디언 안에 아코디언 들어가있는경우 상위 아코디언 패널에 사이즈 재조정 하는거
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

//툴팁 컨트롤
var tooltipControl = {
    init: function(){
        var currentTip;
        document.addEventListener('click',function(e){
            var target = e.target;

            if(e.target.classList.contains('tipIcon')){

                var tooltip = document.getElementsByClassName('tooltip');
                Array.from(tooltip).forEach((elem, index) => {
                    var tipIcon = elem.getElementsByClassName('tipIcon')[0];
                    tipIcon.classList.remove('on');
                })

                currentTip = target;
                currentTip.classList.add('on');
                var clientRect = target.getBoundingClientRect();
                var relativeTop = clientRect.top;
                var tipCont = target.nextElementSibling;
                if(tipCont){
                    tipCont.style.top = relativeTop + 20 + 'px';
                }
                
            }
        })
        var currentTip;
        document.addEventListener('click',function(e){
            var tooltip = e.target.closest('.tooltip');

            if(tooltip){
                if(e.target.classList.contains('btn-close')){
                    var tipCont = e.target.closest('.tipCont');
                    currentTip = tipCont;
                    tipCont.previousElementSibling.classList.remove('on');
                }    
            }else{
                if(currentTip){
                    currentTip.classList.remove('on');
                }
            }
            return false;
            
        })
        document.addEventListener('scroll',function(e){
            if(currentTip){
                currentTip.blur();
                currentTip.classList.remove('on');
            }
        })
    }
}

//아코디언형태 게시판 컨트롤
var boardReplyBoxControl = {
    init: function(){
        var boardReplyBox = document.getElementsByClassName('boardReplyBox');
        var prev_boardReplyBox;
        Array.from(boardReplyBox).forEach((elem, index) => {
            var list = elem.querySelectorAll(':scope > .list')[0];
            var cont = list.querySelectorAll(':scope > .cont')[0];
            
            elem.style.height = list.offsetHeight + 'px';
            cont.addEventListener('click',function(e){

                var boardReplyBox = e.target.closest('.boardReplyBox');
                var list = boardReplyBox.querySelectorAll(':scope > .list')[0];
                var reply = boardReplyBox.querySelectorAll(':scope > .reply')[0];
                var default_height = list.offsetHeight;
                var height = list.offsetHeight + reply.offsetHeight;
                boardReplyBox.classList.toggle('viewReply');
                if(boardReplyBox.classList.contains('viewReply')){
                    if(prev_boardReplyBox){
                        if(boardReplyBox != prev_boardReplyBox){
                            var prev_list = prev_boardReplyBox.querySelectorAll(':scope > .list')[0];
                            prev_list_default_height = prev_list.offsetHeight;
                            prev_boardReplyBox.classList.remove('viewReply')
                            prev_boardReplyBox.style.height = prev_list_default_height + 'px';    
                        }
                    }
                    boardReplyBox.style.height = height + 'px';
                }else{
                    boardReplyBox.style.height = default_height + 'px';
                }
                prev_boardReplyBox = boardReplyBox;
            })
        })
    }
}
var boardReplyBoxControl_a = {
    init: function(){
        var boardReplyBox = document.getElementsByClassName('boardReplyBox-a');
        var prev_boardReplyBox;
        Array.from(boardReplyBox).forEach((elem, index) => {
            var list = elem.querySelectorAll(':scope > .list')[0];
            var toggle = elem.querySelectorAll(':scope > .toggle')[0];
            var def_height = elem.dataset.defheight;
            elem.style.height = def_height + 'px';
            toggle.addEventListener('click',function(e){
                
                var boardReplyBox = e.target.closest('.boardReplyBox-a');
                var list = boardReplyBox.querySelectorAll(':scope > .list')[0];
                var reply = boardReplyBox.querySelectorAll(':scope > .reply')[0];
                if(reply){
                    var height = list.offsetHeight + reply.offsetHeight;
                    boardReplyBox.classList.toggle('viewReply');
                    if(boardReplyBox.classList.contains('viewReply')){
                        if(prev_boardReplyBox){
                            if(boardReplyBox != prev_boardReplyBox){
                                var prev_list = prev_boardReplyBox.querySelectorAll(':scope > .list')[0];
                                prev_list_default_height = prev_list.offsetHeight;
                                prev_boardReplyBox.classList.remove('viewReply')
                                prev_boardReplyBox.style.height = prev_boardReplyBox.dataset.defheight + 'px';    
                            }
                        }
                        boardReplyBox.style.height = height + 'px';
                    }else{
                        boardReplyBox.style.height = def_height + 'px';
                    }
                    prev_boardReplyBox = boardReplyBox;
                }
            })
        })
    }
}

var filterControl = {
    init: function(){
        var filter = document.querySelectorAll('[name = filterMenu]');
        var prevBtn;
        Array.from(filter).forEach((elem, index) => {
            if(elem.checked){
                var btn = document.getElementById(elem.id + '-btn');
                btn.classList.add('on');
                prevBtn = btn;
            }
            elem.addEventListener('change',function(e){
                if(prevBtn){
                    prevBtn.classList.remove('on');
                }
                var btn = document.getElementById(e.target.id + '-btn');
                btn.classList.add('on');
                prevBtn = btn;
            })
        })
        
        
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

// 비디오영역 컨트롤
var videoWrapControl = {
    init: function(){
        document.addEventListener('click',function(e){
            //console.log(e.target.classList.contains('btn-play'));
            if(e.target.classList.contains('btn-play')){
                var videoWrap = e.target.closest('.videoWrap');
                videoWrap.classList.add('play');
                var video = videoWrap.getElementsByTagName('video')[0];
                video.play();
            }
            return false;
        });
    }
}

function filterOpen(){
    document.getElementsByClassName('prd-list-filter')[0].classList.add('open');
}
function filterClose(){
    document.getElementsByClassName('prd-list-filter')[0].classList.remove('open');
}



//객체 index 구하는거
function getChildNumber(node) {
    return Math.ceil(Array.prototype.indexOf.call(node.parentNode.childNodes, node)/2);
}

//y값 구하는거
function getPosY(element){ let posY = element.offsetTop; if(element.offsetParent){ posY += element.offsetParent.offsetTop; } return posY; }

//팝업열기
function popOpen(id){
    const list = document.getElementsByClassName('layerPop');
    for (let index = 0; index < list.length; index++) {
        list[index].classList.remove('open')
    }
    
    document.getElementById(id).classList.add('open')
}

//팝업닫기
function popClose(id){
    document.getElementById(id).classList.remove('open')
}

//이미지 숨김
function imgmoreHide(obj){
    obj.closest('.goodsImgMoreArea').classList.add('full');
}