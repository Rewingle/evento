const statusCodes = <const> [200, 201, 204, 206, 400, 401, 404, 418, 500, 403, 405, 503];

type StatusCode = typeof statusCodes[number];

export default function apiReturn(statusCode: StatusCode, message?: string, data: any) {
    return {
        status: statusCode,
        data
    }
}