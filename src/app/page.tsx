import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoPersonAddOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";

type UserWithPermission = {
  id: number;
  name: string;
  email: string;
  // permission: {
  //   id: number;
  //   editpermission: boolean;
  //   userId: number;
  // };
};

const getData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default async function Home() {
  const data = await getData();
  // console.log(data);
  

  return (
    <main className="w-full h-full flex flex-col justify-center items-center px-4 pt-16">
      <h1 className="text-2xl font-bold mb-12">USERS CRUD API</h1>
      <Table className="max-w-xl w-full m-auto bg-white border">
        <TableCaption>Users avaiable</TableCaption>

        <TableHeader className="transition-all border hover:bg-slate-100">
          <TableRow>
            <TableHead className="text-center font-bold text-blue-900">ID</TableHead>
            <TableHead className="font-bold text-blue-900">Name</TableHead>
            <TableHead className="font-bold text-blue-900">Email</TableHead>
            <TableHead  className="text-center font-bold text-blue-900">Details</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(data) ? (
            data.map((item) => (
              <TableRow key={item.id} className="transition-all border hover:bg-slate-100">
                <TableCell className="text-center font-semibold">{item.id}</TableCell>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="font-semibold">{item.email}</TableCell>
                <TableCell>
                  <Link href={`/user/${item.id}/${item.name}`} className="font-semibold">
                    <FiEdit size={20} className="m-auto"/>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                {data === null ? "Error fetching data" : "Loading..."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter className="transition-all bg-slate-100">

          <TableRow className="border">
            <TableCell colSpan={3}>Add</TableCell>
            <TableCell>
                  <Link href="/user/new" className="font-bold">
                    <IoPersonAddOutline size={20} className="m-auto"/>
                  </Link>
                </TableCell>
          </TableRow>

          <TableRow className="border text-white bg-blue-600 hover:bg-blue-600">
            <TableCell colSpan={3}>Users</TableCell>
            <TableCell className="text-center">{Array.isArray(data) ? data.length : 0}</TableCell>
          </TableRow>

        </TableFooter>
      </Table>
    </main>
  );
}
