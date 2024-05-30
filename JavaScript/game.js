document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const gameContainer = document.querySelector('.game-container');
    const scoreDisplay = document.getElementById('score');
    let score = 0;

    let characterX = gameContainer.offsetWidth / 2 - character.offsetWidth / 2;
    const characterSpeed = 10;

    function moveCharacter(event) {
        if (event.key === 'ArrowLeft' && characterX > 0) {
            characterX -= characterSpeed;
        } else if (event.key === 'ArrowRight' && characterX < gameContainer.offsetWidth - character.offsetWidth) {
            characterX += characterSpeed;
        }
        character.style.left = characterX + 'px';
    }

    document.addEventListener('keydown', moveCharacter);

    function createFallingObject() {
        const fallingObject = document.createElement('div');
        fallingObject.classList.add('falling-object');
        fallingObject.style.left = Math.random() * (gameContainer.offsetWidth - 30) + 'px';
        gameContainer.appendChild(fallingObject);

        let fallingSpeed = 5;
        let fallingInterval = setInterval(() => {
            let top = parseInt(window.getComputedStyle(fallingObject).getPropertyValue('top'));
            if (top < gameContainer.offsetHeight - 30) {
                fallingObject.style.top = top + fallingSpeed + 'px';
            } else {
                clearInterval(fallingInterval);
                gameContainer.removeChild(fallingObject);
            }

            // Check for collision with character
            let characterRect = character.getBoundingClientRect();
            let objectRect = fallingObject.getBoundingClientRect();

            if (objectRect.bottom > characterRect.top &&
                objectRect.top < characterRect.bottom &&
                objectRect.right > characterRect.left &&
                objectRect.left < characterRect.right) {
                    clearInterval(fallingInterval);
                    gameContainer.removeChild(fallingObject);
                    score += 10;
                    scoreDisplay.textContent = 'Score: ' + score;
            }
        }, 20);
    }

    setInterval(createFallingObject, 1000);
});