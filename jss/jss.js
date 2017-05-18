$.fn.justSort = function(selector, config, data) {
	var _consts = {
		isMove: false,
		config: {
			//是否允许修改级别
			changeLevel: false,
			//数据
			dataUrl: '/php/tree.php'
		},

	};
	var dom = {
		jss: null,
		selectSpan: null,
		selectDd: null,
		//被选择元素的级别
		selectDdLevel: 0,
		targetDdLevel: 0,
		copySpan: null,
		allSpan: null,
		targetDd: null,
		arrow: null,
	};
	var pos = {
		ulTop: 0,
		ulLeft: 0,
		targetTop: 0,
		targetLeft: 0,
	};

	var out = {
		selectId: 0,
		targetId: 0,
		dropPos: null,
	};

	var _html = '';

	//初始化
	var _init = function() {
		_view();

	}

	//渲染模板
	var _view = function() {
		var url = _consts.config.dataUrl;
		_html = '<ul class="mm">'
		$.get(url, function(data) {
			for (var i = 0, length = data.length; i < length; i++) {
				_html += '<li>';
				_html += '<div class="li-item" data-id=' + data[i].id + ' data-url=' + data[i].url + '>';
				_html += '<svg class="icon open" aria-hidden="true"> <use xlink:href="#icon-jianhao"></use> </svg>';
				_html += '<span>' + data[i].name + '</span></div>';
				var length2 = data[i].children.length;
				if (length2) {
					_html += '<ul>';
					for (var y = 0; y < length2; y++) {
						_html += '<li><div class="li-item" data-id=' + data[i].children[y].id + ' data-url=' + data[i].children[y].url + '><span>' + data[i].children[y].name + '</span></div></li>';
					}
					_html += '</ul>';
				}
				_html += '</li>';
			}

			_html += '</ul>';
			$(selector).html(_html);
		},
		'json');
	}

	//子菜单隐藏
	var _close = function(dom) {
		dom.parent().parent().find('ul').hide();
		dom.html('<use xlink:href="#icon-jiahao1"></use>');
	}

	//子菜单展示
	var _open = function(dom) {
		dom.parent().parent().find('ul').show();
		dom.html('<use xlink:href="#icon-jianhao"></use>');
	}

	$(selector).on('click', '.mm svg', function() {
		var status = $(this).find('use').attr('xlink:href');
		if (status == '#icon-jiahao1') {
			_open($(this));
		} else {
			_close($(this));
		}
	})

	_init();
}

$(function() {
	$.fn.justSort('#sort_div');
})

