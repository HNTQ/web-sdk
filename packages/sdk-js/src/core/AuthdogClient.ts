import {IAuthdog} from "@authdog/types"

export class AuthdogClient implements IAuthdog {
    constructor(authnApi: string) {
        if (!authnApi) {
            throw new Error('authnApi is required')
        }
        // TODO: validate authnApi
        this.authnApi = authnApi
    }

}