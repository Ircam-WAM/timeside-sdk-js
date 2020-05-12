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
/**
 * 
 * @export
 * @interface Annotation
 */
export interface Annotation {
    /**
     * 
     * @type {string}
     * @memberof Annotation
     */
    readonly url?: string;
    /**
     * 
     * @type {string}
     * @memberof Annotation
     */
    readonly uuid?: string;
    /**
     * 
     * @type {string}
     * @memberof Annotation
     */
    track: string;
    /**
     * 
     * @type {string}
     * @memberof Annotation
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Annotation
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof Annotation
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof Annotation
     */
    stopTime: number;
}

export function AnnotationFromJSON(json: any): Annotation {
    return AnnotationFromJSONTyped(json, false);
}

export function AnnotationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Annotation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': !exists(json, 'url') ? undefined : json['url'],
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
        'track': json['track'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'startTime': !exists(json, 'start_time') ? undefined : json['start_time'],
        'stopTime': json['stop_time'],
    };
}

export function AnnotationToJSON(value?: Annotation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'track': value.track,
        'title': value.title,
        'description': value.description,
        'start_time': value.startTime,
        'stop_time': value.stopTime,
    };
}


