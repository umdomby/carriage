import React from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const appId = '41566a36-1ce6-4ea3-8eb1-e9773decb8fc';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone2 = () => {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({
        continuous: true,
        language: 'ru-RU'
    });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button
                // onTouchStart={startListening}
                onMouseDown={startListening}
                // onTouchEnd={SpeechRecognition.stopListening}
                onMouseUp={SpeechRecognition.stopListening}
            >Hold to talk</button>
            <p>{transcript}</p>
        </div>
    );
};
export default Dictaphone2;
