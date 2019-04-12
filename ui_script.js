window.onload = () => {
    document.getElementById("import_button").addEventListener("click", import_file)

    document.getElementById("export_button").addEventListener("click", export_file)

    document.getElementById("new_entity_button").addEventListener("click", new_entity)

    document.getElementById("new_component_button").addEventListener("click", new_component)

}

function get_filepath() {
    return document.getElementById("filepath_input").value
}

function add_entity_ui(n) {
    var entity = document.querySelector("div[data-type='entity_template']").cloneNode(true)
    entity.setAttribute("data-type", "")
    entity.querySelector("div[data-type='id']").innerHTML = n
    entity.id = "entity-"+n
    entity.querySelector("div[data-type='id']").addEventListener("click", (function() {
        var x = n
        return function() {
            var list = document.getElementById("entity_list").querySelectorAll("div[data-type='id']")
            for (n in list) {
                if (list[n].classList)
                    list[n].classList.add("is-outlined")
            }
            document.getElementById("entity-"+x).querySelector("div").classList.remove("is-outlined")
            remove_all_ui("components")
            remove_all_ui("data")
            select_entity(x)
        }
    })(n))
    document.getElementById("entity_list").appendChild(entity)
}

function add_component_ui() {
    var component = document.querySelector("div[data-type='component_template']").cloneNode(true)
    component.setAttribute("data-type", "")
    component.querySelector("input").addEventListener("keyup", () => {
        component.querySelector("div[data-type='valid']").classList.remove("is-warning")
        if (valid_component(component.querySelector("input").value)) {
            component.querySelector("div[data-type='valid']").classList.remove("is-danger")
            component.querySelector("div[data-type='valid']").classList.add("is-primary")
        } else {
            component.querySelector("div[data-type='valid']").classList.add("is-danger")
            component.querySelector("div[data-type='valid']").classList.remove("is-primary")
        }
    })
    document.getElementById("component_list").appendChild(component)
}

function add_data_ui(name, data) {
    var data = document.querySelector("div[data-type='data_template']").cloneNode(true)
    data.attributes["data-type"] = ""
    data.querySelector("div[data-type='name']").innerHTML = name
    data.querySelector("input").innerHTML = data
    document.getElementById("data_list").appendChild(data)
}

function remove_all_ui(col) {
    var node;
    switch (col) {
        case "entities":
            node = document.getElementById("entity_list")
            break;
        case "components":
            node = document.getElementById("component_list")
            break;
        case "data":
            node = document.getElementById("data_list")
            break;
    }
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}