"use client";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "@/services/userService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={()=>handleDelete(u.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}