import drawingsData from "./drawings-data.js";

const gallery = document.getElementById("gallery");

let content = "";
for (const drawing of drawingsData) {
  
  let media = "";
  
  switch (drawing.tag) {
    case "img":
      media = "<img src=\"../pictures/" + drawing.name + "\">"
      break;
    case "video":
      media = "<video width=\"384px\" autoplay muted loop controls>" +
        "<source src=\"../pictures/" + drawing.name + `\" type=\"video/${drawing.name.split('.')[1]}\">`;
      break;
    case "iframe":
      media = "<iframe src=\"" + drawing.link + "\"></iframe>"
      break;
      
    default:
      media = "<div>(Missing file!)</div>";
      break;
  }
  
  content += "<div class=\"drawing\">" +
  "<dt>" + media + "</dt>" +
    "<dd>" + drawing.description +
    (drawing.aside.length > 0 ? "<span class=\"aside\">(" + drawing.aside + ")</span>" : "") +
    "</dd>" +
    "</div>"
}


gallery.innerHTML = content;
