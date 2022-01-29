
export interface state {
    id: number;
    name: string;
}


export interface profile {
    firstName: string,
    lastName: string
    address: string,
    city: string,
    state: state,
    zip: string,
}