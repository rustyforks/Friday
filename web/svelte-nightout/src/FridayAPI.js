import {
    ActiondActionBi
} from "./Core.js";
import {
    APIGetKeywords
} from "./api/Keywords.js";
import {
    APIGetHueLights,
    APISetHueLights,
    APIGetHueLightsCommands,
    APISetHueLightsCommands
} from "./api/HueLights.js";

import {
    APIGetDeviceName,
    APISetDeviceName
} from "./api/Device";

import {
    APIRecordingNew,
    APIRecordingListen,
    APIRecordingGetClips,
    APIRecordingRemove,
    APIRecordingRename
} from "./api/Recording.js";


export class FridayAPI {
    // TODO: how to do this better?
    // For dev
    static prefix = "http://0.0.0.0:8000";
    // For production
    //static prefix = "";

    static getDeviceName = () => APIGetDeviceName(this.prefix);
    static setDeviceName = (name) => APISetDeviceName(
        this.prefix,
        JSON.stringify({
            "name": name
        }));

    // Gets the keywords of the command e.g 'on' - 'off' etc
    static getKeywords = () => APIGetKeywords(this.prefix);

    // Gets the hue lights available 
    // See philips hue /lights endpoint for documentation of content
    static getHueLights = () => APIGetHueLights(this.prefix);
    static setHueLights = (data) => APISetHueLights(this.prefix, JSON.stringify(data));


    // Gets the hueLightCommands and converts them to our representation of commands
    static getHueLightsCommands = () => APIGetHueLightsCommands(this.prefix)
        .then(ActiondActionBi.hueLightsToDActions)

    // Sets the hueLightCommands 
    static setHueLightsCommands = (dactions) => APISetHueLightsCommands(
        this.prefix,
        ActiondActionBi.dActionsToHueLights(dactions)
    )

    static async fetchActions() {
        let dactions = [];
        dactions.push(...await this.getHueLightsCommands());

        return dactions;
    }

    // Recording API
    static recordingNew = () => APIRecordingNew(this.prefix);
    static recordingRemove = (id) => APIRecordingRemove(
        this.prefix,
        {
            "id": id
        });
    static recordingRename = (oldId, newId) => APIRecordingRename(
        this.prefix,
        {
            "old_id": oldId,
            "new_id": newId
        });

    static recordingClips = () => APIRecordingGetClips(this.prefix);
    static recordingAudio = (id) => APIRecordingListen(
        this.prefix,
        {
            "id": id
        });

}
