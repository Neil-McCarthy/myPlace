let websiteSectionList = document.getElementById('websiteSection').getElementsByTagName('section');
let websiteChangeButtons = document.getElementsByTagName('main')[0].getElementsByTagName('button');
let websiteBeingDisplayed = 0;
for (let buttonPressed = 0;buttonPressed < websiteChangeButtons.length;buttonPressed++) {
    websiteChangeButtons[buttonPressed].onclick = () => {
        console.log(websiteBeingDisplayed, buttonPressed);
        if (buttonPressed == 0 && websiteBeingDisplayed != 0) {
            websiteSectionList[websiteBeingDisplayed].style.marginLeft = '100%';
            websiteSectionList[websiteBeingDisplayed - 1].style.width = '95vw';
            websiteBeingDisplayed--;
        }
        else if (buttonPressed == 1 && websiteBeingDisplayed != websiteSectionList.length -1) {
            websiteSectionList[websiteBeingDisplayed].style.width = 0;
            websiteSectionList[websiteBeingDisplayed + 1].style.width = '95vw';
            websiteSectionList[websiteBeingDisplayed + 1].style.marginLeft = 0;
            websiteBeingDisplayed++;
        }
        if (websiteBeingDisplayed == 0) {
            websiteChangeButtons[0].style.opacity = 0;
        } else if (websiteBeingDisplayed == websiteSectionList.length -1) {
            websiteChangeButtons[1].style.opacity = 0;
        } else {
            websiteChangeButtons[0].style.opacity = 1;
            websiteChangeButtons[1].style.opacity = 1;
        }
    }
}