window.onload=function(){
	show_time();
}

function show_time(){
//	document.getElementById("helloday").disabled=ture;
	var day=new Date().getDay();
	var x="";
	switch (day)
	{
	case 0:
	  x="星期天";
	  break;
	case 1:
	  x="星期一";
	  break;
	case 2:
	  x="星期二";
	  break;
	case 3:
	  x="星期三";
	  break;
	case 4:
	  x="星期四";
	  break;
	case 5:
	  x="星期五";
	  break;
	case 6:
	  x="星期六";
	  break;
	}
	var myDate=new Date();
	var hello=document.querySelector("#helloday");
	if(myDate.getHours()>=5&&myDate.getHours()<12){
		hello.innerHTML = x+"&nbsp;&nbsp;&nbsp;"+myDate.getHours()+"点"+myDate.getMinutes()+"分"+myDate.getSeconds()+"秒"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 早上好呀~";
		setTimeout(show_time,1000);
	}else if(myDate.getHours()>=12&&myDate.getHours()<19){
		hello.innerHTML = x+"&nbsp;&nbsp;&nbsp;"+myDate.getHours()+"点"+myDate.getMinutes()+"分"+myDate.getSeconds()+"秒"+"  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下午茶时光~";
		setTimeout(show_time,1000);
	}else{	
		hello.innerHTML = x+"&nbsp;&nbsp;&nbsp;"+myDate.getHours()+"点"+myDate.getMinutes()+"分"+myDate.getSeconds()+"秒"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;夜快深啦~";
		setTimeout(show_time,1000);
	}
	/*hello.innerHTML=myDate;*/

}