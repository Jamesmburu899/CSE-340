const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
  let data = [
    { text: "Home", link: "/" },
    { text: "Custom", link: "/custom" },
    { text: "Sedan", link: "/sedan" },
    { text: "SUV", link: "/suv" },
    { text: "Truck", link: "/truck" }
  ]
  let list = "<ul>"
  data.forEach(item => {
    list += "<li>"
    list += `<a href="${item.link}">${item.text}</a>`
    list += "</li>"
  })
  list += "</ul>"
  return list
}

module.exports = Util