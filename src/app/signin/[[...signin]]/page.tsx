import { SignIn } from "@clerk/nextjs";

function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignIn />
    </div>
  );
}

export default Page;
