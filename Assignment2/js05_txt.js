"use strict";
/*    Assignment 2

      Application to generate a slide show
      
      Author: Alessandra Primatesta (301 297 110)
      Date:   March 5, 2023  

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = lightboxTitle;
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      modalImage.id = "photo";
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function () {
         document.body.removeChild(modalWindow);
      }

      modalWindow.appendChild(closeBox);

      //my addition for fav button and code to add photo and remove button to favourites section
      let addBox = document.createElement("div");
      addBox.id = "addFave";
      addBox.innerHTML = "Add to Favourites";
      addBox.onclick = function () {     
         let favWrapper = document.createElement("div");
         let favImage = modalImage.cloneNode("true");
         let fav = document.getElementById("fav");
         
         // Check if image is already in favourites and if there are already 5 images
         let imageAlreadyInFavourites = false;
         let numberOfFavourites = fav.children.length;
         
         for (let i = 0; i < numberOfFavourites; i++) {
           let currentFav = fav.children[i];
           if (currentFav.querySelector("#favphoto").src === favImage.src) {
             imageAlreadyInFavourites = true;
             break;
           }
         }
         
         if (imageAlreadyInFavourites) {
           alert("This image is already in your favourites and will not be added.");
         } else if (numberOfFavourites >= 5) {
           alert("You have already chosen 5 favourite images. Please remove an existing favourite before adding another.");
         } else {
            favWrapper.id = "favwrapper";
            favWrapper.appendChild(favImage);
            favImage.id = "favphoto";
            
            // Add click event listener to the image to show removefavourite button
            favImage.addEventListener("click", function() {
              if (!favWrapper.contains(removefavourite)) {
                favWrapper.appendChild(removefavourite);
              }
            });
            
            let removefavourite = document.createElement("div");
            removefavourite.innerHTML = "Remove Favourite";
            removefavourite.onclick = function () {
              fav.removeChild(favWrapper);
            }
            removefavourite.id = "remfave";
            
            fav.appendChild(favWrapper);
          }
        };
      
      modalWindow.appendChild(addBox);
      
      document.body.appendChild(modalWindow);
   } 
}
