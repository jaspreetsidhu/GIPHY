$( document ).ready(function() {
    // An array of rappers, new rappers will be pushed into this array;
    var rappers = ["Tupac", "Kanye West", "2 Chainz", "Gucci Mane", "Jay-Z", "Beyonce", "Pimp C", "Lauryn Hill", "Lil B", "Nas", "Biggie Smalls", "Busta Rhymes", "Eminem", "Andre 3000", "Frank Ocean", "Wu Tang Clan", "Kendrick Lamar", "SZA", "Chance the Rapper"];
    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < rappers.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("rapper");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", rappers[i]);
            gifButton.text(rappers[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new rapper button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var rapper = $("#rapper-input").val().trim();
        if (rapper == ""){
          return false; // added so user cannot add a blank button
        }
        rappers.push(rapper);
    
        displayGifButtons();
        return false;
        });
    }
    // Function to remove last rapper button
        // Doesnt work properly yet 
    function removeLastButton(){
        $("removeGif").on("click", function(){
        rappers.pop(rapper);
        displayGifButtons();
        return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        var rapper = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + rapper + "&api_key=u3cf44ZeALZnIWW8MfIMymaS6HrYDSJD&limit=10";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); // console test to make sure something returns
            $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            var results = response.data; //shows results of gifs
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of rappers already created
    addNewButton();
    removeLastButton();
    // Document Event Listeners
    $(document).on("click", ".rapper", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    