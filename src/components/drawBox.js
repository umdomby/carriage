import React, { Component } from 'react';
import {ControlFace} from "../Control/controlFace";
//import returnWebSocket from "./ReturnWebSocket";
//import {LeftRight, Stop, UpDown} from "../Control/control";

class DrawBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptors: null,
      detections: null,
      match: null
    };
  }

  componentDidMount() {
    this.getDescription();

  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.getDescription(newProps);
  }

  getDescription = async (props = this.props) => {
    const { fullDesc, faceMatcher } = props;
    if (!!fullDesc) {
      await this.setState({
        descriptors: fullDesc.map(fd => fd.descriptor),
        detections: fullDesc.map(fd => fd.detection)
      });
      if (!!this.state.descriptors && !!faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
          faceMatcher.findBestMatch(descriptor)
        );
        this.setState({ match });
        //const socket = returnWebSocket
        // switch (match) {
        //   case 'up':
        //     UpDown(socket, '-1')
        //   case 'down':
        //     UpDown(socket, '1')
        //   case 'left':
        //     LeftRight(socket, '-1')
        //   case 'right':
        //     LeftRight(socket, '1')
        //   case 'stop':
        //     Stop(socket)
        // }

      }
    }
  };

  setDrive(data){
    switch (data) {
      case 'up':
        return <ControlFace route={'Up'}/>
      case 'down':
        return <ControlFace route={'Down'}/>
      case 'left':
        return <ControlFace route={'Left'}/>
      case 'right':
        return <ControlFace route={'Right'}/>
      case 'stop':
        return <ControlFace route={'Stop'} />
    }
  }

  render() {
    const { imageWidth, boxColor } = this.props;
    const { detections, match } = this.state;
    let box = null;

    if (!!detections) {
      box = detections.map((detection, i) => {
        const relativeBox = detection.relativeBox;
        const dimension = detection._imageDims;
        let _X = imageWidth * relativeBox._x;
        let _Y =
          (relativeBox._y * imageWidth * dimension._height) / dimension._width;
        let _W = imageWidth * relativeBox.width;
        let _H =
          (relativeBox.height * imageWidth * dimension._height) /
          dimension._width;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: boxColor,
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && match[i] && match[i]._label !== 'unknown' ? (
                <p
                  style={{
                    backgroundColor: boxColor,
                    border: 'solid',
                    borderColor: boxColor,
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}

                  {this.setDrive(match[i]._label)}

                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return <div>{box}</div>;
  }
}

export default DrawBox;
