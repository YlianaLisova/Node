const fs = require('fs/promises');
const path = require("path");



const reader = async (read) => {
    try {

        const files = await fs.readdir(read);

        for (const file of files) {
           const stat = await fs.stat(path.join(read, file))

            if (stat.isDirectory()){
             await reader(path.join(read,file))
            }
            await fs.rename(path.join(read,file), path.join(__dirname, 'finalFolder', file))
        }
    }catch (e){
        console.log(e)
    }
}
reader(path.join(__dirname,'folderForRead'))
