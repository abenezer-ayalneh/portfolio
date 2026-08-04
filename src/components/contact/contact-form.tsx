'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SITE_CONFIG } from '@/data/social'

const contactSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Please enter a valid email address'),
	message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			message: '',
		},
	})

	async function onSubmit(values: ContactFormValues) {
		setIsSubmitting(true)
		try {
			const response = await fetch(SITE_CONFIG.formSubmitEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					message: values.message,
					_captcha: false,
				}),
			})

			if (!response.ok) {
				throw new Error('Submission failed')
			}

			toast.success('Message sent!', {
				description: "Thanks for reaching out — I'll get back to you soon.",
			})
			form.reset()
		} catch {
			toast.error('Something went wrong', {
				description: 'Please try again or email me directly at abenezer.ayalneh.42@gmail.com',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<div className="grid gap-5 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-mono text-xs uppercase tracking-wider">First name</FormLabel>
								<FormControl>
									<Input placeholder="Abenezer" autoComplete="given-name" required aria-required="true" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-mono text-xs uppercase tracking-wider">Last name</FormLabel>
								<FormControl>
									<Input placeholder="Ayalneh" autoComplete="family-name" required aria-required="true" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-mono text-xs uppercase tracking-wider">Email address</FormLabel>
							<FormControl>
								<Input type="email" placeholder="you@example.com" autoComplete="email" required aria-required="true" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-mono text-xs uppercase tracking-wider">Message</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell me about your project, opportunity, or just say hi..."
									className="min-h-36 resize-none"
									minLength={10}
									required
									aria-required="true"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" size="lg" disabled={isSubmitting} className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
					{isSubmitting ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" /> Sending...
						</>
					) : (
						<>
							<Send className="h-4 w-4" /> Send Message
						</>
					)}
				</Button>
			</form>
		</Form>
	)
}
