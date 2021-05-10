
    <style class="clockExtend">
    @import url("https://fonts.googleapis.com/css?family=Lato:400,700");
    *,
    *:before,
    *:after {
      margin: 0;
      padding: 0;
      border: 0;
      outline: 0;
      box-sizing: border-box;
      user-select: none;
    }
    html,
    body {
      height: 100%;
    }
    body {
      font-family: 'Lato', sans-serif;
      font-weight: 700;
      background: #111;
      color: #fff;
    }
    a.switcher {
      display: block;
      position: fixed;
      text-decoration: none;
      z-index: 999999999999;
      right: 20px;
      bottom: 20px;
      width: 16px;
      height: 16px;
      background: transparent;
      border: 2px solid #fff;
      border-radius: 50%;
      opacity: 0.15;
      transition: opacity 0.15s;
    }
    a.switcher:hover {
      opacity: 1;
    }
    a.switcher:before {
      display: block;
      content: '';
      position: absolute;
      border-radius: 4px;
      width: 2px;
      height: 5px;
      background: #fff;
      top: 0;
      left: 5px;
    }
    .screen {
      position: relative;
      z-index: 1;
      widht: 100%;
      height: 100%;
      overflow: hidden;
    }
    .figure {
      display: block;
      position: absolute;
      z-index: 1;
      width: 0;
      height: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      border-top: 200px solid #fff;
      border-right: 100px solid transparent;
      border-left: 100px solid transparent;
      border-bottom: 0 solid transparent;
    }
    .figure:before {
      display: block;
      content: '';
      position: absolute;
      z-index: 99;
      width: 0;
      height: 0;
      top: -194px;
      left: -90px;
      margin: auto;
      border-top: 180px solid #111;
      border-right: 90px solid transparent;
      border-left: 90px solid transparent;
      border-bottom: 0 solid transparent;
    }
    .figure-mask {
      display: block;
      position: absolute;
      z-index: 99;
      width: 0;
      height: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      border-top: 200px solid transparent;
      border-right: 100px solid #111;
      border-left: 100px solid #111;
      border-bottom: 0 solid transparent;
    }
    .clock {
      display: block;
      position: absolute;
      z-index: 9;
      width: 720px;
      height: 128px;
      text-align: center;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      cursor: default;
    }
    .clock span {
      display: block;
      position: relative;
      font-size: 128px;
      line-height: 1;
    }
    .clock.is-off {
      animation: is-off 2s linear infinite !important;
    }
    .glitch:before {
      position: absolute;
      z-index: 999999;
      content: '';
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      animation: bg-move 2s linear infinite;
      background-size: 100% 8px;
      background-image: linear-gradient(0, rgba(255,255,255,0.05) 10%, transparent 10%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 60%, transparent 60%, transparent);
    }
    .glitch .figure,
    .glitch .figure-mask {
      transform: skewX(0deg) scaleY(1);
      animation: tr-bag 4s linear infinite;
    }
    .glitch .clock {
      transform: skewX(0deg) scaleY(1);
      animation: clock-bag 4s linear infinite;
    }
    .glitch .clock span:before,
    .glitch .clock span:after {
      display: block;
      content: attr(data-time);
      position: absolute;
      top: 0;
      color: #fff;
      background: #111;
      overflow: hidden;
      width: 720px;
      height: 128px;
      clip: rect(0, 900px, 0, 0);
    }
    .glitch .clock span:before {
      left: -2px;
      text-shadow: 2px 0 #00f;
      animation: c2 1s infinite linear alternate-reverse;
    }
    .glitch .clock span:after {
      left: 3px;
      text-shadow: -2px 0 #f00;
      animation: c1 2s infinite linear alternate-reverse;
    }
    @-moz-keyframes is-off {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 1;
      }
      56% {
        opacity: 0;
      }
      57% {
        opacity: 0;
      }
      58% {
        opacity: 1;
      }
      71% {
        transform: scaleY(1) skewX(0deg);
      }
      72% {
        transform: scaleY(3) skewX(-60deg);
      }
      73% {
        transform: scaleY(1) skewX(0deg);
      }
      80% {
        opacity: 1;
      }
      81% {
        opacity: 0;
      }
      84% {
        opacity: 0;
      }
      85% {
        opacity: 1;
      }
      91% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
        color: #fff;
      }
      92% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
        color: #008000;
      }
      93% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
        color: #fff;
      }
    }
    @-webkit-keyframes is-off {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 1;
      }
      56% {
        opacity: 0;
      }
      57% {
        opacity: 0;
      }
      58% {
        opacity: 1;
      }
      71% {
        transform: scaleY(1) skewX(0deg);
      }
      72% {
        transform: scaleY(3) skewX(-60deg);
      }
      73% {
        transform: scaleY(1) skewX(0deg);
      }
      80% {
        opacity: 1;
      }
      81% {
        opacity: 0;
      }
      84% {
        opacity: 0;
      }
      85% {
        opacity: 1;
      }
      91% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
        color: #fff;
      }
      92% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
        color: #008000;
      }
      93% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
        color: #fff;
      }
    }
    @-o-keyframes is-off {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 1;
      }
      56% {
        opacity: 0;
      }
      57% {
        opacity: 0;
      }
      58% {
        opacity: 1;
      }
      71% {
        transform: scaleY(1) skewX(0deg);
      }
      72% {
        transform: scaleY(3) skewX(-60deg);
      }
      73% {
        transform: scaleY(1) skewX(0deg);
      }
      80% {
        opacity: 1;
      }
      81% {
        opacity: 0;
      }
      84% {
        opacity: 0;
      }
      85% {
        opacity: 1;
      }
      91% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
        color: #fff;
      }
      92% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
        color: #008000;
      }
      93% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
        color: #fff;
      }
    }
    @keyframes is-off {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 1;
      }
      56% {
        opacity: 0;
      }
      57% {
        opacity: 0;
      }
      58% {
        opacity: 1;
      }
      71% {
        transform: scaleY(1) skewX(0deg);
      }
      72% {
        transform: scaleY(3) skewX(-60deg);
      }
      73% {
        transform: scaleY(1) skewX(0deg);
      }
      80% {
        opacity: 1;
      }
      81% {
        opacity: 0;
      }
      84% {
        opacity: 0;
      }
      85% {
        opacity: 1;
      }
      91% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
        color: #fff;
      }
      92% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
        color: #008000;
      }
      93% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
        color: #fff;
      }
    }
    @-moz-keyframes c1 {
      0% {
        clip: rect(74px, 9999px, 37px, 0);
      }
      5% {
        clip: rect(84px, 9999px, 30px, 0);
      }
      10% {
        clip: rect(39px, 9999px, 20px, 0);
      }
      15.000000000000002% {
        clip: rect(82px, 9999px, 15px, 0);
      }
      20% {
        clip: rect(98px, 9999px, 89px, 0);
      }
      25% {
        clip: rect(92px, 9999px, 94px, 0);
      }
      30.000000000000004% {
        clip: rect(64px, 9999px, 2px, 0);
      }
      35.00000000000001% {
        clip: rect(61px, 9999px, 87px, 0);
      }
      40% {
        clip: rect(85px, 9999px, 31px, 0);
      }
      45% {
        clip: rect(53px, 9999px, 82px, 0);
      }
      50% {
        clip: rect(51px, 9999px, 97px, 0);
      }
      55% {
        clip: rect(11px, 9999px, 100px, 0);
      }
      60.00000000000001% {
        clip: rect(88px, 9999px, 77px, 0);
      }
      65% {
        clip: rect(54px, 9999px, 40px, 0);
      }
      70.00000000000001% {
        clip: rect(35px, 9999px, 68px, 0);
      }
      75% {
        clip: rect(44px, 9999px, 58px, 0);
      }
      80% {
        clip: rect(48px, 9999px, 22px, 0);
      }
      85% {
        clip: rect(17px, 9999px, 16px, 0);
      }
      90% {
        clip: rect(16px, 9999px, 71px, 0);
      }
      95% {
        clip: rect(27px, 9999px, 9px, 0);
      }
      100% {
        clip: rect(45px, 9999px, 72px, 0);
      }
    }
    @-webkit-keyframes c1 {
      0% {
        clip: rect(74px, 9999px, 37px, 0);
      }
      5% {
        clip: rect(84px, 9999px, 30px, 0);
      }
      10% {
        clip: rect(39px, 9999px, 20px, 0);
      }
      15.000000000000002% {
        clip: rect(82px, 9999px, 15px, 0);
      }
      20% {
        clip: rect(98px, 9999px, 89px, 0);
      }
      25% {
        clip: rect(92px, 9999px, 94px, 0);
      }
      30.000000000000004% {
        clip: rect(64px, 9999px, 2px, 0);
      }
      35.00000000000001% {
        clip: rect(61px, 9999px, 87px, 0);
      }
      40% {
        clip: rect(85px, 9999px, 31px, 0);
      }
      45% {
        clip: rect(53px, 9999px, 82px, 0);
      }
      50% {
        clip: rect(51px, 9999px, 97px, 0);
      }
      55% {
        clip: rect(11px, 9999px, 100px, 0);
      }
      60.00000000000001% {
        clip: rect(88px, 9999px, 77px, 0);
      }
      65% {
        clip: rect(54px, 9999px, 40px, 0);
      }
      70.00000000000001% {
        clip: rect(35px, 9999px, 68px, 0);
      }
      75% {
        clip: rect(44px, 9999px, 58px, 0);
      }
      80% {
        clip: rect(48px, 9999px, 22px, 0);
      }
      85% {
        clip: rect(17px, 9999px, 16px, 0);
      }
      90% {
        clip: rect(16px, 9999px, 71px, 0);
      }
      95% {
        clip: rect(27px, 9999px, 9px, 0);
      }
      100% {
        clip: rect(45px, 9999px, 72px, 0);
      }
    }
    @-o-keyframes c1 {
      0% {
        clip: rect(74px, 9999px, 37px, 0);
      }
      5% {
        clip: rect(84px, 9999px, 30px, 0);
      }
      10% {
        clip: rect(39px, 9999px, 20px, 0);
      }
      15.000000000000002% {
        clip: rect(82px, 9999px, 15px, 0);
      }
      20% {
        clip: rect(98px, 9999px, 89px, 0);
      }
      25% {
        clip: rect(92px, 9999px, 94px, 0);
      }
      30.000000000000004% {
        clip: rect(64px, 9999px, 2px, 0);
      }
      35.00000000000001% {
        clip: rect(61px, 9999px, 87px, 0);
      }
      40% {
        clip: rect(85px, 9999px, 31px, 0);
      }
      45% {
        clip: rect(53px, 9999px, 82px, 0);
      }
      50% {
        clip: rect(51px, 9999px, 97px, 0);
      }
      55% {
        clip: rect(11px, 9999px, 100px, 0);
      }
      60.00000000000001% {
        clip: rect(88px, 9999px, 77px, 0);
      }
      65% {
        clip: rect(54px, 9999px, 40px, 0);
      }
      70.00000000000001% {
        clip: rect(35px, 9999px, 68px, 0);
      }
      75% {
        clip: rect(44px, 9999px, 58px, 0);
      }
      80% {
        clip: rect(48px, 9999px, 22px, 0);
      }
      85% {
        clip: rect(17px, 9999px, 16px, 0);
      }
      90% {
        clip: rect(16px, 9999px, 71px, 0);
      }
      95% {
        clip: rect(27px, 9999px, 9px, 0);
      }
      100% {
        clip: rect(45px, 9999px, 72px, 0);
      }
    }
    @keyframes c1 {
      0% {
        clip: rect(74px, 9999px, 37px, 0);
      }
      5% {
        clip: rect(84px, 9999px, 30px, 0);
      }
      10% {
        clip: rect(39px, 9999px, 20px, 0);
      }
      15.000000000000002% {
        clip: rect(82px, 9999px, 15px, 0);
      }
      20% {
        clip: rect(98px, 9999px, 89px, 0);
      }
      25% {
        clip: rect(92px, 9999px, 94px, 0);
      }
      30.000000000000004% {
        clip: rect(64px, 9999px, 2px, 0);
      }
      35.00000000000001% {
        clip: rect(61px, 9999px, 87px, 0);
      }
      40% {
        clip: rect(85px, 9999px, 31px, 0);
      }
      45% {
        clip: rect(53px, 9999px, 82px, 0);
      }
      50% {
        clip: rect(51px, 9999px, 97px, 0);
      }
      55% {
        clip: rect(11px, 9999px, 100px, 0);
      }
      60.00000000000001% {
        clip: rect(88px, 9999px, 77px, 0);
      }
      65% {
        clip: rect(54px, 9999px, 40px, 0);
      }
      70.00000000000001% {
        clip: rect(35px, 9999px, 68px, 0);
      }
      75% {
        clip: rect(44px, 9999px, 58px, 0);
      }
      80% {
        clip: rect(48px, 9999px, 22px, 0);
      }
      85% {
        clip: rect(17px, 9999px, 16px, 0);
      }
      90% {
        clip: rect(16px, 9999px, 71px, 0);
      }
      95% {
        clip: rect(27px, 9999px, 9px, 0);
      }
      100% {
        clip: rect(45px, 9999px, 72px, 0);
      }
    }
    @-moz-keyframes c2 {
      0% {
        clip: rect(54px, 9999px, 99px, 0);
      }
      5% {
        clip: rect(1px, 9999px, 35px, 0);
      }
      10% {
        clip: rect(47px, 9999px, 49px, 0);
      }
      15.000000000000002% {
        clip: rect(28px, 9999px, 84px, 0);
      }
      20% {
        clip: rect(30px, 9999px, 71px, 0);
      }
      25% {
        clip: rect(78px, 9999px, 7px, 0);
      }
      30.000000000000004% {
        clip: rect(71px, 9999px, 70px, 0);
      }
      35.00000000000001% {
        clip: rect(96px, 9999px, 74px, 0);
      }
      40% {
        clip: rect(84px, 9999px, 58px, 0);
      }
      45% {
        clip: rect(2px, 9999px, 70px, 0);
      }
      50% {
        clip: rect(81px, 9999px, 76px, 0);
      }
      55% {
        clip: rect(27px, 9999px, 67px, 0);
      }
      60.00000000000001% {
        clip: rect(56px, 9999px, 49px, 0);
      }
      65% {
        clip: rect(64px, 9999px, 7px, 0);
      }
      70.00000000000001% {
        clip: rect(79px, 9999px, 77px, 0);
      }
      75% {
        clip: rect(2px, 9999px, 89px, 0);
      }
      80% {
        clip: rect(2px, 9999px, 11px, 0);
      }
      85% {
        clip: rect(63px, 9999px, 37px, 0);
      }
      90% {
        clip: rect(80px, 9999px, 1px, 0);
      }
      95% {
        clip: rect(34px, 9999px, 61px, 0);
      }
      100% {
        clip: rect(49px, 9999px, 25px, 0);
      }
      23% {
        transform: scaleX(0.8);
      }
    }
    @-webkit-keyframes c2 {
      0% {
        clip: rect(54px, 9999px, 99px, 0);
      }
      5% {
        clip: rect(1px, 9999px, 35px, 0);
      }
      10% {
        clip: rect(47px, 9999px, 49px, 0);
      }
      15.000000000000002% {
        clip: rect(28px, 9999px, 84px, 0);
      }
      20% {
        clip: rect(30px, 9999px, 71px, 0);
      }
      25% {
        clip: rect(78px, 9999px, 7px, 0);
      }
      30.000000000000004% {
        clip: rect(71px, 9999px, 70px, 0);
      }
      35.00000000000001% {
        clip: rect(96px, 9999px, 74px, 0);
      }
      40% {
        clip: rect(84px, 9999px, 58px, 0);
      }
      45% {
        clip: rect(2px, 9999px, 70px, 0);
      }
      50% {
        clip: rect(81px, 9999px, 76px, 0);
      }
      55% {
        clip: rect(27px, 9999px, 67px, 0);
      }
      60.00000000000001% {
        clip: rect(56px, 9999px, 49px, 0);
      }
      65% {
        clip: rect(64px, 9999px, 7px, 0);
      }
      70.00000000000001% {
        clip: rect(79px, 9999px, 77px, 0);
      }
      75% {
        clip: rect(2px, 9999px, 89px, 0);
      }
      80% {
        clip: rect(2px, 9999px, 11px, 0);
      }
      85% {
        clip: rect(63px, 9999px, 37px, 0);
      }
      90% {
        clip: rect(80px, 9999px, 1px, 0);
      }
      95% {
        clip: rect(34px, 9999px, 61px, 0);
      }
      100% {
        clip: rect(49px, 9999px, 25px, 0);
      }
      23% {
        transform: scaleX(0.8);
      }
    }
    @-o-keyframes c2 {
      0% {
        clip: rect(54px, 9999px, 99px, 0);
      }
      5% {
        clip: rect(1px, 9999px, 35px, 0);
      }
      10% {
        clip: rect(47px, 9999px, 49px, 0);
      }
      15.000000000000002% {
        clip: rect(28px, 9999px, 84px, 0);
      }
      20% {
        clip: rect(30px, 9999px, 71px, 0);
      }
      25% {
        clip: rect(78px, 9999px, 7px, 0);
      }
      30.000000000000004% {
        clip: rect(71px, 9999px, 70px, 0);
      }
      35.00000000000001% {
        clip: rect(96px, 9999px, 74px, 0);
      }
      40% {
        clip: rect(84px, 9999px, 58px, 0);
      }
      45% {
        clip: rect(2px, 9999px, 70px, 0);
      }
      50% {
        clip: rect(81px, 9999px, 76px, 0);
      }
      55% {
        clip: rect(27px, 9999px, 67px, 0);
      }
      60.00000000000001% {
        clip: rect(56px, 9999px, 49px, 0);
      }
      65% {
        clip: rect(64px, 9999px, 7px, 0);
      }
      70.00000000000001% {
        clip: rect(79px, 9999px, 77px, 0);
      }
      75% {
        clip: rect(2px, 9999px, 89px, 0);
      }
      80% {
        clip: rect(2px, 9999px, 11px, 0);
      }
      85% {
        clip: rect(63px, 9999px, 37px, 0);
      }
      90% {
        clip: rect(80px, 9999px, 1px, 0);
      }
      95% {
        clip: rect(34px, 9999px, 61px, 0);
      }
      100% {
        clip: rect(49px, 9999px, 25px, 0);
      }
      23% {
        transform: scaleX(0.8);
      }
    }
    @keyframes c2 {
      0% {
        clip: rect(54px, 9999px, 99px, 0);
      }
      5% {
        clip: rect(1px, 9999px, 35px, 0);
      }
      10% {
        clip: rect(47px, 9999px, 49px, 0);
      }
      15.000000000000002% {
        clip: rect(28px, 9999px, 84px, 0);
      }
      20% {
        clip: rect(30px, 9999px, 71px, 0);
      }
      25% {
        clip: rect(78px, 9999px, 7px, 0);
      }
      30.000000000000004% {
        clip: rect(71px, 9999px, 70px, 0);
      }
      35.00000000000001% {
        clip: rect(96px, 9999px, 74px, 0);
      }
      40% {
        clip: rect(84px, 9999px, 58px, 0);
      }
      45% {
        clip: rect(2px, 9999px, 70px, 0);
      }
      50% {
        clip: rect(81px, 9999px, 76px, 0);
      }
      55% {
        clip: rect(27px, 9999px, 67px, 0);
      }
      60.00000000000001% {
        clip: rect(56px, 9999px, 49px, 0);
      }
      65% {
        clip: rect(64px, 9999px, 7px, 0);
      }
      70.00000000000001% {
        clip: rect(79px, 9999px, 77px, 0);
      }
      75% {
        clip: rect(2px, 9999px, 89px, 0);
      }
      80% {
        clip: rect(2px, 9999px, 11px, 0);
      }
      85% {
        clip: rect(63px, 9999px, 37px, 0);
      }
      90% {
        clip: rect(80px, 9999px, 1px, 0);
      }
      95% {
        clip: rect(34px, 9999px, 61px, 0);
      }
      100% {
        clip: rect(49px, 9999px, 25px, 0);
      }
      23% {
        transform: scaleX(0.8);
      }
    }
    @-moz-keyframes clock-bag {
      0% {
        transform: translate(2px, 1px);
      }
      2% {
        transform: translate(4px, 5px);
      }
      4% {
        transform: translate(1px, 5px);
      }
      6% {
        transform: translate(4px, 4px);
      }
      8% {
        transform: translate(4px, 1px);
      }
      10% {
        transform: translate(4px, 3px);
      }
      12% {
        transform: translate(4px, 1px);
      }
      14.000000000000002% {
        transform: translate(2px, 5px);
      }
      16% {
        transform: translate(2px, 3px);
      }
      18% {
        transform: translate(5px, 2px);
      }
      20% {
        transform: translate(1px, 2px);
      }
      22% {
        transform: translate(2px, 1px);
      }
      24% {
        transform: translate(2px, 3px);
      }
      26% {
        transform: translate(1px, 3px);
      }
      28.000000000000004% {
        transform: translate(1px, 5px);
      }
      30% {
        transform: translate(3px, 2px);
      }
      32% {
        transform: translate(2px, 1px);
      }
      34% {
        transform: translate(2px, 3px);
      }
      36% {
        transform: translate(4px, 2px);
      }
      38% {
        transform: translate(1px, 1px);
      }
      40% {
        transform: translate(4px, 1px);
      }
      42% {
        transform: translate(3px, 3px);
      }
      44% {
        transform: translate(3px, 4px);
      }
      46.00000000000001% {
        transform: translate(3px, 2px);
      }
      48% {
        transform: translate(2px, 5px);
      }
      50% {
        transform: translate(1px, 5px);
      }
      52% {
        transform: translate(4px, 2px);
      }
      54% {
        transform: translate(3px, 3px);
      }
      56.00000000000001% {
        transform: translate(3px, 3px);
      }
      58% {
        transform: translate(1px, 5px);
      }
      60% {
        transform: translate(3px, 2px);
      }
      62% {
        transform: translate(2px, 4px);
      }
      64% {
        transform: translate(5px, 2px);
      }
      66% {
        transform: translate(4px, 4px);
      }
      68% {
        transform: translate(1px, 5px);
      }
      70.00000000000001% {
        transform: translate(4px, 4px);
      }
      72% {
        transform: translate(2px, 5px);
      }
      74% {
        transform: translate(1px, 1px);
      }
      76% {
        transform: translate(1px, 4px);
      }
      78% {
        transform: translate(2px, 3px);
      }
      80% {
        transform: translate(5px, 2px);
      }
      82.00000000000001% {
        transform: translate(3px, 1px);
      }
      84% {
        transform: translate(4px, 3px);
      }
      86% {
        transform: translate(4px, 2px);
      }
      88% {
        transform: translate(2px, 2px);
      }
      90% {
        transform: translate(4px, 1px);
      }
      92.00000000000001% {
        transform: translate(1px, 4px);
      }
      94% {
        transform: translate(3px, 2px);
      }
      96% {
        transform: translate(5px, 1px);
      }
      98% {
        transform: translate(2px, 4px);
      }
      100% {
        transform: translate(1px, 3px);
      }
      1% {
        transform: scaleY(1) skewX(0deg);
      }
      1.5% {
        transform: scaleY(3) skewX(-60deg);
      }
      2% {
        transform: scaleY(1) skewX(0deg);
      }
      51% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
      52% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
      }
      53% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
    }
    @-webkit-keyframes clock-bag {
      0% {
        transform: translate(2px, 1px);
      }
      2% {
        transform: translate(4px, 5px);
      }
      4% {
        transform: translate(1px, 5px);
      }
      6% {
        transform: translate(4px, 4px);
      }
      8% {
        transform: translate(4px, 1px);
      }
      10% {
        transform: translate(4px, 3px);
      }
      12% {
        transform: translate(4px, 1px);
      }
      14.000000000000002% {
        transform: translate(2px, 5px);
      }
      16% {
        transform: translate(2px, 3px);
      }
      18% {
        transform: translate(5px, 2px);
      }
      20% {
        transform: translate(1px, 2px);
      }
      22% {
        transform: translate(2px, 1px);
      }
      24% {
        transform: translate(2px, 3px);
      }
      26% {
        transform: translate(1px, 3px);
      }
      28.000000000000004% {
        transform: translate(1px, 5px);
      }
      30% {
        transform: translate(3px, 2px);
      }
      32% {
        transform: translate(2px, 1px);
      }
      34% {
        transform: translate(2px, 3px);
      }
      36% {
        transform: translate(4px, 2px);
      }
      38% {
        transform: translate(1px, 1px);
      }
      40% {
        transform: translate(4px, 1px);
      }
      42% {
        transform: translate(3px, 3px);
      }
      44% {
        transform: translate(3px, 4px);
      }
      46.00000000000001% {
        transform: translate(3px, 2px);
      }
      48% {
        transform: translate(2px, 5px);
      }
      50% {
        transform: translate(1px, 5px);
      }
      52% {
        transform: translate(4px, 2px);
      }
      54% {
        transform: translate(3px, 3px);
      }
      56.00000000000001% {
        transform: translate(3px, 3px);
      }
      58% {
        transform: translate(1px, 5px);
      }
      60% {
        transform: translate(3px, 2px);
      }
      62% {
        transform: translate(2px, 4px);
      }
      64% {
        transform: translate(5px, 2px);
      }
      66% {
        transform: translate(4px, 4px);
      }
      68% {
        transform: translate(1px, 5px);
      }
      70.00000000000001% {
        transform: translate(4px, 4px);
      }
      72% {
        transform: translate(2px, 5px);
      }
      74% {
        transform: translate(1px, 1px);
      }
      76% {
        transform: translate(1px, 4px);
      }
      78% {
        transform: translate(2px, 3px);
      }
      80% {
        transform: translate(5px, 2px);
      }
      82.00000000000001% {
        transform: translate(3px, 1px);
      }
      84% {
        transform: translate(4px, 3px);
      }
      86% {
        transform: translate(4px, 2px);
      }
      88% {
        transform: translate(2px, 2px);
      }
      90% {
        transform: translate(4px, 1px);
      }
      92.00000000000001% {
        transform: translate(1px, 4px);
      }
      94% {
        transform: translate(3px, 2px);
      }
      96% {
        transform: translate(5px, 1px);
      }
      98% {
        transform: translate(2px, 4px);
      }
      100% {
        transform: translate(1px, 3px);
      }
      1% {
        transform: scaleY(1) skewX(0deg);
      }
      1.5% {
        transform: scaleY(3) skewX(-60deg);
      }
      2% {
        transform: scaleY(1) skewX(0deg);
      }
      51% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
      52% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
      }
      53% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
    }
    @-o-keyframes clock-bag {
      0% {
        transform: translate(2px, 1px);
      }
      2% {
        transform: translate(4px, 5px);
      }
      4% {
        transform: translate(1px, 5px);
      }
      6% {
        transform: translate(4px, 4px);
      }
      8% {
        transform: translate(4px, 1px);
      }
      10% {
        transform: translate(4px, 3px);
      }
      12% {
        transform: translate(4px, 1px);
      }
      14.000000000000002% {
        transform: translate(2px, 5px);
      }
      16% {
        transform: translate(2px, 3px);
      }
      18% {
        transform: translate(5px, 2px);
      }
      20% {
        transform: translate(1px, 2px);
      }
      22% {
        transform: translate(2px, 1px);
      }
      24% {
        transform: translate(2px, 3px);
      }
      26% {
        transform: translate(1px, 3px);
      }
      28.000000000000004% {
        transform: translate(1px, 5px);
      }
      30% {
        transform: translate(3px, 2px);
      }
      32% {
        transform: translate(2px, 1px);
      }
      34% {
        transform: translate(2px, 3px);
      }
      36% {
        transform: translate(4px, 2px);
      }
      38% {
        transform: translate(1px, 1px);
      }
      40% {
        transform: translate(4px, 1px);
      }
      42% {
        transform: translate(3px, 3px);
      }
      44% {
        transform: translate(3px, 4px);
      }
      46.00000000000001% {
        transform: translate(3px, 2px);
      }
      48% {
        transform: translate(2px, 5px);
      }
      50% {
        transform: translate(1px, 5px);
      }
      52% {
        transform: translate(4px, 2px);
      }
      54% {
        transform: translate(3px, 3px);
      }
      56.00000000000001% {
        transform: translate(3px, 3px);
      }
      58% {
        transform: translate(1px, 5px);
      }
      60% {
        transform: translate(3px, 2px);
      }
      62% {
        transform: translate(2px, 4px);
      }
      64% {
        transform: translate(5px, 2px);
      }
      66% {
        transform: translate(4px, 4px);
      }
      68% {
        transform: translate(1px, 5px);
      }
      70.00000000000001% {
        transform: translate(4px, 4px);
      }
      72% {
        transform: translate(2px, 5px);
      }
      74% {
        transform: translate(1px, 1px);
      }
      76% {
        transform: translate(1px, 4px);
      }
      78% {
        transform: translate(2px, 3px);
      }
      80% {
        transform: translate(5px, 2px);
      }
      82.00000000000001% {
        transform: translate(3px, 1px);
      }
      84% {
        transform: translate(4px, 3px);
      }
      86% {
        transform: translate(4px, 2px);
      }
      88% {
        transform: translate(2px, 2px);
      }
      90% {
        transform: translate(4px, 1px);
      }
      92.00000000000001% {
        transform: translate(1px, 4px);
      }
      94% {
        transform: translate(3px, 2px);
      }
      96% {
        transform: translate(5px, 1px);
      }
      98% {
        transform: translate(2px, 4px);
      }
      100% {
        transform: translate(1px, 3px);
      }
      1% {
        transform: scaleY(1) skewX(0deg);
      }
      1.5% {
        transform: scaleY(3) skewX(-60deg);
      }
      2% {
        transform: scaleY(1) skewX(0deg);
      }
      51% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
      52% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
      }
      53% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
    }
    @keyframes clock-bag {
      0% {
        transform: translate(2px, 1px);
      }
      2% {
        transform: translate(4px, 5px);
      }
      4% {
        transform: translate(1px, 5px);
      }
      6% {
        transform: translate(4px, 4px);
      }
      8% {
        transform: translate(4px, 1px);
      }
      10% {
        transform: translate(4px, 3px);
      }
      12% {
        transform: translate(4px, 1px);
      }
      14.000000000000002% {
        transform: translate(2px, 5px);
      }
      16% {
        transform: translate(2px, 3px);
      }
      18% {
        transform: translate(5px, 2px);
      }
      20% {
        transform: translate(1px, 2px);
      }
      22% {
        transform: translate(2px, 1px);
      }
      24% {
        transform: translate(2px, 3px);
      }
      26% {
        transform: translate(1px, 3px);
      }
      28.000000000000004% {
        transform: translate(1px, 5px);
      }
      30% {
        transform: translate(3px, 2px);
      }
      32% {
        transform: translate(2px, 1px);
      }
      34% {
        transform: translate(2px, 3px);
      }
      36% {
        transform: translate(4px, 2px);
      }
      38% {
        transform: translate(1px, 1px);
      }
      40% {
        transform: translate(4px, 1px);
      }
      42% {
        transform: translate(3px, 3px);
      }
      44% {
        transform: translate(3px, 4px);
      }
      46.00000000000001% {
        transform: translate(3px, 2px);
      }
      48% {
        transform: translate(2px, 5px);
      }
      50% {
        transform: translate(1px, 5px);
      }
      52% {
        transform: translate(4px, 2px);
      }
      54% {
        transform: translate(3px, 3px);
      }
      56.00000000000001% {
        transform: translate(3px, 3px);
      }
      58% {
        transform: translate(1px, 5px);
      }
      60% {
        transform: translate(3px, 2px);
      }
      62% {
        transform: translate(2px, 4px);
      }
      64% {
        transform: translate(5px, 2px);
      }
      66% {
        transform: translate(4px, 4px);
      }
      68% {
        transform: translate(1px, 5px);
      }
      70.00000000000001% {
        transform: translate(4px, 4px);
      }
      72% {
        transform: translate(2px, 5px);
      }
      74% {
        transform: translate(1px, 1px);
      }
      76% {
        transform: translate(1px, 4px);
      }
      78% {
        transform: translate(2px, 3px);
      }
      80% {
        transform: translate(5px, 2px);
      }
      82.00000000000001% {
        transform: translate(3px, 1px);
      }
      84% {
        transform: translate(4px, 3px);
      }
      86% {
        transform: translate(4px, 2px);
      }
      88% {
        transform: translate(2px, 2px);
      }
      90% {
        transform: translate(4px, 1px);
      }
      92.00000000000001% {
        transform: translate(1px, 4px);
      }
      94% {
        transform: translate(3px, 2px);
      }
      96% {
        transform: translate(5px, 1px);
      }
      98% {
        transform: translate(2px, 4px);
      }
      100% {
        transform: translate(1px, 3px);
      }
      1% {
        transform: scaleY(1) skewX(0deg);
      }
      1.5% {
        transform: scaleY(3) skewX(-60deg);
      }
      2% {
        transform: scaleY(1) skewX(0deg);
      }
      51% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
      52% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
      }
      53% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
    }
    @-moz-keyframes tr-bag {
      0% {
        transform: translate(1px, 1px);
      }
      2% {
        transform: translate(1px, 2px);
      }
      4% {
        transform: translate(4px, 1px);
      }
      6% {
        transform: translate(5px, 5px);
      }
      8% {
        transform: translate(4px, 5px);
      }
      10% {
        transform: translate(5px, 3px);
      }
      12% {
        transform: translate(5px, 2px);
      }
      14.000000000000002% {
        transform: translate(1px, 2px);
      }
      16% {
        transform: translate(1px, 4px);
      }
      18% {
        transform: translate(4px, 5px);
      }
      20% {
        transform: translate(2px, 1px);
      }
      22% {
        transform: translate(2px, 1px);
      }
      24% {
        transform: translate(5px, 5px);
      }
      26% {
        transform: translate(3px, 5px);
      }
      28.000000000000004% {
        transform: translate(2px, 1px);
      }
      30% {
        transform: translate(2px, 2px);
      }
      32% {
        transform: translate(5px, 5px);
      }
      34% {
        transform: translate(3px, 2px);
      }
      36% {
        transform: translate(4px, 4px);
      }
      38% {
        transform: translate(2px, 3px);
      }
      40% {
        transform: translate(3px, 2px);
      }
      42% {
        transform: translate(2px, 4px);
      }
      44% {
        transform: translate(1px, 2px);
      }
      46.00000000000001% {
        transform: translate(5px, 5px);
      }
      48% {
        transform: translate(4px, 2px);
      }
      50% {
        transform: translate(2px, 5px);
      }
      52% {
        transform: translate(3px, 1px);
      }
      54% {
        transform: translate(5px, 4px);
      }
      56.00000000000001% {
        transform: translate(2px, 2px);
      }
      58% {
        transform: translate(4px, 5px);
      }
      60% {
        transform: translate(2px, 1px);
      }
      62% {
        transform: translate(3px, 1px);
      }
      64% {
        transform: translate(2px, 5px);
      }
      66% {
        transform: translate(2px, 5px);
      }
      68% {
        transform: translate(4px, 3px);
      }
      70.00000000000001% {
        transform: translate(3px, 1px);
      }
      72% {
        transform: translate(1px, 1px);
      }
      74% {
        transform: translate(1px, 1px);
      }
      76% {
        transform: translate(1px, 2px);
      }
      78% {
        transform: translate(4px, 5px);
      }
      80% {
        transform: translate(4px, 2px);
      }
      82.00000000000001% {
        transform: translate(4px, 3px);
      }
      84% {
        transform: translate(3px, 2px);
      }
      86% {
        transform: translate(3px, 4px);
      }
      88% {
        transform: translate(2px, 5px);
      }
      90% {
        transform: translate(5px, 4px);
      }
      92.00000000000001% {
        transform: translate(2px, 1px);
      }
      94% {
        transform: translate(1px, 1px);
      }
      96% {
        transform: translate(5px, 1px);
      }
      98% {
        transform: translate(1px, 4px);
      }
      100% {
        transform: translate(5px, 5px);
      }
      1% {
        transform: scaleY(1) skewX(0deg);
      }
      1.5% {
        transform: scaleY(3) skewX(-60deg);
      }
      2% {
        transform: scaleY(1) skewX(0deg);
      }
      51% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
      52% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
      }
      53% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
    }
    @-webkit-keyframes tr-bag {
      0% {
        transform: translate(1px, 1px);
      }
      2% {
        transform: translate(1px, 2px);
      }
      4% {
        transform: translate(4px, 1px);
      }
      6% {
        transform: translate(5px, 5px);
      }
      8% {
        transform: translate(4px, 5px);
      }
      10% {
        transform: translate(5px, 3px);
      }
      12% {
        transform: translate(5px, 2px);
      }
      14.000000000000002% {
        transform: translate(1px, 2px);
      }
      16% {
        transform: translate(1px, 4px);
      }
      18% {
        transform: translate(4px, 5px);
      }
      20% {
        transform: translate(2px, 1px);
      }
      22% {
        transform: translate(2px, 1px);
      }
      24% {
        transform: translate(5px, 5px);
      }
      26% {
        transform: translate(3px, 5px);
      }
      28.000000000000004% {
        transform: translate(2px, 1px);
      }
      30% {
        transform: translate(2px, 2px);
      }
      32% {
        transform: translate(5px, 5px);
      }
      34% {
        transform: translate(3px, 2px);
      }
      36% {
        transform: translate(4px, 4px);
      }
      38% {
        transform: translate(2px, 3px);
      }
      40% {
        transform: translate(3px, 2px);
      }
      42% {
        transform: translate(2px, 4px);
      }
      44% {
        transform: translate(1px, 2px);
      }
      46.00000000000001% {
        transform: translate(5px, 5px);
      }
      48% {
        transform: translate(4px, 2px);
      }
      50% {
        transform: translate(2px, 5px);
      }
      52% {
        transform: translate(3px, 1px);
      }
      54% {
        transform: translate(5px, 4px);
      }
      56.00000000000001% {
        transform: translate(2px, 2px);
      }
      58% {
        transform: translate(4px, 5px);
      }
      60% {
        transform: translate(2px, 1px);
      }
      62% {
        transform: translate(3px, 1px);
      }
      64% {
        transform: translate(2px, 5px);
      }
      66% {
        transform: translate(2px, 5px);
      }
      68% {
        transform: translate(4px, 3px);
      }
      70.00000000000001% {
        transform: translate(3px, 1px);
      }
      72% {
        transform: translate(1px, 1px);
      }
      74% {
        transform: translate(1px, 1px);
      }
      76% {
        transform: translate(1px, 2px);
      }
      78% {
        transform: translate(4px, 5px);
      }
      80% {
        transform: translate(4px, 2px);
      }
      82.00000000000001% {
        transform: translate(4px, 3px);
      }
      84% {
        transform: translate(3px, 2px);
      }
      86% {
        transform: translate(3px, 4px);
      }
      88% {
        transform: translate(2px, 5px);
      }
      90% {
        transform: translate(5px, 4px);
      }
      92.00000000000001% {
        transform: translate(2px, 1px);
      }
      94% {
        transform: translate(1px, 1px);
      }
      96% {
        transform: translate(5px, 1px);
      }
      98% {
        transform: translate(1px, 4px);
      }
      100% {
        transform: translate(5px, 5px);
      }
      1% {
        transform: scaleY(1) skewX(0deg);
      }
      1.5% {
        transform: scaleY(3) skewX(-60deg);
      }
      2% {
        transform: scaleY(1) skewX(0deg);
      }
      51% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
      52% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
      }
      53% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
    }
    @-o-keyframes tr-bag {
      0% {
        transform: translate(1px, 1px);
      }
      2% {
        transform: translate(1px, 2px);
      }
      4% {
        transform: translate(4px, 1px);
      }
      6% {
        transform: translate(5px, 5px);
      }
      8% {
        transform: translate(4px, 5px);
      }
      10% {
        transform: translate(5px, 3px);
      }
      12% {
        transform: translate(5px, 2px);
      }
      14.000000000000002% {
        transform: translate(1px, 2px);
      }
      16% {
        transform: translate(1px, 4px);
      }
      18% {
        transform: translate(4px, 5px);
      }
      20% {
        transform: translate(2px, 1px);
      }
      22% {
        transform: translate(2px, 1px);
      }
      24% {
        transform: translate(5px, 5px);
      }
      26% {
        transform: translate(3px, 5px);
      }
      28.000000000000004% {
        transform: translate(2px, 1px);
      }
      30% {
        transform: translate(2px, 2px);
      }
      32% {
        transform: translate(5px, 5px);
      }
      34% {
        transform: translate(3px, 2px);
      }
      36% {
        transform: translate(4px, 4px);
      }
      38% {
        transform: translate(2px, 3px);
      }
      40% {
        transform: translate(3px, 2px);
      }
      42% {
        transform: translate(2px, 4px);
      }
      44% {
        transform: translate(1px, 2px);
      }
      46.00000000000001% {
        transform: translate(5px, 5px);
      }
      48% {
        transform: translate(4px, 2px);
      }
      50% {
        transform: translate(2px, 5px);
      }
      52% {
        transform: translate(3px, 1px);
      }
      54% {
        transform: translate(5px, 4px);
      }
      56.00000000000001% {
        transform: translate(2px, 2px);
      }
      58% {
        transform: translate(4px, 5px);
      }
      60% {
        transform: translate(2px, 1px);
      }
      62% {
        transform: translate(3px, 1px);
      }
      64% {
        transform: translate(2px, 5px);
      }
      66% {
        transform: translate(2px, 5px);
      }
      68% {
        transform: translate(4px, 3px);
      }
      70.00000000000001% {
        transform: translate(3px, 1px);
      }
      72% {
        transform: translate(1px, 1px);
      }
      74% {
        transform: translate(1px, 1px);
      }
      76% {
        transform: translate(1px, 2px);
      }
      78% {
        transform: translate(4px, 5px);
      }
      80% {
        transform: translate(4px, 2px);
      }
      82.00000000000001% {
        transform: translate(4px, 3px);
      }
      84% {
        transform: translate(3px, 2px);
      }
      86% {
        transform: translate(3px, 4px);
      }
      88% {
        transform: translate(2px, 5px);
      }
      90% {
        transform: translate(5px, 4px);
      }
      92.00000000000001% {
        transform: translate(2px, 1px);
      }
      94% {
        transform: translate(1px, 1px);
      }
      96% {
        transform: translate(5px, 1px);
      }
      98% {
        transform: translate(1px, 4px);
      }
      100% {
        transform: translate(5px, 5px);
      }
      1% {
        transform: scaleY(1) skewX(0deg);
      }
      1.5% {
        transform: scaleY(3) skewX(-60deg);
      }
      2% {
        transform: scaleY(1) skewX(0deg);
      }
      51% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
      52% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
      }
      53% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
    }
    @keyframes tr-bag {
      0% {
        transform: translate(1px, 1px);
      }
      2% {
        transform: translate(1px, 2px);
      }
      4% {
        transform: translate(4px, 1px);
      }
      6% {
        transform: translate(5px, 5px);
      }
      8% {
        transform: translate(4px, 5px);
      }
      10% {
        transform: translate(5px, 3px);
      }
      12% {
        transform: translate(5px, 2px);
      }
      14.000000000000002% {
        transform: translate(1px, 2px);
      }
      16% {
        transform: translate(1px, 4px);
      }
      18% {
        transform: translate(4px, 5px);
      }
      20% {
        transform: translate(2px, 1px);
      }
      22% {
        transform: translate(2px, 1px);
      }
      24% {
        transform: translate(5px, 5px);
      }
      26% {
        transform: translate(3px, 5px);
      }
      28.000000000000004% {
        transform: translate(2px, 1px);
      }
      30% {
        transform: translate(2px, 2px);
      }
      32% {
        transform: translate(5px, 5px);
      }
      34% {
        transform: translate(3px, 2px);
      }
      36% {
        transform: translate(4px, 4px);
      }
      38% {
        transform: translate(2px, 3px);
      }
      40% {
        transform: translate(3px, 2px);
      }
      42% {
        transform: translate(2px, 4px);
      }
      44% {
        transform: translate(1px, 2px);
      }
      46.00000000000001% {
        transform: translate(5px, 5px);
      }
      48% {
        transform: translate(4px, 2px);
      }
      50% {
        transform: translate(2px, 5px);
      }
      52% {
        transform: translate(3px, 1px);
      }
      54% {
        transform: translate(5px, 4px);
      }
      56.00000000000001% {
        transform: translate(2px, 2px);
      }
      58% {
        transform: translate(4px, 5px);
      }
      60% {
        transform: translate(2px, 1px);
      }
      62% {
        transform: translate(3px, 1px);
      }
      64% {
        transform: translate(2px, 5px);
      }
      66% {
        transform: translate(2px, 5px);
      }
      68% {
        transform: translate(4px, 3px);
      }
      70.00000000000001% {
        transform: translate(3px, 1px);
      }
      72% {
        transform: translate(1px, 1px);
      }
      74% {
        transform: translate(1px, 1px);
      }
      76% {
        transform: translate(1px, 2px);
      }
      78% {
        transform: translate(4px, 5px);
      }
      80% {
        transform: translate(4px, 2px);
      }
      82.00000000000001% {
        transform: translate(4px, 3px);
      }
      84% {
        transform: translate(3px, 2px);
      }
      86% {
        transform: translate(3px, 4px);
      }
      88% {
        transform: translate(2px, 5px);
      }
      90% {
        transform: translate(5px, 4px);
      }
      92.00000000000001% {
        transform: translate(2px, 1px);
      }
      94% {
        transform: translate(1px, 1px);
      }
      96% {
        transform: translate(5px, 1px);
      }
      98% {
        transform: translate(1px, 4px);
      }
      100% {
        transform: translate(5px, 5px);
      }
      1% {
        transform: scaleY(1) skewX(0deg);
      }
      1.5% {
        transform: scaleY(3) skewX(-60deg);
      }
      2% {
        transform: scaleY(1) skewX(0deg);
      }
      51% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
      52% {
        transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
      }
      53% {
        transform: scaleX(1) scaleY(1) skewX(0deg);
      }
    }
    @-moz-keyframes bg-move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 -32px;
      }
    }
    @-webkit-keyframes bg-move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 -32px;
      }
    }
    @-o-keyframes bg-move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 -32px;
      }
    }
    @keyframes bg-move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 -32px;
      }
    }
    
    </style>
    <div class="screen glitch clockExtend">
        <div class="clock is-off">
            <span class="time" data-time=""></span>
        </div>
        <div class="figure"></div>
        <div class="figure-mask"></div>
    </div>
    <script class="clockExtend">
        $(document).ready(function () {
            
        function second_passed() {
        $('.clock').removeClass('is-off');
        }
        setTimeout(second_passed, 2000)
        
        $('.switcher').on('click', function(e) {
        e.preventDefault();
        $('.screen').toggleClass('glitch');
        });
        
        
        var newDate = new Date();
        newDate.setDate(newDate.getDate());
        
        setInterval( function() {
            
        var hours    = new Date().getHours();
        var seconds  = new Date().getSeconds();
        var minutes  = new Date().getMinutes();
            
        var realTime = ( hours < 10 ? '0' : '' ) + hours + ' : ' + ( minutes < 10 ? '0' : '' ) + minutes + ' : ' + ( seconds < 10 ? '0' : '' ) + seconds
            
        $('.time').html(realTime);
        $('.time').attr('data-time', realTime);
            
        }, 1000);
        
        });
    </script>
