const {app ,
    BrowserWindow, 
    Menu,
    ipcMain,
    session,
    globalShortcut,
    systemPreferences} = require('electron');

const mysql = require('mysql');
const Security = require('./securite')

var connection = mysql.createConnection({
    host:"localhost",
    user:"phpmyadmin",
    password:"tsumenohy12",
    database:"electronjs"
})

connection.connect((err) => {
    console.log(err)
})

let mainWindow;
let OptionWindow; 

let pathTo = __dirname + '/public/page/';

app.on("ready",()=>{
    /* globalShortcut.register("CmdOrCtrl+Alt+Q",() => {
        app.quit();
    }) */
    mainWindow = new BrowserWindow({
        width:800,
        height:600
    })
    mainWindow.loadURL("file://" + pathTo + 'index/index.html');

    const mainMenu = Menu.buildFromTemplate(MenuItem);

    Menu.setApplicationMenu(mainMenu);
      
    
})

ipcMain.on('item:add',(e, item) => {
    mainWindow.webContents.send('item:add',item);
    OptionWindow.close()
})

ipcMain.on("login:verification",(e,tableau) => {
    $query = 'SELECT * FROM user WHERE email= "' + tableau["Pseudo"] + '" OR  pseudo= "' + tableau["Pseudo"] +'"';
    connection.query($query,(err,row,field) => {
        if(err) throw err;
        console.log(row);
    })
    /* if(tableau['Pseudo'] == "sebastien"){
        mainWindow.loadURL('file://' + pathTo + '/test/test.html');
    } */
})

ipcMain.on('inscription:verification', (e , tableau) => {
    console.log(tableau)
})

function createOptionWindow(){
    OptionWindow = new BrowserWindow({
        width:400,
        height:300
    })
    OptionWindow.loadURL("file://" + pathTo + 'window/window.html');
}

const MenuItem = [
    {
        label : "Menu",
        submenu:[
            {
                label:"Fermer",
                accelerator : process.platform == "darwin" ? 'Cmd+Alt+Q':
                'Ctrl+Alt+Q',
                click(){
                    app.quit()
                }
            }
        ]
    },
    {
        label: "Option",
        submenu : [{
            label: "Fichier de videos",
            click(){
                createOptionWindow();
            }   
        }
        ]
    }
]

if(process.env.NODE_ENV !== "production"){
    MenuItem.push({
        label : 'Dev Tools',
        submenu:[{
            label : "Toggle Dev Tools",
            accelerator:'Ctrl+I',
            click(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
        },
        {
            role:'reload'
        }
        ]
    })
}