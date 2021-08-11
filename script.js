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
const sliderContainer = document.querySelector('.slide-container');
const slideBox = document.querySelector('.slide-box');
const slides = document.querySelectorAll('.video-item');
const leftBtn = document.querySelector('.slider-area .left-btn');
const rightBtn = document.querySelector('.slider-area .right-btn');
let displaySlide = 6;
let navigationDots = false;

const slideContents = document.querySelectorAll('.slide-content');
const widthOfSliderArea = sliderArea.offsetWidth;
const numberOfTotalSlides = slides.length;

// Fixing widths ------>

slides.forEach((element,i) =>{
    element.style.width = widthOfSliderArea/displaySlide + "px";
    slideContents[i].style.width = (widthOfSliderArea/6)-15 + "px";
});

// <-------------------



const m = new sliderCode(sliderArea,sliderContainer,slideBox,slides,leftBtn,rightBtn,displaySlide,navigationDots);
m.WorkOfSliding();



sliderArea.addEventListener('mouseleave',()=>{
    m.mouseLeave();
});
sliderArea.addEventListener('mouseover',()=>{
    m.mouseOver();
});
sliderArea.addEventListener('mouseup',()=>{
    m.mouseUp();
    
});
sliderArea.addEventListener('mousedown',(e)=>{
    e.preventDefault();
    m.mouseDown(e);
});
//window.addEventListener('dragenter')
sliderArea.addEventListener('mousemove',(e)=>{
    e.preventDefault();
    m.mouseMove(e);
    
});


rightBtn.addEventListener("click",()=>{
    m.rightBtnAction();
    
});
leftBtn.addEventListener("click",()=>{
    m.leftBtnAction();
    
});





