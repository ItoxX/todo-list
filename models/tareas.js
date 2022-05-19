const Tarea = require('./tarea');
require('colors');

/*
    * _listado:
    * { uuid_123112-189189198 : { id:12 ,desc:description,compltadoEn:9849889} }
*/

class Tareas{
    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        } );

        return listado;
    }
    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray( tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    listadoCompleto(){
        console.log()
        this.listadoArr.forEach( ( tarea, i ) => {           
            const idx = `${i + 1}`.green;
            const { desc,compleatadoEn } = tarea;
            const estado = ( compleatadoEn) 
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listadoPendientesCompletadas( completadas = true){
        let contador = 0;
        this.listadoArr.forEach( tarea => {           
            
            const { desc,compleatadoEn } = tarea;
          
            const estado = ( compleatadoEn ) 
                                ? 'Completado'.green
                                : 'Pendiente'.red;

            if ( completadas ){
                if ( compleatadoEn ){
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ compleatadoEn.green }`);
                }
            } else {
                if ( !compleatadoEn ){
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }
            
        });

    }

    toggleCompletadas ( ids = []) {
        ids.forEach( id =>  { 
            const tarea = this._listado[id];
            if( ! tarea.compleatadoEn ){
                tarea.compleatadoEn = new Date().toISOString();
            };
        });

        this.listadoArr.forEach( tarea => { 
            if ( !ids.includes( tarea.id ) ){
                this._listado[tarea.id].compleatadoEn = null;
                
            }
        } );
    }
}

module.exports = Tareas;