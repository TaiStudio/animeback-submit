var a0_0x5a2b = [
  "%\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20$(\x27.totalpercent\x20.bar\x27).attr(\x27style\x27,\x20\x27position:\x20absolute;top:0;left:0;z-index:-1;transition:0.5s;height:\x20100%;background:\x20green;padding:\x201.8%;width:\x20",
  "97BhHlah",
  "148192rRQsMn",
  "1gtfcal",
  "32yoFuwi",
  "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22position:\x20absolute;top:\x201%;left:0.5%;z-index:999;width:\x2015%;border:\x20white\x202px\x20solid;border-radius:\x2010px;overflow:\x20hidden;text-align:\x20center;\x22\x20class=\x22totalpercent\x22><div\x20class=\x22bar\x22></div><p\x20style=\x22margin:\x202.5%\x22>0%</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
  "usagePercent",
  "%\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</script>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
  "cpu-stat",
  "500812pDPGXR",
  "31409CIPHGY",
  "name",
  "./extension.json",
  "ExtensionKit",
  "wallpaperExtend",
  "600242OhUXad",
  "loop",
  "log",
  "8997ofWgXd",
  "exports",
  "1ZFPddY",
  "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<script>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20$(\x27.totalpercent\x20p\x27).text(\x27CPU:\x20",
  "9003pmJXCA",
  "74201qYuWyi",
  "ceil",
];
function a0_0x5dd1(_0x2d2ed1, _0x107b02) {
  _0x2d2ed1 = _0x2d2ed1 - 0x89;
  var _0x5a2bd8 = a0_0x5a2b[_0x2d2ed1];
  return _0x5a2bd8;
}
var a0_0x23161d = a0_0x5dd1;
(function (_0xc39fef, _0x1c5d09) {
  var _0x59ae86 = a0_0x5dd1;
  while (!![]) {
    try {
      var _0x12300d =
        parseInt(_0x59ae86(0x92)) * -parseInt(_0x59ae86(0xa0)) +
        parseInt(_0x59ae86(0x94)) * parseInt(_0x59ae86(0x9b)) +
        parseInt(_0x59ae86(0x95)) +
        parseInt(_0x59ae86(0x8d)) * -parseInt(_0x59ae86(0x9a)) +
        parseInt(_0x59ae86(0x99)) +
        parseInt(_0x59ae86(0xa1)) +
        -parseInt(_0x59ae86(0x98)) * -parseInt(_0x59ae86(0x90));
      if (_0x12300d === _0x1c5d09) break;
      else _0xc39fef["push"](_0xc39fef["shift"]());
    } catch (_0x364ac3) {
      _0xc39fef["push"](_0xc39fef["shift"]());
    }
  }
})(a0_0x5a2b, 0x4c8d1);
const extensionConfig = require(a0_0x23161d(0x8a));
var cpuStat = require(a0_0x23161d(0x9f)),
  totalCores = cpuStat["totalCores"](),
  totalpercent = 0x0;
module[a0_0x23161d(0x91)] = {
  main(_0x5c5fe4) {
    var _0x50fca6 = a0_0x23161d;
    _0x5c5fe4[_0x50fca6(0x8b)][_0x50fca6(0x8c)](
      _0x50fca6(0x9c),
      extensionConfig[_0x50fca6(0x89)]
    ),
      setInterval(() => {
        var _0x49814c = _0x50fca6;
        this[_0x49814c(0x8e)](_0x5c5fe4);
      }, 0x1f4);
  },
  loop(_0x401a39) {
    var _0x3de4e0 = a0_0x23161d;
    cpuStat[_0x3de4e0(0x9d)](function (_0x46bc2e, _0x41d7a8) {
      var _0x5900b1 = _0x3de4e0;
      if (_0x46bc2e) return console[_0x5900b1(0x8f)](_0x46bc2e);
      totalpercent = _0x41d7a8;
    }),
      _0x401a39[_0x3de4e0(0x8b)]["wallpaperExtend"](
        _0x3de4e0(0x93) +
          Math[_0x3de4e0(0x96)](totalpercent) +
          _0x3de4e0(0x97) +
          totalpercent +
          _0x3de4e0(0x9e),
        extensionConfig[_0x3de4e0(0x89)]
      );
  },
};
