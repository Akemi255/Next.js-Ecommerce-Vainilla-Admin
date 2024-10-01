import RightButtons from "./right-buttons";
import { MainNav } from "./main-nav";
import prismadb from "@/lib/prismadb";

const Navbar = async ({ email }: { email: string }) => {

    const learningCategories = await prismadb.learningCategory.findMany()

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <RightButtons email={email} learningCategories={learningCategories} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;