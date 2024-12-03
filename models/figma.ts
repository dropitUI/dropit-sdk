// models/figma.ts

export interface FigmaStyle {
    key: string;
    name: string;
    styleType: 'FILL' | 'TEXT' | 'EFFECT';
    remote: boolean;
    description: string;
}

export interface FigmaFile {
    document: FigmaNode;
    styles: { [key: string]: FigmaStyle };
    components?: { [key: string]: any };
}

// models/figma.ts

export interface FigmaNode {
    id: string;
    name: string;
    type: string;
    children?: readonly FigmaNode[]; // Use readonly here
    fills?: any[];
    style?: any;
    effects?: any[];
    styles?: { [key: string]: string };
}

export interface FigmaFile {
    document: FigmaNode;
    styles: { [key: string]: FigmaStyle };
    components?: { [key: string]: any };
}


export interface ImageFill {
    nodeId: string;
    imageRef: string;
    name: string;
}

export interface ImageUrl {
    nodeName: string;
    nodeId: string;
    imageUrl: string;
}


export interface FigmaImage {
    nodeId: string;
    imageRef: string,
    name: string,
}