/********************************************************************
* @업무명		: (임시)PB 테스트
* @설명		: 테스트
* @파일명		: pbservice_g.js
*********************************************************************
* 번호	작업자		작업일			변경내용
*--------------------------------------------------------------------
* 1		서효선		2020-11-17		최초작성1
*********************************************************************/

/********************************************************************
* @전역변수 선언 영역	
*********************************************************************/
var goParamData		= {}; //이전 화면에서 전달된 파라미터
var goParamDataGp	= {}; //다음 화면에서 전달된 파라미터(history back)

var g라인그래프;
var g라인멀티그래프;

/********************************************************************
* @공통함수 영역	
*********************************************************************/
/**
* @desc 최초 페이지 로딩 시 호출
* @param p 	이전 화면에서 전달된 파라미터
* @param gp 다음 화면에서 전달된 파라미터
* @returns N/A11
**/
function onParam(p, gp){
	
	//수신 Param
	goParamData = p ||{};
	
	//그래프 include
	sbImportJS(function(){
		sbImportJS(function(){
		
			fnc그래프출력();
			
		}, "/script/include/library/highcharts-more.js", false);
	}, "/script/include/library/highcharts.js", false);
	
	sbHeader({ title : "디지털PB서비스 하이브리드 그래프 샘플" });
	
	//로딩바제거 
	sbHideLoading();
}

/********************************************************************
* @개발자 정의함수 영역	aq
********************************************************************/

/**
 * 그래프 출력
 */
function fnc그래프출력(){
	
	sbShowLoading(false, function() {
		
		fncChartInit();
		
		/*
		var oLablArr = ["예금", "주식", "채권", "대체"];
		var oColorArr = ["92, 177, 255", "255, 99, 132", "75, 192, 192", "249, 148, 2"];
		for(var i=0; i<4; i++){
			fnc포트폴리오관리_총자산액그래프(oLabelArr[i], oColorArr[i]);
		}*/
		
		//2021.02.24 펀드상세
		var a목록 = JSON.parse('[{"기준월":"2016.02","전월대비등락":"-60.20","기준월_originalValue":"201602","월수익률":"-5.77","월기준가":"984.02","연환산수익률":"-69.18","name":201602,"y":984.02},{"기준월":"2016.03","전월대비등락":"19.90","기준월_originalValue":"201603","월수익률":"2.02","월기준가":"1003.92","연환산수익률":"24.27","name":201603,"y":1003.92},{"기준월":"2016.04","전월대비등락":"6.36","기준월_originalValue":"201604","월수익률":"0.63","월기준가":"1010.28","연환산수익률":"7.60","name":201604,"y":1010.28},{"기준월":"2016.05","전월대비등락":"5.75","기준월_originalValue":"201605","월수익률":"0.57","월기준가":"1016.03","연환산수익률":"6.83","name":201605,"y":1016.03},{"기준월":"2016.06","전월대비등락":"-22.63","기준월_originalValue":"201606","월수익률":"-2.23","월기준가":"993.40","연환산수익률":"-26.73","name":201606,"y":993.4},{"기준월":"2016.07","전월대비등락":"8.29","기준월_originalValue":"201607","월수익률":"0.83","월기준가":"1001.69","연환산수익률":"10.01","name":201607,"y":1001.69},{"기준월":"2016.08","전월대비등락":"-54.98","기준월_originalValue":"201608","월수익률":"-5.49","월기준가":"946.71","연환산수익률":"-65.86","name":201608,"y":946.71},{"기준월":"2016.09","전월대비등락":"18.35","기준월_originalValue":"201609","월수익률":"1.94","월기준가":"965.06","연환산수익률":"23.26","name":201609,"y":965.06},{"기준월":"2016.10","전월대비등락":"-50.18","기준월_originalValue":"201610","월수익률":"-5.20","월기준가":"914.88","연환산수익률":"-62.40","name":201610,"y":914.88},{"기준월":"2016.11","전월대비등락":"-46.28","기준월_originalValue":"201611","월수익률":"-5.06","월기준가":"868.60","연환산수익률":"-60.70","name":201611,"y":868.6},{"기준월":"2016.12","전월대비등락":"34.81","기준월_originalValue":"201612","월수익률":"4.01","월기준가":"903.41","연환산수익률":"48.09","name":201612,"y":903.41},{"기준월":"2017.01","전월대비등락":"-16.31","기준월_originalValue":"201701","월수익률":"-1.81","월기준가":"887.10","연환산수익률":"-21.66","name":201701,"y":887.1},{"기준월":"2017.02","전월대비등락":"4.49","기준월_originalValue":"201702","월수익률":"0.51","월기준가":"891.59","연환산수익률":"6.07","name":201702,"y":891.59},{"기준월":"2017.03","전월대비등락":"3.38","기준월_originalValue":"201703","월수익률":"0.38","월기준가":"894.97","연환산수익률":"4.55","name":201703,"y":894.97},{"기준월":"2017.04","전월대비등락":"33.35","기준월_originalValue":"201704","월수익률":"3.73","월기준가":"928.32","연환산수익률":"44.72","name":201704,"y":928.32},{"기준월":"2017.05","전월대비등락":"39.63","기준월_originalValue":"201705","월수익률":"4.27","월기준가":"967.95","연환산수익률":"51.23","name":201705,"y":967.95},{"기준월":"2017.06","전월대비등락":"28.28","기준월_originalValue":"201706","월수익률":"2.92","월기준가":"996.23","연환산수익률":"35.06","name":201706,"y":996.23},{"기준월":"2017.07","전월대비등락":"-6.20","기준월_originalValue":"201707","월수익률":"-0.62","월기준가":"990.03","연환산수익률":"-7.47","name":201707,"y":990.03},{"기준월":"2017.08","전월대비등락":"5.51","기준월_originalValue":"201708","월수익률":"0.56","월기준가":"995.54","연환산수익률":"6.68","name":201708,"y":995.54},{"기준월":"2017.09","전월대비등락":"-20.82","기준월_originalValue":"201709","월수익률":"-2.09","월기준가":"974.72","연환산수익률":"-25.10","name":201709,"y":974.72},{"기준월":"2017.10","전월대비등락":"39.73","기준월_originalValue":"201710","월수익률":"4.08","월기준가":"1014.45","연환산수익률":"48.91","name":201710,"y":1014.45},{"기준월":"2017.11","전월대비등락":"65.40","기준월_originalValue":"201711","월수익률":"6.45","월기준가":"1079.85","연환산수익률":"77.36","name":201711,"y":1079.85},{"기준월":"2017.12","전월대비등락":"0.20","기준월_originalValue":"201712","월수익률":"0.02","월기준가":"1080.05","연환산수익률":"0.22","name":201712,"y":1080.05},{"기준월":"2018.01","전월대비등락":"103.41","기준월_originalValue":"201801","월수익률":"9.57","월기준가":"1183.46","연환산수익률":"114.89","name":201801,"y":1183.46},{"기준월":"2018.02","전월대비등락":"-68.42","기준월_originalValue":"201802","월수익률":"-5.78","월기준가":"1115.04","연환산수익률":"-69.38","name":201802,"y":1115.04},{"기준월":"2018.03","전월대비등락":"11.80","기준월_originalValue":"201803","월수익률":"1.06","월기준가":"1126.84","연환산수익률":"12.70","name":201803,"y":1126.84},{"기준월":"2018.04","전월대비등락":"40.03","기준월_originalValue":"201804","월수익률":"3.55","월기준가":"1166.87","연환산수익률":"42.63","name":201804,"y":1166.87},{"기준월":"2018.05","전월대비등락":"12.29","기준월_originalValue":"201805","월수익률":"1.05","월기준가":"1179.16","연환산수익률":"12.64","name":201805,"y":1179.16},{"기준월":"2018.06","전월대비등락":"-45.56","기준월_originalValue":"201806","월수익률":"-3.86","월기준가":"1133.60","연환산수익률":"-46.37","name":201806,"y":1133.6},{"기준월":"2018.07","전월대비등락":"-42.85","기준월_originalValue":"201807","월수익률":"-3.78","월기준가":"1090.75","연환산수익률":"-45.36","name":201807,"y":1090.75},{"기준월":"2018.08","전월대비등락":"18.79","기준월_originalValue":"201808","월수익률":"1.72","월기준가":"1109.54","연환산수익률":"20.67","name":201808,"y":1109.54},{"기준월":"2018.09","전월대비등락":"8.81","기준월_originalValue":"201809","월수익률":"0.79","월기준가":"1118.35","연환산수익률":"9.53","name":201809,"y":1118.35},{"기준월":"2018.10","전월대비등락":"-216.32","기준월_originalValue":"201810","월수익률":"-19.34","월기준가":"902.03","연환산수익률":"-232.11","name":201810,"y":902.03},{"기준월":"2018.11","전월대비등락":"55.08","기준월_originalValue":"201811","월수익률":"6.11","월기준가":"957.11","연환산수익률":"73.27","name":201811,"y":957.11},{"기준월":"2018.12","전월대비등락":"-17.89","기준월_originalValue":"201812","월수익률":"-1.87","월기준가":"939.22","연환산수익률":"-22.43","name":201812,"y":939.22},{"기준월":"2019.01","전월대비등락":"10.86","기준월_originalValue":"201901","월수익률":"1.16","월기준가":"950.08","연환산수익률":"13.88","name":201901,"y":950.08},{"기준월":"2019.02","전월대비등락":"36.12","기준월_originalValue":"201902","월수익률":"3.80","월기준가":"986.20","연환산수익률":"45.62","name":201902,"y":986.2},{"기준월":"2019.03","전월대비등락":"6.25","기준월_originalValue":"201903","월수익률":"0.63","월기준가":"992.45","연환산수익률":"7.60","name":201903,"y":992.45},{"기준월":"2019.04","전월대비등락":"37.53","기준월_originalValue":"201904","월수익률":"3.78","월기준가":"1029.98","연환산수익률":"45.38","name":201904,"y":1029.98},{"기준월":"2019.05","전월대비등락":"-59.85","기준월_originalValue":"201905","월수익률":"-5.81","월기준가":"970.13","연환산수익률":"-69.73","name":201905,"y":970.13},{"기준월":"2019.06","전월대비등락":"12.60","기준월_originalValue":"201906","월수익률":"1.30","월기준가":"982.73","연환산수익률":"15.59","name":201906,"y":982.73},{"기준월":"2019.07","전월대비등락":"-113.21","기준월_originalValue":"201907","월수익률":"-11.52","월기준가":"869.52","연환산수익률":"-138.24","name":201907,"y":869.52},{"기준월":"2019.08","전월대비등락":"-31.84","기준월_originalValue":"201908","월수익률":"-3.66","월기준가":"837.68","연환산수익률":"-43.94","name":201908,"y":837.68},{"기준월":"2019.09","전월대비등락":"29.56","기준월_originalValue":"201909","월수익률":"3.53","월기준가":"867.24","연환산수익률":"42.35","name":201909,"y":867.24},{"기준월":"2019.10","전월대비등락":"1.91","기준월_originalValue":"201910","월수익률":"0.22","월기준가":"869.15","연환산수익률":"2.64","name":201910,"y":869.15},{"기준월":"2019.11","전월대비등락":"-4.99","기준월_originalValue":"201911","월수익률":"-0.57","월기준가":"864.16","연환산수익률":"-6.89","name":201911,"y":864.16},{"기준월":"2019.12","전월대비등락":"65.22","기준월_originalValue":"201912","월수익률":"7.55","월기준가":"929.38","연환산수익률":"90.57","name":201912,"y":929.38},{"기준월":"2020.01","전월대비등락":"7.45","기준월_originalValue":"202001","월수익률":"0.80","월기준가":"936.83","연환산수익률":"9.62","name":202001,"y":936.83},{"기준월":"2020.02","전월대비등락":"-35.37","기준월_originalValue":"202002","월수익률":"-3.78","월기준가":"901.46","연환산수익률":"-45.31","name":202002,"y":901.46},{"기준월":"2020.03","전월대비등락":"-149.68","기준월_originalValue":"202003","월수익률":"-16.60","월기준가":"751.78","연환산수익률":"-199.25","name":202003,"y":751.78},{"기준월":"2020.04","전월대비등락":"116.28","기준월_originalValue":"202004","월수익률":"15.47","월기준가":"868.06","연환산수익률":"185.61","name":202004,"y":868.06},{"기준월":"2020.05","전월대비등락":"116.46","기준월_originalValue":"202005","월수익률":"13.42","월기준가":"984.52","연환산수익률":"160.99","name":202005,"y":984.52},{"기준월":"2020.06","전월대비등락":"17.74","기준월_originalValue":"202006","월수익률":"1.80","월기준가":"1002.26","연환산수익률":"21.62","name":202006,"y":1002.26},{"기준월":"2020.07","전월대비등락":"189.89","기준월_originalValue":"202007","월수익률":"18.95","월기준가":"1192.15","연환산수익률":"227.35","name":202007,"y":1192.15},{"기준월":"2020.08","전월대비등락":"80.70","기준월_originalValue":"202008","월수익률":"6.77","월기준가":"1272.85","연환산수익률":"81.23","name":202008,"y":1272.85},{"기준월":"2020.09","전월대비등락":"4.70","기준월_originalValue":"202009","월수익률":"0.37","월기준가":"1277.55","연환산수익률":"4.43","name":202009,"y":1277.55},{"기준월":"2020.10","전월대비등락":"-47.78","기준월_originalValue":"202010","월수익률":"-3.74","월기준가":"1229.77","연환산수익률":"-44.88","name":202010,"y":1229.77},{"기준월":"2020.11","전월대비등락":"145.36","기준월_originalValue":"202011","월수익률":"11.82","월기준가":"1375.13","연환산수익률":"141.84","name":202011,"y":1375.13},{"기준월":"2020.12","전월대비등락":"154.91","기준월_originalValue":"202012","월수익률":"11.27","월기준가":"1530.04","연환산수익률":"135.18","name":202012,"y":1530.04},{"기준월":"2021.01","전월대비등락":"89.29","기준월_originalValue":"202101","월수익률":"5.84","월기준가":"1619.33","연환산수익률":"70.03","name":202101,"y":1619.33},{"name":202102,"y":1571.25}]');
		fnc펀드상세기준가추이("펀드상세기준가추이", a목록, "최근5년기준가추이", "88, 120, 196");	 //id:펀드상세기준가추이
		
		
		fnc포트폴리오분석_기대변동성("포트폴리오분석_기대변동성", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "기대수익률/변동성", "88, 120, 196");	//id:포트폴리오분석_기대변동성
		fnc포트폴리오추천_수익률("포트폴리오추천_수익률", [5, 3, 6, 10, 15], "수익률추이", "88, 120, 196");							//id:포트폴리오추천_수익률
		
		fnc포트폴리오관리_총자산();									//id:포트폴리오관리_총자산
		fnc포트폴리오관리_종합수익률그래프("총자산", "224, 127, 180");	//id:종합수익률_총자산
		
		fnc포트폴리오관리_총자산액그래프("예금", "147, 112, 224");		//id:포트폴리오관리_예금
		fnc포트폴리오관리_종합수익률그래프("예금", "147, 112, 224");		//id:종합수익률_예금
		
		
		fnc포트폴리오관리_총자산액그래프("주식", "16, 200, 185");		//id:포트폴리오관리_주식
		fnc포트폴리오관리_종합수익률그래프("주식", "16, 200, 185");		//id:종합수익률_주식
		
		fnc포트폴리오관리_총자산액그래프("채권", "255, 133, 179");		//id:포트폴리오관리_채권
		fnc포트폴리오관리_종합수익률그래프("채권", "255, 133, 179");		//id:종합수익률_채권
		
		fnc포트폴리오관리_총자산액그래프("대체", "255, 184, 30");			//id:포트폴리오관리_대체
		fnc포트폴리오관리_종합수익률그래프("대체", "255, 184, 30");		//id:종합수익률_대체
		
		/*
		var oLabelArr2 = ["총자산", "예금", "주식", "채권", "대체"];
		var oColorArr2 = ["224, 127, 180", "92, 177, 255", "255, 99, 132", "75, 192, 192", "249, 148, 2"];
		for(var i=0; i<5; i++){
			fnc포트폴리오관리_종합수익률그래프(oLabelArr2[i], oColorArr2[i]);
		}*/
		
		fnc분석추천_도넛그래프('분석추천_도넛그래프1');									//id:분석추천_도넛그래프1
		fnc분석추천_도넛그래프('분석추천_도넛그래프2');									//id:분석추천_도넛그래프2
		fnc분석추천_도넛그래프상세('분석추천_도넛그래프상세');								//id:분석추천_도넛그래프상세
		
		/*
		
		
		fnc라인멀티그래프2();
		fnc라인막대예금멀티그래프();
		
		fnc도넛그래프2();
		
		fnc라인그래프();
		fnc라인멀티그래프();
		
		//도넛 그래프
		fnc도넛그래프();
		
		//선 그래프(곡선) 
		fnc선그래프();
		
		//원형 그래프
		fncPieChart();
		
		//반원그래프
		fncSemiCircleChart();
		
		//도넛그래프
		fncDonutChart();
		
		//글라이더패스
		fncPercentChart();
		
		//막대그래프 (가로형)
		fncBarChart();
		
		//막대그래프 (세로형)
		fncColumnChart();	
		
		//선 그래프(기본형)
		fncLineChart();

		//선 그래프(곡선형)
		fncSplineChart();

		//선 그래프(방사형)
		fncSpiderChart();
		*/
		
		//fncChartIN08120100001();
		/**/
		setTimeout(function(){
			sbHideLoading();
		}, 200);
	});
}

