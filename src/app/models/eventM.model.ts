export class EventM {
    id: number | null = null;
    title: string;
    description: string;
    date: string;
    capacity: number;
    visible: boolean = false;

    constructor(title = '', description = '', date = new Date().toUTCString(), capacity = 0) {
        this.id = null;
        this.title = title;
        this.description = description;
        this.date = date;
        this.capacity = capacity;
        this.visible = false;
    }

    loadfromJson(json: any) {
        Object.assign(this, json);
    }
}