//Moving button functionality
let maxHeight = 0;
let maxWidth = 0;
//On page rescaling, prevMaxW and H are used to get previous relative distances to transform them to new maxH and W
let prevMaxHeight = 0;
let prevMaxWidth = 0;

let pictureHeightRealLife = 0;
let pictureWidthRealLife = 0;
let id = 0;

function getWidth() { return pictureWidthRealLife; }
function getHeight() { return pictureHeightRealLife; }
function getId() { return id; }
function setId(_id) { id = _id; }

let framePercentWidth = 0;
let framePercentHeight = 0;
//frameMargin is for button collisions
let frameMarginHeight = 0;
let frameMarginWidth = 0;
//Distance between thumbnails
let thumbnailGap = 0; 
let thumbnailHeight = 0;
//Main elements
let frameGrid = document.getElementById("frameGrid");
let pic = document.getElementById("pic");

//Data that will be saved to db
let widthToSave = document.getElementById("widthToSave");
let heightToSave = document.getElementById("heightToSave");

//moved from bottom of js if this starts fucking up
//rescaleEditItems to be the same height as editor item
let editorItem = document.getElementsByClassName("editorItem");
let editItems = document.getElementsByClassName("editItem");
editItems[0].style.height = editorItem[0].offsetHeight + "px";
editItems[1].style.height = editorItem[0].offsetHeight + "px";

//All for popup elements
let popupUploadImageHeightItem = document.getElementById("popupImagePixelHeight");
let popupUploadImageHeight = 0;
let popupUploadImageWidthItem = document.getElementById("popupImagePixelWidth");
let popupUploadImageWidth = 0;
let popupUploadImageRatioItem = document.getElementById("popupImagePixelRatio");
let popupUploadInchWidthItem = document.getElementById("popupUploadInchWidth");
//popupUploadInchWidthItem.value = 0;
let popupUploadInchHeightItem = document.getElementById("popupUploadInchHeight");
//popupUploadInchHeightItem.value = 0;
let popupUploadPPIItem = document.getElementById("popupUploadPPI");

//This refers to the number of segments of wood on a frame side
//Percent variables are used with polygons, in units of percentages they track how tall a segment is
//For 5 buttons per side there are 4 dividing lines, thus 4 percentage variables
let numLeftVisiblePieces = 1;
let leftFrame1 = document.getElementById("Left1");
let leftFrame12Percent = 50;
let leftFrame2 = document.getElementById("Left2");
let leftFrame23Percent = 66.666;
let leftFrame3 = document.getElementById("Left3");
let leftFrame34Percent = 75;
let leftFrame4 = document.getElementById("Left4");
let leftFrame45Percent = 80;
let leftFrame5 = document.getElementById("Left5");

let numRightVisiblePieces = 1;
let rightFrame1 = document.getElementById("Right1");
let rightFrame12Percent = 50;
let rightFrame2 = document.getElementById("Right2");
let rightFrame23Percent = 66.666;
let rightFrame3 = document.getElementById("Right3");
let rightFrame34Percent = 75;
let rightFrame4 = document.getElementById("Right4");
let rightFrame45Percent = 80;
let rightFrame5 = document.getElementById("Right5");

let numTopVisiblePieces = 1;
let topFrame1 = document.getElementById("Top1");
let topFrame12Percent = 50;
let topFrame2 = document.getElementById("Top2");
let topFrame23Percent = 66.666;
let topFrame3 = document.getElementById("Top3");
let topFrame34Percent = 75;
let topFrame4 = document.getElementById("Top4");
let topFrame45Percent = 80;
let topFrame5 = document.getElementById("Top5");

let numBottomVisiblePieces = 1;
let bottomFrame1 = document.getElementById("Bottom1");
let bottomFrame12Percent = 50;
let bottomFrame2 = document.getElementById("Bottom2");
let bottomFrame23Percent = 66.666;
let bottomFrame3 = document.getElementById("Bottom3");
let bottomFrame34Percent = 75;
let bottomFrame4 = document.getElementById("Bottom4");
let bottomFrame45Percent = 80;
let bottomFrame5 = document.getElementById("Bottom5");


//Sliding button functionality
let clickStart = 0;
let isDragging = false;
let currentButton;

//On mouse down clickStart becomes either event.pageX or event.pageY
//mouse down tells mouseMove to be track and mouseMove does the following
//position = e.pageY - clickStart + offset; or in other words
//current position on the page equals = current event X or Y (fires very rapidly) - starting X or Y of mouse + starting distance from initiation point
//Simply put, e.pageXorY - clickStart tracks distance moved by mouse and that is added or subtracted relative to the buttons position
//On mouseUp, offset is set to position to retain distance

//So to scale a button on window rescale
//1. Reset image max height and widths
//2. find percentage distance of offset relative to max width or height. Meaning if a button offset is all the way at the top, that would be 0% of it's
//total height. So find where the 0% distance is with the new height

const leftBtn1 = document.getElementById("leftBtn1");
leftBtn1.textContent = '>';
let leftBtn1Offset = 0;
let leftBtn1Position = 0;
const leftBtn2 = document.getElementById("leftBtn2");
leftBtn2.textContent = '>';
let leftBtn2Offset = 0;
let leftBtn2Position = 0;
const leftBtn3 = document.getElementById("leftBtn3");
leftBtn3.textContent = '>';
let leftBtn3Offset = 0;
let leftBtn3Position = 0;
const leftBtn4 = document.getElementById("leftBtn4");
leftBtn4.textContent = '>';
let leftBtn4Offset = 0;
let leftBtn4Position = 0;
const rightBtn1 = document.getElementById("rightBtn1");
rightBtn1.textContent = '<';
let rightBtn1Offset = 0;
let rightBtn1Position = 0;
const rightBtn2 = document.getElementById("rightBtn2");
rightBtn2.textContent = '<';
let rightBtn2Offset = 0;
let rightBtn2Position = 0;
const rightBtn3 = document.getElementById("rightBtn3");
rightBtn3.textContent = '<';
let rightBtn3Offset = 0;
let rightBtn3Position = 0;
const rightBtn4 = document.getElementById("rightBtn4");
rightBtn4.textContent = '<';
let rightBtn4Offset = 0;
let rightBtn4Position = 0;
const topBtn1 = document.getElementById("topBtn1");
let topBtn1Offset = 0;
let topBtn1Position = 0;
const topBtn2 = document.getElementById("topBtn2");
let topBtn2Offset = 0;
let topBtn2Position = 0;
const topBtn3 = document.getElementById("topBtn3");
let topBtn3Offset = 0;
let topBtn3Position = 0;
const topBtn4 = document.getElementById("topBtn4");
let topBtn4Offset = 0;
let topBtn4Position = 0;
const bottomBtn1 = document.getElementById("bottomBtn1");
let bottomBtn1Offset = 0;
let bottomBtn1Position = 0;
const bottomBtn2 = document.getElementById("bottomBtn2");
let bottomBtn2Offset = 0;
let bottomBtn2Position = 0;
const bottomBtn3 = document.getElementById("bottomBtn3");
let bottomBtn3Offset = 0;
let bottomBtn3Position = 0;
const bottomBtn4 = document.getElementById("bottomBtn4");
let bottomBtn4Offset = 0;
let bottomBtn4Position = 0;

let dropDownButtonLeft1 = document.getElementById("dropDownButtonLeft1");
let dropDownButtonLeft2 = document.getElementById("dropDownButtonLeft2");
let dropDownButtonLeft3 = document.getElementById("dropDownButtonLeft3");
let dropDownButtonLeft4 = document.getElementById("dropDownButtonLeft4");
let dropDownButtonLeft5 = document.getElementById("dropDownButtonLeft5");
let dropDownButtonRight1 = document.getElementById("dropDownButtonRight1");
let dropDownButtonRight2 = document.getElementById("dropDownButtonRight2");
let dropDownButtonRight3 = document.getElementById("dropDownButtonRight3");
let dropDownButtonRight4 = document.getElementById("dropDownButtonRight4");
let dropDownButtonRight5 = document.getElementById("dropDownButtonRight5");
let dropDownButtonTop1 = document.getElementById("dropDownButtonTop1");
let dropDownButtonTop2 = document.getElementById("dropDownButtonTop2");
let dropDownButtonTop3 = document.getElementById("dropDownButtonTop3");
let dropDownButtonTop4 = document.getElementById("dropDownButtonTop4");
let dropDownButtonTop5 = document.getElementById("dropDownButtonTop5");
let dropDownButtonBottom1 = document.getElementById("dropDownButtonBottom1");
let dropDownButtonBottom2 = document.getElementById("dropDownButtonBottom2");
let dropDownButtonBottom3 = document.getElementById("dropDownButtonBottom3");
let dropDownButtonBottom4 = document.getElementById("dropDownButtonBottom4");
let dropDownButtonBottom5 = document.getElementById("dropDownButtonBottom5");

dropDownButtonLeft2.disabled = true;
dropDownButtonLeft3.disabled = true;
dropDownButtonLeft4.disabled = true;
dropDownButtonLeft5.disabled = true;
dropDownButtonRight2.disabled = true;
dropDownButtonRight3.disabled = true;
dropDownButtonRight4.disabled = true;
dropDownButtonRight5.disabled = true;
dropDownButtonTop2.disabled = true;
dropDownButtonTop3.disabled = true;
dropDownButtonTop4.disabled = true;
dropDownButtonTop5.disabled = true;
dropDownButtonBottom2.disabled = true;
dropDownButtonBottom3.disabled = true;
dropDownButtonBottom4.disabled = true;
dropDownButtonBottom5.disabled = true;

let thumbnailLeft1 = document.getElementById("thumbnailLeft1");
let thumbnailLeft1Position = 0;
let thumbnailLeft2 = document.getElementById("thumbnailLeft2");
thumbnailLeft2.src = "/thumbnails/blank.jpg";
let thumbnailLeft2Position = 0;
let thumbnailLeft3 = document.getElementById("thumbnailLeft3");
thumbnailLeft3.src = "/thumbnails/blank.jpg";
let thumbnailLeft3Position = 0;
let thumbnailLeft4 = document.getElementById("thumbnailLeft4");
thumbnailLeft4.src = "/thumbnails/blank.jpg";
let thumbnailLeft4Position = 0;
let thumbnailLeft5 = document.getElementById("thumbnailLeft5");
thumbnailLeft5.src = "/thumbnails/blank.jpg";
let thumbnailLeft5Position = 0;

let thumbnailRight1 = document.getElementById("thumbnailRight1");
let thumbnailRight1Position = 0;
let thumbnailRight2 = document.getElementById("thumbnailRight2");
thumbnailRight2.src = "/thumbnails/blank.jpg";
let thumbnailRight2Position = 0;
let thumbnailRight3 = document.getElementById("thumbnailRight3");
thumbnailRight3.src = "/thumbnails/blank.jpg";
let thumbnailRight3Position = 0;
let thumbnailRight4 = document.getElementById("thumbnailRight4");
thumbnailRight4.src = "/thumbnails/blank.jpg";
let thumbnailRight4Position = 0;
let thumbnailRight5 = document.getElementById("thumbnailRight5");
thumbnailRight5.src = "/thumbnails/blank.jpg";
let thumbnailRight5Position = 0;

let thumbnailTop1 = document.getElementById("thumbnailTop1");
let thumbnailTop1Position = 0;
let thumbnailTop2 = document.getElementById("thumbnailTop2");
thumbnailTop2.src = "/thumbnails/blank.jpg";
let thumbnailTop2Position = 0;
let thumbnailTop3 = document.getElementById("thumbnailTop3");
thumbnailTop3.src = "/thumbnails/blank.jpg";
let thumbnailTop3Position = 0;
let thumbnailTop4 = document.getElementById("thumbnailTop4");
thumbnailTop4.src = "/thumbnails/blank.jpg";
let thumbnailTop4Position = 0;
let thumbnailTop5 = document.getElementById("thumbnailTop5");
thumbnailTop5.src = "/thumbnails/blank.jpg";
let thumbnailTop5Position = 0;

let thumbnailBottom1 = document.getElementById("thumbnailBottom1");
let thumbnailBottom1Position = 0;
let thumbnailBottom2 = document.getElementById("thumbnailBottom2");
thumbnailBottom2.src = "/thumbnails/blank.jpg";
let thumbnailBottom2Position = 0;
let thumbnailBottom3 = document.getElementById("thumbnailBottom3");
thumbnailBottom3.src = "/thumbnails/blank.jpg";
let thumbnailBottom3Position = 0;
let thumbnailBottom4 = document.getElementById("thumbnailBottom4");
thumbnailBottom4.src = "/thumbnails/blank.jpg";
let thumbnailBottom4Position = 0;
let thumbnailBottom5 = document.getElementById("thumbnailBottom5");
thumbnailBottom5.src = "/thumbnails/blank.jpg";
let thumbnailBottom5Position = 0;

//Instantiate grain trackers with initially selected grain
let backgroundImage = getGrainType(window.getComputedStyle(leftFrame1).backgroundImage);
let leftGrains = [];
let rightGrains = [];
let topGrains = [];
let bottomGrains = [];
leftGrains.push(backgroundImage);
rightGrains.push(backgroundImage);
topGrains.push(backgroundImage);
bottomGrains.push(backgroundImage);

//Also code for doNotShow functionality, I couldn't add two classes to elements in the cshtml code so here it is.
document.getElementById("dropDownLeft1").classList.add('doNotShow');
document.getElementById("dropDownLeft2").classList.add('doNotShow');
document.getElementById("dropDownLeft3").classList.add('doNotShow');
document.getElementById("dropDownLeft4").classList.add('doNotShow');
document.getElementById("dropDownLeft5").classList.add('doNotShow');
document.getElementById("dropDownRight1").classList.add('doNotShow');
document.getElementById("dropDownRight2").classList.add('doNotShow');
document.getElementById("dropDownRight3").classList.add('doNotShow');
document.getElementById("dropDownRight4").classList.add('doNotShow');
document.getElementById("dropDownRight5").classList.add('doNotShow');
document.getElementById("dropDownTop1").classList.add('doNotShow');
document.getElementById("dropDownTop2").classList.add('doNotShow');
document.getElementById("dropDownTop3").classList.add('doNotShow');
document.getElementById("dropDownTop4").classList.add('doNotShow');
document.getElementById("dropDownTop5").classList.add('doNotShow');
document.getElementById("dropDownBottom1").classList.add('doNotShow');
document.getElementById("dropDownBottom2").classList.add('doNotShow');
document.getElementById("dropDownBottom3").classList.add('doNotShow');
document.getElementById("dropDownBottom4").classList.add('doNotShow');
document.getElementById("dropDownBottom5").classList.add('doNotShow');

let buttons = document.getElementsByClassName("dropDownContent");
for (let button of buttons) {
    button.classList.add('dropDownButton');
}

document.getElementById("userWallZoom").value = 100;

//For background image urls
function getGrainType(urlString) {
    urlString = urlString.split('/')[4];
    urlString = urlString.split('.')[0];
    urlString = urlString.substring(0, urlString.length - 1);
    return urlString;
}

//For image sources
function getGrainTypeSrc(urlString) {
    urlString = urlString.split('/')[4];
    urlString = urlString.split('.')[0];
    return urlString;
}

function rescaleButtons() {
    if (prevMaxHeight != 0 && prevMaxWidth != 0) {
        //Must transform the button distances and also the percent of the polygons, the polygons are updated in updateLeftFrameClipPaths() currently
        let leftScale1Factor = (leftBtn1Offset + (prevMaxHeight / 2)) / prevMaxHeight;
        leftBtn1Offset = (leftScale1Factor * maxHeight) - (maxHeight / 2);
        leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
        let leftScale2Factor = (leftBtn2Offset + (prevMaxHeight / 2)) / prevMaxHeight;
        leftBtn2Offset = (leftScale2Factor * maxHeight) - (maxHeight / 2);
        leftBtn2.style.transform = 'translateY(' + leftBtn2Offset + 'px)';
        let leftScale3Factor = (leftBtn3Offset + (prevMaxHeight / 2)) / prevMaxHeight;
        leftBtn3Offset = (leftScale3Factor * maxHeight) - (maxHeight / 2);
        leftBtn3.style.transform = 'translateY(' + leftBtn3Offset + 'px)';
        let leftScale4Factor = (leftBtn4Offset + (prevMaxHeight / 2)) / prevMaxHeight;
        leftBtn4Offset = (leftScale4Factor * maxHeight) - (maxHeight / 2);
        leftBtn4.style.transform = 'translateY(' + leftBtn4Offset + 'px)';
        let rightScale1Factor = (rightBtn1Offset + (prevMaxHeight / 2)) / prevMaxHeight;
        rightBtn1Offset = (rightScale1Factor * maxHeight) - (maxHeight / 2);
        rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
        let rightScale2Factor = (rightBtn2Offset + (prevMaxHeight / 2)) / prevMaxHeight;
        rightBtn2Offset = (rightScale2Factor * maxHeight) - (maxHeight / 2);
        rightBtn2.style.transform = 'translateY(' + rightBtn2Offset + 'px)';
        let rightScale3Factor = (rightBtn3Offset + (prevMaxHeight / 2)) / prevMaxHeight;
        rightBtn3Offset = (rightScale3Factor * maxHeight) - (maxHeight / 2);
        rightBtn3.style.transform = 'translateY(' + rightBtn3Offset + 'px)';
        let rightScale4Factor = (rightBtn4Offset + (prevMaxHeight / 2)) / prevMaxHeight;
        rightBtn4Offset = (rightScale4Factor * maxHeight) - (maxHeight / 2);
        rightBtn4.style.transform = 'translateY(' + rightBtn4Offset + 'px)';
        let topScale1Factor = (topBtn1Offset + (prevMaxWidth / 2)) / prevMaxWidth;
        topBtn1Offset = (topScale1Factor * maxWidth) - (maxWidth / 2);
        topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
        let topScale2Factor = (topBtn2Offset + (prevMaxWidth / 2)) / prevMaxWidth;
        topBtn2Offset = (topScale2Factor * maxWidth) - (maxWidth / 2);
        topBtn2.style.transform = 'translateX(' + topBtn2Offset + 'px)';
        let topScale3Factor = (topBtn3Offset + (prevMaxWidth / 2)) / prevMaxWidth;
        topBtn3Offset = (topScale3Factor * maxWidth) - (maxWidth / 2);
        topBtn3.style.transform = 'translateX(' + topBtn3Offset + 'px)';
        let topScale4Factor = (topBtn4Offset + (prevMaxWidth / 2)) / prevMaxWidth;
        topBtn4Offset = (topScale4Factor * maxWidth) - (maxWidth / 2);
        topBtn4.style.transform = 'translateX(' + topBtn4Offset + 'px)';
        let bottomScale1Factor = (bottomBtn1Offset + (prevMaxWidth / 2)) / prevMaxWidth;
        bottomBtn1Offset = (bottomScale1Factor * maxWidth) - (maxWidth / 2);
        bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
        let bottomScale2Factor = (bottomBtn2Offset + (prevMaxWidth / 2)) / prevMaxWidth;
        bottomBtn2Offset = (bottomScale2Factor * maxWidth) - (maxWidth / 2);
        bottomBtn2.style.transform = 'translateX(' + bottomBtn2Offset + 'px)';
        let bottomScale3Factor = (bottomBtn3Offset + (prevMaxWidth / 2)) / prevMaxWidth;
        bottomBtn3Offset = (bottomScale3Factor * maxWidth) - (maxWidth / 2);
        bottomBtn3.style.transform = 'translateX(' + bottomBtn3Offset + 'px)';
        let bottomScale4Factor = (bottomBtn4Offset + (prevMaxWidth / 2)) / prevMaxWidth;
        bottomBtn4Offset = (bottomScale4Factor * maxWidth) - (maxWidth / 2);
        bottomBtn4.style.transform = 'translateX(' + bottomBtn4Offset + 'px)';
    }
}

