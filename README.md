# Memory Card

Memory Card project for "The Odin Project" curriculum.

Pokemon memory style game built with HTML, CSS, Javascript and React. Using [PokeAPI](https://pokeapi.co/). There are three types of difficulties in the game. (easy, medium, hard) I've used he **Fisher-Yates** algorithm, also known as the **Knuth shuffle**. I've also used `useEffect` and `state` hooks to fetch something from the API, and also to keep track of my scores and the game state/status. I'm using an `Javascript` function to generate random numbers that I then use to get random Pokemons from the `PokeAPI`.

Game flow works in that way that if the user wins and chooses the option to `Keep Playing` the card on screen will increment by one, and so on. So, if the player had choosen the `Easy` difficulty if he wins, the game and presses the button: `Keep Playing` when the next "round" loads on the screen there will be six cards instead of five. 

I'm using `localStorage WebAPI` to keep track of player high score. I've added loading screen with a little pokeball`GIF image` and some animations for better look and feel. 

It's fully responsive for smaller screens. 


## Demo
https://main--poke-memo-card-game.netlify.app/


## Acknowledgements

 - [Pokeball GIF](https://www.deviantart.com/termatior0/art/Pokeball-gif-662893232)
 - [8bit Pokeball](https://www.pinterest.com/pin/8bit-pokeball--733101645568727945/)
 - [Background](https://www.pxfuel.com/en/desktop-wallpaper-aybmb)
 - [Favicon](https://icon-icons.com/icon/pokeball/37565)

