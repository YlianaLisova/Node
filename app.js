// const fs = require('fs'); // for first and second versions
const fs = require('fs/promises');
const path = require("path");


//First version

// const sortBoysFolder = () =>{
//     fs.readdir('./boys', (err, files)=>{
//         if (err) return console.log(err);
//
//         files.forEach((file)=> {
//             const readFolderPath = path.join(__dirname, 'boys', file);
//
//             fs.readFile(readFolderPath, (err,data)=>{
//                 if (err) return console.log(err);
//
//                 const user = JSON.parse(data.toString());
//
//                 if (user.gender === 'female'){
//                     fs.rename(readFolderPath,path.join(__dirname, 'girls', file), (err)=>{
//                         if (err) return console.log(err);
//                     });
//                 }
//             });
//         });
//     });
// }
// sortBoysFolder();
//
// const sortGirlsFolder = () =>{
//     fs.readdir('./girls', (err, files)=>{
//         if (err) return console.log(err);
//
//         files.forEach((file)=> {
//             const readFolderPath = path.join(__dirname, 'girls', file);
//
//             fs.readFile(readFolderPath, (err,data)=>{
//                 if (err) return console.log(err);
//
//                 const user = JSON.parse(data.toString());
//
//                 if (user.gender === 'male'){
//                     fs.rename(readFolderPath,path.join(__dirname, 'boys', file), (err)=>{
//                         if (err) return console.log(err);
//                     });
//                 }
//             });
//         });
//     });
// }
// sortGirlsFolder();

//Second version

// const sortFolder = (read, gender, write) =>{
//     fs.readdir(path.join(__dirname, read), (err, files)=>{
//         if (err) return console.log(err);
//
//         files.forEach((file)=> {
//             const readFolderPath = path.join(__dirname, read, file);
//
//             fs.readFile(readFolderPath, (err,data)=>{
//                 if (err) return console.log(err);
//
//                 const user = JSON.parse(data.toString());
//
//                 if (user.gender === gender){
//                     fs.rename(readFolderPath,path.join(__dirname, write, file), (err)=>{
//                         if (err) return console.log(err);
//                     });
//                 }
//             });
//         });
//     });
// }
// sortFolder('girls', 'male', 'boys');
// sortFolder('boys', 'female', 'girls');


//Third version

const sortFolder = async (read, gender, write) => {
    const files = await fs.readdir(path.join(__dirname, read));

    for (const file of files) {
        const readFolderPath = path.join(__dirname, read, file);
        const data = await fs.readFile(readFolderPath)
        const user = JSON.parse(data.toString());

        if (user.gender === gender) {
           await fs.rename(readFolderPath, path.join(__dirname, write, file));
        }
    }
}
sortFolder('girls', 'male', 'boys');
sortFolder('boys', 'female', 'girls');