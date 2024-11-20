'use client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { SidebarTrigger } from './ui/sidebar'

function generateBreadcrumbs(pathname: string) {
	const paths = pathname.split('/').filter(Boolean)
	return paths.map((path, index) => {
		const href = `/${paths.slice(0, index + 1).join('/')}`
		return { href, label: path.charAt(0).toUpperCase() + path.slice(1) }
	})
}

export default function ClientHeader() {
	const pathname = usePathname()
	const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [pathname])

	return (
		<header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 h-4" />
			<Breadcrumb>
				<BreadcrumbList>
					{breadcrumbs.map((breadcrumb, index) => (
						<React.Fragment key={breadcrumb.href}>
							<BreadcrumbItem>
								{index < breadcrumbs.length - 1 ? (
									<BreadcrumbLink asChild>
										<Link href={breadcrumb.href}>{breadcrumb.label}</Link>
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage className="text-primary">
										{breadcrumb.label}
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>
							{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	)
}
