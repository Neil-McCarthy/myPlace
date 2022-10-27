let websiteArticleList = document.getElementById('websiteSection').getElementsByTagName('article');
let websiteChangeButtons = document.getElementsByTagName('main')[0].getElementsByTagName('button');
let websiteBeingDisplayed = 0;
for (let buttonPressed = 0;buttonPressed < websiteChangeButtons.length;buttonPressed++) {
    websiteChangeButtons[buttonPressed].onclick = () => {
        if (buttonPressed == 0 && websiteBeingDisplayed != 0) {
            websiteArticleList[websiteBeingDisplayed].style.marginLeft = '100%';
            websiteArticleList[websiteBeingDisplayed - 1].style.width = '100vw';
            websiteArticleList[websiteBeingDisplayed - 1].style.opacity = 1;
            websiteBeingDisplayed--;
        }
        else if (buttonPressed == 1 && websiteBeingDisplayed != websiteArticleList.length -1) {
            websiteArticleList[websiteBeingDisplayed].style.width = 0;
            websiteArticleList[websiteBeingDisplayed].style.opacity = 0;
            websiteArticleList[websiteBeingDisplayed + 1].style.width = '100vw';
            websiteArticleList[websiteBeingDisplayed + 1].style.marginLeft = 0;
            websiteBeingDisplayed++;
        }
        if (websiteBeingDisplayed == 0) {
            websiteChangeButtons[0].style.opacity = 0;
        } else if (websiteBeingDisplayed == websiteArticleList.length -1) {
            websiteChangeButtons[1].style.opacity = 0;
        } else {
            websiteChangeButtons[0].style.opacity = 1;
            websiteChangeButtons[1].style.opacity = 1;
        }
    }
}