import React from 'react';
interface Link {
    name: string;
    href: string;
}
interface NavbarProps {
    brandName: string;
    links: Link[];
    buttonStyles?: string;
    linkStyles?: string;
}
declare const Navbar: React.FC<NavbarProps>;
export default Navbar;
