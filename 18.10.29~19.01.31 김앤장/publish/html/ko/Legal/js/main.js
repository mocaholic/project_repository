$(function() {
  var result = Math.floor(Math.random() * 2);
  var $visualArea = $('.visual_wrap');
  var myInterval = setInterval(function() {
    $('video').removeClass('stop');
    document.querySelector('.visual_box.on .video_area').play();
    if(!$('video').hasClass('stop')) {
      clearInterval(myInterval);
    }
  },4);
  //$visualArea.find('> div').eq(result).addClass('on');
  var $article = $('.content');
  var $dimm = $('.dimm'), $layerDimm = $('.layer_dimm'), $searhDimm = $('.search_dimm');
  var ctrl = false, ctrlSwitch = true;
  var $searchInput = $('.visual_text_area').find('input[type="text"]');
  var $mainLogo = $('.main_logo'), $searchTop = $('.search_top_area');
  var $btnLeftMenu = $('.btn_menu'), $leftLayer = $('.layer_menu');
  var $btnTopSearch = $searchTop.find('.btn_search'), $searchTopInput = $searchTop.find('input[type="text"]');
  var $btnMainTop = $('.btn_top');
  var $srollDown = $('.sroll_down');
  var mainSlider;
  $searchInput.on({
    'focusin' : function() {focusInputIn(); ctrl = true;},
    'focusout' : function() {focusInputOut(); ctrl = false;}
  });
  function focusInputIn () {
    $searhDimm.addClass('on');
    $searchInput.parent().addClass('focus');
    $srollDown.hide();
    var myInterval = setInterval(function() {
      $('video').addClass('stop');
      document.querySelector('.visual_box.on .video_area').pause();
      if($('video').hasClass('stop')) {
        clearInterval(myInterval);
      }
    },4);
  }
  function focusInputOut() {
    $searhDimm.removeClass('on');
    $searchInput.parent().removeClass('focus');
    $srollDown.show();
    $searchInput.val('');
    var myInterval = setInterval(function() {
      $('video').removeClass('stop');
      document.querySelector('.visual_box.on .video_area').play();
      if(!$('video').hasClass('stop')) {
        clearInterval(myInterval);
      }
    },4);
  }

  if (DEVICEWIDTH > 1024) {
    var length = $('.section_wrap > section').length, step = 0, transLate = 100, value = 0;
    $('body').on('wheel mousewheel', function(e){
      e.preventDefault();
      var deltaY = e.originalEvent.deltaY, wheelDeltaY = e.originalEvent.wheelDeltaY;
      var org = e.originalEvent;
      var delta = 0;
      if (org.detail) {delta = org.detail * -40} else {delta = org.wheelDelta};
      if ( deltaY == 100 && wheelDeltaY == -120 || deltaY > 0 && wheelDeltaY == undefined ) {
         if (step == length) {step = length;}
         else {if (!ctrl) {ctrl = true;step++;value = step * transLate; ani();}}
      } else if (deltaY == -100 && wheelDeltaY == 120 || deltaY < 0 && wheelDeltaY == undefined){
         if (step < 1) {step = 0;}
         else {if (!ctrl) {ctrl = true;step--;value = step * transLate; ani();}}
      } else if (delta < 0) {
        if (step == length) {step = length;}
        else {if (!ctrl) {ctrl = true;step++;value = step * transLate; ani();}}
      } else if (delta > 0) {
        if (step < 1) {step = 0;}
        else {if (!ctrl) {ctrl = true;step--;value = step * transLate; ani();}}
      }
      if (step != 0) {
        front.showCallback($article, function() {
          if (ctrlSwitch) {
            ctrlSwitch = false;
            if ($('.slide_list > li').length > 1) {
              mainSlider = $('.slide_list').bxSlider({
                'responsive' : false,
                'controls' : false,
                'auto' : true,
                'pause' : 4000,
                onSlideAfter : function() {
                  mainSlider.stopAuto();
                  mainSlider.startAuto();
                }
              });
            }
          }
        });
      }
      function ani() {
        var myInterval = setInterval(function() {
          $('video').addClass('stop');
          document.querySelector('.visual_box.on .video_area').pause();
          if($('video').hasClass('stop')) {
            clearInterval(myInterval);
          }
        },4);
        $dimm.addClass('on');
        TweenMax.to('.section_wrap', .9, {
          yPercent: -(value),
          ease: Power2.easeInOut,
          onComplete : function() {
            ctrl = false;
            if(step == 0) {
              $article.hide(); $dimm.removeClass('on');
              ctrlSwitch = true;
              mainSlider.destroySlider();
              $('.visual_text_area').show();
              $('header').removeClass('active');
              $searchTopInput.val('').parent().removeClass('on');
              var myInterval = setInterval(function() {
                $('video').removeClass('stop');
                if ($('.layer_top_search').hasClass('on')) {
                  document.querySelector('.visual_box.on .video_area').pause();
                } else if ($('.layer_menu').hasClass('on')) {
                  document.querySelector('.visual_box.on .video_area').pause();
                } else {
                  document.querySelector('.visual_box.on .video_area').play();
                }
                if(!$('video').hasClass('stop')) {
                  clearInterval(myInterval);
                }
              },4);
            } else {
              $('.visual_text_area').hide();
              $('header').addClass('active');
            }
          },
        });
      };
      return false;
    });
  } else {
    var step = 0;
    var moLength = 3;
    // ipad
    $('.container').swipe({
      swipe:function(e, direction, distance, duration, fingerCount, fingerData) {
        e.stopPropagation();
        var winW = $(window).width();
        var winH = $(window).height();
        if (winW > winH) {
          return false;
        } else {
          if (direction == 'up') {
            console.log('up', step);
            var myInterval = setInterval(function() {
              $('video').addClass('stop');
              document.querySelector('.visual_box.on .video_area').pause();
              if($('video').hasClass('stop')) {
                clearInterval(myInterval);
              }
            },4);
            if (step == 0) {
              if (!ctrl) {
                front.showCallback($article, function() {
                  if (ctrlSwitch) {
                    ctrlSwitch = false;
                    if ($('.slide_list > li').length > 1) {
                      mainSlider = $('.slide_list').bxSlider({
                        'controls' : false,
                        'auto' : true,
                        'pause' : 4000,
                        onSlideAfter : function() {
                          mainSlider.stopAuto();
                          mainSlider.startAuto();
                        },
                      });
                    }
                  }
                });
              }
            }
            if (step == moLength) {step = moLength;}
            else {
              if (!ctrl) {
                ctrl = true;
                step++;
                $dimm.addClass('on');
                if (step == 1) {
                  $('.section_wrap').stop().animate({
                    'top' : '-100%'
                  }, 900, 'easeOutCubic', function() {
                    ctrl = false;
                    $mainLogo.show();
                    $searchTop.show();
                    $('.visual_text_area').hide();
                  });
                } else if (step == 2) {
                  $('.section_wrap').stop().animate({
                    'top' : '-200%'
                  }, 900, 'easeOutCubic', function() {
                    ctrl = false;
                  });
                } else if (step == 3) {
                  if ($('body').hasClass('iphone')) {
                    if (DEVICEWIDTH >= 768) {
                      $('.section_wrap').stop().animate({
                        'top' : '-226%'
                      }, 500, 'easeOutCubic', function() {
                        ctrl = false;
                      });
                    } else {
                      $('.section_wrap').stop().animate({
                        'top' : '-237%'
                      }, 500, 'easeOutCubic', function() {
                        ctrl = false;
                      });
                    }
                  } else {
                    $('.section_wrap').stop().animate({
                      'top' : '-230%'
                    }, 500, 'easeOutCubic', function() {
                      ctrl = false;
                    });
                  }
                }
              }
            }
          } else if (direction == 'down') {
            if (step < 1) {step = 0;}
            else {
              if (!ctrl) {
                ctrl = true;
                step--;
                console.log('down', step);
                if (step == 0) {
                  $('.section_wrap').stop().animate({
                    'top' : '-0%'
                  }, 900, 'easeOutCubic', function() {
                    ctrl = false; $dimm.removeClass('on'); $article.hide(); $mainLogo.hide(); $btnLeftMenu.show();
                    ctrlSwitch = true;
                    mainSlider.destroySlider();
                    $searchTop.hide(); $searchTopInput.parent().removeClass('on');
                    $('.visual_text_area').show();

                    var myInterval = setInterval(function() {
                      $('video').removeClass('stop');
                      document.querySelector('.visual_box.on .video_area').play();
                      if(!$('video').hasClass('stop')) {
                        clearInterval(myInterval);
                      }
                    },4);
                  });
                } else if (step == 1) {
                  $('.section_wrap').stop().animate({
                    'top' : '-100%'
                  }, 900, 'easeOutCubic', function() {
                    ctrl = false;
                  });
                } else if (step == 2) {
                  $('.section_wrap').stop().animate({
                    'top' : '-200%'
                  }, 900, 'easeOutCubic', function() {
                    ctrl = false;
                  });
                }
              }
            }
          }
        }
      },
    });
  }

  // left menu click event
  $btnLeftMenu.off('click').on('click', function() {
    if ($leftLayer.hasClass('on')) {
      $leftLayer.removeClass('on');
      $layerDimm.removeClass('on');
    } else {
      $layerDimm.addClass('on');
        $('body').addClass('hidden');
        var myInterval = setInterval(function() {
          $('video').addClass('stop');
          document.querySelector('.visual_box.on .video_area').pause();
          if($('video').hasClass('stop')) {
            clearInterval(myInterval);
          }
        },10);
      $leftLayer.addClass('on');
      front.btnClick($('.layer_dimm.on'), function() {
        $leftLayer.removeClass('on');
        $layerDimm.removeClass('on');
        var myInterval = setInterval(function() {
          $('video').removeClass('stop');
          if ($('.layer_top_search').hasClass('on')) {
            $leftLayer.removeClass('on');
            document.querySelector('.visual_box.on .video_area').pause();
          } else {
            $layerDimm.removeClass('on');
            $leftLayer.removeClass('on');
            document.querySelector('.visual_box.on .video_area').play();
          }
          if(!$('video').hasClass('stop')) {
            clearInterval(myInterval);
          }
        },4);
        $('body').removeClass('hidden');
      });
      var btnClose = $leftLayer.find('.btn_layer_close');
      btnClose.off('click').on('click', function() {
        if ($article.is(':visible') && !$('body').hasClass('mobile')) {
          $leftLayer.removeClass('on');
          $layerDimm.removeClass('on');
          document.querySelector('.visual_box.on .video_area').pause();
        } else {
          var myInterval = setInterval(function() {
            $('video').removeClass('stop');
            if ($('.layer_top_search').hasClass('on')) {
              $leftLayer.removeClass('on');
              document.querySelector('.visual_box.on .video_area').pause();
            } else {
              $layerDimm.removeClass('on');
              $leftLayer.removeClass('on');
              document.querySelector('.visual_box.on .video_area').play();
            }
            if(!$('video').hasClass('stop')) {
              clearInterval(myInterval);
            }
          },4);
          $('body').removeClass('hidden');
        }
      });
    }
  });

  front.btnClick($btnTopSearch, function($this) {
    if (DEVICEWIDTH > 1024) {
      if ($btnTopSearch.hasClass('on')) {$searchTopInput.parent().removeClass('on');$this.removeClass('on');}
      else {$searchTopInput.parent().addClass('on');$this.addClass('on');}
    } else {
      if ($btnTopSearch.hasClass('on')) {
        $btnLeftMenu.show();
        $('.main_logo').show();
        $searchTopInput.parent().removeClass('on');
        $this.removeClass('on');
      }
      else {
        $btnLeftMenu.hide();
        $('.main_logo').hide();
        $searchTopInput.parent().addClass('on');
        $this.addClass('on');
      }
    }
  });

  // top button
  front.btnClick($btnMainTop, function() {
    if (DEVICEWIDTH > 1024) {
      TweenMax.to('.section_wrap', .9, {
        yPercent: 0,
        ease: Power2.easeInOut,
        onComplete : function() {
          ctrl = false; step = 0;
          $('header').removeClass('active');
          $('.visual_text_area').show();
          $article.hide();
          ctrlSwitch = true;
          mainSlider.destroySlider();
          var myInterval = setInterval(function() {
            $('video').removeClass('stop');
            if ($('.layer_top_search').hasClass('on')) {
              document.querySelector('.visual_box.on .video_area').pause();
            } else if ($('.layer_menu').hasClass('on')) {
              document.querySelector('.visual_box.on .video_area').pause();
            } else {
              $dimm.removeClass('on');
              document.querySelector('.visual_box.on .video_area').play();
            }
            if(!$('video').hasClass('stop')) {
              clearInterval(myInterval);
            }
          },4);
        },
      });
    } else {
      //$('html, body').stop().animate({scrollTop: 0}, 1000, 'easeOutCubic');
      $('.section_wrap').stop().animate({
        'top' : '0%'
      }, 900, 'easeOutCubic', function() {
        ctrl = false; step = 0;
        $mainLogo.hide();
        $searchTop.hide();
        $article.hide();
        ctrlSwitch = true;
        mainSlider.destroySlider();
        $('.visual_text_area').show();
        var myInterval = setInterval(function() {
          $('video').removeClass('stop');
          if ($('.layer_top_search').hasClass('on')) {
            document.querySelector('.visual_box.on .video_area').pause();
          } else if ($('.layer_menu').hasClass('on')) {
            document.querySelector('.visual_box.on .video_area').pause();
          } else {
            $dimm.removeClass('on');
            document.querySelector('.visual_box.on .video_area').play();
          }
          if(!$('video').hasClass('stop')) {
            clearInterval(myInterval);
          }
        });
      });
    }
  });
  // 웹접근성
  var btnWeb = $('.btn_web');
  var layerWeb = $('.layer_web_accessibility');
  front.btnClick(btnWeb, function($this) {
    if (!$this.hasClass('on')) {
      layerWeb.addClass('on');
      $this.addClass('on');
      $layerDimm.addClass('on');
      var btnClose = layerWeb.find('.btn_layer_close');
      front.btnClick(btnClose, function() {
        $this.removeClass('on');
        layerWeb.removeClass('on');
        $layerDimm.removeClass('on');
      });
    }
  });
  // 면책 공고
  var btnExemption = $('.btn_exemption');
  var layerExemption = $('.layer_exemption');
  front.btnClick(btnExemption, function($this) {
    if (!$this.hasClass('on')) {
      layerExemption.addClass('on');
      $this.addClass('on');
      $layerDimm.addClass('on');
      var btnClose = layerExemption.find('.btn_layer_close');
      front.btnClick(btnClose, function() {
        $this.removeClass('on');
        layerExemption.removeClass('on');
        $layerDimm.removeClass('on');
      });
    }
  });
  $(document).on('click', '.bx-pager-item > a', function() {
    mainSlider.stopAuto();
    mainSlider.startAuto();
  });
  // 메인 가로모드 스크립트 대응
  if ($('body').hasClass('mobile')) {
    $(window).on('orientationchange', function(event) {
      console.log(orientation);
      if (orientation == 90) {
        $mainLogo.hide();
        $searchTop.hide();
        $dimm.removeClass('on');
        $('.visual_text_area').show();
        var myInterval = setInterval(function() {
          $('video').removeClass('stop');
          document.querySelector('.visual_box.on .video_area').play();
          if(!$('video').hasClass('stop')) {
            clearInterval(myInterval);
          }
        },4);
      } else {
        if (step != 0) {
          $mainLogo.show();
          $searchTop.show();
        }
      }
    });
  }
});
