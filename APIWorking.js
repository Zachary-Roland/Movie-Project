/**
 * Populate year option dropdown
 */
const startYear = 1940;
const thisYear = new Date().getFullYear();
const yearDropdown = document.getElementById("yearDropdown");

for (let year = startYear; year <= thisYear; year++) {
  const option = document.createElement("option");
  option.value = year
  option.text = year
  yearDropdown.appendChild(option)
}

document
  .getElementById("test")
  .addEventListener("click", function fetchTest() {
    //remove prior results if any
    const node = document.getElementById("main");
    node.querySelectorAll('*').forEach(n => n.remove());
    //set up variables for search results, with url snippets
    const title = "&s=" + document.getElementById("searchBox").value;
    const radios = document.getElementsByName("type");
    const year = `&y=${document.getElementById("yearDropdown").value}`
    //make type equal to the checked radio button.
    for (var radio of radios) {
      if (!radio.checked) {
        continue;
      }

      if (title.length < 5) {
        document.getElementById("main").innerText = "Please enter 5 or more characters!"
        return
      }

      const type = "&type=" + radio.value;
      document.getElementById("main").innerText = ""
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
          const resultLength = res.totalResults;
          let resultsText = `Showing 10 of ${resultLength} results:` 

          if (!resultLength) {
            resultsText = 'No movies found'
          }

          document.getElementById("main").innerText = resultsText;

          //TODO Could use a forEach instead of a for loop? Look into later
          res.Search.forEach((movie) => {
            const { Title, Type, Year, Poster } = movie
            const div = document.createElement("div")
            //Add search results to the text of the new div
            let textContent = document.createTextNode(`${Title} (${Type}, ${Year})`);
            const newDiv = document.getElementById("main").appendChild(div);
            let img = document.createElement("img");
            let linebr = document.createElement("br")
            img.src = Poster;
            img.title = "movie poster (broken image link)";
            newDiv.appendChild(textContent)
            newDiv.appendChild(linebr)
            newDiv.appendChild(img)
            document.getElementById("main").appendChild(newDiv);
            newDiv.classList.add("results")
          })
        });
      // Only on radio button can be selected at once, so once we have found the selected one, we can stop iterating
      break;
    }   
  });