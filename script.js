{
  // CHECK FOR MODAL & CLICK SEND BTN
  async function clickModalSendButton() {
    const otherBtns = [...document.querySelectorAll('button')].filter(
      button => {
        return button.ariaLabel && button.ariaLabel.startsWith('Other');
      }
    );

    const connectBtns = [...document.querySelectorAll('button')].filter(
      button => {
        return button.ariaLabel && button.ariaLabel.startsWith('Connect');
      }
    );

    if (otherBtns.length > 0) {
      otherBtns[0].click();
      setTimeout(() => connectBtns[0].click(), 100);
    }

    function hitSendButton() {
      const sendBtns = [...document.querySelectorAll('button')].filter(
        button => {
          return button.ariaLabel && button.ariaLabel.startsWith('Send');
        }
      );
      sendBtns[0].click();
    }
    setTimeout(hitSendButton, 500);
  }

  function delayedLoop(myArray) {
    return new Promise((resolve, reject) => {
      let index = 0;

      function loop() {
        if (index >= myArray.length) {
          resolve();
          return;
        }
        myArray[index].click();
        setTimeout(clickModalSendButton, 1000);
        index++;

        setTimeout(loop, 2000);
      }

      loop();
    });
  }

  async function connectLoop() {
    // get invite buttons
    const inviteButtons = [...document.querySelectorAll('button')].filter(
      button => button.ariaLabel && button.ariaLabel.startsWith('Invite')
    );

    await delayedLoop(inviteButtons);
    loadNextPage();
  }

  function loadNextPage() {
    const paginationButtons = document.querySelectorAll(
      '.artdeco-pagination__indicator--number button'
    );
    paginationButtons.forEach((button, index) => {
      if (button.parentNode.classList.contains('active')) {
        //this button is the currently selected page, click on the next page button if it's available
        if (paginationButtons[index + 1]) {
          paginationButtons[index + 1].click();
        }
        //exit loop
        return;
      }
    });

    setTimeout(connectLoop, 3333);
  }

  connectLoop();
  // https://www.linkedin.com/search/results/people/?heroEntityKey=urn%3Ali%3Aautocomplete%3A-2109737947&keywords=technical%20recruiter&origin=SWITCH_SEARCH_VERTICAL&page=2&position=0&searchId=e22e6326-75dd-4648-8865-9aed50d54c53&sid=ccL
}
