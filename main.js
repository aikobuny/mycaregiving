var activeDropdown = "";

function includeHTML()
{
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }      
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

function dropdown(id)
{
    console.log(id);
    let dropdownArray = ["OurStory", "Services"];
    for (let i=0; i<dropdownArray.length; i++) {
        document.getElementById(id).style.display = "hidden";
    }
    if (activeDropdown === id) {
        document.getElementById(id).style.display = "hidden";
        activeDropdown = "";
    } 
}

function goto(dir)
{
    window.location.href = dir;
}

function scrollBottom()
{
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function getURLParam(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function sendContact(url)
{
    let name = getURLParam('name');
    let email = getURLParam('email');
    let phone = getURLParam('phone');
    let message = getURLParam('message');

    let output = 
`
**Name:** \`${name}\`
**Email:** \`${email}\`
**Phone:** \`${phone}\`
**Message:**
\`\`\`${message}\`\`\`
`;
    if (name != undefined) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", def("aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTIxMzQ5ODkxMzE1MjMwMzE5NC9lZE4yRDgtZy1zZVpkODVHdWNGeG5jeHZxanVUbjVNX1hIaWw2OUxqdXhfaENuUEl0aUZ3cm5xbU4tSjNGYTk1RlVzTg=="), true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        'content': output,
        'username':'Contact',
      }));
    }
}

function sendMessage(text) {
	let user = {content: text};
	let options = {method: 'POST', body: JSON.stringify(user), headers: {'Content-Type': 'application/json'}}
	fetch(atob("aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTIxMzUwMTA3MjY3MzM0MTQ5MC9ZcWtkWXhyR213WmRTei1Db1VwYTVrRVR6ZU5yd3duTlROYjNVSlhYdklwcmJDMDQ2M3RkeW9kWDdFZTI5YjhIRktCMA=="), options)
} 

function visitor() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
					sendMessage(`# Someone just visited\n\`\`\`${xhr.responseText}\`\`\``)
			}
	}
	xhr.open('GET', atob('aHR0cHM6Ly9pcGFwaS5jby9qc29u'), true);
	xhr.send(null);
} 