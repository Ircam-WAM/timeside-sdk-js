import * as runtime from '../runtime';
import {
  TimesideApi as GeneratedApi,
  CreateItemRequest,
} from '../apis/index'
import {
  Item,
  ItemToJSON,
  ItemFromJSON
} from '../models/index'

export class TimesideApi extends GeneratedApi {
  // Override createItemRaw to handle multipart requests (when uploading files)
  async createItemRaw(requestParameters: CreateItemRequest): Promise<runtime.ApiResponse<Item>> {
    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};
    let body: runtime.HTTPBody;

    if (requestParameters.item.sourceFile) {
      // Send as form data for file upload
      const formData = new FormData()
      const snakeCase = ItemToJSON(requestParameters.item);
      for (const key in snakeCase) {
        if (snakeCase[key] === undefined) {
          continue
        }
        formData.append(key, snakeCase[key])
      }
      body = formData
    } else {
      // Send as JSON for convenience
      headerParameters['Content-Type'] = 'application/json';
      body = ItemToJSON(requestParameters.item);
    }

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = typeof token === 'function' ? token("bearerAuth", []) : token;

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }

    const response = await this.request({
      path: `/timeside/api/items/`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) => ItemFromJSON(jsonValue));
  }
}
