import './App.css';
import WebSocketProject from './components/WebSocketProject'
import {observer} from "mobx-react-lite";
import Dictaphone33 from "./components/Dictaphone33";
import CameraFaceDetect from "./views/cameraFaceDetect";


const App = observer(() => {
    return (
        <div style={{textAlign:'center'}}>
            <WebSocketProject/>
            <Dictaphone33/>
            <CameraFaceDetect/>
        </div>
    );
});

export default App;

