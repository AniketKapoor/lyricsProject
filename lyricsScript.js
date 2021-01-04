var lyricsJson = {};
function showLyrics(artist, title) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const receivedLyricsJson = JSON.parse(this.responseText);
            displayLyricsJson(receivedLyricsJson);
        }
    };
    xmlhttp.open("GET", 'https://api.lyrics.ovh/v1/' + artist + '/' + title, true);
    xmlhttp.send();
}
function displayLyricsJson(receivedLyricsJson) {
    lyricsJson = receivedLyricsJson;
    var lyrics = document.getElementById("lyrics");
    var lyricsNA = document.getElementById("lyricsNA");
    lyrics.innerHTML = "";
    if (lyricsJson.lyrics != "")
        lyrics.innerHTML += lyricsJson.lyrics;
    else
        lyricsNA.innerHTML += "Song lyrics are not available ";

}
function backClick() {
    window.history.back();
}
window.onload = function () {
    var paramsString = window.location.href.substring(window.location.href.indexOf('?'), window.location.href.length);
    var searchParams = new URLSearchParams(paramsString);
    showLyrics(searchParams.get("artist"), searchParams.get("song"));
    var completeUrl = window.location.href;
};