function fnc펀드상세기준가추이(sTarget, oData, sLabel, sColorRGB){
	
	var sLineRGB100 = "rgba(" + sColorRGB+ ", 1)";
	var sLineRGB10 = "rgba(" + sColorRGB+ ", 0.1)";
	var sLineRGB50 = "rgba(" + sColorRGB+ ", 0.5)";
	
	var marker = {};
	marker.enabled = true;
	marker.radius = 5;
	marker.fillColor = "rgb(255, 255, 255)";
	marker.lineWidth = 3;
	marker.lineColor = sLineRGB100;	
	marker.symbol = "diamond";	//circle, square, diamond, triangle, triangle-down
	
	var graphData = oData;
	
	//graphData[oData.length-1].color = sLineRGB50;
	//graphData[oData.length-1].marker = marker;
	/*
	var oLastRow = graphData[graphData.length-1];
	oLastRow.color = sLineRGB50;
	oLastRow.marker = marker;
	*/
	Highcharts.chart(sTarget, {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			marginbottom : 50
			, events:{
				load: function(){
				}
			},
			type: 'area'
		},
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //툴팁박스
	    tooltip: {
	    	enabled : true,
			formatter: function () {
				var x = graphData[this.x].name;
				//var y0 = Number(gsToday.substring(0, 6));
				var y0 = Number("20210203".substring(0, 6));
				if(x == y0){
					x = "현재";	
				} else {
					//x = sbGetFormatDate(x);
					x = (x+"");
					x = x.substring(0, 4) + '.' + x.substring(4, 6);
				}
				//return x + "<br/>" + sbGetFormatAmt(this.y);
				return x + "<br/>" + this.y;
		    }
		},
		
	    xAxis: {
	    	type: 'column'
	    	//,startOnTick: true
	    	//,endOnTick:true
	    	,tickInterval : 12
	    	,tickLength : 0
	    	,labels: {
	    		enabled: true,
	    		//style: {fontSize: "5px"},
	    		//rotation : 8,
	    		formatter: function(){
	    			var sName = graphData[this.value].name;

	    			/*
	    			var y0 = Number(gsToday.substring(0, 6));
	    			var y1 = Number(sbGetCalcDate(gsToday, "y", -1).substring(0, 6));
	    			var y2 = Number(sbGetCalcDate(gsToday, "y", -2).substring(0, 6));
	    			var y3 = Number(sbGetCalcDate(gsToday, "y", -3).substring(0, 6));
	    			var y4 = Number(sbGetCalcDate(gsToday, "y", -4).substring(0, 6));
	    			var y5 = Number(sbGetCalcDate(gsToday, "y", -5).substring(0, 6));
	    			*/
	    			var y0 = 202102;
	    			var y1 = 202002;
	    			var y2 = 201902;
	    			var y3 = 201802;
	    			var y4 = 201702;
	    			var y5 = 201602;
	    			
	    			var sLabel = "";
	    			switch(sName){
		    			case y0:
		    				sLabel = "현재";
		    				break;
		    			case y1:
		    				sLabel = "1년전";
		    				break;
		    			case y2:
		    				sLabel = "2년전";
		    				break;
		    			case y3:
		    				sLabel = "3년전";
		    				break;
		    			case y4:
		    				sLabel = "4년전";
		    				break;
		    			case y5:
		    				sLabel = "5년전";
		    				break;
		    			default :
		    				break;
		    		}
	    			return sLabel;
	    		}
	    	}
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			//return sbGetFormatAmt(this.value);
	    			return this.value;
	    		}
	    	}
	    	,startOnTick: false
	    	//,endOnTick:false
	    	,min: 0.0001
	    	//,tickInterval : 1000000000
	    	//,gridLineWidth:0
	    	//,enabled: true
	    },

	    //x축 포인트 
	    plotOptions: {
	        series: {
	        	animation:{
		    		duration: 2000
		    	}
	        	,lineWidth: 1
	        }
	    },
	    
	    series: [
		   {
	    	name : sLabel
	    	,fillColor : "rgba(50, 65, 122, 0.05)"
	    	,lineWidth: 3
	        , data : graphData
	        , colors : sLineRGB100
	        , marker : {
		    	enabled : false
		    	,symbol : "diamond"
	    	}
	    	,color: sLineRGB100
	    }]
	});
}

//
function fnc포트폴리오관리_총자산(){
	
	var marker = {};
	marker.enabled = true;
	marker.radius = 5;
	marker.fillColor = "rgb(255, 255, 255)";
	marker.lineWidth = 3;
	marker.lineColor = "rgb(88, 120, 196)";
	marker.symbol = "diamond";	//circle, square, diamond, triangle, triangle-down
	
	var color = "#5878c4";
	var sAddYpoint = 0;
	
	var graphData1 = [
						{name: '1년전', y: 0,
							color: color,
							marker:marker
						},
						{name: '11달전', y: 10000000},
						{name: '10달전', y: 20000000},
						{name: '9달전', y: 15000000},
						{name: '8달전', y: 30000000},
						{name: '7달전', y: 100000000},
						{name: '6달전', y: 1500000000,
							color: color,
							marker:marker
						},
						{name: '5달전', y: 300000000},
						{name: '4달전', y: 100000000},
						{name: '3달전', y: 500000000},
						{name: '2달전', y: 300000000},
						{name: '1달전', y: 4500000000},
						//{name: '어제',  y: 9800000000},
						{name: '어제',  y: 9900000000,
								color: color,
								marker:marker
						},
					];
	
	Highcharts.chart('포트폴리오관리_총자산', {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			marginbottom : 50
			//,backgroundColor:'#00ABA2'
			, events:{
				load: function(){
					/*var chart = this.prototypepoints = chart.series[0].points;
					HighChart.earch(points, function(point, i){
						point.update(data[i], false);
					});
					chart.redraw({duration: 1000});///
					*/
				},
				redraw: function(){
					console.log('redraw');
				}
			},
		},
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //Y 타이틀
	    xAxis: {
	    	//type: 'category'
	    	type: 'column'
	    	,tickInterval : 4
	    	,tickLength : 0
	    	,labels: {
	    		enabled: true,
	    		//rotation: 45,
	    		formatter: function(){
	    			/* case1
	    			var bThreeMonthStep = graphData1[this.value].name%3 == 0;
	    			if(bThreeMonthStep){
	    				return graphData1[this.value].name;
	    			}
	    			return '';*/
	    			
	    			//case2
	    			var sName = graphData1[this.value].name;
	    			//if(sName == 12 || sName == 6 || sName == 2 || sName == 0){
	    			//	return graphData1[this.value].name + '달전';
	    			//} else {
	    			//	return "";
	    			//}
	    			return sName;
	    			
	    		}
	    	}
	    	//, crosshair: true
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			//개발자는 공통함수 사용하세요 ========== 퍼블 제공하기위해 공통함수 옮겨놓음
	    			//sbPbWonToHanUnit -> sbWonToHanUnit
	    			return sbPbWonToHanUnit(this.value);
	    			//return '';
	    		}
	    	}
	    	//,startOnTick: false
	    	//,endOnTick:false
	    	//,min: 0.0001
	    	//,tickInterval : 1000000000
	    	//,gridLineWidth:0
	    	//,enabled: true
	    	,tickAmount : 5 //tick개수
	    },
	    
	    //툴팁박스
	    tooltip: {
	    	enabled : false,
			formatter: function () {
				var sMonth = graphData1[this.x].name;
				var sResult = "<b>" + this.series.name + "</b> : " + sMonth +  "  " + sbGetFormatAmt(this.y) +"</b>"; 
				return sResult;
		    }
	    	//, shared: true
		},
		
	    //x축 포인트 
	    plotOptions: {
	         line: {
	            marker: {
	            	radius: 4,
	            	//lineColor: '#666666',
	            	lineWidth: 1
	            }
				,events: {
					legendItemClick : function(e){
						console.log(this.name);
					}
				}
	        },
	        series: {
	        	animation:{
		    		duration: 2000
		    		//,easing: 'easeOutBounce'
		    	}
	        	,lineWidth: 1
	        }
			
	    },

	    //데이터 (총자산, 예금, 주식, 채권, 대체
	    series: [
		    {
	    	name : '총자산'
	    	,lineWidth: 3
	        , data : graphData1
	        , marker : {
		    	enabled : false //마커사용안함
		    	,symbol : "diamond"
	    	}
	    	,color: 'rgba(88, 120, 196, 1)'
	    }]
	});

}

