
//empeche la modale incluant les régles du jeu de se réouvrir une fois que l'utilisateur a lu les regles.//
$(document).ready(function(){
    if(document.cookie.indexOf('modal_shown') >=0){
    
    } else 
    {
    $("#myModal").modal('show');
    document.cookie="modal_shown=seen";
    }
});



// Charge la fonction newGame lors du lancement du jeu
window.onload = newGame;


let images = [
"",
"Image/dice-svgrepo-com (1).svg",
"Image/dice-svgrepo-com (2).svg",
"Image/dice-svgrepo-com (3).svg",
"Image/dice-svgrepo-com (4).svg",
"Image/dice-svgrepo-com (5).svg",
"Image/dice-svgrepo-com (6).svg"
]


// declaration des variables du jeu.

let audio1 = new Audio('Sounds/Hold.mp3');
audio1.volume=0.3;
let audio2 = new Audio('Sounds/Change.mp3');
audio2.volume=0.3;
let audio3 = new Audio('Sounds/New.mp3');
audio3.volume=0.3;
let audio4 = new Audio('Sounds/Win.mp3');
audio4.volume=0.3;
let player1 = document.getElementById('playerOne')
let player2 = document.getElementById('playerTwo')
let scoreOne = document.getElementById('score1')
let scoreTwo = document.getElementById('score2')
let currentScoreOne = document.getElementById('currentScore1')
let currentScoreTwo = document.getElementById('currentScore2')
let inputNameOne = document.getElementById('inputName1');
let inputNameTwo = document.getElementById('inputName2')
let newGame1 = document.getElementById('newGame')
let feedbackOne = document.getElementById('feedback1')
let feedbackTwo = document.getElementById('feedback2')
let diceFaces = document.getElementById('diceFace')
let rollButtons = document.getElementById('rollButton')
let currentPlayer = "one"
let scorePlayer1 = 0
let scorePlayer2 = 0
let currentScorePlayerOne = 0
let currentScorePlayerTwo = 0


// fonction permettant de commencer une nouvelle partie

function newGame()  {
    audio3.play()
    currentScoreOne.innerHTML = 0
    scoreOne.innerHTML = 0
    currentScorePlayerOne = 0
    currentScoreTwo.innerHTML = 0
    scoreTwo.innerHTML = 0
    currentScorePlayerTwo = 0
    currentScoreTwo.innerHTML = 0
    player1.textContent = "User 1"
    player2.textContent = "User 2"
    currentPlayer = "one"
    scorePlayer1 = 0
    scorePlayer2 = 0
    player2.classList.remove("fs-3")
    player2.classList.add("fs-5")
    player1.classList.add("blink_me")
    player2.classList.remove("blink_me")
    player2.style.color = "white"
    player1.classList.remove("fs-5")
    player1.classList.add("fs-3")
    player1.style.color = "#03A062"
    diceFaces.setAttribute("src", images[1]);
}

// ajout d'addEventListener afin de jouer les fonctions

newGame1.addEventListener('click', newGame);

let checkInputForm1 = document.getElementById("inputName1")
checkInputForm1.addEventListener("keyup", checkValidity);

let checkInputForm2 = document.getElementById("inputName2")
checkInputForm2.addEventListener("keyup", checkValidity);

let editName = document.getElementById("editBtn");
editName.addEventListener("click", changeNames);

rollButtons.addEventListener("click",() => {   
    rollDice();
    switchPlayer();    
});

let holdButton = document.getElementById("hold");
holdButton.addEventListener("click", holdScore)


// lorsque le joueur clique sur 'EDIT NICKNAMES' une modale s'ouvre et il peut alors renseigner un nouveau pseudo, grace a cette fonction, le pseudo choisi sera transféré de la modal au jeu.

function changeNames() {

   
     if (inputNameOne.value.length <= 6 && inputNameTwo.value.length <= 6 && inputNameOne.value !== "" && inputNameTwo.value !== "") {
        
        player1.textContent = inputNameOne.value;
        player2.textContent = inputNameTwo.value;
    }


    else if (inputNameOne.value.length > 6 || inputNameTwo.value.length > 6 || inputNameOne.value === "" || inputNameOne.value === null || inputNameTwo.value === "" || inputNameTwo.value === null){
        editName.classList.add("disabled")
    }

    else {editName.classList.remove("disabled")}

  
}

