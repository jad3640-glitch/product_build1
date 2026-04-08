# 끝말잇기 Game Blueprint

## Overview

This document outlines the plan for creating a Korean word chain game called "끝말잇기". The game will be a simple web application where players can input words, and the application will validate them based on the rules of the game.

## Design and Features

### Visual Design
- **Layout**: A clean, centered layout that is easy to use.
- **Color Palette**: A modern and friendly color scheme.
- **Typography**: Clear and readable fonts.
- **Iconography**: Simple icons to enhance user understanding.
- **Interactivity**: Interactive elements will have clear visual feedback (e.g., button hover effects).

### Features
1.  **Game Title**: The app will display "끝말잇기 게임" as the main title.
2.  **Word Display**: A section to show the current word.
3.  **Input Field**: A text input for the user to enter the next word.
4.  **Submit Button**: A button to submit the entered word.
5.  **Message Area**: A space to display game-related messages (e.g., "정답입니다!", "틀렸습니다!").
6.  **Word History**: A list to show all the words that have been played.

## Implementation Plan

### `index.html`
- Set up the basic HTML structure for the game, including:
    - A main container for the game.
    - An `h1` for the title.
    - A `div` to display the current word.
    - An `input` field and a `button`.
    - A `p` tag for messages.
    - A `ul` to list the word history.

### `style.css`
- Apply modern CSS for styling, including:
    - Centering the game container.
    - Styling the button, input field, and other elements.
    - Using CSS variables for colors.
    - Adding responsive design for different screen sizes.

### `main.js`
- Implement the game logic:
    - Initialize the game with a starting word.
    - Handle the button click event.
    - Validate the user's input word to ensure it starts with the correct letter.
    - Check for repeated words.
    - Update the UI with the new word and messages.
    - Add the new word to the history list.
