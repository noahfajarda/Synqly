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
// update user
// import { updateUser } from "@/lib/actions/user.actions";

export default function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();

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
    let uploadedAssetURL = "";
    if (selectedAsset && selectedAssetType) {
      // attempt to upload asset to cloudinary if asset exists
      uploadedAssetURL = await uploadAsset({
        asset: selectedAsset,
        assetType: selectedAssetType,
      });
    }

    // create post in DB and reroute
    await createThread({
      text: values.thread,
      author: userId,
      asset: uploadedAssetURL,
      communityId: null,
      path: pathname, // pathname = 'create'
    });

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
    </Form>
  );
}