//Small, medium, large (defined as under 40in^2 (5x8), over 40 and under 360in^2 (below 20x16), and above 360)
//The widths used for each size are .8in, 15/16in, and 1-3/16in. Each are .75in thick  
let frameSize = 0;

//Update parameters when I get to that
function updateAR() {
    pic = document.getElementById("pic");
    prevMaxHeight = maxHeight;
    prevMaxWidth = maxWidth;
    let w = pictureWidthRealLife;
    let h = pictureHeightRealLife;
    if (w * h < 40) {
        frameSize = 0.8;
    }
    else if (w * h > 360) {
        frameSize = 1.1875;
    }
    else {
        frameSize = 0.9375;
    }
    //Account for rabbets on both sides
    let totalFrameW = (w - .6) + (2 * frameSize);
    let totalFrameH = (h - .6) + (2 * frameSize);
    
    let str = totalFrameW.toString() + " / " + totalFrameH.toString();

    frameGrid.style.aspectRatio = str;
    let framePercentWidthMath = frameSize / totalFrameW;
    let picturePercentWidthMath = (1 - (2 * framePercentWidthMath)) * 100;
    let framePercentHeightMath = frameSize / totalFrameH;
    let picturePercentHeightMath = (1 - (2 * framePercentHeightMath)) * 100;
    framePercentWidthMath = framePercentWidthMath * 100;
    framePercentHeightMath = framePercentHeightMath * 100;
    //columns use width, rows use height
    let columnString = framePercentWidthMath.toString() + "% " + picturePercentWidthMath.toString() + "% " + framePercentWidthMath.toString() + "%"; 
    frameGrid.style.gridTemplateColumns = columnString;
    let rowString = framePercentHeightMath.toString() + "% " + picturePercentHeightMath.toString() + "% " + framePercentHeightMath.toString() + "%"; 
    frameGrid.style.gridTemplateRows = rowString;

    //for updateFrames()
    framePercentWidth = framePercentWidthMath;
    framePercentHeight = framePercentHeightMath;

    //update button offsets
    maxHeight = frameGrid.offsetHeight;
    maxWidth = frameGrid.offsetWidth;

    if (w * h < 40) {
        //.8inch will be minimum size cuts
        frameMarginHeight = (0.8 / totalFrameH) * maxHeight;
        frameMarginWidth = (0.8 / totalFrameW) * maxWidth;
    }
    else if (w * h > 360) {
        frameMarginHeight = (1.1875 / totalFrameH) * maxHeight;
        frameMarginWidth = (1.1875 / totalFrameW) * maxWidth;
    }
    else {
        frameMarginHeight = (.9375 / totalFrameH) * maxHeight;
        frameMarginWidth = (.9375 / totalFrameW) * maxWidth;
    }

    //Same as center to center
    thumbnailGap = thumbnailLeft2.getBoundingClientRect().top - thumbnailLeft1.getBoundingClientRect().top;
    thumbnailHeight = thumbnailLeft1.getBoundingClientRect().height;

    rescaleButtons();
}

function submitMetrics() {
    pictureWidthRealLife = document.getElementById("widthInput").value;
    pictureHeightRealLife = document.getElementById("heightInput").value;
    updateAR();
    //Calling both updateFrames because neither update all polygons (for now), will update to just one method soon
    updateLeftFrameClipPaths();
    updateRightFrameClipPaths();
    updateTopFrameClipPaths();
    updateBottomFrameClipPaths();

    //Below takes away the initial overflow hidden css styling, so that loading pics doesn't look as goofy immediately.
    pic.classList.remove("loadPicture");
}

window.addEventListener('resize', updateAR);

//maxHeight or maxWidth ranges from negative some number to positive of that same number, 0 is technically right in the middle
function checkMovingButtonBounds(maxHOrW, buttonPosition) {
    if (buttonPosition > (maxHOrW / 2)) {
        buttonPosition = maxHOrW / 2;
    }
    else if (buttonPosition < (-1 * maxHOrW / 2)) {
        buttonPosition = (-1 * maxHOrW / 2);
    }
    return buttonPosition;
}

function addLeftButton() {
    if (maxHeight != 0 && maxWidth != 0) {
        if (numLeftVisiblePieces < 5) {
            numLeftVisiblePieces++;
        }
        //If there is only 1 piece, then it goes from 0 to 100
        if (numLeftVisiblePieces == 2) {
            leftBtn1.classList.remove('doNotShow');
            leftFrame2.classList.remove('doNotShow');
            leftFrame12Percent = 50;
            leftBtn1Offset = 0;
            leftBtn1Position = leftBtn1Offset;
            leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
            dropDownButtonLeft2.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            //The first side is automatically loaded at start, so leftGrain is ready to go already
            let availableGrain = changeThumbnailAndFrameImage(leftGrains);
            thumbnailLeft2.src = "/thumbnails/" + availableGrain + ".jpg";
            leftFrame2.style.backgroundImage = "url('/images/" + availableGrain + "V.jpg')";
        }
        else if (numLeftVisiblePieces == 3) {
            leftBtn2.classList.remove('doNotShow');
            leftFrame3.classList.remove('doNotShow');
            leftFrame12Percent = 33.333;
            leftFrame23Percent = 66.666;
            leftBtn1Offset = (maxHeight * leftFrame12Percent * 0.01) - (maxHeight / 2);
            leftBtn2Offset = (maxHeight * leftFrame23Percent * 0.01) - (maxHeight / 2);
            leftBtn1Position = leftBtn1Offset;
            leftBtn2Position = leftBtn2Offset;
            leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
            leftBtn2.style.transform = 'translateY(' + leftBtn2Offset + 'px)';
            dropDownButtonLeft3.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let leftFrame2Image = getGrainType(window.getComputedStyle(leftFrame2).backgroundImage);
            leftGrains.push(leftFrame2Image);
            let availableGrain = changeThumbnailAndFrameImage(leftGrains);
            thumbnailLeft3.src = "/thumbnails/" + availableGrain + ".jpg";
            leftFrame3.style.backgroundImage = "url('/images/" + availableGrain + "V.jpg')";
        }
        else if (numLeftVisiblePieces == 4) {
            leftBtn3.classList.remove('doNotShow');
            leftFrame4.classList.remove('doNotShow');
            leftFrame12Percent = 25;
            leftFrame23Percent = 50;
            leftFrame34Percent = 75;
            leftBtn1Offset = (maxHeight * leftFrame12Percent * 0.01) - (maxHeight / 2);
            leftBtn2Offset = (maxHeight * leftFrame23Percent * 0.01) - (maxHeight / 2);
            leftBtn3Offset = (maxHeight * leftFrame34Percent * 0.01) - (maxHeight / 2);
            leftBtn1Position = leftBtn1Offset;
            leftBtn2Position = leftBtn2Offset;
            leftBtn3Position = leftBtn3Offset;
            leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
            leftBtn2.style.transform = 'translateY(' + leftBtn2Offset + 'px)';
            leftBtn3.style.transform = 'translateY(' + leftBtn3Offset + 'px)';
            dropDownButtonLeft4.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let leftFrame3Image = getGrainType(window.getComputedStyle(leftFrame3).backgroundImage);
            leftGrains.push(leftFrame3Image);
            let availableGrain = changeThumbnailAndFrameImage(leftGrains);
            thumbnailLeft4.src = "/thumbnails/" + availableGrain + ".jpg";
            leftFrame4.style.backgroundImage = "url('/images/" + availableGrain + "V.jpg')";
        }
        else if (numLeftVisiblePieces == 5) {
            leftBtn4.classList.remove('doNotShow');
            leftFrame5.classList.remove('doNotShow');
            leftFrame12Percent = 20;
            leftFrame23Percent = 40;
            leftFrame34Percent = 60;
            leftFrame45Percent = 80;
            leftBtn1Offset = (maxHeight * leftFrame12Percent * 0.01) - (maxHeight / 2);
            leftBtn2Offset = (maxHeight * leftFrame23Percent * 0.01) - (maxHeight / 2);
            leftBtn3Offset = (maxHeight * leftFrame34Percent * 0.01) - (maxHeight / 2);
            leftBtn4Offset = (maxHeight * leftFrame45Percent * 0.01) - (maxHeight / 2);
            leftBtn1Position = leftBtn1Offset;
            leftBtn2Position = leftBtn2Offset;
            leftBtn3Position = leftBtn3Offset;
            leftBtn4Position = leftBtn4Offset;
            leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
            leftBtn2.style.transform = 'translateY(' + leftBtn2Offset + 'px)';
            leftBtn3.style.transform = 'translateY(' + leftBtn3Offset + 'px)';
            leftBtn4.style.transform = 'translateY(' + leftBtn4Offset + 'px)';
            dropDownButtonLeft5.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let leftFrame4Image = getGrainType(window.getComputedStyle(leftFrame4).backgroundImage);
            leftGrains.push(leftFrame4Image);
            let availableGrain = changeThumbnailAndFrameImage(leftGrains);
            thumbnailLeft5.src = "/thumbnails/" + availableGrain + ".jpg";
            leftFrame5.style.backgroundImage = "url('/images/" + availableGrain + "V.jpg')";
        }
        updateLeftFrameClipPaths();
    }
}
function removeLeftButton() {
    if (numLeftVisiblePieces > 1) {
        numLeftVisiblePieces--;
    }
    if (numLeftVisiblePieces == 1) {
        leftBtn1.classList.add('doNotShow');
        leftFrame2.classList.add('doNotShow');
        dropDownButtonLeft2.disabled = true;
        leftGrains.pop();
        thumbnailLeft2.src = "/thumbnails/blank.jpg";
    }
    else if (numLeftVisiblePieces == 2) {
        leftBtn2.classList.add('doNotShow');
        leftFrame3.classList.add('doNotShow');
        leftFrame12Percent = 50;
        leftBtn1Offset = 0;
        leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
        dropDownButtonLeft3.disabled = true;
        leftGrains.pop();
        thumbnailLeft3.src = "/thumbnails/blank.jpg";
    }
    else if (numLeftVisiblePieces == 3) {
        leftBtn3.classList.add('doNotShow');
        leftFrame4.classList.add('doNotShow');
        leftFrame12Percent = 33.333;
        leftFrame23Percent = 66.666;
        leftBtn1Offset = (maxHeight * leftFrame12Percent * 0.01) - (maxHeight / 2);
        leftBtn2Offset = (maxHeight * leftFrame23Percent * 0.01) - (maxHeight / 2);
        leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
        leftBtn2.style.transform = 'translateY(' + leftBtn2Offset + 'px)';
        dropDownButtonLeft4.disabled = true;
        leftGrains.pop();
        thumbnailLeft4.src = "/thumbnails/blank.jpg";
    }
    else if (numLeftVisiblePieces == 4) {
        leftBtn4.classList.add('doNotShow');
        leftFrame5.classList.add('doNotShow');
        leftFrame12Percent = 25;
        leftFrame23Percent = 50;
        leftFrame34Percent = 75;
        leftBtn1Offset = (maxHeight * leftFrame12Percent * 0.01) - (maxHeight / 2);
        leftBtn2Offset = (maxHeight * leftFrame23Percent * 0.01) - (maxHeight / 2);
        leftBtn3Offset = (maxHeight * leftFrame34Percent * 0.01) - (maxHeight / 2);
        leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
        leftBtn2.style.transform = 'translateY(' + leftBtn2Offset + 'px)';
        leftBtn3.style.transform = 'translateY(' + leftBtn3Offset + 'px)';
        dropDownButtonLeft5.disabled = true;
        leftGrains.pop();
        thumbnailLeft5.src = "/thumbnails/blank.jpg";
    }
    updateLeftFrameClipPaths();
}

function addRightButton() {
    if (maxHeight != 0 && maxWidth != 0) {
        if (numRightVisiblePieces < 5) {
            numRightVisiblePieces++;
        }
        //If there is only 1 piece, then it goes from 0 to 100
        if (numRightVisiblePieces == 2) {
            rightBtn1.classList.remove('doNotShow');
            rightFrame2.classList.remove('doNotShow');
            rightFrame12Percent = 50;
            rightBtn1Offset = 0;
            rightBtn1Position = rightBtn1Offset;
            rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
            dropDownButtonRight2.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            //The first side is automatically loaded at start, so rightGrain is ready to go already
            let availableGrain = changeThumbnailAndFrameImage(rightGrains);
            thumbnailRight2.src = "/thumbnails/" + availableGrain + ".jpg";
            rightFrame2.style.backgroundImage = "url('/images/" + availableGrain + "V.jpg')";
        }
        else if (numRightVisiblePieces == 3) {
            rightBtn2.classList.remove('doNotShow');
            rightFrame3.classList.remove('doNotShow');
            rightFrame12Percent = 33.333;
            rightFrame23Percent = 66.666;
            rightBtn1Offset = (maxHeight * rightFrame12Percent * 0.01) - (maxHeight / 2);
            rightBtn2Offset = (maxHeight * rightFrame23Percent * 0.01) - (maxHeight / 2);
            rightBtn1Position = rightBtn1Offset;
            rightBtn2Position = rightBtn2Offset;
            rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
            rightBtn2.style.transform = 'translateY(' + rightBtn2Offset + 'px)';
            dropDownButtonRight3.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let rightFrame2Image = getGrainType(window.getComputedStyle(rightFrame2).backgroundImage);
            rightGrains.push(rightFrame2Image);
            let availableGrain = changeThumbnailAndFrameImage(rightGrains);
            thumbnailRight3.src = "/thumbnails/" + availableGrain + ".jpg";
            rightFrame3.style.backgroundImage = "url('/images/" + availableGrain + "V.jpg')";
        }
        else if (numRightVisiblePieces == 4) {
            rightBtn3.classList.remove('doNotShow');
            rightFrame4.classList.remove('doNotShow');
            rightFrame12Percent = 25;
            rightFrame23Percent = 50;
            rightFrame34Percent = 75;
            rightBtn1Offset = (maxHeight * rightFrame12Percent * 0.01) - (maxHeight / 2);
            rightBtn2Offset = (maxHeight * rightFrame23Percent * 0.01) - (maxHeight / 2);
            rightBtn3Offset = (maxHeight * rightFrame34Percent * 0.01) - (maxHeight / 2);
            rightBtn1Position = rightBtn1Offset;
            rightBtn2Position = rightBtn2Offset;
            rightBtn3Position = rightBtn3Offset;
            rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
            rightBtn2.style.transform = 'translateY(' + rightBtn2Offset + 'px)';
            rightBtn3.style.transform = 'translateY(' + rightBtn3Offset + 'px)';
            dropDownButtonRight4.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let rightFrame3Image = getGrainType(window.getComputedStyle(rightFrame3).backgroundImage);
            rightGrains.push(rightFrame3Image);
            let availableGrain = changeThumbnailAndFrameImage(rightGrains);
            thumbnailRight4.src = "/thumbnails/" + availableGrain + ".jpg";
            rightFrame4.style.backgroundImage = "url('/images/" + availableGrain + "V.jpg')";
        }
        else if (numRightVisiblePieces == 5) {
            rightBtn4.classList.remove('doNotShow');
            rightFrame5.classList.remove('doNotShow');
            rightFrame12Percent = 20;
            rightFrame23Percent = 40;
            rightFrame34Percent = 60;
            rightFrame45Percent = 80;
            rightBtn1Offset = (maxHeight * rightFrame12Percent * 0.01) - (maxHeight / 2);
            rightBtn2Offset = (maxHeight * rightFrame23Percent * 0.01) - (maxHeight / 2);
            rightBtn3Offset = (maxHeight * rightFrame34Percent * 0.01) - (maxHeight / 2);
            rightBtn4Offset = (maxHeight * rightFrame45Percent * 0.01) - (maxHeight / 2);
            rightBtn1Position = rightBtn1Offset;
            rightBtn2Position = rightBtn2Offset;
            rightBtn3Position = rightBtn3Offset;
            rightBtn4Position = rightBtn4Offset;
            rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
            rightBtn2.style.transform = 'translateY(' + rightBtn2Offset + 'px)';
            rightBtn3.style.transform = 'translateY(' + rightBtn3Offset + 'px)';
            rightBtn4.style.transform = 'translateY(' + rightBtn4Offset + 'px)';
            dropDownButtonRight5.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let rightFrame4Image = getGrainType(window.getComputedStyle(rightFrame4).backgroundImage);
            rightGrains.push(rightFrame4Image);
            let availableGrain = changeThumbnailAndFrameImage(rightGrains);
            thumbnailRight5.src = "/thumbnails/" + availableGrain + ".jpg";
            rightFrame5.style.backgroundImage = "url('/images/" + availableGrain + "V.jpg')";
        }
        updateRightFrameClipPaths();
    }
}
function removeRightButton() {
    if (numRightVisiblePieces > 1) {
        numRightVisiblePieces--;
    }
    if (numRightVisiblePieces == 1) {
        rightBtn1.classList.add('doNotShow');
        rightFrame2.classList.add('doNotShow');
        dropDownButtonRight2.disabled = true;
        rightGrains.pop();
        thumbnailRight2.src = "/thumbnails/blank.jpg";
    }
    else if (numRightVisiblePieces == 2) {
        rightBtn2.classList.add('doNotShow');
        rightFrame3.classList.add('doNotShow');
        rightFrame12Percent = 50;
        rightBtn1Offset = 0;
        rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
        dropDownButtonRight3.disabled = true;
        rightGrains.pop();
        thumbnailRight3.src = "/thumbnails/blank.jpg";
    }
    else if (numRightVisiblePieces == 3) {
        rightBtn3.classList.add('doNotShow');
        rightFrame4.classList.add('doNotShow');
        rightFrame12Percent = 33.333;
        rightFrame23Percent = 66.666;
        rightBtn1Offset = (maxHeight * rightFrame12Percent * 0.01) - (maxHeight / 2);
        rightBtn2Offset = (maxHeight * rightFrame23Percent * 0.01) - (maxHeight / 2);
        rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
        rightBtn2.style.transform = 'translateY(' + rightBtn2Offset + 'px)';
        dropDownButtonRight4.disabled = true;
        rightGrains.pop();
        thumbnailRight4.src = "/thumbnails/blank.jpg";
    }
    else if (numRightVisiblePieces == 4) {
        rightBtn4.classList.add('doNotShow');
        rightFrame5.classList.add('doNotShow');
        rightFrame12Percent = 25;
        rightFrame23Percent = 50;
        rightFrame34Percent = 75;
        rightBtn1Offset = (maxHeight * rightFrame12Percent * 0.01) - (maxHeight / 2);
        rightBtn2Offset = (maxHeight * rightFrame23Percent * 0.01) - (maxHeight / 2);
        rightBtn3Offset = (maxHeight * rightFrame34Percent * 0.01) - (maxHeight / 2);
        rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
        rightBtn2.style.transform = 'translateY(' + rightBtn2Offset + 'px)';
        rightBtn3.style.transform = 'translateY(' + rightBtn3Offset + 'px)';
        dropDownButtonRight5.disabled = true;
        rightGrains.pop();
        thumbnailRight5.src = "/thumbnails/blank.jpg";
    }
    updateRightFrameClipPaths();
}

