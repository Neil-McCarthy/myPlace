let width,height,context,draw,mouseX,mouseY;
let objects = [];
let objectCount = 150;
let hover = false;

Math.random();

function createObjects(numberOfObjects){
    for(let objectNumber = 0;objectNumber < numberOfObjects; objectNumber++){
        objects.push({
            x:Math.floor((Math.random() * width) + 1),
            y:Math.floor((Math.random() * height) + 1),
            size:2,
            dx:0,
            dy:0,
            direction:0
        })
        if (objects[objectNumber].direction == 0){
            directionGiver(objectNumber);
        }
    //     objects[objectNumber].size += .5;
        objects[objectNumber].x += objects[objectNumber].dx;
        objects[objectNumber].y += objects[objectNumber].dy;
        context.beginPath();
        context.arc(objects[objectNumber].x,objects[objectNumber].y,objects[objectNumber].size, 0, 2 * Math.PI);
        context.shadowColor="white";
        context.shadowBlur = 20;
    //     context.filter = 'blur(1px)';
        context.fill();
        context.stroke();
        if ((objects[objectNumber].y > height) || (objects[objectNumber].y < 0) || (objects[objectNumber].x > width) || (objects[objectNumber].x < 0)){
            objects[objectNumber].y = Math.floor((Math.random() * height*3/4) + height/4);
            objects[objectNumber].x = Math.floor((Math.random() * width*3/4) + width/4);
        }
    }
}


function directionGiver(chosenObject){
    if (objects[chosenObject].x < width/2){
        objects[chosenObject].dx = -.1 * Math.floor((Math.random() * 10) + 1);
    } else{
        objects[chosenObject].dx = .1 * Math.floor((Math.random() * 10) + 1);
    }
    if (objects[chosenObject].y < height/2){
        objects[chosenObject].dy = -.1 * Math.floor((Math.random() * 10) + 1);
    } else{
        objects[chosenObject].dy = .1 * Math.floor((Math.random() * 10) + 1);
    }
    objects[chosenObject].direction = 1;
}


// function mousePosition(event){
//     let rect = headerCanvas.getBoundingClientRect();
//     if (testcall == 1){
//         console.log(testcall);
//     }
//         return{
//             x: event.clientX - rect.left,
//             y: event.clientY - rect.top
//         }
// }


draw = function(){
    context = headerCanvas.getContext('2d');
    width = headerCanvas.width;
    height = 1000;
    context.clearRect(0, 0, width, height);
    // canvas.onmousemove = function(evt){
    //     let mouseXY = mousePosition(event);
    //     mouseX = mouseXY.x;
    //     mouseY = mouseXY.y;
    //     hover = true;
    // }
    // if (hover == true){
    //     for (let m = 0;m < objects.length; m++){
    //         if (mouseX < objects[m].x + 30 && mouseX > objects[m].x - 30 && mouseY < objects[m].y + 30 && mouseY > objects[m].y - 30){
    //             if (objects[m].size < 3.5){
    //                 objects[m].size += 1;
    //             }
    //         }
    //     }
    // }

    // header.onmousemove = (event) => {
    //     mouseX = event.clientX;
    //     mouseY = event.clientY;
    //     if (canvasHover == false) {
    //         console.log('hover');
    //     }
    //     canvasHover = true;
    //     // mouseXY = mousePosition(event)
    // };
    // header.addEventListener('mouseleave', () => {
    //     if (canvasHover == true) {
    //         console.log('not hover');
    //     }
    //     canvasHover = false;
    // });
    // for (let m = 0;m < objects.length; m++){
    //     if (objects[m].size > 2){
    //         objects[m].size -= .5;
    //     }
    //     if (canvasHover == true){
    //         if (mouseX < objects[m].x + 30 && mouseX > objects[m].x - 30 && mouseY < objects[m].y + 30 && mouseY > objects[m].y - 30){
    //             console.log(objects[m].x,objects[m].y);
    //             if (objects[m].size < 3.5){
    //                 objects[m].size += 1;
    //             }
                
    //         }
    //     }
    // }
    context.fillStyle ='white';
    createObjects(objectCount);
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);



let mouseXY;
let canvasHover = false;
let headerHeight,dropList,dropID,main,aside,Scroller,opacityChanger,mainImages,mainHover,imageChangeTime,imageOpacity1,imageOpacity2,imageIntervalID;
let body = document.querySelector("body");
let header = document.querySelector("header");
let headerCanvas = header.getElementsByTagName('canvas')[0];
let headerHeading = header.getElementsByTagName('div')[0];
let mainSections = [];
let imageList = [];
let imageChanging = false;
let imageNumber = 0;
let imageVisibleList = [];
let sectionCounter = 0;
let imageTracker = 0;
let asideScroller = 0;
dropID = 'drop'+0;
main = document.querySelector("main");
aside = document.querySelector("aside");
mainSections = main.getElementsByTagName("section");
mainImages = main.getElementsByTagName("img");



