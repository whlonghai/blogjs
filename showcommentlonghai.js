
var a_rc = 5;
var m_rc = true;
var n_rc = true;
var o_rc = 100;
var l_rc=20;
var l_rc2=38;
function showrecentcomments(e){
	for(var r=0;r<a_rc;r++){	
		var t,n=e.feed.entry[r];if(r==e.feed.entry.length)break;
		for(var i=0;i<n.link.length;i++)if("alternate"==n.link[i].rel){t=n.link[i].href;break}
		
		t=t.replace("#","#");
		var a=t.split("#");
		a=a[0];
		var c=a.split("/");
		c=c[5],c=c.split(".html"),c=c[0];var s=c.replace(/-/g," ");
		if(s.length>l_rc) ss1=s.substring(0,l_rc)+"...";else ss1=s;
		if(s.length>l_rc2) ss2=s.substring(0,l_rc2)+"...";else ss2=s;
		ss1=ss1.link(a);
		ss2=ss2.link(a);
		
		var o=n.published.$t,l=(o.substring(0,4),o.substring(5,7)),u=o.substring(8,10),m=new Array;
		var timercp='<abbr class="timeago" title="'+o+'"></abbr>';
		if("content"in n)var d=n.content.$t;
		else if("summary"in n)var d=n.summary.$t;
		else var d="";var v=/<\S[^>]*>/g;
		
		document.write('<div class="rcw-comments">');
		document.write('<div class="rcw-comment1">');
		document.write('<span class="author-rc"><a href="'+t+'">'+n.author[0].name.$t+"</a></span>");
		document.write(": ");
		if(d.length<o_rc){
			document.write("<i>&#8220;");
			document.write(d);
			document.write("&#8221;</i></div>");
		} else{
			document.write("<i>&#8220;");
			d=d.substring(0,o_rc);
			var w=d.lastIndexOf(" ");
			d=d.substring(0,w);
			document.write(d+"&hellip;&#8221;</i></div>");
			document.write("");
			}
		document.write('<div class="rcw-comment2">');
		if(d=d.replace(v,""),1==n_rc&&document.write(ss1),1==n_rc&&document.write(ss2),1==m_rc&&document.write(timercp),0==o_rc) document.write("</div>");
		document.write('</div>');
		document.write('</div>');
}

}
