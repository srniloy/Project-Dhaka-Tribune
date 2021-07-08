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




const videoItems = document.querySelectorAll('.video-item');
const allSlideContainer = document.querySelector('.all-slide-items');

videoScroll();
function videoScroll(){
    console.log(allSlideContainer.offsetWidth);
    if(window.innerWidth <= 572){
        videoItems.forEach((element)=>{
            element.style.width = (allSlideContainer.offsetWidth / 2) - (15/2) + "px";
        });
    }
}






// ======================= Fixed Navigation bar ===========================

// ===================== Video Section==========================

const videoContainer = document.querySelector('.all-slide-items');
let mousePosition = false;
let mainPointOfMouse;
let scrollLeft;



videoContainer.addEventListener('mousedown',(e)=>{
    mousePosition = true;
    mainPointOfMouse = e.pageX - videoContainer.offsetLeft;
    scrollLeft = videoContainer.scrollLeft;
});
videoContainer.addEventListener('mouseup',()=>{
    mousePosition = false;
});
videoContainer.addEventListener('mouseleave',()=>{
    mousePosition = false;
    
});

videoContainer.addEventListener('mousemove',(e)=>{
    if(mousePosition){
        e.preventDefault();
        const insPointOfMouse = e.pageX - mainPointOfMouse;
        if(insPointOfMouse < 0){
            videoContainer.scrollLeft += (videoItems[0].offsetWidth+15);
        }
        else if(insPointOfMouse > 0){
            videoContainer.scrollLeft -= (videoItems[0].offsetWidth+15);
        }

        
    }
});


videoContainer.addEventListener('touchstart',(e)=>{
    mousePosition = true;
    let touches = e.changedTouches;
    mainPointOfMouse = touches[0].pageX - videoContainer.offsetLeft;
    scrollLeft = videoContainer.scrollLeft;
});
videoContainer.addEventListener('touchend',()=>{
    mousePosition = false;
});
videoContainer.addEventListener('touchleave',()=>{
    mousePosition = false;
    
});

videoContainer.addEventListener('touchmove',(e)=>{
    if(mousePosition){
        e.preventDefault();
        let touches = e.changedTouches;
        const insPointOfMouse = touches[0].pageX - mainPointOfMouse;
        if(insPointOfMouse < 0){
            videoContainer.scrollLeft += (videoItems[0].offsetWidth+15);
        }
        else if(insPointOfMouse > 0){
            videoContainer.scrollLeft -= (videoItems[0].offsetWidth+15);
        }
    }
});




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


window.addEventListener('resize',()=>{
    typeContentArea.style.height = typeContent.offsetHeight + "px";
    videoScroll();
});

// ===================== type by button click================

// ====================== Small Slider==================


const ssSlideArea = document.querySelector('.ss-small-slider');
const ssSlidesbox = document.querySelector('.ss-sslide-box');
const ssSlide = document.querySelector('.ss-slides');
let ssStart = false;
let ssmainPointOfMouse;
let ssScrollLeft;
let insPointOfMouse =0;



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
        insPointOfMouse = e.pageX - ssmainPointOfMouse;
        if(insPointOfMouse < 0){
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
        insPointOfMouse = touches[0].pageX - ssmainPointOfMouse;
        if(insPointOfMouse < 0){
            ssSlideArea.scrollLeft += ssSlideArea.offsetWidth;
        }
        else if(insPointOfMouse > 0){
            ssSlideArea.scrollLeft -= ssSlideArea.offsetWidth;
        }
    }
});




// ====================== Small Slider==================
















