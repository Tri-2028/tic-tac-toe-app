# 🎮 Tic-Tac-Toe Game

<p align="center">
  <img src="https://img.shields.io/badge/Modern-UI-7c5cff?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Responsive-Mobile%20%26%20Desktop-00d4ff?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Dark%20Mode-Enabled-2dff7a?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI%20Opponent-Easy%2FMedium%2FHard-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Sound%20Effects-Web%20Audio-ff69b4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deployed-GitHub%20Pages-47b39d?style=for-the-badge" />
</p>

---

## 🚀 Live Demo

🔗 https://tic-tac-toe-app-seven-gamma.vercel.app/

---


## 📝 Project Summary
A modern and responsive **Tic-Tac-Toe** web game built using **HTML, CSS, and JavaScript**.

✅ Highlights:
- Centered **glassmorphism** UI
- Responsive design for mobile & desktop
- Winner detection with **winning-cell highlight**
- Draw detection
- Restart game button
- Scoreboard (X / O / Draw)
- Sound effects for clicks, wins, and draws
- Dark Mode toggle (persisted with `localStorage`)
- Single-player vs AI with difficulty: **Easy / Medium / Hard**

---

## ✨ Feature Comparison (Recruiter-friendly)
| Capability | Human vs Human | Human vs AI | Notes |
|---|---:|---:|---|
| Responsive UI | ✅ | ✅ | Mobile/desktop layout adapts automatically |
| 3×3 Board | ✅ | ✅ | Classic rules |
| Turn Indicator | ✅ | ✅ | Shows whose move it is |
| Block Occupied Cells | ✅ | ✅ | Clicks on filled cells are ignored |
| Winner Detection | ✅ | ✅ | Winning line is highlighted |
| Draw Detection | ✅ | ✅ | Ends game when no moves remain |
| Restart Game | ✅ | ✅ | Board resets cleanly |
| Scoreboard | ✅ | ✅ | Tracks X/O/Draw totals |
| Sound Effects | ✅ | ✅ | Web Audio triggered by user gestures |
| Dark Mode Toggle | ✅ | ✅ | Persisted preference |
| AI Difficulty Levels | — | ✅ | Easy=random, Medium=tactical, Hard=minimax |

---

## 📊 Project Statistics
<p align="center">

| Category | Value |
|---|---|
| Game Type | Tic-Tac-Toe |
| Board Size | 3×3 |
| Languages | HTML, CSS, JavaScript |
| Difficulty Levels | 3 (Easy/Medium/Hard) |
| AI Strategy | Random / Heuristic / Minimax |
| Accessibility | ARIA roles + status updates |

</p>

---

## 🧰 Tech Stack
- **HTML5**
- **CSS3**
- **JavaScript (ES Modules)**
- **Web Audio API** (sound)
- `localStorage` (dark mode persistence)

---

## 📦 Installation & Usage
### Option A: Run locally (no build tools)
1. Clone the repo:
```bash
git clone https://github.com/Tri-2028/tic-tac-toe-app.git
```
2. Open `index.html` in your browser.

### Option B: Use a local server (recommended)
```bash
python -m http.server
```
Then open the shown `http://localhost:PORT`.

---

## 🎮 How to Play
1. Choose the AI difficulty (**Easy / Medium / Hard**).
2. Click an empty square to place **X**.
3. The computer places **O** automatically.
4. The game ends on:
   - **Win** (3 in a row) ✅
   - **Draw** (board full) 🤝
5. Use **Restart Game** to play again.

---

## 📁 Project Structure
```text
tic-tac-toe-app/
├─ index.html     # UI layout (board, turn/status, controls)
├─ style.css      # Glassmorphism + responsive styling
├─ script.js      # Game logic + winner/draw + AI
├─ sfx.js         # Sound effects (Web Audio)
└─ theme.js       # Dark mode toggle + persistence
```

---

## 🛠️ Future Enhancements
- Human vs Human mode toggle
- Save scoreboard in `localStorage` (optional)
- Keyboard navigation improvements
- Scoreboard win streaks / stats
- Additional board sizes (4×4 / 5×5)

---

## 👨‍💻 Author
**Trivarna Kandlur**

---

## 🧾 License
MIT License

---

## 📌 Professional Footer
Built with ❤️ for clean UI, solid gameplay logic, and recruiter-friendly UX polish.