function addTopButton() {
    if (maxHeight != 0 && maxWidth != 0) {
        if (numTopVisiblePieces < 5) {
            numTopVisiblePieces++;
        }
        //If there is only 1 piece, then it goes from 0 to 100
        if (numTopVisiblePieces == 2) {
            topBtn1.classList.remove('doNotShow');
            topFrame2.classList.remove('doNotShow');
            topFrame12Percent = 50;
            topBtn1Offset = 0;
            topBtn1Position = topBtn1Offset;
            topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
            dropDownButtonTop2.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            //The first side is automatically loaded at start, so topGrain is ready to go already
            let availableGrain = changeThumbnailAndFrameImage(topGrains);
            thumbnailTop2.src = "/thumbnails/" + availableGrain + ".jpg";
            topFrame2.style.backgroundImage = "url('/images/" + availableGrain + "H.jpg')";
        }
        else if (numTopVisiblePieces == 3) {
            topBtn2.classList.remove('doNotShow');
            topFrame3.classList.remove('doNotShow');
            topFrame12Percent = 33.333;
            topFrame23Percent = 66.666;
            topBtn1Offset = (maxWidth * topFrame12Percent * 0.01) - (maxWidth / 2);
            topBtn2Offset = (maxWidth * topFrame23Percent * 0.01) - (maxWidth / 2);
            topBtn1Position = topBtn1Offset;
            topBtn2Position = topBtn2Offset;
            topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
            topBtn2.style.transform = 'translateX(' + topBtn2Offset + 'px)';
            dropDownButtonTop3.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let topFrame2Image = getGrainType(window.getComputedStyle(topFrame2).backgroundImage);
            topGrains.push(topFrame2Image);
            let availableGrain = changeThumbnailAndFrameImage(topGrains);
            thumbnailTop3.src = "/thumbnails/" + availableGrain + ".jpg";
            topFrame3.style.backgroundImage = "url('/images/" + availableGrain + "H.jpg')";
        }
        else if (numTopVisiblePieces == 4) {
            topBtn3.classList.remove('doNotShow');
            topFrame4.classList.remove('doNotShow');
            topFrame12Percent = 25;
            topFrame23Percent = 50;
            topFrame34Percent = 75;
            topBtn1Offset = (maxWidth * topFrame12Percent * 0.01) - (maxWidth / 2);
            topBtn2Offset = (maxWidth * topFrame23Percent * 0.01) - (maxWidth / 2);
            topBtn3Offset = (maxWidth * topFrame34Percent * 0.01) - (maxWidth / 2);
            topBtn1Position = topBtn1Offset;
            topBtn2Position = topBtn2Offset;
            topBtn3Position = topBtn3Offset;
            topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
            topBtn2.style.transform = 'translateX(' + topBtn2Offset + 'px)';
            topBtn3.style.transform = 'translateX(' + topBtn3Offset + 'px)';
            dropDownButtonTop4.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let topFrame3Image = getGrainType(window.getComputedStyle(topFrame3).backgroundImage);
            topGrains.push(topFrame3Image);
            let availableGrain = changeThumbnailAndFrameImage(topGrains);
            thumbnailTop4.src = "/thumbnails/" + availableGrain + ".jpg";
            topFrame4.style.backgroundImage = "url('/images/" + availableGrain + "H.jpg')";
        }
        else if (numTopVisiblePieces == 5) {
            topBtn4.classList.remove('doNotShow');
            topFrame5.classList.remove('doNotShow');
            topFrame12Percent = 20;
            topFrame23Percent = 40;
            topFrame34Percent = 60;
            topFrame45Percent = 80;
            topBtn1Offset = (maxWidth * topFrame12Percent * 0.01) - (maxWidth / 2);
            topBtn2Offset = (maxWidth * topFrame23Percent * 0.01) - (maxWidth / 2);
            topBtn3Offset = (maxWidth * topFrame34Percent * 0.01) - (maxWidth / 2);
            topBtn4Offset = (maxWidth * topFrame45Percent * 0.01) - (maxWidth / 2);
            topBtn1Position = topBtn1Offset;
            topBtn2Position = topBtn2Offset;
            topBtn3Position = topBtn3Offset;
            topBtn4Position = topBtn4Offset;
            topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
            topBtn2.style.transform = 'translateX(' + topBtn2Offset + 'px)';
            topBtn3.style.transform = 'translateX(' + topBtn3Offset + 'px)';
            topBtn4.style.transform = 'translateX(' + topBtn4Offset + 'px)';
            dropDownButtonTop5.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let topFrame4Image = getGrainType(window.getComputedStyle(topFrame4).backgroundImage);
            topGrains.push(topFrame4Image);
            let availableGrain = changeThumbnailAndFrameImage(topGrains);
            thumbnailTop5.src = "/thumbnails/" + availableGrain + ".jpg";
            topFrame5.style.backgroundImage = "url('/images/" + availableGrain + "H.jpg')";
        }
        updateTopFrameClipPaths();
    }
}
function removeTopButton() {
    if (numTopVisiblePieces > 1) {
        numTopVisiblePieces--;
    }
    if (numTopVisiblePieces == 1) {
        topBtn1.classList.add('doNotShow');
        topFrame2.classList.add('doNotShow');
        dropDownButtonTop2.disabled = true;
        topGrains.pop();
        thumbnailTop2.src = "/thumbnails/blank.jpg";
    }
    else if (numTopVisiblePieces == 2) {
        topBtn2.classList.add('doNotShow');
        topFrame3.classList.add('doNotShow');
        topFrame12Percent = 50;
        topBtn1Offset = 0;
        topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
        dropDownButtonTop3.disabled = true;
        topGrains.pop();
        thumbnailTop3.src = "/thumbnails/blank.jpg";
    }
    else if (numTopVisiblePieces == 3) {
        topBtn3.classList.add('doNotShow');
        topFrame4.classList.add('doNotShow');
        topFrame12Percent = 33.333;
        topFrame23Percent = 66.666;
        topBtn1Offset = (maxWidth * topFrame12Percent * 0.01) - (maxWidth / 2);
        topBtn2Offset = (maxWidth * topFrame23Percent * 0.01) - (maxWidth / 2);
        topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
        topBtn2.style.transform = 'translateX(' + topBtn2Offset + 'px)';
        dropDownButtonTop4.disabled = true;
        topGrains.pop();
        thumbnailTop4.src = "/thumbnails/blank.jpg";
    }
    else if (numTopVisiblePieces == 4) {
        topBtn4.classList.add('doNotShow');
        topFrame5.classList.add('doNotShow');
        topFrame12Percent = 25;
        topFrame23Percent = 50;
        topFrame34Percent = 75;
        topBtn1Offset = (maxWidth * topFrame12Percent * 0.01) - (maxWidth / 2);
        topBtn2Offset = (maxWidth * topFrame23Percent * 0.01) - (maxWidth / 2);
        topBtn3Offset = (maxWidth * topFrame34Percent * 0.01) - (maxWidth / 2);
        topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
        topBtn2.style.transform = 'translateX(' + topBtn2Offset + 'px)';
        topBtn3.style.transform = 'translateX(' + topBtn3Offset + 'px)';
        dropDownButtonTop5.disabled = true;
        topGrains.pop();
        thumbnailTop5.src = "/thumbnails/blank.jpg";
    }
    updateTopFrameClipPaths();
}

function addBottomButton() {
    if (maxHeight != 0 && maxWidth != 0) {
        if (numBottomVisiblePieces < 5) {
            numBottomVisiblePieces++;
        }
        //If there is only 1 piece, then it goes from 0 to 100
        if (numBottomVisiblePieces == 2) {
            bottomBtn1.classList.remove('doNotShow');
            bottomFrame2.classList.remove('doNotShow');
            bottomFrame12Percent = 50;
            bottomBtn1Offset = 0;
            bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
            dropDownButtonBottom2.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            //The first side is automatically loaded at start, so bottomGrain is ready to go already
            let availableGrain = changeThumbnailAndFrameImage(bottomGrains);
            thumbnailBottom2.src = "/thumbnails/" + availableGrain + ".jpg";
            bottomFrame2.style.backgroundImage = "url('/images/" + availableGrain + "H.jpg')";
        }
        else if (numBottomVisiblePieces == 3) {
            bottomBtn2.classList.remove('doNotShow');
            bottomFrame3.classList.remove('doNotShow');
            bottomFrame12Percent = 33.333;
            bottomFrame23Percent = 66.666;
            bottomBtn1Offset = (maxWidth * bottomFrame12Percent * 0.01) - (maxWidth / 2);
            bottomBtn2Offset = (maxWidth * bottomFrame23Percent * 0.01) - (maxWidth / 2);
            bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
            bottomBtn2.style.transform = 'translateX(' + bottomBtn2Offset + 'px)';
            dropDownButtonBottom3.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let bottomFrame2Image = getGrainType(window.getComputedStyle(bottomFrame2).backgroundImage);
            bottomGrains.push(bottomFrame2Image);
            let availableGrain = changeThumbnailAndFrameImage(bottomGrains);
            thumbnailBottom3.src = "/thumbnails/" + availableGrain + ".jpg";
            bottomFrame3.style.backgroundImage = "url('/images/" + availableGrain + "H.jpg')";
        }
        else if (numBottomVisiblePieces == 4) {
            bottomBtn3.classList.remove('doNotShow');
            bottomFrame4.classList.remove('doNotShow');
            bottomFrame12Percent = 25;
            bottomFrame23Percent = 50;
            bottomFrame34Percent = 75;
            bottomBtn1Offset = (maxWidth * bottomFrame12Percent * 0.01) - (maxWidth / 2);
            bottomBtn2Offset = (maxWidth * bottomFrame23Percent * 0.01) - (maxWidth / 2);
            bottomBtn3Offset = (maxWidth * bottomFrame34Percent * 0.01) - (maxWidth / 2);
            bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
            bottomBtn2.style.transform = 'translateX(' + bottomBtn2Offset + 'px)';
            bottomBtn3.style.transform = 'translateX(' + bottomBtn3Offset + 'px)';
            dropDownButtonBottom4.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let bottomFrame3Image = getGrainType(window.getComputedStyle(bottomFrame3).backgroundImage);
            bottomGrains.push(bottomFrame3Image);
            let availableGrain = changeThumbnailAndFrameImage(bottomGrains);
            thumbnailBottom4.src = "/thumbnails/" + availableGrain + ".jpg";
            bottomFrame4.style.backgroundImage = "url('/images/" + availableGrain + "H.jpg')";
        }
        else if (numBottomVisiblePieces == 5) {
            bottomBtn4.classList.remove('doNotShow');
            bottomFrame5.classList.remove('doNotShow');
            bottomFrame12Percent = 20;
            bottomFrame23Percent = 40;
            bottomFrame34Percent = 60;
            bottomFrame45Percent = 80;
            bottomBtn1Offset = (maxWidth * bottomFrame12Percent * 0.01) - (maxWidth / 2);
            bottomBtn2Offset = (maxWidth * bottomFrame23Percent * 0.01) - (maxWidth / 2);
            bottomBtn3Offset = (maxWidth * bottomFrame34Percent * 0.01) - (maxWidth / 2);
            bottomBtn4Offset = (maxWidth * bottomFrame45Percent * 0.01) - (maxWidth / 2);
            bottomBtn1Position = bottomBtn1Offset;
            bottomBtn2Position = bottomBtn2Offset;
            bottomBtn3Position = bottomBtn3Offset;
            bottomBtn4Position = bottomBtn4Offset;
            bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
            bottomBtn2.style.transform = 'translateX(' + bottomBtn2Offset + 'px)';
            bottomBtn3.style.transform = 'translateX(' + bottomBtn3Offset + 'px)';
            bottomBtn4.style.transform = 'translateX(' + bottomBtn4Offset + 'px)';
            dropDownButtonBottom5.disabled = false;
            //Find a grain not being used as to differentiate the newly created piece
            let bottomFrame4Image = getGrainType(window.getComputedStyle(bottomFrame4).backgroundImage);
            bottomGrains.push(bottomFrame4Image);
            let availableGrain = changeThumbnailAndFrameImage(bottomGrains);
            thumbnailBottom5.src = "/thumbnails/" + availableGrain + ".jpg";
            bottomFrame5.style.backgroundImage = "url('/images/" + availableGrain + "H.jpg')";
        }
        updateBottomFrameClipPaths();
    }
}
function removeBottomButton() {
    if (numBottomVisiblePieces > 1) {
        numBottomVisiblePieces--;
    }
    if (numBottomVisiblePieces == 1) {
        bottomBtn1.classList.add('doNotShow');
        bottomFrame2.classList.add('doNotShow');
        dropDownButtonBottom2.disabled = true;
        bottomGrains.pop();
        thumbnailBottom2.src = "/thumbnails/blank.jpg";
    }
    else if (numBottomVisiblePieces == 2) {
        bottomBtn2.classList.add('doNotShow');
        bottomFrame3.classList.add('doNotShow');
        bottomFrame12Percent = 50;
        bottomBtn1Offset = 0;
        bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
        dropDownButtonBottom3.disabled = true;
        bottomGrains.pop();
        thumbnailBottom3.src = "/thumbnails/blank.jpg";
    }
    else if (numBottomVisiblePieces == 3) {
        bottomBtn3.classList.add('doNotShow');
        bottomFrame4.classList.add('doNotShow');
        bottomFrame12Percent = 33.333;
        bottomFrame23Percent = 66.666;
        bottomBtn1Offset = (maxWidth * bottomFrame12Percent * 0.01) - (maxWidth / 2);
        bottomBtn2Offset = (maxWidth * bottomFrame23Percent * 0.01) - (maxWidth / 2);
        bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
        bottomBtn2.style.transform = 'translateX(' + bottomBtn2Offset + 'px)';
        dropDownButtonBottom4.disabled = true;
        bottomGrains.pop();
        thumbnailBottom4.src = "/thumbnails/blank.jpg";
    }
    else if (numBottomVisiblePieces == 4) {
        bottomBtn4.classList.add('doNotShow');
        bottomFrame5.classList.add('doNotShow');
        bottomFrame12Percent = 25;
        bottomFrame23Percent = 50;
        bottomFrame34Percent = 75;
        bottomBtn1Offset = (maxWidth * bottomFrame12Percent * 0.01) - (maxWidth / 2);
        bottomBtn2Offset = (maxWidth * bottomFrame23Percent * 0.01) - (maxWidth / 2);
        bottomBtn3Offset = (maxWidth * bottomFrame34Percent * 0.01) - (maxWidth / 2);
        bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
        bottomBtn2.style.transform = 'translateX(' + bottomBtn2Offset + 'px)';
        bottomBtn3.style.transform = 'translateX(' + bottomBtn3Offset + 'px)';
        dropDownButtonBottom5.disabled = true;
        bottomGrains.pop();
        thumbnailBottom5.src = "/thumbnails/blank.jpg";
    }
    updateBottomFrameClipPaths();
}

