'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2, Save, Trash2, User } from 'lucide-react'
import Link from 'next/link'
import { deleteAccount } from '@/data/account/delete-account'

export default function ProfilePage() {
	const router = useRouter()
	const { data: session } = auth.useSession()
	const [isDeleting, setIsDeleting] = useState(false)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [isSaving, setIsSaving] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
	}, [])

	useEffect(() => {
		if (session?.user) {
			setName(session.user.name ?? '')
			setImage(session.user.image ?? '')
		}
	}, [session])

	if (!isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader2 className="size-12 animate-spin text-primary" />
			</div>
		)
	}

	async function handleDeleteAccount() {
		setIsDeleting(true)
		try {
			const result = await deleteAccount()
			if (result.success) {
				toast.success(result.message)
				router.push('/login')
			} else {
				throw new Error(result.message)
			}
		} catch (error) {
			console.error('Error deleting account:', error)
			toast.error('Failed to delete account')
		} finally {
			setIsDeleting(false)
			setIsDialogOpen(false)
		}
	}

	async function updateProfile() {
		setIsSaving(true)
		try {
			await auth.updateUser({
				name: name,
				image: image,
			})
			toast.success('Profile updated successfully')
		} catch (error) {
			console.error('Error updating profile:', error)
			toast.error('Failed to update profile')
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mx-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<Link href="/dashboard">Dashboard</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>Profile</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</header>
			<main className="container mx-auto py-8">
				<Card className="max-w-6xl mx-auto">
					<CardHeader>
						<CardTitle className="text-2xl font-bold">Profile</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
							<Avatar className="h-24 w-24">
								<AvatarImage
									src={session?.user?.image ?? ''}
									alt={session?.user?.name ?? 'User'}
								/>
								<AvatarFallback>
									<User className="h-12 w-12" />
								</AvatarFallback>
							</Avatar>
							<div className="space-y-1 text-center sm:text-left">
								<h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
								<p className="text-sm text-muted-foreground">{session?.user?.email}</p>
								<p className="text-xs text-muted-foreground">
									Member since{' '}
									{new Date(session?.user?.createdAt ?? '').toLocaleDateString()}
								</p>
							</div>
						</div>
						<Separator />
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									value={name}
									onChange={e => setName(e.target.value)}
									placeholder="Name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="image">Image URL</Label>
								<Input
									id="image"
									value={image}
									onChange={e => setImage(e.target.value)}
									placeholder="Image URL"
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button variant="destructive">
									<Trash2 className="mr-1 size-4" />
									Delete Account
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										Are you sure you want to delete your account?
									</DialogTitle>
									<DialogDescription>
										This action cannot be undone. This will permanently delete your
										account and remove your data from our servers.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<Button
										variant="destructive"
										onClick={handleDeleteAccount}
										disabled={isDeleting}
									>
										{isDeleting ? (
											<>
												<Loader2 className="mr-1 size-4 animate-spin" />
												Deleting...
											</>
										) : (
											<p>Delete Account</p>
										)}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
						<Button onClick={updateProfile} disabled={isSaving}>
							{isSaving ? (
								<>
									<Loader2 className="mr-1 size-4 animate-spin" />
									Saving...
								</>
							) : (
								<>
									<Save className="mr-1 size-4" />
									Save Changes
								</>
							)}
						</Button>
					</CardFooter>
				</Card>
			</main>
		</div>
	)
}
