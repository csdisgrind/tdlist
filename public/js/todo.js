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
    let response = await fetch("/api/list", {
        method: 'POST',
        // ASKASK
        // add-role.js 204 & student-profile 20 why no content-type?
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        // when use body: new FormData(form), JSON.stringify
        // body: new URLSearchParams(new FormData(form)),
        // body: new FormData(form),
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    console.log('lol', {response})
    // console.log('222', response.body)

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