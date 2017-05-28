var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    processXML(this);
    }
};
xhttp.open("GET", "reference.xml", true);
xhttp.send();
