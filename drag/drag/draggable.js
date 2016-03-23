function Draggable(options){
	var options = options||{};
	var tag = options.dragTag||"LI";//目前只支持li
	tag = tag.toUpperCase();
	var $dest = $(options.destId);//拖拽放入的容器对象
	$dest.on("dragover", function(ev) {
		ev.preventDefault();
		ev.stopPropagation();
	});
	$dest.on("drop", function(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		var df = ev.originalEvent.dataTransfer;
		var data = df.getData("Text");
		var el = ev.target;//目标对象
		var ctx = $(this).get(0);//当前容器
		if (data==""){
			return false;
		}
		do {
			var litem = document.createElement('li');
			var item = $(litem);
			var html = "";
			if (data=='input_type'){
				html = "<input type='text' value='test' />";
			}else if (data=='label_type'){
				html = "<label>测试文本</label>";
			}
			$(item).addClass("liClass");
			$(item).html(html);
			if ($(this).children().length>0){//当前容器下有li
				if(tag === '' || el.nodeName == tag){//当前目标对象的tagName是LI
					if (el.nextElementSibling){//如果当前对象的下一个兄弟节点存在，那么就将当前拖拽的对象插入到这个兄弟节点的前面
						el.parentNode.insertBefore($(item).get(0),el.nextElementSibling);
					}else{//兄弟节点不存，那么直接append到容器中
						ctx.appendChild($(item).get(0));
					}
				}
			}else{//当前容器下没有li，直接append进这个容器中
				ctx.appendChild($(item).get(0));
			}
		}
		while(el !== ctx && (el = el.parentNode));//当前目标对象不是容器，那么就将当前目标对象的父级节点赋值给当前目标对象
	});
	$dest.sortable();//JQUERY UI sortable组件
	return (function(){
		
	})(options);
}