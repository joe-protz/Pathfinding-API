// adds an 'editable' attribute to a resource that is true if the item is owned by the current user
const addIsEditable = function (user, item) {
  item.editable = user.id.toString() === item.owner.toString()
  return item
}

module.exports = addIsEditable