function updateLeftFrameClipPaths() {
    let height = framePercentHeight;
    let oneMinusHeight = 100 - framePercentHeight;
    let morePieces = true;
    for (let i = 1; i < 6; i++) {
        if (morePieces) {
            if (i == numLeftVisiblePieces) {
                morePieces = false;
            }
            if (i == 1 && morePieces == false) {
                let style = "polygon(0% 0%, 100% " + height + "%, 100% " + oneMinusHeight + "%, 0% 100%)";
                leftFrame1.style.clipPath = style;
            }
            if (i == 1 && morePieces == true) {
                let style = "polygon(0% 0%, 100% " + height + "%, 100% " + leftFrame12Percent + "%, 0% " + leftFrame12Percent + "%)";
                leftFrame1.style.clipPath = style;
            }
            if (i == 2 && morePieces == false) {
                let style = 'polygon(0% ' + leftFrame12Percent + '%, 100% ' + leftFrame12Percent + '%, 100% ' + oneMinusHeight + '%, 0% 100%)';
                leftFrame2.style.clipPath = style;
            }
            if (i == 2 && morePieces == true) {
                let style = 'polygon(0% ' + leftFrame12Percent + '%, 100% ' + leftFrame12Percent + '%, 100% ' + leftFrame23Percent + '%, 0% ' + leftFrame23Percent + '%)';
                leftFrame2.style.clipPath = style;
            }
            if (i == 3 && morePieces == false) {
                let style = 'polygon(0% ' + leftFrame23Percent + '%, 100% ' + leftFrame23Percent + '%, 100% ' + oneMinusHeight + '%, 0% 100%)';
                leftFrame3.style.clipPath = style;
            }
            if (i == 3 && morePieces == true) {
                let style = 'polygon(0% ' + leftFrame23Percent + '%, 100% ' + leftFrame23Percent + '%, 100% ' + leftFrame34Percent + '%, 0% ' + leftFrame34Percent + '%)';
                leftFrame3.style.clipPath = style;
            }
            if (i == 4 && morePieces == false) {
                let style = 'polygon(0% ' + leftFrame34Percent + '%, 100% ' + leftFrame34Percent + '%, 100% ' + oneMinusHeight + '%, 0% 100%)';
                leftFrame4.style.clipPath = style;
            }
            if (i == 4 && morePieces == true) {
                let style = 'polygon(0% ' + leftFrame34Percent + '%, 100% ' + leftFrame34Percent + '%, 100% ' + leftFrame45Percent + '%, 0% ' + leftFrame45Percent + '%)';
                leftFrame4.style.clipPath = style;
            }
            if (i == 5) {
                let style = 'polygon(0% ' + leftFrame45Percent + '%, 100% ' + leftFrame45Percent + '%, 100% ' + oneMinusHeight + '%, 0% 100%)';
                leftFrame5.style.clipPath = style;
            }
        }
    }
}

function updateRightFrameClipPaths() {
    let height = framePercentHeight;
    let oneMinusHeight = 100 - framePercentHeight;
    let morePieces = true;
    for (let i = 1; i < 6; i++) {
        if (morePieces) {
            if (i == numRightVisiblePieces) {
                morePieces = false;
            }
            if (i == 1 && morePieces == false) {
                let style = "polygon(0% " + height + "%, 100% 0%, 100% 100%, 0% " + oneMinusHeight + "%)";
                rightFrame1.style.clipPath = style;
            }
            if (i == 1 && morePieces == true) {
                let style = "polygon(0% " + height + "%, 100% 0%, 100% " + rightFrame12Percent + "%, 0% " + rightFrame12Percent + "%)";
                rightFrame1.style.clipPath = style;
            }
            if (i == 2 && morePieces == false) {
                let style = "polygon(0% " + rightFrame12Percent + "%, 100% " + rightFrame12Percent + "%, 100% 100%, 0% " + oneMinusHeight + "%)";
                rightFrame2.style.clipPath = style;
            }
            if (i == 2 && morePieces == true) {
                let style = "polygon(0% " + rightFrame12Percent + "%, 100% " + rightFrame12Percent + "%, 100% " + rightFrame23Percent + "%, 0% " + rightFrame23Percent + "%)";
                rightFrame2.style.clipPath = style;
            }
            if (i == 3 && morePieces == false) {
                let style = "polygon(0% " + rightFrame23Percent + "%, 100% " + rightFrame23Percent + "%, 100% 100%, 0% " + oneMinusHeight + "%)";
                rightFrame3.style.clipPath = style;
            }
            if (i == 3 && morePieces == true) {
                let style = "polygon(0% " + rightFrame23Percent + "%, 100% " + rightFrame23Percent + "%, 100% " + rightFrame34Percent + "%, 0% " + rightFrame34Percent + "%)";
                rightFrame3.style.clipPath = style;
            }
            if (i == 4 && morePieces == false) {
                let style = "polygon(0% " + rightFrame34Percent + "%, 100% " + rightFrame34Percent + "%, 100% 100%, 0% " + oneMinusHeight + "%)";
                rightFrame4.style.clipPath = style;
            }
            if (i == 4 && morePieces == true) {
                let style = "polygon(0% " + rightFrame34Percent + "%, 100% " + rightFrame34Percent + "%, 100% " + rightFrame45Percent + "%, 0% " + rightFrame45Percent + "%)";
                rightFrame4.style.clipPath = style;
            }
            if (i == 5) {
                let style = "polygon(0% " + rightFrame45Percent + "%, 100% " + rightFrame45Percent + "%, 100% 100%, 0% " + oneMinusHeight + "%)";
                rightFrame5.style.clipPath = style;
            }
        }
    }
}

function updateTopFrameClipPaths() {
    let width = framePercentWidth;
    let oneMinusWidth = 100 - framePercentWidth;

    let morePieces = true;
    for (let i = 1; i < 6; i++) {
        if (morePieces) {
            if (i == numTopVisiblePieces) {
                morePieces = false;
            }
            if (i == 1 && morePieces == false) {
                let style = "polygon(0% 0%, 100% 0%, " + oneMinusWidth + "% 100%, " + width + "% 100%)";
                topFrame1.style.clipPath = style;
            }
            if (i == 1 && morePieces == true) {
                let style = "polygon(0% 0%, " + topFrame12Percent + "% 0%, " + topFrame12Percent + "% 100%, " + width + "% 100%)";
                topFrame1.style.clipPath = style;
            }
            if (i == 2 && morePieces == false) {
                let style = "polygon(" + topFrame12Percent + "% 0%, 100% 0%, " + oneMinusWidth + "% 100%, " + topFrame12Percent + "% 100%)";
                topFrame2.style.clipPath = style;
            }
            if (i == 2 && morePieces == true) {
                let style = "polygon(" + topFrame12Percent + "% 0%, " + topFrame23Percent + "% 0%, " + topFrame23Percent + "% 100%, " + topFrame12Percent + "% 100%)";
                topFrame2.style.clipPath = style;
            }
            if (i == 3 && morePieces == false) {
                let style = "polygon(" + topFrame23Percent + "% 0%, 100% 0%, " + oneMinusWidth + "% 100%, " + topFrame23Percent + "% 100%)";
                topFrame3.style.clipPath = style;
            }
            if (i == 3 && morePieces == true) {
                let style = "polygon(" + topFrame23Percent + "% 0%, " + topFrame34Percent + "% 0%, " + topFrame34Percent + "% 100%, " + topFrame23Percent + "% 100%)";
                topFrame3.style.clipPath = style;
            }
            if (i == 4 && morePieces == false) {
                let style = "polygon(" + topFrame34Percent + "% 0%, 100% 0%, " + oneMinusWidth + "% 100%, " + topFrame34Percent + "% 100%)";
                topFrame4.style.clipPath = style;
            }
            if (i == 4 && morePieces == true) {
                let style = "polygon(" + topFrame34Percent + "% 0%, " + topFrame45Percent + "% 0%, " + topFrame45Percent + "% 100%, " + topFrame34Percent + "% 100%)";
                topFrame4.style.clipPath = style;
            }
            if (i == 5) {
                let style = "polygon(" + topFrame45Percent + "% 0%, 100% 0%, " + oneMinusWidth + "% 100%, " + topFrame45Percent + "% 100%)";
                topFrame5.style.clipPath = style;
            }
        }
    }

}

function updateBottomFrameClipPaths() {
    let width = framePercentWidth;
    let oneMinusWidth = 100 - framePercentWidth;

    let morePieces = true;
    for (let i = 1; i < 6; i++) {
        if (morePieces) {
            if (i == numBottomVisiblePieces) {
                morePieces = false;
            }
            if (i == 1 && morePieces == false) {
                let style = "polygon(0% 100%, " + width + "% 0%, " + oneMinusWidth + "% 0%, 100% 100%)";
                bottomFrame1.style.clipPath = style;
            }
            if (i == 1 && morePieces == true) {
                let style = "polygon(0% 100%, " + width + "% 0%, " + bottomFrame12Percent + "% 0%, " + bottomFrame12Percent + "% 100%)";
                bottomFrame1.style.clipPath = style;
            }
            if (i == 2 && morePieces == false) {
                let style = "polygon(" + bottomFrame12Percent + "% 0%, " + oneMinusWidth + "% 0%, 100% 100%, " + bottomFrame12Percent + "% 100%)";
                bottomFrame2.style.clipPath = style;
            }
            if (i == 2 && morePieces == true) {
                let style = "polygon(" + bottomFrame12Percent + "% 0%, " + bottomFrame23Percent + "% 0%, " + bottomFrame23Percent + "% 100%, " + bottomFrame12Percent + "% 100%)";
                bottomFrame2.style.clipPath = style;
            }
            if (i == 3 && morePieces == false) {
                let style = "polygon(" + bottomFrame23Percent + "% 0%, " + oneMinusWidth + "% 0%, 100% 100%, " + bottomFrame23Percent + "% 100%)";
                bottomFrame3.style.clipPath = style;
            }
            if (i == 3 && morePieces == true) {
                let style = "polygon(" + bottomFrame23Percent + "% 0%, " + bottomFrame34Percent + "% 0%, " + bottomFrame34Percent + "% 100%, " + bottomFrame23Percent + "% 100%)";
                bottomFrame3.style.clipPath = style;
            }
            if (i == 4 && morePieces == false) {
                let style = "polygon(" + bottomFrame34Percent + "% 0%, " + oneMinusWidth + "% 0%, 100% 100%, " + bottomFrame34Percent + "% 100%)";
                bottomFrame4.style.clipPath = style;
            }
            if (i == 4 && morePieces == true) {
                let style = "polygon(" + bottomFrame34Percent + "% 0%, " + bottomFrame45Percent + "% 0%, " + bottomFrame45Percent + "% 100%, " + bottomFrame34Percent + "% 100%)";
                bottomFrame4.style.clipPath = style;
            }
            if (i == 5) {
                let style = "polygon(" + bottomFrame45Percent + "% 0%, " + oneMinusWidth + "% 0%, 100% 100%, " + bottomFrame45Percent + "% 100%)";
                bottomFrame5.style.clipPath = style;
            }
        }
    }
}

//Boundary above is the px of the button or boundary (of the frame) above the button we're moving
//Boundary below is the opposite
//Technically the top is 0 and the bottom of the boundary is 100% of pixels, just how UI is
function checkCollisionDetectionVertical(boundaryAbove, positionOfMovingButton, boundaryBelow, margin) {
    //Rescale numbers so the range of -.5*maxHeight to .5*maxHeight is now 0 to maxHeight
    boundaryAbove = boundaryAbove + (maxHeight / 2);
    positionOfMovingButton = positionOfMovingButton + (maxHeight / 2);
    boundaryBelow = boundaryBelow + (maxHeight / 2);

    //Check if positionOfMovingButton is within the margin of the top or bottom boundary, else resume as normal
    if (positionOfMovingButton - margin < boundaryAbove) {
        let a = boundaryAbove + margin - (maxHeight / 2);
        return boundaryAbove + margin - (maxHeight / 2);
    }
    else if (positionOfMovingButton + margin > boundaryBelow) {
        let a = boundaryBelow - margin - (maxHeight / 2);
        return a;
    }
    else {
        return positionOfMovingButton - (maxHeight / 2);
    }
}

function checkCollisionDetectionHorizontal(boundaryLeft, positionOfMovingButton, boundaryRight, margin) {
    //Rescale numbers so the range of -.5*maxWidth to .5*maxWidth is now 0 to maxWidth height
    boundaryLeft = boundaryLeft + (maxWidth / 2);
    positionOfMovingButton = positionOfMovingButton + (maxWidth / 2);
    boundaryRight = boundaryRight + (maxWidth / 2);

    //Check if positionOfMovingButton is within the margin of the top or bottom boundary, else resume as normal
    if (positionOfMovingButton - margin < boundaryLeft) {
        let a = boundaryLeft + margin - (maxWidth / 2);
        return boundaryLeft + margin - (maxWidth / 2);
    }
    else if (positionOfMovingButton + margin > boundaryRight) {
        let a = boundaryRight - margin - (maxWidth / 2);
        return a;
    }
    else {
        return positionOfMovingButton - (maxWidth / 2);
    }
}

function leftBtn1Drag(e) {
    leftBtn1Position = e.pageY - clickStart + leftBtn1Offset;
    //Check that boundaries and collision are all good
    leftBtn1Position = checkMovingButtonBounds(maxHeight, leftBtn1Position);
    //topBoundary is a stand-in for if there was a framepiece above it
    let topBoundary = -1 * (maxHeight / 2);
    let bottomBoundary = maxHeight / 2;
    leftBtn1.textContent = Math.round(leftFrame12Percent * 1) / 1 + "%";
    //if leftBtn2 is in use, then we're not checking against maxHeight, we're checking the
    if (!leftBtn2.classList.contains("doNotShow")) {
        leftBtn1Position = checkCollisionDetectionVertical(topBoundary, leftBtn1Position, leftBtn2Position, frameMarginHeight);
    }
    else {
        leftBtn1Position = checkCollisionDetectionVertical(topBoundary, leftBtn1Position, bottomBoundary, frameMarginHeight);
    }
    leftFrame12Percent = ((leftBtn1Position + (maxHeight / 2)) / maxHeight) * 100;
    leftBtn1.style.transform = 'translateY(' + leftBtn1Position + 'px)';
    currentButton = leftBtn1;
    updateLeftFrameClipPaths();
}
function leftBtn2Drag(e) {
    leftBtn2Position = e.pageY - clickStart + leftBtn2Offset;
    leftBtn2Position = checkMovingButtonBounds(maxHeight, leftBtn2Position);
    let bottomBoundary = maxHeight / 2;
    leftBtn2.textContent = Math.round(leftFrame23Percent * 1) / 1 + "%";
    if (!leftBtn3.classList.contains("doNotShow")) {
        leftBtn2Position = checkCollisionDetectionVertical(leftBtn1Position, leftBtn2Position, leftBtn3Position, frameMarginHeight);
    }
    else {
        leftBtn2Position = checkCollisionDetectionVertical(leftBtn1Position, leftBtn2Position, bottomBoundary, frameMarginHeight);
    }
    leftBtn2.style.transform = 'translateY(' + leftBtn2Position + 'px)';
    leftFrame23Percent = ((leftBtn2Position + (maxHeight / 2)) / maxHeight) * 100;
    currentButton = leftBtn2;
    updateLeftFrameClipPaths();
}
function leftBtn3Drag(e) {
    leftBtn3Position = e.pageY - clickStart + leftBtn3Offset;
    leftBtn3Position = checkMovingButtonBounds(maxHeight, leftBtn3Position);
    let bottomBoundary = maxHeight / 2;
    leftBtn3.textContent = Math.round(leftFrame34Percent * 1) / 1 + "%";
    if (!leftBtn4.classList.contains("doNotShow")) {
        leftBtn3Position = checkCollisionDetectionVertical(leftBtn2Position, leftBtn3Position, leftBtn4Position, frameMarginHeight);
    }
    else {
        leftBtn3Position = checkCollisionDetectionVertical(leftBtn2Position, leftBtn3Position, bottomBoundary, frameMarginHeight);
    }
    leftBtn3.style.transform = 'translateY(' + leftBtn3Position + 'px)';
    leftFrame34Percent = ((leftBtn3Position + (maxHeight / 2)) / maxHeight) * 100;
    currentButton = leftBtn3;
    updateLeftFrameClipPaths();
}
function leftBtn4Drag(e) {
    leftBtn4Position = e.pageY - clickStart + leftBtn4Offset;
    leftBtn4Position = checkMovingButtonBounds(maxHeight, leftBtn4Position);
    let bottomBoundary = maxHeight / 2;
    leftBtn4.textContent = Math.round(leftFrame45Percent * 1) / 1 + "%";
    leftBtn4Position = checkCollisionDetectionVertical(leftBtn3Position, leftBtn4Position, bottomBoundary, frameMarginHeight);
    leftBtn4.style.transform = 'translateY(' + leftBtn4Position + 'px)';
    leftFrame45Percent = ((leftBtn4Position + (maxHeight / 2)) / maxHeight) * 100;
    currentButton = leftBtn4;
    updateLeftFrameClipPaths();
}
function rightBtn1Drag(e) {
    rightBtn1Position = e.pageY - clickStart + rightBtn1Offset;
    rightBtn1Position = checkMovingButtonBounds(maxHeight, rightBtn1Position);
    //topBoundary is a stand-in for if there was a framepiece above it
    let topBoundary = -1 * (maxHeight / 2);
    let bottomBoundary = maxHeight / 2;
    rightBtn1.textContent = Math.round(rightFrame12Percent * 1) / 1 + "%";
    //if rightBtn2 is in use, then we're not checking against maxHeight, we're checking the
    if (!rightBtn2.classList.contains("doNotShow")) {
        rightBtn1Position = checkCollisionDetectionVertical(topBoundary, rightBtn1Position, rightBtn2Position, frameMarginHeight);
    }
    else {
        rightBtn1Position = checkCollisionDetectionVertical(topBoundary, rightBtn1Position, bottomBoundary, frameMarginHeight);
    }
    rightFrame12Percent = ((rightBtn1Position + (maxHeight / 2)) / maxHeight) * 100;
    rightBtn1.style.transform = 'translateY(' + rightBtn1Position + 'px)';
    currentButton = rightBtn1;
    updateRightFrameClipPaths();
}
function rightBtn2Drag(e) {
    rightBtn2Position = e.pageY - clickStart + rightBtn2Offset;
    rightBtn2Position = checkMovingButtonBounds(maxHeight, rightBtn2Position);
    let bottomBoundary = maxHeight / 2;
    rightBtn2.textContent = Math.round(rightFrame23Percent * 1) / 1 + "%";
    //if rightBtn3 is in use, then we're not checking against maxHeight, we're checking the
    if (!rightBtn3.classList.contains("doNotShow")) {
        rightBtn2Position = checkCollisionDetectionVertical(rightBtn1Position, rightBtn2Position, rightBtn3Position, frameMarginHeight);
    }
    else {
        rightBtn2Position = checkCollisionDetectionVertical(rightBtn1Position, rightBtn2Position, bottomBoundary, frameMarginHeight);
    }
    rightFrame23Percent = ((rightBtn2Position + (maxHeight / 2)) / maxHeight) * 100;
    rightBtn2.style.transform = 'translateY(' + rightBtn2Position + 'px)';
    currentButton = rightBtn2;
    updateRightFrameClipPaths();
}
function rightBtn3Drag(e) {
    rightBtn3Position = e.pageY - clickStart + rightBtn3Offset;
    rightBtn3Position = checkMovingButtonBounds(maxHeight, rightBtn3Position);
    let bottomBoundary = maxHeight / 2;
    rightBtn3.textContent = Math.round(rightFrame34Percent * 1) / 1 + "%";
    //if rightBtn4 is in use, then we're not checking against maxHeight, we're checking the
    if (!rightBtn4.classList.contains("doNotShow")) {
        rightBtn3Position = checkCollisionDetectionVertical(rightBtn2Position, rightBtn3Position, rightBtn4Position, frameMarginHeight);
    }
    else {
        rightBtn3Position = checkCollisionDetectionVertical(rightBtn2Position, rightBtn3Position, bottomBoundary, frameMarginHeight);
    }
    rightFrame34Percent = ((rightBtn3Position + (maxHeight / 2)) / maxHeight) * 100;
    rightBtn3.style.transform = 'translateY(' + rightBtn3Position + 'px)';
    currentButton = rightBtn3;
    updateRightFrameClipPaths();
}
function rightBtn4Drag(e) {
    rightBtn4Position = e.pageY - clickStart + rightBtn4Offset;
    rightBtn4Position = checkMovingButtonBounds(maxHeight, rightBtn4Position);
    let bottomBoundary = maxHeight / 2;
    rightBtn4.textContent = Math.round(rightFrame45Percent * 1) / 1 + "%";
    rightBtn4Position = checkCollisionDetectionVertical(rightBtn3Position, rightBtn4Position, bottomBoundary, frameMarginHeight);
    rightFrame45Percent = ((rightBtn4Position + (maxHeight / 2)) / maxHeight) * 100;
    rightBtn4.style.transform = 'translateY(' + rightBtn4Position + 'px)';
    currentButton = rightBtn4;
    updateRightFrameClipPaths();
}