function fnc포트폴리오관리_총자산액그래프(sLabel, sColorRGB){
	
	
	var sLineRGB100 = "rgba(" + sColorRGB+ ", 1)";
	var sLineRGB10 = "rgba(" + sColorRGB+ ", 0.1)";
	var sLineRGB50 = "rgba(" + sColorRGB+ ", 0.5)";
	
	var marker = {};
	marker.enabled = true;
	marker.radius = 5;
	//if(sLabel == "주식"){
	//	marker.fillColor = sLineRGB100;
	//	marker.lineWidth = 3;
	//	marker.lineColor = "rgb(255, 255, 255)";
	//} else {
		marker.fillColor = "rgb(255, 255, 255)";
		marker.lineWidth = 3;
		marker.lineColor = sLineRGB100;
	//}
	marker.symbol = "diamond";	//circle, square, diamond, triangle, triangle-down
		
	var sAddYpoint = 0;
	
	var graphData1 = [
						{name: '1년전', y: 10,
							marker:marker
						},
						{name: '11달전', y: 100000000},
						{name: '10달전', y: 20000000},
						{name: '9달전', y: 15000000},
						{name: '8달전', y: 30000000},
						{name: '7달전', y: 100000000},
						{name: '6달전', y: 1500000000,
							marker:marker
						},
						{name: '5달전', y: 300000000},
						{name: '4달전', y: 100000000},
						{name: '3달전', y: 500000000},
						{name: '2달전', y: 300000000},
						{name: '1달전', y: 4500000000},
						{name: '어제',  y: 9900000000,
								color:sLineRGB50,
								marker:marker
						},
					];
	
		
	Highcharts.chart('포트폴리오관리_' + sLabel, {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			marginbottom : 50
			//,backgroundColor:'#00ABA2'
			, events:{
				load: function(){
				}
			}
		},
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //Y 타이틀
	    xAxis: {
	    	//type: 'category'
	    	//overflow:'justify',
	    	type: 'column'
	    	,tickInterval : 6
	    	,tickLength : 0
	    	,labels: {
	    		enabled: true,
	    		//rotation: 45,
	    		formatter: function(){
	    			/* case1
	    			var bThreeMonthStep = graphData1[this.value].name%3 == 0;
	    			if(bThreeMonthStep){
	    				return graphData1[this.value].name;
	    			}
	    			return '';*/
	    			
	    			//case2
	    			var sName = graphData1[this.value].name;
	    			//if(sName == 12 || sName == 6 || sName == 2 || sName == 0){
	    			//	return graphData1[this.value].name + '달전';
	    			//} else {
	    			//	return "";
	    			//}
	    			return sName;
	    			
	    		}
	    		/*,style : {
					fontSize: '14px',
					color: 'rgba(255,255,255,1)',
						textOverflow:'none',
				}*/
	    	}
	    	//, crosshair: true
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			//개발자는 공통함수 사용하세요 ========== 퍼블 제공하기위해 공통함수 옮겨놓음
	    			//sbPbWonToHanUnit -> sbWonToHanUnit
	    			return sbPbWonToHanUnit(this.value);
	    			//return '';
	    		}
	    	}
	    	//,startOnTick: false
	    	//,endOnTick:false
	    	//,min: 0.0001
	    	//,tickInterval : 1000000000
	    	//,gridLineWidth:0
	    	//,enabled: true
	    	//,opposite:true, y축라벨 반대로
	    	,tickAmount : 5 //tick개수
	    },
	    
	    //툴팁박스
	    tooltip: {
	    	enabled : false,
			formatter: function () {
				var sMonth = graphData1[this.x].name;
				var sResult = "<b>" + this.series.name + "</b> : " + sMonth +  "  " + sbGetFormatAmt(this.y) +"</b>"; 
				return sResult;
		    }
	    	//, shared: true
		},
		
	    //x축 포인트 
	    plotOptions: {
	         line: {
	            marker: {
	            	radius: 4,
	            	//lineColor: '#666666',
	            	lineWidth: 1
	            }
				,events: {
					legendItemClick : function(e){
						console.log(this.name);
					}
				}
				//,dashStyle: 'ShortDash',
	        },
	        
	        /*
	        column : {
	        	dataLabels:{
	    			enabeld:false
	    		},
	    		animation:false,
	    		// 막대 Border 색상
	    		borderColor : 'transparent',
					
				// 막대 차트 라운딩 처리
				borderRadiusTopLeft: 20,
	    		
	    		// Shadow 처리
	    		shadow:{
	    			width:7,
	    			offsetX:2,
	    			offsetY:20,
	    			color:'rgba(0,0,0,0.1)',
	    			borderWidth:0
	    		},
	        },*/
	        series: {
	        	animation:{
		    		duration: 2000
		    		//,easing: 'easeOutBounce'
		    	}
	        	,lineWidth: 1
	        }
			
	    },

	    //데이터 (총자산, 예금, 주식, 채권, 대체
	    series: [
		    {
	    	name : sLabel
		        , data : graphData1
		        , type:'column'
		        , marker : {
		    		//symbol: 'circle'
			    	enabled : false //마커사용안함
		    	}
		        ,color: sLineRGB10
		    },{
	    	name : sLabel
	    	,lineWidth: 3
	        , data : graphData1
	        , colors : sLineRGB100
	        , marker : {
		    	enabled : false //마커사용안함
		    	,symbol : "diamond"
	    	}
	    	,color: sLineRGB100
	    }]
	});
	
}


function fnc포트폴리오관리_종합수익률그래프(sLabel, sColorRGB){
	
	
	var sLineRGB100 = "rgba(" + sColorRGB+ ", 1)";
	var sLineRGB10 = "rgba(" + sColorRGB+ ", 0.1)";
	var sLineRGB50 = "rgba(" + sColorRGB+ ", 0.5)";
	
	var marker = {};
	marker.enabled = true;
	marker.radius = 5;
	//if(sLabel == "주식"){
	//	marker.fillColor = sLineRGB100;
	//	marker.lineWidth = 3;
	//	marker.lineColor = "rgb(255, 255, 255)";
	//} else {
		marker.fillColor = "rgb(255, 255, 255)";
		marker.lineWidth = 3;
		marker.lineColor = sLineRGB100;	
	//}
	marker.symbol = "diamond";		//circle, square, diamond, triangle, triangle-down
	
	var sAddYpoint = 0;
	
	var graphData1 = [
						{name: '1년전', y: 1,
							marker:marker
						},
						{name: '11달전', y: 1},
						{name: '10달전', y: 3},
						{name: '9달전', y: 5},
						{name: '8달전', y: 15},
						{name: '7달전', y: 10},
						{name: '6달전', y: 3,
							marker:marker
						},
						{name: '5달전', y: 12},
						{name: '4달전', y: 15},
						{name: '3달전', y: 25},
						{name: '2달전', y: 30},
						{name: '1달전', y: 80},
						{name: '어제',  y: 90,
								color:sLineRGB50,
								marker:marker
						},
					];
	
	Highcharts.chart('종합수익률_' + sLabel, {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			marginbottom : 50
			//,backgroundColor:'#00ABA2'
			, events:{
				load: function(){
				}
			},
			type: 'area'
		},
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //툴팁박스
	    tooltip: {
	    	enabled : false,
			formatter: function () {
				return "";
		    }
	    	//, shared: true
		},
		
	    xAxis: {
	    	//type: 'category'
	    	type: 'column'
	    	,tickInterval : 6
	    	,tickLength : 0
	    	,labels: {
	    		enabled: true,
	    		//rotation: 45,
	    		formatter: function(){
	    			var sName = graphData1[this.value].name;
	    			return sName;
	    			
	    		}
	    	}
	    	//, crosshair: true
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			return this.value + '%';
	    			//return '';
	    		}
	    	}
	    	//,startOnTick: false
	    	//,endOnTick:false
	    	//,min: 0.0001
	    	//,tickInterval : 1000000000
	    	//,gridLineWidth:0
	    	//,enabled: true
	    	,tickAmount : 5 //tick개수
	    },

	    //x축 포인트 
	    plotOptions: {
	        series: {
	        	animation:{
		    		duration: 2000
		    		//,easing: 'easeOutBounce'
		    	}
	        	,lineWidth: 1
	        }
			
	    },
	    
	    series: [
		   {
	    	name : sLabel
	    	,fillColor : "rgba(50, 65, 122, 0.05)"
	    	,lineWidth: 3
	        , data : graphData1
	        , colors : sLineRGB100
	        , marker : {
		    	enabled : false //마커사용안함
		    	,symbol : "diamond"
	    	}
	    	,color: sLineRGB100
	    }]
	});
	
}

/**
 * 도넛그래프
 */
function fnc분석추천_도넛그래프(id){

	//챠트셋팅
	Highcharts.chart(id, {
		credits:{enabled: false},
		colors: ["#9370e0", "#ff85b3", "#10c8b9", "#ffb81e"],
	    chart: {
	    	type: 'pie', //원형
	        //,animation : false
	        backgroundColor:'transparent', //원형배경색
	        marginTop : -10,
	        marginBottom : -10
	    },
	    title: {
	        text: '' 
	    },
	    tooltip: {
	    	enabled : false
		},
	    subtitle: {
	        text: ''
	    },
	    plotOptions: {
	        pie: {
	        	allowPointSelect : false,
	        	cursor : 'pointer',//툴팁올렸을때, 손모양
	        	dataLabels:{
	    			enabled : false, //원형에 데이터 라벨표시여부
	    		},
	    		showInLegend: false //그래프하단 데이터 라벨 표시여부
	    		,events: {
	    			show : false
	    		}
	        }
	    	,series: {
	    		animation : {
		    		duration: 1000
		    	}
	    	}
	    },
	    series: [{
	    	type: 'pie', 
	        name: ' ',
	        size: '80%', //원형사이즈
	        innerSize :  '73%',//원형안사이즈
	        borderWidth: 0, //원형테두리
	        data: [{
	            name: '주식',
	            y: 10
	        }, {
	            name: '채권',
	            y: 20
	        }, {
	            name: '대체',
	            y: 30
	        }, {
	            name: '예금',
	            y: 50
	        }]
		    , events : {
	    		click: function(e){
	    			console.log(e.point.name);
	    		}
	    	}
	    }]
	});	
}

/**
 * 도넛그래프
 */
function fnc분석추천_도넛그래프상세(id , sColorRGB){

	
	//챠트셋팅
	Highcharts.chart(id, {
		credits:{enabled: false},
		colors: [sColorRGB, "#dddddd"],
	    chart: {
	        type: 'pie', //원형
	        //,animation : false
	        marginTop : -10,
	        marginBottom : -10
	    },
	    title: {
	        text: '' 
	    },
	    tooltip: {
	    	enabled : false
		},
	    subtitle: {
	        text: ''
	    },
	    plotOptions: {
	        pie: {
	        	allowPointSelect : false,
	        	cursor : 'pointer',//툴팁올렸을때, 손모양
	        	dataLabels:{
	    			enabled : false, //원형에 데이터 라벨표시여부
	    		},
	    		showInLegend: false //그래프하단 데이터 라벨 표시여부
	    		,events: {
	    			show : false
	    		}
	        }
	    	,series: {
	    		animation : {
		    		duration: 1000
		    	}
	    	}
	    },
	    series: [{
	    	type: 'pie', 
	        name: ' ',
	        size: '80%', //원형사이즈
	        innerSize :  '73%',//원형안사이즈
	        borderWidth: 0, //원형테두리
	        data: [{
	            name: '주식',
	            y: 60
	        }, {
	            name: '그외',
	            y: 40
	        }]
		    , events : {
	    		click: function(e){
	    			console.log(e.point.name);
	    		}
	    	}
	    }]
	});	
}

/**
 * 라인멀티그래프
 */
