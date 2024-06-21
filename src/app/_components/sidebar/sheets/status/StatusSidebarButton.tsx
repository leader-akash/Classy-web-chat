import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import { User } from "@prisma/client";
import axios from "axios";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import "@uploadthing/react/styles.css";
import StoryViewer from "./StoryViewer";
interface StatusButtonProps {
  user: User;
  statusTitle?: string; // ? means optiona;
  statusDescription?: string;
  hasStory?: boolean;
}

const StatusButton = ({
  user,
  statusTitle,
  statusDescription,
  hasStory,
}: StatusButtonProps) => {
  const AvatarTailwind = hasStory
    ? "border-green-400 border-2 rounded-full"
    : "";

  return (
    <div className="flex relative w-full pt-5 pl-4">
      <Avatar className={AvatarTailwind}>
        <AvatarImage src={user?.profileImageUrl || undefined} />
        <AvatarFallback>
          {user?.username?.charAt(0)?.toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {!hasStory && ( //change true to variable
        <span
          className="
                     absolute flex rounded-full bg-[#00a884] top-11 left-12 ring-2 ring-white h-[14px] w-[14px] items-center justify-center
                    "
        >
          <Plus className="text-white" />
        </span>
      )}
      <div className="text-left w-full">
        <h4 className="text-[1rem] text-black ml-5">{statusTitle}</h4>
        <p className="text-muted-foreground text-[0.8125rem] ml-5">
          {statusDescription}
        </p>
      </div>
    </div>
  );
};

interface StatusSidebarButtonProps {
  user: User;
}

const StatusSidebarButton = ({ user }: StatusSidebarButtonProps) => {
  const [showStory, setShowStory] = useState(false);

  const { toast } = useToast();
  const [hasStory, setHasStory] = useState(
    user?.statusImageUrl !== null ? true : false
  );

  const toggleShowStory = () => {
    setShowStory(!showStory);
  };

  const handleDeleteStory = async () => {
    // try {
    // toggleShowStory();
    // user?.statusImageUrl == "";
    //   await axios.delete(`/api/status`);
    // } catch (err) {
    //   console.log("error in status sidebar", err);
    // }

    toggleShowStory();
        user.statusImageUrl = null;
        axios.delete('/api/status')
            .then(() => { })
            .catch(err => {
                console.log(err);
            })
  };

  useEffect(() => {
    setHasStory(user?.statusImageUrl !== null ? true : false);
  }, [user?.statusImageUrl, hasStory]);

  return (
    <div>
      {hasStory ? (
        <div>
          <button onClick={toggleShowStory}>
            <StatusButton
              user={user}
              statusTitle="My Status"
              statusDescription="today"
              hasStory={hasStory}
            />
          </button>
          {showStory && (
            <StoryViewer
              user={user}
              onClose={() => toggleShowStory()}
              onDeleteStory={() => handleDeleteStory()}
            />
          )}
        </div>
      ) : (
        <UploadButton
          content={{
            button({ ready }) {
              const statusTitle = ready ? "My Status" : "Loading...";
              const statusDescription = ready
                ? "Add to my status"
                : "Wait a moment..";
              return (
                <StatusButton
                  statusTitle={statusTitle}
                  statusDescription={statusDescription}
                  user={user}
                  hasStory={hasStory}
                />
              );
            },
          }}
          endpoint="statusImage"
          appearance={{
            allowedContent: { display: "none" },
            button:
              "!ring-0 border-0 bg-white cursor-pointer h-full w-full justify-start",
          }}
          className="uploadbtn"
          onUploadError={(err: Error) => {
            console.log(err);
          }}
          onUploadBegin={() => {
            toast({
              title: "Uploading story",
              description: "Wait a minute...",
              duration: 30000,
            });
          }}
          // ****** with try catch ***** ====  one error in try catch

          // onClientUploadComplete={(res) => {
          //   try {
          //     const response = axios.post("/api/status", {
          //       statusImageUrl: res[0].url,
          //     });
          //     console.log('response', response)
          //     // user.statusImageUrl = response?.data?.statusImageUrl;
          //     toast({
          //       title: "Upload complete!",
          //       className: "bg-green-500",
          //       duration: 2000,
          //     });
          //   } catch (error) {
          //     console.log("error in uploading status", error);
          //   }
          // }}

          // ==== without try catch ********

          onClientUploadComplete={(res) => {
            axios
              .post("/api/status", { statusImageUrl: res[0].url })
              .then((res) => {
                user.statusImageUrl = res.data.statusImageUrl;
                toast({
                  title: "Upload complete!",
                  className: "bg-green-500",
                  duration: 2000,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      )}

      <Toaster />
    </div>
  );
};

export default StatusSidebarButton;
