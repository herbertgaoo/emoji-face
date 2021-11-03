<template>
	<view class="container">
		<scroll-view v-for="(tab, i) in tabList" class="emoji-view" scroll-y="true" 
		:style="{'height': (height-tabHeight)+'rpx', display: i === tabIndex? 'block' :'none'}" @touchmove.prevent>
			<view v-for="(item, index) in tab.list" class="face-icon" @click.stop="faceClick(i, index)">
				<image class="face_icon" :src="tab.icon+(index+1)+tab.suffix" lazy-load="true"></image>
			</view>
		</scroll-view>
		<view class="emoji-tab" :style="{'height': tabHeight+'rpx'}">
			<scroll-view class="tab-view" scroll-x="true" show-scrollbar="false">
				<view v-for="(item, index) in tabList" class="tab-items" :style="{backgroundColor: index === tabIndex? '#EEEEEE' :''}"
				 @click="_onclick(index)">
					<image :src="item.icon+'1'+item.suffix"></image>
				</view>
			</scroll-view>
			<view class="tab-delete">
				<button v-if="showDel" @click="_delClick" class="mini-btn" type="primary" size="mini">删除</button>
			</view>
		</view>
	</view>
</template>

<script>
	const FaceUtils = require('@/components/emoji-face/emoji-face.js');
	
	/**
	 * height 表情面板高度
	 * showDel 是否显示删除按钮，true时需要实现delete方法
	 */
	export default {
		props: {
			height: {
				type: Number,
				default: 400
			},
			tabHeight: {
				type: Number,
				default: 80
			},
			showDel: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				tabIndex: 0,
				tabList: FaceUtils.faceList
			};
		},
		methods: {
			faceClick(i, index) {
				let obj = this.tabList[i];
				this.$emit("choose", {
					text: obj.text.replace('f',obj.list[index]),
					icon: obj.icon+(index+1)+obj.suffix
				})
			},
			_onclick(index) {
				this.tabIndex = index;
			},
			_delClick() {
				this.$emit("delete", {});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		height: 100%;

		.emoji-view {
			// width: calc(100vw - 20rpx);
			box-sizing: border-box;
			padding: 10rpx;
			display: none;
			.face-icon {
				width: calc((100vw - 20rpx) / 8);
				height: calc((100vw - 20rpx) / 9);
				display: inline-flex;
				justify-content: center;
				align-items: center;

				image {
					width: $uni-img-size-lg;
					height: $uni-img-size-lg;
				}
			}
		}
	}

	.emoji-tab {
		display: flex;
		align-items: center;
		border-top: 1rpx solid #EEEEEE;
		box-sizing: border-box;

		.tab-delete {
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.tab-view {
			width: 80%;
			height: 80rpx;
			white-space: nowrap;
		}

		.tab-items {
			width: calc(100vw / 7);
			display: inline-flex;
			justify-content: center;
			align-items: center;
			height: calc(100% - 20rpx);
			margin: 10rpx;
			border-radius: 10rpx;
		}

		image {
			width: $uni-img-size-base;
			height: $uni-img-size-base;
		}
	}
</style>
