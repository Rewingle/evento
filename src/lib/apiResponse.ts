interface apiResponseType {
    statusCode: number,
    message?: string,
    data?: any
}

const statusCodes: { code: number, message: string }[] = <const>[
    { code: 200, message: "OK" },
    { code: 201, message: "Created" },
    { code: 204, message: "No Content" },
    { code: 206, message: "Partial Content" },
    { code: 400, message: "Bad Request" },
    { code: 401, message: "Unauthorized" },
    { code: 404, message: "Not Found" },
    { code: 418, message: "I'm a Teapot" },
    { code: 500, message: "Internal Server Error" },
    { code: 403, message: "Forbidden" },
    { code: 405, message: "Method Not Allowed" },
    { code: 503, message: "Service Unavailable" }
];
const codes = statusCodes.map((status) => status.code);
type StatusCode = typeof codes[number];
export default function apiResponse(statusCode: StatusCode, data: any, message?: string):apiResponseType {
    return {
        statusCode: statusCode,
        message: message || statusCodes.find((status) => status.code === statusCode)?.message,
        data: data
    }
}