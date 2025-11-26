---

## The Task

- A game very similar to where’s wally
- Users can click on any location inside of an image
- If the pixel location matches the location of wally, the user wins, otherwise a message is displayed e.g., warm, cold
- The user is timed
- After the round the user can put themselves on a scoreboard

---

## Tech Stack

- React & [Get started with Bootstrap · Bootstrap v5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)  for the front-end
- MongoDB for the database

## Getting the Pixel Position of Waldo

<aside>
💡

Using [Find Image Coordinates - Get Pixel Position and Color Online](https://imageonline.io/find-coordinates-of-image/) we can find the coordinates for waldos position in the image

</aside>

---

## Calculating User Click Positions

<aside>
💡

Source: [geeksforgeeks](https://www.geeksforgeeks.org/javascript/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/)

</aside>

Using a canvas we can create a function that will give us the coordinates relative to inside the canvas

```jsx
function getMousePosition(canvas, event) {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            console.log("Coordinate x: " + x,
                "Coordinate y: " + y);
        }

        let canvasElem = document.querySelector("canvas");

        canvasElem.addEventListener("mousedown", function (e) {
            getMousePosition(canvasElem, e);
        });
```

---

## User Interface

- A home page that shows selection options each game
    - Widgets with a preview of the image & a button to ‘play game’
- When in-game, the image should take up a large portion of the viewport

### Super Basic Idea For Game Screen

<img width="885" height="453" alt="image" src="https://github.com/user-attachments/assets/46b030d5-2eda-4464-bbd7-80ccfb693b0e" />

### Home Page Designs

<img width="1684" height="843" alt="image" src="https://github.com/user-attachments/assets/91772402-e27a-4ff4-a42e-12e995fd893b" />


### Game View Designs

<img width="1857" height="954" alt="image" src="https://github.com/user-attachments/assets/55946752-c117-4218-b9bf-a9b70f82629f" />


<img width="1706" height="830" alt="image" src="https://github.com/user-attachments/assets/c0c11c12-5868-48ab-9cfd-351ae95123f0" />
