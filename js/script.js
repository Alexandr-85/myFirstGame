function TipToe() {

    let self = this,
        container = document.getElementById('container'),
        containerButtonsId = 'containerButtons',
        scoreContainerId = 'score',
        sheets = null,
        buttons = {
            reset: {
                element: "button",
                text: "Перезапуск",
                id: "reset",
                type: "button"
            },
            playerX: {
                element: "button",
                text: "X",
                id: "playerX",
                type: "button"
            },
            playerO: {
                element: "button",
                text: "O",
                id: "playerO",
                type: "button"
            }

        },
        widthSheet = 150,
        heightSheet = 150,
        row = 3,
        range = 3,
        index = 0,
        styleSheet = 'border:1px solid; width:'+widthSheet+'px; height:'+heightSheet+'px;',
        playerSymbol = {
            player: 'X',
            computer: 'O'
        },
        scoreDefault = {
            player: 0,
            computer: 0
        },
        stepPlayer = {
            0:false,
            1:false,
            2:false,
            3:false,
            4:false,
            5:false,
            6:false,
            7:false,
            8:false
        },
        stepComputer = {
            0:false,
            1:false,
            2:false,
            3:false,
            4:false,
            5:false,
            6:false,
            7:false,
            8:false
        },
        winSeries = [
            [0,1,2],
            [0,4,8],
            [0,3,6],
            [1,4,7],
            [2,4,6],
            [2,5,8],
            [3,4,5],
            [6,7,8]
        ],
        endGame = false;

    this.run = function () {
        self.beforeRender();
        self.renderLayer();
        self.renderScore();
        self.renderButtons();
    };

    this.beforeRender = function () {
        console.log('Инициализация');
    };
    this.renderLayer = function () {

        let containerScore = document.createElement('div');
            containerScore.setAttribute('id', scoreContainerId);
            container.append(containerScore);

        for(let i=0; row > i; i++ ) {
            for(let j=0; range > j; j++){
                let div = document.createElement('div');
                div.setAttribute('style',styleSheet);
                div.setAttribute('data-id', index);
                div.setAttribute('data-sheet','');
                container.append(div);
                index++;
            }
        }
        sheets = document.querySelectorAll('[data-sheet]');

        let containerButtons = document.createElement('div');
            containerButtons.setAttribute('id',containerButtonsId);
            containerButtons.setAttribute('style','width:100%;padding-top:30px;display:flex;flex-direction: row;justify-content:center;align-items:center')
            container.append(containerButtons);


    };
    this.renderScore = function () {

        let containerScore = document.getElementById(scoreContainerId);
            containerScore.innerHTML= '';
            for(let key in scoreDefault){

                let scoreValue = document.createElement('span');
                    scoreValue.innerText = ' '+key+' '+scoreDefault[key];
                    containerScore.append(scoreValue);

            }
    };

    this.renderButtons = function () {

        let containerButtons = document.getElementById(containerButtonsId);

        for(let key in buttons){

            let button = document.createElement(buttons[key]['element']);

            button.setAttribute('id',buttons[key]['id']);
            button.setAttribute('type',buttons[key]['type']);
            button.innerText = buttons[key]['text'];
            containerButtons.prepend(button);

        }

    };
    container.onclick = function (event) {

        if(event.target.nodeName === 'BUTTON'){
            switch (event.target.id) {

                case buttons['playerX']['id']:
                    playerSymbol.player = buttons['playerX']['text'];
                    playerSymbol.computer = buttons['playerO']['text'];
                    break;

                case buttons['playerO']['id']:
                    playerSymbol.player = buttons['playerO']['text'];
                    playerSymbol.computer = buttons['playerX']['text'];
                    break;

                case buttons['reset']['id']:
                        self.restart();
                    break;
            }
        }

        //Клики по ячейкам

        if(typeof event.target.dataset['sheet'] !== 'undefined'){
            if(endGame !== true){
                event.target.innerText = playerSymbol.player;
                stepPlayer[event.target.dataset['id']] = true;
                //console.log(event.target);

                self.checkWIN(stepPlayer,'player');
                self.InStepComputer();
                self.checkWIN(stepComputer,'computer');
            }

        }
    };

    this.InStepComputer = function () {

      
        //Ищим выйгршные комбинации
        //пробегаем по массиу комбинаций
        for(let i=0; winSeries.length > i; i++) {
              //естли они в массиве игрока
            if((stepPlayer[winSeries[i][0]]===true) && (stepPlayer[winSeries[i][1]]===true)) {
                 //нашли, провеяем не занято? то ставим
                 let aaa=winSeries[i][2];
                 if(sheets[aaa].innerHTML === '' && endGame === false)
                 {
                    sheets[aaa].innerText = playerSymbol.computer;
                    stepComputer[aaa] = true;
                    return false;
                 }
            }

            if((stepPlayer[winSeries[i][0]]===true) && (stepPlayer[winSeries[i][2]]===true)) {
                 //нашли, провеяем не занято? то ставим
                 let aaa=winSeries[i][1];
                 if(sheets[aaa].innerHTML === '' && endGame === false)
                 {
                    sheets[aaa].innerText = playerSymbol.computer;
                    stepComputer[aaa] = true;
                  return false;
                  
                 }
            }

               if((stepPlayer[winSeries[i][1]]===true) && (stepPlayer[winSeries[i][2]]===true)) {
                 //нашли, провеяем не занято? то ставим
                 let aaa=winSeries[i][0];
                 if(sheets[aaa].innerHTML === '' && endGame === false)
                 {
                    sheets[aaa].innerText = playerSymbol.computer;
                    stepComputer[aaa] = true;
                    return false;
                    
                 }
            }



        }




        //Если не нашли, ставим куда попало
        for(let i=0; sheets.length > i; i++){
        	console.log(sheets[i].innerHTML);
            if(sheets[i].innerHTML === '' && endGame === false){
                sheets[i].innerText = playerSymbol.computer;
                stepComputer[i] = true;
                break;
            }
        }

    };

    this.checkWIN = function (steps,somePlayer) {

        for(let i=0; winSeries.length > i; i++){
            if(steps[winSeries[i]['0']] === true && steps[winSeries[i]['1']] === true && steps[winSeries[i]['2']] === true){
                scoreDefault[somePlayer]++;
                endGame = true;

               
                for(let j=0; winSeries[i].length > j; j++){
                    sheets[winSeries[i][j]].setAttribute('class', 'win');
                }
                self.renderScore();
            };
        }



    };

    this.restart = function () {

        for(let i=0; sheets.length > i; i++){

            sheets[i].innerHTML = '';
            sheets[i].removeAttribute('class');

        }
        for(let key in stepPlayer){
            stepPlayer[key] = false;
        }
        for(let key in stepComputer){
            stepComputer[key] = false;
        }
        endGame = false;

    }



}
let game = new TipToe();

game.run();

