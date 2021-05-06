
tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
  
  const listapokemon = [];
  
  const eliminarPokemon = async function(){
    let res = await Swal.fire({
      title:`¿Desea enviar al profesor Oak el pokémon ${listapokemon[this.nro].nombre}?`,
      showCancelButton:true,
      confirmButtonText:"Si, enviar!"
    })
    if(res.isConfirmed){
      listapokemon.splice(this.nro,1);
      cargarTabla();
      Swal.fire("Pokemon enviado al profesor Oak");
    } else {
      Swal.fire("Operacion cancelada");
    }
  }
  
  const cargarTabla = () => {
    let tbody = document.querySelector("#tabla-tbody");
    tbody.innerHTML = "";
  
    for (let i = 0; i < listapokemon.length; ++i) {
      let p = listapokemon[i];
      let tr = document.createElement("tr");
      let tdNro = document.createElement("td");
      tdNro.innerText = (i + 1);
      let tdNombre = document.createElement("td");
      tdNombre.innerText = p.nombre;
      if (p.legendario) { 
        tdNombre.classList.add("text-warning");
      }
    let tdTipo = document.createElement("td");
  
    let icono = document.createElement("i");
    if (p.tipo == "fuego") {
      icono.classList.add("fas", "fa-fire", "text-danger", "fa-3x");
    } else if (p.tipo == "planta") {
      icono.classList.add("fas", "fa-leaf", "text-success", "fa-3x");
    } else if (p.tipo == "electrico") {
      icono.classList.add("fas", "fa-bolt", "text-warning", "fa-3x");
    } else if (p.tipo == "agua") {
      icono.classList.add("fas", "fa-tint", "text-info", "fa-3x");
    } else if (p.tipo == "normal") {
      icono.classList.add("fas", "fa-star", "fa-3x");
    } else if (p.tipo == "hielo") {
      icono.classList.add("fas", "fa-star-of-life", "text-primary", "fa-3x");
    }
    tdTipo.classList.add("text-center");
    tdTipo.appendChild(icono)
  
    let tdDescripcion = document.createElement("td");
    tdDescripcion.innerHTML = p.descripcion;
    let tdAcciones = document.createElement("td");
    tdAcciones.classList.add("text-center");
  
    let boton = document.createElement("button");//crear elementos
    boton.classList.add("btn","btn-danger");//cambiar clases de los elementos
    boton.innerText = "Enviar al profesor Oak"; //cambiar el texto de un elemento
    boton.nro = i;
    boton.addEventListener("click",eliminarPokemon);
    tdAcciones.appendChild(boton);//agregar un elemento dentro de otro
  
    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdDescripcion);
    tr.appendChild(tdAcciones);
  
    tbody.appendChild(tr);
  }
  }
  
  
  document.querySelector("#registrar-btn").addEventListener("click", () => {
    let numero = document.querySelector("#numero-txt").value;
    let nombre = document.querySelector("#nombre-txt").value;
    let descripcion = tinymce.get("descripcion-txt").getContent();
    let legendario = document.querySelector("#legendario-si").checked;
    let mitico = document.querySelector("#mitico-si").checked;
    let singular = document.querySelector("#singular-si").checked;
  
    let tipo = document.querySelector("#tipo-select").value;
  
  
    let pokemon = {};
    pokemon.numero = numero;
    pokemon.nombre = nombre;
    pokemon.descripcion = descripcion;
    pokemon.legendario = legendario;
    pokemon.mitico = mitico;
    pokemon.singular = singular;
    pokemon.tipo = tipo;
  
    /*listapokemon.splice(numero-1,0,pokemon);*/
    listapokemon.push(pokemon);
    cargarTabla();
  
    Swal.fire("Existo!", "Pokémon Registrado", "success");
  });
  
  document.querySelector("#limpiar-btn").addEventListener("click", ()=>{
    document.querySelector("#nombre-txt").value = ("");
    tinymce.get("descripcion-txt").setContent("");
    document.querySelector("#legendario-no").checked = true;
    document.querySelector("#tipo-select").value = "planta";
  });