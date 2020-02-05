let form = document.getElementById("create-form")
let createField = document.getElementById("create-field")
let itemList = document.getElementById("item-list")

function itemTemplate (item) {
  return `
  <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
</li>
  `
}

// Initial Page load render
ourHTML = items.map((item) => {
  return itemTemplate(item)
}).join('')

itemList.insertAdjacentHTML("beforeend", ourHTML)

// Create Feature
form.addEventListener('submit', (e) => {
  e.preventDefault()

  axios.post('/create-item', {text: createField.value})
        .then((response) => {
          // Create the HTML for new item
          itemList.insertAdjacentHTML("beforeend", itemTemplate(response.data))
          createField.value = ''
          createField.focus()
        })
        .catch(() => {
          console.log("Please try again later")
        })
})


document.addEventListener('click', (e) => {
  // Delete Feature
  if (e.target.classList.contains('delete-me')){
    if (confirm("Do you really want to delete this item permanently?")){
      axios.post('/delete-item', {id: e.target.getAttribute("data-id")})
            .then( () => {
              // delete item row
              e.target.parentElement.parentElement.remove()
            })
            .catch( err => {
              console.log(err)
            })
    }
  }

  //Update Feature 
  if(e.target.classList.contains('edit-me')){
    let userInput = prompt(
    // Take input from user
    'Enter your desired new text',

    // Pre-populate prom t with old message
    e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)

    if (userInput) {
      axios.post(
        '/update-item', 
        {text: userInput, id: e.target.getAttribute('data-id')})

            .then(() => {
              // update ui without hot-reload
              e.target.parentElement.parentElement
              .querySelector(".item-text").innerHTML = userInput
            })

            .catch((err) => {
              console.log(err)
            })
    }
  }
})