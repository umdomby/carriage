import React, { useEffect, useState } from 'react';
import createSpeechServicesPonyfill from 'web-speech-cognitive-services';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {Spinner} from "react-bootstrap";
import { useSpeechSynthesis } from 'react-speech-kit';

const SUBSCRIPTION_KEY = '9c69999fa1d94ff68862d6d19e037230';
const REGION = 'westeurope';
const TOKEN_ENDPOINT = `https://${REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;


const Dictaphone3 = () => {
    const [loadingSpeechRecognition, setLoadingSpeechRecognition] = useState(true);
    const [loading1, setLoading1] = useState(true)
    const [message, setMessage] = useState('')

    const { speak } = useSpeechSynthesis();

    const commands = [
        {
            command: 'Оля, привет.',
            callback: () => speak({ text: 'Сергей привет'}),
        },
        {
            command: 'Вики.',
            callback: () => speak({ text: 'Да мой хозяин', }),
        },
        {
            command: 'Вики как у тебя дела?',
            callback: () => speak({ text: 'Спасибо, у меня всё хорошо', }),
        },
        {
            command: 'Очистить.',
            callback: ({ resetTranscript }) => resetTranscript()
        }
    ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    const startListening = () => SpeechRecognition.startListening({
        continuous: true,
        language: 'ru-RU'
    });

    useEffect(() => {

        loadSpeechRecognition()

    }, []);


    const loadSpeechRecognition = async () => {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY }
        });
        const authorizationToken = await response.text();
        const {
            SpeechRecognition: AzureSpeechRecognition
        } = createSpeechServicesPonyfill({
            credentials: {
                region: REGION,
                authorizationToken,
            }
        });
        SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
        setLoadingSpeechRecognition(false);
    }

    if (loadingSpeechRecognition || !browserSupportsSpeechRecognition) {
        return null;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
};
export default Dictaphone3;
