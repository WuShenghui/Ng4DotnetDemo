import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { EventBase } from './event.base';

@Injectable()
export class EventAggregator {
    private events: Array<[string, EventBase]> = [];

    private activator<T>(type: { new(): T; }): T {
        return new type();
    }

    getEvent<T extends EventBase>(type: { new(): T; }): T {
        let instance: T;

        // todo: lock access to event Array

        const index = this.events.findIndex(item => item[0] === type.toLocaleString());

        if (index > -1) {
            const eventBase: EventBase = this.events[index][1];
            return eventBase as T;
        } else {
            instance = new type();
            this.events.push([type.toLocaleString(), instance]);
        }

        return instance;
    }
}
