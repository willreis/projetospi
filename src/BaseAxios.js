import axios from 'axios';
import Config from 'react-native-config';
import { getJWTToken } from '../utils/StorageUtil';
import { navigate } from '../../RootNavigation';

const mountHeader = async () => {
    return {
        'cache-control': "no-cache",
        'Transfer-Encoding': "chunked",
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': "*/*",
        'Access-Control-Allow-Origin': "*",
        'Authorization': `Bearer ${(await getJWTToken()).data}`
    };
}

export const post = async (url, data) => {
    var result = null;

    if (__DEV__) console.log(Config.WES_API_URL + url);

    try {
        var response = await axios.post(
            Config.WES_API_URL + url,
            data,
            {
                headers: await mountHeader(),
                timeout: 10000
            }
        );

        result = {
            success: true,
            data: response.data,
            message: null
        }
    }
    catch (e) {
        result = {
            success: false,
            data: null,
            message: e
        }
    }

    if (result.message != null && String(result.message).includes("status code 401")) {
        navigate("Signin");
        return result;
    }

    return result;
}

export const get = async (url) => {
    var result = null;

    try {
        var response = await axios.get(
            Config.WES_API_URL + url,
            {
                headers: await mountHeader(),
                timeout: 10000
            }
        );

        result = {
            success: true,
            data: response.data,
            message: null
        }
    }
    catch (e) {
        result = {
            success: false,
            data: null,
            message: e
        }
    }

    return result;
}