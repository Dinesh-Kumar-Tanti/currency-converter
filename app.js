const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll('.dropdown select')
// const select = document.querySelector('select') will only work for 1st select. Second select will be ignored. loop must be used to access both
const btn = document.querySelector('.btn')
const fromCurrency = document.querySelector(".from select")
const toCurrency = document.querySelector(".to select")
const msg = document.querySelector(".msg")


window.addEventListener("load", ()=>{
    updateExchangeRate()
})



for (let select of dropdowns) {  //loop for both of the dropdowns
    for (let currencyCode in countryList) {
        // console.log(currencyCode)
        let newOption = document.createElement("option")
        newOption.innerHTML = currencyCode
        newOption.value = currencyCode
        select.append(newOption)

        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected"
        }
        else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected"
        }
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}

const updateFlag = (elem) => {
    let currencyCode = elem.value;
    let countryCode = countryList[currencyCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/32.png`
    let img = elem.parentElement.querySelector("img")
    img.src = newSrc;
    img.alt = `${currencyCode} flag`;
}


btn.addEventListener("click", (e) => {
    e.preventDefault()
    updateExchangeRate()
})


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal < 1 || amtVal === "") {
        amtVal = 1
        amount = 1
    }
    // console.log(amtVal)

    const fromCurr = fromCurrency.value.toLowerCase()// usd
    const toCurr = toCurrency.value.toLowerCase()//inr
    // console.log(fromCurr, toCurr)

    let url = `${BASE_URL}/${fromCurr}.json`

    let response = await fetch(url)
    // console.log(response)
    let data = await response.json()
    // console.log(data[fromCurr][toCurr])
    let rate = data[fromCurr][toCurr]

    let finalAmount = amtVal * rate;

    msg.innerHTML = `${amtVal} ${fromCurr.toUpperCase()} = ${finalAmount} ${toCurr.toUpperCase()}`

}