function topBtn1Drag(e) {
    topBtn1Position = e.pageX - clickStart + topBtn1Offset;
    topBtn1Position = checkMovingButtonBounds(maxWidth, topBtn1Position);
    //leftBoundary is a stand-in for if there was a framepiece above it
    let leftBoundary = -1 * (maxWidth / 2);
    let rightBoundary = maxWidth / 2;
    topBtn1.textContent = Math.round(topFrame12Percent * 1) / 1 + "%";
    //if topBtn2 is in use, then we're not checking against maxWidth, we're checking the
    if (!topBtn2.classList.contains("doNotShow")) {
        topBtn1Position = checkCollisionDetectionHorizontal(leftBoundary, topBtn1Position, topBtn2Position, frameMarginWidth);
    }
    else {
        topBtn1Position = checkCollisionDetectionHorizontal(leftBoundary, topBtn1Position, rightBoundary, frameMarginWidth);
    }
    topFrame12Percent = ((topBtn1Position + (maxWidth / 2)) / maxWidth) * 100;
    topBtn1.style.transform = 'translateX(' + topBtn1Position + 'px)';
    currentButton = topBtn1;
    updateTopFrameClipPaths();
}
function topBtn2Drag(e) {
    topBtn2Position = e.pageX - clickStart + topBtn2Offset;
    topBtn2Position = checkMovingButtonBounds(maxWidth, topBtn2Position);
    let rightBoundary = maxWidth / 2;
    topBtn2.textContent = Math.round(topFrame23Percent * 1) / 1 + "%";
    //if topBtn3 is in use, then we're not checking against maxWidth, we're checking the
    if (!topBtn3.classList.contains("doNotShow")) {
        topBtn2Position = checkCollisionDetectionHorizontal(topBtn1Position, topBtn2Position, topBtn3Position, frameMarginWidth);
    }
    else {
        topBtn2Position = checkCollisionDetectionHorizontal(topBtn1Position, topBtn2Position, rightBoundary, frameMarginWidth);
    }
    topFrame23Percent = ((topBtn2Position + (maxWidth / 2)) / maxWidth) * 100;
    topBtn2.style.transform = 'translateX(' + topBtn2Position + 'px)';
    currentButton = topBtn2;
    updateTopFrameClipPaths();
}
function topBtn3Drag(e) {
    topBtn3Position = e.pageX - clickStart + topBtn3Offset;
    topBtn3Position = checkMovingButtonBounds(maxWidth, topBtn3Position);
    let rightBoundary = maxWidth / 2;
    topBtn3.textContent = Math.round(topFrame34Percent * 1) / 1 + "%";
    //if topBtn3 is in use, then we're not checking against maxWidth, we're checking the
    if (!topBtn4.classList.contains("doNotShow")) {
        topBtn3Position = checkCollisionDetectionHorizontal(topBtn2Position, topBtn3Position, topBtn4Position, frameMarginWidth);
    }
    else {
        topBtn3Position = checkCollisionDetectionHorizontal(topBtn2Position, topBtn3Position, rightBoundary, frameMarginWidth);
    }
    topFrame34Percent = ((topBtn3Position + (maxWidth / 2)) / maxWidth) * 100;
    topBtn3.style.transform = 'translateX(' + topBtn3Position + 'px)';
    currentButton = topBtn3;
    updateTopFrameClipPaths();
}
function topBtn4Drag(e) {
    topBtn4Position = e.pageX - clickStart + topBtn4Offset;
    topBtn4Position = checkMovingButtonBounds(maxWidth, topBtn4Position);
    let rightBoundary = maxWidth / 2;
    topBtn4.textContent = Math.round(topFrame45Percent * 1) / 1 + "%";
    topBtn4Position = checkCollisionDetectionHorizontal(topBtn3Position, topBtn4Position, rightBoundary, frameMarginWidth);
    topFrame45Percent = ((topBtn4Position + (maxWidth / 2)) / maxWidth) * 100;
    topBtn4.style.transform = 'translateX(' + topBtn4Position + 'px)';
    currentButton = topBtn4;
    updateTopFrameClipPaths();
}

function bottomBtn1Drag(e) {
    bottomBtn1Position = e.pageX - clickStart + bottomBtn1Offset;
    bottomBtn1Position = checkMovingButtonBounds(maxWidth, bottomBtn1Position);
    //leftBoundary is a stand-in for if there was a framepiece above it
    let leftBoundary = -1 * (maxWidth / 2);
    let rightBoundary = maxWidth / 2;
    bottomBtn1.textContent = Math.round(bottomFrame12Percent * 1) / 1 + "%";
    //if bottomBtn2 is in use, then we're not checking against maxWidth, we're checking the
    if (!bottomBtn2.classList.contains("doNotShow")) {
        bottomBtn1Position = checkCollisionDetectionHorizontal(leftBoundary, bottomBtn1Position, bottomBtn2Position, frameMarginWidth);
    }
    else {
        bottomBtn1Position = checkCollisionDetectionHorizontal(leftBoundary, bottomBtn1Position, rightBoundary, frameMarginWidth);
    }
    bottomFrame12Percent = ((bottomBtn1Position + (maxWidth / 2)) / maxWidth) * 100;
    bottomBtn1.style.transform = 'translateX(' + bottomBtn1Position + 'px)';
    currentButton = bottomBtn1;
    updateBottomFrameClipPaths();
}
function bottomBtn2Drag(e) {
    bottomBtn2Position = e.pageX - clickStart + bottomBtn2Offset;
    bottomBtn2Position = checkMovingButtonBounds(maxWidth, bottomBtn2Position);
    let rightBoundary = maxWidth / 2;
    bottomBtn2.textContent = Math.round(bottomFrame23Percent * 1) / 1 + "%";
    //if bottomBtn3 is in use, then we're not checking against maxWidth, we're checking the
    if (!bottomBtn3.classList.contains("doNotShow")) {
        bottomBtn2Position = checkCollisionDetectionHorizontal(bottomBtn1Position, bottomBtn2Position, bottomBtn3Position, frameMarginWidth);
    }
    else {
        bottomBtn2Position = checkCollisionDetectionHorizontal(bottomBtn1Position, bottomBtn2Position, rightBoundary, frameMarginWidth);
    }
    bottomFrame23Percent = ((bottomBtn2Position + (maxWidth / 2)) / maxWidth) * 100;
    bottomBtn2.style.transform = 'translateX(' + bottomBtn2Position + 'px)';
    currentButton = bottomBtn2;
    updateBottomFrameClipPaths();
}
function bottomBtn3Drag(e) {
    bottomBtn3Position = e.pageX - clickStart + bottomBtn3Offset;
    bottomBtn3Position = checkMovingButtonBounds(maxWidth, bottomBtn3Position);
    let rightBoundary = maxWidth / 2;
    bottomBtn3.textContent = Math.round(bottomFrame34Percent * 1) / 1 + "%";
    //if bottomBtn4 is in use, then we're not checking against maxWidth, we're checking the
    if (!bottomBtn4.classList.contains("doNotShow")) {
        bottomBtn3Position = checkCollisionDetectionHorizontal(bottomBtn2Position, bottomBtn3Position, bottomBtn4Position, frameMarginWidth);
    }
    else {
        bottomBtn3Position = checkCollisionDetectionHorizontal(bottomBtn2Position, bottomBtn3Position, rightBoundary, frameMarginWidth);
    }
    bottomFrame34Percent = ((bottomBtn3Position + (maxWidth / 2)) / maxWidth) * 100;
    bottomBtn3.style.transform = 'translateX(' + bottomBtn3Position + 'px)';
    currentButton = bottomBtn3;
    updateBottomFrameClipPaths();
}
function bottomBtn4Drag(e) {
    bottomBtn4Position = e.pageX - clickStart + bottomBtn4Offset;
    bottomBtn4Position = checkMovingButtonBounds(maxWidth, bottomBtn4Position);
    let rightBoundary = maxWidth / 2;
    bottomBtn4.textContent = Math.round(bottomFrame45Percent * 1) / 1 + "%";
    bottomBtn4Position = checkCollisionDetectionHorizontal(bottomBtn3Position, bottomBtn4Position, rightBoundary, frameMarginWidth);
    bottomFrame45Percent = ((bottomBtn4Position + (maxWidth / 2)) / maxWidth) * 100;
    bottomBtn4.style.transform = 'translateX(' + bottomBtn4Position + 'px)';
    currentButton = bottomBtn4;
    updateBottomFrameClipPaths();
}

//For moving buttons around the picture frame
leftBtn1.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageY;
    leftBtn1.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', leftBtn1Drag);
});
leftBtn2.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageY;
    leftBtn2.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', leftBtn2Drag);
});
leftBtn3.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageY;
    leftBtn3.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', leftBtn3Drag);
});
leftBtn4.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageY;
    leftBtn4.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', leftBtn4Drag);
});
rightBtn1.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageY;
    rightBtn1.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', rightBtn1Drag);
});
rightBtn2.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageY;
    rightBtn2.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', rightBtn2Drag);
});
rightBtn3.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageY;
    rightBtn3.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', rightBtn3Drag);
});
rightBtn4.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageY;
    rightBtn4.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', rightBtn4Drag);
});
topBtn1.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageX;
    topBtn1.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', topBtn1Drag);
});
topBtn2.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageX;
    topBtn2.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', topBtn2Drag);
});
topBtn3.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageX;
    topBtn3.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', topBtn3Drag);
});
topBtn4.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageX;
    topBtn4.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', topBtn4Drag);
});
bottomBtn1.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageX;
    bottomBtn1.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', bottomBtn1Drag);
});
bottomBtn2.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageX;
    bottomBtn2.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', bottomBtn2Drag);
});
bottomBtn3.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageX;
    bottomBtn3.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', bottomBtn3Drag);
});
bottomBtn4.addEventListener('mousedown', (e) => {
    isDragging = true;
    clickStart = e.pageX;
    bottomBtn4.style.cursor = 'grabbing';
    e.preventDefault();
    document.addEventListener('mousemove', bottomBtn4Drag);
});

thumbnailLeft1.addEventListener('mousedown', (e) => {
    let src = thumbnailLeft1.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailLeft1.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailLeft1Drag);
    }
});
thumbnailLeft2.addEventListener('mousedown', (e) => {
    let src = thumbnailLeft2.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailLeft2.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailLeft2Drag);
    }
});
thumbnailLeft3.addEventListener('mousedown', (e) => {
    let src = thumbnailLeft3.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailLeft3.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailLeft3Drag);
    }
});
thumbnailLeft4.addEventListener('mousedown', (e) => {
    let src = thumbnailLeft4.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailLeft4.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailLeft4Drag);
    }
});
thumbnailLeft5.addEventListener('mousedown', (e) => {
    let src = thumbnailLeft5.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailLeft5.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailLeft5Drag);
    }
});

thumbnailRight1.addEventListener('mousedown', (e) => {
    let src = thumbnailRight1.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailRight1.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailRight1Drag);
    }
});
thumbnailRight2.addEventListener('mousedown', (e) => {
    let src = thumbnailRight2.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailRight2.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailRight2Drag);
    }
});
thumbnailRight3.addEventListener('mousedown', (e) => {
    let src = thumbnailRight3.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailRight3.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailRight3Drag);
    }
});
thumbnailRight4.addEventListener('mousedown', (e) => {
    let src = thumbnailRight4.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailRight4.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailRight4Drag);
    }
});
thumbnailRight5.addEventListener('mousedown', (e) => {
    let src = thumbnailRight5.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailRight5.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailRight5Drag);
    }
});

thumbnailTop1.addEventListener('mousedown', (e) => {
    let src = thumbnailTop1.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailTop1.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailTop1Drag);
    }
});
thumbnailTop2.addEventListener('mousedown', (e) => {
    let src = thumbnailTop2.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailTop2.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailTop2Drag);
    }
});
thumbnailTop3.addEventListener('mousedown', (e) => {
    let src = thumbnailTop3.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailTop3.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailTop3Drag);
    }
});
thumbnailTop4.addEventListener('mousedown', (e) => {
    let src = thumbnailTop4.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailTop4.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailTop4Drag);
    }
});
thumbnailTop5.addEventListener('mousedown', (e) => {
    let src = thumbnailTop5.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailTop5.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailTop5Drag);
    }
});

thumbnailBottom1.addEventListener('mousedown', (e) => {
    let src = thumbnailBottom1.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailBottom1.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailBottom1Drag);
    }
});
thumbnailBottom2.addEventListener('mousedown', (e) => {
    let src = thumbnailBottom2.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailBottom2.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailBottom2Drag);
    }
});
thumbnailBottom3.addEventListener('mousedown', (e) => {
    let src = thumbnailBottom3.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailBottom3.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailBottom3Drag);
    }
});
thumbnailBottom4.addEventListener('mousedown', (e) => {
    let src = thumbnailBottom4.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailBottom4.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailBottom4Drag);
    }
});
thumbnailBottom5.addEventListener('mousedown', (e) => {
    let src = thumbnailBottom5.src.split('/');
    if (src[src.length - 1] != "blank.jpg") {
        isDragging = true;
        clickStart = e.pageY;
        thumbnailBottom5.style.cursor = 'grabbing';
        e.preventDefault();
        document.addEventListener('mousemove', thumbnailBottom5Drag);
    }
});

//For moving thumbnails to swap wood grains
function thumbnailLeft1Drag(e) {
    thumbnailLeft1Position = e.pageY - clickStart;
    thumbnailLeft1Position = checkMovingButtonBounds(maxHeight, thumbnailLeft1Position);
    thumbnailLeft1.style.transform = 'translateY(' + thumbnailLeft1Position + 'px)';
    currentButton = thumbnailLeft1;
}
function thumbnailLeft2Drag(e) {
    thumbnailLeft2Position = e.pageY - clickStart;
    thumbnailLeft2Position = checkMovingButtonBounds(maxHeight, thumbnailLeft2Position);
    thumbnailLeft2.style.transform = 'translateY(' + thumbnailLeft2Position + 'px)';
    currentButton = thumbnailLeft2;
}
function thumbnailLeft3Drag(e) {
    thumbnailLeft3Position = e.pageY - clickStart;
    thumbnailLeft3Position = checkMovingButtonBounds(maxHeight, thumbnailLeft3Position);
    thumbnailLeft3.style.transform = 'translateY(' + thumbnailLeft3Position + 'px)';
    currentButton = thumbnailLeft3;
}
function thumbnailLeft4Drag(e) {
    thumbnailLeft4Position = e.pageY - clickStart;
    thumbnailLeft4Position = checkMovingButtonBounds(maxHeight, thumbnailLeft4Position);
    thumbnailLeft4.style.transform = 'translateY(' + thumbnailLeft4Position + 'px)';
    currentButton = thumbnailLeft4;
}
function thumbnailLeft5Drag(e) {
    thumbnailLeft5Position = e.pageY - clickStart;
    thumbnailLeft5Position = checkMovingButtonBounds(maxHeight, thumbnailLeft5Position);
    thumbnailLeft5.style.transform = 'translateY(' + thumbnailLeft5Position + 'px)';
    currentButton = thumbnailLeft5;
}

