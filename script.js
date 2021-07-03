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


// ===================== Video Section==========================

// const videoContainer = document.querySelector('.all-video-items');
// let mousePosition = false;
// let mainPointOfMouse;
// let scrollLeft;


// videoContainer.addEventListener('mousedown',(e)=>{
//     mousePosition = true;
//     mainPointOfMouse = e.pageX - videoContainer.offsetLeft;
//     scrollLeft = videoContainer.scrollLeft;
// });
// videoContainer.addEventListener('mouseup',()=>{
//     mousePosition = false;
// });
// videoContainer.addEventListener('mouseleave',()=>{
//     mousePosition = false;
    
// });

// videoContainer.addEventListener('mousemove',(e)=>{
//     if(mousePosition){
//         e.preventDefault();
//         const insPointOfMouse = e.pageX - videoContainer.offsetLeft;
//         const adjMoveOfMouse = (insPointOfMouse - mainPointOfMouse)*(3/2);
//         videoContainer.scrollLeft = scrollLeft - adjMoveOfMouse;
//     }
// });




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






// ===================== type by button click================

// ====================== Small Slider==================


const ssSlideArea = document.querySelector('.ss-small-slider');
const ssSlidesbox = document.querySelector('.ss-sslide-box');
const ssSlide = document.querySelector('.ss-slides');
let ssStart = false;
let ssmainPointOfMouse;
let ssScrollLeft;




ssSlideArea.addEventListener('mousedown',(e)=>{
    ssStart = true;
    ssmainPointOfMouse = e.pageX;
    console.log(ssmainPointOfMouse);
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
        const insPointOfMouse = e.pageX - ssmainPointOfMouse;
        if(insPointOfMouse < 0){
            ssSlideArea.scrollLeft += ssSlideArea.offsetWidth;
        }
        else if(insPointOfMouse > 0){
            ssSlideArea.scrollLeft -= ssSlideArea.offsetWidth;
        }
    }
});


// ====================== Small Slider==================
















