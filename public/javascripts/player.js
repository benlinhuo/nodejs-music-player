//定义播放对象
var Player = {
  //需要创建的audio对象
  audioObj:null, 
  //当前播放歌曲的索引号
  currentId:-1,
  //播放文件数组
  playList:[],
  //初始化player对象，创建audio对象，绑定事件
  init:function()
  {
	 //创建audio对象
	 var aObj = $("<audio id='ai'></audio>");
	 this.audioObj = aObj[0];	     
  },	 
  //清空播放
  clearList:function(){
	this.playList.length = 0;
	this.currentId = -1;
  },
  //添加音乐
  add:function(name,url)
  {
	this.playList.push({"name":name,"url":url});
  },
  //删除音乐
  remove:function(name)
  {
	delete this.playList[name];
  },
  //按索引播放音乐
  play:function(index)
  {
	 var song = null;
	 var self = this;
	 if((song=this.playList[index])!=null)
	   {		
		 //如果当前音乐可以播放并且和需要播放的一致，则继续播放，否则重新加载音乐
		 if(this.audioObj.readyState==4&&this.currentId==index)
		 {
			 this.audioObj.play();
		 }
		 else
		 {
			 this.currentId = index;
			 //先停止音乐
			 this.stop();
			 //重新加载
			 this.audioObj.src= song.url;
			 //绑定加载完数据后播放
			 $(this.audioObj).bind("canplaythrough",function(){  			
				self.play();
			 })
		 }
	   }
	 return song;
  },
  //停止音乐
  stop:function()
  {
	this.audioObj.pause();
  },	 
  //歌曲列表是否为空
  isEmptyPlayList:function()
  {
	return this.playList.length == 0;
  },
  //step:1 播放下一首 step:-1 播放上一首
  playStep:function(step)
  {
	if(this.isEmptyPlayList())
	{
	  return null;
	}
	//如果当前播放id为空，则播放第一首 
	if(this.currentId == null)
	{
	   return this.play(this.playList[0]);
	}
	else
	{
	   var id = this.currentId;
	   //1表示前进一首
	   if(step==1)
		 {
		   id = (id<this.playList.length-1)?id+1:0;
		 }
	   else if(step==-1) //-1表示后退一首
		 {
		   id = (id>0)?id-1:this.playList.length-1;
		 }		     
	   return this.play(id);
	}
  },
  //播放下一首
  playNext:function()
  {
	return this.playStep(1);
  },
  //播放前一首
  playPri:function()
  {
	return this.playStep(-1);
  }
};