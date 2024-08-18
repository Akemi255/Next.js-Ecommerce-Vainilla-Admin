import RightButtons from "./logout-button";
import { MainNav } from "./main-nav";

const Navbar = async ({ email }: { email: string }) => {

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <RightButtons email={email} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;