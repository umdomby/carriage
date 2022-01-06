import React, {useContext, useEffect, useRef, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import {Context} from "../index";
import {UpDown, Stop, LeftRight} from '../Control/controlVoceButton'
import {Button} from "react-bootstrap";
import {russian} from "../command/russian";

const Dictaphone33 = () => {
    // let utterance = new SpeechSynthesisUtterance('Ciao')
    // utterance.lang = 'en-US'

    const {device} = useContext(Context)
    const [loadingSpeechRecognition, setLoadingSpeechRecognition] = useState(true);
    const { speak } = useSpeechSynthesis();
    const [voice, setVoice] = useState(true);
    const [face, setFace] = useState(false);
    const [accelState, setAccelState] = useState(1)
    const [speedStateUD, setSpeedStateUD] = useState(0)
    const [speedStateLR, setSpeedStateLR] = useState(0)
    const [delayCommand, setDelayCommand] = useState(0)

    const timerControlUp = useRef(null)
    const timerControlDown = useRef(null);
    const timerControlLeft = useRef(null);
    const timerControlRight = useRef(null);
    const [languages, setLanguages] = useState('ru-RU')
    const [amISpeaking, setAmISpeaking] = useState(false);

    const commands = [
        // {
        //     command: 'Привет',
        //     callback: () => {speak({text: "Привет"})},
        // },
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
        language: languages
    });

    const stopListening = () => SpeechRecognition.stopListening();

    // const speechVoice = (action, languages) => {
    //     var utterThis = new SpeechSynthesisUtterance();
    //     utterThis.lang = languages;
    //     utterThis.text = action;
    //     speechSynthesis.speak(utterThis);
    // }

    useEffect(() => {
        loadSpeechRecognition();
    }, [languages]);

    useEffect(()=>{
        var synth = window.speechSynthesis
        setAmISpeaking(synth.speaking)
        if(amISpeaking === false){
            startListening()
        }else{
            stopListening()
        }
    },[speak])

    const loadSpeechRecognition = async () => {
        setLoadingSpeechRecognition(false);
        SpeechRecognition.startListening({
            continuous: true,
            language: languages
        });
    }

    useEffect(() => {
        // setMessages2(prev => [transcript, ...prev])
        // if(transcript.toString().toLowerCase().includes(oldText) || transcript.toString().toLowerCase().includes(oldText2)){
        //     resetTranscript()
        //     setOldText(null)
        //     setOldText2(null)
        // }else {
        //     speech(transcript.toString().toLowerCase())
        // }
        //console.log(transcript.toString().toLowerCase() + "   ---   " + oldText)

        speech(transcript.toString().toLowerCase())
        if (transcript.toString().length > 100) {
            resetTranscript()
        }
    }, [transcript]);

    const speech = (text) => {
        let action = russian(text, voice)
        if(action != '') {
            //speechVoice(action, languages)
            speak({text: russian(text, voice)})
            if(action === 'голос включен'){setVoice(true)}
            if(action === 'голос выключен'){setVoice(false)}
            if(action === 'мимика включена'){setFace(true)}
            if(action === 'мимика выключена'){setFace(false)}
            if(action === 'вперёд'){controlUp()}
            if(action === 'назад'){controlDown()}
            if(action === 'влево'){controlLeft()}
            if(action === 'вправа'){controlRight()}
            if(action === 'стоп'){controlStop()}
            if(action === 'мимика и голос включены'){
                setVoice(true)
                setFace(true)
                device.setFaceControl(true)}
            if(action === 'мимика и голос выключены'){
                setVoice(false)
                setFace(false)
                device.setFaceControl(false)}
            resetTranscript()
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
        timerControlUp.current = setTimeout(() => {
            UpDown(device.webSocket, -1 + device.speedUD/10, device.accel)
        }, device.delayCommand);
    }
    const controlDown = () => {
        timerControlDown.current = setTimeout(() => {
            UpDown(device.webSocket, 1 - device.speedUD/10, device.accel)
        }, device.delayCommand);
    }
    const controlLeft = () => {
        timerControlLeft.current = setTimeout(() => {
            LeftRight(device.webSocket, -1 + device.speedLR/10, device.accel)
        }, device.delayCommand);
    }
    const controlRight = () => {
        timerControlRight.current = setTimeout(() => {
            LeftRight(device.webSocket, 1 - device.speedLR/10, device.accel)
        }, device.delayCommand);
    }

    const controlStop = () => {
        clearTimeout(timerControlUp.current)
        clearTimeout(timerControlDown.current)
        clearTimeout(timerControlLeft.current)
        clearTimeout(timerControlRight.current)
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
        device.setDelayCommand(delay*1000)
    }

    return (
        <div>
            <div style={{margin: 3}}>Microphone: {listening ? 'on' : 'off'} {languages}</div>
            <div>
                {/*<button onClick={loadSpeechRecognition}>Start</button>*/}
                <button onClick={startListening}>Start</button>
                <button onClick={stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <button style={{backgroundColor: voice ? 'green' : 'red'}} onClick={voiceButton}>голос</button>
                <button style={{backgroundColor: face ? 'green' : 'red'}} onClick={faceButton}>мимика</button>
                {/*<button onClick={scrollMassive}>Reset</button>*/}
            </div>
            <div style={{marginTop: '10px'}}>
                <button onClick={controlUp}>GO</button>
                <button onClick={controlDown}>BACK</button>
                <button onClick={controlLeft}>LEFT</button>
                <button onClick={controlRight}>RIGHT</button>
                <button onClick={controlStop}>STOP</button>
            </div>
            <div style={{marginTop: 4}}>
                <Button style={{marginRight : 3, width: 50}} onClick={accelPlus}> + </Button>
                <label>{accelState}</label>
                <Button style={{marginLeft : 3, width: 50, marginRight: 5}} onClick={accelMinus}> - </Button>
                замедление
            </div>
            <div>
                <input type='number' step="1" min='0' max='10'
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
                Degree GO, BACK
            </div>
            <div>
                <input type='number' step="1" min='0' max='10'
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
                <input type='number' step="1" min='0' max='5'
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
            <div>
                <select onChange={(event) => setLanguages(event.target.value)}>
                    <option value="ru-RU">Russian</option>
                    <option value="en-GB">English</option>
                </select>
            </div>
            {amISpeaking ? <div className='circle-red'></div>  : <div className='circle-green'></div> }
        </div>
    );
};
export default Dictaphone33;
