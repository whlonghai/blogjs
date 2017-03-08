// Recent Post by Info Arlina
function recentpostlonghai(t){
	var numtitle=100;
	document.write('<ul class="recent_posts_longhai">');
	for(var e=0;e<numposts;e++){
		var r,n=t.feed.entry[e],it=n.title.$t;
		if (it.length>numtitle) i=it.substring(0,numtitle)+"..."; else i=it;
		if(e==t.feed.entry.length)break;
		for(var o=0;o<n.link.length;o++){if("replies"==n.link[o].rel&&"text/html"==n.link[o].type)var m=n.link[o].title,u=n.link[o].href;if("alternate"==n.link[o].rel){r=n.link[o].href;break}}
		var l;
		try{
			l=n.media$thumbnail.url
		}
		catch(h){
			s=n.content.$t,a=s.indexOf("<img"),b=s.indexOf('src="',a),c=s.indexOf('"',b+5),d=s.substr(b+5,c-b-5),l=-1!=a&&-1!=b&&-1!=c&&""!=d?d:"https://dl.dropboxusercontent.com/u/82680438/blogjs/noimage.png"
		}
		
		var w=n.published.$t,f=w.substring(2,4),p=w.substring(5,7),g=w.substring(8,10),tlh=w.substring(11,13),v=new Array;
		var timercp='<abbr class="timeago" title="'+w+'"></abbr>';
		if(v[1]="Jan",v[2]="Feb",v[3]="Mar",v[4]="Apr",v[5]="May",v[6]="Jun",v[7]="Jul",v[8]="Aug",v[9]="Sep",v[10]="Oct",v[11]="Nov",v[12]="Dec",document.write('<li class="clearfix">'),1==showpostthumbnails&&document.write('<span class="wrapinfo"><img class="recent_thumb" src="'+l+'"/></span>'),document.write('<b><a href="'+r+'" target ="_top" title="'+it+'">'+i+"</a></b><br>"),"content"in n)
		var y=n.content.$t;
		else if("summary"in n)var y=n.summary.$t;
		else var y="";
		var k=/<\S[^>]*>/g;
		if(y=y.replace(k,""),1==showpostsummary)
			if(y.length<numchars){document.write("<span><i>");document.write(y);document.write("</i></span>");}
				else{document.write("<span><i>"),y=y.substring(0,numchars);
				var _=y.lastIndexOf(" ");y=y.substring(0,_),document.write(y+"..."),document.write("</i></span>")
				}
				var x="",$=0;document.write("<div>"),1==showcommentnum&&(1==$&&(x+=""),m=m.substring(0,m.length-8)+"Phản hồi","0 Phản hồi"==m&&(m="Chưa Phản hồi"),m='<a href="'+u+'" target ="_top">'+m+"</a>",x+=m,$=1),1==showpostdate&&(x=x+timercp,$=1),1==displaymore&&(1==$&&(x+=" | "),x=x+'<a href="'+r+'" class="url" target ="_top">More -></a>',$=1),document.write(x),document.write("</div></li>"),1==displayseparator&&e!=numposts-1&&document.write("<hr size=0.5>")
	}
	document.write("</ul>")
}
