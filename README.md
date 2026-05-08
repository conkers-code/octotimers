# Octo WoW Timers

Countdown site for **Octo WoW**. Track raid resets, battleground rotations, and world events with a sleek, abyss-inspired interface.

## Features

- **Real-time Countdowns**: Accurate timers for all major raids and events.
- **Dynamic Rotations**: Automatically tracks Battleground of the Day and Edge of Madness bosses.
- **Darkmode First**: Premium design with glassmorphism and subtle animations.
- **Static & Client-side**: Zero backend required, perfect for GitHub Pages.

## Technology Stack

- **HTML5**: Semantic structure.
- **Vanilla CSS**: Custom design system with CSS variables.
- **Vanilla JavaScript**: Lightweight logic for time calculations and DOM updates.

## Customization

To update reference dates or cycle periods, modify the `REFERENCE_DATES` object in `script.js`:

```javascript
const REFERENCE_DATES = {
    raid40: 'DD/MM/YYYY HH:MM:SS',
    // ...
};
```

## Deployment

This project is ready for **GitHub Pages**:

1. Fork this repository to your own GitHub account.
2. Go to **Settings > Pages**.
3. Select the `main` branch and `/ (root)` folder.
4. Your site will be live at `https://your-username.github.io/octotimers/`.

## Credits

- Inspired by Turtle WoW Timers.
- Assets from original community sources.
- Rebranded for the Octo WoW community.

---
*Navigating the depths of Octo WoW.*
