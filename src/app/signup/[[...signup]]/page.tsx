import { SignUp } from "@clerk/nextjs";

function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignUp />
    </div>
  );
}

export default Page;
