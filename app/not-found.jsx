import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EEE8] px-4">
      <div className="w-[300px] h-[300px] border-4 border-[#383A41] rounded-lg bg-white relative">

        <div className="absolute top-12 -left-[25px] w-[350px] h-[27px] border-4 border-[#383A41] rounded-md overflow-hidden flex flex-col">
          <div className="flex-1 bg-[#EB6D6D]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#5E7FDC]" />
        </div>

        <div className="flex justify-between w-[130px] mx-auto mt-28">
          <div className="w-[30px] h-[15px] border-4 border-b-0 border-[#383A41] rounded-t-full" />
          <div className="w-[30px] h-[15px] border-4 border-b-0 border-[#383A41] rounded-t-full" />
        </div>

        <div className="flex justify-between w-[180px] mx-auto mt-4">
          <div className="w-[10px] h-[10px] rounded-full bg-[#EB6D6D]/40" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#EB6D6D]/40" />
        </div>

        <div className="w-[40px] h-[5px] bg-[#383A41] rounded-md mx-auto mt-6" />
      </div>

      <h1 className="mt-8 text-4xl font-extrabold text-[#383A41] text-center">
        Oops! Something went wrong!
      </h1>

      <Link href="/" className="mt-10">
        <Button className="px-10 py-6 text-lg bg-[#5E7FDC] hover:bg-[#5E7FDC]/80">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
