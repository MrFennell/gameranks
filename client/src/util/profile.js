export const loadProfile = () => (
    fetch("/api/profile/loadProfile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
);

export const loadGames = games => (
    fetch("/api/profile/loadGames", {
        method: "GET",
        body: JSON.stringify(games),
        headers: {
            "Content-Type": "application/json"
        }
    })
);

export const updateLike = game => (
    fetch("/api/profile/likes", {
        method: "POST",
        body: JSON.stringify(game),
        headers: {
            "Content-Type": "application/json"
        }
    })
);

export const updatePlayed = game => (
    fetch("/api/profile/played", {
        method: "POST",
        body: JSON.stringify(game),
        headers: {
            "Content-Type": "application/json"
        }
    })
);

export const updateWant = game => (
    fetch("/api/profile/want", {
        method: "POST",
        body: JSON.stringify(game),
        headers: {
            "Content-Type": "application/json"
        }
    })
);


