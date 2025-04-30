const inputEl1 = document.querySelector("#num-1");
const inputEl2 = document.querySelector("#num-2");
const inputEl3 = document.querySelector("#num-3");
const inputEl4 = document.querySelector("#num-4");
const panelMsgTop = document.querySelector("#panel-msg-top");
const panelMsgBottom = document.querySelector("#panel-msg-bottom");
const codeInputs = document.querySelectorAll('[data-code-input]');


let newToastEl = '';
let currentCode = '';
// auto toast
function showMeTheToast() {
    currentCode = Math.floor(Math.random() * 9000) + 1000;

    newToastEl = document.createElement("div");
    newToastEl.className = "absolute top-4 right-4 transition-all duration-300 ease-in-out border border-black/30 rounded-xl p-4 text-center text-sm bg-black/90 text-white -translate-y-72 space-y-2";
    const titleEl = document.createElement("p");
    titleEl.className = "text-sm";
    titleEl.innerText = "Your one time code is:";

    const codeEl = document.createElement("div");
    codeEl.className = 'flex gap-2 items-center justify-center text-xl font-bold';
    const codeCopyBtn = document.createElement("button");
    codeCopyBtn.className = "material-symbols-outlined text-base font-normal";
    codeCopyBtn.innerText = "content_copy"
    codeCopyBtn.title ="click to copy code"
    codeEl.innerText = currentCode;
    codeEl.append(codeCopyBtn);

    const footerEl = document.createElement("p");
    footerEl.className = "text-xs";
    footerEl.innerText = "This code will expire in 10 minutes";

    newToastEl.append(titleEl)
    newToastEl.append(codeEl)
    newToastEl.append(footerEl)

    // Append the element to the body
    document.body.appendChild(newToastEl);
    // reveal toast
    setTimeout(() => newToastEl.classList.remove("-translate-y-72"), 300)

    // button to copy code
    codeCopyBtn.addEventListener("click", () => copyCode(currentCode))
}
// copy code to codeInputs
function copyCode(code) {
    const codeArr = String(code).split("");
    inputEl1.value = codeArr[0];
    inputEl2.value = codeArr[1];
    inputEl3.value = codeArr[2];
    inputEl4.value = codeArr[3];

    // call checkcode function after a short delay to simulate processing
    setTimeout(() => {
        checkCode()
        removeToast()
    }, 1000);

}
// remove the toas from te dom
function removeToast() {
    if (newToastEl) {
        //console.log("remove toast...")
        newToastEl.classList.add("scale-0");
        setTimeout(() => newToastEl.remove(), 300)
    }
}
// reset input values
function resetAll() {
    inputEl1.value = "";
    inputEl2.value = "";
    inputEl3.value = "";
    inputEl4.value = "";
    
    // unset current code
    currentCode = '';
}

// Call the function after 3 seconds
setTimeout(showMeTheToast, 1000);

// send new code
document.querySelector("#btn-new-code").addEventListener("click", () => {
    // remove existing toast
    removeToast()
    // reset codeInputs
    resetAll()
    // send new code
    setTimeout(showMeTheToast, 1000);
    // set focus to first input
    inputEl1.focus();
});

// Function to check if the input values match the specific 4-digit code
function checkCode() {
    
    const num1 = inputEl1.value;
    const num2 = inputEl2.value;
    const num3 = inputEl3.value;
    const num4 = inputEl4.value;
    // Check if all codeInputs have content
    if (num1 && num2 && num3 && num4) {
        // Combine the input values into a single string
        const inputCode = num1 + num2 + num3 + num4;
        if (inputCode == "") return;
     
        
        // Check if the input code matches the specific code
        setTimeout(() => {
            if (inputCode == currentCode) {
                // Call another function if the codes match
                codeValid();
            } else {
                codeNotValid();
            }
        }, 1000);
    }
}

// code is correct - show message
function codeValid() {
    panelMsgTop.classList.remove("-translate-y-full")
    panelMsgBottom.classList.remove("translate-y-full")
    setTimeout(() => {
        panelMsgTop.classList.add("-translate-y-full")
        panelMsgBottom.classList.add("translate-y-full")
        // remove existing toast
        removeToast()

        // reset values
        resetAll()
        window.location.href = "https://i-products.web.app";
    }, 3000)
}

// code is not valid - show new toast
function codeNotValid() {
    // remove existing toast
    removeToast()
    // reset
    resetAll()
    // generate alert toast (delay to preven it getting removed by the timeout)
    setTimeout(() => generateToast("The code is not valid. Please request a new one."),510)
    // set focus to first input
    inputEl1.focus();
}

// Utility - numbers only
function onlyNumberKey(evt) {
    var inputValue = evt.target.value;
    var newValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    evt.target.value = newValue;
}

// code inputs events
codeInputs.forEach((input, index) => {
    input.addEventListener('input', function (e) {
        // only allow numbers
        onlyNumberKey(e);
        // check code is valid
        checkCode()

        // move to next ig it has a value and it's not the last input
        if (this.value && index < codeInputs.length - 1) {
            codeInputs[index + 1].focus();
        }
    });
});

function generateToast(msg) {
    newToastEl = document.createElement("div");
    newToastEl.className = "absolute top-4 right-4 transition-all duration-300 ease-in-out border border-black/30 rounded-xl p-4 text-center text-sm bg-red-900 text-white -translate-y-72 w-56";
    const titleEl = document.createElement("p");
    titleEl.className = "text-sm";
    titleEl.innerText = msg;

    newToastEl.append(titleEl);

    // Append the element to the body
    document.body.appendChild(newToastEl);
    // reveal toast
    setTimeout(() => newToastEl.classList.remove("-translate-y-72"), 0)
}
