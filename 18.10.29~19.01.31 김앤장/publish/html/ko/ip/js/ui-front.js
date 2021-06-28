var DEVICEWIDTH, DEVICEHEIGHT, DEFAULTIMG;
DEVICEWIDTH = window.screen.availWidth;
DEVICEHEIGHT = window.innerHeight;

var varUA = navigator.userAgent.toLowerCase();
var blank = {func: function() {return undefined}};

var front = {
  jsonParser: function(jsonFileName, callback, after) {$.getJSON(jsonFileName, function(data) {callback && callback(data); after && after()}).error(function() {console.log('error')})},
  pageLoading: function(element, url, loadingAfter) {element.load(url, function(responseTxt, statusTxt, xhr) {if(statusTxt == 'success') {loadingAfter && loadingAfter();}if(statusTxt == 'error') {console.log('html load error!')}})},
  btnClick : function (btn, callback) {btn.off('click').on('click', function () {callback && callback($(this))})},
  showCallback : function (element, callback) {element.show().ready(function () {callback && callback()})},
  hideCallback : function (element, callback) {element.hide().ready(function () {callback && callback()})},
  tabMenu : function(btn, className, tabContents, callback) {
    front.btnClick(btn, function($this) {
      var myli = $this.parent(), idx = myli.index(); myli.siblings().removeClass(className); myli.addClass(className);
      tabContents.find('> div').removeClass(className); tabContents.find('> div').eq(idx).addClass(className);
      callback && callback($this);
    });
  },
  scrollAnchor : function(btn, speed, elementCont, className, type) {
    var ctrl = false, headerH = $('header').outerHeight(true);
    var changeScroll;
    var pad;
    if ($(window).width() > 1024) {
      if ($('.fixed_mo_tab').length > 0) {
        if ($('.privacy_tab').length > 0) {pad = 55;}
        else {pad = $('.fixed_mo_tab').outerHeight(true);}
      } else {pad = 55;}
    } else {
      if ($('.fixed_mo_tab').length > 0) {pad = $('.fixed_mo_tab').outerHeight(true);}
      else {pad = $('.lnb').outerHeight(true);}
    }
    front.btnClick(btn, function($this) {
      var myName = $this.attr('data-name');
      var value = 0;
      if ($(window).width() > 1024) {
        value = Math.ceil($('#' + myName).offset().top - headerH - $('.top_info').outerHeight(true) - pad);
      } else {
        if ($(window).width() > $(window).height()) {
          value = Math.ceil($('#' + myName).offset().top - headerH - pad);
        } else {
          value = Math.ceil($('#' + myName).offset().top - headerH - $('.top_info_mo').outerHeight(true) - pad);
        }
      }
      $('html, body').stop().animate({scrollTop: value}, speed, 'easeOutCubic');
      var prevW = 0;
      $this.parent().prevAll().each(function() {
        prevW += $this.parent().innerWidth();
      });
      $this.parent().parent().stop().animate({scrollLeft : prevW}, 500);
    });
    var onScroll = function() {
      var nowPosition = $(window).scrollTop();
      if ($('aside.aside').length > 0) {
        if ($(window).width() > 1024) {changeScroll = 200;}
        else {changeScroll = 0;}
      } else {changeScroll = 0;};
      btn.each(function() {
        var $this = $(this), myName = $this.attr('data-name');
        var value = 0;
        if ($('.top_info').length > 0 && $(window).width() > 1024) {
          value = Math.ceil($('#' + myName).offset().top - headerH - $('.top_info').outerHeight(true) - pad);
        }
        else if ($('.top_info_mo').length > 0 && $(window).width() <= 1024) {
          value = Math.ceil($('#' + myName).offset().top - headerH - $('.top_info_mo').outerHeight(true) - pad);
        }
        else {
          if ($('#' + myName).length > 0) {
            value = Math.ceil($('#' + myName).offset().top - headerH - pad);
          }
          else {return false;}
        }
        if (value <= Math.ceil(nowPosition + changeScroll) && value + $('#' + myName).outerHeight(true) > Math.ceil(nowPosition + changeScroll)) {
          btn.parent().removeClass(className); $this.parent().addClass(className);
        } else if (value > Math.ceil(nowPosition + changeScroll) && elementCont.outerHeight(true) - headerH - pad - $('.search_top').outerHeight(true) - $('.result_text').outerHeight(true) < Math.ceil(nowPosition + changeScroll)) {
          btn.parent().removeClass(className); $this.parent().addClass(className);
        }
      });
    };
    if (type) {$(window).on('scroll', onScroll);}
    else {return false;}
  },
  mobScrollAnchor : function($sticky) {
    var stickyOffSetTop;
    var headerH = $('header').outerHeight(true);
    var pad = 0;
    var $wrap = '<div class="fixed_box_mo" style="height:'+ Math.ceil($sticky.outerHeight(true)) + 'px' +'"></div>';
    var nowPosition = $(window).scrollTop();
    if ($('.fixed_box_mo').length > 0) {
      $sticky.unwrap($wrap).wrap($wrap);
    } else {
      $sticky.wrap($wrap);
    }
    var ctrl = false;
    $(window).scroll(function() {
      if ($('.top_info_mo').length > 0) {
        pad = Math.ceil($('.top_info_mo').outerHeight(true));
      }
			nowPosition = $(window).scrollTop();
      stickyOffSetTop = $sticky.offset().top;
			if ( ctrl == false && nowPosition + (headerH + pad) > parseInt(stickyOffSetTop) ) {ctrl = true; $sticky.css({'top' : headerH + pad + 'px'}).addClass('fixed')} else if( ctrl == true && nowPosition + (headerH + pad) < parseInt(stickyOffSetTop) ) {ctrl = false; $sticky.removeClass('fixed')}
		});
  },
  scrollAside : function($sticky, $content, asideOffsetTop) {
    var resizeOffset = asideOffsetTop;
    var headerH = $('header').outerHeight(true), pad = $('.top_container').outerHeight(true);
    var resizeTimer;
    if (!!$sticky.offset()) {
      var stickyH ,stickyTop = Math.ceil($sticky.offset().top), stickOffset = 0;
      var contentH, stopPoint;
      if ($('.top_info').length > 0) {stickOffset = 239;}
      else {stickOffset = 99;}
      var windowTop = $(window).scrollTop();
      sticky(windowTop);
      $(window).on('scroll', function() {
        if ($(window).width() <= 1024) {
          return false;
        } else {
          stickyH = $sticky.outerHeight(true);
          contentH = $content.outerHeight(true);
          stopPoint = contentH - (stickyH + stickOffset - pad);
          windowTop = $(window).scrollTop();
          sticky(windowTop);
        }
      });
      function sticky(windowTop) {
        if (stickyH < contentH) {
          if (stopPoint < windowTop) {$sticky.css({ position: 'absolute', top: 'auto', bottom: 0 });}
          else if (asideOffsetTop < windowTop+stickOffset) {$sticky.css({ position: 'fixed', top: stickOffset,bottom:'auto'});}
          else {$sticky.css({position: 'relative', top: 'auto', bottom:'auto'});}
        }
      }
    }
  },
  accordion : function(btn, box, className, speed, callback) {
    front.btnClick(btn, function($this) {
      if($this.hasClass('on')) {
        $this.parents(box).find('> div').slideUp(speed, 'easeOutCubic', function() {
          $this.find('.hidden_text').text('펼치기'); $this.removeClass('on'); $this.parents(box).removeClass(className);
          callback && callback();
        });
      } else {
        $(box).find('> div').slideUp(speed, 'easeOutCubic', function() {btn.removeClass('on'); btn.find('.hidden_text').text('펼치기')});
        $this.parents(box).find('> div').slideDown(speed, 'easeOutCubic', function() {$this.addClass('on'); $this.find('.hidden_text').text('접기');$(box).removeClass(className);$this.parents(box).addClass(className);callback && callback()});
      }
    });
  },
  scrollFixed : function(element, nowPosition, fixedTarget) {
    var headerH = $('header').outerHeight(true);
    var $wrap;
    if ($('.fixed_box').length > 0) {
      //element.unwrap($wrap).wrap($wrap);
    } else {
      $wrap = '<div class="fixed_box" style="height:'+ element.outerHeight(true) + 'px' +'"></div>';
      element.wrap($wrap);
    }
    if (nowPosition + headerH > parseInt(fixedTarget)) {element.addClass('fixed');}
    else if (nowPosition + headerH < parseInt(fixedTarget)) {element.removeClass('fixed');}
  },
  highLight : function (btn, className, element, callback) {
    front.btnClick(btn, function($this) {
      var value = $this.attr('data-value');
      $this.parent().siblings().find('> a').removeClass(className); $this.addClass(className);
      element.find('> li').removeClass(className);
      element.find($('[data-value='+ value + ']')).addClass(className);
    });
  },
  searchLoading: function(element, speed) {
    var eleOffSetTop = element.offset().top, headerH = $('header').outerHeight(true), value = eleOffSetTop - headerH;
    $('html, body').stop().animate({scrollTop: value}, speed, 'easeOutCubic');
  },
  searchKeyWord : function(btn, element, clickCallback, deleteCallback) {
    var count = 0;
    front.btnClick(btn, function($this) {
      var $keyWordTab = $this.closest('ul');
      var idx = $this.parent().index();
      var inHtml = '';
      if (!$this.parent().hasClass('select')) {
        count++;
        if (count > 3) {
          alert('최대 3개까지 검색하실 수 있습니다.');
          return false;
        } else {
          $this.parent().addClass('select');
          inHtml += '<span class="tag" data-num="'+ idx +'">'+ $this.text() +'<a href="javascript:void(0);" class="delete"></a></span>';
          element.append(inHtml).ready(function() {element.addClass('active')});
          clickCallback && clickCallback($this);
        }
      } else {alert('업무 분야는 중복 선택 불가 합니다.');}
      front.btnClick($('.delete'), function($that) {
        count--;
        var dataNum = $that.parent().attr('data-num');
        var tagLength = element.find('> span').length;
        $keyWordTab.find('li').eq(dataNum).removeClass('select');
        $that.parent().remove();
        if (tagLength == 1) {$('.text_result').hide();element.removeClass('active')}
        deleteCallback && deleteCallback($that);
      });
    });
  },
  scrollAni : function(element, callback) {
    var value = element.offset().top;
    $('html, body').stop().animate({scrollTop: value}, 600, 'easeOutCubic', function() {
      //$('body').addClass('hidden');
    });
    callback && callback();
  },
  inputFoucs : function(element) {
    element.on({
      'focusin' : function() {element.parent().addClass('focus')},
      'focusout' : function() {element.parent().removeClass('focus')},
    });
  },
  scrollDimm : function() {
    var ctrl = false;
    var headerH = $('header').outerHeight(true);
    var contentOffSet = $('.content_wrap').offset().top;
    $(window).on('scroll', function() {
      var nowPosition = $(window).scrollTop();
      var contentH = $('.content_wrap').outerHeight(true);
      var stopPoint = (contentH + contentOffSet) - DEVICEHEIGHT;
      if (ctrl == false && nowPosition > headerH && nowPosition < stopPoint) {
        ctrl = true;
        $('.content_wrap').append('<div class="scroll_dimm"></div>');
      } else if (ctrl == true && nowPosition < headerH) {
        ctrl = false;
        $('.scroll_dimm').remove();
      } else if (ctrl == true && nowPosition > stopPoint) {
        ctrl = false;
        $('.scroll_dimm').remove();
      }
    });
  },
  selectDropDown : function(btn, element) {
    btn.removeClass('on');
    front.hideCallback(element, function() {});
    front.btnClick(btn, function($this) {
      if ($(window).width() < 1024) {
        front.hideCallback(element, function() {});
      }
      if (!$this.hasClass('on')) {
        front.showCallback($this.next(), function() {
          $this.next().stop().animate({scrollTop : 0}, 0, function() {
            $this.addClass('on');
          });
        });
      } else {
        front.hideCallback($this.next(), function() {
          $this.next().stop().animate({scrollTop : 0}, 0, function() {
            $this.removeClass('on');
          });
        });
      }
    });
  },
  numberCount : function(element, startPosition) {
    var $scope = element;
    var $target = $scope.find('strong');
    var percent= $scope.attr('data-value');
    var counter;
    var scrollCtrl = false;
    var time = 0.3;
    var ui = {
      reset : function() {
        state = true;
        if ($scope.hasClass('year')) {counter = { value: 2019 }}
        else {counter = { value: 1 }}
        $target.html(Math.ceil(counter.value));
        TweenMax.set( $scope, { paddingLeft:40, opacity:0 });
      },
      countUp : function() {$target.html(Math.ceil(counter.value));},
      act : function() {
        if ( percent == undefined ) {
          TweenMax.to($scope, 0.5, {
            paddingLeft: 0, opacity:1,
            onComplete : function() {/* callback */}
          });
          return;
        }
        TweenMax.to($scope, 0.5, {
          paddingLeft: 0, opacity:1,
          onComplete : function() {/* callback */}
        });
        TweenMax.to(counter, time+1, {
          value: percent, onUpdate: ui.countUp, ease: Power2.easeInOut,
          onComplete : function() {/* callback */}
        });
      },
      init : function() {
        ui.reset();
        ui.act();
      }
    }

    $(window).on('scroll', function() {
      var nowPosition = $(window).scrollTop();
      if ( scrollCtrl == false && nowPosition > startPosition) {
        scrollCtrl = true;
        ui.init();
      } else if ( scrollCtrl == true &&  nowPosition == 0) {
        scrollCtrl = false;
        ui.reset();
      }
    });
  },
  scaleNumber : function(element, startPosition) {
    var scrollCtrl = false;
    $(window).on('scroll', function() {
      var nowPosition = $(window).scrollTop();
      if ( scrollCtrl == false && nowPosition > startPosition) {
        scrollCtrl = true;
        element.addClass('on');
      } else if ( scrollCtrl == true &&  nowPosition == 0) {
        scrollCtrl = false;
        element.removeClass('on');
      }
    });
  },
  slider : function(element) {
    var ul = element.find('ul');
    var slideItem = ul.find('> li');
    var slideMember;
    var maxLength;
    var windowW = $(window).width();
    var resizeTimer;
    if ($(window).width() >= 768) {
      if (ul.hasClass('wide')) {
        slideMember = ul.bxSlider({
          'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', slideWidth: 286, pager: false,
          moveSlides: 4, minSlides: 4, maxSlides: 4, slideMargin: 32, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : true,
        });
      } else {
        slideMember = ul.bxSlider({
          'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', slideWidth: 216, pager: false,
          moveSlides: 4, minSlides: 4, maxSlides: 4, slideMargin: 32, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : true,
        });
      }
      if (slideItem.length < 4) {
        element.find('.slide_control').hide();
      }
    } else {
      slideMember = ul.bxSlider({
        'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', slideWidth: 311, pager: false,
        moveSlides: 2, minSlides: 2, maxSlides: 2, slideMargin: 22, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : true,
      });
    }
    function reloadSlide() {
      if (element.length > 0) {
        if ($(window).width() >= 768) {
          if (ul.hasClass('wide')) {
            slideMember.reloadSlider({
              'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', slideWidth: 286, pager: false,
              moveSlides: 4, minSlides: 4, maxSlides: 4, slideMargin: 32, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : true,
            });
          } else {
            slideMember.reloadSlider({
              'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', slideWidth: 216, pager: false,
              moveSlides: 4, minSlides: 4, maxSlides: 4, slideMargin: 32, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : true,
            });
          }
        } else {
          slideMember.reloadSlider({
            'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', slideWidth: 311, pager: false,
            moveSlides: 2, minSlides: 2, maxSlides: 2, slideMargin: 22, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : true,
          });
        }
      }
    }
    $(window).on('resize', function(e) {
      if ($(window).width() == windowW) {return;}
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (slideItem.length > 2 && $(window).width() < 768) {
          element.find('.slide_control').show();
        } else if (slideItem.length > 4 && $(window).width() > 768) {
          element.find('.slide_control').show();
        } else {
          element.find('.slide_control').hide();
        }
        reloadSlide();
      }, 250);
    });
  },
  newsSlider : function(element) {
    var ul = element.find('ul');
    var slideItem = ul.find('> li');
    var slideNews;
    var maxLength;
    var windowW = $(window).width();
    var resizeTimer;
    if ($(window).width() > 1024) {
      slideNews = ul.bxSlider({
        'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', slideWidth: 394, pager: false,
        moveSlides: 1, minSlides: 3, maxSlides: 3, slideMargin: 20, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : false,
      });
      if (slideItem.length < 3) {
        element.find('.slide_control').hide();
      }
    } else {
      slideNews = ul.bxSlider({
        'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', pager: false,
        moveSlides: 1, minSlides: 1, maxSlides: 1, slideMargin: 32, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : true,
      });
    }
    function reloadSlide() {
      if (element.length > 0) {
        if ($(window).width() > 1024) {
          slideNews.reloadSlider({
            'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', slideWidth: 394, pager: false,
            moveSlides: 1, minSlides: 3, maxSlides: 3, slideMargin: 20, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : false,
          });
        } else {
          slideNews.reloadSlider({
            'nextSelector' : '.btn_next', 'prevSelector' : '.btn_prev', pager: false,
            moveSlides: 1, minSlides: 1, maxSlides: 1, slideMargin: 32, infiniteLoop : false, hideControlOnEnd : true, touchEnabled : true,
          });
        }
      }
    }
    $(window).on('resize', function(e) {
      if ($(window).width() == windowW) {return;}
      windowW = $(window).width();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (slideItem.length > 2 && $(window).width() < 1024) {
          element.find('.slide_control').show();
        } else if (slideItem.length > 3 && $(window).width() > 1024) {
          element.find('.slide_control').show();
        } else {
          element.find('.slide_control').hide();
        }
        reloadSlide();
      }, 250);
    });
  },
};


