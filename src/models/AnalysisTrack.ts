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
 * @interface AnalysisTrack
 */
export interface AnalysisTrack {
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    readonly url?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    readonly uuid?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    analysis: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    item: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    readonly resultUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    readonly parametersSchema?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    readonly parametersDefault?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalysisTrack
     */
    readonly parametrizable?: string;
}

export function AnalysisTrackFromJSON(json: any): AnalysisTrack {
    return AnalysisTrackFromJSONTyped(json, false);
}

export function AnalysisTrackFromJSONTyped(json: any, ignoreDiscriminator: boolean): AnalysisTrack {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': !exists(json, 'url') ? undefined : json['url'],
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'analysis': json['analysis'],
        'item': json['item'],
        'resultUrl': !exists(json, 'result_url') ? undefined : json['result_url'],
        'parametersSchema': !exists(json, 'parameters_schema') ? undefined : json['parameters_schema'],
        'parametersDefault': !exists(json, 'parameters_default') ? undefined : json['parameters_default'],
        'parametrizable': !exists(json, 'parametrizable') ? undefined : json['parametrizable'],
    };
}

export function AnalysisTrackToJSON(value?: AnalysisTrack | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'description': value.description,
        'analysis': value.analysis,
        'item': value.item,
    };
}


