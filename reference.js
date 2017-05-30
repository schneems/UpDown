var reBlank = /^\s*$/;
function xmlfix(node) {
    var child, next;
    switch (node.nodeType) {
        case 3: // Text node
            if (reBlank.test(node.nodeValue)) {
                node.parentNode.removeChild(node);
            }
            break;
        case 1: // Element node
        case 9: // Document node
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                xmlfix(child);
                child = next;
            }
            break;
    }
}
function processXML(xmlOut) {
    var xml = xmlOut.responseXML;
    var x = xml.documentElement.childNodes;
    xmlfix(x);
    var htmlOut = document.getElementById("referencecontent");
    var i;
    for (i = 0; i < x.length; i++) {
        var el = x[i];
        htmlOut.innerHTML += "<div>";
        var inner = el.childNodes;
        var ii;
        for (ii = 0; ii < x.length; ii++) {
            var innerel = inner[ii];
            switch (innerel.nodeName) {
                case "name": 
                    htmlOut.innerHTML += "<h2>";
                    htmlOut.innerHTML += innerel.childNodes[0].nodeValue;
                    htmlOut.innerHTML += "</h2>";
                    break;
                case "code":
                    htmlOut.innerHTML += "Syntax item: <code>";
                    htmlOut.innerHTML += innerel.childNodes[0].nodeValue;
                    htmlOut.innerHTML += "</code>";
                    break;
                case "desc":
                    htmlOut.innerHTML += "<p>";
                    htmlOut.innerHTML += innerel.childNodes[0].nodeValue;
                    htmlOut.innerHTML += "</p>";
            }
        }
        htmlOut.innerHTML += "</div>";
    }
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
    processXML(this);
    }
};
xhttp.open("GET", "reference.xml", true);
xhttp.send();