import './App.css';
import WebSocketProject from './components/WebSocketProject'
import {observer} from "mobx-react-lite";
import Dictaphone33 from "./components/Dictaphone33";
import CameraFaceDetect from "./views/cameraFaceDetect";
import {ReactSpeechKit} from "./components/ReactSpeechKit";
import {Speech} from "./components/Speech";


const App = observer(() => {
    return (
        <div style={{textAlign:'center'}}>
            {/*<Speech/>*/}
            {/*<ReactSpeechKit/>*/}

            {/*<CameraFaceDetect/>*/}
            <WebSocketProject/>
            <Dictaphone33/>
        </div>
    );
});

export default App;

