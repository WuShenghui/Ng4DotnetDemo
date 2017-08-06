
import { PubSubEvent } from '../pub.sub.event';
import { MessageSentEventPayload } from './message.sent.event.payload';

export class MessageSentEvent extends PubSubEvent<MessageSentEventPayload> {
    // No implementation is required
}
