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
 * @interface Analysis
 */
export interface Analysis {
    /**
     * 
     * @type {string}
     * @memberof Analysis
     */
    readonly url?: string;
    /**
     * 
     * @type {string}
     * @memberof Analysis
     */
    readonly uuid?: string;
    /**
     * 
     * @type {string}
     * @memberof Analysis
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Analysis
     */
    description?: string;
    /**
     * Rendering types:  vector: 0  image: 1
     * @type {number}
     * @memberof Analysis
     */
    renderType?: AnalysisRenderTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Analysis
     */
    preset: string;
    /**
     * 
     * @type {string}
     * @memberof Analysis
     */
    subProcessor: string;
    /**
     * 
     * @type {object}
     * @memberof Analysis
     */
    parametersSchema: object;
    /**
     * boolean to avoid celery when testing
     * @type {boolean}
     * @memberof Analysis
     */
    test?: boolean;
}

export function AnalysisFromJSON(json: any): Analysis {
    return AnalysisFromJSONTyped(json, false);
}

export function AnalysisFromJSONTyped(json: any, ignoreDiscriminator: boolean): Analysis {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': !exists(json, 'url') ? undefined : json['url'],
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'renderType': !exists(json, 'render_type') ? undefined : json['render_type'],
        'preset': json['preset'],
        'subProcessor': json['sub_processor'],
        'parametersSchema': json['parameters_schema'],
        'test': !exists(json, 'test') ? undefined : json['test'],
    };
}

export function AnalysisToJSON(value?: Analysis | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'description': value.description,
        'render_type': value.renderType,
        'preset': value.preset,
        'sub_processor': value.subProcessor,
        'parameters_schema': value.parametersSchema,
        'test': value.test,
    };
}

/**
* @export
* @enum {string}
*/
export enum AnalysisRenderTypeEnum {
    NUMBER_0 = 0,
    NUMBER_1 = 1
}


