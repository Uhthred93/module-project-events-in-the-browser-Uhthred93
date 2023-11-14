// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        if (!square.classList.contains('targeted')) {
          getAllSquares().forEach(sq => sq.classList.remove('targeted'));
          square.classList.add('targeted');
        } // 👉 TASK 2 - Use a click handler to target a square 👈
      });
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', event => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    const currentSquare = document.querySelector('.square.targeted');
    if (!currentSquare) return;

    let targetRow = currentSquare.parentElement;
    let targetSquareIndex = Array.from(targetRow.children).indexOf(currentSquare);

    switch (event.key) {
      case keys.up:
        if (targetRow.previousElementSibling) {
          changeHighlight(targetRow.previousElementSibling.children[targetSquareIndex]);
        }
        break;
        case keys.down:
          if (targetRow.nextElementSibling) {
            changeHighlight(targetRow.nextElementSibling.children[targetSquareIndex]);
          }
          break;
          case keys.left:
            if (targetSquareIndex > 0) {
              changeHighlight(currentSquare.previousElementSibling);
            }
            break;
            case keys.right:
              if (targetSquareIndex < targetRow.children.length - 1) {
                changeHighlight(currentSquare.nextElementSibling);
              }
              break;
    }
  });  
    function changeHighlight(newTarget) {
      document.querySelector('.square.targeted').classList.remove('targeted');
      newTarget.classList.add('targeted');
    }
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    document.addEventListener('keydown', function(event) {
      if (event.key === ' ') {
        const targetedSquare = document.querySelector('.square.targeted');
        if (!targetedSquare) return;

        const mosquito = targetedSquare.querySelector('img[data-status="alive"]');
        if (mosquito) {
          mosquito.dataset.status = 'dead';
          targetedSquare.style.backgroundColor = 'red';
        }
      }
    });
    // 👉 TASK 5 - End the game 👈
    function endGame() {
      const timeElapsed = getTimeElapsed();
      document.querySelector('p.info').textContent = `Extermination completed in ${Math.floor(timeElapsed / 1000)} seconds!`;
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Restart';
      restartButton.addEventListener('click', () => window.location.reload());
      document.querySelector('header h2').appendChild(restartButton);
      restartButton.focus();
    }

    document.addEventListener('keydown', function(event) {
      if (event.key === ' ') {
        const liveMosquitoes = document.querySelectorAll('img[data-status="alive"]');
        if (liveMosquitoes.length === 0) {
          endGame();
        }
      }
    })
    // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
