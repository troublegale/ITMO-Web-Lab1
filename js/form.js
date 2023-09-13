const yInput = document.getElementById("y_input")
yInput.addEventListener("input", (event) => {
    yInput.setCustomValidity("")
})

const calcButton = document.getElementById("calc_button")
calcButton.onclick = handleCalculateButtonPress

const form = document.forms[0]
form.onsubmit = handleCalculateButtonPress

function handleCalculateButtonPress() {
    let yInputReference = {Value: document.getElementById("y_input")}
    if (checkForInput(yInputReference) && checkInputFormat(yInputReference)
        && checkFracLength(yInputReference) && checkValue(yInputReference) && checkCheckboxes()) {
        sendParameters()
    }
}

function checkForInput(textFieldReference) {
    let textField = textFieldReference.Value
    if (textField.value.length < 1) {
        textField.setCustomValidity("Please, enter the Y variable")
        return false
    }
    textField.setCustomValidity("")
    return true
}

function checkInputFormat(textFieldReference) {
    let textField = textFieldReference.Value
    let pattern = /^-?\d+(\.\d+)?$/
    let value = textField.value.trim()
    if (pattern.test(value) && value.match(pattern)[0].length === value.length) {
        textField.setCustomValidity("")
        return true
    }
    textField.setCustomValidity("The input is not a decimal number.")
    return false
}

function checkFracLength(textFieldReference) {
    let textField = textFieldReference.Value
    if (textField.value.includes(".")) {
        if (textField.value.split(".")[1].length > 15) {
            textField.setCustomValidity("The fractional part of the entered number is too long, " +
                "precise calculation is impossible.")
            return false
        }
    }
    textField.setCustomValidity("")
    return true
}
function checkValue(textFieldReference) {
    let textField = textFieldReference.Value
    let yCoordinate = parseFloat(textField.value)
    if (-5 < yCoordinate && yCoordinate < 5) {
        textField.setCustomValidity("")
        return true
    }
    textField.setCustomValidity("Entered number is out of the set range.")
    return false
}

function checkCheckboxes() {

}

function checkXBoxes() {
    let checkedXBoxes = document.querySelectorAll('input[name="xbox"]:checked').length
    if (checkedXBoxes !== 1) {

    }
}
function sendParameters() {

}
