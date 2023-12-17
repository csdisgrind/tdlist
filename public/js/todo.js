document.querySelector('#new-list').addEventListener('click', function() {
    console.log('is clicked')
    newListDialog.show()
})

async function confirmCreateList(event){
    console.log('submitted 1')
    event.preventDefault()
    console.log('passed default 1');

    let form = event.target
    // console.log({form})
    let response = await fetch(form.action, {
        method: form.method,
        // ASKASK
        // add-role.js 204 & student-profile 20 why no content-type?
        headers: {
            "Content-Type": form.enctype,
            Accept: "application/json",
          },
        // when use body: new FormData(form), JSON.stringify
        // body: new URLSearchParams(new FormData(form)),
        body: new FormData(form),
    });
    // fail to console log res
    console.log({response})

    let result = await response.json()
    console.log('hahihi', {result})

    //ASKASK
    // why no result.err but in HEYSLASH we result.error
    if (result.err) {
        console.log('eee', result.err);
        alert(result.err)
        return
    } else {
        console.log('successfully created a new list');
    }
    
}

document.querySelector('#new-item').addEventListener('click', function(){
    console.log('adding new item...')
    newItemDialog.show()
})

function confirmCreateItem(event){
    console.log('submitted 2');
}