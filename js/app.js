// =========================================================
// eTube - Day 4: first JavaScript
// Linked from every page: <script src="js/app.js"></script>
// =========================================================

// ---------- 1. Data types (open the Console to see them) ----------
let siteName = "eTube";            // string
let totalVideos = 6;               // number
let isLoggedIn = false;            // boolean
let currentUser;                   // undefined (declared, no value yet)
let featuredVideo = null;          // null (empty on purpose)
let tags = ["html", "css", "js"];  // array (an object)
let channel = { name: "CodeCampus", subscribers: 250000 };  // object

console.log("Welcome to " + siteName);
console.log(typeof siteName, typeof totalVideos, typeof isLoggedIn,
            typeof currentUser, typeof featuredVideo, typeof tags, typeof channel);

// ---------- 2. Dark mode (every page) ----------
function toggleTheme() {
  document.body.classList.toggle("dark");
  let btn = document.getElementById("themeBtn");
  if (document.body.classList.contains("dark")) {
    btn.innerHTML = "&#9728;&#65039; Light";
  } else {
    btn.innerHTML = "&#127769; Dark";
  }
}

// ---------- 3. Personalise the home page (prompt) ----------
function personalise() {
  let name = prompt("What is your name?");
  if (name === null || name.trim() === "") {
    return;                                    // user pressed Cancel or typed nothing
  }
  let branch = prompt("Your branch? (CSE, ECE, EEE, MECH, CIVIL)", "CSE");
  document.getElementById("greeting").innerText =
    "Hi " + name + "! Videos picked for " + branch + " students";
}

// ---------- 4. Like button (watch page) ----------
let likes = 9800;          // number
let liked = false;         // boolean

function likeVideo() {
  if (liked === false) {
    likes = likes + 1;
    liked = true;
  } else {
    likes = likes - 1;
    liked = false;
  }
  document.getElementById("likeCount").innerText = likes;
  document.getElementById("likeBtn").classList.toggle("active");
}

// ---------- 5. Share (alert) ----------
function shareVideo() {
  alert("Link copied: https://etube.example/watch?v=html-basics\n(Real copying comes on Day 6)");
}

// ---------- 6. Subscribe / unsubscribe (confirm) ----------
let subscribed = false;

function toggleSubscribe() {
  let btn = document.getElementById("subscribeBtn");
  if (subscribed === false) {
    subscribed = true;
    btn.innerText = "Subscribed ✓";
    btn.classList.add("subscribed");
    
    
  } else {
    let sure = confirm("Unsubscribe from CodeCampus?");
    if (sure) {
      subscribed = false;
      btn.innerText = "Subscribe";
      btn.classList.remove("subscribed");
    }
  }
}

// =========================================================
// Day 5 - JavaScript core, applied to eTube
// (data.js gives us the `videos` array)
// =========================================================

// ---------- 7. Variables: const, let ----------
const SITE_NAME = "eTube";        // never changes -> const
const MAX_WATCH_LATER = 10;       // a rule of the app -> const
let autoplaySeconds = 5;          // will count down -> let

// ---------- 8. Functions + operators: formatting helpers ----------

// 1200000 -> "1.2M views", 845000 -> "845K views", 950 -> "950 views"
function formatViews(n) {
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1) + "M views";
  } else if (n >= 1000) {
    return Math.round(n / 1000) + "K views";
  }
  return n + " views";
}

// 624 seconds -> "10:24"
const formatDuration = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);        // whole minutes
  const seconds = totalSeconds % 60;                     // remainder
  return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
};

