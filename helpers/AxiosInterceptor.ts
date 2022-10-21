import axios, { AxiosError, AxiosRequestConfig } from "axios"

import {SportScore} from "../config/ApiConfig.json"

export const sportScoreApi = axios.create({
    baseURL:   SportScore.baseURL,
    headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": SportScore.baseURL,
        "X-RapidAPI-Key": process.env.SPORTSCORE_API_KEY
    },
    params: {
        page : 1,
        per_page : 20
    }

});

