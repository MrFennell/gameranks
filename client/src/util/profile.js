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


