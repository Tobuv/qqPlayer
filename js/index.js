$(function(){
    //1.Custom scroll bar
    $(".content_list").mCustomScrollbar();

    var $audio=$("audio");
    var player=new Player($audio);
//2.Load the song list
    getPlayerList();
    function getPlayerList(){
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function (data) {
                player.musicList=data;
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
//3.Initialize the event listener
    initEvent();
    function initEvent(){
    //3.1.Mouse - in - out events in the list
    $(".content_list").delegate(".list_music","mouseenter",function(){
        $(this).find(".list_menu").fadeIn(100);
        $(this).find(".list_time a").fadeIn(100);
        $(this).find(".list_time span").fadeOut(100);
    });
    $(".content_list").delegate(".list_music","mouseleave",function(){
        $(this).find(".list_menu").fadeOut(100);
        $(this).find(".list_time a").fadeOut(100);
        $(this).find(".list_time span").fadeIn(100);
    });
   /*  
        $(".list_music").hover(function(){
            $(this).find(".list_menu").fadeIn(100);
            $(this).find(".list_time a").fadeIn(100);
            $(this).find(".list_time span").fadeOut(100);
        },function(){
            $(this).find(".list_menu").fadeOut(100);
            $(this).find(".list_time a").fadeOut(100);
            $(this).find(".list_time span").fadeIn(100);
        }); 
    */
    //3.2.Checkbox click event listener
    $(".content_list").delegate(".list_check","click",function(){
        $(this).toggleClass("list_checked");
    });
    /*
        $(".list_check").click(function(){
            $(this).toggleClass("list_checked");
        }); 
    */

    //3.3.Play button switch event listener
    var $musicPlay=$(".music_play");
    $(".content_list").delegate(".list_menu_play","click",function(){
        
        var $item=$(this).parents(".list_music")
       // console.log($item.get(0).index);
        //列表播放菜单
        $(this).toggleClass("list_menu_play2");
        $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
        //底部播放菜单
        if($(this).attr("class").indexOf("list_menu_play2")!=-1){
            $musicPlay.addClass("music_play2");
            //heightlight
            $item.find("div").css("color","#fff");
            $item.siblings().find("div").css("color","rgba(255,255,255,0.6)");
        }else{
            $musicPlay.removeClass("music_play2");
            //no heightlight
            $(this).parents(".list_music").find("div").css("color","rgba(255,255,255,0.6)");
        }
        //Wave effects
        $item.find(".list_number").toggleClass("list_number2");
        $item.siblings().find(".list_number").removeClass("list_number2");
        //play music
        player.playMusic($item.get(0).index,$item.get(0).music);
    });
    //3.4.Bottom play button click event listening
    $musicPlay.click(function(){
        if(player.currentIndex==-1){
            //从未播放音乐
           // console.log(player.currentIndex);
            $(".list_music").eq(0).find(".list_menu_play").trigger("click");
        }else{
            //已经播放过了
            $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
        }
    })
    //3.5.Bottom pre button click event listening
    $(".music_pre").click(function(){
        $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
    })
    //3.6.Bottom next button click event listening
    $(".music_next").click(function(){
        $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
    })
   }
//

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
        $item.get(0).index=index;
        $item.get(0).music=music;
        return $item;
    }
})