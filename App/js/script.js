// Fetch teams JSON
  var teams = null;
  fetch("./data/teams-object.json").then(function(response) {
    return response.json();
  }).then(function(json) {
    teams = json.results;
    if (window.location.pathname=='/teamview.html') {
        getTeamData(teams);
    }
  })
//
// Fetch fixtures JSON
  var fixtures = null;
  fetch("./data/fixtures-object.json").then(function(response) {
    return response.json();
  }).then(function(json) {
    fixtures = json.results;
    if (window.location.pathname=='/teamview.html') {
        getTeamFixtureData(fixtures);
    }
    if (window.location.pathname=='/fixtures.html') {
        getAllFixtures(fixtures);
    }
  });
//




//Team search
if (window.location.pathname=='/search.html') {
  const searchBox=document.querySelector("#search-box"); //get hold of the search box
  searchBox.focus();
}

  function doSearch(team){
    const searchBox=document.querySelector("#search-box");
    searchBox.focus();
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    teams.forEach(function(team){
        const teamList = document.querySelector("#team-list");
        while(teamList.firstChild){
          teamList.removeChild(teamList.firstChild)
        }
        while(searchTerm.length == 0){
          teamList.removeChild(teamList.firstChild)
        }
          teams.forEach(function(team){if(team.name.toLowerCase().search(searchTerm)>-1){
            teamListItem = "<a id='" + team.teamID + "' href='teamview.html?teamid=" + team.teamID + "'><p>" + team.name + "</p>";
            document.getElementById("team-list").innerHTML += teamListItem;
            }
          }
        )
      }
    )
  }
  if (window.location.pathname=='/search.html') {
    const key=document.getElementById("search-box");
    key.addEventListener("keyup", doSearch, false);
}
//

//Get teamID from url
var retreivedLat = null;
var retreivedLong = null;

function getTeamData(teams){
  const url = window.location.search;
  const urlTeamID = url.split("teamid=")[1];
  console.log(urlTeamID);
  teams.forEach(team => {
    if(team.teamID == urlTeamID){
      retreivedLat = parseFloat(team.stadiumLat);
      retreivedLong = parseFloat(team.stadiumLong);

      console.log(team.name);
      teamDataItem = "<img class='animate__animated animate__fadeInDown' src='" + team.logoLightBig + "'>";
      document.getElementById("team-data-grid__logo").innerHTML += teamDataItem;
      teamDataItem = "<h2 class='standard-h2 animate__animated animate__fadeInDown'>" + team.name + "</h2>";
      document.getElementById("team-data-grid__name").innerHTML += teamDataItem;
      teamDataItem = "<img class='animate__animated animate__fadeInDown' src='" + team.leagueLogo + "'>";
      document.getElementById("team-data-grid__league").innerHTML += teamDataItem;
      teamDataItem = "<p class='standard-p animate__animated animate__fadeInDown'>" + team.stadium + "</p>";"<a href='map.html?teamid=" + team.teamID + "'> (View on map)</a>";
      document.getElementById("team-data-grid__stadium").innerHTML += teamDataItem;
    }
  });
}

//

// Google Maps API
let map;

setTimeout(initMap, 500);

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: retreivedLat, lng: retreivedLong },
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER,
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER,
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
    fullscreenControl: true,
  });
  new google.maps.Marker({
    position: { lat: retreivedLat, lng: retreivedLong },
    map,
    title: "Stadium",
  });
}
//

