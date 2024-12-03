export interface App {
    name: string;
    screens: Screen[];
}
export interface Screen{
    name: string;
    styles: Style[];
    images: Image[];
}
export interface Style {
    name: string;
    styleType: 'FILL' | 'TEXT' | 'EFFECT';
    remote: boolean;
    description: string;
    details: any;
}

export interface Image {
    name: string;
    url: string;
}