// "2026-10-17" -> "2 weeks ago"
function timeAgo(dateText, today = new Date()) {
  const days = Math.floor((today - new Date(dateText)) / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return days + " days ago";
  if (days < 30) return plural(Math.floor(days / 7), "week") + " ago";
  if (days < 365) return plural(Math.floor(days / 30), "month") + " ago";
  return plural(Math.floor(days / 365), "year") + " ago";
}

// 1 -> "1 week", 3 -> "3 weeks"
function plural(count, word) {
  return count + " " + (count === 1 ? word : word + "s");
}

// ---------- 9. switch: category label ----------
function categoryLabel(category) {
  switch (category) {
    case "web":        return "Web Development";
    case "dsa":        return "Data Structures & Algorithms";
    case "placements": return "Placement Preparation";
    case "tools":      return "Tools";
    default:           return "Other";
  }
}

// ---------- 10. Loops: channel statistics ----------
function channelStats(list) {
  let totalViews = 0;
  let totalSeconds = 0;
  let top = list[0];

  for (let i = 0; i < list.length; i++) {           // classic for loop
    totalViews += list[i].views;
    totalSeconds += list[i].durationSec;
    if (list[i].views > top.views) {
      top = list[i];
    }
  }

  return {
    totalViews: totalViews,
    average: Math.round(totalViews / list.length),
    top: top,
    totalSeconds: totalSeconds
  };
}

// for...of: print every video in the Console as a table
for (const v of videos) {
  console.log(`${v.id}. ${v.title} | ${formatViews(v.views)} | ${formatDuration(v.durationSec)} | ${timeAgo(v.uploaded)} | ${categoryLabel(v.category)}`);
}

// Array methods with arrow functions (callbacks)
const popular = videos.filter(v => v.views >= 800000);           // keep some
const titles = videos.map(v => v.title.toUpperCase());           // change each
const totalLikes = videos.reduce((sum, v) => sum + v.likes, 0);  // combine all
console.log("Popular:", popular.map(v => v.title));
console.log("Titles:", titles);
console.log("Total likes:", totalLikes);

// ---------- 11. Objects: one video, destructuring, spread ----------
const featured = {
  ...videos[0],                                      // copy all properties
  isFeatured: true,
  summary() {                                        // a method
    return `${this.title} by ${this.channel} - ${formatViews(this.views)}`;
  }
};
const { title, views } = featured;                   // destructuring
console.log(featured.summary(), "|", title, views);

// ---------- 12. Studio page: show the statistics ----------
if (document.getElementById("statTotal")) {          // only on analytics.html
  const stats = channelStats(videos);
  document.getElementById("statTotal").innerText = formatViews(stats.totalViews);
  document.getElementById("statAverage").innerText = formatViews(stats.average);
  document.getElementById("statTop").innerText = stats.top.title;
  document.getElementById("statWatch").innerText =
    Math.floor(stats.totalSeconds / 60) + " min";
}

// ---------- 13. The window object ----------

// 13a. localStorage: remember dark mode on every page (fixes Day 4)
if (window.localStorage.getItem("theme") === "dark") {
  toggleTheme();
}
const originalToggle = toggleTheme;                  // keep Day 4's function
toggleTheme = function () {
  originalToggle();
  const isDark = document.body.classList.contains("dark");
  window.localStorage.setItem("theme", isDark ? "dark" : "light");
};

// 13b. Watch later list saved in the browser
function getWatchLater() {
  const saved = localStorage.getItem("watchLater");  // text or null
  return saved === null ? [] : JSON.parse(saved);    // text -> array
}

function toggleWatchLater(videoId) {
  let list = getWatchLater();
  if (list.includes(videoId)) {
    list = list.filter(id => id !== videoId);
  } else if (list.length >= MAX_WATCH_LATER) {
    alert("Watch later is full (" + MAX_WATCH_LATER + " videos)");
    return;
  } else {
    list.push(videoId);
  }
  localStorage.setItem("watchLater", JSON.stringify(list));  // array -> text
  updateLaterButton(videoId);
}

function updateLaterButton(videoId) {
  const btn = document.getElementById("laterBtn");
  if (!btn) return;
  const saved = getWatchLater().includes(videoId);
  btn.innerHTML = saved ? "&#10003; Saved" : "&#9200; Watch later";
  btn.classList.toggle("active", saved);
}
updateLaterButton(1);

// 13c. Timers: autoplay the next video after a 5-second countdown
let autoplayTimer = null;

function startAutoplay() {                           // runs when the video ends
  autoplaySeconds = 5;
  document.getElementById("autoplayBox").style.display = "block";
  document.getElementById("countdown").innerText = autoplaySeconds;
  autoplayTimer = window.setInterval(function () {
    autoplaySeconds--;
    document.getElementById("countdown").innerText = autoplaySeconds;
    if (autoplaySeconds === 0) {
      window.clearInterval(autoplayTimer);
      window.location.href = "index.html#video-css-flexbox";   // go to next video
    }
  }, 1000);
}

function cancelAutoplay() {
  window.clearInterval(autoplayTimer);
  document.getElementById("autoplayBox").style.display = "none";
}

// 13d. Screen and browser information
console.log("Window size:", window.innerWidth, "x", window.innerHeight);
console.log("Online:", navigator.onLine, "| Language:", navigator.language);
console.log("This page:", window.location.pathname);

// ---------- 14. Frame objects ----------

// 14a. Embed code for other websites (string building)
function showEmbedCode() {
  const box = document.getElementById("embedCode");
  const width = 560, height = 315;
  box.value = `<iframe src="${window.location.origin}/embed.html" width="${width}" height="${height}" title="eTube video"></iframe>`;
  box.style.display = "block";
  box.select();
}

// 14b. The channel page talks to its embedded player
function talkToFrame() {
  const info = document.getElementById("frameInfo");
  info.innerText = "Frames on this page: " + window.frames.length;
  const frameWindow = window.frames["playerFrame"];         // the frame's own window
  frameWindow.document.body.classList.toggle("highlight");  // same site: allowed
}
