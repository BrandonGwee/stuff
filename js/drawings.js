import drawingsData from "./drawings-data.js";

const gallery = document.getElementById("gallery");

let content = "";
for (let i = drawingsData.length-1; i >= 0; i--) {
  
  let media = "";
  
  switch (drawingsData[i].tag) {
    case "img":
      media = "<img src=\"../pictures/" + drawingsData[i].name + "\">"
      break;
    case "video":
      media = "<video width=\"384px\" autoplay muted loop controls>" +
        "<source src=\"../pictures/" + drawingsData[i].name + `\" type=\"video/${drawingsData[i].name.split('.')[1]}\">`;
      break;
    case "iframe":
      media = "<iframe src=\"" + drawingsData[i].link + "\"></iframe>"
      break;
      
    default:
      media = "<div>(Missing file!)</div>";
      break;
  }
  
  content += "<div class=\"drawing\">" +
    "<dt>" + media + "</dt>" +
    "<dd>" + drawingsData[i].description +
    (drawingsData[i].aside.length > 0 ? "<span class=\"aside\">(" + drawingsData[i].aside + ")</span>" : "") +
    "</dd>" +
    "</div>"
}


gallery.innerHTML = content;