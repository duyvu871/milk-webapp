
interface UserInterface {
    username: string;
    age?: number;
    email: string;
    address?: {
        street: string;
        city: string;
        state: string;
    }
    access_token: string;
}

export type {UserInterface};