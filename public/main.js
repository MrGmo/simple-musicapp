const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
  element.addEventListener('click', deleteMusician)
})

async function deleteMusician(){
  const name = this.parentNode.childNodes[1].innerText
  const musicType = this.parentNode.childNodes[3].innerText
  try{
      const response = await fetch('deleteMusician', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'nameVar': name,
            'musicVar': musicType
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}
