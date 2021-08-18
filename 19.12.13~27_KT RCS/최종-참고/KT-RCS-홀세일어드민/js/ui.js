$(document).ready(function() {
	$(".datepicker-here").data('datepicker');

	$(".layer-group").modal({
		show:false,
		backdrop:false
	});

	$(".table-box tr").on('click',function() {
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
	});

	$(".tab-group .tab-btn button").on('click',function() {
		var idx = $(this).index();

		$(this).parents("tab-group").find("tab-box").removeClass("on");
		$(this).parents("tab-group").find("tab-box:eq("+ idx + ")").addClass("on");
	});

	$(".tab-group .tab-btn input").on('click',function() {
		var idx = $(this).parent().index();

		console.log(idx);
		$(this).parents(".tab-group").find(".tab-box").removeClass("on");
		$(this).parents(".tab-group").find(".tab-box:eq("+ idx + ")").addClass("on");
	});

	$(document).on('click',".search-group.cpid-add-type button.add",function() {
		var tr_len = $(this).parents(".search-group").next(".table-box").find("tbody tr").length + 1;

		var cpid_add_type = '';
			cpid_add_type += '<tr>';
			cpid_add_type += '<td class="center">&nbsp;</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td>';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td class="center">';
			cpid_add_type += '<div class="select-box">';
			cpid_add_type += '<input type="text" id="" name="" value="">';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '<td>';
			cpid_add_type += '<div class="btn-group center">';
			cpid_add_type += '<button type="button" class="btn primary mg0" style="width:50px">저장</button>	';
			cpid_add_type += '<button type="button" class="btn remove" style="width:50px">삭제</button>	';
			cpid_add_type += '</div>';
			cpid_add_type += '</td>';
			cpid_add_type += '</tr>';

		$(this).parents(".search-group").next(".table-box").find("tbody").append(cpid_add_type);
	});

	$(document).on('click',".search-group.cpid-modify-type button.add",function() {
		var tr_len = $(this).parents(".search-group").next(".table-box").find("tbody tr").length + 1;

		var cpid_modify_type = '';
			cpid_modify_type +='<tr>';
			cpid_modify_type +='<td>';
			cpid_modify_type +='<input type="checkbox" id="chk1-1" name="" value="">';
			cpid_modify_type +='<label for="chk1-1"><i class="ico checkbox"></i></label>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">11</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" value="Kt2ktf_001">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" value="Asfd****">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" class="center" value="정상">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" value="123.123.251.21">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" class="center" value="정상">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" value="선릉 SDC">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td>';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" value="http://**.215.**42:8580/">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" class="center" value="50">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" class="center" value="50">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td class="center">';
			cpid_modify_type +='<div class="select-box">';
			cpid_modify_type +='<input type="text" id="" name="" class="center" value="과금">';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='<td>';
			cpid_modify_type +='<div class="btn-group center">';
			cpid_modify_type +='<button type="button" class="btn primary mg0" style="width:50px">저장</button>';
			cpid_modify_type +='<button type="button" class="btn remove" style="width:50px">삭제</button>	';
			cpid_modify_type +='</div>';
			cpid_modify_type +='</td>';
			cpid_modify_type +='</tr>';

			$(this).parents(".search-group").next(".table-box").find("tbody").append(cpid_modify_type);
	});

	$(document).on('click',".search-group.person-add-type button.add",function() {
		var tr_len = $(this).parents(".search-group").next(".table-box").find("tbody tr").length + 1;

		var person_add_type = '';
		person_add_type += '';
		person_add_type += '<tr>';
		person_add_type += '<td class="center">'+ tr_len +'</td>';
		person_add_type += '<td>';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '<td>';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '<td>';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '<td>';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '<td>';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '<td>';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '<td>';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '<td>';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '<td class="pd4-type">';
		person_add_type += '<div class="select-box">';
		person_add_type += '<input type="text" id="" name="" value="">';
		person_add_type += '</div>';
		person_add_type += '</td>';
		person_add_type += '</tr>';
		
		$(this).parents(".search-group").next(".table-box").find("tbody").append(person_add_type);
	});

	$(document).on('click',".table-box.add-type button.remove",function() {
		var tr_len = $(this).parents(".table-box").find("tbody tr").length - 1;

		if(tr_len >= 1) {
			$(this).parents("tr").remove();
		}
	});

	var pathes = $('.ct-series').find('path');
    pathes.each(function( i, path ) {
        var total_length = path.getTotalLength();
        path.style.strokeDasharray = total_length + " " + total_length;
        path.style.strokeDashoffset = total_length;
        $(path).animate({
            "strokeDashoffset" : 0
        }, 1500);
    });
});