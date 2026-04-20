const TMDB_KEY = "42211d988b061a1ec275f7c96200f540";

/* ---------------- LOAD ---------------- */
function load(type) {
  if (type === "movies") movies();
  if (type === "series") series();
  if (type === "books") books();
  if (type === "music") music();
  if (type === "fitness") fitness();
}

/* ---------------- IMAGE ---------------- */
function img(p) {
  return p ? `https://image.tmdb.org/t/p/w500${p}` : "";
}

/* ---------------- MOVIES ---------------- */
async function movies() {
  const c = document.getElementById("content");
  c.innerHTML = "⏳ Loading...";

  try {
    const r = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`);
    const d = await r.json();

    render(d.results.map(i => ({
      title: i.title,
      img: img(i.poster_path)
    })));

  } catch (e) {
    render([{ title: "Avengers" }, { title: "Inception" }, { title: "Interstellar" }]);
  }
}

/* ---------------- SERIES ---------------- */
async function series() {
  const c = document.getElementById("content");
  c.innerHTML = "⏳ Loading...";

  try {
    const r = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_KEY}`);
    const d = await r.json();

    render(d.results.map(i => ({
      title: i.name,
      img: img(i.poster_path)
    })));

  } catch (e) {
    render([{ title: "Breaking Bad" }, { title: "Stranger Things" }, { title: "The Witcher" }]);
  }
}

/* ---------------- BOOKS (EXPANDED) ---------------- */
function books() {
  render([
    { title: "Atomic Habits - James Clear" },
    { title: "Ikigai - Japanese Secret to Long Life" },
    { title: "Deep Work - Cal Newport" },
    { title: "The Psychology of Money - Morgan Housel" },
    { title: "Rich Dad Poor Dad - Robert Kiyosaki" },
    { title: "Think and Grow Rich - Napoleon Hill" },
    { title: "The Subtle Art of Not Giving a F*ck - Mark Manson" },
    { title: "Can't Hurt Me - David Goggins" },
    { title: "The 48 Laws of Power - Robert Greene" },
    { title: "Zero to One - Peter Thiel" }
  ]);
}

/* ---------------- MUSIC (EXPANDED) ---------------- */
function music() {
  render([
    { title: "Lo-fi Beats to Relax/Study" },
    { title: "Bollywood Chill Hits" },
    { title: "English Pop Playlist 2026" },
    { title: "Workout Motivation Songs" },
    { title: "Arijit Singh Sad Songs" },
    { title: "AR Rahman Classics" },
    { title: "Rap & Hip-Hop Mix" },
    { title: "EDM Festival Mix" },
    { title: "Calm Piano Music" },
    { title: "Sleep Music Rain Sounds" }
  ]);
}

/* ---------------- FITNESS (EXPANDED) ---------------- */
function fitness() {
  render([
    { title: "HIIT Fat Burn Workout" },
    { title: "Beginner Full Body Workout" },
    { title: "Yoga for Flexibility" },
    { title: "Abs 6 Pack Challenge" },
    { title: "Push-Up & Strength Training" },
    { title: "Home Dumbbell Workout" },
    { title: "30 Day Fitness Challenge" },
    { title: "Morning Stretch Routine" },
    { title: "Fat Loss Cardio Training" },
    { title: "Gym Beginner Plan" }
  ]);
}

/* ---------------- RENDER ---------------- */
function render(items) {
  const c = document.getElementById("content");
  c.innerHTML = "";

  items.forEach(i => {
    const d = document.createElement("div");
    d.className = "card";

    d.innerHTML = `
      ${i.img ? `<img src="${i.img}" onerror="this.style.display='none'">` : ""}
      <p>${i.title}</p>
    `;

    // CLICK → Google search
    d.onclick = () => {
      const query = `${i.title} information watch guide`;
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
    };

    c.appendChild(d);
  });
}

/* ---------------- MOOD SYSTEM ---------------- */
function setMood(mood) {
  if (mood === "happy") render([{ title: "Comedy Movies" }, { title: "Happy Songs" }]);
  if (mood === "sad") render([{ title: "Emotional Movies" }, { title: "Sad Music" }]);
  if (mood === "motivated") render([{ title: "Rocky Training" }, { title: "Gym Motivation Music" }]);
  if (mood === "relax") render([{ title: "Calm Music" }, { title: "Yoga Flow" }]);
  if (mood === "energetic") render([{ title: "Action Movies" }, { title: "HIIT Workout" }]);
}

/* ---------------- START ---------------- */
load("movies");