//Get team view fixtures
function getTeamFixtureData(fixtures){
  const url = window.location.search;
  const urlTeamID = url.split("teamid=")[1];
  fixtures.forEach(fixture => {
    if((fixture.homeTeamID == urlTeamID) || (fixture.awayTeamID == urlTeamID)){
      console.log(fixture.fixtureid);
      var currentHomeTeamID = fixture.homeTeamID;
      var currentAwayTeamID = fixture.awayTeamID;
      teamDataItem = "<div id='team-fixtures-grid" + fixture.fixtureid +"' class='team-fixtures-grid'>";
      document.getElementById("fixtures-grid-wrapper").innerHTML += teamDataItem;
      teamDataItem = "<div class='team-fixtures-grid__datetime' id='team-fixtures-grid__datetime'><p class='fixtures-p animate__animated animate__fadeInDown'>" + fixture.kickoffTime + "</p></div>";
      document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
      teams.forEach(team => {
        if(currentHomeTeamID == team.teamID){
          teamDataItem = "<div class='team-fixtures-grid__homelogo' id='team-fixtures-grid__homelogo'><a href='teamview.html?teamid=" + team.teamID + "'><img class='animate__animated animate__fadeInDown' src='" + team.logoLightSmall + "'></a></div>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
          teamDataItem = "<div class='team-fixtures-grid__homename' id='team-fixtures-grid__homename'><a href='teamview.html?teamid=" + team.teamID + "'><p class='fixtures-p animate__animated animate__fadeInDown'>" + team.name + "</div></a></p>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
          teamDataItem = "<div class='team-fixtures-grid__vs' id='team-fixtures-grid__vs'><p class='animate__animated animate__fadeInDown fixtures-p'>vs</p></div>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
        }

        if(currentAwayTeamID == team.teamID){
          teamDataItem = "<div class='team-fixtures-grid__awaylogo' id='team-fixtures-grid__awaylogo'><a href='teamview.html?teamid=" + team.teamID + "'><img class='animate__animated animate__fadeInDown' src='" + team.logoLightSmall + "'></a></div>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
          teamDataItem = "<div class='team-fixtures-grid__awayname' id='team-fixtures-grid__awayname'><a href='teamview.html?teamid=" + team.teamID + "'><p class='fixtures-p animate__animated animate__fadeInDown'>" + team.name + "</div></a></p>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
        }
      });
      teamDataItem = "</div>";
      document.getElementById("fixtures-grid-wrapper").innerHTML += teamDataItem;
    }else{
      console.log("Broken");
    }
  });
}
//

// Get all Fixtures
function getAllFixtures(fixtures){
  fixtures.forEach(fixture => {
      console.log(fixture.fixtureid);
      var currentHomeTeamID = fixture.homeTeamID;
      var currentAwayTeamID = fixture.awayTeamID;
      teamDataItem = "<div id='team-fixtures-grid" + fixture.fixtureid +"' class='team-fixtures-grid'>";
      document.getElementById("fixtures-grid-wrapper").innerHTML += teamDataItem;
      teamDataItem = "<div class='team-fixtures-grid__datetime' id='team-fixtures-grid__datetime'><p class='fixtures-p animate__animated animate__fadeInDown'>" + fixture.kickoffTime + "</p></div>";
      document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
      teams.forEach(team => {
        if(currentHomeTeamID == team.teamID){
          teamDataItem = "<div class='team-fixtures-grid__homelogo' id='team-fixtures-grid__homelogo'><a href='teamview.html?teamid=" + team.teamID + "'><img class='animate__animated animate__fadeInDown' src='" + team.logoLightSmall + "'></a></div>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
          teamDataItem = "<div class='team-fixtures-grid__homename' id='team-fixtures-grid__homename'><a href='teamview.html?teamid=" + team.teamID + "'><p class='fixtures-p animate__animated animate__fadeInDown'>" + team.name + "</div></a></p>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
          teamDataItem = "<div class='team-fixtures-grid__vs' id='team-fixtures-grid__vs'><p class='animate__animated animate__fadeInDown fixtures-p'>vs</p></div>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
        }
        if(currentAwayTeamID == team.teamID){
          teamDataItem = "<div class='team-fixtures-grid__awaylogo' id='team-fixtures-grid__awaylogo'><a href='teamview.html?teamid=" + team.teamID + "'><img class='animate__animated animate__fadeInDown' src='" + team.logoLightSmall + "'></a></div>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
          teamDataItem = "<div class='team-fixtures-grid__awayname' id='team-fixtures-grid__awayname'><a href='teamview.html?teamid=" + team.teamID + "'><p class='fixtures-p animate__animated animate__fadeInDown'>" + team.name + "</div></a></p>";
          document.getElementById("team-fixtures-grid" + fixture.fixtureid).innerHTML += teamDataItem;
        }
      });
      teamDataItem = "</div>";
      document.getElementById("fixtures-grid-wrapper").innerHTML += teamDataItem;
  });
}
//
