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