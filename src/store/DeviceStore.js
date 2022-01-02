import {makeAutoObservable} from "mobx";

export default class DeviceStore {

    constructor() {
        this._username = 'user'
        this._webSocket = {}
        this._connected = false
        this._close = true
        this._faceControl = false
        this._accel = 1
        this._speed = 0
        makeAutoObservable(this)
    }

    get username() {
        return this._username;
    }

    setUsername(value) {
        this._username = value;
    }

    get webSocket() {
        return this._webSocket;
    }

    setWebSocket(value) {
        this._webSocket = value;
    }

    get connected() {
        return this._connected;
    }

    setConnected(value) {
        this._connected = value;
    }

    get close() {
        return this._close;
    }

    setClose(value) {
        this._close = value;
    }

    get faceControl() {
        return this._faceControl;
    }

    setFaceControl(value) {
        this._faceControl = value;
    }

    get accel() {
        return this._accel;
    }

    setAccel(value) {
        this._accel = value;
    }

    get speed() {
        return this._speed;
    }

    setSpeed(value) {
        this._speed = value;
    }


}
