﻿﻿﻿﻿﻿﻿﻿/**
 *	KBNC PC 공통 js file
 */
var isAjax2ObjLoading = false;
var m = 15;		//사용자로부터 마우스 또는 키보드 이벤트가 없을경우의  자동로그아웃까지의 대기시간, 분단위
var s = 60;		//자동로그아웃 처리 몇초전에 경고를 보여줄지 설정하는 부분, 초단위
var is = m * 60;

var KBNC = {
	isAjax2ObjLoading : false,
	bnkInfo : {},
	ajaxTimeout : 180000,
	success : "SUCC",
	/**
	 * Object 의 String 타입 반환.
	 * string, number, boolean, date, function, object(null제외), null, undefined
	 * @param obj  Object
	 * @return String
	 */
	GetType:function(obj) {
		if (obj == null) {
			return "null";
		}
		return (typeof obj).toLowerCase();
	},
	
	/**
	 * null 또는 String Empty 체크.
	 * @param obj  object
	 * @return boolean
	 */
	IsNullOrEmpty:function(obj) {
		if (IsNull(obj)) {
			return true;

		} else {
			if (GetType(obj) == "string") {
				if (obj.length < 1) {
					return true;
				}
			}
		}
		return false;
	},
	
	/**
	 * undefined 체크.
	 * @param obj  object
	 * @return Boolean
	 */
	IsUndefined:function(obj) {
		return (obj == undefined);
	},
	
	/**
	 * null 또는 undefined 체크.
	 * @param obj  object
	 * @return Boolean
	 */
	IsNull:function(obj) {
		if ( obj==null || KBNC.IsUndefined(obj) ) {
			return true;
		}
		return false;
	},

	
	Ajax2Obj:function(form, url, callback, loading) {
		if ( KBNC.isAjax2ObjLoading ) {
			return;
		}

		if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
			KBNC.Loading(true);
		}
		KBNC.isAjax2ObjLoading = true;

		var retstr = null;
		var retobj = null;

		retobj = form.serializeArray();


		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			timeout: KBNC.ajaxTimeout,
			error:
				function(request, status, error) {
					try {
						console.log(request);
						console.log(status);
						console.log(error);
					} catch(e){}				
				
					KBNC.isAjax2ObjLoading = false;
					if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
						KBNC.Loading(false);
					}
					var statusobj;
					if ( request != null && request.status == 401 ) {
						alert("로그인 정보가 없습니다. 다시 로그인 해주세요");
						KBNC.goLogin();
					} else if ( status =='timeout' ) {
						alert("현재 통신량이 많아 처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
					} else {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 처리가 지연되고 있습니다." };
						if (ComUtil.GetType(callback) === "function") {
							callback.call(this,statusobj);
						} else {
							KBNC.alert(statusobj.message);
						}
					}
					return false;
				},
			success:
				function(ajaxData, status, error) {
					try {
						console.log(ajaxData);
						console.log(status);
						console.log(error);
					} catch(e){}				
				
					var statusobj;
					if (ajaxData == null) {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 처리가 지연되고 있습니다." };
					} else {
						statusobj = ajaxData.status;
					}

					KBNC.isAjax2ObjLoading = false;
					if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
						KBNC.Loading(false);
					}
					if (ComUtil.GetType(callback) === "function") {
						callback.call(this,statusobj,ajaxData);
					} else {
						if ( statusobj.success ) {
							callback.html(ajaxData.contents);
						} else {
							alert(statusobj.message);
						}
					}
				},
			data: retobj,
			async: true
		});
	},
	
	Ajax2Json:function(json, url, callback, loading) {
		if ( KBNC.isAjax2ObjLoading ) {
			return;
		}
		
		if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
			KBNC.Loading(true);
		}
		KBNC.isAjax2ObjLoading = true;
		
		var retstr = null;
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			timeout: KBNC.ajaxTimeout,
			error:
				function(request, status, error) {
					try {
						console.log(request);
						console.log(status);
						console.log(error);
					} catch(e){}				
					KBNC.isAjax2ObjLoading = false;
					if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
						KBNC.Loading(false);
					}
					var statusobj;
					if ( request != null && request.status == 401 ) {
						alert("로그인 정보가 없습니다. 다시 로그인 해주세요");
						KBNC.goLogin();
					} else if ( status =='timeout' ) {
						alert("현재 통신량이 많아 처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
					} else {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 처리가 지연되고 있습니다." };
						if (ComUtil.GetType(callback) === "function") {
							callback.call(this,statusobj);
						} else {
							KBNC.alert(statusobj.message);
						}
					}
					return false;
				},
			success:
				function(ajaxData, status, error) {
					try {
						console.log(ajaxData);
						console.log(status);
						console.log(error);
					} catch(e){}
				
					var statusobj;
					if (ajaxData == null) {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 처리가 지연되고 있습니다." };
					} else {
						statusobj = { "code": 0, "success": true, "message": "정상 처리 되였습니다." };
					}
					
					KBNC.isAjax2ObjLoading = false;
					if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
						KBNC.Loading(false);
					}
					if (ComUtil.GetType(callback) === "function") {
						callback.call(this, statusobj, ajaxData);
					} else {
						if ( statusobj.success ) {
							callback.call(ajaxData.contents);
						} else {
							alert(statusobj.message);
						}
					}
				},
			data: json,
			async: true
		});
	},
	
	Ajax2Form:function(form, url, callback, loading) {
		if ( KBNC.isAjax2ObjLoading ) {
			return;
		}
		
		if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
			KBNC.Loading(true);
		}
		KBNC.isAjax2ObjLoading = true;
		
		var retstr = null;
		var retobj = $(form).serializeArray();

		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			timeout: KBNC.ajaxTimeout,
			error:
				function(request, status, error) {
					try {
						console.log(request);
						console.log(status);
						console.log(error);
					} catch(e){}
				
					KBNC.isAjax2ObjLoading = false;
					if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
						KBNC.Loading(false);
					}
					var statusobj;
					
					if ( request != null && request.status == 401 ) {
						alert("로그인 정보가 없습니다. 다시 로그인 해주세요");
						KBNC.goLogin();
					} else if ( status =='timeout' ) {
						alert("현재 통신량이 많아 처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
					} else {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 처리가 지연되고 있습니다." };
						if (ComUtil.GetType(callback) === "function") {
							callback.call(this,statusobj);
						} else {
							KBNC.alert(statusobj.message);
						}
					}
					return false;
				},
			success:
				function(ajaxData, status, error) {
					try {
						console.log(ajaxData);
						console.log(status);
						console.log(error);
					} catch(e){}
					
					var statusobj;
					if (ajaxData == null) {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 처리가 지연되고 있습니다." };
					} else {
						statusobj = { "code": 0, "success": true, "message": "정상 처리 되였습니다." };
					}
					
					KBNC.isAjax2ObjLoading = false;
					if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
						KBNC.Loading(false);
					}
					if (ComUtil.GetType(callback) === "function") {
						callback.call(this, statusobj, ajaxData);
					} else {
						if ( statusobj.success ) {
							callback.call(ajaxData.contents);
						} else {
							alert(statusobj.message);
						}
					}
				},
			data: retobj,
			async: true
		});
	},


	AjaxXmlObj:function(form, url, callback) {

		if (KBNC.isAjax2ObjLoading) {
			return;
		}
		KBNC.Loading(true);
		KBNC.isAjax2ObjLoading = true;
		var retstr = null;
		var retobj = null;

		retobj = form.serializeArray();
		$.ajax({
			url: url,
			type: "POST",
			dataType: "xml",
			timeout: KBNC.ajaxTimeout,
			error:
				function(request, status, error) {
					KBNC.isAjax2ObjLoading = false;
					KBNC.Loading(false);
					var statusobj;
					if ( request != null && request.status == 401 ) {
						alert("로그인 정보가 없습니다. 다시 로그인 해주세요");
						KBNC.goLogin();
					} else if ( status =='timeout' ) {
						alert("현재 통신량이 많아 처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
					} else {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 처리가 지연되고 있습니다." };
						if (ComUtil.GetType(callback) === "function") {
							callback.call(this,statusobj);
						} else {
							alert(statusobj.message);
						}
					}
					return false;
				},
			success:
				function(ajaxData) {
					var statusobj;
					if (ajaxData == null) {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 처리가 지연되고 있습니다." };
					} else {
						var rtcode = $(ajaxData).find("RTCODE").attr("value");
						var rtMsg = $(ajaxData).find("RTMSG").attr("value");

						if (rtcode == "0000") {
							statusobj = { "code": -1, "success": true, "message": "정상" };
						} else {
							statusobj = { "code": rtcode, "success": false, "message": rtMsg };
						}
						//statusobj = ajaxData.status;
					}

					KBNC.isAjax2ObjLoading = false;
					KBNC.Loading(false);
					if (ComUtil.GetType(callback) === "function") {
						callback.call(this,statusobj,ajaxData);
					} else {
						if ( statusobj.success ) {
							callback.html(ajaxData.contents);
						} else {
							alert(statusobj.message);
						}
					}
				},
			data: retobj,
			async: true
		});
	},


	Ajax2ObjType:function(form, url, ctype, callback) {
		if ( KBNC.isAjax2ObjLoading ) {
			return;
		}
		KBNC.Loading(true);
		KBNC.isAjax2ObjLoading = true;
		var retobj = form.serializeArray();

		$.ajax({
			url: url,
			type: "POST",
			dataType: ctype,
			timeout: KBNC.ajaxTimeout,
			error:
				function(request, status, error) {
					KBNC.isAjax2ObjLoading = false;
					KBNC.Loading(false);
					if ( request != null && request.status == 401 ) {
						alert("로그인 정보가 없습니다. 다시 로그인 해주세요");
						KBNC.goLogin();
					} else if ( status =='timeout' ) {
						alert("현재 통신량이 많아 업무처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
					} else {
						var statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 업무처리가 지연되고 있습니다." };
						if (ComUtil.GetType(callback) === "function") {
							callback.call(this,statusobj);
						} else {
							KBNC.alert(statusobj.message);
						}
					}
					return false;
				},
			success:
				function(ajaxData) {
					var statusobj;
					if (ajaxData == null) {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 업무처리가 지연되고 있습니다." };
					} else {
						statusobj = ajaxData.status;
					}


					KBNC.isAjax2ObjLoading = false;
					KBNC.Loading(false);
					if (ComUtil.GetType(callback) === "function") {
						callback.call(this,statusobj,ajaxData);
					} else {
						if ( statusobj.success ) {
							callback.html(ajaxData.contents);
						} else {
							KBNC.alert(statusobj.message);
						}
					}
				},
			data: retobj,
			async: true
		});
	},

	/**
	 * Map 형식 리턴 받는 경우에 쓰는  json
	 * @param jsonData : Json 형식 데이터 예: {'trxCode':trxCode,'DUMMY':'DUM'} 또는 $('#폼명').serialize()
	 * @param url : 요청 Url 예 : '/templete/msgTransAjax.do'
	 * @param callback 후 처리 함수 명 예 : function(statusobj, ajaxData) {)
	 * @param errCodeArray 에러 제외 코드 배열 예 ['0000','0100'] 등
	 */
	Ajax2MapType:function(jsonData, url, callback, errCodeArray, loading) {
		if ( KBNC.isAjax2ObjLoading ) {
			return;
		}
		if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
			KBNC.Loading(true);
		}
		KBNC.isAjax2ObjLoading = true;

		$.ajax({
			url: url,
			type: "POST",
			dataType: "JSON",
			data: jsonData,
			timeout: KBNC.ajaxTimeout,
			error:
				function(request, status, error) {
					KBNC.isAjax2ObjLoading = false;
					if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
						KBNC.Loading(false);
					}
					if ( request != null && request.status == 401 ) {
						alert("로그인 정보가 없습니다. 다시 로그인 해주세요");
						KBNC.goLogin();
					} else if ( status =='timeout' ) {
						KBNC.alert("현재 통신량이 많아 업무처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
					} else {
						var statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 업무처리가 지연되고 있습니다." };
						if (ComUtil.GetType(callback) === "function") {
							callback.call(statusobj,'ERROR');
						} else {
							KBNC.alert(statusobj.message);
						}
					}
					return false;
				},
			success:
				function(ajaxData) {
					var statusobj;
					if (ajaxData == null) {
						statusobj = { "code": -1, "success": false, "message": "현재 통신량이 많아 업무처리가 지연되고 있습니다." };
					} else {
						var rtcode = ajaxData.RTCODE;
						var rtmsg  = ajaxData.RTMSG;

						var sucFlag = false;
						for(var i = 0; i< errCodeArray.length; i++) {
							var tKey = errCodeArray[i];
							if(	tKey == rtcode) {
								sucFlag = true;
							}
						}

						if (sucFlag) {
							statusobj = { "code": -1, "success": true, "message": "정상" };
						} else {
							statusobj = { "code": rtcode, "success": false, "message": rtmsg };
						}
					}

					KBNC.isAjax2ObjLoading = false;
					if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
						KBNC.Loading(false);
					}
					if (ComUtil.GetType(callback) === "function") {
						callback.call(this,statusobj,ajaxData);
					} else {
						if ( statusobj.success ) {
							callback.html(ajaxData.contents);
						} else {
							KBNC.alert(statusobj.message);
						}
					}
				},
			async: true
		});
	},


	/*****************************************************
	 * 폼 서브밋
	 * KBNC.Submit($("#inqForm"), "/app/PointUseInq.do");
	 * KBNC.Submit($("#inqForm"), "/app/PointUseInq.do", "testTarget", "get");
	 * @param jqform   jquery form
	 * @param url      URL
	 * @param tar      target [optional]
	 * @param mtd      method [optional]
	 * @return
	 ****************************************************/
	Submit:function(jqform, url, mtd, tar) {
		var f = jqform[0];
		KBNC.Loading(true);
		f.action = url;
		f.method = ComUtil.Nvl2(mtd, "post");
		f.target = ComUtil.Nvl2(tar, "_self");
		//IE 이미지 로딩 속도 때문에 setTime적용.
		//변경 필요..
		window.setTimeout(function(){
			f.submit();
		}, 100);
	},


	/*****************************************************
	 * GET(URL)방식, window.open 을 이용한 링크.
	 * KBNC.Link("/app/PointUseInq.do", queryString);									// 현재 페이지에서 이동
	 * KBNC.Link("/app/PointUseInq.do", "aa=bb", "testTarget", "width=200");	// 팝업창으로 이동
	 * @param url      URL
	 * @param data     파라미터("&"연결) [optional]
	 * @param tar      target [optional]
	 * @param attr     윈도우 속성 [optional]
	 * @return
	 ****************************************************/
	Link:function(url, data, tar, attr) {
		tar = ComUtil.Nvl2(tar, "_self");
		attr = ComUtil.Nvl(attr, "");
		var uurl;

		if (!ComUtil.IsNullOrEmpty(data)) {
			if (url.indexOf("?") > -1) {
				uurl = url + '&' + data;
			} else {
				uurl = url + '?' + data;
			}
		} else {
			uurl = url;
		}
		window.open(uurl, tar, attr);
	},


	isNumber:function(num) {
		return (/^[0-9]+$/).test(num);
	},


	onlyNumber:function(obj) {
		$(obj).keyup(function(){
			$(this).val($(this).val().replace(/[^0-9]/g,""));
		});
	},


	Loading:function(isloading, msg, ntop, nleft) {
		
		if(isloading) {
			$.unblockUI();
			$.blockUI({ message: "" });
		} else {
			$.unblockUI();
		}
		
//		var obj1 = $("#BNK_loading");
//		var obj2 = $("#BNK_loading_dim");
//
//		var tip = "";
//		if(tipArr && tipArr.length > 0) {
//			var ran = Math.floor(Math.random()*tipArr.length);
//			tip = tipArr[ran];
//		}
//
//		if (obj1.length == 0) {
//			if (!isloading) {
//				return;
//			}
//			var loadinghtml='<div id="BNK_loading"><div class="pc_loading on" style="z-index:9999"><strong class="blind">로딩중입니다.</strong>';
//			loadinghtml += '<div class="upper">';
////			loadinghtml += '<div class="loadingAnimate"><img src="/common/web/images/loading_img02.gif" alt=""></div>';
//			loadinghtml += '<strong class="msg">Loading</strong>';
//			loadinghtml += '</div>';
//			loadinghtml += '<div class="lower">';
//			loadinghtml += '<em class="tip">편리한 <span class="txtRed">BNK캐피탈</span> 이용 <span class="txtRed">TIP</span></em>';
//			loadinghtml += '<p class="desc">' + tip + '</p>';
//			loadinghtml += '</div></div>';
//			obj1 = $(loadinghtml).appendTo("body");
//			obj2 = $('<div id="BNK_loading_dim" class="black_dim on loadingDim" style="z-index:9700"></div>').appendTo("body");
//		}
//		if (isloading) {
//			try {
//				obj1.show();
//			} catch(t){
//				KBNC.alert(t.message);
//			}
//		} else {
//			obj1.remove();
//			obj2.remove();
//		}
	},

	/**
	 * <pre>
	 * "validCheck_old" 함수를 정리함.
	 * </pre>
	 *
	 * @returns {Boolean}
	 * @author 부장 박성권(seton3@naver.com)
	 * @since 2018-12-20
	 */
	validCheck : function(flag) {
		var _chkTargetList	= $("[data-valid=true]");
		var _flagResult		= true;

		_chkTargetList.each(function(idx, node) {
			if(! _flagResult) return;

			var target = $(node);
			var prop = {
				type		: ((target.get(0).tagName == "INPUT") ? target.attr("type") : target.get(0).tagName).toLowerCase(),
				title		: target.attr("title"),
				name		: target.attr("name"),
				minmax		: target.data("minmax"),
				format		: target.data("format"),
				firstoption	: target.data("firstoption-valid"),
				value		: target.val(),
				checked		: (this.type == "checkbox" || this.type == "radio") ? target.prop("checked") : false
			};

			//------------------------------------------------------------------
			//	입력 여부 검사
			//------------------------------------------------------------------
			switch(prop.type) {
				case "select" :
					if(! prop.firstoption) {
						if(target.get(0).selectedIndex == 0) {
							KBNC.alert('[' + prop.title + '] 항목이 선택되지 않았습니다.', '', '', target);
							_flagResult = false;
						}
					}
					break;
				case "checkbox" :
					if(! prop.checked) {
						KBNC.alert('[' + prop.title + '] 항목이 선택되지 않았습니다.', '', '', target);
						_flagResult = false;
					}
					break;
				case "radio" :
					if(!$('input:radio[name='+prop.name+']').is(':checked')){
						KBNC.alert('[' + prop.title + '] 항목이 선택되지 않았습니다.', '', '', target);
						_flagResult = false;
					}
					break;
				default :
					if(! prop.value.replace(/ /g, "")) {
						KBNC.alert('[' + prop.title + '] 항목이 입력되지 않았습니다.', '', '', target);
						_flagResult = false;
					}
					break;
			}
			if(! _flagResult) return;
			//------------------------------------------------------------------
			//	입력 유형 검사
			//------------------------------------------------------------------
			if( flag == null || flag == 'undefined' || flag == ''){
				if(! ComUtil.validate_xss(node)) {
					_flagResult = false;
					return;
				}
			}

			switch(prop.format) {
				case "number" :
					if(prop.value.search(/[^0-9]/g) >= 0) {
						KBNC.alert('[' + prop.title + '] 숫자만 입력 가능합니다.', '', '', target);
						_flagResult = false;
					}
					break;
			}
			if(! _flagResult) return;
			//------------------------------------------------------------------
			//	입력 길이 검사
			//------------------------------------------------------------------
			if(prop.minmax) {
				var minmaxList	= (prop.minmax + "").split(",");
				var min			= parseInt(minmaxList[0]);
				var max			= (minmaxList.length > 1) ? parseInt(minmaxList[1]) : parseInt(minmaxList[0]);
				var lenByte		= ComUtil.ByteCal(prop.value);

				if((lenByte < min) || (max < lenByte)) {
					if(minmaxList.length > 1) {
						KBNC.alert('[' + prop.title + ']는 최소'+min+' 최대'+max+' 자리만 입력이 가능합니다.', '', '', target);
						_flagResult = false;
						return;
					}
					else {
						KBNC.alert('[' + prop.title + ']는 '+min+'자리만 입력이 가능합니다.', '', '', target);
						_flagResult = false;
						return;
					}
				}
			} // if(prop.minmax) {
		});

		return _flagResult;
	},

	/**
	입력값 검증 스크립트 함수.
	1. 검증대상
		attr에 data-valid=true라고 정의된 Object들
	2. 검증 항목
		1-1. 미입력 check
		1-2. attr에 data-format에 정의된 입력 양식 check
			필요가 생길때 마다 추가할 예정.
	3. 오류 메세지
		attr에 정의된 text를 display
	*/
	validCheck_old:function() {
		var objs = $("[data-valid=true]");
		var returnMsg = true;
		$(objs).each(function(idx, node) {

			//Xss체킹
			if (ComUtil.validate_xss(node) === false) {
				returnMsg = false;
				return false;
			}

			if ($(node).val() == '') {
				KBNC.alert('[' + ($(node).attr("title") != undefined ? $(node).attr("title") :  $(node).attr("aria-label")) + '] 항목이 입력되지 않았습니다.', '', '', $(node));
				returnMsg = false;
				return false;
			}
			if ($(node).get(0).tagName == "SELECT") {
				if(! $(node).data("firstoption-valid")) {
					if($(node).get(0).selectedIndex == 0) {
						KBNC.alert('[' + ($(node).attr("title") != undefined ? $(node).attr("title") :  $(node).attr("aria-label")) + '] 항목이 선택되지 않았습니다.', '', '', $(node));
						returnMsg = false;
						return false;
					}
				}
			}

			if ($(node).attr("type") == "radio") {
				if ($("input[name='"+$(node).attr("name")+"']:checked").val() == undefined) {
					KBNC.alert('[' + ($(node).attr("title") != undefined ? $(node).attr("title") :  $(node).attr("aria-label")) + '] 항목이 선택되지 않았습니다.', '', '', $(node));
					returnMsg = false;
					return false;
				}
			}

			if ($(node).attr("type") == "checkbox") {
				if ($("input[name='"+$(node).attr("name")+"']:checked").length == 0) {
					KBNC.alert('[' + ($(node).attr("title") != undefined ? $(node).attr("title") :  $(node).attr("aria-label")) + '] 항목이 선택되지 않았습니다.', '', '', $(node));
					returnMsg = false;
					return false;
				}
			}

			if ($(node).attr("data-format") == "number") {
				if ((/[0-9]/g).test($(node).val().replace(/[-0-9]/g,"")) == false && $(node).val().replace(/[-0-9]/g,"") != "") {
					KBNC.alert('[' + ($(node).attr("title") != undefined ? $(node).attr("title") :  $(node).attr("aria-label")) + '] 숫자만 입력 가능합니다.', '', '', $(node));
					returnMsg = false;
					return false;
				}
			}

			if ($(node).attr("data-minmax")) {

				var minMax = $(node).attr("data-minmax");
				var aMinMax = minMax.split(",");

				if (aMinMax.length > 1 && (parseInt($(node).val().length) < parseInt(aMinMax[0]) ||  parseInt($(node).val().length) > parseInt(aMinMax[1]))) {
					KBNC.alert('[' + ($(node).attr("title") != undefined ? $(node).attr("title") :  $(node).attr("aria-label")) + ']는 최소'+aMinMax[0]+' 최대'+aMinMax[1]+' 자리만 입력이 가능합니다.', '', '', $(node));
					returnMsg = false;
					return false;
				}
				if (aMinMax.length == 1 && parseInt($(node).val().length) != parseInt(aMinMax[0])) {
					KBNC.alert('[' + ($(node).attr("title") != undefined ? $(node).attr("title") :  $(node).attr("aria-label")) + ']는 '+aMinMax[0]+'자리만 입력이 가능합니다.', '', '', $(node));
					returnMsg = false;
					return false;
				}
			}
		});

		var objNum = $("[data-format=number]");
		$(objNum).each(function(idx, node) {
			if ($(node).attr("data-valid") != "true" && $(node).val() != "" && (/[0-9]/g).test($(node).val().replace(/[-0-9]/g,"")) == false && $(node).val().replace(/[-0-9]/g,"") != "") {
				KBNC.alert('[' + ($(node).attr("title") != undefined ? $(node).attr("title") :  $(node).attr("aria-label")) + '] 숫자만 입력 가능합니다.', '', '', $(node));
				returnMsg = false;
				return false;
			}
		});
		return returnMsg;
	},

	/**
	 * 공통 alert
	 */
	alert:function(msg, title, callback, obj) {

		//black_dim이 제거 되지 않을 경우가 있어서 강제로 삭제
		$(".dev_msg_black").remove();

		var aMsg = [];

		aMsg.push('<div class="popup message m_popup" style="z-index:9600" tabindex="0"> ');
		aMsg.push('<div class="m_popup_inner">');
		if (title != "" && title != undefined) {
			aMsg.push('<div class="header"><p>' + title + '</p></div>');
		} else {
			aMsg.push('<div class="header"><p>BNK 캐피탈</p></div>');
		}

		aMsg.push('<div class="m_popup_area">');
        aMsg.push('<p class="m_popup_con">' + msg + '</p>');
        aMsg.push('<div class="btn_area mat30"><button class="btn popup red start end" type="button" id="btn_close_"><span class="button">확인</span></button></div>');
        aMsg.push('</div>');
        aMsg.push('<div class="m_popup_close"><button type="button" class="m_close end" title="레이어팝업">닫기</button></div>');
        aMsg.push('</div>');
        aMsg.push('</div>');
		aMsg.push('<div id="black" class="black_dim dev_msg_black" style="z-index:9599"></div>');
        aMsg.push('</div>');

        var sMsg = aMsg.join("");
		$("body").append(sMsg);
		$(".m_popup").toggleClass("on");
		$("#black").toggleClass("on");
		$(".m_popup").css("margin-top" , -$(".m_popup").height() / 2);

		// 팝업창 이전 focus 저장
		$(".popup.message.m_popup").data("oldFocusObj", $(document.activeElement));

		window.setTimeout(function(){
			$(".popup.message.m_popup").focus();
		}, 10);

		// X focus 이동
		$('.popup.message.m_popup').find('.m_close.end').on("keydown", function (e) {
			var isShift = window.event.shiftKey ? true : false;
			if(isShift && (event.keyCode == 9)){
	            return;
	        }else if(event.keyCode == 9){
				event.preventDefault();
				$('.popup.message.m_popup').attr('tabindex', '0').focus();
			}
		});


		// 팝업 닫기 버튼
		var m_popup_close = $(".m_popup_close");
		m_popup_close.on("click",function(e, oldObj) {
			// 팝업창 이전 object에 focus 처리
			if (typeof(obj) == "object" && obj != null && obj != undefined  && obj != "undefined" ){
				obj.focus();
				window.setTimeout(function(){
					obj.focus();
				}, 150);

			}else{
				if($(".popup.message.m_popup").data("oldFocusObj") != undefined && $(".popup.message.m_popup").data("oldFocusObj") != "undefined") {
					$(".popup.message.m_popup").data("oldFocusObj").focus();
				}
			}

			$(".m_popup").remove();
			$("#black").remove();

			if (callback != "" && callback != undefined) {
				var res_ = (new Function("return " + callback))();
		        res_();
			}
		});

		// 확인 버튼
		$("#btn_close_").click(function (e) {
			$(".m_popup_close").click();

			if (obj != null)
				obj.focus();

			if (callback != "" && callback != undefined) {
				var res_ = (new Function("return " + callback))();
		        res_();
			}
		});

	},

	/**
	 * 공통 error alert
	 * code     : 오류코드
	 * msg      : 오류명
	 * callback : 콜백 함수
	 */
	errorAlert:function(code, msg, callback) {
		//black_dim이 제거 되지 않을 경우가 있어서 강제로 삭제
		$(".dev_msg_black").remove();

		var aMsg = [];
		aMsg.push('<div class="layer_popup_section l_popup error" style="z-index:9600" tabindex="0">');
		aMsg.push('<div class="layer_popup_wrap">');
		aMsg.push('<div class="layer_popup_tit"><div class="tit22"><strong>BNK캐피탈</strong></div></div>');
		aMsg.push('<div class="popup_con_wrap">');
		aMsg.push('<div class="comment error">');
		aMsg.push('<p><strong>처리 중 오류가 발생하였습니다.</strong></p>');
		aMsg.push('<p>고객님께서 입력하신 사항이 잘못되었습니다.<br>확인 후 다시 거래하여 주시기 바랍니다.</p>');
		aMsg.push('</div>');
		aMsg.push('<div class="gray">');
		aMsg.push('<p>오류코드 : ' + code + '<br>오류내용 : ' + msg + '</p>');
		aMsg.push('</div>');
		aMsg.push('<p class="t">기타 궁금하신 사항은 고객센터(' + call_number + ')으로 문의 주시기 바랍니다.</p>');
		aMsg.push('<div class="mat30 btn_area"><button class="btn popup line start l_close end" id="btn_close_" type="button" title="팝업닫기"><span class="button">확인</span></button></div>');
		aMsg.push('</div>');
		aMsg.push('<div class="popup_close_area"><button type="button" class="l_close end">닫기</button></div>');
		aMsg.push('</div>');
		aMsg.push('</div>');
		aMsg.push('<div id="black" class="black_dim dev_msg_black" style="z-index:9599"></div>');

		var sMsg = aMsg.join("");
		$("body").append(sMsg);
		$(".error").toggleClass("on");
		$("#black").toggleClass("on");

		// 팝업창 이전 focus 저장
		$(".layer_popup_section.l_popup.error").data("oldFocusObj", $(document.activeElement));

		window.setTimeout(function(){
			//$("#btn_close_").focus();
			$(".l_popup").focus();
		}, 10);

		// 팝업 닫기 버튼
		var popup_close_area = $(".layer_popup_section.l_popup.error").find(".popup_close_area");
		popup_close_area.on("click", function(e, oldObj) {
			// 팝업창 이전 object에 focus 처리
			if($(".layer_popup_section.l_popup.error").data("oldFocusObj") != undefined && $(".layer_popup_section.l_popup.error").data("oldFocusObj") != "undefined") {
				$(".layer_popup_section.l_popup.error").data("oldFocusObj").focus();
			}

			$(".error").remove();
			$("#black").remove();

			if (callback != "" && callback != undefined) {
				var res_ = (new Function("return " + callback))();
		        res_();
			}

		});

		// 확인 버튼
		$("#btn_close_").on("keydown", function (e) {
			var isShift = window.event.shiftKey ? true : false;
			if(event.keyCode == 13 || event.keyCode == 32){
				event.preventDefault();
				$(".popup_close_area").click();

				if (callback != "" && callback != undefined) {
					var res_ = (new Function("return " + callback))();
			        res_();
				}
			}
		});

		// X focus 이동
		$('.layer_popup_section.l_popup.error').find(".l_close.end").on("keydown", function (e) {
			var isShift = window.event.shiftKey ? true : false;
			if(isShift && (event.keyCode == 9)){
	            return;
	        }else if(event.keyCode == 9){
				event.preventDefault();
				$('.layer_popup_section.l_popup.error').attr('tabindex', '0').focus();
			}
		});

		// 확인 버튼
		$("#btn_close_").click(function (e) {
			$(".popup_close_area").click();

			if (callback != "" && callback != undefined) {
				var res_ = (new Function("return " + callback))();
		        res_();
			}
		});

		//KBNC.alert("현재 통신량이 많아 업무처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.<br />지속적으로 이 메시지가 발생하면 고객센터(1588-4000)로 문의 바랍니다.");
	},

	/**
	 * 공통 confirm
	 */
	confirm:function(msg, callback) {

		//black_dim이 제거 되지 않을 경우가 있어서 강제로 삭제
		$(".dev_msg_black").remove();

		var aMsg = [];

		aMsg.push('<div class="popup message m_popup" style="z-index:9600" tabindex="0">');
		aMsg.push('<div class="m_popup_inner">');
		aMsg.push('<div class="header"><p>BNK 캐피탈</p></div>');
		aMsg.push('<div class="m_popup_area">');
        aMsg.push('<p class="m_popup_con">' + msg + '</p>');
        aMsg.push('<div class="btn_area mat30"><button class="btn popup red start" type="button" id="btn_close_"><span class="button">확인</span></button><button class="btn popup navy start" type="button" id="btn_cancel_"><span class="button">취소</span></button></div>');
        aMsg.push('</div>');
        aMsg.push('<div class="m_popup_close"><button type="button" class="m_close end">닫기</button></div>');
        aMsg.push('</div>');
        aMsg.push('</div>');
        aMsg.push('<div id="black" class="black_dim dev_msg_black" style="z-index:9599"></div>');

        var sMsg = aMsg.join("");
		$("body").append(sMsg);
		$(".m_popup").toggleClass("on");
		$("#black").toggleClass("on");
		$(".m_popup").css("margin-top" , -$(".m_popup").height() / 2);

		// 팝업창 이전 focus 저장
		$(".popup.message.m_popup").data("oldFocusObj", $(document.activeElement));

		window.setTimeout(function(){
			$(".popup.message.m_popup").focus();
		}, 10);

		// X focus 이동
		$('.popup.message.m_popup').find(".m_close.end").on("keydown", function (e) {
			var isShift = window.event.shiftKey ? true : false;
			if(isShift && (event.keyCode == 9)){
	            return;
	        }else if(event.keyCode == 9){
				event.preventDefault();
				$('.popup.message.m_popup').attr('tabindex', '0').focus();
			}
		});

		// 팝업 닫기 버튼
		var m_popup_close = $(".m_popup_close");
		m_popup_close.on("click", function(e, oldObj) {
			// 팝업창 이전 object에 focus 처리
			if($(".popup.message.m_popup").data("oldFocusObj") != undefined && $(".popup.message.m_popup").data("oldFocusObj") != "undefined") {
				$(".popup.message.m_popup").data("oldFocusObj").focus();
			}
			$(".m_popup").remove();
			$("#black").remove();

		});

		// 취소 버튼
		$("#btn_cancel_").click(function (e) {
			$(".m_popup_close").click();
		});

		// 확인 버튼
		$("#btn_close_").click(function (e) {
			$(".m_popup_close").click();

			if (callback != "" && callback != undefined) {
				var res_ = (new Function("return " + callback))();
		        res_();
			}
		});
	},

	updateIFrame:function(height) {
	    var iframe = document.getElementById("cp_frame");
	    iframe.setAttribute("height", height);
	},

	/**
	 * 공통 DIV형태 POPUP 처리
	 * @param frm      form명
	 * @param url      URL
	 * @param id       target ID
	 */
	commonPopUp:function(frm, url, id, thisId) {

		 $("#comPop_").html('');

		if (typeof(frm) != "string") {
			frm = "" + frm + "";
		}

		$ ("#ifr_").contents().find("body").html ('');

		$("#" + frm).attr("target", "ifr_");
		$("#" + frm).attr("method", "post");
		$("#" + frm).attr("action", url);

		$("#" + frm).submit(function(event) {
			$("#ifr_").on("load", function() {

				   var addScript_ = " $(function() { "
					              + "     $(\".firstClose\").on(\"click\", function() { $('.layer_bg').removeClass('on'); $('.black_dim').removeClass('on');}); "
					              + "     $(\".layerClose\").on(\"click\", function() { $('.layer_bg').removeClass('on'); $('.black_dim').removeClass('on');}); "
					              + " }); "
				                  + " var end = $('.end'); "
				    	          + " var start = $('.start'); "
				  	              + " var first = $('.first'); "
					              + " end.on('keydown' , function() {  "
					              + "                                event.preventDefault?event.preventDefault():event.returnValue = false; "
					              + "                                var key = event.keyCode || event.which; "
					              + "                                if (event.keyCode == 9) { "
					              + "                                    var pop = $(this).parent().parent(), first = pop.find('.first'); "
					              + "                                    if (first.length > 0) { "
					              + "                                        first.focus(); "
					              + "                                    } else { "
					              + "                                        $(this).parent().parent().find('.start').focus(); "
					              + "                                    }}}); ";

				   var script_ = $(this).contents().find("head").html();

				   var script_ = script_.split("<SCRIPT TYPE=\"TEXT/JAVASCRIPT\"").join("<script type=\"text/javascript\">").split("<SCRIPT TYPE='TEXT/JAVASCRIPT'").join("<script type='text/javascript'>").split("<SCRIPT>").join("<script>").split("</SCRIPT>").join("</script>");

				   if (script_.indexOf("<script type=\"text/javascript\">") > -1) {
				       script_ = script_.replace("<script type=\"text/javascript\">", "<script type=\"text/javascript\"> " + addScript_);
				   } else if (script_.indexOf("<script type='text/javascript'>") > -1) {
					   script_ = script_.replace("<script type='text/javascript'>", "<script type='text/javascript'> " + addScript_);
				   } else if (script_.indexOf("<script>") > -1) {
					   script_ = script_.replace("<script>", "<script> " + addScript_);
				   }
				   var body_ = script_ + " " + $(this).contents().find("body").html();

				   $("#comPop_").html('');
				   if (id != null && id != "") {

					   if ($("#"+ id).length > 0) {
						   $("#"+ id).append(body_);

					   } else {
					       $("." + classNm).append(body_);
					   }
				   } else {
					   $("#comPop_").append(body_);
	            }

	            open_pop_id(thisId, '#comPop_' ,'.l_close', 9000,"","");
	            $(".layer_bg").addClass("on");

	            //dim 처리
	            $(".black_dim").addClass("on");
	            $(".black_dim").not("#dimLogout").addClass("on");
				});
		}).submit();

	},

	commonAjaxLayerPopUp:function(frm, url, id, thisId) {

		if (KBNC.isAjax2ObjLoading) {
			return;
		}

		KBNC.Loading(true);
		KBNC.isAjax2ObjLoading = true;

		var retobj = $("#" + frm).serializeArray();

		    $.ajax({
		       type : "post",
		       url : url,
		       dataType : "html",
		       data: retobj,
			   async: true,
			   success : function(data){
				   KBNC.Loading(false);
				   KBNC.isAjax2ObjLoading = false;

					// 팝업전 활성화 객체 focus 처리 popup 창에서 화면 이동시
					if($("body").data("popFocusObj") != null && $("body").data("popFocusObj") != undefined && $("body").data("popFocusObj") != "") {
						var arrFocusObj = $("body").data("popFocusObj");
						if(arrFocusObj.length > 0) {
							var focusObj = arrFocusObj.pop();
							$(focusObj).focus();
						}
						if(arrFocusObj.length <= 0) {
							$("body").removeData("popFocusObj");
						}
					}

					$("#comPop_").html('');
		    	  	var body_ = data;
				   if (id != null && id != "") {
					   if ($("#"+ id).length > 0) {
						   $("#"+ id).append(body_);
					   } else {
					       $("." + classNm).append(body_);
					   }
				   } else {
					   $("#comPop_").append(body_);
				   }

				   open_pop_id(thisId, '#comPop_' ,'.l_close', 9000,"","");
				   $(".layer_bg").addClass("on");
				   $(".black_dim").removeClass("on");
				   //dim 처리
				   $(".black_dim").not("#dimLogout").addClass("on");
		      },
		      error : function(data) {
		    	  KBNC.isAjax2ObjLoading = false;
		    	  KBNC.Loading(false);
		    	  KBNC.alert("현재 통신량이 많아 업무처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
		      }
		  });
	},

	/**
	 * 공통 DIV형태 POPUP 처리
	 * @param frm      form명
	 * @param url      URL
	 * @param id       target ID
	 */
	commonLayerPopUp:function(frm, url, id) {

		if (typeof(frm) != "string") {
			frm = "" + frm + "";
		}

		$("#" + frm).attr("target", "ifr_");
		$("#" + frm).attr("method", "post");
		$("#" + frm).attr("action", url);

		$("#" + frm).submit(function(event) {

			$("#ifr_").on("load", function() {

			   var addScript_ = " $(function() { "
				              + "     $(\"#comPop_\").find(\".l_close\").on(\"click\", function() { $('#comPop_').children().removeClass('on'); $('.black_dim').removeClass('on');}); "
				              + " }); ";

			   var script_ = $(this).contents().find("head").html();

			   var script_ = script_.split("<SCRIPT TYPE=\"TEXT/JAVASCRIPT\"").join("<script type=\"text/javascript\">").split("<SCRIPT TYPE='TEXT/JAVASCRIPT'").join("<script type='text/javascript'>").split("<SCRIPT>").join("<script>").split("</SCRIPT>").join("</script>");

			   if (script_.indexOf("<script type=\"text/javascript\">") > -1) {
			       script_ = script_.replace("<script type=\"text/javascript\">", "<script type=\"text/javascript\"> " + addScript_);
			   } else if (script_.indexOf("<script type='text/javascript'>") > -1) {
				   script_ = script_.replace("<script type='text/javascript'>", "<script type='text/javascript'> " + addScript_);
			   } else if (script_.indexOf("<script>") > -1) {
				   script_ = script_.replace("<script>", "<script> " + addScript_);
			   }

			   var body_ = script_ + " " + $(this).contents().find("body").html();

               if (id != null && id != "") {

				   if ($("#"+ id).length > 0) {
			           $("#"+ id).html(body_);
				   } else {
				       $("." + classNm).html(body_);
				   }
			   } else {
				   $("#comPop_").html(body_);
               }

			   //dim 처리
               $("#comPop_").children().addClass("on");
			   $(".black_dim").addClass("on");
			});
		}).submit();
	},


	/*****************************************************
	 * submit용 임시 form 생성 name "tempHiddenfrm"
	 * 호출시마다 초기화
	 * var frm = fnCreateForm()
	 * @param form id
	 * @return form oject
	 ****************************************************/
	createForm: function(id){
		$("#"+id).remove();
		$("body").append("<form id='"+id+"' name='"+id+"' method='post' style='display:none;'></form>");
		return $("#"+id);
	},

	/*****************************************************
	 * param 으로 받은 폼객체에input 을 추가한다.
	 * 중복된name input은 삭제처리
	 *	var frm = fnCreateForm();
	 *	fnCreateHiddenVal(frm, "TXCODE", "0800");
	 *
	 * @param 폼객체
	 * @param 키값
	 * @param value
	 * @return
	 ****************************************************/
	createHiddenVal: function(frm, key, val){
		if(val == undefined) val = "";
		$(frm).find("input[name='"+key+"']").remove();
		$(frm).append("<input type='hidden' id='"+key+"'  name='"+key+"' value='"+val+"'>");
	},

	/*****************************************************
	 * 폼에 배열처리용 input 을 추가한다.
	 *	var frm = fnCreateForm();
	 *	fnAddHiddenVal(frm, "ARRAY_JOIN_DIV", "1");
	 *  fnAddHiddenVal(frm, "ARRAY_JOIN_DIV", "2");
	 *
	 * @param 폼객체
	 * @param 키값
	 * @param value
	 * @return
	 ****************************************************/
	addHiddenVal: function(frm, key, val){
		if(val == undefined) val = "";
		$(frm).append("<input type='hidden' name='"+key+"' value='"+val+"'>");
	},

	 /**
	  * 레이어팝업 핸들러
	  *     - ui_common.js 파일의 open_pop() 래퍼함수
	  *     - 팝업창 버튼 선택에 따른 callback 호출 처리
	  *     - 팝업창 버튼 유형은 필요에 따라 추가
	  *
	  * @author 부장 박성권(seton3@naver.com)
	  * @since 2018-11-01
	  */
	 popup : {
		 _handler : {},
		 open : function(popupID, callback) {
			 this._handler[popupID] = { callback : callback };

			 open_pop(null, popupID, null);

			 // 팝업창 확인 버튼
			 //		- callback함수 전달인자 : 팝업창 jQuery객체
			 //		- callback 전달인자를 사용한 팝업창 내의 값 확인 및 처리 가능
			 $(popupID).find("button[data-act-type=confirm]").bind("click", function() {
				 $(popupID).removeClass("on");
				 setTimeout(dim, 10);
				 dim_idx = 1;
				 if(KBNC.popup._handler[popupID].callback) KBNC.popup._handler[popupID].callback($(popupID));
			 });
			 // 팝업창 취소 버튼
			 //		- callback함수 전달인자 없음.
			 $(popupID).find("button[data-act-type=cancel]").bind("click", function() {
				 $(popupID).removeClass("on");
				 setTimeout(dim, 10);
				 dim_idx = 1;
				 if(KBNC.popup._handler[popupID].callback) KBNC.popup._handler[popupID].callback();
			 });
		 }
	 },

	getTermCalendar: function(from, to) {
		if ( from == null ) KBNC.alert("시작일 객체가 존재하지 않습니다.");
		if ( to == null ) KBNC.alert("종료일 객체가 존재하지 않습니다.");
		from = typeof from == "string" ? $("#" + from) : from;
		to = typeof to == "string" ? $("#" + to) : to;

		var $from = from.pickadate({
			format: 'yyyy-mm-dd',
			container: '.date_first',
			closeOnSelect: false,
			closeOnClear: false,
			max: true
		});

		var $to = to.pickadate({
			format: 'yyyy-mm-dd',
			container: '.date_last',
			closeOnSelect: false,
			closeOnClear: false,
			max: true
		});

		var fromPicker = $from.pickadate('picker');
	    var toPicker = $to.pickadate('picker');

	 	// Check if there’s a “from” or “to” date to start with.
	    if ( fromPicker.get('value') ) {
	      toPicker.set('min', fromPicker.get('select'));
	    }
	    if ( toPicker.get('value') ) {
	      fromPicker.set('max', toPicker.get('select'));
	    }

	    // When something is selected, update the “from” and “to” limits.
	    fromPicker.on('set', function(event) {
	      if ( event.select ) {
	        toPicker.set('min', fromPicker.get('select'));
	      }
	      else if ( 'clear' in event ) {
	        toPicker.set('min', false);
	      }
	    });

	    toPicker.on('set', function(event) {
	      if ( event.select ) {
	        fromPicker.set('max', toPicker.get('select'));
	      }
	      else if ( 'clear' in event ) {
	        fromPicker.set('max', false);
	      }
	    });
	},

	getCalendar: function(from) {
		if ( from == null ) KBNC.alert("날짜 객체가 존재하지 않습니다.");
		from = typeof from == "string" ? $("#" + from) : from;

		var $from = from.pickadate({
			format: 'yyyy-mm-dd',
			container: '.date_first',
			closeOnSelect: false,
			closeOnClear: false,
			max: true
		});
	},

	addHiddenJson: function(frm, json){
		if($.type(json) == 'string'){
			json = JSON.parse(json);
		}
		if($.type(json) == 'object'){
			$.each(json, function(_key, _val){
				var _input = $(frm).find("input[name='"+_key+"']");
				if(_input.length > 0){
					_input.val(_val || "");
				}else{
					$(frm).append("<input type='hidden' name='"+_key+"' value='"+_val+"'>");
				}
			});
		}
	},
	/**
	 * vary
	 * submit용 임시 form 생성
	 * 호출시마다 초기화
	 * @param form id
	 * @param json object or json string
	 * @return form object
	 */
	createFormAddJson: function(id, json){
		$("#"+id).remove();
		$("body").append("<form id='"+id+"' name='"+id+"' method='post' style='display:none;'></form>");
		var _form = $("#"+id);
		KBNC.addHiddenJson(_form, json);
		return _form;
	},
	/**
	 * vary
	 * html 형식 리턴 받는 경우
	 * @param jsonData : Json 형식 데이터 예: {'trxCode':trxCode,'DUMMY':'DUM'} 또는 $('#폼명').serialize()
	 * @param url : 요청 Url 예 : '/templete/msgTransAjax.do'
	 * @param callback 후 처리 함수 명 예 : function(ajaxData){}
	 * @param async : 동기화 여부
	 */
	Ajax2Html:function(jsonData, url, callback, async, dataType, loading) {

		if (KBNC.isAjax2ObjLoading) return;
		KBNC.isAjax2ObjLoading = true;
		
		if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
			KBNC.Loading(true);
		}
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: dataType || "html",
			data: jsonData,
			timeout: KBNC.ajaxTimeout,
			async: async || true,
			error:
				function(request, status, error) {
					KBNC.isAjax2ObjLoading = false;
					KBNC.Loading(false);
					if ( request != null && request.status == 401 ) {
						alert("로그인 정보가 없습니다. 다시 로그인 해주세요");
						KBNC.goLogin();
					} else if ( status =='timeout' ) {
						KBNC.alert("현재 통신량이 많아 처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
					} else {
						KBNC.alert(request);
					}
					return false;
				},
			success:
				function(ajaxData, status) {
					if (ajaxData == null) {
						ajaxData = "현재 통신량이 많아 처리가 지연되고 있습니다.";
					}
					KBNC.isAjax2ObjLoading = false;
					KBNC.Loading(false);
					if ($.type(callback) == "function") {
						callback.call(this, ajaxData);
					} else {
						if(status == "success"){
							callback.html(ajaxData);
						} else {
							KBNC.alert(ajaxData);
						}
					}
				}
		});
	},
	/**
	 * vary
	 * html 형식 리턴 받는 경우
	 * @param jsonData : Json 형식 데이터 예: {'trxCode':trxCode,'DUMMY':'DUM'} 또는 $('#폼명').serialize()
	 * @param url : 요청 Url 예 : '/templete/msgTransAjax.do'
	 * @param callback 후 처리 함수 명 예 : function(ajaxData){}
	 * @param async : 동기화 여부
	 */
	Ajax2FormHtml:function(form, url, callback, async, dataType, loading) {
		
		if (KBNC.isAjax2ObjLoading) return;
		KBNC.isAjax2ObjLoading = true;
		if (loading || loading == "undefined" || loading == "" || loading == null || loading == undefined) {
			KBNC.Loading(true);
		}
		
		var formData = $(form).serializeArray();
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: dataType || "html",
			data: formData,
			timeout: KBNC.ajaxTimeout,
			async: async || true,
			error:
				function(request, status, error) {
				KBNC.isAjax2ObjLoading = false;
				KBNC.Loading(false);
				if ( status =='timeout' ) {
					KBNC.alert("현재 통신량이 많아 처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
				} else {
					KBNC.alert(request);
				}
				return false;
			},
			success:
				function(ajaxData, status) {
				if (ajaxData == null) {
					ajaxData = "현재 통신량이 많아 처리가 지연되고 있습니다.";
				}
				KBNC.isAjax2ObjLoading = false;
				KBNC.Loading(false);
				if ($.type(callback) == "function") {
					callback.call(this, ajaxData);
				} else {
					if(status == "success"){
						callback.html(ajaxData);
					} else {
						KBNC.alert(ajaxData);
					}
				}
			}
		});
	},

	leftPad: function(str, len)
	{
	   	str = str + "";
	    while(str.length < len)
	   	{
	     	str = "0"+str;
	   	}
	    return str;
	},

	/**
	 * Ajax 통신
	 * @param url : 요청 Url 예 : '/templete/msgTransAjax.do'
	 * @param params : Json 형식 데이터 예: {'trxCode':trxCode,'DUMMY':'DUM'} 또는 $('#폼명').serialize()
	 * @param onSuccessHandler 후 처리 함수 명 예 : function(ajaxData){}
	 * @param async : 동기화 여부
	 * @param tm : 타임아웃
	 */
	AjaxRequest: function(url, params, onSuccessHandler, dataType, async, tm) {

		if (KBNC.isAjax2ObjLoading) return;
		KBNC.Loading(true);
		KBNC.isAjax2ObjLoading = true;
		var dtype = "json";
		if ( dataType != "undefined") dtype = dataType;
		var bool = true;
		if ( async != "undefined" ) bool = async;
		var pTime = KBNC.ajaxTimeout;
		if ( tm != "undefined") pTime = tm;
		$.ajax({
			url: url,
			type: "POST",
			dataType: dtype,
			data: KBNC.makeParameters(params),
			timeout: pTime,
			async: bool,
			success: function(res) { KBNC.onSuccess(res, onSuccessHandler); },
			complete:function() { KBNC.isAjax2ObjLoading = false; KBNC.Loading(false); },
			error: function(request, status, error) { KBNC.onError(request, status, error); }
		});
	},

	/**
	 * 파라미터 처리
	 */
	makeParameters: function (otherParams)
	{
	    otherParams = otherParams || {};
	    // parameters 가 string 일 경우 object type 으로 변경
	    if ( typeof otherParams == 'string' ) otherParams = KBNC.getQueryVariable(otherParams);
	    // 강제 parameters
	    var forceParams = {
	    };
	    var parameters = $.extend(forceParams, otherParams);
	    return parameters;
	},

	/**
	 * ajax 결과 성공한 경우 수행함수
	 */
	onSuccess: function (res, onSuccessHandler)
	{
	    setTimeout(function()
	    {
	    	if ( res == null ) return;
	    	// 원 메소드 호출
	    	if (ComUtil.GetType(onSuccessHandler) === "function") {
	    		onSuccessHandler.call(this, res);
	    	} else {
				if(res.success) {
					onSuccessHandler.html(res);
				} else {
					KBNC.alert(res.message);
				}
			}
	    }, 1);
	},

	/**
	 * http 응답 오류 발생한 경우 수행함수
	 */
	onError: function (request, status, error) {
		if ( status =='timeout' ) {
			KBNC.alert("현재 통신량이 많아 처리가 지연되고 있습니다.<br />잠시 후 다시 사용하여 주십시오.");
		} else {
			KBNC.alert(request);
		}
	},

	/**
	 * 쿼리스트링을 Map형태로
	 * @param variable
	 * @returns {}
	 */
	getQueryVariable: function(variable) {
		var obj = {};
		$.each(variable, function() {
			if( obj[this.name]) {
				if( !obj[this].push ) {
					obj[this.name] = [obj[this.name]];
				}
				obj[this.name].push(this.value||'');
			} else {
				obj[this.name] = this.value||'';
			}
		});

		return obj;
	},

	/**
	 * 콤보 세팅
	 * @param comboObj
	 * @param option 옵션 - 파라미터 및 url 정보 { url: "", params: {}, type: "S"}
	 * @param callback 콜백함수
	 * @param dataType
	 * @return
	 */
	setCombo: function(comboObj, option, callback, dataType) {
		if ( comboObj == null ) alert("Error: setCombo comboObj("+comboObj+") is null");
		comboObj = typeof comboObj == "string" ? $("#"+comboObj) : comboObj;
		// 통신
		$.ajax({
	        type: "POST",
	        url: option.url,
	        cache: false,
	        data: option.params,
	        dataType: dataType || "json",
	        async: true,
	        success: function(msg) {
	        	comboObj.empty();
	        	switch ( option.type )
        	    {
        	      	case "A": {
        	      		comboObj.append($("<option value=''>전체</option>"));
        	      	}
        	      	break;
        	      	case "S": {
        	      		comboObj.append($("<option value=''>선택</option>"));
        	      	}
        	      	break;
        	      	case "N": {
        	      		comboObj.append($("<option value=''></option>"));
        	      	}
        	      	break;
        	      	case "U": {
        	      		comboObj.append($("<option value='0'>일반(기본)</option>"));
        	      	}
        	      	break;
        	    }
	        	if ( msg.data ) {
	        		$.each(msg.data, function(idx, elem) {
	        			if ( elem.ETC ) {
	        				comboObj.append($("<option value='" + elem.comCode + "' ETC='" + elem.ETC + "'>" + elem.comCodeNm + "</option>"));
						} else {
							comboObj.append($("<option value='" + elem.comCode + "'>" + elem.comCodeNm + "</option>"));
						}
	        		});
	        	}
	        	if (ComUtil.GetType(callback) === "function") {
					callback.call(this, msg);
				}
	        },
	        error:function(){
	            return false;
	        }
	    });
	},

	/**
	 * 콤보 세팅
	 * @param comboObj
	 * @param option 옵션 - 파라미터 및 url 정보 { url: "", params: {}, type: "S"}
	 * @param callback 콜백함수
	 * @param dataType
	 * @return
	 */
	setMultiCombo: function(comboObj, option, callback, dataType) {
		if ( comboObj.length == 0 ) alert("Error: setMultiCombo comboObj("+comboObj+") is null");
		// 통신
		$.ajax({
	        type: "POST",
	        url: option.url,
	        cache: false,
	        data: option.params,
	        dataType: dataType || "json",
	        async: true,
	        success: function(msg) {
	        	for(var i = 0; i < comboObj.length; i++) {
	        		comboObj[i].empty();
		        	switch ( option.type )
	        	    {
	        	      	case "A": {
	        	      		comboObj[i].append($("<option value=''>전체</option>"));
	        	      	}
	        	      	break;
	        	      	case "S": {
	        	      		comboObj[i].append($("<option value=''>선택</option>"));
	        	      	}
	        	      	break;
	        	      	case "N": {
	        	      		comboObj[i].append($("<option value=''></option>"));
	        	      	}
	        	      	break;
	        	      	case "U": {
	        	      		comboObj[i].append($("<option value='0'>일반(기본)</option>"));
	        	      	}
	        	      	break;
	        	    }
		        	if ( msg.data ) {
		        		$.each(msg.data, function(idx, elem) {
		        			if ( elem.ETC ) {
		        				comboObj[i].append($("<option value='" + elem.comCode + "' ETC='" + elem.ETC + "'>" + elem.comCodeNm + "</option>"));
							} else {
								comboObj[i].append($("<option value='" + elem.comCode + "'>" + elem.comCodeNm + "</option>"));
							}
		        		});
		        	}
	        	}
	        	if (ComUtil.GetType(callback) === "function") {
					callback.call(this, msg);
				}
	        },
	        error:function(){
	            return false;
	        }
	    });
	},

	open_kakao: function() {

		var aMsg = [];

		aMsg.push('<div class="popup message m_popup share" tabindex="0">');
		aMsg.push('	<div class="m_popup_inner">');
		aMsg.push('	<div class="header"><p>공유하기</p></div>');
		aMsg.push('	<div class="m_popup_area">');
		aMsg.push('		<ul class="link_list">');
		aMsg.push('			<li class="kakao02"><a href="javascript:;" id="kakao02" title="새창">카카스토리 공유하기</a></li>');
		aMsg.push('			<li class="band"><a href="javascript:;" id="band" title="새창">밴드 공유하기</a></li>');
		aMsg.push('			<li class="facebook"><a href="javascript:;" id="facebook" title="새창">페이스북 공유하기</a></li>');
		aMsg.push('			<li class="tweeter"><a href="javascript:;" id="tweeter" title="새창">트위터 공유하기</a></li>');
		aMsg.push('		</ul>');
		aMsg.push('		<div class="url_copy">');
		aMsg.push('			<label for="url">');
		aMsg.push('				<input type="text" id="copyUrl" name="copyUrl" title="KBNC URL" class="input_box" data-clicked="true" readonly="readonly" value="' + document.location.href + '" >');
		aMsg.push('			</label>');
		aMsg.push('			<div>');
		aMsg.push('				<button class="btn_line" type="button" onClick="KBNC.copyUrl()">URL복사</button>');
		aMsg.push('			</div>');
		aMsg.push('		</div>');
		aMsg.push('	</div>');
		aMsg.push('	<div class="m_popup_close"><button type="button" class="m_close end">닫기</button></div>');
		aMsg.push('	</div>');
		aMsg.push('</div>');

        var sMsg = aMsg.join("");
		$('body').append(sMsg);
		$('.m_popup').toggleClass('on');
		$('.black_dim').toggleClass('on');

		$('.m_popup').focus();

		//$('.popup_layer_wrap').css('margin-top' , -$('.popup_layer_wrap').height() / 2);
		$("#kakao").on('click', function() {
			KBNC.goLink('k');
		});
		$("#kakao02").on('click', function() {
			KBNC.goLink('ks');
		});
		$("#band").on('click', function() {
			KBNC.goLink('b');
		});
		$("#facebook").on('click', function() {
			KBNC.goLink('f');
		});
		$("#tweeter").on('click', function() {
			KBNC.goLink('t');
		});
		// 팝업 닫기 버튼
		var m_popup_close = $('.m_close');
		var black_dim = $('.black_dim');
		m_popup_close.on('click' , function(){
			$('.m_popup').remove();
			$('.black_dim').removeClass("on");
			$('.share_btn > button').focus();

		});
	},

	goLink: function(s_kind) {
		var _txt = " ";
		var _url = "";
		try {
			_url = document.location.href;
		} catch(e) {console.log(e);}
		KBNC.send_sns(s_kind, _txt, _url);
	},

	send_sns: function(s_kind, _txt, _url) {
		var _chwprotocol = $(location).attr('protocol');
		var _chwHost = $(location).attr('host');
		var callUrl = _url;

		if ( callUrl.length == 0 ) {
			KBNC.alert("공유 URL를 입력하세요.");
			return;
		}

		if (s_kind == "t") {
			window.open('http://twitter.com/intent/tweet?text=' + encodeURIComponent(_txt) + '&url=' + callUrl);
		} else if (s_kind == "k") {
			kakaoLink();
			try {
				Kakao.init("4437a71a9824d5a6fc6638e04ca2c1eb");
			} catch(e) {
				console.log(e);
			}
			Kakao.Link.sendDefault({
	 			objectType: 'feed',
	 			content: {
	 				 title: _txt,
	 				 description: _txt,
	 				 imageUrl: '',
	 				 link: {
	 					 mobileWebUrl: callUrl,
	 					 webUrl: callUrl
	 				 }
	 			},
	 			buttons: [
	 	        	{
	 					title: '자세히 보기',
	 					link: {
	 						mobileWebUrl: callUrl,
	 						webUrl: callUrl
	 					}
	 				}
	 	        ]
	 		});
		} else if (s_kind == "f") {
			window.open("http://www.facebook.com/sharer/sharer.php?u=" + callUrl);
		} else if (s_kind == "i") {
			KBNC.alert("지원하지 않습니다.");

		} else if (s_kind == "s") {
			location.href="sms://?body="+callUrl ;

		} else if (s_kind == "ks") {
			Kakao.Story.share({
		        url: callUrl,
		        text: _txt
		      });
		} else if (s_kind == "m") {
			var mailto_link = 'mailto:' + '' + '?subject=KBNC 메일공유하기&body=' + callUrl;
			window.open(mailto_link, 'emailWindow');
		} else if (s_kind == "cp") {

		} else if (s_kind == "b") {
			var _data_url = encodeURIComponent(callUrl);
			var _data_content = encodeURIComponent(_txt);
			window.open( "http://www.band.us/plugin/share?body=" + _data_content + encodeURIComponent("\n") + _data_url + "&route=" + _data_url, "share_band", "width=410, height=540, resizable=no");
		}
	},

	copyUrl: function () {
		var copyUrlObj = $("#copyUrl").get(0);
		copyUrlObj.select();
		document.execCommand('Copy');
	},

	/**
	 * hidden 폼 만들어서 submit
	 * @param property
	 * @param parameters
	 * @return
	 */
	submit2: function(property, otherParams)
	{
		var parameters = otherParams;
		// 강제 parameters
		if ( window.Page != undefined ) {
			var forceParams = {
		    };
		    parameters = $.extend(forceParams, otherParams);
		}
	    // form create
		var form = $('<form></form>');
		form.attr(property);
		form.attr("method", 'post');	// default method is post

		var value;
		for ( var name in parameters )
		{
			value = parameters[name];
			if ( typeof value == "string" || typeof value == "number" )
			{
				form.append($("<input name=" + name + " type=hidden value=" + value + " />"));
			}
			else if ( typeof value == "array" )
			{
				value.each(function(v)
				{
					form.append($("<input name=" + name + " type=hidden  value=" + v + "/>"));
				});
			}
			else
			{
				form.append($("<input name=" +  name + " type=hidden value=" + value + "/>"));
			}
		}
		$('body').append(form);
		form.submit();
	},

	dataCheckFrm: function(obj) {
		var _flagResult	= true;
		var _message = "";
		$.each(obj, function(idx, node) {
			if(! _flagResult) return;
			var target = $(node);
			var prop = {
				type		: ((target.get(0).tagName == "INPUT") ? target.attr("type") : target.get(0).tagName).toLowerCase(),
				title		: target.attr("title"),
				name		: target.attr("name"),
				minmax		: target.data("minmax"),
				format		: target.data("format"),
				firstoption	: target.data("firstoption-valid"),
				value		: target.val(),
				checked		: (this.type == "checkbox" || this.type == "radio") ? target.prop("checked") : false,
				validType   : target.attr("CHK_TYPE")
			};

	    	if ( prop.validType && _flagResult ) {
	    		switch ( prop.validType ) {
		    		case "String":
		   			{
		    			if( _flagResult ) {
		    				var RegExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;	//정규식 구문
			                if (RegExp.test(prop.value)) {
			                	_flagResult = false;
			                	_message = "특수문자는 입력하실 수 없습니다.";
			                }
		    			}
		    		}
		   			break;
		    		case "number":
		    		{
		    			if( _flagResult ) {
			    			var str = prop.value.replaceAll(",", "");
			    			if ( str != "" ) {
			    				var check = /^(0|([1-9]\d*))(\.\d*)?$/.test(str);
				    			if ( !check ) {
				    				_flagResult = false;
				    				_message = "[" + prop.title + "] 숫자만 입력 가능합니다.";
								}
			    			}
		    			}
		    		}
		    		break;
		    	}
	    		if (! _flagResult ) KBNC.alert(_message);
	    		if(! _flagResult) return;
	    	}
	    });

		return _flagResult;
	},

	isEnter:function (e) {
		var code = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if (code==13) {
			return true;
		}
		return false;
	},
	
	validate:function (obj, objName, len ) {
		if($.trim($(obj).val()) == "" ) {
			if($(obj).is("input") && !KBNC.IsNull(objName)) {
				alert(objName+" 입력하세요.");
				$(obj).focus();
			} else if($(obj).is("select")  && !KBNC.IsNull(objName)) {
				alert(objName+" 선택하세요.");
				$(obj).focus();
			}
			return false;
		}
		
		if($.trim($(obj).val()).length < len &&  !KBNC.IsNull(len)) {
			alert(objName + " 확인하세요.");
			$(obj).focus();
			return false;
		}
		return true;
	},
	
	validateInput:function (obj, objName, len ) {
		if($.trim($(obj).val()) == "" ) {
			alert(objName+" 입력하세요.");
			$(obj).focus();
			return false;
		}
		
		if($.trim($(obj).val()).length < len &&  !KBNC.IsNull(len)) {
			alert(objName + " 확인하세요.");
			$(obj).focus();
			return false;
		}
		return true;
	},
	
	validateSelect:function (obj, objName ) {
		if($.trim($(obj).val()) == "" ) {
			alert(objName+" 선택하세요.");
			$(obj).focus();
			return false;
		}
		return true;
	},
	
	goLogin: function() {
		var FORWARD_URL= "FORWARD_URL=" + document.location.pathname; 
		document.location.href = "/member/login?"+FORWARD_URL;
	},

	setAddrCallback: function(callback, jsonData) {
		//rcvNm, zipCd, addr, addrDtl, cellNo, telNo, dlvMsg, drctMsgYn
		if (ComUtil.GetType(callback) === "function") {
			try {
				opener.callback.call(this, jsonData);
			} catch(e){
				alert("callback 함수가 없습니다.");
			}
		} else if (ComUtil.GetType(callback) === "string") {
			try {
				eval("opener."+callback).call(this, jsonData);
			} catch(e){
				alert("callback 함수가 없습니다.");
			}
		}
	},
	
	/**
	 * 배송지 주소 팝업
	 */
	fnShippingAddrOpen: function(fnCallback) {
		var url = "/mobile/shipping/address/list";
		var uurl = url + '?callback=' + fnCallback;
		window.open(uurl,'배송지관리 팝업', 'width=550, height=650, left=0, top=0, menubar=no,scrollbars=yes,resizable=no');
	}

	
};
