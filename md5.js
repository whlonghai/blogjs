
//add buttion 1 lần
var taikhoan="";
var matkhau="";
dmnoidangky="";
dmndk=[];
function khoitao(){

$.get(window.location.origin+"/web_his/ds_noitiepnhan?_search=false&nd=1547738873909&rows=200000&page=1&sidx=&sord=asc").done(function( d ) {dmnoidangky=d;
for(i=0;i<dmnoidangky.length;i++){dmndk[dmnoidangky[i].MA_NOITIEPNHAN]=dmnoidangky[i].TEN_NOITIEPNHAN};
});
	
$("#tabtiepnhan").append('<div id="mod_bhyt_section"><div id="mod_bhyt_btn" style="float:right;"></div></div><div style="clear:both; margin: 5px; text-align: center;" id="mod_bhyt_message"><span id="statusMessage"><span id="part1" style="font-size:16px;"></span><span id="part2" style="color: rgb(0, 112, 192); font-weight:bold;text-align: left;"></span><span id="part3" style="color: rgb(0, 176, 105);"></span></span><div style="clear:both; margin-top: 0px; text-align: center;" id="mod_bhyt_lichsu_msg" /><div><input id="tmpnamsinh" style="display:none;"/><input id="tmptungay" style="display:none;"/><input id="tmpdenngay" style="display:none;"/><input id="tmpthoigian_du5namlientuc" style="display:none;"/></div>');

var script = document.createElement("script");
script.innerHTML = '$("#tmpnamsinh").on("click",function (){if($("#tmpnamsinh").val()!=""){$("#namsinh").val($("#tmpnamsinh").val());$("#namsinh").change();};if($("#tmptungay").val()!=""){$("#tungay").val($("#tmptungay").val());$("#tungay").change();};if($("#tmpdenngay").val()!=""){$("#denngay").val($("#tmpdenngay").val());$("#denngay").change();};if($("#tmpthoigian_du5namlientuc").val()!=""){$("#thoigian_du5namlientuc").val($("#tmpthoigian_du5namlientuc").val());$("#thoigian_du5namlientuc").change();};});';
document.head.appendChild(script);

$("#baohiem5nam_label").parent().append('<button id="mod_check_bhyt_hai" style="margin:3px; padding:5px; border-radius:2px;font-weight:bold;" type="button" class="btn_bh"><span class="glyphicon glyphicon-search"></span>Kiểm tra BHYT</button>');

$("body").append('<div id="mod_lichsuct" style="display:none;"><h1>Lịch sử 10 lần gần nhất (click bất kỳ trong bảng để thoát)</h1><table id="mod_lichsukcb"></table><table id="mod_lichsukt"></table></div>');
//ham xu ly
$("#mod_check_bhyt_hai").on("click",function (){if ($('#sobhyt').val().length==15&&$('#hoten').val()!="") checkthe();});
$('#sobhyt').keypress(function (e){if (e.keyCode==13&&$('#hoten').val()!=""&&$('#sobhyt').val().length==15) setTimeout(checkthe,500);});
$('#sobhyt').keyup(function (){
	if ($('#sobhyt').val().length<=16){
		if($('#sobhyt').val().length==16){resetTB();$("#part1").html("15+");}else {
		resetTB();$("#part1").html($('#sobhyt').val().length);
		}
}});
$('#hoten').keypress(function (e){if (e.keyCode==13&&$('#hoten').val()!=""&&$('#sobhyt').val().length==15) setTimeout(checkthe,500);});
$('#mayte').blur(resetBHYT);
$('#nhapsttbatso').keypress(resetBHYT);
$("#huy").on("click",resetBHYT);
$("#xoa").on("click",resetBHYT);
$("#luu").on("click",resetBHYT);
$("#capnhat").on("click",resetBHYT);
$("#themmoi").on("click",resetBHYT);
$("#list_dsbenhnhan").dblclick(resetBHYT);
$("#danhsachtiepnhan #list1").dblclick(resetBHYT);
$.get(window.location.origin+"/web_his/Cau_Hinh_Tham_So_XuatXMLBHYT",function(t){taikhoan=$(t).find("#motathamso123").val(),matkhau=md5($(t).find("#motathamso124").val())});
 console.log("Khởi tạo thành công");
}
function checkthe(){
console.log("START_Check BHYT");
resetBHYT();
if($("#sobhyt").val().length>15){
	$("#part1").html("Đang quét thẻ"); return 0;
}
var hoten=$("#hoten").val(),sobhyt=$("#sobhyt").val();
$('#mod_check_bhyt_hai').html("Đang KT ..."+sobhyt.slice(-3));
$('#mod_check_bhyt_hai').attr("disabled", true);
$("#chinamsinh").prop("checked")?namsinh=$("#namsinh").val().substring(6,10):namsinh=$("#namsinh").val();
if (namsinh==""||namsinh.search("d")!=-1||namsinh.search("m")!=-1||namsinh.search("y")!=-1) namsinh="1992";
		$.post( "https://egw.baohiemxahoi.gov.vn/api/token/take", { username: taikhoan, password:matkhau}).done(function( dtake ) {
			if(dtake.maKetQua==200){
				$.post("https://egw.baohiemxahoi.gov.vn/api/egw/NhanLichSuKCB2018?token="+dtake.APIKey.access_token+"&id_token="+dtake.APIKey.id_token+"&username="+taikhoan+"&password="+matkhau,{maThe:sobhyt,hoTen:hoten,ngaySinh:namsinh}).done(function( d ) {
					if(d.maKetQua=="003"&&d.maThe==d.maTheMoi){
							d.maKetQua="003.1";
							d.gtTheTu=d.gtTheTuMoi;
							d.gtTheDen=d.gtTheDenMoi;
						}
					$('#mod_check_bhyt_hai').html("Đã KT "+sobhyt.slice(0,3)+"..."+sobhyt.slice(-3));
					$('#mod_check_bhyt_hai').removeAttr("disabled");
					kqbh=dichketqua(d.maKetQua);
					if (d.maThe==null){
						var p1="<b>"+kqbh.msg+"! </b>";
						$("#part1").html(p1);
						setColorTrue(kqbh.kq);
						console.log("END_Không có thông tin thẻ chỉ hiện thông báo");
					}else{
						if(d.maKetQua=="070"){
								switch (d.ngaySinh.length){
									case 4: 
											$("#chinamsinh").prop("checked", true);$("#namsinh").val("01/01/"+d.ngaySinh);tempngaysinh="01/01/"+d.ngaySinh;break;
									case 7: 
											$("#chinamsinh").prop("checked", true);$("#namsinh").val("01/"+d.ngaySinh);tempngaysinh="01/"+d.ngaySinh;break;
									case 10:
											$("#chinamsinh").prop("checked", false);$("#namsinh").val(d.ngaySinh);tempngaysinh=d.ngaySinh;break;
									default : editColorTrue("#namsinh",1);
								}
								$("#tmpnamsinh").val(tempngaysinh);
								//$("#tmptungay").val(d.gtTheTu);
								//$("#tmpdenngay").val(d.gtTheDen);
								$("#tmpnamsinh").click()
								checkthe();
								return 0;
						}
							var p1="<b>"+kqbh.msg+'! </b>';
							var p2=d.ghiChu;
							var p3="";							
							if(d.maKetQua=="003"&&!$('#sobhyt').prop("disabled")&&d.maDKBD==d.maDKBDMoi){
								var p3= '<button id="nhapthemoi" class="btn" style="margin: 2px; padding: 2px 3px;">Nhập thẻ mới</button><button id="nhaphanmoi" class="btn" style="margin: 2px; padding: 2px 3px;">Nhập hạn mới</button>';
							}								
							
							$("#part1").html(p1);
							$("#part2").html(p2);
							$("#part3").html(p3);
							$("#nhapthemoi").on("click",function (){
								$("#sobhyt").val(d.maTheMoi);window.location = 'javascript:$("#sobhyt").keypress()';checkthe();return 0;
							});
							//kiem tra lich su kham
							var lichsu_msg="";
							var lichsu_num='  <span id="hienlichsu" style="cursor: pointer;text-decoration:underline;">';
							var lichsu_kcb="<caption>Lịch sửa khám bệnh</caption><tr><th>STT</th><th>Ngày vào viện</th><th>Ngày ra viện</th><th>Tên Bệnh</th><th>Tên CSKCB</th><th>Kết quả</th><th>Tình trạng</th></tr>";
							var lichsu_kt="<caption>Lịch sửa kiểm tra thẻ trong ngày</caption><tr><th>STT</th><th>User KT</th><th>Ngày kiểm tra</th><th>Mã thông báo</th><th>Thông báo</th></tr>";
							$("#mod_lichsukt").html("");
							$("#mod_lichsukcb").html("");
							if (d.dsLichSuKCB2018!=null){
								ls=dichlichsu(d.dsLichSuKCB2018[0].maCSKCB,d.dsLichSuKCB2018[0].ngayRa,d.dsLichSuKCB2018[0].tinhTrang,d.dsLichSuKCB2018[0].kqDieuTri,d.dsLichSuKCB2018[0].tenBenh);
								lichsu_msg=ls.msg;
								lichsu_num+='LSKB('+d.dsLichSuKCB2018.length+')';
							if(!ls.kq)$("#mod_bhyt_lichsu_msg").css("color","red");
							
							for (i=0;i<d.dsLichSuKCB2018.length&&i<10;i++){
									lichsu_kcb+=dichlichsuCT(d.dsLichSuKCB2018[i].maCSKCB,d.dsLichSuKCB2018[i].ngayVao,d.dsLichSuKCB2018[i].tinhTrang,d.dsLichSuKCB2018[i].kqDieuTri,d.dsLichSuKCB2018[i].tenBenh,d.dsLichSuKCB2018[i].ngayRa,i+1,dmndk[d.dsLichSuKCB2018[i].maCSKCB]);
									
								}
								//lichsu_kcb="";
								$("#mod_lichsukcb").html(lichsu_kcb);
							};
							if (d.dsLichSuKT2018!=null&&d.dsLichSuKT2018.length>0){
								lichsu_num+='LSKT('+d.dsLichSuKT2018.length+')';
								for (i=0;i<d.dsLichSuKT2018.length;i++){
								lichsu_kt+=dichlichsuKT(d.dsLichSuKT2018[i].userKT,d.dsLichSuKT2018[i].thoiGianKT,d.dsLichSuKT2018[i].maLoi,d.dsLichSuKT2018[i].thongBao,i+1);
								}
								$("#mod_lichsukt").html(lichsu_kt);
							};
							
							$("#mod_bhyt_lichsu_msg").html(lichsu_msg+lichsu_num+"</span>");
							if (d.dsLichSuKCB2018!=null){
							
									  $("#tencskcbls").prop('title',dmndk[d.dsLichSuKCB2018[0].maCSKCB]);
						
							}
							$("#hienlichsu").on("click",function(){$("#mod_lichsuct").show();$("body").css("overflow","hidden"); });
							$("#mod_lichsuct").on("click",function(){$("#mod_lichsuct").hide();$("body").css("overflow","scroll");});
							//chinh sua
							if(!$('#hoten').prop("disabled")){
								$("#hoten").val(d.hoTen.toUpperCase());
								//$("#sobhyt").val(d.maThe);window.location = 'javascript:$("#sobhyt").keypress()';$("#tungay").val(d.gtTheTu);$("#denngay").val(d.gtTheDen);$("#noidangky").val(d.maDKBD);
								
									  $("#noidangky_hienthi").val(dmndk[d.maDKBD]);
								
								if("Nam"==d.gioiTinh){
									$("#cbgioitinh").val("true");$("#gioitinh").val("1");
									
								}else {
									$("#cbgioitinh").val("false");$("#gioitinh").val("0");
								}
								switch (d.ngaySinh.length){
									case 4: 
											$("#chinamsinh").prop("checked", true);$("#namsinh").val("01/01/"+d.ngaySinh);tempngaysinh="01/01/"+d.ngaySinh;break;
									case 7: 
											$("#chinamsinh").prop("checked", true);$("#namsinh").val("01/"+d.ngaySinh);tempngaysinh="01/"+d.ngaySinh;break;
									case 10:
											$("#chinamsinh").prop("checked", false);$("#namsinh").val(d.ngaySinh);tempngaysinh=d.ngaySinh;break;
									default : editColorTrue("#namsinh",1);
								}				
								$("#diachi").val(d.diaChi);$("#manoidoituong").val(d.maKV);
								setColorTrue(kqbh.kq);
								console.log("END_Kiểm tra vừa chỉnh sửa hoàn tất");
								$("#tmpnamsinh").val(tempngaysinh);
								$("#tmptungay").val(d.gtTheTu);
								$("#tmpdenngay").val(d.gtTheDen);
								$("#tmpthoigian_du5namlientuc").val(d.ngayDu5Nam);
								$("#tmpnamsinh").click();
								$("#nhaphanmoi").on("click",function (){
								$("#tmpdenngay").val(d.gtTheDenMoi);
								$("#tmpnamsinh").click();
								$("#denngay").css("background","#a76e06");
								});
								//blockday("#tungay",$("#tungay").val());
								//blockday("#denngay",$("#denngay").val());
								//blockday("#namsinh",$("#namsinh").val());
							}else {
								$("#tungay").val()!=d.gtTheTu?editColorTrue("#tungay",0):editColorTrue("#tungay",1);
								$("#denngay").val()!=d.gtTheDen?editColorTrue("#denngay",0):editColorTrue("#denngay",1);
								$("#thoigian_du5namlientuc").val()!=d.ngayDu5Nam?editColorTrue("#thoigian_du5namlientuc",0):editColorTrue("#thoigian_du5namlientuc",1);
								$("#noidangky").val()!=d.maDKBD?editColorTrue("#noidangky",0):editColorTrue("#noidangky",1);
								$("#diachi").val()!=d.diaChi?editColorTrue("#diachi",0):editColorTrue("#diachi",1);
								$("#manoidoituong").val()!=d.maKV?editColorTrue("#manoidoituong",0):editColorTrue("#manoidoituong",1);
								if("Nam"==d.gioiTinh){
									($("#cbgioitinh").val()!="true"||$("#gioitinh").val()!="1")?editColorTrue("#cbgioitinh",0):editColorTrue("#cbgioitinh",1);
									
								}else {
									($("#cbgioitinh").val()!="false"||$("#gioitinh").val()!="0")?editColorTrue("#cbgioitinh",0):editColorTrue("#cbgioitinh",1);;
								}
								switch (d.ngaySinh.length){
									case 4: 
											(!$("#chinamsinh").prop("checked")||$("#namsinh").val().substring(6,10)!=d.ngaySinh)?editColorTrue("#namsinh",0):editColorTrue("#namsinh",1);break;
									case 7: 
											(!$("#chinamsinh").prop("checked")||$("#namsinh").val().substring(4,10)!=d.ngaySinh)?editColorTrue("#namsinh",0):editColorTrue("#namsinh",1);break;
									case 10:
											($("#chinamsinh").prop("checked")||$("#namsinh").val()!=d.ngaySinh)?editColorTrue("#namsinh",0):editColorTrue("#namsinh",1);break;
									default : editColorTrue("#namsinh",0);
								}
								
								if(kqbh.kq==1){
									$("#part1").css("color","darkgreen");
								}
								if(kqbh.kq==2){
									$("#part1").css("color","#a76e06");
								}
							console.log("END_Không mở sửa thông tin chỉ so khớp dữ liệu");
							}
						}
						//chinh mau
						
					}).fail( function (dfail){
							$("#part1").html("<b>Không nhận được thông tin thẻ từ cổng BHXH_Hiện tại không thể kiểm tra thẻ</b>");
							console.log("END_Không nhận được thông tin thẻ từ cổng BHXH");
							$('#mod_check_bhyt_hai').html("Không KT được");
							$('#mod_check_bhyt_hai').removeAttr("disabled");
							
							});
				
			}else {
				$("#part1").html("<b>Không đăng nhập được vào cổng BHXH_Hiện tại không thể kiểm tra thẻ</b>");
				console.log("END_Không đăng nhập được vào cổng BHXH");
				 $('#mod_check_bhyt_hai').html("Không KT được");
				 $('#mod_check_bhyt_hai').removeAttr("disabled");
			}
		}).fail( function (dfail){
			$("#part1").html("<b>Không kết nối được với cổng GDBHXH_Hiện tại không thể kiểm tra thẻ</b>");
			console.log("END_Lỗi không kết nối được cổng BHXH");
			$('#mod_check_bhyt_hai').html("Không KT được");
			$('#mod_check_bhyt_hai').removeAttr("disabled");
		});
}
  //0: sai thẻ -1:đúng -2:cảnh báo- 3:sai họ tên -4: xóa màu
  function setColorTrue(value){
		switch(value){
			case 0:{
			editColorTrue("#sobhyt",0);$("#part1").css("color","red");
			break;
			}
			case 1:{
			editColorTrue("#hoten",1);editColorTrue("#sobhyt",1);editColorTrue("#tungay",1);editColorTrue("#denngay",1);editColorTrue("#noidangky",1);editColorTrue("#cbgioitinh",1);editColorTrue("#namsinh",1);editColorTrue("#diachi",1);editColorTrue("#manoidoituong",1);$("#part1").css("color","darkgreen");
			editColorTrue("#thoigian_du5namlientuc",1);
			break;
			}
			case 2:{
			editColorTrue("#sobhyt",2);$("#part1").css("color","#a76e06");
			break;
			}
			case 3:{
			editColorTrue("#hoten",0);editColorTrue("#sobhyt",1);$("#part1").css("color","red");
			break;
			}
			default:{
			editColorTrue("#hoten");editColorTrue("#sobhyt");editColorTrue("#tungay");editColorTrue("#denngay");editColorTrue("#noidangky");editColorTrue("#cbgioitinh");editColorTrue("#namsinh");editColorTrue("#diachi");editColorTrue("#manoidoituong"); $("#part1").css("color","red");editColorTrue("#thoigian_du5namlientuc");
			}
		}
  }
  //0:sai - 1: đúng- 2: cảnh báo
  function editColorTrue(id,value){
	  switch (value){
	 case 0:
		$(id).css("background","#fbd2d2"); break;
	 case 1:
		$(id).css("background","#ddf5dd"); break; 		 
	 case 2:
		$(id).css("background","#f9d5a1"); break; 
	 default: $(id).css("background","");
	  }
	if(!$('#sobhyt').prop("disabled")){ setTimeout(function(){ $(id).css("background",""); }, 2000)};
  }
    //0: sai thẻ -1:đúng -2:cảnh báo- 3:sai họ tên
  function dichketqua (value){
	  switch (value){
		case "000": return {kq:1,msg:"Thẻ còn giá trị sử dụng"};
		case "001": return {kq:2,msg:"Thẻ do BHXH Bộ Quốc Phòng quản lý, đề nghị kiểm tra thẻ và thông tin giấy tờ tùy thân"};
		case "002": return {kq:2,msg:"Thẻ do BHXH Bộ Công An quản lý, đề nghị kiểm tra thẻ và thông tin giấy tờ tùy thân"};
		case "003": return {kq:2,msg:"Thẻ cũ hết giá trị sử dụng nhưng đã được cấp thẻ mới"};
		case "003.1": return {kq:2,msg:"Thẻ đã được gia hạn"};
		case "004": return {kq:1,msg:"Thẻ cũ còn giá trị sử dụng nhưng đã được cấp thẻ mới"};
		case "010": return {kq:0,msg:"Thẻ hết giá trị sử dụng"};
		case "051": return {kq:0,msg:"Mã thẻ không đúng"};
		case "052": return {kq:0,msg:"Mã tỉnh cấp thẻ(kí tự thứ 4,5 của mã thẻ) không đúng"};
		case "053": return {kq:0,msg:"Mã quyền lợi thẻ(kí tự thứ 3 của mã thẻ) không đúng"};
		case "050": return {kq:0,msg:"Không thấy thông tin thẻ bhyt"};
		case "060": return {kq:3,msg:"Thẻ sai họ tên"};
		case "061": return {kq:3,msg:"Thẻ sai họ tên(đúng kí tự đầu)"};
		case "070": return {kq:1,msg:"Thẻ sai ngày sinh"};
		case "100": return {kq:0,msg:"Lỗi khi lấy dữ liệu sổ thẻ"};
		case "101": return {kq:0,msg:"Lỗi server"};
		case "110": return {kq:0,msg:"Thẻ đã thu hồi"};
		case "120": return {kq:0,msg:"Thẻ đã báo giảm"};
		case "121": return {kq:0,msg:"Thẻ đã báo giảm. Giảm chuyển ngoại tỉnh"};
		case "122": return {kq:0,msg:"Thẻ đã báo giảm. Giảm chuyển nội tỉnh"};
		case "123": return {kq:0,msg:"Thẻ đã báo giảm. Thu hồi do tăng lại cùng đơn vị"};
		case "124": return {kq:0,msg:"Thẻ đã báo giảm. Ngừng tham gia"};
		case "130": return {kq:2,msg:"Trẻ em không xuất trình thẻ"};
		case "205": return {kq:0,msg:"Lỗi sai định dạng tham số truyền vào"};
		case "401": return {kq:0,msg:"Lỗi xác thực tài khoản"};
		default: return {kq:0,msg:"Không xác định"};
	  }
  
  }
  function dichlichsu(cskcb,ngayra,tinhtrang,ketqua,tenbenh){
	  tt=function(t) {switch (parseInt(t))
	  {case 1:return"Ra viện";case 2:return"Chuyển viện";case 3:return"Trốn viện";case 4:return"Xin ra viện";}
  }(tinhtrang);
	  kq=function(t) {switch (parseInt(t)){case 1:return"Khỏi";case 2:return"Đỡ";case 3:return"Không thay đổi";case 4:return"Nặng hơn";case 5:return"Tử vong";}}(ketqua);
	  dHT=new Date();
	  var dk="";
	  d="0"+dHT.getDate();d=d.slice(-2);
	  m="0"+(dHT.getMonth()+1);m=m.slice(-2);
	  y=dHT.getFullYear();
	  dHT=y+m+d;
  tenbenh.length>45?chidinh=tenbenh.substring(0,42)+"...)":chidinh=tenbenh+")";
	  if(dHT==ngayra.substring(0,8)){
		  return {msg:"<b>BN đã khám trong ngày lúc "+ngayra.substring(8,10)+":"+ngayra.substring(10,12)+"! </b>"+"(<b style='color: #a76e06;' id='tencskcbls'>"+cskcb+"</b> | "+kq+" | "+tt+" | "+chidinh,kq:0}
	  }else return {msg:"<b>Lần khám gần nhất "+ngayra.substring(6,8)+"/"+ngayra.substring(4,6)+"/"+ngayra.substring(0,4)+"</b> (<b style='color: #a76e06;' id='tencskcbls'>"+cskcb+"</b> | "+kq+" | "+tt+" | "+chidinh,kq:1}
	 
  }
  function dichlichsuCT(cskcb,ngayvao,tinhtrang,ketqua,tenbenh,ngayra,stt,tencskcb){
	  tt=function(t) {switch (parseInt(t))
	  {case 1:return"Ra viện";case 2:return"Chuyển viện";case 3:return"Trốn viện";case 4:return"Xin ra viện";}
  }(tinhtrang);
	  kq=function(t) {switch (parseInt(t)){case 1:return"Khỏi";case 2:return"Đỡ";case 3:return"Không thay đổi";case 4:return"Nặng hơn";case 5:return"Tử vong";}}(ketqua);
	  rs="<tr><td>"+stt+"</td><td>"+ngayvao.substring(6,8)+"/"+ngayvao.substring(4,6)+"/"+ngayvao.substring(0,4)+" "+ngayvao.substring(8,10)+":"+ngayvao.substring(10,12)+"</td>";
	  rs+="<td>"+ngayra.substring(6,8)+"/"+ngayra.substring(4,6)+"/"+ngayra.substring(0,4)+" "+ngayra.substring(8,10)+":"+ngayra.substring(10,12)+"</td>";
	  rs+="<td>"+tenbenh+"</td>";
	  //rs+="<td>"+cskcb+"</td>";
	  rs+="<td>"+cskcb+" - "+tencskcb+"</td>";
	  rs+="<td>"+kq+"</td>";
	  rs+="<td>"+tt+"</td></tr>";
	  return rs;
  }
  function dichlichsuKT(cskcb,thoigian,mathongbao,thongbao,stt){
	  rs="<tr><td>"+stt+"</td><td>"+cskcb+"</td>";
	  rs+="<td>"+thoigian.substring(6,8)+"/"+thoigian.substring(4,6)+"/"+thoigian.substring(0,4)+" "+thoigian.substring(8,10)+":"+thoigian.substring(10,12)+"</td>";
	  rs+="<td>"+mathongbao+" - "+dichketqua(mathongbao).msg+"</td>";
	  rs+="<td>"+thongbao+"</td></tr>";
	  return rs;
  }
  
  //Xóa màu-Xóa thông báo
  function resetBHYT(){
	  setColorTrue();
	  $("#mod_bhyt_lichsu_msg").css("color","green");
	  $("#mod_bhyt_lichsu_msg").html("<br/>");;
	  $("#part1").empty();
	  $("#part2").html("<br/>");
	  $("#part3").html("<br/>");
	   $('#mod_check_bhyt_hai').html("Kiểm tra BHYT");
	   $('#mod_check_bhyt_hai').removeAttr("disabled");
	  console.log("Reset BHYT");
  }
  function resetTB(){
	  $("#part1").empty();
	  $("#part2").html("<br/>");
	  $("#part3").html("<br/>");
	  $("#mod_bhyt_lichsu_msg").html("<br/>");;
  }
 //md5-------------------------------------------------
 /*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*global unescape, define, module */

