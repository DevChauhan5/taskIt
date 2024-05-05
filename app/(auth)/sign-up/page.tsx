"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { ID } from "appwrite"
import { account } from "@/lib/appwrite"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email().endsWith('@gmail.com'),
    status: z.string().min(1, {
        message: "Status Required."
    }),
    countryCode: z.string().min(1, {
        message: 'Country Code Required.'
    }),
    mobileNumber: z.number().min(10)
})

const otpSchema = z.object({
    pin: z.string().length(6, {
        message: 'OTP must be 6 characters long.'
    })

})

export default function SignUp() {
    const router = useRouter()
    const [eligibleForOtp, setEligibleForOtp] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            status: "",
            countryCode: "",
            mobileNumber: 1234567890,
        },
    })
    const otp = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            pin: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const sessionToken = await account.createPhoneToken(
            ID.unique(),
            values.countryCode + values.mobileNumber,
        );
        return sessionToken;
    }
    const mutation = useMutation({
        mutationFn: onSubmit,
        onSuccess: () => {
            toast.success('OTP Sent Successfully.')
            setEligibleForOtp(true)
        },
        onError: (error) => {
            toast.error('Something went wrong!')
        }
    })
    async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
        if (!mutation.data) throw new Error('Session ID not found.');
        const session = await account.updatePhoneSession(
            mutation.data.userId,
            values.pin,
        );
        return session;
    }
    const otpMutation = useMutation({
        mutationFn: onOtpSubmit,
        onSuccess: (session) => {
            toast.success('OTP Verified Successfully.')
            setTimeout(() => {
                router.push('dashboard')
            }, 800);
        },
        onError: (error) => {
            toast.error('Invalid OTP.')
        }
    })
    return (
        <div className="mx-auto max-w-md space-y-6 mt-6">
            <div className="space-y-2 text-center my-8">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {eligibleForOtp ? "Enter the OTP sent to your mobile number." : "Enter your details to sign up."}
                </p>
            </div>
            {eligibleForOtp ? (
                <Form {...otp}>
                    <form onSubmit={otp.handleSubmit((values) => otpMutation.mutate(values))} className="w-full mx-auto space-y-8">
                        <FormField
                            control={otp.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the one-time password sent to your phone.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">
                            {otpMutation.isPending ? (
                                <div className="flex items-center gap-2">
                                    <Loader2Icon className="animate-spin w-5 h-5" />
                                    Loading...
                                </div>
                            ) : "Verify OTP"
                            }
                        </Button>
                    </form>
                </Form>
            ) : (
                <div className="space-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="space-y-8">
                            <div className="grid grid-cols-2 gap-4 ">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status:</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your current status:" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Student">Student</SelectItem>
                                                <SelectItem value="freelancer">Freelancer</SelectItem>
                                                <SelectItem value="working_professional">Working Professional</SelectItem>
                                                <SelectItem value='other'>Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-6 gap-2">
                                <div className="col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="countryCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormLabel>Code</FormLabel>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="+1" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="+1">+1</SelectItem>
                                                        <SelectItem value="+91">+91</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-5">
                                    <FormField
                                        control={form.control}
                                        name="mobileNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mobile Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your mobile no."
                                                        {...field}
                                                        type="tel"
                                                        maxLength={10}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, ' ');
                                                            field.onChange(value && !isNaN(Number(value)) ? parseInt(value, 10) : '');
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <Button type="submit">
                                {mutation.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2Icon className="animate-spin w-5 h-5" />
                                        Loading...
                                    </div>
                                ) : "Sign Up"}
                            </Button>
                        </form>
                    </Form>
                </div>
            )
            }
        </div >
    )
}