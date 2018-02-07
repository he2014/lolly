import axios from 'axios'; //axios

let base = '';
export const giftListall = params => {
    return axios.get("http://10.10.32.84:6543/back/gift/listQueryGift", {
        params: params
    })
}
export const requestLogin = params => {
    return axios.post(`${base}/login`, params).then(res => res.data);
};

export const getUserList = params => {
    return axios.get(`${base}/user/list`, {
        params: params
    });
};

export const getUserListPage = params => {
    return axios.get(`${base}/user/listpage`, {
        params: params
    });
};

export const removeUser = params => {
    return axios.get(`${base}/user/remove`, {
        params: params
    });
};

export const batchRemoveUser = params => {
    return axios.get(`${base}/user/batchremove`, {
        params: params
    });
};

export const editUser = params => {
    return axios.get(`${base}/user/edit`, {
        params: params
    });
};

export const addUser = params => {
    return axios.get(`${base}/user/add`, {
        params: params
    });
};
export const getTablOptions = params => {
    return axios.get(`${base}/table/options`)
}
export const userMessage = params => {
    return axios.get(`${base}/user/options`, {
        params: params
    });

}
export const gitfNumber = params => {
    return axios.get(`${base}/user/gift`, {
        params: params
    });
}
export const gitfList = params => {
    return axios.get(`${base}/user/gitfList`, {
        params: params
    });
}
export const IMList = params => {
    return axios.get(`${base}/user/IMList`, {
        params: params
    });
}
export const Sensitive = params => {
    return axios.get(`${base}/user/Sensitive`, {
        params: params
    });
}
