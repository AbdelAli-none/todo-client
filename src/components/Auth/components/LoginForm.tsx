"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../../UI/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../UI/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../UI/field";
import { Input } from "../../UI/input";
import { loginSchema } from "@/validations/loginSchema";
import { Logo } from "@/components/Logo";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import type { StrapiAuthResponse } from "./RegisterForm";

export const LoginForm = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    reset,
  } = useForm<z.infer<typeof loginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmitLogin = async (data: z.infer<typeof loginSchema>) => {
    const { username, password } = data;
    const authLoginInfo = { identifier: username, password };

    try {
      const loginRes = await axios.post(
        "http://localhost:1337/api/auth/local",
        authLoginInfo
      );

      const {
        data: {
          jwt,
          user: { username: loggedUsername },
        },
      } = loginRes as { data: StrapiAuthResponse };

      localStorage.setItem("token", jwt);
      toast(`Welcome Back ${loggedUsername}.`, {
        icon: "🚀",
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #2563EB, #3B82F6)", // blue-600 → blue-500
          color: "white",
          border: "none",
          boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
        },
      });

      return navigate("/");
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message || "Incorrect username or password";
      setError("root", {
        // set this error manulally
        type: "server",
        message,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <Card className="w-full gap-0 sm:max-w-md pb-3 relative border-none shadow-2xl">
        <Logo className="w-8 h-8 absolute left-1/2 -top-4 -translate-x-1/2 rounded-full border-2 border-primary" />
        <CardHeader className="text-center">
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>
            Great to go back for tracking your tasks with Taskify!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            className="grid gap-y-5 mt-6"
            onSubmit={handleSubmit(onSubmitLogin)}
          >
            <FieldGroup>
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="gap-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Username..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="gap-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Password..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          {errors.root && (
            <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
          )}
        </CardContent>
        <CardFooter className="mt-4">
          <Field>
            <div className="flex flex-wrap">
              {" "}
              <div className="flex gap-x-3 basis-full">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="login-form"
                  className="cursor-pointer"
                >
                  Login
                </Button>
              </div>
              <span className="ms-auto text-sm">
                new here,{" "}
                <Link to="/auth/register" className="text-primary">
                  create account
                </Link>
              </span>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
