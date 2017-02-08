let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if(answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }
    if (!validateInput(input.value)) {
        return false;
    }
    attempt.value += 1;

    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

function showAnswer(success) {
    let code = document.getElementById('code');
    if (success) {
      code.className += ' success';
    } else {
        code.className += ' failure'
    }
    code.innerHTML = answer.value;
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}

function getResults(input) {
    let match = true;
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    const len = input.length;
    for (let i = 0; i < len; i++) {
      if (input.charAt(i) === answer.value.charAt(i)) {
          html += '<span class="glyphicon glyphicon-ok"></span>';
          correct++;
      } else if (answer.value.indexOf(input.charAt(i)) > -1) {
          html += '<span class="glyphicon glyphicon-transfer"></span>';
          match = false;
      } else {
          html += '<span class="glyphicon glyphicon-remove"></span>';
          match = false;
      }
    }
    html += '</div></div>';
    document.getElementById('results').innerHTML = html;

    if (match) {
        return true;
    }
    return false;
}

function setHiddenFields() {
    answer.value = Math.floor(Math.random() * 10000).toString();
    while(answer.value.length < 4) {
        answer.value += '0' + answer.value;
    }
    attempt.value = 0;
}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
    if (input.length === 4) {
        return true;
    }
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
}