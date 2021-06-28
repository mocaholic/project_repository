$(function() {
  var $btnAnchor = $('.btn_anchor_wrap > ul > li > a');
  var $btnMainTop = $('.btn_top');
  var $dimm = $('.dimm');
  var value = 0;
  var frontMain = {
    scrollAnchorMain : function(btn, speed, className, type) {
      var changePosition = Math.ceil($('.btn_anchor_wrap').position().top);
      front.btnClick(btn, function($this) {
        var myName = $this.attr('data-value');
        value = Math.ceil($('#' + myName).offset().top);
        $('html, body').stop().animate({scrollTop: value}, speed, 'easeOutCubic');
      });
      var onScroll = function() {
        var nowPosition = $(window).scrollTop();
        btn.each(function() {
          var $this = $(this), myName = $this.attr('data-value');
          var value = 0;
          value = Math.ceil($('#' + myName).offset().top);
          if (value - changePosition <= Math.ceil(nowPosition) && value + $('#' + myName).outerHeight(true) - changePosition > Math.ceil(nowPosition)) {
            btn.parent().removeClass(className); $this.parent().addClass(className);
          }
        });
      };
      if (type) {$(window).on('scroll', onScroll);}
      else {return false;}
    },
  }
  frontMain.scrollAnchorMain($btnAnchor, 600, 'on', true);

  // 웹접근성
  var btnWeb = $('.btn_web');
  var layerWeb = $('.layer_web_accessibility');
  front.btnClick(btnWeb, function($this) {
    var nowPosition = $(window).scrollTop();
    if (!$this.hasClass('on')) {
      layerWeb.addClass('on');
      $this.addClass('on');
      $dimm.addClass('on');
      $('body').addClass('hidden');
      var btnClose = layerWeb.find('.btn_layer_close');
      front.btnClick(btnClose, function() {
        $this.removeClass('on');
        layerWeb.removeClass('on');
        $dimm.removeClass('on');
        $('body').removeClass('hidden');
      });
    }
  });
  // 면책 공고
  var btnExemption = $('.btn_exemption');
  var layerExemption = $('.layer_exemption');
  front.btnClick(btnExemption, function($this) {
    var nowPosition = $(window).scrollTop();
    if (!$this.hasClass('on')) {
      layerExemption.addClass('on');
      $this.addClass('on');
      $dimm.addClass('on');
      $('body').addClass('hidden');

      var btnClose = layerExemption.find('.btn_layer_close');
      front.btnClick(btnClose, function() {
        $this.removeClass('on');
        layerExemption.removeClass('on');
        $dimm.removeClass('on');
        $('body').removeClass('hidden');
      });
    }
  });

  ;(function(global, $){
    'use strict';
    var _scope,ctrl,topBtn;
    function init(){
      _scope = global;
      ctrl = false;
      topBtn = document.querySelector('.btn_top');
      bind();
    };
    function bind(){
      $(_scope).on('scroll', function(){
        var _scrollTop = $(_scope).scrollTop();
        if ( ctrl == true && _scrollTop == 0 ) {
          ctrl = false;
          $(topBtn).removeClass('show');
        } else if ( ctrl == false &&  _scrollTop > 0  ){
          ctrl = true;
          $(topBtn).addClass("show");
          front.btnClick($(topBtn), function() {
            $('html, body').stop().animate({scrollTop : 0}, 300);
          });
        }
      });
    }
    init();
  }(window, $));
});
