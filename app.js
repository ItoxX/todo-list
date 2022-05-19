require('colors');

const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async() =>{
   
    let opt = '';
    const tareas = new Tareas();

    const tareasDB =  leerDB();
    if( tareasDB ){ // cargar tareas       
        tareas.cargarTareasFromArray( tareasDB );
    }
    
    do{
        // Esta funcion imprime el menu
       opt = await inquirerMenu();
       switch(opt){
           case '1': // Crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );
               break;
            case '2': // Lista completa
                tareas.listadoCompleto();
                break;
            case '3': // Listar completadas
                tareas.listadoPendientesCompletadas(true);
                break;
            case '4': //Listar pendientes
                tareas.listadoPendientesCompletadas(false);
                break;
            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                break;
            case '6': // Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ){
                    const ok = await confirmar('¿Está seguro?');
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }                     
                break;            
       }
       guardarDB(tareas.listadoArr);
       await pausa();       
    } while (opt !== '0')    
}

main();