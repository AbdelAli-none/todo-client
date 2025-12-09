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
import { InputGroup } from "../../UI/input-group";
import { registerSchema } from "@/validations/registerSchema";
import { Logo } from "@/components/Logo";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "@/app/features/auth/authSlice";
import { toast } from "sonner";

interface StrapiUser {
  username: string;
  email: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitRegister = async (data: z.infer<typeof registerSchema>) => {
    const { firstName, lastName, email, password } = data;
    const username = `${firstName} ${lastName}`;

    try {
      const registerRes = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const {
        data: {
          jwt,
          user: {
            confirmed,
            createdAt,
            email: loggedEmail,
            username: loggedUsername,
            updatedAt,
          },
        },
      } = registerRes as { data: StrapiAuthResponse };

      dispatch(
        setLoggedUser({
          loggedUsername,
          loggedEmail,
          confirmed,
          createdAt,
          updatedAt,
        })
      );

      localStorage.setItem("token", jwt);
      toast(`Welcome ${loggedUsername}, Your account has created!`, {
        icon: "🚀",
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #2563EB, #3B82F6)", // blue-600 → blue-500
          color: "white",
          border: "none",
          boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
        },
      });
      // toast.success(`Welcome !`);
      return navigate("/");
    } catch (err: any) {
      const message =
        err.respnse?.data?.error?.message ||
        "Email or Username are already taken!";

      setError("root", {
        type: "server",
        message,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 110 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <Card className="w-full sm:max-w-md pb-3 relative border-none shadow-2xl">
        <Logo className="w-8 h-8 absolute left-1/2 -top-4 -translate-x-1/2 rounded-full border-2 border-primary" />
        <CardHeader className="text-center mb-3">
          <CardTitle>
            Welcome To <span className="text-primary">Taskify</span>!
          </CardTitle>
          <CardDescription>
            Create your own account & start making progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={handleSubmit(onSubmitRegister)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="gap-y-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="firstName">First name</FieldLabel>
                    <Input
                      {...field}
                      id="firstName"
                      aria-invalid={fieldState.invalid}
                      placeholder="First Name..."
                      autoComplete="off"
                      className="placeholder:text-xs"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="gap-y-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="lastName"
                        placeholder="Last Name..."
                        aria-invalid={fieldState.invalid}
                        className="placeholder:text-xs"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="gap-y-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Email Address..."
                        aria-invalid={fieldState.invalid}
                        className="placeholder:text-xs"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="gap-y-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="password"
                        placeholder="Password..."
                        aria-invalid={fieldState.invalid}
                        className="placeholder:text-xs"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="gap-y-1" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm password
                    </FieldLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        id="confirmPassword"
                        placeholder="Confirm Password..."
                        aria-invalid={fieldState.invalid}
                        className="placeholder:text-xs"
                      />
                    </InputGroup>
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
        <CardFooter>
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
                  form="register-form"
                  className="cursor-pointer"
                >
                  Register
                </Button>
              </div>
              <span className="ms-auto text-sm">
                already has account,{" "}
                <Link to="/auth/login" className="text-primary">
                  login here
                </Link>
              </span>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
