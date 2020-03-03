$(function(){
    //1.自定义滚动条
    $(".content_list").mCustomScrollbar();
    //2.列表鼠标移入移出事件
    $(".list_music").hover(function(){
        $(this).find(".list_menu").fadeIn(100);
        $(this).find(".list_time a").fadeIn(100);
        $(this).find(".list_time span").fadeOut(100);
    },function(){
        $(this).find(".list_menu").fadeOut(100);
        $(this).find(".list_time a").fadeOut(100);
        $(this).find(".list_time span").fadeIn(100);
    });
    //3.复选框点击事件
    $(".list_check").click(function(){
        $(this).toggleClass("list_checked");
    })
    //4.加载歌曲列表
    getPlayerList();
    function getPlayerList(){
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function (data) {
                //遍历数据，创建每条数据
                var $musicList=$(".content_list ul");
                $.each(data, function (index, ele) { 
                    var $item=createMusicItem(index,ele);
                    $musicList.append($item);
                });
            },
            error:function(e){
                console.log(e);
            }
            
        });
    }
    function createMusicItem(index,music){
        var $item = $("" +
        "<li class=\"list_music\">\n" +
            "<div class=\"list_check\"><i></i></div>\n" +
            "<div class=\"list_number\">"+(index + 1)+"</div>\n" +
            "<div class=\"list_name\">"+music.name+"" +
            "     <div class=\"list_menu\">\n" +
            "          <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
            "          <a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "          <a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "     </div>\n" +
            "</div>\n" +
            "<div class=\"list_author\">"+music.singer+"</div>\n" +
            "<div class=\"list_time\">\n" +
            "     <span>"+music.time+"</span>\n" +
            "     <a href=\"javascript:;\" title=\"删除\" class='list_menu_del'></a>\n" +
            "</div>\n" +
        "</li>");
        return $item;
    }
})