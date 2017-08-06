import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { EventAggregator } from './share/event-aggregator/event.aggregator';
import { MessageSentEvent } from './share/event-aggregator/events/message.sent.event';
import { MessageSentEventPayload } from './share/event-aggregator/events/message.sent.event.payload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('overlayState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('visible => hidden', animate('400ms ease-in')),
      transition('hidden => visible', animate('400ms ease-out'))
    ])
  ]
})
export class AppComponent {
  menuActive: boolean;

  activeMenuId: string;

  constructor(private eventAggregator: EventAggregator) { }

  navToDynamictabsCanvas() {
    this.eventAggregator.getEvent(MessageSentEvent).publish(new MessageSentEventPayload('canvas'));
  }

  changeTheme(event: Event, theme: string) {
    const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
    themeLink.href = 'assets/components/themes/' + theme + '/theme.css';
    event.preventDefault();
  }

  onMenuButtonClick(event: Event) {
    this.menuActive = !this.menuActive;
    event.preventDefault();
  }
}
