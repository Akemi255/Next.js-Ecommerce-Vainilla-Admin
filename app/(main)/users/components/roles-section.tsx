"use client";
import { useState } from 'react';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import axios from 'axios';
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface User {
    _id: string;
    email: string;
    name: string;
    userRole: string;
}

interface RolesSectionProps {
    email: string;
    users: Array<{
        id: string;
        email: string;
        role: string;
        emailVerified: Date | null;
        name: string | null;
    }>;
}

const RolesSection = ({ email, users: initialUsers }: RolesSectionProps) => {

    const [users, setUsers] = useState<User[]>(initialUsers.map(user => ({
        _id: user.id,
        email: user.email,
        name: user.name || 'N/A',
        userRole: user.role
    })));

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [selectedUserRole, setSelectedUserRole] = useState<string | null>(null);

    const handleRoleChange = (userId: string, newRole: string) => {
        const originalRole = users.find(user => user._id === userId)?.userRole;
        const userEmail = users.find(user => user._id === userId)?.email;

        if (userEmail === email) {
            setSelectedUserId(userId);
            setSelectedUserRole(newRole);
            setShowConfirmationDialog(true);
        } else {
            updateUserRole(userId, newRole, originalRole);
        }
    };

    const confirmRoleChange = () => {
        updateUserRole(selectedUserId!, selectedUserRole!);
        setShowConfirmationDialog(false);
    };

    const updateUserRole = (userId: string, newRole: string, originalRole?: string) => {
        axios.post(`/api/users/roles`, {
            userId: userId,
            newRole: newRole,
            email: email
        })
            .then(response => {
                toast.success("Rol actualizado correctamente");
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === userId ? { ...user, userRole: newRole } : user
                    )
                );
            })
            .catch(error => {
                toast.error("Ups... Parece que no dispones de los permisos necesarios");
                console.error(error);
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === userId ? { ...user, userRole: originalRole || '' } : user
                    )
                );
            });
    };

    return (
        <>
            <div className="w-[600px] sm:w-full border shadow-sm rounded-lg p-2 overflow-y-auto lg:max-h-[650px] ">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Email</TableHead>
                            <TableHead className="text-center">Rol</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user._id}>
                                <TableCell className='text-center md:table-cell'>{user.email}</TableCell>
                                <TableCell className="text-right sm:table-cell">
                                    <div className="flex justify-center">
                                        <Select
                                            onValueChange={(newValue) => handleRoleChange(user._id, newValue)}
                                            value={user.userRole}
                                        >
                                            <SelectTrigger className="w-[100px]">
                                                <SelectValue placeholder={user.userRole}></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mod">Mod</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="user">User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Diálogo de confirmación */}
            {showConfirmationDialog && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h1 className='text-black'>Estás seguro de cambiar tu propio rol?</h1>
                        <p className='text-gray-500 mt-3'>Esta acción no tiene vuelta a atrás</p>
                        <div className="flex justify-center mt-4 gap-2">
                            <Button className="rounded hover:bg-slate-100" variant='outline' onClick={() => setShowConfirmationDialog(false)}>Cancelar</Button>
                            <Button className="rounded hover:bg-gray-700 bg-black text-white" variant='outline' onClick={confirmRoleChange}>Confirmar</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default RolesSection;
