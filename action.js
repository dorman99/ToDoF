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
                <div id="todo-${response.data.data._id}">
                  <input onclick="complenation('${response.data.data._id}')" type="checkbox" name="" id="checkbox">
                  <label id="label-${response.data.data._id}" for="${response.data.data._id}">${response.data.data.name}</label>
                  <button onclick="editTodo('${response.data.data._id}')" id="editTodo-${response.data.data._id}">edit</button>
                  <button onclick="deleteTodo('${response.data.data._id}')" id="deleteTodo-${response.data.data._id}">delete</button>
                  <br>
                  </div>
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
            console.log(localStorage.arrayTodo.split(','))
            let label = $(`#label-${localStorage.getItem('todoIdEdit')}`)
            let striked = response.data.data.name.strike()
           if(response.data.data.status){
               label.html(striked)
           }else{
               label.html(response.data.data.name)
           }
            $('#todoedit').val(' ')
            
        })
        .catch(error=>{console.log(error)})
    }
}

function complenation(idTodo){
    axios.put(`http://localhost:3000/todos/${idTodo}/completenation`,{},{
        headers:{
            accessTokenJwt: localStorage.getItem('accessTokenJwt')
        }
    })
    .then(function(response){
        let striked = response.data.data.name.strike()
        if(response.data.data.status){
            $(`#label-${idTodo}`).html(striked)
        }else {
            $(`#label-${idTodo}`).html(response.data.data.name)
        }

    })
}

function deleteTodo(idTodo){
    let result = confirm('want to delete this todo?')
    if(result){
        axios.delete(`http://localhost:3000/todos/${idTodo}`, {
            headers: {
                accessTokenJwt: localStorage.getItem('accessTokenJwt')
            }
        })
            .then(function (response) {
                $(`#todo-${idTodo}`).fadeOut('slow')
            })
    }
}



