export const xmlToJson = (xml) => {
    var js_obj = {};
    if (!xml) return null;
    if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
            js_obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                js_obj["@attributes"][attribute.nodeName] = attribute.value;
            }
        }
    } else if (xml.nodeType == 3) {
        js_obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (js_obj[nodeName]) == "undefined") {
                js_obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (js_obj[nodeName].push) == "undefined") {
                    var old = js_obj[nodeName];
                    js_obj[nodeName] = [];
                    js_obj[nodeName].push(old);
                }
                js_obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return js_obj;
};