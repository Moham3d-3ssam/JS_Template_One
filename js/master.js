/* Start Setting Box */
document.querySelector(".setting-icon").onclick = function (){
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
}
/* End Setting Box */
/*----------------------------------------------------*/
/* Start Switch Color */
let colorLocal = localStorage.getItem("color-option");
if(colorLocal !== null){
  document.documentElement.style.setProperty("--main-color", colorLocal);

  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");

    if(element.dataset.color === colorLocal){
      element.classList.add("active");
    }
  })
}

const colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach(li => {

  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  })

})
/* End Switch Color */
/*----------------------------------------------------*/
/* Start Random Background */
let backgroundChangeOption = true;
let backgroundChooseLocal = localStorage.getItem("background_choose");
let backgroundInterval;
let backgroundChooseOption = true;
const chooseBackground = document.querySelectorAll(".option-box img");

let backgroundChangeLocal = localStorage.getItem("background_change");
if(backgroundChangeLocal !== null && backgroundChooseLocal === null){
  if(backgroundChangeLocal === 'true'){
    backgroundChangeOption = true;
  }else{
    backgroundChangeOption = false;
  }

  document.querySelectorAll(".randomBackground span").forEach((e) =>{
    e.classList.remove("active");
  })

  if(backgroundChangeLocal === 'true'){
    document.querySelector(".randomBackground .yes").classList.add("active");
  }else{
    document.querySelector(".randomBackground .no").classList.add("active");
  }
}

const optionBackground = document.querySelectorAll(".randomBackground span");
optionBackground.forEach(span => {

  span.addEventListener("click", (el) => {

    handleActive(el);

    // Stop Work Of (active) Choose Background
    chooseBackground.forEach((e) => {
      e.classList.remove("active");
    })
    localStorage.setItem("background_choose", true);

    if(el.target.dataset.background === "yes"){
      backgroundChangeOption = true;
      randomizeImgs();
      localStorage.setItem("background_change", true);
    }else{
      backgroundChangeOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_change", false);
    }

    // Make (background_choose) Local Storage Is Null
    localStorage.removeItem("background_choose");
  })

})
/* End Random Background */
/*----------------------------------------------------*/
/* Start Reset Options */
document.querySelector(".setting-box .reset-options").onclick = function (){

  localStorage.removeItem("color-option");
  localStorage.removeItem("background_choose");
  localStorage.removeItem("background_change");
  localStorage.removeItem("displayBullets");
  window.location.reload();
}
/* End Reset Options */
/*----------------------------------------------------*/
/* Start Choose Background */
if(backgroundChooseLocal !== null){
  document.querySelector(".landing").style.cssText = `background-image: url("../images/0${backgroundChooseLocal}.jpg")`;

  // Add Properties Of (active) to Active Image
  chooseBackground.forEach(ima => {
    if(ima.dataset.image === backgroundChooseLocal){
      ima.classList.add("active");
    }
  })

  // Stop Work Of Change Background
  backgroundChangeOption = false;
  clearInterval(backgroundInterval);
  // To Stop Work Of Span Which Its Value Is (Yes)
  optionBackground[0].classList.remove("active");
  // To Work Span Which Its Value Is (No)
  optionBackground[1].classList.add("active");
}

chooseBackground.forEach(ima => {
  ima.addEventListener("click", (imag) => {

    imag.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    })

    imag.target.classList.add("active");

    // Stop Work Of Change Background
    clearInterval(backgroundInterval);
    // To Stop Work Of Span Which Its Value Is (Yes)
    optionBackground[0].classList.remove("active");
    // To Work Span Which Its Value Is (No)
    optionBackground[1].classList.add("active");
    backgroundChangeOption = false;

    localStorage.setItem("background_choose", imag.target.dataset.image);

    document.querySelector(".landing").style.cssText = `background-image: url("../images/0${imag.target.dataset.image}.jpg")`;
  })
})
/* End Choose Background */
/*----------------------------------------------------*/
/* Start Change Background */
let landingPage = document.querySelector(".landing");

let changeImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImgs(){
  if(backgroundChangeOption === true){
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * changeImages.length);
      landingPage.style.cssText = `background-image: url("../images/${changeImages[randomNumber]}")`;;
    }, 10000);
  }
}
// Recall Function
randomizeImgs();
/* End Change Background */
/*----------------------------------------------------*/
/* Start Skills Progress */
let skillsSection = document.querySelector(".skills");

window.onscroll = function (){
  let SkillsOffsetTop = skillsSection.offsetTop;
  let SkillsOffsetHeight = skillsSection.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowOffset = this.scrollY;

  let skills = document.querySelectorAll(".skills .skill-progress span");
  if((windowOffset * 1.5) > ((SkillsOffsetTop + SkillsOffsetHeight - windowHeight - 1))){

    skills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    })
  // To Reset Prgoress To (0) When Go Top Again
  }else if(windowOffset < (SkillsOffsetTop - windowHeight)){
    skills.forEach((skill) => {
      skill.style.width = "0px";
    })
  }
}
/* End Skills Progress */
/*----------------------------------------------------*/
/* Start Popup */
let imags = document.querySelectorAll(".gallery .imgs-box");

imags.forEach((img) => {

  img.addEventListener("click", (e) => {
    // Create Popup Overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Create Popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    // Create Img Text
    if(e.target.alt !== null){
      let popupText = document.createElement("h3");
      let text = document.createTextNode(e.target.alt);
      popupText.append(text);
      popupBox.append(popupText);
    }

    // Create Popup Img
    let imgPopup = document.createElement("img");
    imgPopup.className = "popup-img";
    imgPopup.src = e.target.src;

    popupBox.appendChild(imgPopup);
    document.body.appendChild(popupBox);

    // Create Close Button
    let closeButton = document.createElement("span");
    let textButton = document.createTextNode("X");
    closeButton.className = "close-button";

    closeButton.appendChild(textButton);
    popupBox.appendChild(closeButton);
  })
})

// Click On Close Button
document.addEventListener("click", function (e){
  if(e.target.className === "close-button"){
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
})
/* End Popup */
/*----------------------------------------------------*/
/* Start Bullets */
let bullets = document.querySelectorAll(".bullets .bullet");
let links = document.querySelectorAll(".landing .links li");

function scroll(elements){
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}

scroll(links);
scroll(bullets);
/* End Bullets */
/*----------------------------------------------------*/
/* start Show Bullets */
let bulletsOption = document.querySelectorAll(".option-box .bulletsDisplay span");
let bulletsContainer = document.querySelector(".bullets");
let bulletsLocal = localStorage.getItem("displayBullets");

if(bulletsLocal !== null){

  bulletsOption.forEach((e) => {
    e.classList.remove("active");
  })

  if(bulletsLocal === "block"){
    bulletsContainer.style.display = "block";
    document.querySelector(".bulletsDisplay .yes").classList.add("active");
  }else{
    bulletsContainer.style.display = "none";
    document.querySelector(".bulletsDisplay .no").classList.add("active");
  }
}

bulletsOption.forEach((e) => {

  e.addEventListener("click", function (ev){

    if(ev.target.dataset.display === "show"){
      bulletsContainer.style.display = "block";
      localStorage.setItem("displayBullets", "block");
    }else{
      bulletsContainer.style.display = "none";
      localStorage.setItem("displayBullets", "none");
    }

    handleActive(ev);
  })

})
/* End Show Bullets */
/*----------------------------------------------------*/
/* start Handle Active */
function handleActive(ev){
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  })

  ev.target.classList.add("active");
}
/* End Handle Active */
/*----------------------------------------------------*/
/* Start Toggle Menu */
let menu = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

menu.onclick = function (e){
  this.classList.toggle("active-menu");
  e.stopPropagation();
  menu.classList.toggle("active");

  tLinks.classList.toggle("open");
}
tLinks.onclick = function (e){
  e.stopPropagation();
}
document.addEventListener("click", (e) => {
  if((e.target !== menu && e.target !== tLinks)){
    if(tLinks.classList.contains("open")){
      menu.classList.toggle("active-menu");
      tLinks.classList.toggle("open");
      menu.classList.toggle("active");
    }
  }
})
/* End Toggle Menu */
