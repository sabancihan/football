import axios from "axios";
import ApiConfig from "../config/ApiConfig.json" assert {type : "json"};
export var sportScoreApi = axios.create({
    baseURL: ApiConfig.SportScore.baseURL,
    headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": ApiConfig.SportScore.baseURL,
        "X-RapidAPI-Key": process.env.SPORTSCORE_API_KEY
    },
    params: {
        page: 1,
        per_page: 20
    }
});
