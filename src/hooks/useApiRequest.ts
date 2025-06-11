"use client"

import { useState, useCallback } from "react"
import type { ApiRequest, HttpMethod, KeyValuePair } from "../types/api"

const createInitialKeyValuePairs = (count: number): KeyValuePair[] => {
    return Array.from({ length: count }, (_, index) => ({
        id: (index + 1).toString(),
        key: "",
        value: "",
        enabled: true,
    }))
}

const initialRequest: ApiRequest = {
    method: "POST",
    url: "https://company.com/api_productbydesign",
    params: createInitialKeyValuePairs(4),
    headers: createInitialKeyValuePairs(2),
    auth: createInitialKeyValuePairs(2),
    body: "",
}

export const useApiRequest = () => {
    const [request, setRequest] = useState<ApiRequest>(initialRequest)
    const [jsonError, setJsonError] = useState<string>("")
    const [savedJsonData, setSavedJsonData] = useState<string>("")

    // Generate JSON representation of the current request
    const generateJsonData = useCallback(() => {
        const jsonData = {
            method: request.method,
            url: request.url,
            params: request.params
                .filter((item) => item.key || item.value)
                .reduce(
                    (acc, item) => {
                        if (item.enabled && item.key) {
                            acc[item.key] = item.value
                        }
                        return acc
                    },
                    {} as Record<string, string>,
                ),
            headers: request.headers
                .filter((item) => item.key || item.value)
                .reduce(
                    (acc, item) => {
                        if (item.enabled && item.key) {
                            acc[item.key] = item.value
                        }
                        return acc
                    },
                    {} as Record<string, string>,
                ),
            auth: request.auth
                .filter((item) => item.key || item.value)
                .reduce(
                    (acc, item) => {
                        if (item.enabled && item.key) {
                            acc[item.key] = item.value
                        }
                        return acc
                    },
                    {} as Record<string, string>,
                ),
            body: request.body ? (request.body.trim() ? JSON.parse(request.body) : null) : null,
            timestamp: new Date().toISOString(),
        }

        return JSON.stringify(jsonData, null, 2)
    }, [request])

    // Save current request as JSON
    const saveAsJson = useCallback(() => {
        try {
            const jsonData = generateJsonData()
            setSavedJsonData(jsonData)

            // Also save to localStorage for persistence
            localStorage.setItem("api-tester-request", jsonData)

            return jsonData
        } catch (error) {
            console.error("Error saving JSON data:", error)
            return null
        }
    }, [generateJsonData])

    // Load request from JSON
    const loadFromJson = useCallback((jsonString: string) => {
        try {
            const data = JSON.parse(jsonString)

            // Convert params object back to KeyValuePair array
            const params = Object.entries(data.params || {}).map(([key, value], index) => ({
                id: (index + 1).toString(),
                key,
                value: value as string,
                enabled: true,
            }))

            // Convert headers object back to KeyValuePair array
            const headers = Object.entries(data.headers || {}).map(([key, value], index) => ({
                id: (index + 1).toString(),
                key,
                value: value as string,
                enabled: true,
            }))

            // Convert auth object back to KeyValuePair array
            const auth = Object.entries(data.auth || {}).map(([key, value], index) => ({
                id: (index + 1).toString(),
                key,
                value: value as string,
                enabled: true,
            }))

            // Add empty rows if needed
            const minRows = 2
            while (params.length < minRows) {
                params.push({
                    id: Date.now().toString() + params.length,
                    key: "",
                    value: "",
                    enabled: true,
                })
            }
            while (headers.length < minRows) {
                headers.push({
                    id: Date.now().toString() + headers.length,
                    key: "",
                    value: "",
                    enabled: true,
                })
            }
            while (auth.length < minRows) {
                auth.push({
                    id: Date.now().toString() + auth.length,
                    key: "",
                    value: "",
                    enabled: true,
                })
            }

            const newRequest: ApiRequest = {
                method: data.method || "GET",
                url: data.url || "",
                params,
                headers,
                auth,
                body: data.body ? JSON.stringify(data.body, null, 2) : "",
            }

            setRequest(newRequest)
            setSavedJsonData(jsonString)

            return true
        } catch (error) {
            console.error("Error loading JSON data:", error)
            return false
        }
    }, [])

    // Load from localStorage on initialization
    const loadFromStorage = useCallback(() => {
        try {
            const saved = localStorage.getItem("api-tester-request")
            if (saved) {
                loadFromJson(saved)
            }
        } catch (error) {
            console.error("Error loading from storage:", error)
        }
    }, [loadFromJson])

    const updateMethod = (method: HttpMethod) => {
        setRequest((prev) => ({ ...prev, method }))
    }

    const updateUrl = (url: string) => {
        setRequest((prev) => ({ ...prev, url }))
    }

    const updateKeyValuePairs = (
        section: "params" | "headers" | "auth",
        id: string,
        field: "key" | "value" | "enabled",
        newValue: string | boolean,
    ) => {
        setRequest((prev) => ({
            ...prev,
            [section]: prev[section].map((item) => (item.id === id ? { ...item, [field]: newValue } : item)),
        }))
    }

    const addKeyValuePair = (section: "params" | "headers" | "auth") => {
        const newId = Date.now().toString()
        setRequest((prev) => ({
            ...prev,
            [section]: [...prev[section], { id: newId, key: "", value: "", enabled: true }],
        }))
    }

    const removeKeyValuePair = (section: "params" | "headers" | "auth", id: string) => {
        setRequest((prev) => ({
            ...prev,
            [section]: prev[section].filter((item) => item.id !== id),
        }))
    }

    const validateAndSetBody = (value: string) => {
        setRequest((prev) => ({ ...prev, body: value }))

        if (value.trim() === "") {
            setJsonError("")
            return
        }

        try {
            JSON.parse(value)
            setJsonError("")
        } catch (error) {
            setJsonError("Invalid JSON format")
        }
    }

    return {
        request,
        jsonError,
        savedJsonData,
        updateMethod,
        updateUrl,
        updateKeyValuePairs,
        addKeyValuePair,
        removeKeyValuePair,
        validateAndSetBody,
        saveAsJson,
        loadFromJson,
        loadFromStorage,
        generateJsonData,
    }
}