function sliderCode(sliderArea,sliderContainer,slideBox,slides,leftBtn,rightBtn,displaySlide,navigationDots){
    this.sliderArea = sliderArea;
    this.sliderContainer = sliderContainer;
    this.slideBox = slideBox;
    this.slides = slides;
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.dots;
    this.displaySlide = displaySlide;
    this.cloneSlideBox;




    this.leftWidthOfSlider = sliderArea.offsetLeft;
    this.clickedPositionXOfSlider;
    this.instantMovingPositionXOfSlider;
    this.dragedValueXOfSlider;
    this.translatedValueXOfSlider = 0;
    this.instantTranslatedValueXOfSlider;
    this.XForChangesInSlideBox = (this.slides[0].offsetWidth * (displaySlide+1));
    this.XForChangesInCloneSlideBox = this.XForChangesInSlideBox + this.slideBox.offsetWidth;
    this.cloneSliderPosition;
    this.SliderPosition;
    
    this.isdraging;
    this.isDragingLeft;
    this.isUp = true;
    this.isLeave = true;
    this.isStartPositioningSlideBox;
    this.isStartPositioningcloneSlideBox;
    
    this.doForSlideBoxRight;
    this.doForCloneSlideBoxRight;
    this.doForSlideBoxLeft;
    this.doForCloneSlideBoxLeft;
    this.slideNumberByButton = 0;
    
    this.autoAnimatingTimeInterval;


    this.leftBtnAction = function(){
 
        this.slideNumberByButton++;
        this.translatedValueXOfSlider = this.slides[0].offsetWidth * this.slideNumberByButton;
        this.instantTranslatedValueXOfSlider = this.translatedValueXOfSlider;
        this.AniOfSliding();
        if(navigationDots){
            this.animationOfDots();
        }
    }


    this.rightBtnAction = function(){
 
        this.slideNumberByButton--;
        this.translatedValueXOfSlider = this.slides[0].offsetWidth * this.slideNumberByButton;
        this.instantTranslatedValueXOfSlider = this.translatedValueXOfSlider;
        this.AniOfSliding();
        if(navigationDots){
            this.animationOfDots();
        }
    }






    this.mouseLeave = function(){
        this.isdraging = false;
        this.isLeave = true;
        if(this.isUp == false){
            this.upOrLeaveAction();
            this.isUp = true;
        }
        // autoAnimatingTimeInterval = setInterval(() => {rightBtnAction();},1500);
    }
 
    this.mouseOver = function(){
        //clearInterval(this.autoAnimatingTimeInterval);
    }
    this.mouseUp = function(){
        this.isdraging = false;
        if(this.isLeave == false){this.upOrLeaveAction(); this.isLeave = true;}
        this.isUp = true;
    }
    this.mouseDown = function(e){
 
        this.isdraging = true;
        this.clickedPositionXOfSlider = e.pageX - this.leftWidthOfSlider;
    }
    this.mouseMove = function(e){
        if(this.isdraging){
        
 
        
            this.dragedValueXOfSlider = (e.pageX-this.leftWidthOfSlider) - this.clickedPositionXOfSlider;
            this.instantMovingPositionXOfSlider = e.pageX - this.leftWidthOfSlider;
            this.instantTranslatedValueXOfSlider = this.translatedValueXOfSlider + this.dragedValueXOfSlider;
            if(this.dragedValueXOfSlider<0){this.isDragingLeft = true;}
            else if(this.dragedValueXOfSlider>0){this.isDragingLeft = false;}
            
            this.slideBox.style.transition = `all 0ms`;
            this.cloneSlideBox.style.transition = `all 0ms`;
            this.AniOfSliding();
            this.isUp = false;
            this.isLeave = false;
        }
    }




    this.WorkOfSliding = function(){

       this.cloneSlideBox = this.slideBox.cloneNode(true);
       this.cloneSlideBox.style.left = "-"+this.slideBox.offsetWidth + "px";
       this.cloneSlideBox.classList.add("cloned-slide-box");
       this.sliderContainer.appendChild(this.cloneSlideBox);


       this.slideBox.style.width = (this.slides[0].offsetWidth)*this.slides.length + "px";
       this.cloneSlideBox.style.width = (this.slides[0].offsetWidth)*this.slides.length + "px";
       
       
       //this.autoAnimatingTimeInterval = setInterval(() => {this.rightBtnAction();}, 1500)
       
       
       
       
    }






   
   this.animationOfDots = function(){
       
       this.dots.forEach(element =>{
           element.style.backgroundColor = "#ddd";
           element.style.transform = `scale(0.8,0.8)`;
        });
        let x = this.slideNumberByButton, y = this.slideNumberByButton;
        if((this.slideNumberByButton<0) && ((this.slides.length * -2) < this.slideNumberByButton)){
            x = x * (-1);
            if(x>(this.slides.length-1)){x = x-this.slides.length;}
            if(x==(this.slides.length * 2)){x = 0;console.log("here");}
            
            this.dots[x].style.backgroundColor = "#222";
            this.dots[x].style.transform = `scale(1,1)`;
        }
        else if(this.slideNumberByButton>0){
            y = (this.slides.length*2) - this.slideNumberByButton;
            if(y>(this.slides.length-1)){ y=y-this.slides.length;}
            
            this.dots[y].style.backgroundColor = "#222";
            this.dots[y].style.transform = `scale(1,1)`;
        }else if(this.slideNumberByButton == 0){
            this.dots[0].style.backgroundColor = "#222";
            this.dots[0].style.transform = `scale(1,1)`;
        }
        console.log("slide Number for button: "+this.slideNumberByButton);
        
   }  
   
   
   
   
   this.upOrLeaveAction = function(){

       this.translatedValueXOfSlider += this.dragedValueXOfSlider;

       let slideNumber;
       if(this.dragedValueXOfSlider<0){
           slideNumber = Math.floor(this.translatedValueXOfSlider/slides[0].offsetWidth);
       }else{
           slideNumber = Math.ceil(this.translatedValueXOfSlider/slides[0].offsetWidth);
       }

       console.log("real slide number: "+slideNumber);
       this.translatedValueXOfSlider = this.slides[0].offsetWidth * slideNumber;
       this.instantTranslatedValueXOfSlider = this.translatedValueXOfSlider;
       this.slideNumberByButton = slideNumber;
       setTimeout(() => {
           this.slideBox.style.transition = `all 300ms`;
           this.cloneSlideBox.style.transition = `all 300ms`;
           if(navigationDots){this.animationOfDots();}
           this.AniOfSliding();
       }, 100);
   }
   
   
   
   
   
   
   
   
   // Changing Animation of slides -------------------------->
   
   
   
   this.AniOfSliding = function(){
       
       console.log("translated value : "+ this.instantTranslatedValueXOfSlider);

      // reset ->
      
      if(this.instantTranslatedValueXOfSlider >= (this.slideBox.offsetWidth*2)){
          this.translatedValueXOfSlider = 0;
          this.slideNumberByButton = 0;
          console.log("instant n: "+ this.slideNumberByButton);
   
      }
      if(this.instantTranslatedValueXOfSlider <= (this.slideBox.offsetWidth*(-2))){
          this.translatedValueXOfSlider = 0;
          this.slideNumberByButton = 0;
          
        }
   
      // <-
   
   
      // Right Slde Transition ->
   
      
      
      if(((this.XForChangesInSlideBox * (-1)) <= this.instantTranslatedValueXOfSlider) 
      && (0 >= this.instantTranslatedValueXOfSlider)){
          this.doForCloneSlideBoxRight = true;
          this.cloneSlideBox.style.transform = `translateX(${this.instantTranslatedValueXOfSlider}px)`;
      }
      else if((this.XForChangesInSlideBox * (-1)) > this.instantTranslatedValueXOfSlider){
   
          this.cloneSliderPosition = (this.slideBox.offsetWidth*2) + this.instantTranslatedValueXOfSlider;
          
          if(this.doForCloneSlideBoxRight){
              this.cloneSlideBox.style.zIndex = "-1";
              setTimeout(()=>{
                  this.cloneSlideBox.style.transform = `translateX(${this.cloneSliderPosition}px)`;
                  setTimeout(() => {
                      this.cloneSlideBox.style.zIndex = "1";
                  }, 300);
              },40);
              this.doForCloneSlideBoxRight = false;
          }else{
              this.cloneSlideBox.style.transform = `translateX(${this.cloneSliderPosition}px)`;
          }
      }
   
   
      if(((this.XForChangesInCloneSlideBox * (-1)) <= this.instantTranslatedValueXOfSlider)
      && (0 >= this.instantTranslatedValueXOfSlider)){
          this.slideBox.style.transform = `translateX(${this.instantTranslatedValueXOfSlider}px)`;
          this.doForSlideBoxRight = true;
      }
      else if((this.XForChangesInCloneSlideBox * (-1)) > this.instantTranslatedValueXOfSlider){
          this.SliderPosition = (this.cloneSlideBox.offsetWidth*2) + this.instantTranslatedValueXOfSlider;

          if(this.doForSlideBoxRight){
   
              this.slideBox.style.zIndex = "-1";
              setTimeout(()=>{
                  this.slideBox.style.transform = `translateX(${this.SliderPosition}px)`;
                  setTimeout(() => {
                      this.slideBox.style.zIndex = "1";
                  }, 300);
              },40);
   
   
              this.doForSlideBoxRight = false;
          }else{
              this.slideBox.style.transform = `translateX(${this.SliderPosition}px)`;
          }
      }
   
   
      // <-
   

   

      // Left Side Transition ->
   
      if(((this.XForChangesInSlideBox ) >= this.instantTranslatedValueXOfSlider)
      && (0 <= this.instantTranslatedValueXOfSlider)){
          this.slideBox.style.transform = `translateX(${this.instantTranslatedValueXOfSlider}px)`;
          this.doForSlideBoxLeft = true;
      }
      else if((this.XForChangesInSlideBox) < this.instantTranslatedValueXOfSlider){

              this.cloneSliderPosition = (this.slideBox.offsetWidth*(-2)) + this.instantTranslatedValueXOfSlider;
              //cloneSlideBox.style.left = `${cloneSlidePosition}px`;
      
              if(this.doForSlideBoxLeft){
                  this.slideBox.style.zIndex = "-1";
              setTimeout(()=>{
                  this.slideBox.style.transform = `translateX(${this.cloneSliderPosition}px)`;
                  setTimeout(() => {
                      this.slideBox.style.zIndex = "1";
                  }, 300);
              },40);
                  this.doForSlideBoxLeft = false;
              }else{
                  this.slideBox.style.transform = `translateX(${this.cloneSliderPosition}px)`;
              }
          }
   
   
   
      if(((this.XForChangesInCloneSlideBox) >= this.instantTranslatedValueXOfSlider) 
      && (0 <= this.instantTranslatedValueXOfSlider)){
          this.cloneSlideBox.style.transform = `translateX(${this.instantTranslatedValueXOfSlider}px)`;
          this.doForCloneSlideBoxLeft = true;
      }
      else if((this.XForChangesInCloneSlideBox) < this.instantTranslatedValueXOfSlider){
          this.SliderPosition = (this.slideBox.offsetWidth*(-2)) + this.instantTranslatedValueXOfSlider;
          
          if(this.doForCloneSlideBoxLeft){
              this.cloneSlideBox.style.zIndex = "-1";
              setTimeout(()=>{
                  this.cloneSlideBox.style.transform = `translateX(${this.SliderPosition}px)`;
                  setTimeout(() => {
                      this.cloneSlideBox.style.zIndex = "1";
                  }, 300);
              },40);
              this.doForCloneSlideBoxLeft = false;
        }else{
            this.cloneSlideBox.style.transform = `translateX(${this.SliderPosition}px)`;
          }
      }
   }
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



// Photo Story slide ------------------------------------->




const psSliderArea = document.querySelector('.ps-slider-area');
const psSliderContainer = document.querySelector('.ps-slide-container');
const psSlideBox = document.querySelector('.ps-slide-box');
const psSlides = document.querySelectorAll('.ps-slide');
const psLeftBtn = document.querySelector('.ps-slider-area .ps-left-btn');
const psRightBtn = document.querySelector('.ps-slider-area .ps-right-btn');
let psDisplaySlide = 6;
let psNavigationDots = false;

const psSlideContents = document.querySelectorAll('.ps-slide-content');
const psWidthOfSliderArea = psSliderArea.offsetWidth;
const psNumberOfTotalSlides = psSlides.length;



// Fixing widths ------>

psSlides.forEach((element,i) =>{
    element.style.width = psWidthOfSliderArea/psDisplaySlide + "px";
    psSlideContents[i].style.width = (psWidthOfSliderArea/psDisplaySlide)-15 + "px";
});

// <-------------------



let psSliding = new sliderCode(psSliderArea,psSliderContainer,psSlideBox,psSlides,psLeftBtn,psRightBtn,psDisplaySlide,psNavigationDots);
psSliding.WorkOfSliding();



psSliderArea.addEventListener('mouseleave',()=>{
    psSliding.mouseLeave();
});
psSliderArea.addEventListener('mouseover',()=>{
    psSliding.mouseOver();
});
psSliderArea.addEventListener('mouseup',()=>{
    psSliding.mouseUp();
    
});
psSliderArea.addEventListener('mousedown',(e)=>{
    e.preventDefault();
    psSliding.mouseDown(e);
});
//window.addEventListener('dragenter')
psSliderArea.addEventListener('mousemove',(e)=>{
    e.preventDefault();
    psSliding.mouseMove(e);
    
});


psRightBtn.addEventListener("click",()=>{
    psSliding.rightBtnAction();
    
});
psLeftBtn.addEventListener("click",()=>{
    psSliding.leftBtnAction();
    
});



// Worth Reading slide ------------------------------------->



const wrSliderArea = document.querySelector('.wr-slider-area');
const wrSliderContainer = document.querySelector('.wr-slide-container');
const wrSlideBox = document.querySelector('.wr-slide-box');
const wrSlides = document.querySelectorAll('.wr-slide');
const wrLeftBtn = document.querySelector('.wr-left-btn');
const wrRightBtn = document.querySelector('.wr-right-btn');
let wrDisplaySlide = 4;
let wrNavigationDots = false;

const wrSlideContents = document.querySelectorAll('.wr-slide-content');
const wrWidthOfSliderArea = sliderArea.offsetWidth;
const wrNumberOfTotalSlides = slides.length;

// Fixing widths ------>

wrSlides.forEach((element,i) =>{
    element.style.width = wrWidthOfSliderArea/wrDisplaySlide + "px";
    wrSlideContents[i].style.width = (wrWidthOfSliderArea/wrDisplaySlide)-15 + "px";
});

// <-------------------



const wrSliding = new sliderCode(wrSliderArea,wrSliderContainer,wrSlideBox,wrSlides,wrLeftBtn,wrRightBtn,wrDisplaySlide,wrNavigationDots);
wrSliding.WorkOfSliding();



wrSliderArea.addEventListener('mouseleave',()=>{
    wrSliding.mouseLeave();
});
wrSliderArea.addEventListener('mouseover',()=>{
    wrSliding.mouseOver();
});
wrSliderArea.addEventListener('mouseup',()=>{
    wrSliding.mouseUp();
    
});
wrSliderArea.addEventListener('mousedown',(e)=>{
    e.preventDefault();
    wrSliding.mouseDown(e);
});
//window.addEventListener('dragenter')
wrSliderArea.addEventListener('mousemove',(e)=>{
    e.preventDefault();
    wrSliding.mouseMove(e);
    
});


wrRightBtn.addEventListener("click",()=>{
    wrSliding.rightBtnAction();
    
});
wrLeftBtn.addEventListener("click",()=>{
    wrSliding.leftBtnAction();
    
});





