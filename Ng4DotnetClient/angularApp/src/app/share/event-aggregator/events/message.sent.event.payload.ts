export class MessageSentEventPayload {

    private body: string;

    constructor(body: string) {
        this.body = body;
    }

    get messageBody(): string {
        return this.body;
    }
}