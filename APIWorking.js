document
        .getElementById("test")
        .addEventListener("click", function fetchTest() {
          //remove prior results if any
          const node = document.getElementById("main");
          node.querySelectorAll('*').forEach(n => n.remove());
          //set up variables for search results, with url snippets
          const title = "&s=" + document.getElementById("searchBox").value;
          const radios = document.getElementsByName("type");
          //creat type variable to be used later
          let type;
          const e = document.getElementById("yearDropdown");
          const year = "&y=" + e.value;
          //make type equal to the checked radio button.
          for (var radio of radios) {
            if (radio.checked) {
          type = "&type=" + radio.value;
          //run search with user inputs
          fetch("http://www.omdbapi.com/?apikey=5d6248fb" + title + type + year)
          //log results
          .then(function (response) {
                console.log(response);
                //if response is NOT ok show response status
                if (!response.ok) {
                  console.log(response.status);
                }
                return response.json();
              })
              .then(function (res) {
                console.log(res); 
                //TODO Could use a forEach instead of a for loop? Look into later
                for (let i = 0; i < res.Search.length; i++) {
                  //creat variables for each index of results
                  let resultsTitle = res.Search[i].Title
                  let resultsType = res.Search[i].Type
                  let resultsYear = res.Search[i].Year
                  // code to create divs to hold search results
                  const main = document.getElementById("main");
                  const div = document.createElement("div")
                  //Add search results to the text of the new div
                  let textContent = document.createTextNode(`${resultsTitle}, ${resultsType}, ${resultsYear}.`);
                  const newDiv = document.getElementById("main").appendChild(div);
                  let poster = res.Search[i].Poster;
                  let img = document.createElement("img");
                  let linebr = document.createElement("br")
                  img.src = poster;
                  img.title = "movie poster (broken image link)";
                  newDiv.appendChild(textContent)
                  newDiv.appendChild(linebr)
                  newDiv.appendChild(img)
                  document.getElementById("main").appendChild(newDiv);
                  newDiv.classList.add("results")
                  
                  // Console log test to make sure it's working:
                  // console.log(`Title: ${resultsTitle} Type: ${resultsType} Year: ${resultsYear}`)
                }
              });
            }};
          });