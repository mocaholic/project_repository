// guide

$(function(){
    var yn = 0;
    var UserAgent = "";
    $(document).ready(function(){
        $('body').wrapInner('<div class="scrollArea"></div>');
        $('body').prepend('<div class="search_guide">'+
            '<div class="search_area">'+
                '<select id="sel_search">'+
                    '<option value="0">서비스명</option>'+
                    '<option value="1">파일ID</option>'+
                '</select>'+
                '<input type="text" id="ipt_search" placeholder="메뉴이름 및 화면아이디 검색" />'+
                '<a href="javascript:;" class="btn_search">검색</a>'+
                '<a href="javascript:;" class="btn_total">전체메뉴</a>'+
            '</div>'+
        '</div>');

        UserAgent = navigator.platform;
        /* if(UserAgent.indexOf('Win') != 0){
            sScripts = '<script type="text/javascript" src="../../script/include/library/handlebars.js"></script>'+
                '<script type="text/javascript" src="../../script/include/library/of/orchestra_framework.js"></script>'+
                '<script type="text/javascript" src="../../script/include/library/xml2json.js"></script>'+
                '';
            $('body').append(sScripts);
        } */

        // $('#ipt_search').focus();
        $('.btn_search').on('click', function(){
            var idx = $('#ipt_search').val();
            if(idx == ''){
                alert('검색어를 입력하세요.');
                $('#ipt_search').focus();
                return false;
            }
            // 이전 검색어와 같은 검색어를 검색하면
            if(idx == $('#ipt_search').attr('title')){
                var tNum = $('.filelist tr.y').size()-1;
                // console.log(yn + "/" + tNum);
                if(yn == tNum){
                    alert('마지막입니다. 처음으로 돌아갑니다.');
                    yn = -1;
                }

                if($('.filelist table tr.y:first').attr('id') != 'n0'){
                    $('.filelist table tr.y').each(function(index){
                        $(this).attr('id','n'+index);
                    });
                    yn = 1;
                }else{
                    yn = yn + 1;
                }
                $('.filelist table tr#n'+yn).find('td a').focus();
                return false;
            }
            // 초기화
            $('#ipt_search').attr('title',idx);
            $('table tr').removeClass('y').removeAttr('id');
            var trNum = $('table tr').size()-1;
            var tdCase = $('#sel_search').val(); // 셀렉트박스 구분

            $('table tr').each(function(index){
                if($(this).find('td:eq('+tdCase+')').text().indexOf(idx) >= 0){
                    $(this).addClass('y');
                }
                if(trNum == index){
                    if($('table tr.y').size() == 0){
                        alert('⌜'+idx+'⌟에 대한 조회 내역이 없습니다.');
                        $('#ipt_search').val('');
                        return false;
                    }
                }
            });
            // $(window).scrollTop($('.filelist table tr.y:first').position().top-45);
            $('.filelist table tr.y:first td a').focus();
        });
        $('#ipt_search').on('keydown',function(event){
            if(event.keyCode == 13){
                $('.btn_search').trigger('click');
            }
        });
        $('.btn_total').on('click',function(){
            if(UserAgent.indexOf('Win') == 0){
                location.href = "../index.html"
            }else{
                sh.OFPAppManager.totalMenuView();
            }
        });

        var guideText = // 담당기획자
            ['가이드 : 21.10.18',
            'CO01 : 공통',];
        for(var i = 0; i < guideText.length; i++){
            $('.index_serviceTab .cf').append('<li id="tabMenu' + (i+1) + '"><a href="guide_list"'+ (i+1) +'.html" target="_self">' + guideText[i] + '</a></li>');
        }

        var sunNum = // 전체페이지본은 수동으로 할 수 밖에 없음
            [100, // 'CO01 : 공통'
             102, // 'IN01 : 마이페이지'
            ];
        
        var total = 0;
        for(var i in sunNum){
            total += sunNum[i];
        }
        $('.index_serviceTab h1').append('('+ total +' 본)'); // 페이지 총 합본
    });

    $(document).ready(function(){
        var UserAgent = navigator.platform;
        $('#tabMenu'+ tabNumber).addClass('on'); // 현재페이지 표시
        $('.filelist a').each(function(){
            if($(this).attr('target') != '_self'){
                if(UserAgent == 'Win32'){
                    $(this).attr('target','_blank');
                }else{
                    $(this).removeAttr('target');
                }
            }
        });
    });

    $('.filelist a').on('click', function(){
        $('.filelist a').removeClass('active');
        $(this).addClass('active');
    });

    $('.filelist tbody .tl th').each(function(){ // 1depth 내 리스트 수
        var thisListLength = $(this).parent().nextUntil('.tl').length;
        var thisName = $(this).html();
        $(this).html(thisName + '<span class="num">('+ thisListLength +')</span>');
    }); // end

    var dirTxt = $('.pageTl').text(); // 파일아이디별 html 링크처리: td 2번째
    $('.filelist tbody td:nth-child(2)').each(function(){
        var htmlId = $(this).text();
        if(!$(this).find('a').attr('href')){
            $(this).html('<a href="'+ dirTxt +'/'+ htmlId +'.html" target="_self">'+ htmlId +'</a>');
        }
    }); // end

    var pageTitle = $('.index_serviceTab li.on').text(); // 페이지 전체 리스트 수
    var pageNum = $('.filelist tbody tr').length - $('.filelist tbody .tl').length;
    $('.pageTl').html(pageTitle + '<span class="num">('+ pageNum +' 본)</span>'); // end

    $('.filelist tbody td:nth-child(3)').each(function(){ // 작성일: td 3번째
        if($(this).text() == ('') | $(this).text() == ('')){
            $(this).parent('tr').css('background','#e9e9e9');
        }
    }); // end

    $('.filelist tbody td:nth-child(4)').each(function(){ // 작성자명 처리: td 4번째
        if($(this).text() == ('') | $(this).text() == ('')){
            $(this).text(pageWriter);
        }
    }); // end

    var d = new Date();
    var dyear = d.getFullYear();
    var dyearE = dyear.toString();
    var dyearC = dyearE.replace('20',''); // 날짜 '20' 제거
    var dmonth = d.getMonth() + 1;
    var dday = d.getDate();
    var dtoday = dyearC + '.'+ dmonth + '.' + dday; // 오늘 날짜

    $('.filelist tbody td:nth-child(5)').each(function(){ // 수정내역 처리: td 5번째
        var editText = $(this).html();
        var editLast = $(this).find('span:last-child').text();
        if(editText != '' & editText != ''){
            $(this).html('<a href="javascript:;" class="editStatus"><span class="editmark">●</span> <div class="tooltip">'+ editText +'</div> </a>');
        }
        if(editLast.match(dtoday)){
            $(this).parent('tr').css('background','#ff7777');
        }
    }); // end

    $('.filelist tbody td:nth-child(3)').each(function(){ // 작성일 처리: td 3번째
        var editText = $(this).html();
        var editLast = $(this).text();
        if(editLast.match(dtoday)){
            $(this).parents('tr').css('background','#d1e5f8');
        }
    }); // end

    $('.index_serviceTab h1').click(function(){ // 상단 섹션 메뉴 탭 토글
        if($(this).find('span').text() == '▲'){
            $(this).parents('.index_serviceTab').find('.cf').css('display','none');
            $(this).find('span').text('▼');
        }else{
            $(this).parents('.index_serviceTab').find('.cf').css('display','block');
            $(this).find('span').text('▲');
        }
    }); // end

    $('.filelist tbody .tl th').append('<span class="bl">▲</span>'); // 리스트 토글
    $('.filelist tbody tr').click(function(){
        if($(this).hasClass('tl')){
            if($(this).find('.bl').text() == '▲'){
                $(this).find('.bl').text('▼');
                $(this).nextUntil('.tl').css('display','none');
            }else{
                $(this).find('.bl').text('▲');
                $(this).nextUntil('.tl').css('display','block');
            }
        }
        var thisOffett = $(this).offset().top; // 클릭 offset.top 좌표
        // $('html, body').animate({scrollTop:thisOffett},'fast'); // 해당 클릭 offset.top으로 스크롤 이동 
    }); // end
    


});