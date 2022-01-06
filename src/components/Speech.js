import React, {useEffect, useState} from "react";
import {useSpeechSynthesis} from "./useSpeechSynthesis";

export const Speech = () => {
    const [ voices, speak] = useSpeechSynthesis();
    const [ currentVoice, setCurrentVoice ] = useState();
    const [ text, setText ] = useState('may i have some hooks, please');

    useEffect(() => {
        if (!currentVoice) {
            setCurrentVoice(voices.filter(v => v.default)[0] || voices[0]);
        }
    }, [voices])

    const handleVoiceChange = e => {
        setCurrentVoice(voices.filter(v => v.name === e.target.value)[0]);
    }

    const handleTextChange = e => {
        setText(e.target.value);
    }

    const handleSpeak = () => {
        // e.preventDefault();
        speak(text);
    }

    return (
        <form className="contain" onSubmit={handleSpeak}>
            <div className="select">
                <select value={currentVoice ? currentVoice.name : ''} onChange={handleVoiceChange}>
                    {voices.map(v => (
                        <option value={v.name}>{`${v.name}`}</option>
                    ))}
                </select>
            </div>

            <input type="text" value={text} onChange={handleTextChange} />

            <button type="submit">🗣</button>
        </form>
    );
};
