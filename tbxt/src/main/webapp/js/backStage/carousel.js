var vm = new Vue({
	el:'#carousel',
	data:{
	},
	methods:{
	},
	mounted(){
		
	},
})

layui.use('form', function() {
    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    form.render();
});