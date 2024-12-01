import { NextApiRequest } from 'next';

interface User {
    id: number;
    name: string;
    lastName: string;
    age: number;
}

interface Params {
    id: string;
}

export async function GET(req: NextApiRequest, { params }: { params: Params }) {
    const users: User[] = [
        {
            id: parseInt(params.id),
            name: "Supphalak",
            lastName: "Maneepanpanit",
            age: 22,
        },
        {
            id: parseInt(params.id),
            name: "Manee",
            lastName: "Maneepanpanit",
            age: 22,
        },
    ];

    return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    });
}