// for (let specificGame=0; specificGame < gameNavSubOptions.length; specificGame++){
//     gameNavSubOptions[specificGame].onclick = function afunction(){
//         localStorage.setItem('game',specificGame);
//     }
// }

function scrollCaller(sectionNo){
    sectionNo.classList.remove('invisible');
    sectionNo.style.margin = 0;
    sectionCounter ++;
};
function scrollRemover(sectionNo){
    if (sectionCounter % 2 == 0){
        sectionNo.style.marginLeft = '80%';
    } else{
        sectionNo.style.marginRight = '80%';
    }
    sectionNo.classList.add('invisible');
    sectionCounter --;
}



function imageChanger(specificSection){
        // imageChanger(imageNumber);
        //imageList[0].src = imageList[1].src
        imageChangeTime = setTimeout(function(){
            if (imageList[0].classList.contains('visible')) {
                imageList[0].classList.remove('visible');
                imageList[1].classList.add('visible');
            } else {
                imageList[1].classList.remove('visible');
                imageList[0].classList.add('visible');
            }
            imageChangerRepeat(specificSection)
        },4000);
        

    // imageList[imageNumber].classList.remove('visible');
    // if (imageNumber < imageList.length - 1){
    //     imageList[imageNumber+1].classList.add('visible');
    // } else{
    //     imageList[0].classList.add('visible');
    // }
    // imageNumber += 1;
    // if (imageNumber > imageList.length -1){
    //     imageNumber = 0;
    // }

    // imageChangeTime = setTimeout(function(){
    //         imageChanger(imageNumber);
    //     },5000);
}



let changerIdle = true;
let visibleImage = 0; 
let nextImage = 1;
main.addEventListener("mouseenter", function(){
    for (let n = 1;n < mainSections.length;n++){
        // mainSections[n].addEventListener("mouseover", function(){
        //     opacityChanger = mainSections[n].style.opacity = '1';
        // });
        mainSections[n].addEventListener("mouseenter", function(){
            imageChanging = true;
            imageList = mainSections[n].getElementsByTagName("img");
            function imageChanger(specificSection, visibleImage, nextImage){
                // imageChanger(imageNumber);
                //imageList[0].src = imageList[1].src
                imageChangeTime = setTimeout(function(){
                    for (let imageCheck = 0;imageCheck < imageList.length;imageCheck++) {
                        if (imageList[imageCheck].classList.contains('visible')){
                            visibleImage = imageCheck;
                            imageList[visibleImage].classList.remove('visible');
                            imageList[nextImage].classList.add('visible');
                            if (visibleImage + 1 == imageList.length){
                                nextImage = 0;
                            } else{
                                nextImage = visibleImage + 1;
                            }
                        }
                    }
                    imageChangerRepeat(specificSection, visibleImage, nextImage);
                },4000);
                
        
            // imageList[imageNumber].classList.remove('visible');
            // if (imageNumber < imageList.length - 1){
            //     imageList[imageNumber+1].classList.add('visible');
            // } else{
            //     imageList[0].classList.add('visible');
            // }
            // imageNumber += 1;
            // if (imageNumber > imageList.length -1){
            //     imageNumber = 0;
            // }
        
            // imageChangeTime = setTimeout(function(){
            //         imageChanger(imageNumber);
            //     },5000);
        }
            function imageChangerRepeat(sectionToRepeat, visibleImage, nextImage) {
                if (sectionToRepeat ==  n && imageChanging) {
                    imageChanger(sectionToRepeat, visibleImage, nextImage);                    
                }
            }
            if (imageChanging && changerIdle){
                imageChanger(n, visibleImage, nextImage);
                changerIdle = false;
            }
        });
        mainSections[n].addEventListener("mouseleave", function(){
            changerIdle = true;
            imageNumber = 0;
            clearTimeout(imageChangeTime);
            imageChanging = false;
//             imageList[0].classList.remove('visible');
        });
    }
});
main.addEventListener("mouseleave", function(){
    imageChanging = false;
});


function scrollIn () {
    if (this.scrollY > 750 && sectionCounter < 1){
        scrollCaller(mainSections[1])
    }
    if (this.scrollY < 750 && sectionCounter > 0){
        scrollRemover(mainSections[1])
    }
    if (this.scrollY > 1250 && sectionCounter < 2){
        scrollCaller(mainSections[2])
    }
    if (this.scrollY < 1250 && sectionCounter > 1){
        scrollRemover(mainSections[2])
    }
    if (this.scrollY > 1750 && sectionCounter < 3){
        scrollCaller(mainSections[3])
    }
    if (this.scrollY < 1750 && sectionCounter > 2){
        scrollRemover(mainSections[3])
    }
    if (this.scrollY > 2250 && sectionCounter < 4){
        scrollCaller(mainSections[4])
    }
    if (this.scrollY < 2250 && sectionCounter > 3){
        scrollRemover(mainSections[4])
    }
}


window.addEventListener("scroll", scrollIn , false);
// window.requestAnimationFrame(draw);
