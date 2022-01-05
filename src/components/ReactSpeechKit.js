import React, {useEffect, useRef, useState} from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

export const ReactSpeechKit = () => {
    const [value, setValue] = useState('');
    const [amISpeaking, setAmISpeaking] = useState(false);

    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
        },
    });

    const [valueSpeak, setValueSpeak] = useState('');
    const { speak } = useSpeechSynthesis();

    useEffect(()=>{
        var synth = window.speechSynthesis
        setAmISpeaking(synth.speaking)
        console.log(amISpeaking)
    },[speak])

    // const checkSpeech = () => {
    //     var synth = window.speechSynthesis
    //     setAmISpeaking(synth.speaking)
    //     console.log(amISpeaking)
    // }

    return (
        <div>
            <div>
                <textarea
                  value={valueSpeak}
                  onChange={(event) => setValueSpeak(event.target.value)}
                />
                <button onClick={() => speak({ text: valueSpeak })}>Speak</button>
            </div>

            <div>
                <textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <button onMouseDown={listen} onMouseUp={stop}>
                🎤
                </button>
                {listening && <div>Go ahead I'm listening</div>}
            </div>
            {/*<div>*/}
            {/*    <button onClick={checkSpeech}>checkSpeech</button>*/}
            {/*</div>*/}
            {amISpeaking ? <div className='circle-red'></div>  : <div className='circle-green'></div> }

        </div>
    );
}
