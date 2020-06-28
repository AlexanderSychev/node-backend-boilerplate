/** Universal HTTP error statuses message mapper */
export default class HttpStatusMessageMapper {
    private static instance: HttpStatusMessageMapper | null = null;

    private readonly defaultMessage: string = 'Unknown HTTP Error';

    private readonly messages: Map<number, string>;

    private constructor() {
        this.messages = new Map<number, string>([
            // Client errors
            [400, 'Bad Request'],
            [401, 'Unauthorized'],
            [402, 'Payment Required'],
            [403, 'Forbidden'],
            [404, 'Not Found'],
            [405, 'Method Not Allowed'],
            [406, 'Not Acceptable'],
            [407, 'Proxy Authentication Required'],
            [408, 'Request Timeout'],
            [409, 'Conflict'],
            [410, 'Gone'],
            [411, 'Length Required'],
            [412, 'Precondition Failed'],
            [413, 'Request Entity Too Large'],
            [414, 'Request-URI Too Long'],
            [415, 'Unsupported Media Type'],
            [416, 'Requested Range Not Satisfiable'],
            [417, 'Expectation Failed'],
            [418, 'I’m a teapot'],
            [419, 'Authentication Timeout'],
            [421, 'Misdirected Request'],
            [422, 'Unprocessable Entity'],
            [423, 'Locked'],
            [424, 'Failed Dependency'],
            [426, 'Upgrade Required'],
            [428, 'Precondition Required'],
            [429, 'Too Many Requests'],
            [431, 'Request Header Fields Too Large'],
            [434, 'Requested host unavailable'],
            [449, 'Retry With'],
            [451, 'Unavailable For Legal Reasons'],
            [499, 'Client Closed Request'],
            // Server errors
            [500, 'Internal Server Error'],
            [501, 'Not Implemented'],
            [502, 'Bad Gateway'],
            [503, 'Service Unavailable'],
            [504, 'Gateway Timeout'],
            [505, 'HTTP Version Not Supported'],
            [506, 'Variant Also Negotiates'],
            [507, 'Insufficient Storage'],
            [509, 'Bandwidth Limit Exceeded'],
            [510, 'Not Extended'],
            [511, 'Network Authentication Required'],
            [520, 'Unknown Error'],
            [521, 'Web Server Is Down'],
            [522, 'Connection Timed Out'],
            [523, 'Origin Is Unreachable'],
            [523, 'A Timeout Occurred'],
            [525, 'SSL Handshake Failed'],
            [526, 'Invalid SSL Certificate'],
        ]);
    }

    public static getInstance(): HttpStatusMessageMapper {
        if (!HttpStatusMessageMapper.instance) {
            HttpStatusMessageMapper.instance = new HttpStatusMessageMapper();
        }
        return HttpStatusMessageMapper.instance;
    }

    public map(code: number): string {
        return this.messages.get(code) || this.defaultMessage;
    }
}