function thumbnailRight1Drag(e) {
    thumbnailRight1Position = e.pageY - clickStart;
    thumbnailRight1Position = checkMovingButtonBounds(maxHeight, thumbnailRight1Position);
    thumbnailRight1.style.transform = 'translateY(' + thumbnailRight1Position + 'px)';
    currentButton = thumbnailRight1;
}
function thumbnailRight2Drag(e) {
    thumbnailRight2Position = e.pageY - clickStart;
    thumbnailRight2Position = checkMovingButtonBounds(maxHeight, thumbnailRight2Position);
    thumbnailRight2.style.transform = 'translateY(' + thumbnailRight2Position + 'px)';
    currentButton = thumbnailRight2;
}
function thumbnailRight3Drag(e) {
    thumbnailRight3Position = e.pageY - clickStart;
    thumbnailRight3Position = checkMovingButtonBounds(maxHeight, thumbnailRight3Position);
    thumbnailRight3.style.transform = 'translateY(' + thumbnailRight3Position + 'px)';
    currentButton = thumbnailRight3;
}
function thumbnailRight4Drag(e) {
    thumbnailRight4Position = e.pageY - clickStart;
    thumbnailRight4Position = checkMovingButtonBounds(maxHeight, thumbnailRight4Position);
    thumbnailRight4.style.transform = 'translateY(' + thumbnailRight4Position + 'px)';
    currentButton = thumbnailRight4;
}
function thumbnailRight5Drag(e) {
    thumbnailRight5Position = e.pageY - clickStart;
    thumbnailRight5Position = checkMovingButtonBounds(maxHeight, thumbnailRight5Position);
    thumbnailRight5.style.transform = 'translateY(' + thumbnailRight5Position + 'px)';
    currentButton = thumbnailRight5;
}

function thumbnailTop1Drag(e) {
    thumbnailTop1Position = e.pageY - clickStart;
    thumbnailTop1Position = checkMovingButtonBounds(maxHeight, thumbnailTop1Position);
    thumbnailTop1.style.transform = 'translateY(' + thumbnailTop1Position + 'px)';
    currentButton = thumbnailTop1;
}
function thumbnailTop2Drag(e) {
    thumbnailTop2Position = e.pageY - clickStart;
    thumbnailTop2Position = checkMovingButtonBounds(maxHeight, thumbnailTop2Position);
    thumbnailTop2.style.transform = 'translateY(' + thumbnailTop2Position + 'px)';
    currentButton = thumbnailTop2;
}
function thumbnailTop3Drag(e) {
    thumbnailTop3Position = e.pageY - clickStart;
    thumbnailTop3Position = checkMovingButtonBounds(maxHeight, thumbnailTop3Position);
    thumbnailTop3.style.transform = 'translateY(' + thumbnailTop3Position + 'px)';
    currentButton = thumbnailTop3;
}
function thumbnailTop4Drag(e) {
    thumbnailTop4Position = e.pageY - clickStart;
    thumbnailTop4Position = checkMovingButtonBounds(maxHeight, thumbnailTop4Position);
    thumbnailTop4.style.transform = 'translateY(' + thumbnailTop4Position + 'px)';
    currentButton = thumbnailTop4;
}
function thumbnailTop5Drag(e) {
    thumbnailTop5Position = e.pageY - clickStart;
    thumbnailTop5Position = checkMovingButtonBounds(maxHeight, thumbnailTop5Position);
    thumbnailTop5.style.transform = 'translateY(' + thumbnailTop5Position + 'px)';
    currentButton = thumbnailTop5;
}

function thumbnailBottom1Drag(e) {
    thumbnailBottom1Position = e.pageY - clickStart;
    thumbnailBottom1Position = checkMovingButtonBounds(maxHeight, thumbnailBottom1Position);
    thumbnailBottom1.style.transform = 'translateY(' + thumbnailBottom1Position + 'px)';
    currentButton = thumbnailBottom1;
}
function thumbnailBottom2Drag(e) {
    thumbnailBottom2Position = e.pageY - clickStart;
    thumbnailBottom2Position = checkMovingButtonBounds(maxHeight, thumbnailBottom2Position);
    thumbnailBottom2.style.transform = 'translateY(' + thumbnailBottom2Position + 'px)';
    currentButton = thumbnailBottom2;
}
function thumbnailBottom3Drag(e) {
    thumbnailBottom3Position = e.pageY - clickStart;
    thumbnailBottom3Position = checkMovingButtonBounds(maxHeight, thumbnailBottom3Position);
    thumbnailBottom3.style.transform = 'translateY(' + thumbnailBottom3Position + 'px)';
    currentButton = thumbnailBottom3;
}
function thumbnailBottom4Drag(e) {
    thumbnailBottom4Position = e.pageY - clickStart;
    thumbnailBottom4Position = checkMovingButtonBounds(maxHeight, thumbnailBottom4Position);
    thumbnailBottom4.style.transform = 'translateY(' + thumbnailBottom4Position + 'px)';
    currentButton = thumbnailBottom4;
}
function thumbnailBottom5Drag(e) {
    thumbnailBottom5Position = e.pageY - clickStart;
    thumbnailBottom5Position = checkMovingButtonBounds(maxHeight, thumbnailBottom5Position);
    thumbnailBottom5.style.transform = 'translateY(' + thumbnailBottom5Position + 'px)';
    currentButton = thumbnailBottom5;
}

/* mouseup code is for sliding buttons */
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        currentButton.style.cursor = 'grab';
        switchCases();
    }
    updateCost();
});

function switchCases(e) {
    switch (currentButton.id) {
        case "leftBtn1":
            document.removeEventListener('mousemove', leftBtn1Drag);
            leftBtn1Offset = leftBtn1Position;
            leftBtn1.textContent = '>';
            break;
        case "leftBtn2":
            document.removeEventListener('mousemove', leftBtn2Drag);
            leftBtn2Offset = leftBtn2Position;
            leftBtn2.textContent = '>';
            break;
        case "leftBtn3":
            document.removeEventListener('mousemove', leftBtn3Drag);
            leftBtn3Offset = leftBtn3Position;
            leftBtn3.textContent = '>';
            break;
        case "leftBtn4":
            document.removeEventListener('mousemove', leftBtn4Drag);
            leftBtn4Offset = leftBtn4Position;
            leftBtn4.textContent = '>';
            break;
        case "rightBtn1":
            document.removeEventListener('mousemove', rightBtn1Drag);
            rightBtn1Offset = rightBtn1Position;
            rightBtn1.textContent = '<';
            break;
        case "rightBtn2":
            document.removeEventListener('mousemove', rightBtn2Drag);
            rightBtn2Offset = rightBtn2Position;
            rightBtn2.textContent = '<';
            break;
        case "rightBtn3":
            document.removeEventListener('mousemove', rightBtn3Drag);
            rightBtn3Offset = rightBtn3Position;
            rightBtn3.textContent = '<';
            break;
        case "rightBtn4":
            document.removeEventListener('mousemove', rightBtn4Drag);
            rightBtn4Offset = rightBtn4Position;
            rightBtn4.textContent = '<';
            break;
        case "topBtn1":
            document.removeEventListener('mousemove', topBtn1Drag);
            topBtn1Offset = topBtn1Position;
            topBtn1.textContent = 'V';
            break;
        case "topBtn2":
            document.removeEventListener('mousemove', topBtn2Drag);
            topBtn2Offset = topBtn2Position;
            topBtn2.textContent = 'V';
            break;
        case "topBtn3":
            document.removeEventListener('mousemove', topBtn3Drag);
            topBtn3Offset = topBtn3Position;
            topBtn3.textContent = 'V';
            break;
        case "topBtn4":
            document.removeEventListener('mousemove', topBtn4Drag);
            topBtn4Offset = topBtn4Position;
            topBtn4.textContent = 'V';
            break;
        case "bottomBtn1":
            document.removeEventListener('mousemove', bottomBtn1Drag);
            bottomBtn1Offset = bottomBtn1Position;
            bottomBtn1.textContent = 'Λ';
            break;
        case "bottomBtn2":
            document.removeEventListener('mousemove', bottomBtn2Drag);
            bottomBtn2Offset = bottomBtn2Position;
            bottomBtn2.textContent = 'Λ';
            break;
        case "bottomBtn3":
            document.removeEventListener('mousemove', bottomBtn3Drag);
            bottomBtn3Offset = bottomBtn3Position;
            bottomBtn3.textContent = 'Λ';
            break;
        case "bottomBtn4":
            document.removeEventListener('mousemove', bottomBtn4Drag);
            bottomBtn4Offset = bottomBtn4Position;
            bottomBtn4.textContent = 'Λ';
            break;
        case "thumbnailLeft1":
            document.removeEventListener('mousemove', thumbnailLeft1Drag);
            checkThumbnailSwap(thumbnailLeft1, 1, thumbnailLeft1Position, "Left", leftFrame1);
            thumbnailLeft1.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailLeft2":
            document.removeEventListener('mousemove', thumbnailLeft2Drag);
            checkThumbnailSwap(thumbnailLeft2, 2, thumbnailLeft2Position, "Left", leftFrame2);
            thumbnailLeft2.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailLeft3":
            document.removeEventListener('mousemove', thumbnailLeft3Drag);
            checkThumbnailSwap(thumbnailLeft3, 3, thumbnailLeft3Position, "Left", leftFrame3);
            thumbnailLeft3.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailLeft4":
            document.removeEventListener('mousemove', thumbnailLeft4Drag);
            checkThumbnailSwap(thumbnailLeft4, 4, thumbnailLeft4Position, "Left", leftFrame4);
            thumbnailLeft4.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailLeft5":
            document.removeEventListener('mousemove', thumbnailLeft5Drag);
            checkThumbnailSwap(thumbnailLeft5, 5, thumbnailLeft5Position, "Left", leftFrame5);
            thumbnailLeft5.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailRight1":
            document.removeEventListener('mousemove', thumbnailRight1Drag);
            checkThumbnailSwap(thumbnailRight1, 1, thumbnailRight1Position, "Right", rightFrame1);
            thumbnailRight1.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailRight2":
            document.removeEventListener('mousemove', thumbnailRight2Drag);
            checkThumbnailSwap(thumbnailRight2, 2, thumbnailRight2Position, "Right", rightFrame2);
            thumbnailRight2.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailRight3":
            document.removeEventListener('mousemove', thumbnailRight3Drag);
            checkThumbnailSwap(thumbnailRight3, 3, thumbnailRight3Position, "Right", rightFrame3);
            thumbnailRight3.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailRight4":
            document.removeEventListener('mousemove', thumbnailRight4Drag);
            checkThumbnailSwap(thumbnailRight4, 4, thumbnailRight4Position, "Right", rightFrame4);
            thumbnailRight4.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailRight5":
            document.removeEventListener('mousemove', thumbnailRight5Drag);
            checkThumbnailSwap(thumbnailRight5, 5, thumbnailRight5Position, "Right", rightFrame5);
            thumbnailRight5.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailTop1":
            document.removeEventListener('mousemove', thumbnailTop1Drag);
            checkThumbnailSwap(thumbnailTop1, 1, thumbnailTop1Position, "Top", topFrame1);
            thumbnailTop1.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailTop2":
            document.removeEventListener('mousemove', thumbnailTop2Drag);
            checkThumbnailSwap(thumbnailTop2, 2, thumbnailTop2Position, "Top", topFrame2);
            thumbnailTop2.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailTop3":
            document.removeEventListener('mousemove', thumbnailTop3Drag);
            checkThumbnailSwap(thumbnailTop3, 3, thumbnailTop3Position, "Top", topFrame3);
            thumbnailTop3.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailTop4":
            document.removeEventListener('mousemove', thumbnailTop4Drag);
            checkThumbnailSwap(thumbnailTop4, 4, thumbnailTop4Position, "Top", topFrame4);
            thumbnailTop4.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailTop5":
            document.removeEventListener('mousemove', thumbnailTop5Drag);
            checkThumbnailSwap(thumbnailTop5, 5, thumbnailTop5Position, "Top", topFrame5);
            thumbnailTop5.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailBottom1":
            document.removeEventListener('mousemove', thumbnailBottom1Drag);
            checkThumbnailSwap(thumbnailBottom1, 1, thumbnailBottom1Position, "Bottom", bottomFrame1);
            thumbnailBottom1.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailBottom2":
            document.removeEventListener('mousemove', thumbnailBottom2Drag);
            checkThumbnailSwap(thumbnailBottom2, 2, thumbnailBottom2Position, "Bottom", bottomFrame2);
            thumbnailBottom2.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailBottom3":
            document.removeEventListener('mousemove', thumbnailBottom3Drag);
            checkThumbnailSwap(thumbnailBottom3, 3, thumbnailBottom3Position, "Bottom", bottomFrame3);
            thumbnailBottom3.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailBottom4":
            document.removeEventListener('mousemove', thumbnailBottom4Drag);
            checkThumbnailSwap(thumbnailBottom4, 4, thumbnailBottom4Position, "Bottom", bottomFrame4);
            thumbnailBottom4.style.transform = 'translateY(' + 0 + 'px)';
            break;
        case "thumbnailBottom5":
            document.removeEventListener('mousemove', thumbnailBottom5Drag);
            checkThumbnailSwap(thumbnailBottom5, 5, thumbnailBottom5Position, "Bottom", bottomFrame5);
            thumbnailBottom5.style.transform = 'translateY(' + 0 + 'px)';
            break;
    }
}


function checkThumbnailSwap(currentThumbnail, position, distanceMoved, side, currentThumbnailFramePiece) {
    if (distanceMoved > thumbnailHeight || distanceMoved < (-1 * thumbnailHeight)) {
        //if positionsMoved = 0, there is no move
        //if equals 1, the thumbnail should be swapped with the one below it, if -1 then the one above it
        let newPosition = 0;
        let swap = false;
        let negativeMove = false;
        if (distanceMoved < 0) {
            negativeMove = true;
            distanceMoved = distanceMoved * -1;
        }
        //Find how many gap distances the thumbnail has moved (gap goes from top of element to top of the next)
        let positionsMoved = 0;
        let cont = true;
        while (distanceMoved > 0 && cont == true) {
            distanceMoved = distanceMoved - thumbnailGap;
            positionsMoved = positionsMoved + 1;
            //within margin of stopping
            if (distanceMoved < (thumbnailHeight / 4)) {
                cont = false;
            }
        }
        //if the remaining distance is within a certain amount of thumbnail height, there should be a swap
        if (distanceMoved < (thumbnailHeight / 4) || distanceMoved > (-1 * (thumbnailHeight / 4))) {
            swap = true;
        }

        let notSwappingWithBlank = true;
        if (swap) {
            if (negativeMove) {
                newPosition = position - positionsMoved;
            }
            else {
                //If swapping with a piece farther down the list, check it's not blank
                //The opposite check to see if the initial thumbnail is blank is done in thumbnail{framePiece}Drag function
                newPosition = position + positionsMoved;
                if (side == "Left") {
                    if (newPosition > numLeftVisiblePieces) {
                        notSwappingWithBlank = false;
                    }
                }
                if (side == "Right") {
                    if (newPosition > numRightVisiblePieces) {
                        notSwappingWithBlank = false;
                    }
                }
                if (side == "Top") {
                    if (newPosition > numTopVisiblePieces) {
                        notSwappingWithBlank = false;
                    }
                }
                if (side == "Bottom") {
                    if (newPosition > numBottomVisiblePieces) {
                        notSwappingWithBlank = false;
                    }
                }
            }
            if (notSwappingWithBlank) {
                if (side == "Left") {
                    switch (newPosition) {
                        case 1:
                            swapGrains(currentThumbnail, thumbnailLeft1, currentThumbnailFramePiece, leftFrame1, "V");
                            break;
                        case 2:
                            swapGrains(currentThumbnail, thumbnailLeft2, currentThumbnailFramePiece, leftFrame2, "V");
                            break;
                        case 3:
                            swapGrains(currentThumbnail, thumbnailLeft3, currentThumbnailFramePiece, leftFrame3, "V");
                            break;
                        case 4:
                            swapGrains(currentThumbnail, thumbnailLeft4, currentThumbnailFramePiece, leftFrame4, "V");
                            break;
                        case 5:
                            swapGrains(currentThumbnail, thumbnailLeft5, currentThumbnailFramePiece, leftFrame5, "V");
                            break;
                    }
                }
                else if (side == "Right") {
                    switch (newPosition) {
                        case 1:
                            swapGrains(currentThumbnail, thumbnailRight1, currentThumbnailFramePiece, rightFrame1, "V");
                            break;
                        case 2:
                            swapGrains(currentThumbnail, thumbnailRight2, currentThumbnailFramePiece, rightFrame2, "V");
                            break;
                        case 3:
                            swapGrains(currentThumbnail, thumbnailRight3, currentThumbnailFramePiece, rightFrame3, "V");
                            break;
                        case 4:
                            swapGrains(currentThumbnail, thumbnailRight4, currentThumbnailFramePiece, rightFrame4, "V");
                            break;
                        case 5:
                            swapGrains(currentThumbnail, thumbnailRight5, currentThumbnailFramePiece, rightFrame5, "V");
                            break;
                    }
                }
                else if (side == "Top") {
                    switch (newPosition) {
                        case 1:
                            swapGrains(currentThumbnail, thumbnailTop1, currentThumbnailFramePiece, topFrame1, "H");
                            break;
                        case 2:
                            swapGrains(currentThumbnail, thumbnailTop2, currentThumbnailFramePiece, topFrame2, "H");
                            break;
                        case 3:
                            swapGrains(currentThumbnail, thumbnailTop3, currentThumbnailFramePiece, topFrame3, "H");
                            break;
                        case 4:
                            swapGrains(currentThumbnail, thumbnailTop4, currentThumbnailFramePiece, topFrame4, "H");
                            break;
                        case 5:
                            swapGrains(currentThumbnail, thumbnailTop5, currentThumbnailFramePiece, topFrame5, "H");
                            break;
                    }
                }
                else {
                    switch (newPosition) {
                        case 1:
                            swapGrains(currentThumbnail, thumbnailBottom1, currentThumbnailFramePiece, bottomFrame1, "H");
                            break;
                        case 2:
                            swapGrains(currentThumbnail, thumbnailBottom2, currentThumbnailFramePiece, bottomFrame2, "H");
                            break;
                        case 3:
                            swapGrains(currentThumbnail, thumbnailBottom3, currentThumbnailFramePiece, bottomFrame3, "H");
                            break;
                        case 4:
                            swapGrains(currentThumbnail, thumbnailBottom4, currentThumbnailFramePiece, bottomFrame4, "H");
                            break;
                        case 5:
                            swapGrains(currentThumbnail, thumbnailBottom5, currentThumbnailFramePiece, bottomFrame5, "H");
                            break;
                    }
                }
            }
        }   
    }
}

