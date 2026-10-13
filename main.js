const $ = (s) => document.querySelector(s),
  root = document.documentElement;
// theme
try {
  const t = localStorage.getItem("theme");
  if (t) root.dataset.theme = t;
} catch (e) {}
const tb = $("#theme");
const icon = () => (tb.textContent = root.dataset.theme === "dark" ? "☾" : "☀");
icon();
tb.onclick = () => {
  const t = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = t;
  icon();
  try {
    localStorage.setItem("theme", t);
  } catch (e) {}
};
// menu
$("#menu").onclick = () => $("#links").classList.toggle("open");
document
  .querySelectorAll("#links a")
  .forEach((a) => (a.onclick = () => $("#links").classList.remove("open")));
// typing
const roles = [
  "Frontend Developer",
  "Backend Developer",
];
let ri = 0,
  ci = 0,
  del = false;
(function type() {
  const w = roles[ri];
  $("#type").textContent = w.slice(0, ci);
  if (!del && ci === w.length) {
    del = true;
    return setTimeout(type, 1400);
  }
  if (del && ci === 0) {
    del = false;
    ri = (ri + 1) % roles.length;
  }
  ci += del ? -1 : 1;
  setTimeout(type, del ? 40 : 80);
})();
// skills marquee
const sk = [
  "PHP",
  "Laravel",
  "REST API",
  "MySQL",
  "HTML",
  "CSS",
  "bootstrap",
  "Tailwind",
  "jQuery",
  "JavaScript",
  "typeScript",
  "React",
  "Responsive",
  "Git",
  "Python",
];
$("#track").innerHTML = [...sk, ...sk].map((s) => `<span>${s}</span>`).join("");
// reveal + bars
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
// counters
document.querySelectorAll("[data-n]").forEach((el) => {
  const n = +el.dataset.n;
  let i = 0;
  const t = setInterval(() => {
    el.textContent = ++i;
    if (i >= n) clearInterval(t);
  }, 500);
});
// photo tilt + glow
const ph = $("#photo"),
  fr = $("#frame");
ph.addEventListener("mousemove", (e) => {
  const r = ph.getBoundingClientRect(),
    x = (e.clientX - r.left) / r.width - 0.5,
    y = (e.clientY - r.top) / r.height - 0.5;
  fr.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
});
ph.addEventListener("mouseleave", () => (fr.style.transform = ""));
const g = $("#glow");
addEventListener("mousemove", (e) => {
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
});
// form -> mailto
$("#form").onsubmit = (e) => {
  e.preventDefault();
  const f = e.target;
  location.href = `mailto:your-email@example.com?subject=${encodeURIComponent("Portfolio message from " + f.n.value)}&body=${encodeURIComponent(f.m.value + "\n\n" + f.e.value)}`;
};
$("#yr").textContent = new Date().getFullYear();
