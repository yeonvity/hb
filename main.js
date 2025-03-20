$(document).ready(function () {
    var flame = $("#flame");
    var txt = $("h1");

    // Функция для обработки звука с микрофона
    function startListening() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                var audioContext = new (window.AudioContext || window.webkitAudioContext)();
                var analyser = audioContext.createAnalyser();
                var microphone = audioContext.createMediaStreamSource(stream);
                var dataArray = new Uint8Array(analyser.frequencyBinCount);

                analyser.fftSize = 512;
                microphone.connect(analyser);

                function checkBlow() {
                    analyser.getByteFrequencyData(dataArray);
                    var volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

                    if (volume > 20) { // Порог громкости для задувания
                        blowCandle();
                    }

                    requestAnimationFrame(checkBlow);
                }

                checkBlow();
            })
            .catch(function (err) {
                console.error("Ошибка доступа к микрофону:", err);
            });
    }

    function blowCandle() {
        flame.removeClass("burn").addClass("puff");
        $(".smoke").each(function () {
            $(this).addClass("puff-bubble");
        });
        $("#glow").remove();
    
        // Убираем текст
        txt.hide();
    
        $("#candle").animate({ opacity: ".5" }, 100);
    
        setTimeout(function () {
            window.location.href = "index1.html";
        }, 2000);
    }
    
    

    // Запускаем прослушивание микрофона
    startListening();
});