;(function ($) {

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bit_rol (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5_cmn (q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
  }
  function md5_ff (a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }
  function md5_gg (a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }
  function md5_hh (a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5_ii (a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binl_md5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5_ff(a, b, c, d, x[i], 7, -680876936)
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5_gg(b, c, d, a, x[i], 20, -373897302)
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5_hh(d, a, b, c, x[i], 11, -358537222)
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5_ii(a, b, c, d, x[i], 6, -198630844)
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safe_add(a, olda)
      b = safe_add(b, oldb)
      c = safe_add(c, oldc)
      d = safe_add(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    for (i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    for (i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstr_md5 (s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstr_hmac_md5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binl_md5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hex_tab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hex_tab.charAt((x >>> 4) & 0x0F) +
      hex_tab.charAt(x & 0x0F)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstr_utf8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function raw_md5 (s) {
    return rstr_md5(str2rstr_utf8(s))
  }
  function hex_md5 (s) {
    return rstr2hex(raw_md5(s))
  }
  function raw_hmac_md5 (k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
  }
  function hex_hmac_md5 (k, d) {
    return rstr2hex(raw_hmac_md5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hex_md5(string)
      }
      return raw_md5(string)
    }
    if (!raw) {
      return hex_hmac_md5(key, string)
    }
    return raw_hmac_md5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
}(this))
//end md5----------------------------------------------------
