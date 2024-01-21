"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FiTrash } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

type UserEditType = {
  name: string;
  email: string;
};

const UserDetails = () => {
  const [isValid, setIsValid] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<UserEditType>({ mode: "all" });
  const { id, name } = useParams();

  // EDIT USER FUNCTION
  const handleEditUser = async (Data: UserEditType) => {
    const response = await axios.put(
      `http://localhost:3000/user/info/edit/${id}`,
      Data
    );
    reset();
    setIsValid(true)
  };

  // DELETE USER FUNCTION
  const handleDropUser = async () => {
    const response = await axios.delete(
      `http://localhost:3000/user/drop/${id}`
    );
    reset();
    setIsValid(true)
  };

  useEffect(() => {
    setValue("name", name as string); 
  }, [setValue, name]);

  return (
    <section className="flex flex-col justify-center max-w-3xl h-screen m-auto w-full px-4">
      <h2 className="text-center font-semibold mb-8">PANEL - UPDATE AND DELETE</h2>
      <Link href="/" className="flex flex-row justify-center items-center gap-2 text-center text-black font-semibold mb-4">
      <IoArrowBack size={20} />
      Back
      </Link>
      {isValid && <span className="text-center my-4 text-lg">Operation Completed!!</span>}

      <article className="w-full flex flex-col justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">{name}</CardTitle>
            <CardDescription className="text-center">
              Profile Details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleEditUser)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                    className=""
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Your email"
                  />
                </div>
                <Button type="submit"
                className="transition-default bg-black hover:bg-blue-900">Update</Button>
                <Button
                  // variant="outline"
                  className="transition-default bg-red-600 hover:bg-black hover:text-red-600"
                  onClick={handleDropUser}
                >
                  {/* <FiTrash size={30}/> */}
                  Delete
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </article>
    </section>
  );
};
export default UserDetails;
