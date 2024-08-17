



import LogoutButton from "./logout-button";
import { MainNav } from "./main-nav";
import { ModeToggle } from "./mode-toggle";


const Navbar = async () => {

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;