/*--------------------------------------------------------------------------------------\
|  _______    _    _____ _             _ _           ________     ___   ___ ___  __     |
| |__   __|  (_)  / ____| |           | (_)         /  ____  \   |__ \ / _ \__ \/_ |    |
|    | | __ _ _  | (___ | |_ _   _  __| |_  ___    /  / ___|  \     ) | | | | ) || |    |
|    | |/ _` | |  \___ \| __| | | |/ _` | |/ _ \  |  | |       |   / /| | | |/ / | |    |
|    | | (_| | |  ____) | |_| |_| | (_| | | (_) | |  | |___    |  / /_| |_| / /_ | |    |
|    |_|\__,_|_| |_____/ \__|\__,_|\__,_|_|\___/   \  \____|  /  |____|\___/____||_|    |
|                                                   \________/                          |
\--------------------------------------------------------------------------------------*/

const nconf = require('nconf');
const fs = require('fs');
const extensionConfig = require('./extension.json');
var clock = null;
module.exports = {
    main(ExtensionAPI) {
        nconf.argv().env().file({ file: ExtensionAPI["dir"].config + '/config.json' });

        ExtensionAPI["ExtensionKit"].Tray("Clock", [{label: 'Options',type: 'normal',click: () => {
            if(clock != null){return;}
            clock = ExtensionAPI["ExtensionKit"].createWindow(ExtensionAPI["dir"].folder + "/pages/options.html", null, 640, 480, true, true, false, true, false, ExtensionAPI["dir"].folder + "/icon.png");
            clock.webContents.executeJavaScript(`load('${nconf.get('top')}', '${nconf.get('left')}', '${nconf.get('theme')}');`);
        }}]);

        if(nconf.get('theme') == null){
            nconf.set('theme', 'default');
            nconf.save();
        }
        ExtensionAPI["ExtensionKit"].wallpaperExtend(`
            <script>$('.clockExtend').remove();</script>
            <style>body{--top_clock:${nconf.get('top')};--left_clock:${nconf.get('left')};}</style>
        `, extensionConfig.name);

        fs.readFile(`${ExtensionAPI["dir"].folder}/themes/${nconf.get('theme')}.js`, function(err, arg){
            if(arg == null){
                return;
            }
            ExtensionAPI["ExtensionKit"].wallpaperExtend(`${arg.toString()}`, extensionConfig.name);
        });

        ExtensionAPI["ipcMain"].on('optionClock', (event, arg, arg1, arg2) => {
            nconf.set('top', arg);
            nconf.set('left', arg1);
            nconf.set('theme', arg2);
            nconf.save();

            ExtensionAPI["ExtensionKit"].wallpaperExtend(`
                    <style>
                        .clockExtend{
                            position: absolute;
                            z-index: 10;
                            top: ${nconf.get('top')}%;
                            left: ${nconf.get('left')}%;
                        }
                    </style>
            `, extensionConfig.name);

            if(nconf.get('theme') == null){
                nconf.set('theme', 'default');
                nconf.save();
            }
            ExtensionAPI["ExtensionKit"].wallpaperExtend(`
                <script>$('.clockExtend').remove();</script>
                <style>body{--top_clock:${nconf.get('top')};--left_clock:${nconf.get('left')};}</style>
            `, extensionConfig.name);
            ExtensionAPI["ExtensionKit"].wallpaperExtend(`<script src="${ExtensionAPI["dir"].folder}/themes/${nconf.get('theme')}.js"></script>`, extensionConfig.name);
            fs.readFile(`${ExtensionAPI["dir"].folder}/themes/${nconf.get('theme')}.js`, function(err, arg){
                if(arg == null){
                    return;
                }
                ExtensionAPI["ExtensionKit"].wallpaperExtend(arg.toString(), extensionConfig.name);
            });

        });
        return true;
    }
}