$(function() {
	var _consts = {
		isMove: false,
		config: {
			//是否允许修改级别
			changeLevel: false,
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
	}

	var out = {
		selectId: 0,
		targetId: 0,
		dropPos: null,
	}

	var _view = {
		//span标签被选中
		spanSelected: function() {
			dom.selectDd.addClass('sec_level_selected');
		},
		spanUnSelected: function() {
			dom.selectDd.removeClass('sec_level_selected');
		},
		cloneObj: function() { //克隆选择对象
			dom.copySpan = dom.selectSpan.clone();
			dom.copySpan.addClass('move_copy');
			if (dom.selectDdLevel == 0) {
				dom.copySpan.addClass('top_move_copy');
			} else {
				dom.copySpan.addClass('sec_move_copy');
			}
			dom.jss.append(dom.copySpan);
		},
		cloneMove: function(e) { //复制对象的移动
			dom.copySpan.css('top', e.pageY - pos.ulTop - 12);
			dom.copySpan.css('left', e.pageX - pos.ulLeft);
			dom.copySpan.css('display', 'inline');
		},
		ddOnMove: function() { //移动过程中，移动到其他dd上时
			dom.allSpan.bind('mousemove', function(e) {
				if (!_consts.isMove) return false;
				dom.targetDd = $(this).parent();
				dom.targetDd.addClass('drop_target');
				out.targetId = dom.targetDd.attr('id').replace('dd_', '');
				var offset = $(this).offset();
				pos.targetLeft = offset.left;
				pos.targetTop = offset.top;
				if (dom.targetDd.hasClass('top_level')) {
					dom.targetDdLevel = 0;
					dom.arrow.css('left', 24);
				} else {
					dom.targetDdLevel = 1;
					dom.arrow.css('left', 48);
				}
				if (e.pageY - pos.targetTop >= 12) {
					out.dropPos = 'next';
					dom.arrow.css('top', pos.targetTop - 24);
				} else {
					out.dropPos = 'prev';
					dom.arrow.css('top', pos.targetTop - 48);
				}
			});
			dom.allSpan.mouseout(function() {
				if (!_consts.isMove) return false;
				dom.targetDd.removeClass('drop_target');
			});

		},
		moveUnSelect: function() { //移动时禁止选中文字
			//window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
			dom.jss.bind('selectstart', function() {
				return false;
			})
		}
	}

	var initJss = function(selector) {
		dom.jss = $(selector).find('.sort_list');
		dom.allSpan = dom.jss.find('span');
		dom.arrow = dom.jss.find('.drop_arrow');
		var offset = dom.jss.offset();
		pos.ulTop = offset.top;
		pos.ulLeft = offset.left;
	}
	var selectObj = function() { //选择对象
		dom.jss.find('span').mousedown(function() {
			_consts.isMove = true;
			dom.selectSpan = $(this);
			dom.selectDd = $(this).parent();
			out.selectId = dom.selectDd.attr('id').replace('dd_', '');
			if (dom.selectDd.hasClass('top_level')) {
				dom.selectDdLevel = 0;
			} else {
				dom.selectDdLevel = 1;
			}
			_view.moveUnSelect();
			_view.spanSelected();
			_view.cloneObj();
			moveObj();
		})
	}
	var moveObj = function() { //移动鼠标
		dom.jss.mousemove(function(e) {
			if (!_consts.isMove) return false;
			_view.cloneMove(e);
		})
		_view.ddOnMove();
		dropObj();
	}
	var dropObj = function() { //放置目标
		dom.jss.mouseup(function(e) {
			_consts.isMove = false;
			dom.copySpan.detach();
			_view.spanUnSelected();
			dom.allSpan.unbind('mousemove')
			dom.targetDd.removeClass('drop_target');
			if (console.log) {
				console.log(out)
			}
		})
	}

	$.fn.justSort = function(selector, config, data) {
		initJss(selector);
		selectObj();
	}

})

