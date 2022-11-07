let width,height,context,draw,mouseX,mouseY;
let objects = [];
let objectCount = 200;
let hover = false;

Math.random();
let objectsValuesGiven = false;
function objectValuesAsign(numberOfObjects){
    for(let objectNumber = 0;objectNumber < numberOfObjects; objectNumber++){
        objects.push({
            x:Math.floor((Math.random() * width) + 1),
            y:Math.floor((Math.random() * height) + 1),
            size:1.5,
            dx:0,
            dy:0,
            direction:0
        })
    }
}

function createObjects(specificObject){
        if (specificObject.direction == 0){
            if (specificObject.x < width/2){
                specificObject.dx = -.1 * Math.floor((Math.random() * 10) + 1);
            } else{
                specificObject.dx = .1 * Math.floor((Math.random() * 10) + 1);
            }
            if (specificObject.y < height/2){
                specificObject.dy = -.1 * Math.floor((Math.random() * 10) + 1);
            } else{
                specificObject.dy = .1 * Math.floor((Math.random() * 10) + 1);
            }
            specificObject.direction = 1;
        }
    //     objects[objectNumber].size += .5;
        specificObject.x += specificObject.dx;
        specificObject.y += specificObject.dy;
        context.beginPath();
        context.arc(specificObject.x,specificObject.y,specificObject.size, 0, 2 * Math.PI);
        context.shadowColor="white";
        context.shadowBlur = 1;
    //     context.filter = 'blur(1px)';
        context.fill();
        context.stroke();
        if ((specificObject.y > height) || (specificObject.y < 0) || (specificObject.x > width) || (specificObject.x < 0)){
            specificObject.y = Math.floor((Math.random() * height*3/4) + height/4);
            specificObject.x = Math.floor((Math.random() * width*3/4) + width/4);
        }
}


function directionGiver(chosenObject){
    if (chosenObject.x < width/2){
        chosenObject.dx = -.1 * Math.floor((Math.random() * 10) + 1);
    } else{
        chosenObject.dx = .1 * Math.floor((Math.random() * 10) + 1);
    }
    if (chosenObject.y < height/2){
        chosenObject.dy = -.1 * Math.floor((Math.random() * 10) + 1);
    } else{
        chosenObject.dy = .1 * Math.floor((Math.random() * 10) + 1);
    }
    chosenObject.direction = 1;
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
    height = headerCanvas.height;
    if (objectsValuesGiven == false) {
        objectValuesAsign(objectCount);
        objectsValuesGiven = true;
    }
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
    for (let objectIndex = 0;objectIndex < objects.length;objectIndex++) {
        createObjects(objects[objectIndex]);
    }
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
    sectionNo.style.marginLeft = 0;
    sectionNo.style.marginRight = 0;
    sectionCounter ++;
};
function scrollRemover(sectionNo){
    if (sectionCounter % 2 == 0){
        sectionNo.style.marginLeft = '100%';
    } else{
        sectionNo.style.marginRight = '100%';
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
    if (this.scrollY > 1050 && sectionCounter < 1){
        scrollCaller(mainSections[1])
    }
    if (this.scrollY < 1050 && sectionCounter > 0){
        scrollRemover(mainSections[1])
    }
    if (this.scrollY > 1550 && sectionCounter < 2){
        scrollCaller(mainSections[2])
    }
    if (this.scrollY < 1550 && sectionCounter > 1){
        scrollRemover(mainSections[2])
    }
    if (this.scrollY > 2050 && sectionCounter < 3){
        scrollCaller(mainSections[3])
    }
    if (this.scrollY < 2050 && sectionCounter > 2){
        scrollRemover(mainSections[3])
    }
    if (this.scrollY > 2550 && sectionCounter < 4){
        scrollCaller(mainSections[4])
    }
    if (this.scrollY < 2550 && sectionCounter > 3){
        scrollRemover(mainSections[4])
    }
}


window.addEventListener("scroll", scrollIn , false);
// window.requestAnimationFrame(draw);
