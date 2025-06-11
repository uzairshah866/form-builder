export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface KeyValuePair {
    id: string
    key: string
    value: string
    enabled: boolean
}

export interface ApiRequest {
    method: HttpMethod
    url: string
    params: KeyValuePair[]
    headers: KeyValuePair[]
    auth: KeyValuePair[]
    body: string
}

export interface SelectOption {
    value: string
    label: string
}
