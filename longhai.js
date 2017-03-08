lastScrollTop=0;
var i=0;
function lhlear() {
   $("#checkbox").prop("checked", false);
   $("#wrapper").css("opacity",1);
	  $("#lhmenu").css("height","0px");
	  $("#lhmenu").css("display","none");
		$("body").css("overflow", "inherit");
		 $(".checkbox").css("margin-left", "0px");
	
}
shchatfbvl=true;
function shchatfb(){
	if(shchatfbvl){
	$("#shchatfb").attr('class','shchatfbat');
	$("#cfacebook").attr('class','shchatfb');shchatfbvl=false;
	}else {
		$("#shchatfb").attr('class','');
		$("#cfacebook").attr('class',' ');shchatfbvl=true;
	}
}
function lhcheckmn (){
  if(document.getElementById("checkbox").checked){
	     $("#wrapper").css("opacity",0.2);
		 $("#lhmenu").css("height","100%");
		 $("#lhmenu").css("display","block");
		 
		  $(".checkbox").css("margin-left", "200px");
		 
  }else {
	  $("#wrapper").css("opacity",1);
	  $("#lhmenu").css("height","0px");
	  $("#lhmenu").css("display","none");
		
		 $(".checkbox").css("margin-left", "0px");
  }
}
$(window).on('load', 
function (){
	$(window).scroll(function(event){
   var check=document.getElementById("checkbox").checked;
   var st = $(this).scrollTop();

if(st>lastScrollTop )
   {
     i=0;
	  $("#shchatfb").attr('class','shchatfbat');
	  $("#nutlike").attr('class', 'an');
   }
   else {
     i=1;
$("#shchatfb").attr('class','');
 $("#nutlike").attr('class', 'hien');
   }
	
//>hon top
	   if(i==0&&!check) {$(".checkbox").css("display","none");
	   $("#wrapper").css("opacity",1);
	   $("#lightnavigation").css("display","none"); 
	   }
	   else{$("#lightnavigation").css("display","block"); 
						$(".checkbox").css("display","block");
						}
	   
   lastScrollTop = st;
});	
});

showmn=false;
function showmenu(e,a){
	id="#show"+a;
	if(showmn){
		$(id).attr('class', 'showmenu');
		e.innerHTML="+";
		showmn=false;
	}
	else {
		$(id).attr('class', 'hidemenu');
		e.innerHTML="-";
		showmn=true;
	}
	
}
