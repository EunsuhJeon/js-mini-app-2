# 🎣 Angler’s Trial

**Angler’s Trial** is a retro-style fishing mini-game inspired by classic 8-bit / 16-bit Nintendo-era games. Created by Eunsuh Jeon and Santiago Minotta, it emphasizes pixel-art aesthetics, timing-based gameplay, and modular JavaScript architecture.

---

## 🕹️ Game Overview

Players catch target fish from various biomes (Lake, River, Sea) in each round. Each fish requires the correct depth, bait selection, and precise timing through mini-games and QTEs.

**Key Features**

* Old-school 8-bit / 16-bit pixel art & pixel fonts
* Retro device-style UI frame
* Timing-based fishing mechanics
* Fish encyclopedia (Book modal)
* Round-based progression system


---

## 🔄 Core Game Flow

1. **Landing Page** – Displays game title and Start button
2. **Round Intro** – Shows current round briefly on black screen
3. **In-Game Screen**

   * Header: biome, target fish, round, score, Book button
   * Body: water area (3 depth layers) + land area with player character
4. **Target Fish Overlay** – Displays target fish info for 3 seconds
5. **Bait Selection** – Player chooses bait via modal
6. **Depth Timing Game** – Stop the cursor at the correct water layer
7. **Bite Timing Game** – Stop the cursor inside the success zone
8. **QTE Phase**

   * QTE 1: Click reel handle 10 times
   * QTE 2: Type a random 3–4 letter key sequence
9. **Result Screen** – Score updates and Continue to next round


---

## 🛠️ Technical Highlights

* **HTML**: Game layout, buttons, HUD panels
* **CSS**: Pixel-art styling, sprite animations, transitions
* **JavaScript**:

  * Variables (`let`, `const`) for state management
  * Functions for casting, scoring, HUD rendering
  * Conditionals for win/lose logic
  * Loops for animation and rendering
  * Event listeners for clicks and key inputs
  * DOM manipulation and UI feedback using vanilla JS and **jQuery**


---

## ✅ Assignment Summary

This project meets all school assignment requirements including retro visuals, interactive gameplay, DOM manipulation, modular ES structure, and core JavaScript usage.

🎣 **Angler’s Trial** demonstrates creative game design and solid front-end development skills.
