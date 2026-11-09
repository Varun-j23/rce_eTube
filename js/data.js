// =========================================================
// eTube - Day 5: our "database" (an array of video objects)
// Loaded BEFORE app.js on every page.
// =========================================================

const videos = [
  { id: 1, title: "HTML in 10 Minutes",             channel: "CodeCampus", category: "web",        views: 1200000, likes: 9800,  durationSec: 624,  uploaded: "2026-10-17", thumb: "images/thumbs/html-basics.jpg",       tags: ["html", "webdevelopment"] },
  { id: 2, title: "CSS Flexbox Made Easy",          channel: "CodeCampus", category: "web",        views: 845000,  likes: 6100,  durationSec: 842,  uploaded: "2026-10-01", thumb: "images/thumbs/css-flexbox.jpg",       tags: ["css", "flexbox"] },
  { id: 3, title: "JavaScript for Beginners",       channel: "CodeCampus", category: "web",        views: 2100000, likes: 15400, durationSec: 1365, uploaded: "2026-08-02", thumb: "images/thumbs/js-basics.jpg",         tags: ["javascript"] },
  { id: 4, title: "Cracking the Infosys Interview", channel: "CodeCampus", category: "placements", views: 530000,  likes: 4700,  durationSec: 1110, uploaded: "2026-10-27", thumb: "images/thumbs/infosys-interview.jpg", tags: ["interview", "infosys"] },
  { id: 5, title: "Git & GitHub in 15 Minutes",     channel: "CodeCampus", category: "tools",      views: 312000,  likes: 2050,  durationSec: 911,  uploaded: "2026-09-01", thumb: "images/thumbs/git-github.jpg",        tags: ["git", "github"] },
  { id: 6, title: "DSA: Arrays Explained",          channel: "CodeCampus", category: "dsa",        views: 678000,  likes: 5300,  durationSec: 728,  uploaded: "2026-10-11", thumb: "images/thumbs/dsa-arrays.jpg",        tags: ["dsa", "arrays"] }
];
