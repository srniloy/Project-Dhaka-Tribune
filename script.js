let currentDate = new Date();
const dateText = document.querySelector('.header-date');
const updateTimeText = document.querySelector('.header-time-update');
let day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let month = ["Jan","Feb","March","April","May","Jun","July","August","September","October","November","December"];



dateText.innerHTML = day[currentDate.getDay()] + ", " + month[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear() ;

let timePeriod = "am";
let hours = currentDate.getHours();
let mins = currentDate.getMinutes();
if(hours>12){
    timePeriod = "pm";
    hours = hours - 12;
}
if(hours<10){hours = "0" + hours;}
if(mins<10){mins = "0" + mins;}

updateTimeText.innerHTML = ("Last update : "+hours+":"+mins+" "+ timePeriod);



// ======================= Fixed Navigation bar ===========================

const navStart = document.querySelector('.top-navbar');
const topSpace = navStart.offsetTop;

window.addEventListener('scroll',()=>{
    if(window.scrollY >= topSpace){
        document.body.classList.add('fixed-nav');
    }else{
        document.body.classList.remove('fixed-nav');
    }
});


const navLi = document.querySelectorAll('.main-ul li.has-dropdown');
let dropDownUl = document.querySelectorAll('.dropdown-ul');

navLi.forEach((element,i) =>{
        element.addEventListener('mouseover',()=>{
            dropDownUl[i].style.display = "block";
            setTimeout(()=>{
                dropDownUl[i].style.opacity = "1";
                dropDownUl[i].style.transform = "translateY(-"+5+"px)";
            },100);
        });
        element.addEventListener('mouseleave',()=>{
            dropDownUl[i].style.display = "none";
            setTimeout(()=>{
                dropDownUl[i].style.opacity = "0";
                dropDownUl[i].style.transform = "translateY(-"+0+"px)";
            },100);
        });

});




// const videoItems = document.querySelectorAll('.video-item');
// const allSlideContainer = document.querySelector('.all-slide-items');

// videoScroll();
// function videoScroll(){
//     console.log(allSlideContainer.offsetWidth);
//     if(window.innerWidth <= 572){
//         videoItems.forEach((element)=>{
//             element.style.width = (allSlideContainer.offsetWidth / 2) - (15/2) + "px";
//         });
//     }
// }






// ======================= Fixed Navigation bar ===========================

// ===================== Video Section==========================




const sliderArea = document.querySelector('.slider-area');
const leftBtn = document.querySelector('.slider-area .left-btn');
const rightBtn = document.querySelector('.slider-area .right-btn');
const sliderContainer = document.querySelector('.slide-container');
const slideBox = document.querySelector('.slide-box');

const slides = document.querySelectorAll('.video-item');
const slideContents = document.querySelectorAll('.slide-content');
const widthOfSliderArea = sliderArea.offsetWidth;
const numberOfTotalSlides = slides.length;
let displaySlide = 6;

// Fixing widths ------>

slides.forEach((element,i) =>{
    element.style.width = widthOfSliderArea/displaySlide + "px";
    slideContents[i].style.width = (widthOfSliderArea/6)-15 + "px";
});

// <-------------------



// cloning of sliderBox ----->
const cloneSlideBox = slideBox.cloneNode(true);

cloneSlideBox.style.left = "-" + slideBox.offsetWidth + "px";
cloneSlideBox.classList.add("cloned-slide-box");
sliderContainer.appendChild(cloneSlideBox);

// <-----------------











const leftWidthOfSlider = sliderArea.offsetLeft;
let clickedPositionXOfSlider;
let instantMovingPositionXOfSlider;
let dragedValueXOfSlider;
let translatedValueXOfSlider = 0;
let instantTranslatedValueXOfSlider;
const XForChangesInSlideBox = (slides[0].offsetWidth *6.5); // 740
const XForChangesInCloneSlideBox = (slides[0].offsetWidth * 6.5) + slideBox.offsetWidth; // 2960
let cloneSliderPosition;
let SliderPosition;

let isdraging;
let isDragingLeft;
let isUp = true;
let isLeave = true;
let isStartPositioningSlideBox;
let isStartPositioningcloneSlideBox;

let doForSlideBoxRight;
let doForCloneSlideBoxRight;
let doForSlideBoxLeft;
let doForCloneSlideBoxLeft;
let slideNumberByButton = 0;


//let autoAnimatingTimeInterval = setInterval(() => {rightBtnAction();}, 1500);


sliderArea.addEventListener('mouseleave',()=>{
    isdraging = false;
    isLeave = true;
    if(isUp == false){
        upOrLeaveAction();
        isUp = true;
    }
    //autoAnimatingTimeInterval = setInterval(() => {rightBtnAction();},1500);
});
sliderArea.addEventListener('mouseover',()=>{
    //clearInterval(autoAnimatingTimeInterval);
});
sliderArea.addEventListener('mouseup',()=>{
    isdraging = false;
    if(isLeave == false){upOrLeaveAction(); isLeave = true;}
    isUp = true;
    
});
sliderArea.addEventListener('mousedown',(e)=>{
    e.preventDefault();
   isdraging = true;
   clickedPositionXOfSlider = e.pageX - leftWidthOfSlider;
});
//window.addEventListener('dragenter')
sliderArea.addEventListener('mousemove',(e)=>{
    e.preventDefault();
    if(isdraging){
        
        dragedValueXOfSlider = (e.pageX-leftWidthOfSlider) - clickedPositionXOfSlider;
        instantMovingPositionXOfSlider = e.pageX - leftWidthOfSlider;
        instantTranslatedValueXOfSlider = translatedValueXOfSlider + dragedValueXOfSlider;
        if(dragedValueXOfSlider<0){isDragingLeft = true;}
        else if(dragedValueXOfSlider>0){isDragingLeft = false;}
        slideBox.style.transition = `all 0ms`;
        cloneSlideBox.style.transition = `all 0ms`;
        AniOfSliding();
        isUp = false;
        isLeave = false;
    }
    
});


function upOrLeaveAction(){
    translatedValueXOfSlider += dragedValueXOfSlider;

    let slideNumber;
    if(dragedValueXOfSlider<0){
        slideNumber = Math.floor(translatedValueXOfSlider/slides[0].offsetWidth);
    }else{
        slideNumber = Math.ceil(translatedValueXOfSlider/slides[0].offsetWidth);
    }
    
    translatedValueXOfSlider = slides[0].offsetWidth * slideNumber;
    instantTranslatedValueXOfSlider = translatedValueXOfSlider;
    slideNumberByButton = slideNumber;
    setTimeout(() => {
        slideBox.style.transition = `all 300ms`;
        cloneSlideBox.style.transition = `all 300ms`;
        //animationOfDots();
        AniOfSliding();
    }, 100);
}





rightBtn.addEventListener("click",()=>{
    rightBtnAction();
    
});
leftBtn.addEventListener("click",()=>{
    leftBtnAction();
    
});


function rightBtnAction(){
    slideNumberByButton--;
    translatedValueXOfSlider = slides[0].offsetWidth * slideNumberByButton;
    instantTranslatedValueXOfSlider = translatedValueXOfSlider;
    AniOfSliding();
    //animationOfDots();
}
function leftBtnAction(){
    slideNumberByButton++;
    translatedValueXOfSlider = slides[0].offsetWidth * slideNumberByButton;
    instantTranslatedValueXOfSlider = translatedValueXOfSlider;
    AniOfSliding();
    //animationOfDots();
}









// Changing Animation of slides -------------------------->



function AniOfSliding(){
    
    
    // reset ->

    if(instantTranslatedValueXOfSlider >= (slideBox.offsetWidth * 2)){
        translatedValueXOfSlider = 0;
        slideNumberByButton = 0;

    }
    if(instantTranslatedValueXOfSlider <= (slideBox.offsetWidth * (-2))){
        translatedValueXOfSlider = 0;
        slideNumberByButton = 0;

    }

    // <-


    // Right Slde Transition ->

    
    
    if(((XForChangesInSlideBox * (-1)) <= instantTranslatedValueXOfSlider) 
    && (0 >= instantTranslatedValueXOfSlider)){
        doForCloneSlideBoxRight = true;
        cloneSlideBox.style.transform = `translateX(${instantTranslatedValueXOfSlider}px)`;
    }
    else if((XForChangesInSlideBox * (-1)) > instantTranslatedValueXOfSlider){

        cloneSliderPosition = (slideBox.offsetWidth*2) + instantTranslatedValueXOfSlider;
        
        if(doForCloneSlideBoxRight){
            cloneSlideBox.style.zIndex = "-1";
            setTimeout(()=>{
                cloneSlideBox.style.transform = `translateX(${cloneSliderPosition}px)`;
                setTimeout(() => {
                    cloneSlideBox.style.zIndex = "1";
                }, 300);
            },40);
            doForCloneSlideBoxRight = false;
        }else{
            cloneSlideBox.style.transform = `translateX(${cloneSliderPosition}px)`;
        }
    }


    if(((XForChangesInCloneSlideBox * (-1)) <= instantTranslatedValueXOfSlider)
    && (0 >= instantTranslatedValueXOfSlider)){
        slideBox.style.transform = `translateX(${instantTranslatedValueXOfSlider}px)`;
        doForSlideBoxRight = true;
    }
    else if((XForChangesInCloneSlideBox * (-1)) > instantTranslatedValueXOfSlider){
        SliderPosition = (cloneSlideBox.offsetWidth*2) + instantTranslatedValueXOfSlider;

        if(doForSlideBoxRight){

            slideBox.style.zIndex = "-1";
            setTimeout(()=>{
                slideBox.style.transform = `translateX(${SliderPosition}px)`;
                setTimeout(() => {
                    slideBox.style.zIndex = "1";
                }, 300);
            },40);


            doForSlideBoxRight = false;
        }else{
            slideBox.style.transform = `translateX(${SliderPosition}px)`;
        }
    }


    // <-




    // Left Side Transition ->
    

    if(((XForChangesInSlideBox * (1.2)) >= instantTranslatedValueXOfSlider)
    && (0 <= instantTranslatedValueXOfSlider)){
        slideBox.style.transform = `translateX(${instantTranslatedValueXOfSlider}px)`;
        doForSlideBoxLeft = true;
    }
    else if((XForChangesInSlideBox * (1.2)) < instantTranslatedValueXOfSlider){

            cloneSliderPosition = (slideBox.offsetWidth*(-2)) + instantTranslatedValueXOfSlider;
            //cloneSlideBox.style.left = `${cloneSlidePosition}px`;
    
            if(doForSlideBoxLeft){
                slideBox.style.zIndex = "-1";
            setTimeout(()=>{
                slideBox.style.transform = `translateX(${cloneSliderPosition}px)`;
                setTimeout(() => {
                    slideBox.style.zIndex = "1";
                }, 300);
            },40);
                doForSlideBoxLeft = false;
            }else{
                slideBox.style.transform = `translateX(${cloneSliderPosition}px)`;
            }
        }



    if(((XForChangesInCloneSlideBox * (1.15)) >= instantTranslatedValueXOfSlider) 
    && (0 <= instantTranslatedValueXOfSlider)){
        cloneSlideBox.style.transform = `translateX(${instantTranslatedValueXOfSlider}px)`;
        doForCloneSlideBoxLeft = true;
    }
    else if((XForChangesInCloneSlideBox * (1.15)) < instantTranslatedValueXOfSlider){
        SliderPosition = (slideBox.offsetWidth*(-2)) + instantTranslatedValueXOfSlider;
        
        if(doForCloneSlideBoxLeft){
            cloneSlideBox.style.zIndex = "-1";
            setTimeout(()=>{
                cloneSlideBox.style.transform = `translateX(${SliderPosition}px)`;
                setTimeout(() => {
                    cloneSlideBox.style.zIndex = "1";
                }, 300);
            },40);
            doForCloneSlideBoxLeft = false;
        }else{
            cloneSlideBox.style.transform = `translateX(${SliderPosition}px)`;
        }
    }

    // <---




}




// <-----------------------------------------------------------------------



// ===================== Video Section==========================

// ===================== type by button click================

const typeBtn = document.querySelectorAll('.type-btns-area li');

const typeCnt = document.querySelectorAll('.type-contents-area .type-content');

typeBtn.forEach((b,j)=>{
    b.addEventListener('mousedown', ()=>{
        for(let i=0;i<typeBtn.length;i++){
            typeCnt[i].style.opacity = 0;
            typeBtn[i].style.backgroundColor = "#fff";
            typeBtn[i].style.color = "rgb(32, 31, 31)";
        }
        b.style.backgroundColor = "#cc0c0c";
        b.style.color = "#fff";
        typeCnt[j].style.opacity = 1;
    });
});



const typeContent = document.querySelector('.type-contents-area .type-content');
const typeContentArea = document.querySelector('.type-contents-area');
typeContentArea.style.height = typeContent.offsetHeight + "px";


// window.addEventListener('resize',()=>{
//     typeContentArea.style.height = typeContent.offsetHeight + "px";
//     videoScroll();
// });

// ===================== type by button click================

// ====================== Small Slider==================


const ssSlideArea = document.querySelector('.ss-small-slider');
const ssSlidesbox = document.querySelector('.ss-sslide-box');
const ssSlide = document.querySelector('.ss-slides');
let ssStart = false;
let ssmainPointOfMouse;
let ssScrollLeft;
let ssInsPointOfMouse =0;



ssSlideArea.addEventListener('mousedown',(e)=>{
    ssStart = true;
    ssmainPointOfMouse = e.pageX;
    ssScrollLeft = ssSlideArea.scrollLeft;
});
ssSlideArea.addEventListener('mouseup',()=>{
    ssStart = false;
});
ssSlideArea.addEventListener('mouseleave',()=>{
    ssStart = false;
    
});

ssSlideArea.addEventListener('mousemove',(e)=>{
    if(ssStart){
        e.preventDefault();
        console.log(e.pageX);
        ssInsPointOfMouse = e.pageX - ssmainPointOfMouse;
        if(ssInsPointOfMouse < 0){
            ssSlideArea.scrollLeft += ssSlideArea.offsetWidth;
        }
        else if(insPointOfMouse > 0){
            ssSlideArea.scrollLeft -= ssSlideArea.offsetWidth;
        }
    }
});

ssSlideArea.addEventListener('touchstart',(e)=>{
    ssStart = true;
    let touches = e.changedTouches;
    ssmainPointOfMouse = touches[0].pageX - ssSlideArea.offsetLeft;
    ssScrollLeft = ssSlideArea.scrollLeft;
});
ssSlideArea.addEventListener('touchend',()=>{
    ssStart = false;
});
ssSlideArea.addEventListener('touchleave',()=>{
    ssStart = false;
    
});

ssSlideArea.addEventListener('touchmove',(e)=>{
    if(ssStart){
        e.preventDefault();
        let touches = e.changedTouches;
        ssInsPointOfMouse = touches[0].pageX - ssmainPointOfMouse;
        if(ssInsPointOfMouse < 0){
            ssSlideArea.scrollLeft += ssSlideArea.offsetWidth;
        }
        else if(ssInsPointOfMouse > 0){
            ssSlideArea.scrollLeft -= ssSlideArea.offsetWidth;
        }
    }
});




// ====================== Small Slider==================
















