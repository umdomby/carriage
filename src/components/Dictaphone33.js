import React, {useContext, useEffect, useRef, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import {Context} from "../index";
import {UpDown, Stop, LeftRight} from '../Control/controlVoceButton'
import {Button} from "react-bootstrap";

const Dictaphone33 = () => {

    const {device} = useContext(Context)
    const [loadingSpeechRecognition, setLoadingSpeechRecognition] = useState(true);
    const [oldText, setOldText] = useState(null);
    const [oldText2, setOldText2] = useState(null);
    const { speak } = useSpeechSynthesis();
    const [voice, setVoice] = useState(true);
    const [face, setFace] = useState(false);
    const [accelState, setAccelState] = useState(1)
    const [speedStateUD, setSpeedStateUD] = useState(0)
    const [speedStateLR, setSpeedStateLR] = useState(0)
    const [delayCommand, setDelayCommand] = useState(0)

    const commands = [
        {
            command: 'Привет',
            callback: () => console.log('Привет 2222')
        },
        {
            command: 'очистить',
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
        if(text.includes("голос включить")){
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
        if(text.includes("мимика включить")){
            speak({ text: "мимика включена"})
            setOldText('мимика включена')
            setFace(true)
            device.setFaceControl(true)
            resetTranscript()
        }
        if(text.includes("мимика отключить") || text.includes("мимика выключить")){
            speak({ text: "мимика выключена"})
            setOldText('мимика выключена')
            setFace(false)
            device.setFaceControl(false)
            resetTranscript()
        }
        if(text.includes("всё включить")){
            speak({ text: "мимика и голос включены"})
            setOldText('мимика и голос включены')
            setVoice(true)
            setFace(true)
            device.setFaceControl(true)
            resetTranscript()
        }
        if(text.includes("всё выключить")){
            speak({ text: "мимика и голос выключены"})
            setOldText('мимика и голос выключены')
            setVoice(false)
            setFace(false)
            device.setFaceControl(false)
            resetTranscript()
        }
        if(voice) {
            if (text.includes("вики") || text.includes("микки") || text.includes("витя")) {
                speak({text: "да, Сергей."})
                resetTranscript()
            }
            if (text.includes("перед") || text.includes("перёд")) {
                speak({text: "вперёд"})
                setOldText('перёд')
                setOldText2('перед')
                controlUp()
                resetTranscript()
            }
            if (text.includes("назад")) {
                speak({text: "назад"})
                setOldText('назад')
                controlDown()
                resetTranscript()
            }
            if (text.includes("лево") || text.includes("лева") || text.includes("лего") || text.includes("лёва")) {
                speak({text: "влево"})
                controlLeft()
                setOldText('лев')
                resetTranscript()
            }
            if (text.includes("права") || text.includes("право") || text.includes("справо") || text.includes("справа") || text.includes("трава")) {
                speak({text: "вправа"})
                setOldText('прав')
                controlRight()
                resetTranscript()
            }
            if (text.includes("стоп") || text.includes("стоп")) {
                speak({text: "стоп"})
                setOldText('сто')
                controlStop()
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
        }
    }
    if (loadingSpeechRecognition || !browserSupportsSpeechRecognition) {
        return null;
    }
    const voiceButton = () => {
        setVoice(!voice)
    }
    const faceButton = () => {
        device.setFaceControl(!device.faceControl)
        setFace(!face)
    }

    const controlUp = () => {
        UpDown(device.webSocket, -1 + device.speedUD/10, device.accel)
    }
    const controlDown = () => {
        UpDown(device.webSocket, 1 - device.speedUD/10, device.accel)
    }
    const controlLeft = () => {
        LeftRight(device.webSocket, -1 + device.speedLR/10, device.accel)
    }
    const controlRight = () => {
        LeftRight(device.webSocket, 1 - device.speedLR/10, device.accel)
    }
    const controlStop = () => {
        Stop(device.webSocket, 1)
    }

    const accelPlus = () => {
        if(accelState < 10){
        accelUse(accelState + 1)}
    }
    const accelMinus = () => {
        if(accelState > 1){
        accelUse(accelState - 1)}
    }
    const accelUse = (accel) => {
        setAccelState(accel)
        device.setAccel(accel)
    }

    // const speedPlus = () => {
    //     speedUse(speedState + 0.1)
    // }
    // const speedMinus = () => {
    //     if(speedState > 0){
    //         speedUse(speedState - 0.1)}
    // }

    const speedUseUD = (speedUD) => {
        setSpeedStateUD(speedUD)
        device.setSpeedUD(Number(speedUD))
    }

    const speedUseLR = (speedLR) => {
        setSpeedStateLR(speedLR)
        device.setSpeedLR(Number(speedLR))
    }

    const delayCommandF = (delay) => {
        setDelayCommand(delay)
    }

    return (
        <div>
            <div style={{margin: 3}}>Microphone: {listening ? 'on' : 'off'}</div>
            <div>
                {/*<button onClick={loadSpeechRecognition}>Start</button>*/}
                <button onClick={startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <button style={{backgroundColor: voice ? 'green' : 'red'}} onClick={voiceButton}>голос</button>
                <button style={{backgroundColor: face ? 'green' : 'red'}} onClick={faceButton}>мимика</button>
                {/*<button onClick={scrollMassive}>Reset</button>*/}
            </div>
            <div style={{marginTop: '10px'}}>
                <button onClick={controlUp}>UP</button>
                <button onClick={controlDown}>DOWN</button>
                <button onClick={controlLeft}>LEFT</button>
                <button onClick={controlRight}>RIGHT</button>
                <button onClick={controlStop}>STOP</button>
            </div>
            <div style={{marginTop: 4}}>
                <Button style={{marginRight : 3, width: 50}} onClick={accelPlus}> + </Button>
                <label>{accelState}</label>

                {/*<input type="text"*/}
                {/*       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4}}*/}
                {/*       value={accelState}*/}
                {/*       onChange={(event) => {*/}
                {/*            if(event.target.value > 0 && event.target.value < 10){*/}
                {/*                accelUse(event.target.value)*/}
                {/*            }else{*/}
                {/*                accelUse(accelState)*/}
                {/*            }*/}
                {/*       }}*/}
                {/*       onKeyPress={event => {*/}
                {/*           if (event.key === "Enter") {*/}
                {/*               //return sendUpDownLeftRight()*/}
                {/*           }*/}
                {/*       }}*/}
                {/*/>*/}
                <Button style={{marginLeft : 3, width: 50, marginRight: 5}} onClick={accelMinus}> - </Button>
                замедление
            </div>
            <div>
                {/*<Button style={{marginRight : 3, width: 50}} onClick={speedPlus}> + </Button>*/}
                {/*<label>{speedState}</label>*/}
                <input type='number'
                       step="1"
                       min='0'
                       max='10'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={speedStateUD}
                       onChange={(event) => {
                           // setSpeedState(event.target.value)
                           speedUseUD(event.target.value)
                       }}
                       onKeyPress={event => {
                           if (event.key === "Enter") {
                               //return sendUpDownLeftRight()
                           }
                       }}
                />
                {/*<Button style={{marginLeft : 3, width: 50, marginRight: 5}} onClick={speedMinus}> - </Button>*/}
                Degree UP, DOWN
            </div>
            <div>
                <input type='number'
                       step="1"
                       min='0'
                       max='10'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={speedStateLR}
                       onChange={(event) => {
                           // setSpeedState(event.target.value)
                           speedUseLR(event.target.value)
                       }}
                       onKeyPress={event => {
                           if (event.key === "Enter") {
                               //return sendUpDownLeftRight()
                           }
                       }}
                />
                Degree LEFT, RIGHT
            </div>
            <div>
                <input type='number'
                       step="1"
                       min='0'
                       max='10'
                       style={{backgroundColor: 'transparent', textAlign: 'center', borderWidth: 1, width: 50, fontSize: 16, marginTop: 4, marginRight: 5}}
                       value={delayCommand}
                       onChange={(event) => {
                           // setSpeedState(event.target.value)
                           delayCommandF(event.target.value)
                       }}
                       onKeyPress={event => {
                           if (event.key === "Enter") {
                               //return sendUpDownLeftRight()
                           }
                       }}
                />
                Delay COMMAND
            </div>
            <div>{transcript}</div>
        </div>
    );
};
export default Dictaphone33;
