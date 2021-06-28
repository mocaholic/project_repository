
// include
/*publishing UI only*/
$(document).ready(function(){
    if($('header').hasClass('main')) {
        // console.log('main');
        // $('header').load('inc_header.html');
        $('nav').load('inc_sidemenu.html');
        $('footer').load('inc_footer.html');
    }else {
        if($('header').hasClass('sub')) {

        }else if($('header').hasClass('recruit')) {
            $('footer').load('../../inc_footer.html'); 

        }else {
            $('header').load('../inc/inc_header.html');
            $('nav').load('../inc/inc_sidemenu.html');
            $('footer').load('../../inc_footer.html');            
        }
    }    

});
// 사이드메뉴
function sidemenu(){
    $('body').css('overflow','hidden');
    $('.dimmed').show();
    $('nav').addClass('on');
}
function sidemenuClose(){
    $('body').css('overflow','');
    $('.dimmed').hide();
    $('nav').removeClass('on');
}

$(function(){
    
    // 채용 메뉴 select
    $('.rec .header .btn_menu').click(function(){
        if($(this).hasClass('on')) {
            $(this).removeClass('on');
        } else {
            $(this).addClass('on');
        }
    });

});

document.addEventListener("DOMContentLoaded",domload);
function domload(e){
    tabControl.init();
    selectBoxControl.init();
    accordion.init();    

    onMore(); 
    onMailModify();
    onSelectChange();

    onScrap();  
    onOccuSearch();
    onNameSearch(); //publishing UI only
    onAllView();
    onMove(); //2021-05-07 추가
}

