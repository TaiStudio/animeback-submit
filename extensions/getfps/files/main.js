/*--------------------------------------------------------------------------------------\
|  _______    _    _____ _             _ _           ________     ___   ___ ___  __     |
| |__   __|  (_)  / ____| |           | (_)         /  ____  \   |__ \ / _ \__ \/_ |    |
|    | | __ _ _  | (___ | |_ _   _  __| |_  ___    /  / ___|  \     ) | | | | ) || |    |
|    | |/ _` | |  \___ \| __| | | |/ _` | |/ _ \  |  | |       |   / /| | | |/ / | |    |
|    | | (_| | |  ____) | |_| |_| | (_| | | (_) | |  | |___    |  / /_| |_| / /_ | |    |
|    |_|\__,_|_| |_____/ \__|\__,_|\__,_|_|\___/   \  \____|  /  |____|\___/____||_|    |
|                                                   \________/                          |
\--------------------------------------------------------------------------------------*/

const extensionConfig = require("./extension.json");
module.exports = {
  main(ExtensionAPI) {
    ExtensionAPI["ExtensionKit"].wallpaperExtend(
      `
            <div style="position: absolute;top:0;left:0.5%;z-index:999;" class="fps">FPS</div>
            <script>
                const times = [];
                let fps;

                function refreshLoop() {
                    window.requestAnimationFrame(() => {
                        const now = performance.now();
                        while (times.length > 0 && times[0] <= now - 1000) {
                            times.shift();
                        }
                        times.push(now);
                        fps = times.length;
                        $('.fps').text('FPS: '+fps);
                        refreshLoop();
                    });
                }

                refreshLoop();
            </script>
        `,
      extensionConfig.name
    );
    return true;
  },
};
