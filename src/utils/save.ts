import fs from 'fs';

export function SaveLog(data: object) {
    const gravar = JSON.stringify(data);
    
    fs.appendFile("log.txt", gravar, (error) => {
        if(error) console.log(error)
    })

}
