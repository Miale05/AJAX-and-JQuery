$(document).ready( () => {
    
    //LISTADO DE USUARIOS
    const listUsuarios = () => {
        $.ajax({
            url: 'http://localhost:8081/apiUsuario/usuarios',
            type: 'GET',
            dataType: 'json',
            success: function(res){
                let data = '';
                res.forEach(element => {
                    data+= `
                        <tr usuarioId = ${element.idUsuario} >
                            <td>${element.idUsuario}</td>
                            <td>${element.nombresUsuario}</td>
                            <td>${element.paternoUsuario}</td>
                            <td>${element.maternoUsuario}</td>
                            <td>${element.correoUsuario}</td>

                            <td>
                                <button id="btn-details-usuario" class="btn btn-warning">Detalles</button>
                            </td>
                            
                            <td>
                                <button id="btn-edit-usuario" class="btn btn-success">Editar</button>
                            </td>

                            <td>
                                <button id="btn-delete-usuario" class="btn btn-danger">Eliminar</button>
                            </td>

                        </tr>
                    `
                });
    
                $('#tbodyusuario').html(data);
    
            }
        })
    }

    //GUARDAR UN USUARIO NUEVO
    const saveUsuario = () => {
        $('#agregarusuario').on('click', function(){
            const datosUsuarios = {
                nombresUsuario: $('#nombres').val(),
                paternoUsuario: $('#paterno').val(),
                maternoUsuario: $('#materno').val(),
                fechaNacimiento: $('#nacimiento').val(),
                correoUsuario: $('#correo').val(),
                ocupacionUsuario: $('#ocupacion').val()
            }

            $.ajax({
                url:'http://localhost:8081/apiUsuario/save',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(datosUsuarios),
                dataType: 'json',
                success: (data) => {
                    $('#messages').html('Usuario Creado').css('display', 'block');
                    listUsuarios();
                    resetUsuario();
                    console.log('USUARIO REGISTRADO');
                }

            })
        })
    }

    //METODO PARA LIMPIAR EL FORMULARIO
    const resetUsuario = () => {
        $('#nombres').val('');
        $('#paterno').val('');
        $('#materno').val('');
        $('#nacimiento').val('');
        $('#correo').val('');
        $('#ocupacion').val('');
    }

    //DETALLES USUARIO
    const detailsUsuario = () => {
        $(document).on('click', '#btn-details-usuario', function(){
            let btnDetailsUsuario = $(this)[0].parentElement.parentElement;
            let idUsuario = $(btnDetailsUsuario).attr('usuarioId');

            $.ajax({
                url:'http://localhost:8081/apiUsuario/usuario/' + idUsuario,
                type: 'GET',
                dataType: 'json',
                success: (res) => {
                    let data = `
                        <strong>Nombres: </strong> ${res.nombresUsuario} <br>
                        <strong>Apellido Paterno: </strong>${res.paternoUsuario} <br>
                        <strong>Apellido Materno: </strong>${res.maternoUsuario} <br>
                        <strong>Fecha Nacimiento: </strong>${res.fechaNacimiento} <br>
                        <strong>Correo: </strong>${res.correoUsuario} <br>
                        <strong>Ocupacion: </strong>${res.ocupacionUsuario} <br><br>
                        <button id="btn-limpiar-usuario" class="btn btn-warning">Limpiar</button>
                    `

                    let usuario = $('#usuario-details').html(data);
                    $('#btn-limpiar-usuario').on('click', () => {
                        usuario.html('')
                    })
                }
            })
        })
    }

    //ELIMINAR USUARIO
    const deleteUsuario = () => {
        $(document).on('click','#btn-delete-usuario', function(){

            if(confirm('¿Estas seguro que quieres eliminar al usuario?')){
                let btnDeleteUsuario =  $(this)[0].parentElement.parentElement;
                let idUsuario = $(btnDeleteUsuario). attr('usuarioId');
                
                $.ajax({
                    url:'http://localhost:8081/apiUsuario/delete/' + idUsuario,
                    type: 'DELETE',
                    dataType: 'json',
                    success: (res) => {
                        $('#messages').html('Usuario Eliminado').css('display', 'block');
                        listUsuarios();
                    }
                })
            }
            
        })
    }

    //RELLENAR DATOS DE USUARIO EN FORMULARIO
    const rellenarUsuario = () => {
        $(document).on('click', '#btn-edit-usuario', function(){
            let btnEditUsuario =  $(this)[0].parentElement.parentElement;
            let idUsuario = $(btnEditUsuario). attr('usuarioId');
            
            $('#agregarusuario').hide();
            $('#editarusuario').show();

            $.ajax({
                url:'http://localhost:8081/apiUsuario/usuario/' + idUsuario,
                type: 'GET',
                dataType: 'json',
                success: (res) => {
                    $('#idusuario').val(res.idUsuario);
                    $('#nombres').val(res.nombresUsuario);
                    $('#paterno').val(res.paternoUsuario);
                    $('#materno').val(res.maternoUsuario);
                    $('#nacimiento').val(res.fechaNacimiento);
                    $('#correo').val(res.correoUsuario);
                    $('#ocupacion').val(res.ocupacionUsuario);
                }
            })
        })
    }

    //METODO PARA MODIFICAR AL USUARIO
    const editUsuario = () => {
        $('#editarusuario').on('click', function(){
            let idUsuario = $('#idusuario').val();
            $('#agregarusuario').css('display', 'none');
            $('#editarusuario').css('display', 'block');

            const datosUsuarios = {
                nombresUsuario: $('#nombres').val(),
                paternoUsuario: $('#paterno').val(),
                maternoUsuario: $('#materno').val(),
                fechaNacimiento: $('#nacimiento').val(),
                correoUsuario: $('#correo').val(),
                ocupacionUsuario: $('#ocupacion').val()
            }

            $.ajax({
                url:'http://localhost:8081/apiUsuario/update/' + idUsuario,
                contentType: 'application/json',
                type: 'PUT',
                data: JSON.stringify(datosUsuarios),
                dataType: 'json',
                success: (res) => {
                    $('#messages').html('Usuario Modificado').css('display', 'block');
                    $('#editarusuario').css('display', 'none');
                    $('#agregarusuario').css('display', 'block');

                    resetUsuario();
                    listUsuarios();
                }
            })
        })
    }

    //LISTADO DE TAREAS
    const listTareas = () => {
        $.ajax({
            url: 'http://localhost:8081/apiTarea/tareas',
            type: 'GET',
            datatype: 'json',
            success: function(res){
                
                let data = '';
                res.forEach(element => {
                    data+= `
                        <tr tareaId = ${element.idTarea}>
                            <td>${element.idTarea}</td>
                            <td>${element.tituloTarea}</td>
                            <td>${element.descripcionTarea}</td>

                            <td>
                                <button id="btn-details-tarea" class="btn btn-warning">Detalles</button>
                            </td>

                            <td>
                                <button id="btn-edit-tarea" class="btn btn-success">Editar</button>
                            </td>

                            <td>
                                <button id="btn-delete-tarea" class="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    `
                });
                
                $('#tbodytarea').html(data);
    
            }
        })
    }

    //LISTADO DE OPCIONES DE USUARIOS
    const optionUsuarios = () => {
        $.ajax({
            url: 'http://localhost:8081/apiUsuario/usuarios',
            type: 'GET',
            datatype: 'json',
            success: function(res){
                let data = '';
                res.forEach(element => {
                    data+= `
                        <option value="${element.idUsuario}">${element.idUsuario}</option> 
                    `
                });
                
                $('#listausuarios').html(data);
                resetTarea();
    
            }
        })
    }

    $(document).on('change', '#listausuarios',function(event) {
        $('#usuario_seleccionado').val($("#listausuarios option:selected").text());
    })

    //GUARDAR UNA TAREA NUEVA
    const saveTarea = () => {
        $('#agregartarea').on('click', function(){
            const datosTareas = {
                tituloTarea: $('#titulo').val(),
                descripcionTarea: $('#descripcion').val(),
                fechaFin: $('#fechafin').val(),
                usuario: {
                    idUsuario: $('#usuario_seleccionado').val()
                }
                
            }


            $.ajax({
                url:'http://localhost:8081/apiTarea/save',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(datosTareas),
                dataType: 'json',
                success: (data) => {
                    $('#messages').html('Tarea Creada').css('display','block');
                    listTareas();
                    resetTarea();
                    console.log('TAREA REGISTRADA');
                }

            })
        })
    }

    //METODO PARA LIMPIAR EL FORMULARIO TAREA
    const resetTarea = () => {
        $('#titulo').val('');
        $('#descripcion').val('');
        $('#fechafin').val('');
        $('#listausuarios').val('');
    }

    //DETALLES TAREA
    const detailsTarea = () => {
        $(document).on('click', '#btn-details-tarea', function(){
            let btnDetailsTarea = $(this)[0].parentElement.parentElement;
            let idTarea = $(btnDetailsTarea).attr('tareaId');

            $.ajax({
                url:'http://localhost:8081/apiTarea/tarea/' + idTarea,
                type: 'GET',
                dataType: 'json',
                success: (res) => {
                    let data = `
                        <strong>Titulo: </strong> ${res.tituloTarea} <br>
                        <strong>Descripcion: </strong>${res.descripcionTarea} <br>
                        <strong>Pertenece a: </strong>${res.usuario.correoUsuario} <br>
                        <strong>Fecha Estimada de Fin: </strong>${res.fechaFin} <br><br>
                        
                        <button id="btn-limpiar-tarea" class="btn btn-warning">Limpiar</button>
                    `

                    let tarea = $('#tarea-details').html(data);
                    $('#btn-limpiar-tarea').on('click', () => {
                        tarea.html('')
                    })
                }
            })
        })
    }

    //ELIMINAR TAREA
    const deleteTarea = () => {
        $(document).on('click','#btn-delete-tarea', function(){

            if(confirm('¿Estas seguro que quieres eliminar la tarea? ')){
                let btnDeleteTarea =  $(this)[0].parentElement.parentElement;
                let idTarea = $(btnDeleteTarea). attr('tareaId');
                
                $.ajax({
                    url:'http://localhost:8081/apiTarea/delete/' + idTarea,
                    type: 'DELETE',
                    dataType: 'json',
                    success: (res) => {
                        $('#messages').html('Tarea Eliminada').css('display', 'block');
                        listTareas();
                        console.log('TAREA ELIMINADA');
                    }
                })
            }
            
        })
    }

    //RELLENAR DATOS DE TAREA EN FORMULARIO
    const rellenarTarea = () => {
        $(document).on('click', '#btn-edit-tarea', function(){
            let btnEditTarea =  $(this)[0].parentElement.parentElement;
            let idTarea = $(btnEditTarea). attr('tareaId');
            
            $('#agregartarea').hide();
            $('#editartarea').show();

            $.ajax({
                url:'http://localhost:8081/apiTarea/tarea/' + idTarea,
                type: 'GET',
                dataType: 'json',
                success: (res) => {
                    $('#idtarea').val(res.idTarea);
                    $('#titulo').val(res.tituloTarea);
                    $('#descripcion').val(res.descripcionTarea);
                    $('#fechafin').val(res.fechaFin);
                    $('#listausuarios').val(res.usuario.idUsuario);
                    $('#usuario_seleccionado').val(res.usuario.idUsuario);
                }
            })
        })
    }

    //METODO PARA MODIFICAR AL USUARIO
    const editTarea = () => {
        $('#editartarea').on('click', function(){
            let idTarea = $('#idtarea').val();
            $('#agregartarea').css('display', 'none');
            $('#editartarea').css('display', 'block');

            const datosTareas = {
                tituloTarea: $('#titulo').val(),
                descripcionTarea: $('#descripcion').val(),
                fechaFin: $('#fechafin').val(),
                usuario: {
                    idUsuario: $('#usuario_seleccionado').val()
                }
                
            }

            $.ajax({
                url:'http://localhost:8081/apiTarea/update/' + idTarea,
                contentType: 'application/json',
                type: 'PUT',
                data: JSON.stringify(datosTareas),
                dataType: 'json',
                success: (res) => {
                    $('#messages').html('Tarea Modificada').css('display', 'block');
                    $('#editartarea').css('display', 'none');
                    $('#agregartarea').css('display', 'block');

                    resetTarea();
                    listTareas();
                }
            })
        })
    }

    
    

    


    listUsuarios();
    saveUsuario();

    listTareas();
    saveTarea();

    optionUsuarios();

    deleteUsuario();
    deleteTarea();

    detailsUsuario();
    detailsTarea();

    rellenarUsuario();
    editUsuario();

    rellenarTarea();
    editTarea();

})