function new_entity() {
    add_entity_ui(next_id)
    entities[next_id] = ["nothing", "nothing"]
    next_id++
}

function new_component() {
    if (current_entity == -1) return
    add_component_ui()
}

function select_entity(id) {
    console.log("SELECTED ENTITY "+id)
    current_entity = id
   
}

function select_component(id) {
    console.log("   SELECTED COMPONENT "+id)
    remove_all_ui("data")
}

var next_id = 0
var current_entity = -1
var entities = {}
var component_list = [
    "Animation",
    "Movement"
]

function valid_component(name) {
    return component_list.includes(name)
}