function swapGrains(currentThumbnail, otherThumbnail, currentThumbnailFramePiece, otherThumbnailFramePiece, orientation) {
    //Swap thumbnail grains
    let currentWoodGrain = currentThumbnail.src;
    let otherWoodGrain = otherThumbnail.src;
    currentThumbnail.src = otherWoodGrain;
    otherThumbnail.src = currentWoodGrain;
    //Swap the frame pieces that each thumbnail represent
    let currentFrameWoodGrain = getGrainType(window.getComputedStyle(currentThumbnailFramePiece).backgroundImage);
    let otherFrameWoodGrain = getGrainType(window.getComputedStyle(otherThumbnailFramePiece).backgroundImage);
    currentThumbnailFramePiece.style.backgroundImage = "url('/images/" + otherFrameWoodGrain + orientation + ".jpg')";
    otherThumbnailFramePiece.style.backgroundImage = "url('/images/" + currentFrameWoodGrain + orientation + ".jpg')";
}

//Buttons to show/not show pieces of frame
function toggleDropDownLeft1() {
    document.getElementById("dropDownLeft1").classList.toggle("doNotShow");
}
function toggleDropDownLeft2() {
    document.getElementById("dropDownLeft2").classList.toggle("doNotShow");
}
function toggleDropDownLeft3() {
    document.getElementById("dropDownLeft3").classList.toggle("doNotShow");
}
function toggleDropDownLeft4() {
    document.getElementById("dropDownLeft4").classList.toggle("doNotShow");
}
function toggleDropDownLeft5() {
    document.getElementById("dropDownLeft5").classList.toggle("doNotShow");
}

function toggleDropDownRight1() {
    document.getElementById("dropDownRight1").classList.toggle("doNotShow");
}
function toggleDropDownRight2() {
    document.getElementById("dropDownRight2").classList.toggle("doNotShow");
}
function toggleDropDownRight3() {
    document.getElementById("dropDownRight3").classList.toggle("doNotShow");
}
function toggleDropDownRight4() {
    document.getElementById("dropDownRight4").classList.toggle("doNotShow");
}
function toggleDropDownRight5() {
    document.getElementById("dropDownRight5").classList.toggle("doNotShow");
}

function toggleDropDownTop1() {
    document.getElementById("dropDownTop1").classList.toggle("doNotShow");
}
function toggleDropDownTop2() {
    document.getElementById("dropDownTop2").classList.toggle("doNotShow");
}
function toggleDropDownTop3() {
    document.getElementById("dropDownTop3").classList.toggle("doNotShow");
}
function toggleDropDownTop4() {
    document.getElementById("dropDownTop4").classList.toggle("doNotShow");
}
function toggleDropDownTop5() {
    document.getElementById("dropDownTop5").classList.toggle("doNotShow");
}

function toggleDropDownBottom1() {
    document.getElementById("dropDownBottom1").classList.toggle("doNotShow");
}
function toggleDropDownBottom2() {
    document.getElementById("dropDownBottom2").classList.toggle("doNotShow");
}
function toggleDropDownBottom3() {
    document.getElementById("dropDownBottom3").classList.toggle("doNotShow");
}
function toggleDropDownBottom4() {
    document.getElementById("dropDownBottom4").classList.toggle("doNotShow");
}
function toggleDropDownBottom5() {
    document.getElementById("dropDownBottom5").classList.toggle("doNotShow");
}

window.onclick = function (event) {
    //Code for making dropdowns disappear when a click happens outside of the dropdown
    if (!event.target.matches('.dropDownButton')) {
        var dropdowns = document.getElementsByClassName("dropDownContent");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (!openDropdown.classList.contains('doNotShow')) {
                openDropdown.classList.add('doNotShow');
            }
        }
    }
}

//This is called from dropdowns on click
function changeThumbnail(info) {
    let arr = info.split(",");
    let wood = arr[0].toString();
    wood = wood.split('.')[0];
    let position = arr[1];
    let idString = "thumbnail" + position;
    let srcString = "";
    let thumbnailString = "";
    //if B or T is the first char (meaning the position is Bottom or Top), use a horizontal wood image
    if (position[0] == 'B' || position[0] == 'T') {
        srcString = "/images/" + wood + "H.jpg";
        thumbnailString = "/thumbnails/" + wood + ".jpg";

    }
    else {
        srcString = "/images/" + wood + "V.jpg";
        thumbnailString = "/thumbnails/" + wood + ".jpg";
    }
    document.getElementById(idString).src = thumbnailString;
    let frameSide = document.getElementById(position);
    frameSide.style.backgroundImage = "url('" + srcString + "')";
}

//This is called from adding or removing buttons
//It's purpose is to find a grain that is not being used, then return that grain type
function changeThumbnailAndFrameImage(arrOfWoods) {
    //Could get rid of hard coding by retrieving dropdown element with grain list
    let grainTypes = ["brazilian-cherry", "hard-maple", "olive", "padauk", "purpleheart", "sapele", "soft-maple", "walnut", "white-oak"];
    for (let grain of grainTypes) {
        if (!arrOfWoods.includes(grain)) {
            return grain;
        }
    }
    return "blank";
}

function changeCornerSupportThumbnail(wood) {
    thumbnailString = "/thumbnails/" + wood;
    let thumbnail = document.getElementById("cornerSupportThumbnail");
    thumbnail.src = thumbnailString;
}

function useBrickBackground() {
    let brickButton = document.getElementById("useBrickBackground");
    let e = document.getElementsByClassName("editorItem")[0];
    let brickBackgroundImage = window.getComputedStyle(e).backgroundImage;
    if (brickBackgroundImage == "none") {
        e.classList.remove("doNotShowBackgroundImage");
        e.classList.add("showBackgroundBrick");
    }
    else {
        e.classList.add("doNotShowBackgroundImage");
        e.classList.remove("showBackgroundBrick");

    }
}

function colorChange() {
    let backgroundColor = document.getElementById("backgroundColor");
    let selectedColor = backgroundColor.value;
    let e = document.getElementsByClassName("editorItem")[0];
    //Check if a background image is present first
    e.classList.add("doNotShowBackgroundImage");
    e.classList.remove("showBackgroundBrick");
    e.style.backgroundColor = selectedColor;
}

function dimButtons() {
    let slidingButtons = document.getElementsByClassName("sliderButton");
    let dimmer = document.getElementById("dimButtonsLabel");
    for (let button of slidingButtons) {
        button.classList.toggle("toggleDimmingButtons");
    }
    if (dimmer.textContent == 'Dim buttons') {
        dimmer.textContent = 'Un-dim buttons';
    }
    else {
        dimmer.textContent = 'Dim buttons';
    }
}

function changeWallZoom() {
    let editorItem = document.getElementsByClassName("editorItem")[0];
    let zoomAmount = document.getElementById("userWallZoom").value;
    editorItem.style.backgroundSize = zoomAmount + "%";
    
}

function clearLastPopup() {
    let editorItems = document.getElementsByClassName("editorItem");
    for (let item of editorItems) {
        item.classList.remove("doNotShow");
    }
    let editItems = document.getElementsByClassName("editItem");
    for (let item of editItems) {
        item.classList.remove("doNotShow");
    }
    let settingsItem = document.getElementById("settingsItem");
    settingsItem.classList.add("settingsGridTrue");

    //Last popup should be this one, so can use class
    let popup = document.getElementsByClassName("popups")[0];
    popup.classList.add("doNotShow");

    let popupEditorItem = document.getElementById("popupEditorItem");
    popupEditorItem.classList.add("doNotShow");
    updateAR();
}

function clearPopup2() {
    let popup2 = document.getElementById("popup2");
    popup2.classList.add("doNotShow");
    let popupImageChosen = document.getElementById("popupImageChosen");
    let popupImageChosenDuplicate = document.getElementById("popupImageChosenDuplicate");
    popupImageChosenDuplicate.src = popupImageChosen.src;
    pic.src = popupImageChosen.src;
    updateHeightAndWidthAndSaveDataPopup();
    //Below is called onchange, not onclick, so if user picks preprepared image then below won't fire
    updatePopupPPI();
}

function updateHeightAndWidthAndSaveDataPopup() {
    let popupImageChosenDuplicate = document.getElementById("popupImageChosenDuplicate");
    popupImageChosenDuplicate.onload = () => {
        popupUploadImageHeightItem.textContent = popupImageChosenDuplicate.naturalHeight;
        popupUploadImageHeight = popupImageChosenDuplicate.naturalHeight;
        popupUploadImageWidthItem.textContent = popupImageChosenDuplicate.naturalWidth;
        popupUploadImageWidth = popupImageChosenDuplicate.naturalWidth;
        let ratio = popupImageChosenDuplicate.naturalWidth / popupImageChosenDuplicate.naturalHeight;
        popupUploadImageRatioItem.textContent = ratio.toFixed(3);
    };
}

function updatePopupPPI() {
    pictureWidthRealLife = popupUploadInchWidthItem.value;
    pictureHeightRealLife = popupUploadInchHeightItem.value;
    if (pictureWidthRealLife != 0 && pictureHeightRealLife != 0) {
        popupUploadPPIItem.textContent = (popupUploadImageHeight * popupUploadImageWidth) / (pictureWidthRealLife * pictureHeightRealLife);
    }
    //Keep track of variables that will be saved
    heightToSave.value = pictureHeightRealLife;
    widthToSave.value = pictureWidthRealLife;
    updateAR();
    updateLeftFrameClipPaths();
    updateRightFrameClipPaths();
    updateTopFrameClipPaths();
    updateBottomFrameClipPaths();

    //Below takes away the initial overflow hidden css styling, so that loading pics doesn't look as goofy immediately.
    pic.classList.remove("loadPicture");
}

