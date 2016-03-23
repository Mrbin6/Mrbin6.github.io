function range(from,to){ //range函数是一个工厂函数
	var r=inherit(range.methods);//对象继承至range.methods
	r.from=from;
	r.to=to;
	return r;
}
function inherit(p){
	if(p==null){
		throw TypeError();
	}
	if(Object.create){//如果支持create函数，索性直接调用create函数返回一个继承至p对象的新对象
		return Object.create(p);
	}
	var t=typeof p;
	if(t!=="object" && t!=="function"){//传进来的对象必须是object和function类型的。
		throw TypeError();
	}
	function f(){};
	f.prototype=p;//手动修改。
	return new f();
}
range.methods={
	includes:function(x){
		return this.from <= x && x <= this.to;
	},
	foreach:function(f){
		for(var x=Math.ceil(this.from);x <= this.to;x++) f(x);
	},
	toString:function(){return "("+this.from+"..."+this.to+")";}
};
var r=range(1,3);
r.includes(2);
r.foreach(console.log);
console.log(r);