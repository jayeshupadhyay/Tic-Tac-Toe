var cbtn = document.querySelector("#cbtn");
var pbtn = document.querySelector("#pbtn");
var xbtn = document.querySelector("#xbtn");
var obtn = document.querySelector("#obtn");
var play = document.querySelector('#play');
var reset = document.querySelector('#reset');

var Opponent;
var player = new Object();

cbtn.addEventListener("click",function()
{
    Opponent = "Computer";
    cbtn.classList.remove("error");
    pbtn.classList.remove("error");
    cbtn.classList.add("cyan");
    pbtn.classList.add("cyan");
    cbtn.classList.remove("cyan");
    pbtn.classList.remove("cyan");
    pbtn.classList.remove("active");
    cbtn.classList.add("active");
})

pbtn.addEventListener("click",function(){
    Opponent = "Friend";
    cbtn.classList.remove("error");
    pbtn.classList.remove("error");
    cbtn.classList.add("cyan");
    pbtn.classList.add("cyan");
    pbtn.classList.remove("cyan");
    cbtn.classList.remove("cyan");
    pbtn.classList.add("active");
    cbtn.classList.remove("active");
})

xbtn.addEventListener("click",function(){
    player.man = 'X';
    player.friend = 'O';
    player.computer = 'O';
    xbtn.classList.remove("error");
    obtn.classList.remove("error");
    xbtn.classList.add("cyan");
    obtn.classList.add("cyan");
    xbtn.classList.remove("cyan");
    obtn.classList.remove("cyan");
    xbtn.classList.add("active");
    obtn.classList.remove("active");
})

obtn.addEventListener("click",function(){
    player.man='O';
    player.computer = 'X';
    player.friend = 'X';
    xbtn.classList.remove("error");
    obtn.classList.remove("error");
    xbtn.classList.add("cyan");
    obtn.classList.add("cyan");
    xbtn.classList.remove("cyan");
    obtn.classList.remove("cyan");
    obtn.classList.add("active");
    xbtn.classList.remove("active");
})

play.addEventListener("click",function(){
    if(!Opponent && !player.man)
    {
        pbtn.classList.remove("cyan");
        pbtn.classList.add("error");
        cbtn.classList.remove("cyan");
        cbtn.classList.add("error");
        xbtn.classList.remove("cyan");
        xbtn.classList.add("error");
        obtn.classList.remove("cyan");
        obtn.classList.add("error");
        return;
    }
    else if(!Opponent)
    {
        pbtn.classList.remove("cyan");
        pbtn.classList.add("error");
        cbtn.classList.remove("cyan");
        cbtn.classList.add("error");
        return;
    }
    else if(!player.man)
    {
        xbtn.classList.remove("cyan");
        xbtn.classList.add("error");
        obtn.classList.remove("cyan");
        obtn.classList.add("error");
        return;
    }
    else
    {
        A.classList.add("FadeOut");
        B.classList.add("FadeIn");
        setTimeout(function(){
            A.classList.add("hide");
            B.classList.remove("hide");
        },500);
        init(player,Opponent);
        return;
    }
})