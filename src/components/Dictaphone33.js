import React, {useContext, useEffect, useRef, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import {Context} from "../index";
import {UpDown, Stop, LeftRight} from '../Control/control'

const Dictaphone33 = () => {

    const {device} = useContext(Context)
    const [loadingSpeechRecognition, setLoadingSpeechRecognition] = useState(true);
    const [oldText, setOldText] = useState(null);
    const [oldText2, setOldText2] = useState(null);
    const { speak } = useSpeechSynthesis();
    const [voice, setVoice] = useState(true);

    const commands = [
        {
            command: 'Привет',
            callback: () => console.log('Привет 2222')
        },
        {
            command: 'Очистить.',
            callback: ({ resetTranscript }) => resetTranscript()
        },
    ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands});

    const startListening = () => SpeechRecognition.startListening({
        continuous: true,
        language: 'ru-RU'
    });

    const stopListening = () => SpeechRecognition.stopListening();

    useEffect(() => {
        console.log("22222222222222222")
        loadSpeechRecognition();
    }, []);

    const loadSpeechRecognition = async () => {
        setLoadingSpeechRecognition(false);
        SpeechRecognition.startListening({
            continuous: true,
            language: 'ru-RU'
        });
    }

    useEffect(() => {
        // setMessages2(prev => [transcript, ...prev])
        if(transcript.toString().toLowerCase().includes(oldText) || transcript.toString().toLowerCase().includes(oldText2)){
            resetTranscript()
            setOldText(null)
            setOldText2(null)
        }else {
            speech(transcript.toString().toLowerCase())
        }
        console.log(transcript.toString().toLowerCase() + "   ---   " + oldText)
        if (transcript.toString().length > 100) {
            resetTranscript()
        }
    }, [transcript]);


    const speech = (text) => {
        if(text.includes("голос включить") || text.includes("голос включить")){
            speak({ text: "голос включен"})
            setOldText('голос включен')
            setVoice(true)
            resetTranscript()
        }
        if(text.includes("голос отключить") || text.includes("голос выключить")){
            speak({ text: "голос выключен"})
            setOldText('голос выключен')
            setVoice(false)
            resetTranscript()
        }
        if(voice) {
            if (text.includes("вики") || text.includes("микки") || text.includes("витя")) {
                speak({text: "да, Сергей."})
                resetTranscript()
            }
            if (text.includes("как дела")) {
                speak({text: "Спасибо у меня всё хорошо"})
                resetTranscript()
            }
            if (text.includes('что делаешь')) {
                speak({text: "Веду развитие собственного искуственного интелекта"})
                resetTranscript()
            }
            if (text.includes("режим образовани")) {
                speak({text: "режим образования включён"})
                setOldText('режим образовани')
                resetTranscript()
            }
            if (text.includes("режим вкладки")) {
                speak({text: "режим вкладки включён"})
                setOldText('режим вкладки')
                resetTranscript()
            }
            if (text.includes("перед") || text.includes("перёд")) {
                speak({text: "вперёд"})
                setOldText('перёд')
                setOldText2('перед')
                UpDown(device.webSocket, '-1')
                resetTranscript()
            }
            if (text.includes("назад")) {
                speak({text: "назад"})
                setOldText('назад')
                UpDown(device.webSocket, '1')
                resetTranscript()
            }
            if (text.includes("лево") || text.includes("лева") || text.includes("лего") || text.includes("лёва")) {
                speak({text: "влево"})
                LeftRight(device.webSocket, '-1')
                setOldText('лев')
                resetTranscript()
            }
            if (text.includes("права") || text.includes("право") || text.includes("справо") || text.includes("справа") || text.includes("трава")) {
                speak({text: "вправа"})
                setOldText('прав')
                LeftRight(device.webSocket, '1')
                resetTranscript()
            }
            if (text.includes("стоп") || text.includes("стоп")) {
                speak({text: "стоп"})
                setOldText('сто')
                Stop(device.webSocket)
                resetTranscript()
            }
            if (text.includes("закрыть")) {
                window.close();
                resetTranscript()
            }
            if (text.includes("фильмы")) {
                speak({text: "фильмы"})
                setOldText('фильмы')
                window.open('https://rezka.ag/', "_blank")
                resetTranscript()
            }
            if (text.includes("знаешь") && text.includes("павлову")) {
                speak({text: "какую именно? Павлову или Падлову?"})
                resetTranscript()
            }
        }
    }

    if (loadingSpeechRecognition || !browserSupportsSpeechRecognition) {
        return null;
    }

    const voiceButton = () => {
        setVoice(!voice)
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            {/*<button onClick={loadSpeechRecognition}>Start</button>*/}
            <button onClick={startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <button style={{backgroundColor: voice ? 'green' : 'red'}} onClick={voiceButton}>голос</button>
            {/*<button onClick={scrollMassive}>Reset</button>*/}
            <div>{transcript}</div>
        </div>
    );
};
export default Dictaphone33;
