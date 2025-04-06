'use client';

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav style = {{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
            <Link href="/">Home</Link>
            <Link href="/signup">Sign Up</Link>
            <Link href="/gear-hire">Gear Hire</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/rivers">Rivers</Link>
        </nav>
    );
};

export default Navbar;
