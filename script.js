const yInput = document.getElementById("y_input")
const calcButton = document.getElementById("calc_button")
const inputErrorMessage = document.getElementById("input-message")
const resultTable = document.getElementById("result-table")

yInput.addEventListener("input", () => {
    yInput.setCustomValidity("")
})
calcButton.onclick = handleCalculateButtonPress

function handleCalculateButtonPress() {
    if (checkInput() & checkCheckboxes()) { // singular '&' cause wanna check both independently
        sendParameters()
    }
}

function sendParameters() {
    let x = document.querySelectorAll('input[name="xbox"]:checked')[0].value
    let y = yInput.value;
    let r = document.querySelectorAll('input[name="rbox"]:checked')[0].value
    let currentTime = getCurrentTime()
    $.ajax({
        type: "POST",
        url: "server.php",
        dataType: "html",
        data: "&x=" + x + "&y=" + y + "&r=" + r + "&time=" + currentTime,
        success: function(data) {
            resultTable.innerHTML += data
        }
    })
}

function getCurrentTime() {
    let date = new Date();
    let hrs = complement(date.getHours())
    let mns = complement(date.getMinutes())
    let scs = complement(date.getSeconds())
    return hrs + ":" + mns + ":" + scs
}

function complement(unit) {
    let num = Number(unit)
    return num < 10 ? "0".concat(num) : num
}

function checkInput() {
    return checkForInput() && checkInputFormat() && checkFracLength() && checkValue()
}

function checkForInput() {
    yInput.validity.valid = false
    if (yInput.value.length < 1) {
        setInputMessage("Please, enter the Y variable")
        showMessage(inputErrorMessage)
        return false
    }
    setInputMessage("")
    hideMessage(inputErrorMessage)
    return true
}

function checkInputFormat() {
    let pattern = /^-?\d+(\.\d+)?$/
    let value = yInput.value.trim()
    if (pattern.test(value) && value.match(pattern)[0].length === value.length) {
        setInputMessage("")
        hideMessage(inputErrorMessage)
        return true
    }
    setInputMessage("The input is not a decimal number.")
    showMessage(inputErrorMessage)
    return false
}

function setInputMessage(message) {
    yInput.setCustomValidity(message)
    inputErrorMessage.innerHTML = message.length !== 0 ? "⬅ " + message : ""
    showMessage(inputErrorMessage)
}

function checkFracLength() {
    if (yInput.value.includes(".")) {
        if (yInput.value.split(".")[1].length > 15) {
            setInputMessage("The fractional part of the entered number is too long, precise calculation is impossible.")
            showMessage(inputErrorMessage)
            return false
        }
    }
    setInputMessage("")
    hideMessage(inputErrorMessage)
    return true
}

function checkValue() {
    let yCoordinate = parseFloat(yInput.value)
    if (-5 < yCoordinate && yCoordinate < 5) {
        setInputMessage("")
        hideMessage(inputErrorMessage)
        yInput.setCustomValidity("")
        return true
    }
    setInputMessage("Entered number is out of the set range.")
    showMessage(inputErrorMessage)
    return false
}

function checkCheckboxes() {
    return checkXBoxes() & checkRBoxes()
}

function checkXBoxes() {
    let checkedXBoxes = document.querySelectorAll('input[name="xbox"]:checked').length
    let errorMessage = document.getElementById("x-message");
    if (checkedXBoxes !== 1) {
        showMessage(errorMessage)
        return false
    } else {
        hideMessage(errorMessage)
        return true
    }
}

function checkRBoxes() {
    let checkedXBoxes = document.querySelectorAll('input[name="rbox"]:checked').length
    let errorMessage = document.getElementById("r-message");
    if (checkedXBoxes !== 1) {
        showMessage(errorMessage)
        return false
    } else {
        hideMessage(errorMessage)
        return true
    }
}
function showMessage(errorMessage) {
    errorMessage.style.display = "inline";
}

function hideMessage(errorMessage) {
    errorMessage.style.display = "none";
}
