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
        var inner = el.childNodes;
        var divOut = document.createElement("div");
        htmlOut.appendChild(divOut);
        var ii;
        for (ii = 0; ii < inner.length; ii++) {
            var innerel = inner[ii];
            var html1, html2, html3;
            switch (innerel.nodeName) {
                case "name": 
                    html1 = document.createElement("h2");
                    html1.appendChild(document.createTextNode(innerel.childNodes[0].nodeValue));
                    break;
                case "code":
                    html2 = document.createElement("p");
                    html2.appendChild(document.createTextNode("Syntax example: "));
                    var pre = document.createElement("pre");
                    html2.appendChild(pre);
                    var code = document.createElement("code");
                    pre.appendChild(code);
                    code.appendChild(document.createTextNode(innerel.childNodes[0].nodeValue));
                    break;
                case "desc":
                    html3 = document.createElement("p");
                    html3.appendChild(document.createTextNode(innerel.childNodes[0].nodeValue));
            }
            var htmldat = [html1, html2, html3];
            for (i = 0; i < 3; i++) {
                var html = htmldat[i];
                if (html) {
                    divOut.appendChild(html);
                }
            }
        }
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
