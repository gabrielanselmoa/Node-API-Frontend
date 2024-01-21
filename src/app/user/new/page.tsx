"use client";

import axios from "axios"
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

const newUser = () => {

    const [isValid, setIsValid] = useState(false)

    const {register, handleSubmit, formState:{errors}} = useForm({
        mode: "all"
    })

    const handleSubmitData = async (Data:any) => {
        // console.log(Data);
        setIsValid(false)

        const newData = {
            name: Data.name,
            email: Data.email
        }

        try {
            const response = await axios.post("http://localhost:3000/user/new", newData)
            console.log(response.data);
            setIsValid(true)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className="flex flex-col justify-center max-w-3xl h-screen m-auto w-full">
      <h2 className="text-center font-semibold mb-8">PANEL - CREATE</h2>
      <Link href="/" className="flex flex-row justify-center items-center gap-2 text-center text-black font-semibold mb-4">
      <IoArrowBack size={20} />
      Back
      </Link>
      {isValid && <span className="text-center my-4 text-lg">User created!!</span>}

      <article className="w-full flex flex-col justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
        <CardTitle className="text-center">User</CardTitle>
            <CardDescription className="text-center">
              Profile Details
            </CardDescription>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} placeholder="Your name"/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="Your email"/>
              </div>

              <Button type="submit"
                className="transition-default bg-black hover:bg-blue-900">Create</Button>
            </div>
          </form>

        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button> */}
          
        </CardFooter>
      </Card>
      </article>
    </section>
  );
};
export default newUser;
