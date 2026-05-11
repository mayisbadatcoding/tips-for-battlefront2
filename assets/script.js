console.log("BF2 disaster site loaded.");

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

const classData = {

    assault: {
        tag: "Assault",
        title: "The frontline menace.",
        intro: "Assault is built for aggressive infantry combat. It works best when pushing objectives, staying mobile, and applying pressure before the enemy can react.",

        role: "This class is flexible and dangerous at close-to-medium range. Assault players are usually the first into fights and the first to either save the team or completely throw themselves into death.",

        example: "If your team is attacking an objective room, Assault is excellent for entering quickly and clearing weaker enemies before they can organize.",

        mistakes: "Do not sprint directly into six enemies because you feel confident. Assault is strong, but confidence is not body armor."
    },

    heavy: {
        tag: "Heavy",
        title: "The walking war crime.",
        intro: "Heavy focuses on survivability, suppression, and raw damage output. It is slower than Assault but significantly harder to remove. Secondly, Heavy has fairly better weponary, use this class if you'd like to be strong!",

        role: "Heavy excels at defending hallways, controlling chokepoints, and forcing enemies out of cover with overwhelming firepower.",

        example: "If enemies keep flooding through one doorway, Heavy can completely lock that area down with sentry abilities and sustained pressure.",

        mistakes: "Do not activate sentry while standing in the open like a confused refrigerator.",
    },

    officer: {
        tag: "Officer",
        title: "The battle point printer.",
        intro: "Officer is a support-focused class that becomes extremely valuable when staying near teammates and helping pushes.",

        role: "Officer buffs allies, supports objectives, and earns battle points very quickly when played correctly.",

        example: "Before your team pushes into an objective, use buffs near teammates to strengthen the attack and build points safely.",

        mistakes: "Do not wander off alone trying to become the main character."
    },

    specialist: {
        tag: "Specialist",
        title: "The professional observer.",
        intro: "Specialist is designed for long-range combat, scouting, and lane control.",

        role: "Specialists punish careless movement and force enemies to respect open sightlines.",

        example: "On large maps, Specialist can stop enemies from crossing exposed areas safely.",

        mistakes: "Missing every shot from the back of the map is not helping the team."
    }

};

function openClass(className) {

    const data = classData[className];

    document.getElementById("article-tag").textContent = data.tag;
    document.getElementById("article-title").textContent = data.title;
    document.getElementById("article-intro").textContent = data.intro;
    document.getElementById("article-role").textContent = data.role;
    document.getElementById("article-example").textContent = data.example;
    document.getElementById("article-mistakes").textContent = data.mistakes;

    document.getElementById("class-selection").classList.add("hidden");
    document.getElementById("class-article").classList.remove("hidden");

    window.scrollTo(0, 0);
}

function closeClass() {

    document.getElementById("class-selection").classList.remove("hidden");
    document.getElementById("class-article").classList.add("hidden");

    window.scrollTo(0, 0);
}
const startCreditsButton = document.getElementById("start-credits");
const creditsAudio = document.getElementById("credits-audio");
const audioPanel = document.getElementById("audio-panel");
const toggleMusicButton = document.getElementById("toggle-music");
const volumeSlider = document.getElementById("volume-slider");

if (startCreditsButton && creditsAudio) 
    creditsAudio.volume = 0.45;

  startCreditsButton.addEventListener("click", async () => {

    audioPanel.classList.add("show");

    try {
        await creditsAudio.play();
    } catch (error) {
        console.log("Audio could not autoplay until user interaction.");
    }

    startAutoScroll();

});

let autoScroll;
let userPauseTimeout;
let userIsScrolling = false;

const slowZones = document.querySelectorAll(".reveal-card");

function isNearCard() {
    for (const card of slowZones) {
        const rect = card.getBoundingClientRect();
        const screenMiddle = window.innerHeight / 2;

        if (rect.top < screenMiddle + 180 && rect.bottom > screenMiddle - 180) {
            return true;
        }
    }

    return false;
}

function pauseAutoScrollForUser() {
    userIsScrolling = true;

    clearTimeout(userPauseTimeout);

    userPauseTimeout = setTimeout(() => {
        userIsScrolling = false;
    }, 1200);
}

window.addEventListener("wheel", pauseAutoScrollForUser, { passive: true });
window.addEventListener("touchmove", pauseAutoScrollForUser, { passive: true });
window.addEventListener("keydown", (event) => {
    const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];

    if (scrollKeys.includes(event.key)) {
        pauseAutoScrollForUser();
    }
});

function startAutoScroll() {
    clearInterval(autoScroll);

    autoScroll = setInterval(() => {
        if (userIsScrolling) return;

        const speed = isNearCard() ? 8 : 25;

        window.scrollBy({
            top: speed,
            behavior: "auto"
        });

        const reachedBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

        if (reachedBottom) {
            clearInterval(autoScroll);
        }
    }, 20);
}
if (toggleMusicButton && creditsAudio) {
    toggleMusicButton.addEventListener("click", () => {
        if (creditsAudio.paused) {
            creditsAudio.play();
            toggleMusicButton.textContent = "Pause Music";
        } else {
            creditsAudio.pause();
            toggleMusicButton.textContent = "Play Music";
        }
    });
}

if (volumeSlider && creditsAudio) {
    volumeSlider.addEventListener("input", () => {
        creditsAudio.volume = volumeSlider.value;
    });
}

const revealCards = document.querySelectorAll(".reveal-card");

if (revealCards.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.18
    });

    revealCards.forEach((card) => {
        revealObserver.observe(card);
    });
}
