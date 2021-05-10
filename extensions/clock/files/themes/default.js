`
    <style class="clockExtend">
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        .clock {
            position: absolute;
            z-index: 10;
            top: var(--top_clock)%;
            left: var(--left_clock)%;
            border-radius: 100%;
            background: #ffffff;
            font-family: "Montserrat";
            border: 5px solid white;
            box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);
        }
        .wrap {
            overflow: hidden;
            position: relative;
            width: 350px;
            height: 350px;
            border-radius: 100%;
        }
        .minute,
        .hour {
            position: absolute;
            height: 100px;
            width: 6px;
            margin: auto;
            top: -27%;
            left: 0;
            bottom: 0;
            right: 0;
            background: black;
            transform-origin: bottom center;
            transform: rotate(0deg);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
            z-index: 1;
        }
        .minute {
            position: absolute;
            height: 130px;
            width: 4px;
            top: -38%;
            left: 0;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
            transform: rotate(90deg);
        }
        .second {
            position: absolute;
            height: 90px;
            width: 2px;
            margin: auto;
            top: -26%;
            left: 0;
            bottom: 0;
            right: 0;
            border-radius: 4px;
            background: #FF4B3E;
            transform-origin: bottom center;
            transform: rotate(180deg);
            z-index: 1;
        }
        .dot {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 12px;
            height: 12px;
            border-radius: 100px;
            background: white;
            border: 2px solid #1b1b1b;
            border-radius: 100px;
            margin: auto;
            z-index: 1;
        }
    </style>
    <div class="clock clockExtend">
        <div class="wrap">
            <span class="hour"></span>
            <span class="minute"></span>
            <span class="second"></span>
            <span class="dot"></span>
        </div>
    </div>
    <script>
        var inc = 1000;
        clock();

        function clock() {
            const date = new Date();
            
            const hours = ((date.getHours() + 11) % 12 + 1);
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            
            const hour = hours * 30;
            const minute = minutes * 6;
            const second = seconds * 6;
            
            document.querySelector('.hour').style.transform = "rotate("+hour + "deg)";
            document.querySelector('.minute').style.transform = "rotate("+minute + "deg)";
            document.querySelector('.second').style.transform = "rotate("+second + "deg)";
        }

        setInterval(clock, inc);
    </script>
`;
