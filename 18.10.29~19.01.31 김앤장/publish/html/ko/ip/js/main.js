$(function() {
  // 19.01.25 스크립트 수정
  var $article = $('.content');
  var $dimm = $('.dimm'), $layerDimm = $('.layer_dimm'), $searhDimm = $('.search_dimm');
  var $mainLogo = $('.main_logo'), $searchTop = $('.search_top_area');
  var $btnLeftMenu = $('.btn_menu'), $leftLayer = $('.layer_menu');
  var $btnTopSearch = $searchTop.find('.btn_search'), $searchTopInput = $searchTop.find('input[type="text"]');
  var $btnMainTop = $('.btn_top');
  var $headerBar = $('.header_bar');
  var windowH = $(window).height();
  $(window).on('scroll', function() {
    var documentH = $('body').height();
    var nowPosition = $(window).scrollTop();
    var persent = (nowPosition/(documentH - windowH)) * 100;
    $headerBar.css({'width' : persent + '%'});
  });

  // left menu click event
  $btnLeftMenu.off('click').on('click', function() {
    if ($leftLayer.hasClass('on')) {
      $leftLayer.removeClass('on');
      $layerDimm.removeClass('on');
    } else {
      $layerDimm.addClass('on');
      $('body').addClass('hidden');
      $leftLayer.addClass('on');
      front.btnClick($('.layer_dimm.on'), function() {
        $leftLayer.removeClass('on');
        $layerDimm.removeClass('on');
        $('body').removeClass('hidden');
      });
      var btnClose = $leftLayer.find('.btn_layer_close');
      btnClose.off('click').on('click', function() {
        $leftLayer.removeClass('on');
        $layerDimm.removeClass('on');
        $('body').removeClass('hidden');
      });
    }
  });
  // 19.01.25 스크립트 수정
  front.btnClick($btnTopSearch, function($this) {
    if ($(window).width() > 1024) {
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

  ;(function(global, $){
    'use strict';
    var _scope,ctrl,topBtn;
    //console.log(_scope, ctrl, $topBtn);


    function init(){
      _scope = global;
      ctrl = false;
      //$topBtn = $(".back-to-top");
      topBtn = document.querySelector('.btn_top');
      //console.log(topBtn);
      bind();
    };

    function bind(){
      $(_scope).on('scroll', function(){
        var _scrollTop = $(_scope).scrollTop();
        if ( ctrl == true && _scrollTop == 0 ) {
          ctrl = false;
          $(topBtn).removeClass('show');
          $('header').removeClass('bg_black');
        } else if ( ctrl == false &&  _scrollTop > 0  ){
          ctrl = true;
          $(topBtn).addClass("show");
          $('header').addClass('bg_black');
          front.btnClick($(topBtn), function() {
            $('html, body').stop().animate({scrollTop : 0}, 300);
          });
        }
      });
    }
    init();
  }(window, $));

  // 웹접근성
  var btnWeb = $('.btn_web');
  var layerWeb = $('.layer_web_accessibility');
  front.btnClick(btnWeb, function($this) {
    if (!$this.hasClass('on')) {
      layerWeb.addClass('on');
      $this.addClass('on');
      $layerDimm.addClass('on');
      $('body').addClass('hidden');
      var btnClose = layerWeb.find('.btn_layer_close');
      front.btnClick(btnClose, function() {
        $this.removeClass('on');
        layerWeb.removeClass('on');
        $layerDimm.removeClass('on');
        $('body').removeClass('hidden');
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
      $('body').addClass('hidden');
      var btnClose = layerExemption.find('.btn_layer_close');
      front.btnClick(btnClose, function() {
        $this.removeClass('on');
        layerExemption.removeClass('on');
        $layerDimm.removeClass('on');
        $('body').removeClass('hidden');
      });
    }
  });
});
