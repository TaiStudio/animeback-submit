var a0_0x5748 = [
  "config",
  "391397nUCOyN",
  "name",
  "ipcMain",
  "path",
  "discordID",
  "normal",
  "argv",
  "set",
  "webContents",
  "53yyrfxi",
  "wallpaperExtend",
  "653882tjqVgy",
  "./extension.json",
  "ExtensionKit",
  "file",
  "icon.png",
  "/config.json",
  "206009sCZtjb",
  "392883gyIpvb",
  "&theme=dark\x22\x20style=\x22opacity:\x200.5;\x22\x20width=\x22350\x22\x20height=\x22500\x22\x20allowtransparency=\x22true\x22\x20frameborder=\x220\x22\x20sandbox=\x22allow-popups\x20allow-popups-to-escape-sandbox\x20allow-same-origin\x20allow-scripts\x22></iframe>\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
  "createNewWindow",
  "nconf",
  "createWindow",
  "21002khHjKc",
  "dir",
  "2BmYLLt",
  "992086FuJIdn",
  "$(\x27input\x27).val(\x27",
  "folder",
  "1148311KlTerc",
  "save",
  "Config",
  "executeJavaScript",
  "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<iframe\x20src=\x22https://discord.com/widget?id=",
  "Tray",
  "get",
  "3EKkmfk",
];
var a0_0x3841e5 = a0_0x22e7;
function a0_0x22e7(_0x34d77f, _0x59a73) {
  _0x34d77f = _0x34d77f - 0x130;
  var _0x57488a = a0_0x5748[_0x34d77f];
  return _0x57488a;
}
(function (_0x4364a8, _0x138103) {
  var _0x560c96 = a0_0x22e7;
  while (!![]) {
    try {
      var _0x1e2d0d =
        -parseInt(_0x560c96(0x154)) +
        parseInt(_0x560c96(0x13a)) +
        -parseInt(_0x560c96(0x137)) +
        parseInt(_0x560c96(0x136)) * parseInt(_0x560c96(0x14e)) +
        -parseInt(_0x560c96(0x143)) +
        parseInt(_0x560c96(0x14c)) * -parseInt(_0x560c96(0x134)) +
        -parseInt(_0x560c96(0x155)) * -parseInt(_0x560c96(0x141));
      if (_0x1e2d0d === _0x138103) break;
      else _0x4364a8["push"](_0x4364a8["shift"]());
    } catch (_0x15b0b2) {
      _0x4364a8["push"](_0x4364a8["shift"]());
    }
  }
})(a0_0x5748, 0xe391e);
var path = require(a0_0x3841e5(0x146)),
  nconf = require(a0_0x3841e5(0x132));
const extensionConfig = require(a0_0x3841e5(0x14f));
module["exports"] = {
  main(_0x576f1c) {
    var _0x34da70 = a0_0x3841e5;
    nconf[_0x34da70(0x149)]()
      ["env"]()
      [_0x34da70(0x151)]({
        file: _0x576f1c[_0x34da70(0x135)][_0x34da70(0x142)] + _0x34da70(0x153),
      }),
      nconf["get"](_0x34da70(0x147)) == null &&
        (nconf["set"](_0x34da70(0x147), "719950260453244987"), nconf["save"]()),
      _0x576f1c[_0x34da70(0x150)][_0x34da70(0x14d)](
        _0x34da70(0x13e) +
          nconf[_0x34da70(0x140)](_0x34da70(0x147)) +
          _0x34da70(0x130),
        extensionConfig[_0x34da70(0x144)]
      ),
      _0x576f1c[_0x34da70(0x145)]["on"](
        "discordIDChange",
        (_0xdb872a, _0x303589) => {
          var _0x256a1a = _0x34da70;
          nconf[_0x256a1a(0x14a)](_0x256a1a(0x147), _0x303589),
            nconf[_0x256a1a(0x13b)]();
        }
      ),
      this["addTray"](_0x576f1c);
  },
  createNewWindow(_0x3206e1) {
    var _0x28f136 = a0_0x3841e5,
      _0x29cbcc = _0x3206e1[_0x28f136(0x150)][_0x28f136(0x133)](
        _0x3206e1[_0x28f136(0x135)][_0x28f136(0x139)] + "/pages/index.html",
        null,
        0x280,
        0x1e0,
        !![],
        !![],
        ![],
        !![],
        ![],
        _0x3206e1[_0x28f136(0x135)][_0x28f136(0x139)] + "/icon.png"
      );
    _0x29cbcc[_0x28f136(0x14b)][_0x28f136(0x13d)](
      _0x28f136(0x138) + nconf["get"](_0x28f136(0x147)) + "\x27);"
    );
  },
  addTray(_0xf68829) {
    var _0x3c3ee6 = a0_0x3841e5;
    _0xf68829["ExtensionKit"][_0x3c3ee6(0x13f)]("DiscordEmbed", [
      {
        label: _0x3c3ee6(0x13c),
        icon: path["join"](
          _0xf68829[_0x3c3ee6(0x135)][_0x3c3ee6(0x139)],
          _0x3c3ee6(0x152)
        ),
        type: _0x3c3ee6(0x148),
        click: () => {
          var _0x3e2a3f = _0x3c3ee6;
          this[_0x3e2a3f(0x131)](_0xf68829);
        },
      },
    ]);
  },
};
