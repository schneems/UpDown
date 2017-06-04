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
        for (ii = 0; ii < inner.length; ii++) {
            var innerel = inner[ii];
            var html1 = "";
            var html2 = "";
            var html3 = "";
            switch (innerel.nodeName) {
                case "name": 
                    html1 += "<h2>";
                    html1 += innerel.childNodes[0].nodeValue;
                    html1 += "</h2>";
                    break;
                case "code":
                    html2 += "Syntax item: <code>";
                    html2 += innerel.childNodes[0].nodeValue;
                    html2 += "</code>";
                    break;
                case "desc":
                    html3 += "<p>";
                    html3.innerHTML += innerel.childNodes[0].nodeValue;
                    html3.innerHTML += "</p>";
            }
            var htmldat = [html1, html2, html3];
            for (i = 0; i < 3; i++) {
                var html = htmldat[i];
                if (html != "") {
                    htmlOut += html;
                }
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
