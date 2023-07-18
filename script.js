// __________________SLIDER AND PASSWORD LENGTH___________________

let len_value = document.querySelector(".length")
let slider_value = document.querySelector("#slider")
let initial_len_value = 10;

initialvalue()
function initialvalue() {
   len_value.innerText = initial_len_value;
   slider_value.value = initial_len_value;
}


slider_value.addEventListener("input", function () { //input likhne se slider ke saath saath value change hogi
   len_value.innerText = slider_value.value
})

// ____________________GENERATING RANDOM VALUES_____________________

function get_random_integer(min, max) {
   random_number = Math.floor(Math.random() * (max - min)) + min
   return random_number
}

function get_random_uppercase() {
   return String.fromCharCode(get_random_integer(65, 91))

}
function get_random_lowercase() {
   return String.fromCharCode(get_random_integer(97, 123))

}
function get_rand_number() {
   return get_random_integer(0, 9);
}
let symbols = "#$%^&*(){}[];:?/|<>,.~+=-_"

function get_random_symbol() {
   get_random_integer(1, 26)
   return symbols.charAt(random_number)

}

// __________________CHECKBOX EVENTS_______________________

let checkbox1 = document.querySelector("#cb1")
let checkbox2 = document.querySelector("#cb2")
let checkbox3 = document.querySelector("#cb3")
let checkbox4 = document.querySelector("#cb4")
let cbAll = document.querySelectorAll('.cb')

let checkbox_count = 1
cbAll.forEach(fun => {
   fun.addEventListener("change", cb_click => {
      checkbox_count = 0
      if (checkbox1.checked) {
         checkbox_count++
      }
      if (checkbox2.checked) {
         checkbox_count++
      }
      if (checkbox3.checked) {
         checkbox_count++
      }
      if (checkbox4.checked) {
         checkbox_count++
      }
   })
})

// ____________________DIV COLOR_______________________
let strengthIndicator = document.querySelector('.strength-color')

function setColor() {
   if (slider_value.value < 8) {
      strengthIndicator.setAttribute('style', "background-color: red; box-shadow: 0px 0px 5px red;")
   }
   if (slider_value.value >= 8 && slider_value.value < 12 && checkbox_count <= 2) {
      strengthIndicator.setAttribute('style', "background-color: red; box-shadow: 0px 0px 5px red;")
   }
   if (slider_value.value >= 8 && slider_value.value < 12 && checkbox_count > 2) {
      strengthIndicator.setAttribute('style', "background-color: rgb(252, 186, 3); box-shadow: 0px 0px 5px rgb(252, 186, 3);")
   }
   if (slider_value.value >= 8 && slider_value.value < 12 && checkbox_count == 4) {
      strengthIndicator.setAttribute('style', "background-color: chartreuse; box-shadow: 0px 0px 5px chartreuse;")
   }
   if (slider_value.value >= 12 && checkbox_count == 1) {
      strengthIndicator.setAttribute('style', "background-color: red; box-shadow: 0px 0px 5px red;")
   }
   if (slider_value.value >= 12 && checkbox_count == 2) {
      strengthIndicator.setAttribute('style', "background-color: rgb(252, 186, 3); box-shadow: 0px 0px 5px rgb(252, 186, 3);")
   }
   if (slider_value.value >= 12 && checkbox_count >= 3) {
      strengthIndicator.setAttribute('style', "background-color: chartreuse; box-shadow: 0px 0px 5px chartreuse;")
   }
}

// _____________________SHUFFLE PASSWORD_____________________

function shufflePassword(array){  //fisher yates method -- Array pr apply kr ke shuffle kr sakte hai
   for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
   }
   let str = ""
   array.forEach((el) => (str += el))
   return str;
}

// ____________________GENERATE BUTTON_________________________
let password = ''
let verify = false

function generate() {
   verify = true
   if (checkbox_count == 0) {      //IMP TO REMEMBER
      checkbox1.checked = true   //CHECKING THE CHECKBOX USING JS
      checkbox2.checked = true
      checkbox_count = 2
      len_value.innerText = slider_value.value
   }

   setColor()

   if (slider_value.value < checkbox_count) {
      slider_value.value = checkbox_count;
      len_value.innerText = slider_value.value;
   }

   // ___________________GENERATION LOGIC______________________

   let funcArr = [];
   password = ''

   if (checkbox1.checked) {
      funcArr.push(get_random_uppercase)
   }
   if (checkbox2.checked) {
      funcArr.push(get_random_lowercase)
   }
   if (checkbox3.checked) {
      funcArr.push(get_rand_number)
   }
   if (checkbox4.checked) {
      funcArr.push(get_random_symbol)
   }

   console.log(funcArr)

   //COMPULSORY ADDITION
   for (let i = 0; i < funcArr.length; i++) {
      password += funcArr[i]()
   }

   console.log(password)

   //REMAINING ADDITION
   for (let i = 0; i < slider_value.value - funcArr.length; i++) {
      let random_index = get_random_integer(0, funcArr.length);
      password += funcArr[random_index]();
   }

   console.log(password)

   //SHUFFLING THE PASSWORD
   password = shufflePassword(Array.from(password))  //this will convert string to array 

   // ____________________SHOWING PASSWORD__________________________

   let reqPassword = document.querySelector(".output-text");
   reqPassword.innerText = password;

   //______________________REMOVING COPIED__________________________
   remove()
}

// __________________________COPY BUTTON____________________________
let sp = document.querySelector("span")

function copy(){
   if(verify){
      navigator.clipboard.writeText(password)
      sp.setAttribute("style", "opacity: 1; transition: opacity 200ms ease;")
   }
}

function remove(){
   sp.setAttribute("style", "opacity: 0; transition: opacity 200ms ease;")
}