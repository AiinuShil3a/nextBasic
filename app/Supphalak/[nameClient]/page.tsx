"use client";

import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    lastName: string;
    age: number;
}

interface Params {
    nameClient: string;
}

export default function UsersPage({ params }: { params: Promise<Params> }) {
    const [user, setUser] = useState<User | null>(null);
    const [clientName, setClientName] = useState<string | null>(null);

    useEffect(() => {
        const fetchClientName = async () => {
            const resolvedParams = await params;
            setClientName(resolvedParams.nameClient);
        };

        fetchClientName();
    }, [params]);

    useEffect(() => {
        if (!clientName) return;

        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/170990142167");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data: User[] = await response.json();

                const filteredUser = data.find((user) => user.name === clientName);

                if (filteredUser) {
                    setUser(filteredUser);
                } else {
                    console.error("User not found");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [clientName]);

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <div>
                    <p>id: {user.id}</p>
                    <p>
                        Name: {user.name} {user.lastName}
                    </p>
                    <p>Age: {user.age}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
