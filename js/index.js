$(function(){
    //自定义滚动条
    $(".content_list").mCustomScrollbar();
    //列表鼠标移入移出事件
    $(".list_music").hover(function(){
        $(this).find(".list_menu").fadeIn(100);
        $(this).find(".list_time a").fadeIn(100);
        $(this).find(".list_time span").fadeOut(100);
    },function(){
        $(this).find(".list_menu").fadeOut(100);
        $(this).find(".list_time a").fadeOut(100);
        $(this).find(".list_time span").fadeIn(100);
    });
    $(".list_check").click(function(){
        $(this).toggleClass("list_checked");
    })
})