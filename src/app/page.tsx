import Link from "next/link";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>
        Currently Nothing, test assignment is on <Link href={'/ideas'} className={'text-blue-500'}>ideas</Link> page
      </p>
    </main>
  )
}