// Fonction permettant a l'utilisateur de changer son nom de joueur selon certain criteres (caracteres inferieurs à 6, au moins 1 caractere present etc...)
        
        function checkValidity() {


     if (inputNameOne.value.length >= 7 || inputNameOne.value === "" || inputNameOne.value === null) 
            {
                editName.classList.add("disabled")
                inputNameOne.classList.remove("is-valid");
                inputNameOne.classList.add("is-invalid");
                feedbackOne.classList.add("invalid-feedback")
                feedbackOne.classList.remove("d-none")
                

        }
        else if (inputNameOne.value.length < 7){
        editName.classList.remove("disabled");
                inputNameOne.classList.remove("is-invalid");
                inputNameOne.classList.add("is-valid");
            feedbackOne.classList.remove("invalid-feedback")
               feedbackOne.classList.add("valid-feedback")
               feedbackOne.classList.add("d-none")}
               

         if (inputNameTwo.value.length >= 7 || inputNameTwo.value === "" || inputNameTwo.value === null)

        {
            editName.classList.add("disabled")
            inputNameTwo.classList.remove("is-valid");
            inputNameTwo.classList.add("is-invalid");
            feedbackTwo.classList.add("invalid-feedback")
            feedbackTwo.classList.remove("d-none")
        }


            else if (inputNameTwo.value.length < 7) {
                inputNameTwo.classList.remove("is-invalid");
                inputNameTwo.classList.add("is-valid");
                feedbackTwo.classList.remove("invalid-feedback");
                feedbackTwo.classList.add("valid-feedback");
                feedbackTwo.classList.add("d-none");
                

            }
            
        }

    // fonction qui permet de changer de joueur suivant la face du dé affichée apres qu'il est été lancé. ( exemple : si l'utilisateur 1 tombe sur le chiffre 1 , la main passe à l'utilisateur 2)
     
       function switchPlayer() 
                {
                    
                        let rollResult = rollDice()

                    if (currentPlayer == "one") {

                        if (rollResult !==1) 
            
                        {
                            currentPlayer = "one"
                            scorePlayer1 = scorePlayer1 + rollResult;
                            currentScoreOne.innerHTML = scorePlayer1;
                            player1.classList.remove("fs-5")
                            player1.classList.add("fs-3")
                            player1.classList.add("blink_me")
                            player1.style.color = "#03A062"
                            player2.style.color = "white"
                            
                        }
            
            
                        else 
                        {
                            currentPlayer = "two";
                            scorePlayer1 = 0
                            currentScoreOne.innerHTML = 0
                            player1.classList.remove("fs-3")
                            player1.classList.add("fs-5")
                            player2.classList.remove("fs-5")
                            player2.classList.add("fs-3")
                            player1.classList.remove("blink_me")
                            player2.classList.add("blink_me")
                            player2.style.color = "#03A062"
                            player1.style.color = "white"
                            audio2.play()
                        }
            
            
                     }
                     
                     else if (currentPlayer == "two") {

                        if(rollResult !==1 )
                        {
                            currentPlayer = "two"
                            scorePlayer2 = scorePlayer2 + rollResult;
                            currentScoreTwo.innerHTML = scorePlayer2;
                            player2.classList.remove("fs-5")
                            player2.classList.add("fs-3")
                            player2.classList.add("blink_me")
                            player2.style.color = "#03A062"
                            player1.style.color = "white"
            
                        }

                        else {
                            currentPlayer = "one"
                            scorePlayer2 = 0
                            currentScoreTwo.innerHTML = 0
                            player2.classList.remove("fs-3")
                            player2.classList.add("fs-5")
                            player1.classList.remove("fs-5")
                            player1.classList.add("fs-3")
                            player2.classList.remove("blink_me")
                            player1.classList.add("blink_me")
                            player2.style.color = "white"
                            player1.style.color = "#03A062"
                            audio2.play()
                           
                        }
                    }
                }
                    
            // fonction permettant d'ajouter le score temporaire au score global
            
            
            function holdScore() 

            {
               
                audio1.play()
                if (currentPlayer == "one") {
                   
                   currentScorePlayerOne = scorePlayer1 = scorePlayer1 + currentScorePlayerOne 
                   scoreOne.innerHTML = scorePlayer1;
                   currentScoreOne.innerHTML = 0
                   scorePlayer1 = 0
                   currentPlayer = "two"
                   player1.classList.remove("blink_me")
                   player1.classList.remove("fs-3")
                   player1.classList.add("fs-5")
                   player1.style.color = "white"
                   player2.style.color = "#03A062"
                   player2.classList.remove("fs-5")
                   player2.classList.add("fs-3")
                   player2.classList.add("blink_me")
                }

                
                     else if (currentPlayer = "two"){
                    currentScorePlayerTwo = scorePlayer2 = scorePlayer2 + currentScorePlayerTwo 
                    scoreTwo.innerHTML = scorePlayer2;
                    currentScoreTwo.innerHTML = 0
                    scorePlayer2 = 0
                     currentPlayer = "one"
                     player2.classList.remove("blink_me")
                     player2.classList.remove("fs-3")
                     player2.classList.add("fs-5")
                     player2.style.color = "white"
                     player1.style.color = "#03A062"
                     player1.classList.remove("fs-5")
                     player1.classList.add("fs-3")
                     player1.classList.add("blink_me")
                }
                
                if (scoreOne.innerHTML >= 100)
            {
                    audio4.play()
                    player1.textContent = "WINNER !!!!"
                    player2.classList.remove("blink_me")
                    player1.classList.add("blink_me")
                    player1.style.color = "red"
                    setTimeout(newGame, 5000)
        
                    
            }
            
                else if (scoreTwo.innerHTML >= 100)
            {
                    audio4.play()
                    player2.textContent = "WINNER !!!!"
                    player1.classList.remove("blink_me")
                    player2.classList.add("blink_me")
                    player2.style.color = "red"
                    setTimeout(newGame, 5000)
                    
            
            }

            }

        
    // fonction permettant de lancer le dé

        function rollDice() {
            diceFaces.animate([
                {   rotate: '50deg'},
                {   rotate: '-25deg'},
                {   rotate: '25deg'}
              ], {
                duration: 100,
                iterations: 1
              })
            let nbRandom = Math.floor((Math.random()*6) + 1);
            diceFaces.setAttribute("src", images[nbRandom]);
            return nbRandom

            
        }
