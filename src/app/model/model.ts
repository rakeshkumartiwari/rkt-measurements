
export interface state {
    id: number;
    name: string;
}


export interface clientDetail {
    firstName: string,
    lastName: string
    address: string,
    city: string,
    state: state,
    zip: string,
}

export interface Employee {
    _id: string;
    name: string;
    position: string;
    dept: string;
}