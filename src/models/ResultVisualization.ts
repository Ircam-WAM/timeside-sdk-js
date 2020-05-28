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
    ResultVisualizationVisualization,
    ResultVisualizationVisualizationFromJSON,
    ResultVisualizationVisualizationFromJSONTyped,
    ResultVisualizationVisualizationToJSON,
} from './';

/**
 * 
 * @export
 * @interface ResultVisualization
 */
export interface ResultVisualization {
    /**
     * 
     * @type {ResultVisualizationVisualization}
     * @memberof ResultVisualization
     */
    visualization?: ResultVisualizationVisualization;
}

export function ResultVisualizationFromJSON(json: any): ResultVisualization {
    return ResultVisualizationFromJSONTyped(json, false);
}

export function ResultVisualizationFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResultVisualization {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'visualization': !exists(json, 'visualization') ? undefined : ResultVisualizationVisualizationFromJSON(json['visualization']),
    };
}

export function ResultVisualizationToJSON(value?: ResultVisualization | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'visualization': ResultVisualizationVisualizationToJSON(value.visualization),
    };
}