$(function () {
  // user agent
  if (varUA.match('android') != null) {
    $('body').addClass('mobile android');
  } else if (varUA.indexOf('iphone')>-1||varUA.indexOf('ipad')>-1||varUA.indexOf('ipod')>-1) {
    $('body').addClass('mobile iphone');
  } else {
    //아이폰, 안드로이드 외 처리
  }
  // 가로모드 스크립트
  if ($('body').hasClass('mobile')) {
    $(window).on('orientationchange', function(event) {
      console.log(orientation);
      if (orientation == 90) {
        console.log('가로모드');
      }
    });
  }

  var checkWidth = false;
  $(window).on('resize', function () {
    var bodyW = $('body').outerWidth();
    if (!checkWidth && bodyW < 768) {
      checkWidth = true;
      $('body').addClass('mobile');
    } else if (checkWidth && bodyW > 768) {
      checkWidth = false;
      $('body').removeClass('mobile');
    }
  });

  // ScrollMagic Plugin
  var Controller = new ScrollMagic.Controller();
  var sceneList = '.notice_news_js'.split(', ');
  sceneList.forEach(function(triggerSelector, idx){
    var scene = new ScrollMagic.Scene({
      'triggerElement' : triggerSelector,
      'triggerHook' : 0,
      // 'duration' : 100,
      'offset' : -800,        // - 600px 만큼 올린다
      // 'reverse' : false
    })
    .setClassToggle(triggerSelector, 'fade_in')
    //.addIndicators()
    .addTo(Controller);
  });

});
