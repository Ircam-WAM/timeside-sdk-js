/* tslint:disable */
/* eslint-disable */
/**
 * TimeSide API
 * RESTful API of TimeSide, a scalable audio processing framework.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    ItemAudioUrl,
    ItemAudioUrlFromJSON,
    ItemAudioUrlFromJSONTyped,
    ItemAudioUrlToJSON,
} from './';

/**
 * 
 * @export
 * @interface Item
 */
export interface Item {
    /**
     * 
     * @type {Array<string>}
     * @memberof Item
     */
    readonly analysisTracks?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Item
     */
    readonly annotationTracks?: Array<string>;
    /**
     * Duration of audio track.
     * @type {number}
     * @memberof Item
     */
    readonly audioDuration?: number;
    /**
     * 
     * @type {ItemAudioUrl}
     * @memberof Item
     */
    audioUrl?: ItemAudioUrl;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    description?: string;
    /**
     * Provider\'s id of the audio source.  e.g. for Deezer preview: 4763165  e.g. for YouTube: oRdxUFDoQe0
     * @type {string}
     * @memberof Item
     */
    externalId?: string;
    /**
     * Provider\'s URI of the audio source.  e.g. for Deezer preview: http://www.deezer.com/track/4763165  e.g. for YouTube: https://www.youtube.com/watch?v=oRdxUFDoQe0
     * @type {string}
     * @memberof Item
     */
    externalUri?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    mimeType?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    readonly playerUrl?: string;
    /**
     * Audio provider (e.g. Deezer, Youtube, etc.)
     * @type {string}
     * @memberof Item
     */
    provider?: string;
    /**
     * Audio file to process.
     * @type {Blob}
     * @memberof Item
     */
    sourceFile?: Blob;
    /**
     * URL of a streamable audio source to process.
     * @type {string}
     * @memberof Item
     */
    sourceUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    readonly url?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    readonly uuid?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    readonly waveformUrl?: string;
}

export function ItemFromJSON(json: any): Item {
    return ItemFromJSONTyped(json, false);
}

export function ItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): Item {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'analysisTracks': !exists(json, 'analysis_tracks') ? undefined : json['analysis_tracks'],
        'annotationTracks': !exists(json, 'annotation_tracks') ? undefined : json['annotation_tracks'],
        'audioDuration': !exists(json, 'audio_duration') ? undefined : json['audio_duration'],
        'audioUrl': !exists(json, 'audio_url') ? undefined : ItemAudioUrlFromJSON(json['audio_url']),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'externalId': !exists(json, 'external_id') ? undefined : json['external_id'],
        'externalUri': !exists(json, 'external_uri') ? undefined : json['external_uri'],
        'mimeType': !exists(json, 'mime_type') ? undefined : json['mime_type'],
        'playerUrl': !exists(json, 'player_url') ? undefined : json['player_url'],
        'provider': !exists(json, 'provider') ? undefined : json['provider'],
        'sourceFile': !exists(json, 'source_file') ? undefined : json['source_file'],
        'sourceUrl': !exists(json, 'source_url') ? undefined : json['source_url'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
        'waveformUrl': !exists(json, 'waveform_url') ? undefined : json['waveform_url'],
    };
}

export function ItemToJSON(value?: Item | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'audio_url': ItemAudioUrlToJSON(value.audioUrl),
        'description': value.description,
        'external_id': value.externalId,
        'external_uri': value.externalUri,
        'mime_type': value.mimeType,
        'provider': value.provider,
        'source_file': value.sourceFile,
        'source_url': value.sourceUrl,
        'title': value.title,
    };
}


