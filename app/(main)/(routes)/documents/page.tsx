"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created successfully",
      error: "Error creating note",
    })
  }
  
  return ( 
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image 
        src="/empty.png"
        alt="documents"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image 
        src="/empty-dark.png"
        alt="documents"
        width={300}
        height={300}
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button
        onClick={onCreate}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
   );
}
 
export default DocumentsPage;