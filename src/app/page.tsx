import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
   <div>
    This page is authenticated
    <UserButton 
      afterSignOutUrl="/"
    />
   </div>
  );
}
