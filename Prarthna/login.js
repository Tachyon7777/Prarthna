import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Login() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    return (
        <div className="flex justify-center items-center mt-[25%] ml-[0%] md:ml-[50%] flex-col gap-6">
            <button 
                className="text-white"
                onClick={() => signIn().catch(err => console.error('Error during sign-in', err))}
            >
                Login with Google
            </button>
        </div>
    );
}

export default Login;
