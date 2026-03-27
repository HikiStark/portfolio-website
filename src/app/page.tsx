import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-multroid-cream">
      <Navbar />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4">
        {/* Welcome message */}
        <div className="mb-8 text-center sm:mb-12">
          <h1 className="font-heading text-3xl font-bold text-multroid-dark sm:text-4xl lg:text-5xl">
            Hey, I&rsquo;m <span className="text-multroid-blue">Hiki</span>
          </h1>
          <p className="mt-2 text-base text-multroid-grey sm:mt-3 sm:text-lg">
            Welcome to my portfolio — feel free to look around or ask me anything.
          </p>
        </div>

        {/* Avatar Image */}
        <div className="relative h-[300px] w-[240px] sm:h-[450px] sm:w-[360px] md:h-[540px] md:w-[430px] lg:h-[620px] lg:w-[500px]">
          <Image
            src="/images/hiki-avatar.png"
            alt="Hikmat Imanov"
            fill
            sizes="(max-width: 480px) 280px, (max-width: 640px) 400px, (max-width: 1024px) 480px, 560px"
            className="rounded-[40px] object-cover sm:rounded-[55px] lg:rounded-[65px]"
            priority
          />
          <div className="absolute inset-0 -z-10 scale-110 rounded-[40px] bg-multroid-blue/5 blur-3xl sm:rounded-[55px] lg:rounded-[65px]" />
        </div>

        {/* Portfolio CTA arrow — right side, hidden on mobile */}
        <Link
          href="/portfolio"
          className="group absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-6"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-multroid-blue/30 bg-multroid-white/70 shadow-lg backdrop-blur-md transition-all group-hover:border-multroid-blue group-hover:bg-multroid-blue group-hover:shadow-[0px_4px_20px_0px_rgba(0,51,161,0.4)] lg:h-16 lg:w-16">
            <ArrowRightIcon className="h-5 w-5 text-multroid-blue transition-colors group-hover:text-white lg:h-6 lg:w-6" />
          </div>
          <span className="rounded-xl bg-multroid-white/70 px-3 py-1.5 text-xs font-semibold text-multroid-blue shadow backdrop-blur-sm transition-all group-hover:bg-multroid-blue group-hover:text-white">
            Portfolio
          </span>
        </Link>
      </main>
    </div>
  );
}
