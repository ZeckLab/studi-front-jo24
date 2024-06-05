export class UserProfile {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;

    constructor(email = '', first_name = '', last_name = '', phone_number = '') {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
    }

    get firstName() {
        return this.first_name;
    }

    get lastName() {
        return this.last_name;
    }

    get phone() {
        return this.phone_number;
    }

    set firstName(value: string) {
        this.first_name = value;
    }

    set lastName(value: string) {
        this.last_name = value;
    }

    set phone(value: string) {
        this.phone_number = value;
    }

    loadfromJson(json: any) {
        Object.assign(this, json);
    }
}