//탭 컨트롤
var tabControl = {
    init: function(){
        document.addEventListener('click',tabUi_click);
        function tabUi_click(e){
            var tab_ui = e.target.closest('.tab_ui');
            if(tab_ui){
                if(e.target.closest('.tab_ui>ul>li')){
                    var active = getChildNumber(e.target.closest('.tab_ui>ul>li'));
                    var tabButton = e.target.closest('.tab_ui>ul>li');
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

//셀렉트박스 컨트롤
var selectBoxControl = {
    init: function(){
        var x, i, j, l, ll, selElmnt, a, b, c;
        /* Look for any elements with the class "custom-select": */
        x = document.getElementsByClassName("custom_select");
        l = x.length;
        for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select_selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select_items select_hide");
        for (j = 0; j < ll; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same_as_selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                    y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same_as_selected");
                    break;
                }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            
            e.stopPropagation();
            closeAllSelect(this);

            // disabled 화면 확인
            if(this.parentNode.className == 'form_box custom_select disabled') {
                // console.log(this.parentNode.className);
            } else {
                this.nextSibling.classList.toggle("select_hide");
                this.classList.toggle("select_arrow_active");
            }
            
            // this.nextSibling.classList.toggle("select_hide");
            // this.classList.toggle("select_arrow_active");
            
        });
        }
        function closeAllSelect(elmnt) {
            /* A function that will close all select boxes in the document,
            except the current select box: */
            var x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("select_items");
            y = document.getElementsByClassName("select_selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                arrNo.push(i)
                } else {
                y[i].classList.remove("select_arrow_active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                x[i].classList.add("select_hide");
                }
            }
        }

        /* If the user clicks anywhere outside the select box,
        then close all select boxes: */
        document.addEventListener("click", closeAllSelect);
        
    }
}

// 아코디언 컨트롤
var accordion = {
    init: function(){
        var acc = document.getElementsByClassName("accordion_title");
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

                    if(this.closest('.accordion_wrap')){//아코디언 한개만 열리게 컨트롤하는거 (accordion_wrap 로 감싸져있고 oneActive 클래스가 있을경우)
                        if(this.closest('.accordion_wrap').classList.contains('active')){
                            var root = this.closest('.accordion_wrap');
                            var root_acc_title = root.getElementsByClassName('accordion_title');
                            var this_acc_title = this.closest('.accordion_title');
                            
                            if(root.classList.contains('active')){
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

                                        var accordionPnnel_parent = accordionPnnel.parentElement.closest('.accordion_panel');
                                        

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
                            var accordionPnnel_parent = accordionPnnel.parentElement.closest('.accordion_panel');
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


//객체 index 구하는거
function getChildNumber(node) {
    return Math.ceil(Array.prototype.indexOf.call(node.parentNode.childNodes, node)/2);
}

//레이어팝업열기
function popOpen(id){
    var list = document.getElementsByClassName('layerPop');
    for (var index = 0; index < list.length; index++) {
        list[index].classList.remove('open')
    }
    
    document.getElementById(id).classList.add('open')
    $('body').css('overflow','hidden');
}

//레이어팝업닫기
function popClose(id){
    document.getElementById(id).classList.remove('open')
    $('body').css('overflow','');
}

//맞춤채용정보 더보기
function onMore() {
    $('.recruit_info_box').find('.btn_more').click(function() {       
        $(this).parents('.recruit_info_box').toggleClass('on');
    });
    if ($('.recruit_info_box').find('.condition_box').prop("scrollHeight") > 108) {        
        $('.recruit_info_box').find('.btn_more').show();
    }
}

//맞춤채용정보 메일주소 수정
function onMailModify() {
    $('.reception_mail_box').find('.btn_mail_modify').click(function() {
        if($(this).hasClass('on')) {
            $(this).removeClass('on').text('메일주소 수정');
            $('.email_box').hide();
        } else {
            $(this).addClass('on').text('창닫기');
            $('.email_box').show();
        }
    });

    $('.btn_toggle').click(function () {
        if($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.email_box').hide();
        } else {
            $(this).addClass('on');
            $('.email_box').show();
        }
    });
}

//직무선택 
function onSelectChange() {
    var $part = $('.select_part');
    var $select = $('.choose_box');

    if($select.find('.choose_list_box li.txt').length > 0) {
        $part.css("padding-bottom", $select.height() + 60);
    } else {
        $part.css("padding-bottom", 0);
    }
} 

//스크랩
function onScrap() {
    $('.scrap_list_box').find('.btn_scrap').click(function() {
        $(this).toggleClass('on');
    })
} 

//직무선택 검색
function onOccuSearch() {
    $('.btn_occu_search').click(function() {
        if($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).siblings('.occu_search_box').hide();
        } else {
            $(this).addClass('on');
            $(this).siblings('.occu_search_box').show();
        }
        
    });
}

//이력서 등록 학교명 검색 publishing UI only 
function onNameSearch() {
    $('.insert_list_box input').on({
        'focusin' : function() {
            $(this).siblings('.btn_txt_del').show();
            $(this).siblings('.btn_insert').show();
            $(this).siblings('.school_list').show();
        },
        'focusout' : function() {
            $(this).siblings('.btn_txt_del').hide();
            $(this).siblings('.btn_insert').hide();
            $(this).siblings('.school_list').hide();
        }
    });
}

//50대 그룹 그룹사 전체보기
function onAllView() {
    $('.subsidiary_box').find('.btn_all').click(function() {        
        $(this).toggleClass('on');
    })
}

//채용공고 anchor 이동
function onMove() {
    var menu = $('.sticky_bar ul li');

    menu.find('a').click(function() {
        var idx = $(this).parent().index();
        var offsetTop = $('.inner_box').eq(idx).offset().top;

        $(this).parent().addClass('on').siblings().removeClass('on');

        $('html, body').stop().animate({
            scrollTop : offsetTop - 77
        }, 800)
    });

    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        
        $('.inner_box').each(function(index) {                    
            var currentTop = ($('.inner_box').eq(index).offset().top) - 150;
           
            if(currentTop <=  scrollTop) {
                menu.removeClass('on');
                menu.eq(index).addClass('on');
            }
        });

        if(scrollTop < 175) {
            $('.sticky_bar').removeClass('fixed');
        } else {
            $('.sticky_bar').addClass('fixed');
        }
    });
}