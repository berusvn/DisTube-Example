module.exports = {
    status: function (author, queue) {
        let request = `Request by: ${author}`
        let status = `Volume: ${queue.volume}% | Filter: ${queue.filter || "Off"} | Loop: ${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"} | Autoplay: ${queue.autoplay ? "On" : "Off"}`;
        let footer = request + `\n` + status;
        return footer;
    }
}