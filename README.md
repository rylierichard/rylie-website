# Rylie Richard — Personal Portfolio Website

A responsive personal portfolio website built with plain HTML, CSS, and JavaScript. Designed to showcase Rylie Richard's background, technical skills, professional experience, featured project, and contact information.

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero, about, skills, experience, and contact sections |
| Featured Project | `project.html` | Detail page for the NIST SP 800-53 Mapping Initiative |
| Resume | `resume.html` | Formatted resume with education, experience, and skills |

---

## ✨ Features

- **Responsive Design** — Mobile-first layout that adapts to all screen sizes
- **Dark / Light Mode** — Toggle between themes; preference persisted via `localStorage`
- **Navbar Search** — Live keyword search across all site sections with a results dropdown, keyword highlighting, and smooth scroll-to-section with a flash highlight animation
- **Smooth Scroll Navigation** — Anchor links scroll smoothly to each section
- **Contact Form** — Demo contact form in the Contact section
- **Consistent Branding** — Shared stylesheet and script used across all three pages

---

## 🗂️ Project Structure

```
rylie-website/
├── index.html        # Main portfolio page
├── project.html      # Featured project detail page
├── resume.html       # Resume page
├── styles.css        # Shared stylesheet (all pages)
├── script.js         # Shared JavaScript (navigation, theme, search)
└── README.md         # Project documentation
```

---

## 🎨 Design

- **Color Palette** — Deep purple (`#3b0764`) primary with lilac accents and a dark navy nav/footer
- **Typography** — Times New Roman, Times, serif
- **Dark Mode** — Deep dark purple surfaces (`#0f0a1a`) with light purple text and accents
- **Animations** — Hover transitions, menu fade-in, search expand, and section highlight flash

---

## 🛠️ Technologies

- **HTML5** — Semantic markup
- **CSS3** — Custom properties (CSS variables), Flexbox, Grid, `@keyframes` animations, `backdrop-filter`
- **Vanilla JavaScript** — No frameworks or dependencies; ES6+

---

## 🚀 Running Locally

No build step required. Simply open any HTML file in a browser:

```bash
# Option 1 — Open directly
open index.html

# Option 2 — Serve with Python (prevents any file:// quirks)
python3 -m http.server 8080
# Then visit http://localhost:8080
```

---

## 🔍 Search Feature

The navbar search (🔍 icon next to the theme toggle) lets visitors search by keywords across all sections:

- **About, Skills, Experience, Project, Resume, Contact**
- Results show live as you type with matched keywords highlighted in purple
- Clicking a result smooth-scrolls to the section (same page) or navigates to the correct page
- Keyboard accessible: `↑ ↓` to navigate results, `Esc` to close

---

## 👤 Author

**Rylie Richard**  
Information Systems & Analytics — Louisiana State University (LSU)  
Concentration: Cybersecurity | Minor: Analytics  

- 📧 [richardrylie@gmail.com](mailto:richardrylie@gmail.com)  
- 💼 [linkedin.com/in/rylierichard](https://linkedin.com/in/rylierichard)  
- 🐙 [github.com/rylierichard](https://github.com/rylierichard)

---

## 📝 License

This project is for personal and academic use. All rights reserved © 2026 Rylie Richard.
