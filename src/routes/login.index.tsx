import { createFileRoute } from '@tanstack/react-router'
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
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { supabase } from "@/supabase"
import { Loader2 } from "lucide-react"

export const Route = createFileRoute('/login/')({
  component: Login
})

const zStringReq = (msg?: string) =>
  z.string().trim().min(1, { message: msg ?? "Required!" });

const loginFormSchema = z.object({
  email: zStringReq(),
  password: zStringReq()
})

export function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setError("")
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })

    if (error) {
      setError(error.message)
      console.log("Error")
    }
    setLoading(false)
  }


  return (
    <div className="flex h-full flex-col justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <Card className="bg-muted/40">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="me@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button disabled={loading} type="submit" className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in</Button>
              {error && <p className="text-destructive">{error}</p>}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
