// Language: javascript
// Path: client/index.js
var total = 0;

// function to display the data in two different ways: in a table and as a tree
function displayPlants() {
    // get the data from the server and display it as a table
    $.get("http://localhost:3000/plants", function(data) {
        var table = $("<table border='1'></table>").css({
            "border-collapse": "collapse",
            "border-spacing": "0",
            "width": "75%",
            "margin": "auto",
            "margin-top": "20px"
        });
        var header = $("<tr>");
        header.append("<th>Plant_Name</th>");
        header.append("<th>Leaf_Color</th>");
        header.append("<th>Leaf_Shape</th>");
        header.append("<th>Stem_Color</th>");

        table.append(header);
        var cnt = -1;
        for (var i = 0; i < data.length; i++) {
            cnt++;
            var row = $("<tr>");
            row.append("<td class='" + cnt.toString() + "'>" + data[i].name + "</td>");
            cnt++;
            row.append("<td class='" + cnt.toString() + "'>" + (data[i].leaf_color == null ? " " : data[i].leaf_color) + "</td>");
            cnt++;
            row.append("<td class='" + cnt.toString() + "'>" + (data[i].leaf_shape == null ? " " : data[i].leaf_shape) + "</td>");
            cnt++;
            row.append("<td class='" + cnt.toString() + "'>" + (data[i].stem_color == null ? " " : data[i].stem_color) + "</td>");
            table.append(row);
        }
        total = cnt;
        $("#plants-table").append(table);
    });

    // display the data as a tree
    $.get("http://localhost:3000/plants", function(data) {
        var allPlants = $("<ul>");
        allPlants.append("<li class='parent_li'><span>All Plants</span></li>");
        var tree = $("<ul>");
        var cnt = -1;
        for (var i = 0; i < data.length; i++) {
            cnt++;
            var node = $("<li class='parent_li'>");
            node.append("<span onClick='highlight(event)' class='"+ cnt.toString() + "'>" + data[i].name + "</span>");
            var ul = $("<ul>");
            cnt++;
            if (data[i].leaf_color != null) {
                ul.append("<li><span onClick='highlight(event)' class='"+ cnt.toString() + "'>" + "Leaf Color: " + (data[i].leaf_color == null ? " " : data[i].leaf_color) + "</span></li>");
            }
            cnt++;
            if (data[i].leaf_shape != null) {
                ul.append("<li><span onClick='highlight(event)' class='"+ cnt.toString() + "'>" + "Leaf Shape: " + (data[i].leaf_shape == null ? " " : data[i].leaf_shape) + "</span></li>");
            }
            cnt++;
            if (data[i].stem_color != null) {
                ul.append("<li><span onClick='highlight(event)' class='"+ cnt.toString() + "'>" + "Stem Color: " + (data[i].stem_color == null ? " " : data[i].stem_color) + "</span></li>");
            }
            ul.append("</ul>");
            node.append(ul);
            node.append("</li>");
            tree.append(node);
        }
        tree.append("</ul>");
        allPlants.append(tree);
        $("#plants-tree").append(allPlants);
    }
    );
}

function highlight(event) {
    // initially remove all the highlights
    for (var i = 0; i < total; i++) {
        $("." + i.toString()).removeClass("highlight");
    }
    // add the highlight to the clicked element
    $("." + event.target.className).addClass("highlight");
}

// call the displayPlants function to display the plants on the page when the page loads
displayPlants();