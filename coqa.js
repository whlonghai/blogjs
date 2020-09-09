qa=[];q=[];a=[];
function checkqa(){
	if(document.getElementsByClassName("mt-0")[0].getElementsByTagName("pre")[0]==undefined) 
	for (tq=0;tq<document.getElementsByClassName("mt-0").length;tq++){
		q[tq]=document.getElementsByClassName("mt-0")[tq]
		if(qa[q[tq].innerText.replace(/(\n)|\s/gm, "").toLowerCase()]!=undefined){
		a[tq]=q[tq].parentElement.parentElement.getElementsByClassName("question-option")
			for (i=0;i<a[tq].length;i++){
				for(j=0;j<qa[q[tq].innerText.replace(/(\n)|\s/gm, "").toLowerCase()].length;j++){
				   if(a[tq][i].innerText.replace(/(\n)|\s/gm, "").toLowerCase()==qa[q[tq].innerText.replace(/(\n)|\s/gm, "").toLowerCase()][j])a[tq][i].style.color="red";
				}
			}
		}
	}else
	for (tq=0;tq<document.getElementsByClassName("mt-0").length;tq++){
	   q[tq]=document.getElementsByClassName("mt-0")[tq].getElementsByTagName("pre")[0]
		if(qa[q[tq].innerText.replace(/(\n)|\s/gm, "").toLowerCase()]!=undefined){
		a[tq]=q[tq].parentElement.parentElement.parentElement.getElementsByClassName("question-option")
			for (i=0;i<a[tq].length;i++){
				for(j=0;j<qa[q[tq].innerText.replace(/(\n)|\s/gm, "").toLowerCase()].length;j++){
				   if(a[tq][i].innerText.replace(/(\n)|\s/gm, "").toLowerCase()==qa[q[tq].innerText.replace(/(\n)|\s/gm, "").toLowerCase()][j])a[tq][i].style.color="red";
				}
			}
		}
	}
}
setTimeout(function() {checkqa()}, 5000);

