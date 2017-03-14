用 React + Redux 写的一个音乐播放器的 SPA
mp3 的资源文件没有上传,所以直接 clone 回去用不了

1.组件架构:
<MyMusic>                // 曲库 【容器组件】
    <Controller />          // 批量操作控制组件 【展示组件】
    <SinglesList />         // 曲库中单曲列表 【展示组件】
</MyMusic>
<MusicPlayer>            // 播放器 【容器组件】
    <ListController />      // 播放器中批量操作组件 【展示组件】
    <PlayerList />          // 播放列表 【展示组件】
    <PlayController />      // 播放控制器 (上、下一曲,播放暂停,循环方式,音量控制) 【展示组件】
</MusicPlayer>



2.store 中的数据结构

// 当前页面 [ 'MyMusic' 或 'MusicPlayer' ]
tab: ''

// 曲库列表 (id => 单曲对象 组成的对象)
singles:
{
	singleId: { name:'', author:'', src:'', durition:'', imgUrl:'' }
	...
}

// 播放列表 ( 单曲 id 组成的数组 )
playList: [singleId, singleId, singleId, ... ]

// 当前单曲
currentSingle: 
{
	singleId: singleId,      // 歌曲 id
	isPlay: false,           // 播放状态
	currentTime: '00:00'     // 当前进度
}

// 音量, [0-1]区间取值, 音量独立, 不放入 currentSingle 对象
valum: '' 

// 循环方式 [顺序、单曲、随机、全部 播放]
loopModel: ''   

// 被鼠标【移入】歌曲，显示操作按钮（分别在 曲库列表 和 播放列表 中）
singleListHovered: 'singleId'

playListHovered: 'singleId'

