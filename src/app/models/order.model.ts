export class Order {
    name: string;
    date_time: string;
    user: string;
    mount: number;
    places: number;
    ticket: { qrcode: string, last_name: string, first_name: string, nb_places: number };
    details: any[];

    constructor(name = '',
                date_time = new Date().toUTCString(),
                user = '',
                mount = 0,
                places = 0,
                ticket = {qrcode:'',last_name:'',first_name:'',nb_places:0},
                details = []) {
        this.name = name;
        this.date_time = date_time;
        this.user = user;
        this.mount = mount;
        this.places = places;
        this.ticket = ticket;
        this.details = details;
    }

    loadfromJson(json: any) {
        Object.assign(this, json);
    }
}