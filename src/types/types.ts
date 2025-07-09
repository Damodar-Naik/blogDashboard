export interface BlogPost {
    id: number;
    title: string;
    author: string;
    date: string;
    status: 'Draft' | 'Published';
}