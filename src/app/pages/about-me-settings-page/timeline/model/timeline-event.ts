export class TimelineEvent {

    id: number;
    year: number;
    title: string;
    text: string;
    color: string;
    icon: string;
    event_order: number

    constructor(year: number, title: string, text: string, color: string, icon: string, event_order: number) {
        this.year = year;
        this.title = title;
        this.text = text;
        this.color = color;
        this.icon = icon;
        this.event_order = event_order;
    }
}
