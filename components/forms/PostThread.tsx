"use client";

// UI components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// form validation with zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// pathname and router
import { usePathname, useRouter } from "next/navigation";
// user validation schema
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useState } from "react";
import { uploadAsset } from "@/lib/utils";
import AssetUploader from "./AssetUploader";
import { useOrganization } from "@clerk/nextjs";
// update user

let isLoading = false;
export default function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  // asset states
  const [selectedAsset, setSelectedAsset] = useState<File>();
  const [selectedAssetType, setSelectedAssetType] = useState<string>("");

  // form post creation with form validation with zod
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    isLoading = true;
    const loadingEl = document.querySelector("#loading");
    loadingEl.style.display = "block";
    loadingEl.style.width = "10%";

    let uploadedAssetURL = "";
    if (selectedAsset && selectedAssetType) {
      // attempt to upload asset to cloudinary if asset exists
      uploadedAssetURL = await uploadAsset({
        asset: selectedAsset,
        assetType: selectedAssetType,
      });
    }
    loadingEl.style.width = "50%";

    // create post in DB and reroute
    await createThread({
      text: values.thread,
      author: userId,
      asset: uploadedAssetURL,
      communityId: organization ? organization.id : null,
      path: pathname, // pathname = 'create'
    });
    loadingEl.style.width = "100%";

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        {/* render text area fiel input */}
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={15}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AssetUploader
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
          setSelectedAssetType={setSelectedAssetType}
        />
        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
      <div className="text-white w-full pt-4">
        <div className="rounded w-full h-full text-center text-white">
          <div
            id="loading"
            style={{
              display: "none",
              width: "0%",
              transition: "all 0.5s ease-in-out",
            }}
            className="rounded bg-red-500 h-full p-1"
          ></div>
          {isLoading && "Loading..."}
        </div>
      </div>
    </Form>
  );
}
