const FaceUtils = {
	faceList: [{
		text: '[f]',
		prefix: 'ClassicalFace',
		suffix: '.png',
		icon: '/static/Emotion/ClassicalFace/ClassicalFace_',
		list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗',
			'抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '悠闲', '奋斗', '咒骂', '疑问', '嘘', '晕', '疯了', '衰',
			'骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜',
			'菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '嘴唇', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫',
			'便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳',
			'发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '投降', '激动', '乱舞', '献吻', '左太极', '右太极'
		]
	}, {
		text: '[f]',
		prefix: 'EmojiFace',
		suffix: '.png',
		icon: '/static/Emotion/EmojiFace/EmojiFace_',
		list: ['笑脸', '生病', '破涕为笑', '吐舌', '脸红', '恐惧', '失望', '无语', '嘿哈', '捂脸', '奸笑', '机智', '皱眉', '耶', '鬼魂', '合十', '强壮', '庆祝',
			'礼物e', '红包', '鸡', '开心', '大笑', '热情', '眨眼', '色e', '接吻', '亲吻', '露齿笑', '满意', '戏弄', '得意e', '汗', '低落', '呸', '焦虑', '担心',
			'震惊', '悔恨', '眼泪', '哭', '晕e', '心烦', '生气', '睡觉', '恶魔', '外星人', '心', '心碎e', '丘比特', '闪烁', '星星', '叹号', '问号', '睡着',
			'水滴', '音乐', '火', '便便e', '强e', '弱e', '拳头e', '胜利e', '上', '下', '右', '左', '第一', '吻', '热恋', '男孩', '女孩', '女士', '男士',
			'天使', '骷髅e', '红唇', '太阳e', '下雨', '多云', '雪人', '月亮e', '闪电e', '海浪', '猫', '小狗', '老鼠', '仓鼠', '兔子', '狗', '青蛙', '老虎',
			'考拉', '熊', '猪', '牛', '野猪', '猴子', '马', '蛇', '鸽子', '鸡', '企鹅', '毛虫', '章鱼', '鱼', '鲸鱼', '海豚', '玫瑰e', '花', '棕榈树',
			'仙人掌', '礼盒', '南瓜灯', '圣诞老人', '圣诞树', '铃', '气球', 'CD', '相机', '录像机', '电脑', '电视', '电话', '解锁', '锁', '钥匙', '成交', '灯泡',
			'邮箱', '浴缸', '钱', '炸弹e', '手枪', '药丸', '橄榄球', '篮球e', '足球e', '棒球', '高尔夫', '奖杯', '入侵者', '唱歌', '吉他', '比基尼', '皇冠', '雨伞',
			'手提包', '口红', '戒指', '钻石', '咖啡e', '啤酒e', '干杯', '鸡尾酒', '汉堡', '薯条', '意面', '寿司', '面条', '煎蛋', '冰激凌', '蛋糕e', '苹果', '飞机',
			'火箭', '自行车', '高铁', '警告', '旗', '男人', '女人', 'O', 'X', '版权', '注册商标', '商标'
		]
	}],
	/** 编码表情 */
	encodeFace: function encodeFace(text) {
		var imgReg = /<image[^>]*>/gi;
		text = text.replace(imgReg, function(match) {
			if (match.indexOf('face_icon') == -1) {
				return match;
			} else if (match.indexOf('EmojiFace') == -1) {
				let idx = match.substring(match.indexOf('Face_')+5, match.indexOf('.png'))
				return `[${FaceUtils.faceList[0].list[Number(idx)-1]}]`;
			} else {
				let idx = match.substring(match.indexOf('Face_')+5, match.indexOf('.png'))
				return `[${FaceUtils.faceList[1].list[Number(idx)-1]}]`;
			}
		});
		return text;
	},

	/** 解码表情 */
	decodeFace: function decodeFace(text) {
		var classicalReg = /\[[^\]]*]/gi;
		var emojiReg = /\[[^\]]*]/gi;
		text = text.replace(classicalReg, function(match) {
			var title = match.substring(1, match.length - 1);
			var idx = FaceUtils.faceList[0].list.indexOf(title);
			return idx == -1 ? match : `<image class="face_icon" src="./static/Emotion/ClassicalFace/ClassicalFace_${idx+1}.png" />`;
		});
		text = text.replace(emojiReg, function(match) {
			var title = match.substring(1, match.length - 1);
			var idx = FaceUtils.faceList[1].list.indexOf(title);
			return idx == -1 ? match : `<image class="face_icon" src="./static/Emotion/EmojiFace/EmojiFace_${idx+1}.png" />`;
		});
		return text;
	},
	isFace: function(text) {
		text = text.replace('[','').replace(']','')
		if(FaceUtils.faceList[0].list.indexOf(text) > -1 || FaceUtils.faceList[1].list.indexOf(text) > -1) {
			return true;
		}
		return false;
	}
}

module.exports = FaceUtils