function fnc라인멀티그래프2(){

	var graphData1 = [
						{name: '1년전', y: 600000},
						{name: '11달전', y: 700000},
						{name: '10달전', y: 800000},
						{name: '9달전', y: 900000},
						{name: '8달전', y: 1000000},
						{name: '7달전', y: 2000000},
						{name: '6달전', y: 3000000},
						{name: '5달전', y: 4000000},
						{name: '4달전', y: 3000000},
						{name: '3달전', y: 6000000},
						{name: '2달전', y: 7000000},
						{name: '1달전', y: 8000000},
						{name: '오늘',  y: 7800000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];

	var graphData2 = [
						{name: '1년전', y: 120000},
						{name: '11달전', y: 140000},
						{name: '10달전', y: 160000},
						{name: '9달전', y: 180000},
						{name: '8달전', y: 200000},
						{name: '7달전', y: 400000},
						{name: '6달전', y: 600000},
						{name: '5달전', y: 800000},
						{name: '4달전', y: 1600000},
						{name: '3달전', y: 1200000},
						{name: '2달전', y: 1400000},
						{name: '1달전', y: 1600000},
						{name: '오늘',  y: 1800000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData3 = [
						{name: '1년전', y: 6000},
						{name: '11달전', y: 7000},
						{name: '10달전', y: 8000},
						{name: '9달전', y: 9000},
						{name: '8달전', y: 10000},
						{name: '7달전', y: 20000},
						{name: '6달전', y: 30000},
						{name: '5달전', y: 40000},
						{name: '4달전', y: 50000},
						{name: '3달전', y: 60000},
						{name: '2달전', y: 70000},
						{name: '1달전', y: 80000},
						{name: '오늘',  y: 90000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData4 = [
						{name: '1년전', y: 61000},
						{name: '11달전', y: 71000},
						{name: '10달전', y: 81000},
						{name: '9달전', y: 91000},
						{name: '8달전', y: 110000},
						{name: '7달전', y: 210000},
						{name: '6달전', y: 310000},
						{name: '5달전', y: 410000},
						{name: '4달전', y: 510000},
						{name: '3달전', y: 610000},
						{name: '2달전', y: 710000},
						{name: '1달전', y: 810000},
						{name: '오늘',  y: 910000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData5 = [
						{name: '1년전', y: 300000},
						{name: '11달전', y: 350000},
						{name: '10달전', y: 400000},
						{name: '9달전', y: 450000},
						{name: '8달전', y: 500000},
						{name: '7달전', y: 100000},
						{name: '6달전', y: 1500000},
						{name: '5달전', y: 2000000},
						{name: '4달전', y: 2500000},
						{name: '3달전', y: 3000000},
						{name: '2달전', y: 3500000},
						{name: '1달전', y: 4000000},
						{name: '오늘',  y: 4500000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	Highcharts.chart('라인멀티그래프2', {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			marginbottom : 50
			//,backgroundColor:'#00ABA2'
			, events:{
				load: function(){
					
					//min, max point에 동그라미 추가
					var chart= this,
						points = chart.series[0].points,
						maxValue,minValue,chosenPoint_max,chosenPoint_min;
					
					//최고점O출력
					points.forEach(function(point,index){
						if(!maxValue||maxValue<point.y){
							maxValue=point.y;
							chosenPoint_max=point;
						}
					});
					
					//마지막O출력
					chosenPoint_max = points[points.length-1];
					
					chosenPoint_max.update({
						marker:{
							enabled:true,
							radius: 5,
							fillColor:'rgb(0,0,0)',
							lineWidth:2,
							lineColor:'rgb(255,255,255)'
						}
					});
					
				}
			},
		},
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //Y 타이틀
	    xAxis: {
	    	//type: 'category'
	    	type: 'column'
	    	//,overflow:'justify'
			//,useHtml:true
	    	,tickInterval : 6
	    	//, tickmarkPlacement : 'on'
	    	//,startOnTick: true
	    	//,showFirstLabel : true
	    	//,endOnTick: true
	    	,tickLength : 0
	    	,labels: {
	    		enabled: true,
	    		//rotation: 45,
	    		formatter: function(){
	    			/* case1
	    			var bThreeMonthStep = graphData1[this.value].name%3 == 0;
	    			if(bThreeMonthStep){
	    				return graphData1[this.value].name;
	    			}
	    			return '';*/
	    			
	    			//case2
	    			var sName = graphData1[this.value].name;
	    			//if(sName == 12 || sName == 6 || sName == 2 || sName == 0){
	    			//	return graphData1[this.value].name + '달전';
	    			//} else {
	    			//	return "";
	    			//}
	    			return sName;
	    			
	    		}
	    	}
	    	, crosshair: true
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			//return this.value;
	    			return '';
	    		}
	    	}
	    },
	    
	    //툴팁박스
	    tooltip: {
	    	enabled : false,
	    	formatter: function () {
				var sMonth = graphData1[this.x].name;
				var sResult = "<b>" + this.series.name + "</b> : " + sMonth +  "  " + sbGetFormatAmt(this.y) +"</b>"; 
				return sResult;
		    }
	    	//, shared: true
		},
		
	    //x축 포인트 
	    plotOptions: {
	         spline: {
	            marker: {
	            	radius: 4,
	            	//lineColor: '#666666',
	            	lineWidth: 1
	            }
				,events: {
					legendItemClick : function(e){
						console.log(this.name);
					}
				}
	        },
	        series: {
	        	animation:{
		    		duration: 2000
		    		//,easing: 'easeOutBounce'
		    	}
	        	,lineWidth: 1
	        }
			
	    },

	    //데이터 (총자산, 예금, 주식, 채권, 대체
	    series: [{
	    	name : '총자산'
	        , data : graphData1
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(0, 0, 0, 1)'
	    	,lineWidth: 5
	    },
	    {
	    	name : '예금'
	        , data : graphData2
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(0, 128, 255, 0.3)'
	    },
	    {
	    	name : '주식'
	        , data : graphData3
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(255, 153, 153, 0.3)'
	    },
	    {
	    	name : '채권'
	        , data : graphData4
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(102, 204, 0, 0.3)'
	    },
	    {
	    	name : '대체'
	        , data : graphData5
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(204, 204, 0, 0.3)'
	    }]
	});
	
}

/**
 * 라인막대예금멀티그래프
 */
function fnc라인막대예금멀티그래프(){

	var sAddYpoint = 0.1;
	
	
	var graphData1 = [
						{name: '1년전', y: 120000},
						{name: '11달전', y: 140000},
						{name: '10달전', y: 160000},
						{name: '9달전', y: 180000},
						{name: '8달전', y: 200000},
						{name: '7달전', y: 400000},
						{name: '6달전', y: 600000},
						{name: '5달전', y: 800000},
						{name: '4달전', y: 1600000},
						{name: '3달전', y: 1200000},
						{name: '2달전', y: 1400000},
						{name: '1달전', y: 1600000},
						{name: '오늘',  y: 1800000,
								//0, 128, 255
								color: '#0080FF',
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData2 = [
						{name: '1년전', y: 120000 + (120000*sAddYpoint)},
						{name: '11달전', y: 140000 + (140000*sAddYpoint)},
						{name: '10달전', y: 160000 + (160000*sAddYpoint)},
						{name: '9달전', y: 180000 + (180000*sAddYpoint)},
						{name: '8달전', y: 200000 + (200000*sAddYpoint)},
						{name: '7달전', y: 400000 + (400000*sAddYpoint)},
						{name: '6달전', y: 600000 + (600000*sAddYpoint)},
						{name: '5달전', y: 800000 + (800000*sAddYpoint)},
						{name: '4달전', y: 1600000 + (1600000*sAddYpoint)},
						{name: '3달전', y: 1200000 + (120000*sAddYpoint)},
						{name: '2달전', y: 1400000 + (1400000*sAddYpoint)},
						{name: '1달전', y: 1600000 + (1600000*sAddYpoint)},
						{name: '오늘',  y: 1800000 + (1800000*sAddYpoint),
								//0, 128, 255
								color: '#0080FF',
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData3 = [
						{name: '1년전', y: 6000},
						{name: '11달전', y: 7000},
						{name: '10달전', y: 8000},
						{name: '9달전', y: 9000},
						{name: '8달전', y: 10000},
						{name: '7달전', y: 20000},
						{name: '6달전', y: 30000},
						{name: '5달전', y: 40000},
						{name: '4달전', y: 50000},
						{name: '3달전', y: 60000},
						{name: '2달전', y: 70000},
						{name: '1달전', y: 80000},
						{name: '오늘',  y: 90000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData4 = [
						{name: '1년전', y: 61000},
						{name: '11달전', y: 71000},
						{name: '10달전', y: 81000},
						{name: '9달전', y: 91000},
						{name: '8달전', y: 110000},
						{name: '7달전', y: 210000},
						{name: '6달전', y: 310000},
						{name: '5달전', y: 410000},
						{name: '4달전', y: 510000},
						{name: '3달전', y: 610000},
						{name: '2달전', y: 710000},
						{name: '1달전', y: 810000},
						{name: '오늘',  y: 910000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData5 = [
						{name: '1년전', y: 300000},
						{name: '11달전', y: 350000},
						{name: '10달전', y: 400000},
						{name: '9달전', y: 450000},
						{name: '8달전', y: 500000},
						{name: '7달전', y: 100000},
						{name: '6달전', y: 1500000},
						{name: '5달전', y: 2000000},
						{name: '4달전', y: 2500000},
						{name: '3달전', y: 3000000},
						{name: '2달전', y: 3500000},
						{name: '1달전', y: 4000000},
						{name: '오늘',  y: 4500000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	Highcharts.chart('라인막대예금멀티그래프', {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			marginbottom : 50
			//,backgroundColor:'#00ABA2'
			, events:{
				load: function(){
					
					//min, max point에 동그라미 추가
					var chart= this,
						points = chart.series[1].points,
						maxValue,minValue,chosenPoint_max,chosenPoint_min;
					
					//최고점O출력
					points.forEach(function(point,index){
						if(!maxValue||maxValue<point.y){
							maxValue=point.y;
							chosenPoint_max=point;
						}
					});
					
					//마지막O출력
					chosenPoint_max = points[points.length-1];
					
					chosenPoint_max.update({
						marker:{
							enabled:true,
							radius: 4,
							fillColor:'rgb(0, 128, 255)',
							lineWidth:2,
							lineColor:'rgb(0, 128, 255)'
						}
					});
					
				}
			},
		},
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //Y 타이틀
	    xAxis: {
	    	//type: 'category'
	    	type: 'column'
	    	//,overflow:'justify'
			//,useHtml:true
	    	,tickInterval : 6
	    	//,startOnTick: true
	    	//,showFirstLabel : true
	    	//,endOnTick: true
	    	,tickLength : 0
	    	,labels: {
	    		enabled: true,
	    		//rotation: 45,
	    		formatter: function(){
	    			/* case1
	    			var bThreeMonthStep = graphData1[this.value].name%3 == 0;
	    			if(bThreeMonthStep){
	    				return graphData1[this.value].name;
	    			}
	    			return '';*/
	    			
	    			//case2
	    			var sName = graphData1[this.value].name;
	    			//if(sName == 12 || sName == 6 || sName == 2 || sName == 0){
	    			//	return graphData1[this.value].name + '달전';
	    			//} else {
	    			//	return "";
	    			//}
	    			return sName;
	    			
	    		}
	    	}
	    	, crosshair: true
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			return this.value;
	    			//return '';
	    		}
	    	}
	    	//,tickInterval : 100000000
	    	//,gridLineWidth:0
	    	//,enabled: true
	    },
	    
	    //툴팁박스
	    tooltip: {
	    	enabled : false,
			formatter: function () {
				var sMonth = graphData1[this.x].name;
				var sResult = "<b>" + this.series.name + "</b> : " + sMonth +  "  " + sbGetFormatAmt(this.y) +"</b>"; 
				return sResult;
		    }
	    	//, shared: true
		},
		
	    //x축 포인트 
	    plotOptions: {
	         line: {
	            marker: {
	            	radius: 4,
	            	//lineColor: '#666666',
	            	lineWidth: 1
	            }
				,events: {
					legendItemClick : function(e){
						console.log(this.name);
					}
				}
	        },
	        series: {
	        	animation:{
		    		duration: 2000
		    		//,easing: 'easeOutBounce'
		    	}
	        	,lineWidth: 1
	        }
			
	    },

	    //데이터 (총자산, 예금, 주식, 채권, 대체
	    series: [
	    {
	    	name : '예금1'
		        , data : graphData1
		        , type:'column'
		        //, colors:['#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#A6A6A6 alpha30%','#0080FF']
		        , marker : {
		    		//symbol: 'circle'
			    	enabled : false //마커사용안함
		    	}
		        ,color: 'rgba(166, 166, 166, 0.3)'
		    },
		    {
	    	name : '예금2'
	    	,lineWidth: 3
	        , data : graphData2
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(0, 128, 255, 1)'
	    },
	    {
	    	name : '주식'
	        , data : graphData3
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(255, 153, 153, 0.3)'
	    },
	    {
	    	name : '채권'
	        , data : graphData4
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(102, 204, 0, 0.3)'
	    },
	    {
	    	name : '대체'
	        , data : graphData5
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    	,color: 'rgba(204, 204, 0, 0.3)'
	    }]
	});
	
}

/**
 * 도넛그래프
 */
function fnc도넛그래프2(){

	//챠트셋팅
	Highcharts.chart('도넛그래프2', {
		credits:{enabled: false},
		colors: ["#6b8bac","#3163c5","#9ddaee","#17c3c9"],
	    chart: {
	        type: 'pie' //원형
	        //,animation : false
	    },
	    title: {
	        text: '' 
	    },
	    tooltip: {
	    	enabled : false
		},
	    subtitle: {
	        text: ''
	    },
	    plotOptions: {
	        pie: {
	        	allowPointSelect : false,
	        	cursor : 'pointer',//툴팁올렸을때, 손모양
	        	dataLabels:{
	    			enabled : false, //원형에 데이터 라벨표시여부
	    		},
	    		showInLegend: false //그래프하단 데이터 라벨 표시여부
	    		,events: {
	    			show : false
	    		}
	        }
	    	,series: {
	    		animation : {
		    		duration: 1000
		    	}
	    	}
	    },
	    series: [{
	    	type: 'pie', 
	        name: ' ',
	        size: '80%', //원형사이즈
	        innerSize :  '50%',//원형안사이즈
	        data: [{
	            name: '주식',
	            y: 10
	        }, {
	            name: '채권',
	            y: 20
	        }, {
	            name: '대체',
	            y: 30
	        }, {
	            name: '예금',
	            y: 50
	        }]
		    , events : {
	    		click: function(e){
	    			console.log(e.point.name);
	    		}
	    	}
	    }]
	});	
}

/**
 * 라인 그래프
 */
function fnc라인그래프(){

	var graphData = [
						{name: '5달전', y: 50000000},
						{name: '4달전', y: 110000000},
						{name: '3달전', y: 210000000},
						{name: '2달전', y: 430000000},
						{name: '오늘',  y: 650000000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									symbol: 'circle'
								}
						},
					];
	
	g라인그래프 = Highcharts.chart('라인그래프', {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		
		chart : {
			type : 'spline'
			, marginbottom : 50
			, events:{
				load: function(){
					//min, max point에 동그라미 추가
					var chart= this,
						points = chart.series[0].points,
						maxValue,minValue,chosenPoint_max,chosenPoint_min;
					
					points.forEach(function(point,index){
						if(!maxValue||maxValue<point.y){
							maxValue=point.y;
							chosenPoint_max=point;
						}
					});
					
					points.forEach(function(point,index){
						if(!minValue||minValue>point.y){
							minValue=point.y;
							chosenPoint_min=point;
						}
					});
					
					chosenPoint_max.update({
						marker:{
							enabled:true,
							radius: 7,
							fillColor:'rgb(255,0,0)',
							lineWidth:2,
							lineColor:'rgb(255,255,255)'
						}
					});
					
					chosenPoint_min.update({
						marker:{
							enabled:true,
							radius: 7,
							fillColor:'rgb(051, 102, 255)',
							lineWidth:2,
							lineColor:'rgb(255,255,255)'
						}
					});					
				}
			}
		},
		
		//선 색
		colors: ['#000000'],	
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //Y 타이틀
	    xAxis: {
	    	type: 'category'
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			//return this.value;
	    			return '';
	    		}
	    	}
	    },
	    
	    //툴팁박스
	    tooltip: { 
			formatter: function () {
				return this.series.name + " : <b>" + sbGetFormatAmt(this.y) +"</b>"; 
		    }
		},
		
	    //x축 포인트 
	    plotOptions: {
	         spline: {
	            marker: {
	            	radius: 4,
	            	//lineColor: '#666666',
	            	lineWidth: 1
	            }
	        }
	        
	    },

	    //데이터
	    series: [{
	    	name : '총자산'
	        , data : graphData
	        //, showInLegend : true
		    , marker : {
	    		symbol: 'circle'
		    	//enabled : false //마커사용안함
		    }
	    	, events : {
	    		click: function(e){
	    			console.log(e.point.name);
	    		}
	    	}
	    }]
	});
	
	fnc색변경팝업생성();
}

function fnc색변경팝업생성(){
	
	var o색깔 = [
	          {text: "검정색", code: "#000000"}
	          ,{text: "노랑색", code: "#f7e600"}
	          ,{text: "연두색", code: "#bfff00"}
	          ,{text: "살색", code: "#eee6c4"}
	          ,{text: "청색", code: "#3e91b5"}
	];
	
	sbSelectLayerPop("layer색깔변경", function(ret){
		g라인그래프.series[0].update({color:ret.code});	
	}, "그래프색깔변경", o색깔);
	
}

/**
 * 라인멀티 그래프
 */
function fnc라인멀티그래프(){

	var graphData1 = [
						{name: '1년전', y: 1000000},
						{name: '', y: 2000000},
						{name: '', y: 3000000},
						{name: '', y: 4000000},
						{name: '', y: 5000000},
						{name: '', y: 6000000},
						{name: '6달전', y: 7000000},
						{name: '2달전', y: 8000000},
						{name: '오늘',  y: 9000000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];

	var graphData2 = [
						{name: '1년전', y: 1000},
						{name: '', y: 2000},
						{name: '', y: 3000},
						{name: '', y: 4000},
						{name: '', y: 5000},
						{name: '', y: 6000},
						{name: '6달전', y: 7000},
						{name: '2달전', y: 8000},
						{name: '오늘',  y: 9000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData3 = [
						{name: '1년전', y: 2000},
						{name: '', y: 4000},
						{name: '', y: 6000},
						{name: '', y: 8000},
						{name: '', y: 10000},
						{name: '', y: 12000},
						{name: '6달전', y: 14000},
						{name: '2달전', y: 16000},
						{name: '오늘',  y: 18000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData4 = [
						{name: '1년전', y: 500},
						{name: '', y: 1000},
						{name: '', y: 2000},
						{name: '', y: 10000},
						{name: '', y: 5000},
						{name: '', y: 7000},
						{name: '6달전', y: 3000},
						{name: '2달전', y: 1000},
						{name: '오늘',  y: 10000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	var graphData5 = [
						{name: '1년전', y: -1000},
						{name: '', y: -10000},
						{name: '', y: -30000},
						{name: '', y: 50000},
						{name: '', y: 500000},
						{name: '', y: 300000},
						{name: '6달전', y: 1000000},
						{name: '2달전', y: 12000000},
						{name: '오늘',  y: 15000000,
								marker: {
									//symbol: 'url(/images/in01/img_icon_grey_bulb.png)'	
									//symbol: 'circle'
								}
						},
					];
	
	g라인멀티그래프 = Highcharts.chart('라인멀티그래프', {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			type : 'spline'
			, marginbottom : 50
			//,backgroundColor:'#00ABA2'
		},
		
		//선색
		colors: ['#000000', '#f7e600', '#bfff00', '#eee6c4', '#3e91b5'],	
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //Y 타이틀
	    xAxis: {
	    	type: 'category'
	    	, crosshair: true
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			//return this.value;
	    			return '';
	    		}
	    	}
	    },
	    
	    //툴팁박스
	    tooltip: { 
			formatter: function () {
				return this.series.name + " : <b>" + sbGetFormatAmt(this.y) +"</b>"; 
		    }
	    	//, shared: true
		},
		
	    //x축 포인트 
	    plotOptions: {
	         spline: {
	            marker: {
	            	radius: 4,
	            	//lineColor: '#666666',
	            	lineWidth: 1
	            }
				,events: {
					legendItemClick : function(e){
						console.log(this.name);
					}
				}
	        }
	    },

	    //데이터 (총자산, 예금, 주식, 채권, 대체
	    series: [{
	    	name : '총자산'
	        , data : graphData1
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    },
	    {
	    	name : '예금'
	        , data : graphData2
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    },
	    {
	    	name : '주식'
	        , data : graphData3
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    },
	    {
	    	name : '채권'
	        , data : graphData4
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    },
	    {
	    	name : '대체'
	        , data : graphData5
	        , marker : {
	    		//symbol: 'circle'
		    	enabled : false //마커사용안함
	    	}
	    }]
	});
	
	fnc색변경팝업생성2();
}

function fnc색변경팝업생성2(){
	
	var o색깔 = [
	          {text: "검정색", code: "#000000"}
	          ,{text: "노랑색", code: "#f7e600"}
	          ,{text: "연두색", code: "#bfff00"}
	          ,{text: "살색", code: "#eee6c4"}
	          ,{text: "청색", code: "#3e91b5"}
	];
	
	var o색고르지마랜덤변경 = [
	                   {text: "색고르지마 랜덤변경", "code": ""}
	                   ];
	
	sbSelectLayerPop("layer색깔변경2", function(ret){
	
		o색깔.sort(function(a, b){
			return .5 - Math.random();
		});
		
		g라인멀티그래프.series.forEach(function(item, index){
			
			var sColor = o색깔[index].code;
			g라인멀티그래프.series[index].update({color:sColor});
		});
		
	}, "그래프색깔변경2", o색고르지마랜덤변경);
	
}

/**
 * 도넛그래프
 */
function fnc도넛그래프(){

	//챠트셋팅
	Highcharts.chart('도넛그래프', {
		credits:{enabled: false},
		colors: ["#6b8bac","#3163c5","#9ddaee","#17c3c9"],
	    chart: {
	        type: 'pie' //원형
	    },
	    title: {
	        text: '' 
	    },
	    tooltip: {
			formatter: function () {
				//series.data.name
				return this.series.data[this.point.x].name + ' <b>' + this.y +'%</b>'
		    }
		},
	    subtitle: {
	        text: ''
	    },
	    legend: {
	    	align: "right",
	    	verticalAlign: "middle",
	    	layout: "vertical",
	    	format: "{point.value}"
	    },
	    plotOptions: {
	        pie: {
	        	allowPointSelect : true ,
	        	cursor : 'pointer',//툴팁올렸을때, 손모양
	        	dataLabels:{
	    			enabled : false, //원형에 데이터 라벨표시여부
	    			/* 원형위에 라벨 출력 테스트, enabled : true 시 출력
	    			distance: -35,
	    			formatter:function(){
	    				var pcnt = (this.y);
	    				return pcnt == 0 ? "" : Highcharts.numberFormat(pcnt, 0)  + "%";
	    			}*/
	    		},
	    		showInLegend: true //그래프하단 데이터 라벨 표시여부 
	        }
	    },
	    series: [{
	    	type: 'pie', 
	        name: ' ',
	        size: '80%', //원형사이즈
	        innerSize :  '40%',//원형안사이즈
	        data: [{
	            name: '주식',
	            y: 0
	        }, {
	            name: '채권',
	            y: 0.91
	        }, {
	            name: '대체',
	            y: 10.38
	        }, {
	            name: '예금',
	            y: 4.77
	        }]
		    , events : {
	    		click: function(e){
	    			console.log(e.point.name);
	    		}
	    	}
	    }]
	});	
}

/**
 * 선 그래프(곡선형)
 */
function fnc선그래프(){
	
	Highcharts.chart('선그래프', {
		credits:{
				enabled: false
		},
		
		chart : {
			type : 'spline'
			, marginbottom : 50
		},
		
		//선 색
		colors: ['#da6f52','#4d94de'],	
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //Y 타이틀
	    yAxis: {
	        title: {
	            text: ''
	        }
		    , labels : {
	    		format : '{value:,1f}' //소수점 1자리사용
	    	}
	    },
	    
	    //툴팁박스
	    tooltip: { 
			formatter: function () {
				return this.series.name + "  <b>" + this.y +"%</b>"; 
		    }
		},
		
		//x축 값
		xAxis: {
	        type: 'datetime', //시간
	        labels: {
	            overflow: 'justify'
	        }
	    },
	    
	    //x축 포인트 
	    plotOptions: {
	         spline: {
	            lineWidth: 4,
	            states: {
	                hover: {
	                    lineWidth: 5
	                }
	            },
	            marker: {
	                enabled: true //마크표시
	            },
	            pointInterval: 3600000*24*30, // 30일 기준
	            pointStart: Date.UTC(2018, 6, 1, 0, 0, 0) //시작일
	        }
	    },
	    
	    //데이터
	    series: [{
	        name: '적금',
	        data: [0.12, 1.25, 1.35, 2.00, 1.98,  1.87,  2.50,  2.10]
	    	, marker : {
	    		enabled : false //마커사용안함
	    	} 
	    }, {
	        name: '예금',
	        data: [1.12, 2.25, 3.35, 1.00, 0.98,  0.87,  0.50,  0.10]
		    , marker : {
	    		symbol: 'circle' //마커 동그라미 (그외 diamond, square 등이 있음)
	    	} 
	    }]
	});
}

/**
 * 원형 그래프
 */
function fncPieChart(){
	//챠트셋팅
	Highcharts.chart('chartAreaPie', {
		credits:{enabled: false},
		colors: ["#6b8bac","#3163c5","#9ddaee","#17c3c9","#97cf5b","#4d94de"],
	    chart: {
	        type: 'pie' //원형
	    },
	    title: {
	        text: '' 
	    },
	    tooltip: {
			formatter: function () {
				//series.data.name
				return this.series.data[this.point.x].name + ' <b>' + this.y +'%</b>'
		    }
		},
	    subtitle: {
	        text: ''
	    },
	    plotOptions: {
	        pie: {
	        	allowPointSelect : true ,
	        	cursor : 'pointer',//툴팁올렸을때, 손모양
	        	dataLabels:{
	    			enabled : true //원형에 데이터 라벨표시여부
	    		},
	    		showInLegend: true //그래프하단 데이터 라벨 표시여부 
	        }
	    },
	    series: [{
	    	type: 'pie', 
	        name: ' ',
	        size: '50%', //원형사이즈
	        data: [{
	            name: '해외이머징',
	            y: 0.2
	        }, {
	            name: '해외선진',
	            y: 0.91
	        }, {
	            name: '국내주식',
	            y: 10.38
	        }, {
	            name: '해외채권',
	            y: 4.77
	        }, {
	            name: '국내채권',
	            y: 24.03
	        }, {
	            name: '예금유동성',
	            y:  56.33
	        }]
	    }]
	});	
}

 
/**
 * 반원 그래프
 */
function fncSemiCircleChart(){
	//데이터 셋팅후 표시할 경우
	var chartColorArr =[];
		chartColorArr.push("#9ddaee");//주식형
		chartColorArr.push("#4d94de");//채권형
	
	var chartDataArr = [];
		chartDataArr.push(["주식", 30]);
		chartDataArr.push(["채권", 70]);
	
	Highcharts.chart('chartAreaSemiCircle', {		
		credits:{enabled: false},
		colors: chartColorArr,
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: 0,
	        plotShadow: false,
	        marginTop : -35,
	        marginBottom : -40
	    },
	    title: {
	        text: '펀드비중',
	        align: 'center',
	        verticalAlign: 'middle',
	        y: 40
	    },
	    tooltip: {
  		  formatter: function () {
		          return this.series.data[this.point.x].name + ' <b>' + this.y +'%</b>'
		      }
		},
	    plotOptions: {
	        pie: {
	            dataLabels: {
	                enabled: true,
	                distance: -35,
	                style: {
	                    fontWeight: 'bold',
	                    color: 'white'
	                }
	            },
	            startAngle: -90,
	            endAngle: 90,
	            center: ['50%', '75%']
	        }
	    },
	    series: [{
	        type: 'pie',
	        name: '',
	        innerSize: '50%',
	        data: [
	        	chartDataArr[0],
	        	chartDataArr[1]
	          
	        ]
	    }]
	});
}


/**
 * 도넛 그래프
 */
function fncDonutChart(){

	//챠트셋팅
	Highcharts.chart('chartAreaDonut', {
		credits:{enabled: false},
		colors: ["#6b8bac","#3163c5","#9ddaee","#17c3c9","#97cf5b","#4d94de"],
	    chart: {
	        type: 'pie' //원형
	    },
	    title: {
	        text: '' 
	    },
	    tooltip: {
			formatter: function () {
				//series.data.name
				return this.series.data[this.point.x].name + ' <b>' + this.y +'%</b>'
		    }
		},
	    subtitle: {
	        text: ''
	    },
	    plotOptions: {
	        pie: {
	        	allowPointSelect : true ,
	        	cursor : 'pointer',//툴팁올렸을때, 손모양
	        	dataLabels:{
	    			enabled : true //원형에 데이터 라벨표시여부
	    		},
	    		showInLegend: true //그래프하단 데이터 라벨 표시여부 
	        }
	    },
	    series: [{
	    	type: 'pie', 
	        name: ' ',
	        size: '80%', //원형사이즈
	        innerSize :  '40%',//원형안사이즈
	        data: [{
	            name: '해외이머징',
	            y: 0.2
	        }, {
	            name: '해외선진',
	            y: 0.91
	        }, {
	            name: '국내주식',
	            y: 10.38
	        }, {
	            name: '해외채권',
	            y: 4.77
	        }, {
	            name: '국내채권',
	            y: 24.03
	        }, {
	            name: '예금유동성',
	            y:  56.33
	        }]
	    }]
	});	
}

/**
 * 퍼센트 그래프 ( 글라이더 패스 같은 형태)
 */
function fncPercentChart(){
	Highcharts.chart('chartAreaPercentage', {
		credits:{ enabled: false},		
		colors : ['#64a6e5', '#97cf5b', '#9ddaee'], //데이터 배경색
	    chart: {
	        type: 'area' //공간
	    },
	    title: {
	        text: '' //제목
	    },
	    subtitle: {
	        text: '' //서브제목
	    },
	    xAxis: {
	        categories: ['2013', '2014', '2015', '2016', '2017', '2018', '2019'], // x축데이터
	        tickmarkPlacement: 'on',
	        title: {
	            enabled: false //x축제목 사용여부
	        },
	        //x축 기준으로 라인그릴때,
	        plotLines :[{
	        	width : 2, //선두께 
	        	value : 2.1, //위치 (x축을 기준으로 구간값에 의해  위치가 찍힘  ex) 1 2013~2014 , 2 => 2014~2015 )
	        	color: "#1150c5" //선색 
	        },{
	        	width : 2,
	        	value : 5,
	        	color: '#777777'
	        }]
	    },
	    yAxis: {
	        title: {
	            text: '' //y축 제목
	        }
	    },
	    //툴팁 (마우스를 올렸을때, 풍선도움말같은 형태)
	    tooltip: {
	        pointFormat: '{series.name} <b>{point.percentage:.2f}%</b>', // 소수점 2자리까지 표시
	        split: true
	    },
	    //하단에 데이터의 제목 및 색상 표시가이드 표시 여부
	    legend: {
	    	enabled:false
	    },
	    plotOptions: {
	        //공간 디자인 영역
	    	area: {
	            stacking: 'percent',
	            lineColor: '#ffffff', //선색(분리된 영역라인색)
	            lineWidth: 1, //선두께
	            marker: {
	                lineWidth: 1,
	                lineColor: '#ffffff' //마커색
	            }
	        },
	        series:{
	        	label:{
	        		connectorAllowed:false,
	        		enabled:false, //공간영역에 라벨타이틀 사용안함
	        		pointStart:0,
	        		type:'series'
	        	},
	    		marker:{
	    			enabled:false, //마커표시안함
	    			symbol: 'circle'
	    		}
	        }
	    },
	    series: [{
	        name: '예금',
	        data:  [502, 635, 809, 947, 1402, 3634, 528]
	    }, {
	        name: '채권',
	        data:  [106, 107, 111, 133, 221, 767, 1766]
	    }, {
	        name: '주식',
	        data: [163, 203, 276, 408, 547, 729, 628]
	    }]
	});	
}


/**
 * 막대그래프 (가로형)
 */
function fncBarChart(){
	Highcharts.chart('chartAreaBar', {
	    chart: {
	        type: 'bar'
	    },
	    credits:{
			enabled: false
		},
	    title: {
	        text: ''
	    },
	    xAxis: {
	        categories: ['총자산']
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: ''
	        }
	    },
	    legend: {
	        reversed: true
	    },
	    plotOptions: {
	        series: {
	            stacking: 'normal'
	        }
	    },
	    series: [{
	        name: '예금',
	        data: [5]
	    }, {
	        name: '채권',
	        data: [2]
	    }, {
	        name: '주식',
	        data: [3]
	    }]
	});
}


/**
 * 막대그래프 (세로형)
 */
function fncColumnChart(){
	Highcharts.chart('chartAreaColumn', {
		credits:{
			enabled: false
		},
		chart: {
	        type: 'column'
	    },
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	        categories: ['2018', '2019'],
	        crosshair: true
	    },
	    yAxis: {
	        min: 0, 
	        title: {
	            text: ''
	        }
	    },
	    //툴팁
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true //html허용
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.1, //그래프당 공백
	            borderWidth: 0 //라인
	        }
	    },
	    series: [{
	        name: '예금',
	        data: [50.1, 71.5]

	    }, {
	        name: '채권',
	        data: [25.9, 78.8]

	    }, {
	        name: '주식',
	        data: [48.9, 38.8]

	    }]
	});	
}

/**
 * 선 그래프(기본형)
 */
function fncLineChart(){
	//라인챠트
	Highcharts.chart('chartAreaLine', {
		//하이챠트로그표시여부
		credits:{
				enabled: false
		},
		
		//선 색
		colors: ['#da6f52','#4d94de'],	
		
		//그래프제목
	    title: {
	        text: '예/적금 이율'
	    },
	    
	    subtitle: {
	        text: '현재 공시율입니다.'
	    },
	    
	    //Y 타이틀
	    yAxis: {
	        title: {
	            text: '이율'
	        }
	    },
	    
	    //x축 포인트 
	    plotOptions: {
	        series: {
	            label: {
	                connectorAllowed: false
	            },
	            pointStart: 2010
	        }
	    },
	    
	    //데이터
	    series: [{
	        name: '적금',
	        data: [0.12, 1.25, 1.35, 2.00, 1.98,  1.87,  2.50,  2.10]
	    	, marker : {
	    		symbol: 'circle'
	    	} 
	    }, {
	        name: '예금',
	        data: [1.12, 2.25, 3.35, 1.00, 0.98,  0.87,  0.50,  0.10]
		    , marker : {
	    		symbol: 'circle'
	    	} 
	    }],

	    responsive: {
	        rules: [{
	            condition: {
	                maxWidth: 500
	            },
	            chartOptions: {
	                legend: {
	                    layout: 'horizontal',
	                    align: 'center',
	                    verticalAlign: 'bottom'
	                }
	            }
	        }]
	    }

	});
}


/**
 * 선 그래프(곡선형)
 */
function fncSplineChart(){
	Highcharts.chart('chartAreaSpline', {
		credits:{
				enabled: false
		},
		
		chart : {
			type : 'spline'
			, marginbottom : 50
		},
		
		//선 색
		colors: ['#da6f52','#4d94de'],	
		
		//그래프제목
	    title: {
	        text: '예/적금 이율'
	    },
	    
	    subtitle: {
	        text: '현재 공시율입니다.'
	    },
	    
	    //Y 타이틀
	    yAxis: {
	        title: {
	            text: ''
	        }
		    , labels : {
	    		format : '{value:,1f}' //소수점 1자리사용
	    	}
	    },
	    
	    //툴팁박스
	    tooltip: { 
			formatter: function () {
				return this.series.name + "  <b>" + this.y +"%</b>"; 
		    }
		},
		
		//x축 값
		xAxis: {
	        type: 'datetime', //시간
	        labels: {
	            overflow: 'justify'
	        }
	    },
	    
	    //x축 포인트 
	    plotOptions: {
	         spline: {
	            lineWidth: 4,
	            states: {
	                hover: {
	                    lineWidth: 5
	                }
	            },
	            marker: {
	                enabled: true //마크표시
	            },
	            pointInterval: 3600000*24*30, // 30일 기준
	            pointStart: Date.UTC(2018, 6, 1, 0, 0, 0) //시작일
	        }
	    },
	    
	    //데이터
	    series: [{
	        name: '적금',
	        data: [0.12, 1.25, 1.35, 2.00, 1.98,  1.87,  2.50,  2.10]
	    	, marker : {
	    		enabled : false //마커사용안함
	    	} 
	    }, {
	        name: '예금',
	        data: [1.12, 2.25, 3.35, 1.00, 0.98,  0.87,  0.50,  0.10]
		    , marker : {
	    		symbol: 'circle' //마커 동그라미 (그외 diamond, square 등이 있음)
	    	} 
	    }]
	});
}


/**
 * 선 그래프(방사형)
 */
function fncSpiderChart(){

	Highcharts.chart('chartAreaSpider', {
		credits:{
			enabled: false
		},
		//차트형태
	    chart: {
	        polar: true,
	        type: 'line'
	    },
	    //선 색
		colors: ['#da6f52','#4d94de'],	
	    //제목
	    title: {
	        text: '',
	        x: -80 //x축
	    },
	    
	    //방사형사이즈
	    pane: {
	        size: '80%'
	    },
	    
	    //x축
	    xAxis: {
	        categories: ['예금유동성', '국내채권', '해외채권', '국내주식', '해외선진', '해외이머징'],
	        tickmarkPlacement: 'on', //x축 문자열 선 중앙에 표시
	        lineWidth: 0
	    },
	    //y축
	    yAxis: {
	        gridLineInterpolation: 'polygon', //다각형
	        lineWidth: 0,
	        min: 0 //최소 0
	    },
	    
	    //툴팁
	    tooltip: {
	         formatter: function () {
	            return this.x + ' <b>' + this.y +'%</b>' 
	        }
	    },
	    
	    //라인별 타이틀 위치
	    legend: {
	        align: 'right',
	        verticalAlign: 'top',
	        y: 70,
	        layout: 'vertical'
	    },
	    
	    //포인터표시
	    plotOptions:{
	    	series:{
	    		marker:{
	    			fillColor:"transparent"  //포인터 색상 :투명라인
	    		}
	    	}
	    },
	    //데이터
	    series: [{
	    	type: 'area',
	        name: '2018',
	        data: [43, 19, 60, 35, 17, 10],
	        pointPlacement: 'on' //선 과 선중앙에 표시 
	    }, {
	        name: '2019',
	        data: [50, 39, 42, 31, 26, 14],
	        pointPlacement: 'on'	        
	    }]
	});	
}

var goTempData= {
	    "body": {
	        "과거환율리스트": "SUCCESS",
	        "조회내역": [
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201029",
	                    "매매기준율": 1119.45
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201030",
	                    "매매기준율": 1100.44
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201031",
	                    "매매기준율": 1139.40
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201101",
	                    "매매기준율": 1119.42
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201102",
	                    "매매기준율": 1110.45
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201103",
	                    "매매기준율": 1119.40
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201104",
	                    "매매기준율": 1127.47
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201105",
	                    "매매기준율": 1110.45
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201106",
	                    "매매기준율": 1179.36
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201107",
	                    "매매기준율": 1280.48
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201108",
	                    "매매기준율": 1333.25
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201109",
	                    "매매기준율": 1392.43
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201110",
	                    "매매기준율": 1100.42
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201111",
	                    "매매기준율": 1009.40
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201112",
	                    "매매기준율": 1009.22
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201113",
	                    "매매기준율": 1019.45
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201114",
	                    "매매기준율": 1019.48
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201115",
	                    "매매기준율": 1109.44
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201116",
	                    "매매기준율": 1119.45
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201117",
	                    "매매기준율": 1129.48
	                }
	            },
	            {
	                "R_SUPF0000_1": {
	                    "고시일자": "20201118",
	                    "매매기준율": 1200.825  //1200.825
	                }
	            }
	            
	           
	            
	        ],

	        "차주전망리스트": [
	            {
	                "R_SUPF0000_2": {
	                    "기준일자": "20201119",
	                    "전망고점최고환율": 1125.55,
	                    "전망고점최저환율": 1123.45,
	                    "상승확률":53,
	                    "전망저점최고환율": 1114.76,
	                    "전망저점최저환율": 1113.88,
	                    "하락확률": 47,
	                    "예측코드": 1
	                }
	            },
	            {
	                "R_SUPF0000_2": {
	                    "기준일자": "20201120",
	                    "전망고점최고환율": 1226.55,
	                    "전망고점최저환율": 1222.45,
	                    "상승확률":23,
	                    "전망저점최고환율": 1113.76,
	                    "전망저점최저환율": 1112.88,
	                    "하락확률": 41,
	                    "예측코드": 1
	                }
	            },
	            {
	                "R_SUPF0000_2": {
	                    "기준일자": "20201121",
	                    "전망고점최고환율": 1135.56,
	                    "전망고점최저환율": 1133.44,
	                    "상승확률":28,
	                    "전망저점최고환율": 1124.72,
	                    "전망저점최저환율": 1120.88,
	                    "하락확률": 77,
	                    "예측코드": 2
	                }
	            },
	            {
	                "R_SUPF0000_2": {
	                    "기준일자": "20201122",
	                    "전망고점최고환율": 1101.55,
	                    "전망고점최저환율": 1100.45,
	                    "상승확률":33,
	                    "전망저점최고환율": 1004.76,
	                    "전망저점최저환율": 1001.88,
	                    "하락확률": 67,
	                    "예측코드": 2
	                }
	            },
	            {
	                "R_SUPF0000_2": {
	                    "기준일자": "20201123",
	                    "전망고점최고환율": 1322.55,
	                    "전망고점최저환율": 1320.45,
	                    "상승확률":43,
	                    "전망저점최고환율": 1104.76,
	                    "전망저점최저환율": 1103.88,
	                    "하락확률": 57,
	                    "예측코드": 2
	                }
	            },
	            {
	                "R_SUPF0000_2": {
	                    "기준일자": "20201124",
	                    "전망고점최고환율": 1115.25,
	                    "전망고점최저환율": 1113.25,
	                    "상승확률":50,
	                    "전망저점최고환율": 1103.76,
	                    "전망저점최저환율": 1101.76,
	                    "하락확률": 50,
	                    "예측코드": 3
	                }
	            },
	            {
	                "R_SUPF0000_2": {
	                    "기준일자": "20201125",
	                    "전망고점최고환율": 1007.55,
	                    "전망고점최저환율": 1003.45,
	                    "상승확률":26,
	                    "전망저점최고환율": 1002.76,
	                    "전망저점최저환율": 1001.88,
	                    "하락확률": 74,
	                    "예측코드": 2
	                }
	            }
	           
	            
	        ],
	        
	        "afterServletCall": 1605662709874,
	        "R_SUPF0000": {
	            "기준일자": "20201118",
	            "통화코드": "USD",
	            "매매기준율": 1120.5,
	            "증감액": 1120.5,
	            "증감률": 1120.5,
	            "전일전망성공여부": "Y",
	            "전일전망실제값비교코드": "0",
	            "차주전망통화코드": "USD",
	            "주별전망통화코드": "USD",
	            "반복횟수a": 249,
	            "반복횟수b": 7,
	            
	        }
	    },
	    "header": {
	        "result": "SUCCESS"
	    }
	};

function fncChartIN08120100001(){
	console.log("fncChartIN08120100001");
	console.log(goTempData);
	var oInfo = goTempData.body.R_SUPF0000;
	var aChartLabel_1= new Array();
	var aChartValue_1 = new Array();
	var aChartLabel_2= new Array();
	var aChartValue_2 = new Array();
	
	console.log(oInfo);
	if(oInfo.반복횟수b > 0){
		sbHideLoading();
		//전체
		
		var aList = sbFindJsonArray(goTempData,"R_SUPF0000_2");
		$.each(aList, function(idx, item){
			var s기준년도 = item.기준일자.substr(0, 4);
			var s기준월 = item.기준일자.substr(4, 2).replace(/^0/g, "") - 1 ;
			var s기준일자 = item.기준일자.substr(6, 2).replace(/^0/g, "");
			
			//console.log("날짜 체킹");
			//console.log(s기준년도);
			//console.log(s기준월);
			//console.log(s기준일자);
			
			aChartLabel_1.push(Date.UTC(s기준년도, s기준월, s기준일자));
			aChartLabel_2.push(Date.UTC(s기준년도, s기준월, s기준일자));
			
			var aLabel = [];
			
			aLabel.push(Date.UTC(s기준년도, s기준월, s기준일자));
			aLabel.push(parseFloat(item.전망고점최고환율));
			
			var bLabel=[];
			
			bLabel.push(parseFloat(item.전망고점최고환율));
			bLabel.push(parseFloat(item.전망고점최저환율));
			bLabel.push(parseFloat(item.상승확률));
			bLabel.push(parseFloat(item.전망저점최고환율));
			bLabel.push(parseFloat(item.전망저점최저환율));
			bLabel.push(parseFloat(item.하락확률));
			bLabel.push(parseFloat(item.예측코드));
			
								
			aChartValue_1.push(aLabel);
			aChartValue_2.push(bLabel);
		});
		fncDrawChartAI_1(aChartLabel_1, aChartValue_1);
		console.log('aChartValue_1');
		console.log(aChartValue_1);
		
	}
	else {
		sbHideLoading();
		
		alert("조회 결과가 없습니다.");
	}
	//console.log(bLabel);
	console.log("checking2-1::" +aChartLabel_1);
	console.log("checking2-1::"+aChartValue_1);
	
	console.log("checking2-2::" +aChartLabel_2);
	console.log("checking2-2::" +aChartValue_2);
	
			
}

//2번 차트:AI분석을 통한 환율 전망
function fncDrawChartAI_1(labels, values) {

	var chartAreaAIWidth = $("#chartAreaAI_1").width();
	var chartAreaAIHeight = 142; // TODO : 나중에 변경 처리 해야 함
    
	var chartInfo = Highcharts.chart('chartAreaAI_1',{
		chart : {
			backgroundColor:'#00ABA2',
			
			events:{
				load: function(){
					var chart= this,
						points = chart.series[0].points,
						maxValue,minValue,chosenPoint_max,chosenPoint_min;
					
					console.log(chart);
					console.log(chart.series[0]);
					console.log(chart.series[0].points[0]);
					
					
					console.log(chart.series[0].points[0]);
					var line = {
			    		color:"#4CC3BD",
			    		width:1,
			    		dashStyle: 'Dash'
			    		,value: chart.series[0].points[0].y
			    	};
					
					chart.yAxis[0].addPlotLine(line);
					
					points.forEach(function(point,index){
						if(!maxValue||maxValue<point.y){
							maxValue=point.y;
							chosenPoint_max=point;
						}
					});
					
					points.forEach(function(point,index){
						if(!minValue||minValue>point.y){
							minValue=point.y;
							chosenPoint_min=point;
						}
					});
					
					chosenPoint_max.update({
						marker:{
							enabled:true,
							radius: 3,
							fillColor:'#D84C4C',
							lineWidth:8,
							lineColor:'#D84C4C alpha40%'
						}
					});
					
					chosenPoint_min.update({
						marker:{
							enabled:true,
							radius: 3,
							fillColor:'#4C64D8',
							lineWidth:8,
							lineColor:'#4C64D8 alpha40%'
						}
					});
				},
			}
		},
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	    	type : 'datetime'
	    	, labels : {
	    		formatter : function() {
	    			return Highcharts.dateFormat('%Y-%m-%d', this.value);
	    		}
	    	}
	    	, tickPositions: [labels[0], labels[labels.length - 1]]
	    },
	    
	    yAxis: {
	    	
	        title: {
	          text: ''
	        }
	    	, labels : {
	    		format : '{value:,1f}'
	    	}
	    	
	    },
	    legend: {
	    	layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },
	    credits: {
	    	enabled: false
	    },
	    // 툴팁 다시하기
	    tooltip: {
	    	enabled:true
	    },
	    series:  [{
	    	type:'line',   
	    	lineWidth:1,
	    	color:'#FFFFFF',
	    		marker:{
	    		enabled:true,
	    		radius: 3,
				fillColor:'#FFFFFF',
				
	    	},
	    	
	    	data : values
	        , showInLegend : true
	        , marker : {
	        	enabled : false
	        }
	        },
	        {
		    	type:'column',
		    	lineWidth:0,
		    	colors:['#4C64D8','#D84C4C','#FFFFFF alpha30%','#FFFFFF alpha30%','#FFFFFF alpha30%','#FFFFFF alpha30%','#FFFFFF alpha30%'],
		    	colorByPoint:true,
		    	maker:{
		    		enabled:false
		    	},
		    	
		    	data : values
		        , showInLegend : true
		        , 
		        }]
	});
	
	//chartInfo.setSize(chartAreaAIWidth, chartAreaAIHeight, doAnimation = true);
} 

function fnc포트폴리오분석_기대변동성(sTarget, oData, sLabel, sColorRGB){
	
	var sLineRGB100 = "rgba(" + sColorRGB+ ", 1)";
	var sLineRGB10 = "rgba(" + sColorRGB+ ", 0.1)";
	var sLineRGB50 = "rgba(" + sColorRGB+ ", 0.5)";
	
	var marker = {};
	marker.enabled = true;
	marker.radius = 5;
	marker.fillColor = "rgb(255, 255, 255)";
	marker.lineWidth = 3;
	marker.lineColor = sLineRGB100;	
	marker.symbol = "diamond";	//circle, square, diamond, triangle, triangle-down
	
	var graphData = [
						{name: 0, y: 0,
							color:sLineRGB50,
							marker:marker},
						{name: 4, y: 0},
						{name: 6, y: 0},
						{name: 8, y: 0},
						{name: 10, y: 0},
						{name: 12, y: 0},
						{name: 14, y: 0},
						{name: 16, y: 0},
						{name: 18, y: 0},
						{name: 20,  y: 0,
							color:sLineRGB50,
							marker:marker
						},
					];
	
	$.each(oData, function(i, v){
		graphData[i].y = oData[i];
	});
	
	Highcharts.chart(sTarget, {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			marginbottom : 50
			, events:{
				load: function(){
				}
			},
			type: 'area'
		},
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //툴팁박스
	    tooltip: {
	    	enabled : false,
			formatter: function () {
				return "";
		    }
		},
		
	    xAxis: {
	    	type: 'column'
	    	//,startOnTick: true
	    	//,endOnTick:true
	    	,tickInterval : 3
	    	,tickLength : 0
	    	,labels: {
	    		enabled: true,
	    		formatter: function(){
	    			var sName = graphData[this.value].name;
	    			return sName;
	    			
	    		}
	    	}
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			return this.value;
	    			//return '';
	    		}
	    	}
	    	,startOnTick: false
	    	//,endOnTick:false
	    	,min: 0.0001
	    	//,tickInterval : 1000000000
	    	//,gridLineWidth:0
	    	//,enabled: true
	    },

	    //x축 포인트 
	    plotOptions: {
	        series: {
	        	animation:{
		    		duration: 2000
		    	}
	        	,lineWidth: 1
	        }
	    },
	    
	    series: [
		   {
	    	name : sLabel
	    	,fillColor : "rgba(50, 65, 122, 0.05)"
	    	,lineWidth: 3
	        , data : graphData
	        , colors : sLineRGB100
	        , marker : {
		    	enabled : false
		    	,symbol : "diamond"
	    	}
	    	,color: sLineRGB100
	    }]
	});
}

function fnc포트폴리오추천_수익률(sTarget, oData, sLabel, sColorRGB){
		
	var sLineRGB100 = "rgba(" + sColorRGB+ ", 1)";
	var sLineRGB10 = "rgba(" + sColorRGB+ ", 0.1)";
	var sLineRGB50 = "rgba(" + sColorRGB+ ", 0.5)";
	
	var marker = {};
	marker.enabled = true;
	marker.radius = 5;
	marker.fillColor = "rgb(255, 255, 255)";
	marker.lineWidth = 3;
	marker.lineColor = sLineRGB100;	
	
	var graphData = [
						{name: '4년전', y: 0,
							color:sLineRGB50,
							marker:marker},
						{name: '3년전', y: 0,
							color:sLineRGB50,
							marker:marker},
						{name: '2년전', y: 0,
							color:sLineRGB50,
							marker:marker},
						{name: '1년전', y: 0,
							color:sLineRGB50,
							marker:marker},
						{name: '현재',  y: 0,
							color:sLineRGB50,
							marker:marker
						},
					];
	
	$.each(oData, function(i, v){
		graphData[i].y = oData[i];
	});
	
	Highcharts.chart(sTarget, {
		
		credits:{
				enabled: false
		},
		
		//그래프 라벨 
		legend: {
			enabled: false
		},
		chart : {
			marginbottom : 50
			, events:{
				load: function(){
				}
			},
			type: 'area'
		},
		
		//그래프제목
	    title: {
	        text: ''
	    },
	    
	    subtitle: {
	        text: ''
	    },
	    
	    //툴팁박스
	    tooltip: {
	    	enabled : false,
			formatter: function () {
				return "";
		    }
		},
		
	    xAxis: {
	    	type: 'column'
	    	,tickInterval : 1
	    	,tickLength : 0
	    	,labels: {
	    		enabled: true,
	    		formatter: function(){
	    			var sName = graphData[this.value].name;
	    			return sName;
	    			
	    		}
	    	}
	    },
	    
	    yAxis: {
	    	title: {
	    		text: ''
	    	},
	    	labels: {
	    		formatter : function(){
	    			//return this.value;
	    			return '';
	    		}
	    	}
	    },

	    //x축 포인트 
	    plotOptions: {
	        series: {
	        	animation:{
		    		duration: 2000
		    	}
	        	,lineWidth: 1
	        }
	    },
	    
	    series: [
		   {
	    	name : sLabel
	    	,fillColor : "rgba(50, 65, 122, 0.05)"
	    	,lineWidth: 3
	        , data : graphData
	        , colors : sLineRGB100
	        , marker : {
		    	enabled : false
	    	}
	    	,color: sLineRGB100
	    }]
	});
}

function fncChartInit(){
	

	Highcharts.setOptions({
	  chart: {
			style: {
				fontFamily: 'shinhan, "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif'
			}
		}
	});
	/*
	'use strict';
	  (function(factory) {
	    if (typeof module === 'object' && module.exports) {
	      module.exports = factory;
	    } else {
	      factory(Highcharts);
	    }
	  }(function(Highcharts) {
	    (function(H) {
	      H.wrap(H.seriesTypes.column.prototype, 'translate', function(proceed) {
	        const options = this.options;
	        const topMargin = options.topMargin || 0;
	        const bottomMargin = options.bottomMargin || 0;

	        proceed.call(this);

	        H.each(this.points, function(point) {
	          if (options.borderRadiusTopLeft || options.borderRadiusTopRight || options.borderRadiusBottomRight || options.borderRadiusBottomLeft) {
	            const w = point.shapeArgs.width;
	            const h = point.shapeArgs.height;
	            const x = point.shapeArgs.x;
	            const y = point.shapeArgs.y;

	            let radiusTopLeft = H.relativeLength(options.borderRadiusTopLeft || 0, w);
	            let radiusTopRight = H.relativeLength(options.borderRadiusTopRight || 0, w);
	            let radiusBottomRight = H.relativeLength(options.borderRadiusBottomRight || 0, w);
	            let radiusBottomLeft = H.relativeLength(options.borderRadiusBottomLeft || 0, w);

	            const maxR = Math.min(w, h) / 2

	            radiusTopLeft = radiusTopLeft > maxR ? maxR : radiusTopLeft;
	            radiusTopRight = radiusTopRight > maxR ? maxR : radiusTopRight;
	            radiusBottomRight = radiusBottomRight > maxR ? maxR : radiusBottomRight;
	            radiusBottomLeft = radiusBottomLeft > maxR ? maxR : radiusBottomLeft;

	            point.dlBox = point.shapeArgs;

	            point.shapeType = 'path';
	            point.shapeArgs = {
	              d: [
	                'M', x + radiusTopLeft, y + topMargin,
	                'L', x + w - radiusTopRight, y + topMargin,
	                'C', x + w - radiusTopRight / 2, y, x + w, y + radiusTopRight / 2, x + w, y + radiusTopRight,
	                'L', x + w, y + h - radiusBottomRight,
	                'C', x + w, y + h - radiusBottomRight / 2, x + w - radiusBottomRight / 2, y + h, x + w - radiusBottomRight, y + h + bottomMargin,
	                'L', x + radiusBottomLeft, y + h + bottomMargin,
	                'C', x + radiusBottomLeft / 2, y + h, x, y + h - radiusBottomLeft / 2, x, y + h - radiusBottomLeft,
	                'L', x, y + radiusTopLeft,
	                'C', x, y + radiusTopLeft / 2, x + radiusTopLeft / 2, y, x + radiusTopLeft, y,
	                'Z'
	              ]
	            };
	          }

	        });
	      });
	    }(Highcharts));
	  }));	
	  */
}


















/**
 * 개발자는 공통함수 사용하세요 ========== 퍼블 제공하기위해 공통함수 옮겨놓음
 * sbPbWonToHanUnit -> sbWonToHanUnit
 */
function sbPbWonToHanUnit(strWon) {

    var strHan = "";

    if (strWon == "" || strWon == "0")
        return "0원";

    var len = strWon.length;
    if (len == 0)
        return "0원";

    strWon = sbPbTransMoney(strWon); // 콤마 제거
    
    if(Number(strWon) == 0){
  	  return "0원";
    }

    var arrBigUnit = new Array("", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정", "재", "극"); // 큰단위

    var nWonLen = strWon.length;
    var aWonfour = [];
    var nCnt = 0;
    
    if(nWonLen > 4){
  	 
  	  var iModWonLen = parseInt(nWonLen % 4 ,10);
	      
	      var iModWonLen2 = parseInt(nWonLen / 4 ,10);
	     
	      
	      var sRemoveWon = strWon;
	      for(var i=1; i<iModWonLen2+1; i++){
	    	  var nRemoveWonLen = sRemoveWon.length;
            var sFourWon = sRemoveWon.substr(nRemoveWonLen - 4 ,nRemoveWonLen);
            sRemoveWon = sRemoveWon.substr(0,nRemoveWonLen - 4);
            aWonfour[nCnt] = sFourWon;
            nCnt++;
	      }
	      
	      if(iModWonLen > 0){
	    	  aWonfour[nCnt] = strWon.substr(0,iModWonLen);
	      } 
    }else{
  	  aWonfour[nCnt] = strWon;
    }
    
    var sTotalWonAmt = "";
    if(aWonfour.length > 1){
  	  for(var i=0; i<aWonfour.length; i++){
  		  var sFourModWon = String(Number(aWonfour[i]));
  		  
  		  if(sFourModWon.length > 3){
  			  sFourModWon = sFourModWon.substr(0,1) +","+ sFourModWon.substr(1,4);
  		  } 
  		  
  		  if(i<1){
  			  if(Number(aWonfour[i]) > 0){
  			     sTotalWonAmt += sFourModWon;
  			  }
  			  //alert("sTotalWonAmt0>>>>>>>"+sTotalWonAmt);
  		  }else{	  
      		  if(Number(aWonfour[i]) > 0){
      			  if(sbPbIsNull(sTotalWonAmt)){
      				  sTotalWonAmt = sFourModWon + arrBigUnit[i];
      			  }else{    				  
      				  sTotalWonAmt = sFourModWon + arrBigUnit[i] +" "+ sTotalWonAmt;
      			  }
      			  
      		  }
  		  }
  	  }
    }else{
  	  var sFourModWon = String(Number(aWonfour[0]));
  	  
		  if(sFourModWon.length > 3){
			  sFourModWon = sFourModWon.substr(0,1) +","+ sFourModWon.substr(1,4);
		  } 
		  
  	  sTotalWonAmt += sFourModWon;
    }
    
    
    sTotalWonAmt += "원";
    

    return sTotalWonAmt;
    
    //alert("sTotalWonAmtEnd>>>>>>>"+sTotalWonAmt);
}

/**
 * 금액 콤마 제거
 * 
 * @param strMoney
 *            원본 String
 * 
 * @returns 변환된 문자열 리턴
 */
function sbPbTransMoney(strMoney) {

	var money;
	strMoney = sbPbGetStrValue(strMoney);
	if (strMoney == "") {
		money = "0";
	} else {
		money = sbPbReplaceAll(strMoney, ",");
	}

	return money;
}

/**
 * Null 값 제거(String)
 * 
 * @param strTemp
 * 
 * @returns String
 */
function sbPbGetStrValue(strTemp, defaulttext) {
	if (!strTemp) {
		if (typeof defaulttext != "undefined") {
			return defaulttext;
		} else {
			return "";
		}
	}

	return $.trim(strTemp);
}

/**
 * 문자 Replace All
 * 
 * @param strTemp
 *            원본 String
 * @param strOld
 *            교체대상 String
 * @param strNew
 *            교체이후 String
 * 
 * @returns 교체된 문자열 리턴
 */
function sbPbReplaceAll(strTemp, strOld, strNew) {

	var rtnValue = "";
	strTemp = sbGetStrValue(strTemp);

	if (strNew == null) {
		rtnValue = strTemp.replace(eval("/" + strOld + "/g"), "");
	} else {
		rtnValue = strTemp.replace(eval("/" + strOld + "/g"), strNew);
	}

	return rtnValue;
}

/**
 * Null 값 제거(String)
 * 
 * @param strTemp
 * 
 * @returns String
 */
function sbGetStrValue(strTemp, defaulttext) {
	if (!strTemp) {
		if (typeof defaulttext != "undefined") {
			return defaulttext;
		} else {
			return "";
		}
	}

	return $.trim(strTemp);
}

/**
 * null 체크함수
 * 
 * @param value
 *            체크할 파라미터(숫자, 문자열, object 등) 단, 0은 not null 처리
 * @return boolean
 */
function sbPbIsNull(value) {
	if(typeof value == 'undefined'){
		return true;
	}
	if (value == ""
		|| value == null
		|| value == undefined
		|| (value != null && typeof value == "object" && !Object
				.keys(value).length))
	{
		if (String(value) == String(0)) {
			return false;
		}
		return true;
	} else {
		return false;
	}
}

/**
 * 개발자는 공통함수 사용하세요 ========== 퍼블 제공하기위해 공통함수 옮겨놓음
 * sbPbWonToHanUnit -> sbWonToHanUnit
 */