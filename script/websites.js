let websiteArticleList = document.getElementById('websiteSection').getElementsByTagName('article');
let websiteChangeButtons = document.getElementsByTagName('main')[0].getElementsByTagName('button');
let websiteBeingDisplayed = 0;

//NAV SET LOCAL STORAGE>>>
let navOptionsList = document.querySelector("nav").getElementsByTagName("ul")[0];
for (let navListSpecific = 0;navListSpecific < navOptionsList.children.length;navListSpecific++){
    for (let navSubListSpecific = 0;navSubListSpecific < navOptionsList.children[navListSpecific].getElementsByTagName("li").length;navSubListSpecific++) {
        navOptionsList.children[navListSpecific].getElementsByTagName("li")[navSubListSpecific].onclick = () => {
            localStorage.setItem(navOptionsList.children[navListSpecific].getElementsByTagName("a")[0].innerHTML,navSubListSpecific);
        }
    }
}
//<<<NAV SET LOCAL STORAGE

//USE LOCAL  STORAGE>>>
for (let websiteIndex = 0;websiteIndex < websiteArticleList.length;websiteIndex++) {
    if (websiteIndex < Number(localStorage.getItem("Websites"))) {
        websiteArticleList[websiteIndex].style.width = 0;
        websiteArticleList[websiteIndex].style.marginLeft = 0;
        websiteArticleList[websiteIndex].style.opacity = 0;
        if (websiteArticleList[websiteIndex].classList.contains('display')) {
            websiteArticleList[websiteIndex].classList.remove('display');
        }
    }
    websiteArticleList[Number(localStorage.getItem("Websites"))].style.width = '100vw';
    websiteArticleList[Number(localStorage.getItem("Websites"))].style.marginLeft = 0;
    websiteArticleList[Number(localStorage.getItem("Websites"))].classList.add('display');
    websiteBeingDisplayed = Number(localStorage.getItem("Websites"));
    buttionVisibleCheck(websiteBeingDisplayed);
}
//<<<USE  LOCAL STORAGE


for (let buttonPressed = 0;buttonPressed < websiteChangeButtons.length;buttonPressed++) {
    websiteChangeButtons[buttonPressed].onclick = () => {
        if (buttonPressed == 0 && websiteBeingDisplayed != 0) {
            websiteArticleList[websiteBeingDisplayed].style.marginLeft = '100%';
            websiteArticleList[websiteBeingDisplayed].classList.remove('display');
            websiteArticleList[websiteBeingDisplayed - 1].style.width = '100vw';
            websiteArticleList[websiteBeingDisplayed - 1].style.opacity = 1;
            websiteArticleList[websiteBeingDisplayed - 1].classList.add('display');
            websiteBeingDisplayed--;
        }
        else if (buttonPressed == 1 && websiteBeingDisplayed != websiteArticleList.length -1) {
            websiteArticleList[websiteBeingDisplayed].style.width = 0;
            websiteArticleList[websiteBeingDisplayed].style.opacity = 0;
            websiteArticleList[websiteBeingDisplayed].classList.remove('display');
            websiteArticleList[websiteBeingDisplayed + 1].style.width = '100vw';
            websiteArticleList[websiteBeingDisplayed + 1].style.marginLeft = 0;
            websiteArticleList[websiteBeingDisplayed + 1].classList.add('display');
            websiteBeingDisplayed++;
        }
        buttionVisibleCheck(websiteBeingDisplayed);
    }
}

function buttionVisibleCheck(articleDisplayed){
    if (articleDisplayed == 0) {
        websiteChangeButtons[0].style.opacity = 0;
    } else if (articleDisplayed == websiteArticleList.length -1) {
        websiteChangeButtons[1].style.opacity = 0;
        websiteChangeButtons[0].style.opacity = 1;
    } else {
        websiteChangeButtons[0].style.opacity = 1;
        websiteChangeButtons[1].style.opacity = 1;
    }
}
let imageChangeTime,currentImage,nextImage;

function imageChanger(listOfSections){
    imageChangeTime = setTimeout(function(){
        for (let singleArticle = 0;singleArticle < listOfSections.length;singleArticle++) {
            if (listOfSections[singleArticle].classList.contains('display')){
                for (let singleImage = 0;singleImage < listOfSections[singleArticle].getElementsByTagName("img").length;singleImage++) {
                    if (listOfSections[singleArticle].getElementsByTagName("img")[singleImage].classList.contains('visible')) {
                        currentImage = singleImage;
                    }
                }
                if (currentImage == listOfSections[singleArticle].getElementsByTagName("img").length - 1) {
                    nextImage = 0;
                } else {
                    nextImage = currentImage + 1;
                }
                listOfSections[singleArticle].getElementsByTagName("img")[currentImage].classList.remove('visible');
                listOfSections[singleArticle].getElementsByTagName("img")[nextImage].classList.add('visible');
            }
        }
        imageChanger(listOfSections)
    },5000);
}

imageChanger(websiteArticleList);