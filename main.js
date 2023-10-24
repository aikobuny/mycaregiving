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

function sendMessage(url)
{
    let name = getURLParam('name');
    let email = getURLParam('email');
    let phone = getURLParam('phone');
    let message = getURLParam('message');

    let output = 
`
Name: ${name}
Email: ${email}
Phone: ${phone}
Message:
\`\`\`${message}\`\`\`
`

    var xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': output,
        'username':'Mycaregiving',
    }));
}