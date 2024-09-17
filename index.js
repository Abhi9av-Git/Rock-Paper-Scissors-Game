let score=JSON.parse(localStorage.getItem('score')); // converting string into object using JSON.parse

      if (score===null) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        };
      }

      updatescoreElement();

      let isAutoPlaying=false;
      let intervalId;

      function autoPlay() {

        if (!isAutoPlaying) {
          intervalId=setInterval(function () {
            const playermove=pickComputerMove();
            playgame(playermove);
          }, 1000);

          isAutoPlaying=true;
        }

        else {
          clearInterval(intervalId);
          isAutoPlaying=false;
        }
      }

      document.querySelector('.js-rock-button').addEventListener('click', ()=> {
        playgame('Rock');
      })

      document.querySelector('.js-paper-button').addEventListener('click', ()=> {
        playgame('Paper');
      })

      document.querySelector('.js-scissors-button').addEventListener('click', ()=> {
        playgame('Scissors');                                                          // we don't need an onclick attribute if we are using addEventListener
      });

      document.body.addEventListener('keydown', (event)=> {  // these steps we are doing to create a shortcut using our keyboard like 'r' for rock,'p' for paper and 's' for scissors.
        if (event.key==='r') {
          playgame('Rock');
        }
        else if (event.key==='p') {
          playgame('Paper');
        }
        else if (event.key==='s') {
          playgame('Scissors');
        }
      });

      function playgame(playermove) {

        const computermove=pickComputerMove();

        let result='';

        if (playermove==='Rock') {

          if (computermove==='Rock') {
            result='Tie.';
          }
          else if (computermove==='Paper') {
            result='You Lost.';
          }
          else if (computermove==='Scissors') {
            result='You Won.';
          }
        }

        else if (playermove==='Paper') {

          if (computermove==='Rock') {
            result='You Won.';
          }
          else if (computermove==='Paper') {
            result='Tie.';
            
          }
          else if (computermove==='Scissors') {
            result='You Lost.';
          }
        }

        else if (playermove==='Scissors') {

          if (computermove==='Rock') {
            result='You Lost.';
          }
          else if (computermove==='Paper') {
            result='You Won.';
          }
          else if (computermove==='Scissors') {
            result='Tie.';
          }
        }

        if (result==='You Won.') {
          score.wins++;
        }
        else if (result==='You Lost.') {
          score.losses++;
        }
        else if (result==='Tie.') {
          score.ties++;
        }

        localStorage.setItem('score', JSON.stringify(score));  // score is a name and JSON.stringify(score) is used to convert object(score) into a string as localstorage supports only strings. 
        //score is the value here which cannot be written directly into local storage thatswhy used JSON.stringify(score);
        // local storage helps us to store the previous data after refreshing the page also

        updatescoreElement();

        document.querySelector('.js-result').innerHTML=result;

        document.querySelector('.js-moves').innerHTML=`You
      <img src="Project-Pictures/${playermove}-emoji.png" class="move-icon">
      <img src="Project-Pictures/${computermove}-emoji.png" class="move-icon">
      Computer`;
      }

      function updatescoreElement() {
        document.querySelector('.js-score').innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
      }

      function pickComputerMove() {
        const randomNumber=Math.random();  // Math.random() gives a random value>=0 and less than 1

        let computerMove='';

        if (randomNumber>=0 && randomNumber<1/3) {
        computerMove='Rock';
        }
        else if (randomNumber>=1/3 && randomNumber<2/3) {
          computerMove='Paper';
        }
        else if (randomNumber>=2/3 && randomNumber<1) {
          computerMove='Scissors';
        }  

        return computerMove;
      }