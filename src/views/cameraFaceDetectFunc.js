import React, {useEffect, useRef, useState} from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';
import DrawBox from '../components/drawBox';
import { JSON_PROFILE } from '../common/profile';



const CameraFaceDetect = () => {

  const [fullDesc, setFullDesc] = useState(null)
  const [faceMatcher, setFaceMatcher] = useState(null)
  const [facingMode, setFacingMode] = useState(null)
  const webcam = useRef()

  const [inputSize, setInputSize] = useState(160)

  const WIDTH = 420;
  const HEIGHT = 420;


  //const WIDTH = 420;
  //const HEIGHT = 420;
  //const inputSize = 160;

  // constructor(props) {
  //   super(props);
  //   this.webcam = React.createRef();
  //   this.state = {
  //     fullDesc: null,
  //     faceMatcher: null,
  //     facingMode: null
  //   };
  // }


  useEffect(()=>{
    loadModels();
    setInputDevice();
    matcher();
  },[])

  const setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      );
      if (inputDevice.length < 2) {
        setFacingMode('user')
        // await this.setState({
        //   facingMode: 'user'
        // });
      } else {
        setFacingMode({exact: 'environment'})
        // await this.setState({
        //   facingMode: { exact: 'environment' }
        // });
      }
      startCapture();
    });
  };

  const matcher = async () => {
    const faceMatcher = await createMatcher(JSON_PROFILE);
    setFaceMatcher({ faceMatcher })
    //this.setState({ faceMatcher });
  };

  const startCapture = () => {
    setInterval(() => {
      capture();
    }, 500);
  };

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  const capture = async () => {
    if (!!webcam.current) {
      await getFullFaceDescription(
        webcam.current.getScreenshot(),
        inputSize
      ).then(fullDesc => setFullDesc({ fullDesc }));
    }
  };

  const renderFunc = () => {

    let videoConstraints = null;
    let camera = '';
    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      };
      if (facingMode === 'user') {
        camera = 'Front';
      } else {
        camera = 'Back';
      }
    }
    return videoConstraints
  }


    return (
        <div>
          <div
              className="Camera"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
          >
            {/*<p>Camera: {renderFunc}</p>*/}
            <div
                style={{
                  width: WIDTH,
                  height: HEIGHT
                }}
            >
              <div style={{position: 'relative', width: WIDTH}}>
                {!!renderFunc ? (
                    <div style={{position: 'absolute'}}>
                      <Webcam
                          audio={false}
                          width={WIDTH}
                          height={HEIGHT}
                          ref={webcam}
                          screenshotFormat="image/jpeg"
                          videoConstraints={renderFunc}
                      />
                    </div>
                ) : null}
                {!!fullDesc ? (
                    <DrawBox
                        fullDesc={fullDesc}
                        faceMatcher={faceMatcher}
                        imageWidth={WIDTH}
                        boxColor={'blue'}
                    />
                ) : null}
              </div>
            </div>
          </div>
        </div>
    );

}

export default CameraFaceDetect;
