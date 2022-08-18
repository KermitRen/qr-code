//Global Variables
const form = document.getElementById("inputForm")
const urlInput = document.getElementById("urlInput")
const sizeInput = document.getElementById("sizeInput")
const result = document.getElementById("result")
const spinner = document.getElementById("spinner")
const code = document.getElementById("qrCode")
const saveButton = document.getElementById("saveButton")
const clearButton = document.getElementById("clearButton")

form.addEventListener("submit", (e) => {

    e.preventDefault()

    if(urlInput.value) {
        showResults(false)
        clearResults()
        showSpinner(true)
        setTimeout(generateNewCode, 1000)
    } else {
        alertify.alert().setting({
            message: "test dialog"
        })
        alert("please provide a URL")
    }
})

clearButton.addEventListener("click", () => {
    showResults(false)
    clearResults()
})

function showResults(show) {
    result.style.display = show ? "flex" : "none"
}

function showSpinner(show) {
    spinner.style.display = show ? "flex" : "none"
}

function clearResults() {
    while(code.children.length > 0) {
        code.removeChild(code.firstChild)
    }
}

function generateNewCode() {
    //Create the QR-Code
    const url = urlInput.value
    const size = parseInt(sizeInput.value)
    clearResults()
    new QRCode(code, {
        text: url,
        width: size,
        height: size
    });
    setTimeout(() => {
        saveButton.href = code.querySelector('img').src, 50
        showSpinner(false)
        showResults(true)
    })
}