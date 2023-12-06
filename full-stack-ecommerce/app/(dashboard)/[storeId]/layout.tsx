import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Prisma } from '@prisma/client';

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: String }
}) {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId as unknown as Prisma.StringFilter,
            userId: userId
        }
    })

    if (!store) {
        redirect("/")
    }

    return (
        <>
            <div>This will be a navbar.</div>

            <br />
            <p>store.id: {store.id}</p>
            <p>store.name: {store.name}</p>
            <p>store.userId: {store.userId}</p>
            <br />

            {children}
        </>
    )
}