function getFrameData() {
    let frameString = "";
    let moreLeftPieces = true;
    let moreRightPieces = true;
    let moreTopPieces = true;
    let moreBottomPieces = true;
    roundPercents();
    frameString += numLeftVisiblePieces + " ";
    for (let left = 1; left <= numLeftVisiblePieces; left++) {
        if (left == numLeftVisiblePieces) {
            moreLeftPieces = false;
        }
        switch (left) {
            case 1:
                //using thumbnail.src because it requires less work than getting the background src of related frame piece
                frameString += getGrainTypeSrc(thumbnailLeft1.src) + " ";
                if (moreLeftPieces) {
                    frameString += leftFrame12Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 2:
                frameString += getGrainTypeSrc(thumbnailLeft2.src) + " ";
                if (moreLeftPieces) {
                    frameString += leftFrame23Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 3:
                frameString += getGrainTypeSrc(thumbnailLeft3.src) + " ";
                if (moreLeftPieces) {
                    frameString += leftFrame34Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 4:
                frameString += getGrainTypeSrc(thumbnailLeft4.src) + " ";
                if (moreLeftPieces) {
                    frameString += leftFrame45Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 5:
                frameString += getGrainTypeSrc(thumbnailLeft5.src) + " ";
                frameString += "100";
                break;
        }
    }
    frameString += "," + numRightVisiblePieces + " ";
    for (let right = 1; right <= numRightVisiblePieces; right++) {
        if (right == numRightVisiblePieces) {
            moreRightPieces = false;
        }
        switch (right) {
            case 1:
                //using thumbnail.src because it requires less work than getting the background src of related frame piece
                frameString += getGrainTypeSrc(thumbnailRight1.src) + " ";
                if (moreRightPieces) {
                    frameString += rightFrame12Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 2:
                frameString += getGrainTypeSrc(thumbnailRight2.src) + " ";
                if (moreRightPieces) {
                    frameString += rightFrame23Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 3:
                frameString += getGrainTypeSrc(thumbnailRight3.src) + " ";
                if (moreRightPieces) {
                    frameString += rightFrame34Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 4:
                frameString += getGrainTypeSrc(thumbnailRight4.src) + " ";
                if (moreRightPieces) {
                    frameString += rightFrame45Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 5:
                frameString += getGrainTypeSrc(thumbnailRight5.src) + " ";
                frameString += "100";
                break;
        }
    }
    frameString += "," + numTopVisiblePieces + " ";
    for (let top = 1; top <= numTopVisiblePieces; top++) {
        if (top == numTopVisiblePieces) {
            moreTopPieces = false;
        }
        switch (top) {
            case 1:
                //using thumbnail.src because it requires less work than getting the background src of related frame piece
                frameString += getGrainTypeSrc(thumbnailTop1.src) + " ";
                if (moreTopPieces) {
                    frameString += topFrame12Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 2:
                frameString += getGrainTypeSrc(thumbnailTop2.src) + " ";
                if (moreTopPieces) {
                    frameString += topFrame23Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 3:
                frameString += getGrainTypeSrc(thumbnailTop3.src) + " ";
                if (moreTopPieces) {
                    frameString += topFrame34Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 4:
                frameString += getGrainTypeSrc(thumbnailTop4.src) + " ";
                if (moreTopPieces) {
                    frameString += topFrame45Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 5:
                frameString += getGrainTypeSrc(thumbnailTop5.src) + " ";
                frameString += "100";
                break;
        }
    }
    frameString += "," + numBottomVisiblePieces + " ";
    for (let bottom = 1; bottom <= numBottomVisiblePieces; bottom++) {
        if (bottom == numBottomVisiblePieces) {
            moreBottomPieces = false;
        }
        switch (bottom) {
            case 1:
                //using thumbnail.src because it requires less work than getting the background src of related frame piece
                frameString += getGrainTypeSrc(thumbnailBottom1.src) + " ";
                if (moreBottomPieces) {
                    frameString += bottomFrame12Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 2:
                frameString += getGrainTypeSrc(thumbnailBottom2.src) + " ";
                if (moreBottomPieces) {
                    frameString += bottomFrame23Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 3:
                frameString += getGrainTypeSrc(thumbnailBottom3.src) + " ";
                if (moreBottomPieces) {
                    frameString += bottomFrame34Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 4:
                frameString += getGrainTypeSrc(thumbnailBottom4.src) + " ";
                if (moreBottomPieces) {
                    frameString += bottomFrame45Percent + " ";
                }
                else {
                    frameString += "100";
                }
                break;
            case 5:
                frameString += getGrainTypeSrc(thumbnailBottom5.src) + " ";
                frameString += "100";
                break;
        }
    }
    return frameString;
}

function setPopupImage(imgId) {
    let image = document.getElementById(imgId);
    popupImageChosen.src = image.src;

    switch (imgId) {
        case 'popupPic1':
            popupUploadInchWidthItem.value = 15;
            popupUploadInchHeightItem.value = 10;
            break;
        case 'popupPic2':
            popupUploadInchWidthItem.value = 15;
            popupUploadInchHeightItem.value = 10;
            break;
        case 'popupPic3':
            popupUploadInchWidthItem.value = 16;
            popupUploadInchHeightItem.value = 12;
            break;
        case 'popupPic4':
            popupUploadInchWidthItem.value = 21;
            popupUploadInchHeightItem.value = 14;
            break;
        case 'popupPic5':
            popupUploadInchWidthItem.value = 15;
            popupUploadInchHeightItem.value = 10;
            break;
        case 'popupPic6':
            popupUploadInchWidthItem.value = 15;
            popupUploadInchHeightItem.value = 10;
            break;
        case 'popupPic7':
            popupUploadInchWidthItem.value = 12;
            popupUploadInchHeightItem.value = 9;
            break;
        case 'popupPic8':
            popupUploadInchWidthItem.value = 15;
            popupUploadInchHeightItem.value = 10;
            break;
        case 'popupPic9':
            popupUploadInchWidthItem.value = 12;
            popupUploadInchHeightItem.value = 9;
            break;

    }
}

function loadFrameData(frameData, height, width) {
    document.getElementById("widthInput").value = width;
    document.getElementById("heightInput").value = height;
    pictureWidthRealLife = width;
    pictureHeightRealLife = height;
    updateAR();
    let sides = frameData.split(",");
    let sideIndex = 1;
    for (let side of sides) {
        let pieces = side.split(" ");
        if (sideIndex == 1) {
            numLeftVisiblePieces = pieces[0];
            let leftIndex = 0;
            while (leftIndex < numLeftVisiblePieces) {
                let offset = getOffset(pieces[(2 * leftIndex) + 2], 'V');
                switch (leftIndex) {
                    case 0:
                        leftFrame1.style.backgroundImage = "url('/images/" + pieces[(2 * leftIndex) + 1] + "V.jpg')";
                        leftFrame1.classList.remove("doNotShow");
                        //leftBtn1 transformation is set here because this case of 0 has the leftFrame12Percent that's relevant to this button
                        leftBtn1Offset = offset;
                        leftBtn1Position = leftBtn1Offset;
                        leftBtn1.style.transform = 'translateY(' + leftBtn1Offset + 'px)';
                        leftFrame12Percent = pieces[(2 * leftIndex) + 2];
                        thumbnailLeft1.src = "/thumbnails/" + pieces[(2 * leftIndex) + 1] + ".jpg";
                        break;
                    case 1:
                        leftFrame2.style.backgroundImage = "url('/images/" + pieces[(2 * leftIndex) + 1] + "V.jpg')";
                        leftFrame2.classList.remove("doNotShow");
                        leftBtn1.classList.remove("doNotShow");
                        leftBtn2Offset = offset;
                        leftBtn2Position = leftBtn2Offset;
                        leftBtn2.style.transform = 'translateY(' + leftBtn2Offset + 'px)';
                        leftFrame23Percent = pieces[(2 * leftIndex) + 2];
                        thumbnailLeft2.src = "/thumbnails/" + pieces[(2 * leftIndex) + 1] + ".jpg";
                        dropDownButtonLeft2.disabled = false;
                        break;
                    case 2:
                        leftFrame3.style.backgroundImage = "url('/images/" + pieces[(2 * leftIndex) + 1] + "V.jpg')";
                        leftFrame3.classList.remove("doNotShow");
                        leftBtn2.classList.remove("doNotShow");
                        leftBtn3Offset = offset;
                        leftBtn3Position = leftBtn3Offset;
                        leftBtn3.style.transform = 'translateY(' + leftBtn3Offset + 'px)';
                        leftFrame34Percent = pieces[(2 * leftIndex) + 2];
                        thumbnailLeft3.src = "/thumbnails/" + pieces[(2 * leftIndex) + 1] + ".jpg";
                        dropDownButtonLeft3.disabled = false;
                        break;
                    case 3:
                        leftFrame4.style.backgroundImage = "url('/images/" + pieces[(2 * leftIndex) + 1] + "V.jpg')";
                        leftFrame4.classList.remove("doNotShow");
                        leftBtn3.classList.remove("doNotShow");
                        leftBtn4Offset = offset;
                        leftBtn4Position = leftBtn4Offset;
                        leftBtn4.style.transform = 'translateY(' + leftBtn4Offset + 'px)';
                        leftFrame45Percent = pieces[(2 * leftIndex) + 2];
                        thumbnailLeft4.src = "/thumbnails/" + pieces[(2 * leftIndex) + 1] + ".jpg";
                        dropDownButtonLeft4.disabled = false;
                        break;
                    case 4:
                        leftFrame5.style.backgroundImage = "url('/images/" + pieces[(2 * leftIndex) + 1] + "V.jpg')";
                        leftFrame5.classList.remove("doNotShow");
                        leftBtn4.classList.remove("doNotShow");
                        thumbnailLeft5.src = "/thumbnails/" + pieces[(2 * leftIndex) + 1] + ".jpg";
                        dropDownButtonLeft5.disabled = false;
                        break;
                }
                leftIndex++;
            }
        }
        else if (sideIndex == 2) {
            numRightVisiblePieces = pieces[0];
            let rightIndex = 0;
            while (rightIndex < numRightVisiblePieces) {
                let offset = getOffset(pieces[(2 * rightIndex) + 2], 'V');
                switch (rightIndex) {
                    case 0:
                        rightFrame1.style.backgroundImage = "url('/images/" + pieces[(2 * rightIndex) + 1] + "V.jpg')";
                        rightFrame1.classList.remove("doNotShow");
                        rightBtn1Offset = offset;
                        rightBtn1Offset = rightBtn1Offset;
                        rightBtn1.style.transform = 'translateY(' + rightBtn1Offset + 'px)';
                        rightFrame12Percent = pieces[(2 * rightIndex) + 2];
                        thumbnailRight1.src = "/thumbnails/" + pieces[(2 * rightIndex) + 1] + ".jpg";
                        break;
                    case 1:
                        rightFrame2.style.backgroundImage = "url('/images/" + pieces[(2 * rightIndex) + 1] + "V.jpg')";
                        rightFrame2.classList.remove("doNotShow");
                        rightBtn1.classList.remove("doNotShow");
                        rightBtn2Offset = offset;
                        rightBtn2Offset = rightBtn2Offset;
                        rightBtn2.style.transform = 'translateY(' + rightBtn2Offset + 'px)';
                        rightFrame23Percent = pieces[(2 * rightIndex) + 2];
                        thumbnailRight2.src = "/thumbnails/" + pieces[(2 * rightIndex) + 1] + ".jpg";
                        dropDownButtonRight2.disabled = false;
                        break;
                    case 2:
                        rightFrame3.style.backgroundImage = "url('/images/" + pieces[(2 * rightIndex) + 1] + "V.jpg')";
                        rightFrame3.classList.remove("doNotShow");
                        rightBtn2.classList.remove("doNotShow");
                        rightBtn3Offset = offset;
                        rightBtn3Offset = rightBtn3Offset;
                        rightBtn3.style.transform = 'translateY(' + rightBtn3Offset + 'px)';
                        rightFrame34Percent = pieces[(2 * rightIndex) + 2];
                        thumbnailRight3.src = "/thumbnails/" + pieces[(2 * rightIndex) + 1] + ".jpg";
                        dropDownButtonRight3.disabled = false;
                        break;
                    case 3:
                        rightFrame4.style.backgroundImage = "url('/images/" + pieces[(2 * rightIndex) + 1] + "V.jpg')";
                        rightFrame4.classList.remove("doNotShow");
                        rightBtn3.classList.remove("doNotShow");
                        rightBtn4Offset = offset;
                        rightBtn4Offset = rightBtn4Offset;
                        rightBtn4.style.transform = 'translateY(' + rightBtn4Offset + 'px)';
                        rightFrame45Percent = pieces[(2 * rightIndex) + 2];
                        thumbnailRight4.src = "/thumbnails/" + pieces[(2 * rightIndex) + 1] + ".jpg";
                        dropDownButtonRight4.disabled = false;
                        break;
                    case 4:
                        rightFrame5.style.backgroundImage = "url('/images/" + pieces[(2 * rightIndex) + 1] + "V.jpg')";
                        rightFrame5.classList.remove("doNotShow");
                        rightBtn4.classList.remove("doNotShow");
                        thumbnailRight5.src = "/thumbnails/" + pieces[(2 * rightIndex) + 1] + ".jpg";
                        dropDownButtonRight5.disabled = false;
                        break;
                }
                rightIndex++;
            }
        }
        else if (sideIndex == 3) {
            numTopVisiblePieces = pieces[0];
            let topIndex = 0;
            while (topIndex < numTopVisiblePieces) {
                let offset = getOffset(pieces[(2 * topIndex) + 2], 'H');
                switch (topIndex) {
                    case 0:
                        topFrame1.style.backgroundImage = "url('/images/" + pieces[(2 * topIndex) + 1] + "H.jpg')";
                        topFrame1.classList.remove("doNotShow");
                        topBtn1Offset = offset;
                        topBtn1Offset = topBtn1Offset;
                        topBtn1.style.transform = 'translateX(' + topBtn1Offset + 'px)';
                        topFrame12Percent = pieces[(2 * topIndex) + 2];
                        thumbnailTop1.src = "/thumbnails/" + pieces[(2 * topIndex) + 1] + ".jpg";
                        break;
                    case 1:
                        topFrame2.style.backgroundImage = "url('/images/" + pieces[(2 * topIndex) + 1] + "H.jpg')";
                        topFrame2.classList.remove("doNotShow");
                        topBtn1.classList.remove("doNotShow");
                        topBtn2Offset = offset;
                        topBtn2Offset = topBtn2Offset;
                        topBtn2.style.transform = 'translateX(' + topBtn2Offset + 'px)';
                        topFrame23Percent = pieces[(2 * topIndex) + 2];
                        thumbnailTop2.src = "/thumbnails/" + pieces[(2 * topIndex) + 1] + ".jpg";
                        dropDownButtonTop2.disabled = false;
                        break;
                    case 2:
                        topFrame3.style.backgroundImage = "url('/images/" + pieces[(2 * topIndex) + 1] + "H.jpg')";
                        topFrame3.classList.remove("doNotShow");
                        topBtn2.classList.remove("doNotShow");
                        topBtn3Offset = offset;
                        topBtn3Offset = topBtn3Offset;
                        topBtn3.style.transform = 'translateX(' + topBtn3Offset + 'px)';
                        topFrame34Percent = pieces[(2 * topIndex) + 2];
                        thumbnailTop3.src = "/thumbnails/" + pieces[(2 * topIndex) + 1] + ".jpg";
                        dropDownButtonTop3.disabled = false;
                        break;
                    case 3:
                        topFrame4.style.backgroundImage = "url('/images/" + pieces[(2 * topIndex) + 1] + "H.jpg')";
                        topFrame4.classList.remove("doNotShow");
                        topBtn3.classList.remove("doNotShow");
                        topBtn4Offset = offset;
                        topBtn4Offset = topBtn4Offset;
                        topBtn4.style.transform = 'translateX(' + topBtn4Offset + 'px)';
                        topFrame45Percent = pieces[(2 * topIndex) + 2];
                        thumbnailTop4.src = "/thumbnails/" + pieces[(2 * topIndex) + 1] + ".jpg";
                        dropDownButtonTop4.disabled = false;
                        break;
                    case 4:
                        topFrame5.style.backgroundImage = "url('/images/" + pieces[(2 * topIndex) + 1] + "H.jpg')";
                        topFrame5.classList.remove("doNotShow");
                        topBtn4.classList.remove("doNotShow");
                        thumbnailTop5.src = "/thumbnails/" + pieces[(2 * topIndex) + 1] + ".jpg";
                        dropDownButtonTop5.disabled = false;
                        break;
                }
                topIndex++;
            }
        }
        else {
            numBottomVisiblePieces = pieces[0];
            let bottomIndex = 0;
            while (bottomIndex < numBottomVisiblePieces) {
                let offset = getOffset(pieces[(2 * bottomIndex) + 2], 'H');
                switch (bottomIndex) {
                    case 0:
                        bottomFrame1.style.backgroundImage = "url('/images/" + pieces[(2 * bottomIndex) + 1] + "H.jpg')";
                        bottomFrame1.classList.remove("doNotShow");
                        bottomBtn1Offset = offset;
                        bottomBtn1Offset = bottomBtn1Offset;
                        bottomBtn1.style.transform = 'translateX(' + bottomBtn1Offset + 'px)';
                        bottomFrame12Percent = pieces[(2 * bottomIndex) + 2]
                        thumbnailBottom1.src = "/thumbnails/" + pieces[(2 * bottomIndex) + 1] + ".jpg";
                        break;
                    case 1:
                        bottomFrame2.style.backgroundImage = "url('/images/" + pieces[(2 * bottomIndex) + 1] + "H.jpg')";
                        bottomFrame2.classList.remove("doNotShow");
                        bottomBtn1.classList.remove("doNotShow");
                        bottomBtn2Offset = offset;
                        bottomBtn2Offset = bottomBtn2Offset;
                        bottomBtn2.style.transform = 'translateX(' + bottomBtn2Offset + 'px)';
                        bottomFrame23Percent = pieces[(2 * bottomIndex) + 2]
                        thumbnailBottom2.src = "/thumbnails/" + pieces[(2 * bottomIndex) + 1] + ".jpg";
                        dropDownButtonBottom2.disabled = false;
                        break;
                    case 2:
                        bottomFrame3.style.backgroundImage = "url('/images/" + pieces[(2 * bottomIndex) + 1] + "H.jpg')";
                        bottomFrame3.classList.remove("doNotShow");
                        bottomBtn2.classList.remove("doNotShow");
                        bottomBtn3Offset = offset;
                        bottomBtn3Offset = bottomBtn3Offset;
                        bottomBtn3.style.transform = 'translateX(' + bottomBtn3Offset + 'px)';
                        bottomFrame34Percent = pieces[(2 * bottomIndex) + 2]
                        thumbnailBottom3.src = "/thumbnails/" + pieces[(2 * bottomIndex) + 1] + ".jpg";
                        dropDownButtonBottom3.disabled = false;
                        break;
                    case 3:
                        bottomFrame4.style.backgroundImage = "url('/images/" + pieces[(2 * bottomIndex) + 1] + "H.jpg')";
                        bottomFrame4.classList.remove("doNotShow");
                        bottomBtn3.classList.remove("doNotShow");
                        bottomBtn4Offset = offset;
                        bottomBtn4Offset = bottomBtn4Offset;
                        bottomBtn4.style.transform = 'translateX(' + bottomBtn4Offset + 'px)';
                        bottomFrame45Percent = pieces[(2 * bottomIndex) + 2]
                        thumbnailBottom4.src = "/thumbnails/" + pieces[(2 * bottomIndex) + 1] + ".jpg";
                        dropDownButtonBottom4.disabled = false;
                        break;
                    case 4:
                        bottomFrame5.style.backgroundImage = "url('/images/" + pieces[(2 * bottomIndex) + 1] + "H.jpg')";
                        bottomFrame5.classList.remove("doNotShow");
                        bottomBtn4.classList.remove("doNotShow");
                        thumbnailBottom5.src = "/thumbnails/" + pieces[(2 * bottomIndex) + 1] + ".jpg";
                        dropDownButtonBottom5.disabled = false;
                        break;
                }
                bottomIndex++;
            }
        }
        sideIndex++;
    }
    submitMetrics();
    updateCost();
}

function getOffset(percent, verticalOrHorizontalStr) {
    let value = 0;
    if (verticalOrHorizontalStr == 'V') {
        value = (percent * .01 * maxHeight) - (maxHeight / 2);
    }
    else {
        value = (percent * .01 * maxWidth) - (maxWidth / 2);
    }
    return value;
}

function roundPercents() {
    leftFrame12Percent = Math.round(leftFrame12Percent * 100) / 100;
    leftFrame23Percent = Math.round(leftFrame23Percent * 100) / 100;
    leftFrame34Percent = Math.round(leftFrame34Percent * 100) / 100;
    leftFrame45Percent = Math.round(leftFrame45Percent * 100) / 100;
    rightFrame12Percent = Math.round(rightFrame12Percent * 100) / 100;
    rightFrame23Percent = Math.round(rightFrame23Percent * 100) / 100;
    rightFrame34Percent = Math.round(rightFrame34Percent * 100) / 100;
    rightFrame45Percent = Math.round(rightFrame45Percent * 100) / 100;
    topFrame12Percent = Math.round(topFrame12Percent * 100) / 100;
    topFrame23Percent = Math.round(topFrame23Percent * 100) / 100;
    topFrame34Percent = Math.round(topFrame34Percent * 100) / 100;
    topFrame45Percent = Math.round(topFrame45Percent * 100) / 100;
    bottomFrame12Percent = Math.round(bottomFrame12Percent * 100) / 100;
    bottomFrame23Percent = Math.round(bottomFrame23Percent * 100) / 100;
    bottomFrame34Percent = Math.round(bottomFrame34Percent * 100) / 100;
    bottomFrame45Percent = Math.round(bottomFrame45Percent * 100) / 100;
}

function getOptions() {
    let cornerSupports = getGrainTypeSrc(document.getElementById("cornerSupportThumbnail").src);
    let matteOrSatin = document.getElementById("Matte").value;
    if (!matteOrSatin) {
        matteOrSatin = "Satin";
    }
    let glassOrAcrylic = document.getElementById("Glass").value;
    if (!glassOrAcrylic) {
        glassOrAcrylic = "Acrylic";
    }
    let bracketOrWire = document.getElementById("Bracket").value;
    if (!bracketOrWire) {
        bracketOrWire = "Wire";
    }
    let returnStr = "CornerSupport:" + cornerSupports + ",Finish:" + matteOrSatin + ",GlassOrAcrylic:" + glassOrAcrylic + ",Mounting:" + bracketOrWire;
    return returnStr;
}

function updateCost() {
    let cost = document.getElementById("totalCostMoney");
    let total = 0;
    let numPieces = 0;
    if (maxHeight != 0 && maxWidth != 0) {
        let frameData = getFrameData();
        console.log("Frame data:" + frameData);
        let heightTotal = pictureHeightRealLife;
        let widthTotal = pictureWidthRealLife;
        let costStr = "";
        let sides = frameData.split(",");
        let sideIndex = 1;
        for (let side of sides) {
            let pieces = side.split(" ");
            let pieceIndex = 0;
            let previousPercent = 0;
            let numOfPiecesOnSide = pieces[0];
            //If 1 or 2 use height, as the first two are left and right sides
            if (sideIndex == 1 || sideIndex == 2) {
                console.log("numOfPiecesOnSide:" + numOfPiecesOnSide);
                let leftOrRightIndex = 0;
                while (leftOrRightIndex < numOfPiecesOnSide) {
                    let wood = pieces[(2 * leftOrRightIndex) + 1];
                    //Math goes like previousPercent  (set to 0, the first number in the frameData is the percent of LeftBtn12Percent)
                    //So from 0 to say 10% would mean 10% of the height of the piece is for the lumber that came directly before that percent
                    let size = ((pieces[(2 * leftOrRightIndex) + 2] * 0.01) - previousPercent) * heightTotal;
                    previousPercent = (pieces[(2 * leftOrRightIndex) + 2] * 0.01);
                    costStr = costStr + " " + wood + " " + getCostForIndividualPiece(wood, size);
                    total = total + getCostForIndividualPiece(wood, size);
                    leftOrRightIndex++;
                    numPieces++;
                }
            }
            else if (sideIndex == 3 || sideIndex == 4) {
                console.log("numOfPiecesOnSide:" + numOfPiecesOnSide);
                let topOrBottomIndex = 0;
                while (topOrBottomIndex < numOfPiecesOnSide) {
                    let wood = pieces[(2 * topOrBottomIndex) + 1];
                    let size = ((pieces[(2 * topOrBottomIndex) + 2] * 0.01) - previousPercent) * widthTotal;
                    previousPercent = (pieces[(2 * topOrBottomIndex) + 2] * 0.01);
                    costStr = costStr + " " + wood + " " + getCostForIndividualPiece(wood, size);
                    total = total + getCostForIndividualPiece(wood, size);
                    topOrBottomIndex++;
                    numPieces++;
                }
            }
            sideIndex++;
        }
        console.log("costStr: " + costStr);
        total = Math.round(total * 1) / 1;
        total = total + (numPieces * 5);
        //cost.textContent = "$" + total.toString();
    }
    else {
        cost.textContent = "Money";
    }
}

function getCostForIndividualPiece(wood, size) {
    if (wood == "brazilian-cherry") {
        return size * 7;
    }
    else if (wood == "hard-maple") {
        return size * 6;
    }
    else if (wood == "olive") {
        return size * 8;
    }
    else if (wood == "padauk") {
        return size * 7;
    }
    else if (wood == "purpleheart") {
        return size * 7;
    }
    else if (wood == "sapele") {
        return size * 6;
    }
    else if (wood == "soft-maple") {
        return size * 5;
    }
    else if (wood == "walnut") {
        return size * 6;
    }
    else if (wood == "white-oak") {
        return size * 6;
    }
}
