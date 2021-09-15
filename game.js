function init(player,Opponent)
{
    let gameData = new Array(9);
    for(var i=0;i<9;i++) gameData[i]=null;
    var currentplayer = player.man;
    var square = document.querySelector(".container3");

    const WIN = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    const SIZE = 152;

    var EOG = false;
    if(currentplayer=="X") document.getElementById("s1").innerHTML = "X is Next";
    else document.getElementById("s1").innerHTML = "O is Next";

    reset.addEventListener("click",function()
    {
        location.reload();
    });
    
    square.addEventListener("click",function(event)
    {
        if(EOG) return;
        var string = "";
        if(Opponent=="Computer")
        {
            if(player.man=='X') string = "X";
            else string = "O";
        }
        else
        {
            if(currentplayer=='X') string = "O";
            else string = "X";
        }
        string += " is Next";
        document.getElementById("s1").innerHTML = string; 
        var x = event.clientX-square.getBoundingClientRect().x;
        var y = event.clientY-square.getBoundingClientRect().y;

        var i = Math.floor(y/SIZE);
        var j = Math.floor(x/SIZE);

        var id = 3*i+j;
        if(gameData[id]) return;

        draw(currentplayer,id);

        gameData[id] = currentplayer;

        if(isWinner(gameData,currentplayer))
        {
            X.classList.remove("hide");
            C.classList.add("hide");
            WINNER(currentplayer);
            EOF = true;
            return;
        }
        
        if(isTie(gameData))
        {
            X.classList.remove("hide");
            C.classList.add("hide");
            TIE();
            EOF = true;
            return;
        }

        if(Opponent=="Computer")
        {
            var id = minimax(gameData,player.computer).id;

            gameData[id] = player.computer;

            draw(player.computer,id);
            
            if(isWinner(gameData,player.computer))
            {
                X.classList.remove("hide");
                C.classList.add("hide");
                WINNER(player.computer);
                EOF = true;
                return;
            }
            if(isTie(gameData))
            {
                X.classList.remove("hide");
                C.classList.add("hide");
                TIE();
                EOF = true;
                return;
            }
        }
        else
        {    
            if(currentplayer==player.man) currentplayer=player.friend;
            else currentplayer=player.man;
        }
    });

    function minimax(gamedata, PLAYER)
    {
        if( isWinner(gamedata,player.computer)) return{evaluation : +10};
        if( isWinner(gamedata,player.man)) return {evaluation : -10};
        if(isTie(gamedata)) return{evaluation : 0};

        var empty_spaces = getEmptySpaces(gamedata);

        var moves = [];
        
        for(var i=0;i<empty_spaces.length;i++)
        {
            var id = empty_spaces[i];
            var temp = gamedata[id];
            gamedata[id] = PLAYER;
            var move = {};
            move.id = id;
            if(PLAYER == player.computer)
            {
                move.evaluation = minimax(gamedata,player.man).evaluation;
            }
            else
            {
                move.evaluation = minimax(gamedata,player.computer).evaluation;
            }
            gamedata[id] = temp;
            moves.push(move);
        }

        var best_move;

        if(PLAYER == player.computer)
        {
            var be = -Infinity;
            for(var i=0;i<moves.length;i++)
            {
                if(moves[i].evaluation > be)
                {
                    be = moves[i].evaluation;
                    best_move = moves[i];
                }
            }
        }
        else
        {
            var be = Infinity;
            for(var i=0;i<moves.length;i++)
            {
                if(moves[i].evaluation < be)
                {
                    be = moves[i].evaluation;
                    best_move = moves[i];
                }
            }
        }
        return best_move;
    }

    function getEmptySpaces(gamedata)
    {
        var empty = [];
        for(var i=0;i<gamedata.length;i++)
        {
            if(!gamedata[i]) empty.push(i);
        }
        return empty;
    }

    function isWinner(gamedata,player)
    {
        for(var i=0;i<8;i++)
        {
            var f = true;
            for(var j=0;j<3;j++)
            {
                var id = WIN[i][j];
                f = gamedata[id]==player && f;
            }
            if(f) return true;
        }
        return false;
    }

    function isTie(gamedata)
    {
        var fill = true;
        for(var i=0;i<gamedata.length;i++)
        {
            fill = gamedata[i] && fill;
        }
        return fill;
    }

    function WINNER(player)
    {
        document.getElementById("s1").innerHTML = "Game Has Ended";
        if(player=='X') W.classList.add("x");
        else W.classList.add("o");
    }

    function TIE()
    {
        document.getElementById("s1").innerHTML = "Game Has Ended";
        document.getElementById("s2").innerHTML = "No Winner";
        W.classList.add("t");
    }
    
    function draw(cplayer,id)
    {
        var squares = document.querySelectorAll(".box");
        if(cplayer=='X') squares[id].style.backgroundImage = "url(images/cross.jpg)";
        else squares[id].style.backgroundImage = "url(images/zero.jpg)";
    }
}