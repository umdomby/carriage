import './App.css';
import WebSocketProject from './components/WebSocketProject'
import {observer} from "mobx-react-lite";
import Dictaphone33 from "./components/Dictaphone33";
import CameraFaceDetect from "./views/cameraFaceDetect";
import {ReactSpeechKit} from "./components/ReactSpeechKit";


const App = observer(() => {
    return (
        <div style={{textAlign:'center'}}>
            {/*<ReactSpeechKit/>*/}
            <CameraFaceDetect/>
            <WebSocketProject/>
            <Dictaphone33/>
        </div>
    );
});

export default App;

