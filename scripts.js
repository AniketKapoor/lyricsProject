var receivedJson = {}, displayHtml = "";
var current_page = 1;
var records_per_page = 5;
function buttonClick() {

    var searchText = document.getElementById("inputLyrics").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const returnedJson = JSON.parse(this.responseText);
            displayReceivedJson(returnedJson);
        }
    };
    xmlhttp.open("GET", 'https://api.lyrics.ovh/suggest/' + searchText, true);
    xmlhttp.send();
}
function displayReceivedJson(returnedJson) {
    receivedJson = returnedJson;
    changePage(1);
}
function numPages() {
    return Math.ceil(receivedJson.data.length / records_per_page);
}
function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1)
        page = 1;
    if (page > numPages())
        page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        if (i == receivedJson.data.length)
            break;
        //listing_table.innerHTML += receivedJson.data[i].title + "<br>";
        listing_table.innerHTML += '<div class=\"clearfix\"><div class=\"leftdiv\"><br><img src=\"' + receivedJson.data[i].artist.picture_small + '\" alt=\"' + receivedJson.data[i].artist.name + '\"></img></div><div class=\"rightDiv\"><a href=\"lyricsPage.html?artist=' + receivedJson.data[i].artist.name + '&song=' + receivedJson.data[i].title + '\">Title: ' + receivedJson.data[i].title + '<br>Artist: ' + receivedJson.data[i].artist.name + '</a></div></div><br>'
    }
    page_span.innerHTML = 'page:' + page;

    if (page == 1) {
        //       btn_prev.style.visibility = "hidden";
        page_span.style.visibility = "visible"
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}
window.onload = function () {
    btn_next.style.visibility = "hidden";
    btn_prev.style.visibility = "hidden";
    document.getElementById("page").style.visibility = "hidden";
};
