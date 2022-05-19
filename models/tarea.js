const { v4:uuidv4 } = require('uuid')

class Tarea{
    id = '';
    desc = '';
    compleatadoEn = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.compleatadoEn = null;
    }
}

module.exports = Tarea;