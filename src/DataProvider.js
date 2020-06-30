import axios from "axios";
import { stringify } from "query-string";

// import updateProvider from "./updateProvider";
// import createProvider from "./createProvider";

const apiUrl = "https://www.simpleapps.pw";
// const axios = fetchUtils.fetchJson;

export default {
    getList: (resource, params = {}) => {
        // console.log(
        //     `getList called for resource ${resource} with params : ${JSON.stringify(
        //         params
        //     )}`
        // );
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: `${field} ${order}`,
        //     skip: JSON.stringify((page - 1) * perPage),
        // };
        // if (Object.keys(params.filter).length > 0)
        //     query.where = JSON.stringify(params.filter);

        const url = `${apiUrl}/${resource}`;

        return axios(url, { withCredentials: true })
            .then((response) => ({
                data: response.data,
                status: response.status,
                // total: parseInt(headers.get("X-Total-Count"), 10),
            }))
            .catch((error) => {
                console.log(`Error in get ${JSON.stringify(error)}`);
                return {
                    status: error.response.status,
                    data: error.response.data,
                };
            });
    },

    getOne: (resource, params) =>
        axios(`${apiUrl}/${resource}/${params.id}`).then(({ json: data }) => ({
            data: data,
        })),

    getMany: (resource, params) => {
        console.log(
            `getMany called with resource : ${resource} params : ${JSON.stringify(
                params
            )}`
        );

        const query = {
            where: JSON.stringify({ id: params.ids }),
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return axios(url).then(({ data }) => ({ data: data }));
    },

    getManyReference: (resource, params) => {
        console.log(`getManyReference called`);

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: `${field} ${order}`,
            skip: JSON.stringify((page - 1) * perPage),
            where: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return axios(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get("content-range").split("/").pop(), 10),
        }));
    },

    // update: updateProvider,
    // (resource, params) =>
    //     axios(`${apiUrl}/${resource}/${params.id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            where: JSON.stringify({ id: params.ids }),
        };
        return axios(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        // console.log(`Params data : ${JSON.stringify(params.data)}`);

        return axios
            .post(`${apiUrl}/${resource}`, params.data)
            .then((response) => {
                return {
                    data: { ...params.data, id: response.data.id },
                };
            });
    },
    login: (params) => {
        return axios
            .put(`${apiUrl}/api/v1/entrance/login`, params, {
                withCredentials: true,
            })
            .then((response) => ({ data: response }));
    },
    logout: () => {
        return axios
            .get(`${apiUrl}/logout`, {
                withCredentials: true,
            })
            .then((response) => ({ data: response }));
    },

    delete: (resource, params) =>
        axios
            .delete(`${apiUrl}/${resource}/${params.id}`)
            .then((json) => ({ data: json.data })),

    deleteMany: (resource, params) => {
        const query = {
            where: JSON.stringify({ id: params.ids }),
        };
        return axios(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "DELETE",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};
