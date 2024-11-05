document.addEventListener("DOMContentLoaded",function(){
   

  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.querySelector(".stats-cards");

  //return ture or false based on a regex
  function validateUsername(username){
    if(username.trim()===""){
      alert("Username should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if(!isMatching){
      alert("invalid username");
    }
    return isMatching;
  }

  

  async function fetchUserDetails(username){
    
    try{
      searchButton.textContent = "Searching...";
      searchButton.disabled = true ;

      const url = `https://leetcode.com/graphql/`
      const myHeaders = new Headers();
      myHeaders.append("content-type" , "application/json");

      const graphql = JSON.stringify({
        query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
        variables: { "username": `${username}` }
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect:"follow"
        };

      const response = await fetch(targetUrl, requestOptions);

      if(!response.ok) {
          throw new Error("Unable to fetch the User details");
        }

      const data = await response.json();
          console.log("Logging data: ", data) ;
    }
    catch(error){
      // console.error("Error fetching user details:", error);
      statsContainer.innerHTML= `<p>No data found </p>`
    }
    finally{
      searchButton.textContent = "Search";
      searchButton.disabled = false ;
    }
  }





  searchButton.addEventListener('click',function(){
    const username = usernameInput.value;
    console.log("logging in username :",username);
    if(validateUsername(username)){
      fetchUserDetails(username); 
    }

  })
  
})