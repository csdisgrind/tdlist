document.querySelector('#new-list').addEventListener('click', function() {
    console.log('is clicked')
    newListDialog.show()
})

submitNewList.addEventListener('click', async function(event){
    console.log('step 1');
    newListDialog.close()
    event.preventDefault()
    console.log('step 2');

    const response = await fetch(`/api/list?name=${listName.value}`, {
        method: 'POST',
    })
    console.log('lol', response);

    const result = await response.json()
    if(result.err) {
        console.log('eeerrr', result.err)
        inputListMessage.textContent = 'Failed to create a new list!'
        return
    } else {
        console.log('successfully created a new list');
        inputListMessage.textContent = 'Created new list!'
    }
})

async function showLists() {
    
}

// async function confirmCreateList(event){
//     console.log('submitted 1')
//     event.preventDefault()
//     console.log('passed default 1');

//     // let form = event.target

//     // console.log({form})
//     let response = await fetch(`/api/list?name=${inputName.value}`, {
//         method: 'POST',
//         // ASKASK
//         // add-role.js 204 & student-profile 20 why no content-type?
//         // headers: {
//         //     "Content-Type": "application/json",
//         //     Accept: "application/json",
//         //   },
//         // // when use body: new FormData(form), JSON.stringify
//         // // body: new URLSearchParams(new FormData(form)),
//         // // body: new FormData(form),
//         // body: JSON.stringify({name:form.inputValue.value})
//     });
//     console.log('lol', {response})
//     // console.log('222', response.body)

//     let result = await response.json()
//     console.log('hahihi', {result})

//     //ASKASK
//     // why no result.err but in HEYSLASH we result.error
//     if (result.err) {
//         console.log('eee', result.err);
//         alert(result.err)
//         return
//     } else {
//         console.log('successfully created a new list');
//         document.querySelector('#newListMessage').textContent = 'Created new list!'
//     }
    
// }

document.querySelector('#new-item').addEventListener('click', function(){
    console.log('adding new item...')
    newItemDialog.show()
})

function confirmCreateItem(event){
    console.log('submitted 2');
}