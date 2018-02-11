function addTodo(){
   
    axios.post('http://localhost:3000/todos', {
        name:  $("#todoadd").val()
    },{
            headers: {
                accessTokenJwt: localStorage.getItem('accessTokenJwt')
            }
    })
        .then(function (response) {
            
            $(".todolist").prepend(`
                  <input type="checkbox" name="" id="checkbox-${response.data.data._id}">
                  <label id="label-${response.data.data._id}" for="${response.data.data._id}">${response.data.data.name}</label>
                  <button onclick="editTodo('${response.data.data._id}')" id="editTodo-${response.data.data._id}">edit</button>
                  <button onclick="editTodo('${response.data.data._id}')" id="deleteTodo-${response.data.data._id}">delete</button>
                  <br>
                `)
            console.log(response,'actoin')

            $("#todoadd").val(' ')
        })
        .catch(function (error) {
            console.log(error);
        });
}

function editTodo(idTodo){
    label = $(`#label-${idTodo}`)
    $("#todoedit").val(label.text())
    localStorage.setItem('todoIdEdit',idTodo)
}

function confirmEdit (){
    let result = confirm('are you sure to edit this name?')
    console.log($("#todoedit").val())
    if(result){
        axios.put(`http://localhost:3000/todos/${localStorage.getItem('todoIdEdit')}`,{
            name: $("#todoedit").val()
        },{
            headers: {
                accessTokenJwt: localStorage.getItem('accessTokenJwt')
            }
        }).then(function(response){
            let label = $(`#label-${localStorage.getItem('todoIdEdit')}`)
            label.text(`${response.data.data.name}`)
            $('#todoedit').val(' ')
        })
        .catch(error=>{console.log(error)})
    }
}



